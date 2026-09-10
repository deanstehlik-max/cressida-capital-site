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
