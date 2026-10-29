import { Resend } from 'resend';
import type { LoanRequestNotification } from './types';

const NOTIFY_TO = 'deans@cressidacapital.com';
const NOTIFY_FROM = 'noreply@cressidacapital.com';

function display(value: string | number | null | undefined): string {
  if (value == null) return '—';
  const text = String(value).trim();
  return text === '' ? '—' : text;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label: string, value: string | number | null | undefined): string {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(display(value))}</td>
  </tr>`;
}

function textLine(label: string, value: string | number | null | undefined): string {
  return `${label}: ${display(value)}`;
}

export async function sendLoanRequestEmail(data: LoanRequestNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable.');
  }

  const isBrokerReferral = data.sourcePage === '/for-brokers';
  const subject = isBrokerReferral
    ? `New Broker Referral: ${data.fullName}`
    : `New Loan Request: ${data.fullName}`;

  const html = `
    <h1 style="font-size:18px;margin:0 0 16px;">${escapeHtml(subject)}</h1>
    <table style="border-collapse:collapse;width:100%;font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;color:#111;">
      ${row('Full name', data.fullName)}
      ${row('Email', data.email)}
      ${row('Phone', data.phone)}
      ${row('Company', data.company)}
      ${row('Loan program', data.loanProgram)}
      ${row('Property type', data.propertyType)}
      ${row('Loan amount', data.loanAmount)}
      ${row('City', data.propertyCity)}
      ${row('State', data.propertyState)}
      ${row('Message', data.message)}
      ${row('Source page', data.sourcePage)}
    </table>
  `;

  const text = [
    subject,
    '',
    textLine('Full name', data.fullName),
    textLine('Email', data.email),
    textLine('Phone', data.phone),
    textLine('Company', data.company),
    textLine('Loan program', data.loanProgram),
    textLine('Property type', data.propertyType),
    textLine('Loan amount', data.loanAmount),
    textLine('City', data.propertyCity),
    textLine('State', data.propertyState),
    textLine('Message', data.message),
    textLine('Source page', data.sourcePage),
  ].join('\n');

  const resend = new Resend(apiKey);
  const { data: sent, error } = await resend.emails.send({
    from: NOTIFY_FROM,
    to: NOTIFY_TO,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }

  return sent;
}

export type LoanRequestAlertFailure = 'email' | 'ghl' | 'email-and-ghl';

const ALERT_SUBJECT: Record<LoanRequestAlertFailure, string> = {
  email: 'ALERT: Loan request email failed',
  ghl: 'ALERT: Loan request saved but HighLevel push failed',
  'email-and-ghl': 'ALERT: Loan request email and HighLevel push failed',
};

function clip(value: string, max = 1500): string {
  const text = value.trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

/**
 * Separate alert to the same internal inbox when the borrower email
 * or the HighLevel push did not go through. The lead is already in Supabase.
 */
export async function sendLoanRequestFallbackAlert(input: {
  failure: LoanRequestAlertFailure;
  data: LoanRequestNotification;
  detail: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable.');
  }

  const subject = `${ALERT_SUBJECT[input.failure]} — ${input.data.fullName}`;
  const intro =
    input.failure === 'ghl'
      ? 'The loan request was saved and the email notification was sent. The HighLevel CRM push failed. This separate alert is the fallback.'
      : 'The loan request was saved to Supabase. Delivery of the notification failed. This separate alert is the fallback.';

  const html = `
    <h1 style="font-size:18px;margin:0 0 12px;">${escapeHtml(subject)}</h1>
    <p style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;color:#111;">${escapeHtml(intro)}</p>
    <pre style="font-family:ui-monospace,monospace;font-size:12px;white-space:pre-wrap;background:#f6f7f6;padding:12px;">${escapeHtml(clip(input.detail))}</pre>
    <table style="border-collapse:collapse;width:100%;font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;color:#111;">
      ${row('Full name', input.data.fullName)}
      ${row('Email', input.data.email)}
      ${row('Phone', input.data.phone)}
      ${row('Company', input.data.company)}
      ${row('Loan program', input.data.loanProgram)}
      ${row('Property type', input.data.propertyType)}
      ${row('Loan amount', input.data.loanAmount)}
      ${row('City', input.data.propertyCity)}
      ${row('State', input.data.propertyState)}
      ${row('Message', input.data.message)}
      ${row('Source page', input.data.sourcePage)}
    </table>
  `;

  const text = [
    subject,
    '',
    intro,
    '',
    clip(input.detail),
    '',
    textLine('Full name', input.data.fullName),
    textLine('Email', input.data.email),
    textLine('Phone', input.data.phone),
    textLine('Company', input.data.company),
    textLine('Loan program', input.data.loanProgram),
    textLine('Property type', input.data.propertyType),
    textLine('Loan amount', input.data.loanAmount),
    textLine('City', input.data.propertyCity),
    textLine('State', input.data.propertyState),
    textLine('Message', input.data.message),
    textLine('Source page', input.data.sourcePage),
  ].join('\n');

  const resend = new Resend(apiKey);
  const { data: sent, error } = await resend.emails.send({
    from: NOTIFY_FROM,
    to: NOTIFY_TO,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(`Resend fallback alert failed: ${error.message}`);
  }

  return sent;
}
