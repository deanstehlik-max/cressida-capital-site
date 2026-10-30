import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { sendLoanRequestEmail, sendLoanRequestFallbackAlert } from '@/lib/notifications/email';
import type { LoanRequestAlertFailure } from '@/lib/notifications/email';
import { pushToGhl, ghlOverridesForSourcePage } from '@/lib/notifications/ghl';
import type { LoanRequestNotification } from '@/lib/notifications/types';
import { HONEYPOT_FIELD, clientIp, isHoneypotTripped, isRateLimited } from '@/lib/spam';

const ALERT_TO = 'deans@cressidacapital.com';

function asText(value: unknown): string {
  return typeof value === 'string' ? value : value == null ? '' : String(value);
}

function errorText(reason: unknown): string {
  if (reason instanceof Error) return reason.message;
  return String(reason);
}

function alertKind(emailDelivered: boolean, ghlFailed: boolean): LoanRequestAlertFailure | null {
  if (emailDelivered && !ghlFailed) return null;
  if (!emailDelivered && ghlFailed) return 'email-and-ghl';
  if (!emailDelivered) return 'email';
  return 'ghl';
}

async function notifyWithFallback(notification: LoanRequestNotification) {
  const [emailResult, ghlResult] = await Promise.allSettled([
    sendLoanRequestEmail(notification),
    pushToGhl(notification, ghlOverridesForSourcePage(notification.sourcePage)),
  ]);

  const emailError = emailResult.status === 'rejected' ? emailResult.reason : null;
  const ghlError = ghlResult.status === 'rejected' ? ghlResult.reason : null;
  const emailFailed = emailError !== null;
  const ghlFailed = ghlError !== null;

  if (emailFailed) {
    console.error('[loan-requests] email notification failed:', emailError);
  }
  if (ghlFailed) {
    console.error('[loan-requests] HighLevel push failed:', ghlError);
  }
  if (!emailFailed && !ghlFailed) return;

  let emailDelivered = !emailFailed;
  let retryNote = 'Email retry: not needed';
  if (emailFailed) {
    try {
      await sendLoanRequestEmail(notification);
      emailDelivered = true;
      retryNote = 'Email retry: succeeded';
      console.warn('[loan-requests] email notification retry succeeded');
    } catch (retryError) {
      retryNote = `Email retry failed: ${errorText(retryError)}`;
      console.error('[loan-requests] email notification retry failed:', retryError);
    }
  }

  const failure = alertKind(emailDelivered, ghlFailed);
  if (!failure) return;

  const detail = [
    emailError !== null
      ? `Initial email error: ${errorText(emailError)}`
      : 'Initial email: sent',
    retryNote,
    ghlError !== null
      ? `HighLevel error: ${errorText(ghlError)}`
      : 'HighLevel: sent',
  ].join('\n\n');

  try {
    await sendLoanRequestFallbackAlert({ failure, data: notification, detail });
    console.warn(
      `[loan-requests] fallback alert sent to ${ALERT_TO} (failure=${failure})`
    );
  } catch (alertError) {
    console.error(
      `[loan-requests] fallback alert to ${ALERT_TO} failed:`,
      alertError
    );
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const ip = clientIp(req.headers);

  // Bots that fill the hidden field get the same success response as a
  // real submission. Nothing is saved and no notification is sent.
  if (isHoneypotTripped(body[HONEYPOT_FIELD])) {
    console.warn('[loan-requests] honeypot filled; submission dropped', { ip });
    return NextResponse.json({ success: true });
  }

  const fullName = asText(body.fullName).trim();
  const email = asText(body.email).trim();
  const phone = asText(body.phone).trim();
  const company = asText(body.company).trim();
  const loanProgram = asText(body.loanProgram).trim();
  const propertyType = asText(body.propertyType).trim();
  const loanAmount = asText(body.loanAmount).trim();
  const propertyCity = asText(body.propertyCity).trim();
  const propertyState = asText(body.propertyState).trim();
  const message = asText(body.message).trim();
  const sourcePage = asText(body.sourcePage).trim();

  if (!fullName || !email) {
    return NextResponse.json(
      { error: 'Full name and email are required.' },
      { status: 400 }
    );
  }

  if (isRateLimited(ip)) {
    console.warn('[loan-requests] rate limit exceeded', { ip });
    return NextResponse.json(
      {
        error:
          'Too many requests. Please wait a few minutes and try again, or call us directly.',
      },
      { status: 429 }
    );
  }

  const supabase = getSupabaseServerClient();

  const { error } = await supabase.from('loan_requests').insert({
    full_name: fullName,
    email,
    phone: phone || null,
    company: company || null,
    loan_program: loanProgram || null,
    property_type: propertyType || null,
    loan_amount_requested: loanAmount ? Number(loanAmount) : null,
    property_city: propertyCity || null,
    property_state: propertyState || null,
    message: message || null,
    source_page: sourcePage || null,
    ip_address: ip === 'unknown' ? null : ip,
  });

  if (error) {
    console.error('loan_requests insert error:', error);
    return NextResponse.json(
      { error: 'Something went wrong submitting your request. Please try again or call us directly.' },
      { status: 500 }
    );
  }

  const notification: LoanRequestNotification = {
    fullName,
    email,
    phone,
    company,
    loanProgram,
    propertyType,
    loanAmount,
    propertyCity,
    propertyState,
    message,
    sourcePage,
  };

  await notifyWithFallback(notification);

  return NextResponse.json({ success: true });
}
