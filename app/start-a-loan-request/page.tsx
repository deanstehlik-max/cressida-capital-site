import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import LoanRequestForm from '@/components/LoanRequestForm';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Start a Loan Request | Cressida Capital',
  description:
    'Start a commercial real estate loan request with Cressida Capital. Tell us about your deal and a loan officer will follow up, or call 877.308.5775.',
  alternates: { canonical: '/start-a-loan-request' },
};

export default function StartALoanRequestPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Start a Loan Request', path: '/start-a-loan-request' },
        ]}
      />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
        <div>
          <h1 className="font-display text-[40px] font-medium max-w-[16ch] mb-4">
            Start a Loan Request
          </h1>
          <p className="text-slate max-w-[46ch] mb-10">
            Tell us about your deal and a Cressida Loan Officer will follow
            up. For time-sensitive requests, calling directly is fastest.
          </p>

          <div className="border-t border-hair pt-6 space-y-4 text-sm">
            <ContactRow label="Phone" value={brand.phone} href={`tel:${brand.phone.replace(/[^\d]/g, '')}`} />
            <ContactRow label="Email" value={brand.email} href={`mailto:${brand.email}`} />
            <ContactRow label="Office" value={`${brand.city}, ${brand.region}`} />
            <ContactRow label="License" value={brand.license} />
          </div>
        </div>

        <LoanRequestForm sourcePage="/start-a-loan-request" />
      </div>

      <Footer />
    </>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = href ? (
    <a href={href} className="hover:text-forest">{value}</a>
  ) : (
    <span>{value}</span>
  );
  return (
    <div className="flex justify-between border-b border-hair pb-4">
      <span className="text-grey">{label}</span>
      <span className="font-medium">{content}</span>
    </div>
  );
}
