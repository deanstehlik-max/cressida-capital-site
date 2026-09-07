import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LoanProgramsTable from '@/components/LoanProgramsTable';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Loan Solutions \u2014 Commercial Real Estate Financing Programs',
  description:
    'Explore Cressida Capital\u2019s full range of commercial real estate loan programs: bridge, SBA, construction, multifamily, CMBS, investor, and small-balance direct lending.',
  alternates: { canonical: '/loan-solutions' },
};

export default function LoanSolutionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
        ]}
      />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Loan Solutions
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-12">
          Cressida Capital arranges debt financing for commercial real estate
          nationwide, from $200K to $50M, across every stage of a
          property&rsquo;s lifecycle \u2014 acquisition, construction,
          stabilization, and long-term hold.
        </p>

        <LoanProgramsTable />
      </div>

      <Footer />
    </>
  );
}
