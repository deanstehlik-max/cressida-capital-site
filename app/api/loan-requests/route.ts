import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { sendLoanRequestEmail } from '@/lib/notifications/email';
import { pushToGhl, ghlOverridesForSourcePage } from '@/lib/notifications/ghl';
import type { LoanRequestNotification } from '@/lib/notifications/types';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { fullName, email, phone, company, loanProgram, propertyType, loanAmount, propertyCity, propertyState, message, sourcePage } = body;

  if (!fullName || !email) {
    return NextResponse.json(
      { error: 'Full name and email are required.' },
      { status: 400 }
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
    ip_address: req.headers.get('x-forwarded-for') || null,
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

  const [emailResult, ghlResult] = await Promise.allSettled([
    sendLoanRequestEmail(notification),
    pushToGhl(notification, ghlOverridesForSourcePage(sourcePage)),
  ]);

  if (emailResult.status === 'rejected') {
    console.error('loan_requests email notification failed:', emailResult.reason);
  }
  if (ghlResult.status === 'rejected') {
    console.error('loan_requests GHL notification failed:', ghlResult.reason);
  }

  return NextResponse.json({ success: true });
}
