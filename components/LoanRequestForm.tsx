'use client';

import { useState } from 'react';
import { loanPrograms } from './LoanProgramsTable';

const propertyTypes = [
  'Retail',
  'Office',
  'Industrial',
  'Multifamily',
  'Hospitality',
  'Self-Storage',
  'Land',
  'Mixed-Use',
  'Other',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function LoanRequestForm({ sourcePage = '/contact' }: { sourcePage?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      fullName: data.get('fullName'),
      email: data.get('email'),
      phone: data.get('phone'),
      company: data.get('company'),
      loanProgram: data.get('loanProgram'),
      propertyType: data.get('propertyType'),
      loanAmount: data.get('loanAmount'),
      propertyCity: data.get('propertyCity'),
      propertyState: data.get('propertyState'),
      message: data.get('message'),
      sourcePage,
    };

    try {
      const res = await fetch('/api/loan-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Submission failed.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-forest bg-forest/5 p-8">
        <h3 className="font-display text-xl font-medium mb-2">Request received</h3>
        <p className="text-slate text-sm">
          A Cressida Loan Officer will reach out shortly. If your request is
          time-sensitive, call 877.308.5775 directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[640px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full name" name="fullName" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Company (optional)" name="company" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField label="Loan program" name="loanProgram">
          <option value="">Select a program</option>
          {loanPrograms.map((p) => (
            <option key={p.slug} value={p.slug}>{p.name}</option>
          ))}
        </SelectField>
        <SelectField label="Property type" name="propertyType">
          <option value="">Select a property type</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </SelectField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Field label="Loan amount requested" name="loanAmount" type="number" placeholder="$" />
        <Field label="Property city" name="propertyCity" />
        <Field label="Property state" name="propertyState" placeholder="CA" />
      </div>

      <div>
        <label className="block text-[13px] font-medium mb-1.5" htmlFor="message">
          Tell us about the deal
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full border border-hair px-3 py-2.5 text-sm focus:outline-none focus:border-forest"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-signal" style={{ color: '#C6482E' }}>{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-6 py-3 text-sm font-medium bg-brass text-white disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting\u2026' : 'Submit Loan Request'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium mb-1.5" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border border-hair px-3 py-2.5 text-sm focus:outline-none focus:border-forest"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium mb-1.5" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full border border-hair px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-forest"
      >
        {children}
      </select>
    </div>
  );
}
