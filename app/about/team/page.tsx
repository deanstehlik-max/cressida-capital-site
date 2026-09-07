import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the loan officers, underwriting, and closing team behind Cressida Capital\u2019s commercial real estate financing and direct lending.',
  alternates: { canonical: '/about/team' },
};

const roles = [
  {
    title: 'Loan Officers',
    description:
      'Your primary point of contact from first inquiry through closing. Loan officers structure each request, identify the right financing program, and manage the relationship with lenders on your behalf.',
  },
  {
    title: 'Underwriting & Structuring',
    description:
      'Reviews property economics, borrower financials, and lender guidelines to pinpoint achievable loan amounts and terms before a request goes to market.',
  },
  {
    title: 'Closing & Coordination',
    description:
      'Manages due diligence, documentation, and lender coordination through funding, so financing closes on schedule.',
  },
];

export default function TeamPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
          { name: 'Team', path: '/about/team' },
        ]}
      />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Our Team
        </h1>
        <p className="text-lg text-slate max-w-[62ch] mb-14">
          Every Cressida Capital loan request is handled by a dedicated loan
          officer, backed by an in-house underwriting and closing team \u2014
          the same team structure whether your loan is $200K or $50M.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-b border-hair py-8 mb-14">
          {roles.map((role) => (
            <div key={role.title}>
              <h2 className="font-display text-lg font-medium mb-2">{role.title}</h2>
              <p className="text-sm text-slate">{role.description}</p>
            </div>
          ))}
        </div>

        <section className="max-w-[62ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Talk to a loan officer
          </h2>
          <p className="text-slate mb-6">
            Reach a Cressida Loan Officer directly at {brand.phone} or{' '}
            {brand.email}, or start a request online.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 text-sm font-medium bg-brass text-white"
          >
            Start a Loan Request
          </a>
        </section>
      </div>

      <Footer />
    </>
  );
}
