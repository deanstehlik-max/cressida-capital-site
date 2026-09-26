import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LoanProgramsTable, {
  getLoanRange,
  getProgramCount,
} from '@/components/LoanProgramsTable';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Loan Solutions \u2014 Commercial Real Estate Financing Programs',
  description:
    'Explore Cressida Capital\u2019s full range of commercial real estate loan programs: bridge, SBA, construction, multifamily, CMBS, investor, and small-balance direct lending.',
  alternates: { canonical: '/loan-solutions' },
};

const phoneHref = `tel:${brand.phone.replace(/[^\d]/g, '')}`;

export default function LoanSolutionsPage() {
  // Computed from the program list so the summary card stays accurate as
  // programs are added or changed — never hardcode these.
  const programCount = getProgramCount();
  const loanRange = getLoanRange();

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
        ]}
      />
      <Nav />

      {/* Hero */}
      <section className="bg-paper">
        <div className="max-w-[1180px] mx-auto px-8 py-16 grid grid-cols-1 min-[880px]:grid-cols-[1.5fr_0.9fr] gap-y-10 min-[880px]:gap-x-[64px] items-start">
          <div>
            <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
              Loan Solutions
            </h1>
            <p className="text-lg text-slate max-w-[60ch]">
              Cressida Capital arranges debt financing for commercial real
              estate nationwide, from $200K to $50M, across every stage of a
              property&rsquo;s lifecycle &mdash; acquisition, construction,
              stabilization, and long-term hold.
            </p>
          </div>

          <div className="border border-hair bg-white p-6 lg:p-8">
            <div className="text-[11px] uppercase tracking-wider text-grey mb-5">
              At a Glance
            </div>
            <dl className="text-sm">
              <SummaryRow label="Programs" value={String(programCount)} />
              <SummaryRow label="Loan Range" value={loanRange} valueClassName="text-brass" />
              <SummaryRow label="Coverage" value="Nationwide" last />
            </dl>
          </div>
        </div>
      </section>

      {/* Program list */}
      <section className="max-w-[1180px] mx-auto px-8 pb-16">
        <LoanProgramsTable />
      </section>

      {/* Closing CTA */}
      <section className="bg-forest text-paper">
        <div className="max-w-[1180px] mx-auto px-8 py-16 grid grid-cols-1 min-[880px]:grid-cols-[1.4fr_0.9fr] gap-y-8 min-[880px]:gap-x-[64px] items-center">
          <div>
            <h2 className="font-display text-[32px] font-medium max-w-[18ch]">
              Not Sure Which Program Fits?
            </h2>
            <p className="mt-4 text-[16.5px] text-[#C9D3CC] max-w-[52ch]">
              Tell a Cressida Loan Officer about the deal and we&rsquo;ll match
              it to the right structure.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#C9D3CC]">
              <a href={phoneHref} className="hover:text-brass-light">
                {brand.phone}
              </a>
              <span aria-hidden="true" className="text-[#6B7F76]">
                |
              </span>
              <a href={`mailto:${brand.email}`} className="hover:text-brass-light">
                {brand.email}
              </a>
            </div>
          </div>

          <div className="min-[880px]:text-right">
            <Link
              href="/start-a-loan-request"
              className="inline-block px-5 py-[11px] text-[13.5px] font-medium bg-brass border border-brass text-white hover:bg-transparent hover:text-brass-light transition-colors"
            >
              Start a Loan Request
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function SummaryRow({
  label,
  value,
  valueClassName,
  last,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 py-3 ${
        last ? '' : 'border-b border-hair'
      }`}
    >
      <dt className="text-grey">{label}</dt>
      <dd className={`font-semibold text-right ${valueClassName ?? ''}`}>
        {value}
      </dd>
    </div>
  );
}
