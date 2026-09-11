import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import LoanRequestForm from '@/components/LoanRequestForm';

export const metadata: Metadata = {
  title:
    'The CRE Debt Maturity Wall (2026\u20132027) \u2014 Refinancing Guide',
  description:
    'A historic volume of U.S. commercial real estate debt matures in 2026 and 2027. What owners need to know before refinancing \u2014 DSCR, bridge, SBA 504, and mini-perm paths, plus what lenders want now.',
  alternates: { canonical: '/insights/cre-debt-maturity-wall' },
};

// FAQ copy is sourced verbatim from cre-debt-maturity-wall-faq-schema.json.
// The same array feeds both FaqJsonLd and the visible FAQ section so the
// structured data always matches the on-page text exactly.
const faqs = [
  {
    question:
      'What happens if my commercial loan matures and I can\u2019t refinance?',
    answer:
      'Options generally include a short-term extension or modification from your existing lender, a bridge loan to buy additional time, or in some cases a forced sale. Lenders have signaled reduced willingness to grant open-ended extensions compared to prior years, which makes early planning more important than in past cycles.',
  },
  {
    question: 'Can I refinance a maturing CRE loan with a DSCR loan?',
    answer:
      'Yes, for stabilized rental and investment properties that meet DSCR qualification \u2014 generally a minimum 1.0x debt service coverage ratio and up to 75% loan-to-value, depending on the program.',
  },
  {
    question:
      'What\u2019s the difference between a bridge loan and a permanent refinance?',
    answer:
      'A bridge loan is short-term financing meant to carry a property through a transition \u2014 lease-up, renovation, or stabilization \u2014 before it qualifies for permanent, longer-term financing. A permanent refinance replaces the original loan with longer-term debt sized to the property\u2019s stabilized performance.',
  },
  {
    question: 'How much of the 2026\u20132027 maturity wall is office debt?',
    answer:
      'Office represents a meaningful share of maturities and remains the most closely watched property type due to elevated vacancy, though its share of total maturities has been trending down from its post-pandemic peak as more distressed office debt works through the system.',
  },
  {
    question: 'How early should I start planning for a loan maturity?',
    answer:
      'Most advisors recommend starting the refinance conversation 6 to 12 months ahead of your maturity date \u2014 enough time to address any gaps in DSCR, valuation, or documentation before the deadline becomes urgent.',
  },
];

const reasons = [
  {
    label: 'Debt service coverage tightens.',
    detail:
      'A loan that comfortably cleared a 1.25x DSCR at origination may not clear 1.0x at today\u2019s rates without a paydown or additional equity.',
  },
  {
    label: 'Property valuations have shifted.',
    detail:
      'Higher cap rates in several sectors mean loan-to-value ratios calculated at today\u2019s appraised value can look different than they did three to five years ago.',
  },
  {
    label: 'Lenders are underwriting more conservatively.',
    detail:
      'Reserve requirements, DSCR floors, and documentation standards have generally tightened since the last refinancing cycle for many of these borrowers.',
  },
];

const exposed = [
  {
    label: 'Office properties',
    detail:
      'remain the most closely watched segment, carrying elevated vacancy and delinquency relative to other property types, though the share of maturities concentrated in office has been gradually declining from its post-pandemic peak.',
  },
  {
    label: 'CMBS, CLO, and other securitized loans',
    detail:
      'represent a meaningful share of 2026 maturities and often carry less flexibility for extension than portfolio loans held by banks or life insurance companies.',
  },
  {
    label: 'Bridge and short-term loans',
    detail:
      'originated during the 2021 origination boom are reaching the end of their terms without the stabilized performance history a permanent lender may want to see.',
  },
  {
    label: 'Multifamily and industrial',
    detail:
      'assets have generally fared better, though owners with over-leveraged 2021-era acquisitions are not immune to the same rate reset.',
  },
];

const refiPaths = [
  {
    name: 'Bridge-to-permanent financing',
    detail:
      'If your property isn\u2019t quite ready for permanent financing \u2014 whether due to lease-up, renovation, or a temporary performance gap \u2014 a bridge loan can buy the time needed to stabilize before locking into a permanent refinance.',
  },
  {
    name: 'DSCR refinancing',
    detail:
      'For stabilized rental and investment properties, a DSCR loan qualifies based on the property\u2019s income rather than personal tax returns, which can be a faster and more flexible path than a conventional bank refinance.',
    linkHref: '/insights/dscr-loan-rates',
    linkLabel: 'See current DSCR loan qualification details \u2192',
  },
  {
    name: 'SBA 504 refinancing',
    detail:
      'Owner-occupied commercial borrowers may be able to refinance existing debt through the SBA 504 program, which includes provisions specifically for refinancing eligible commercial real estate debt.',
  },
  {
    name: 'General Commercial / Mini-Perm refinancing',
    detail:
      'For stabilized commercial assets that no longer fit their original loan structure, a mini-perm can bridge to a longer-term solution or serve as the permanent refinance itself.',
  },
];

const lenderCriteria = [
  {
    label: 'DSCR minimums',
    detail:
      'expect underwriting closer to a 1.0x floor at minimum, with stronger pricing reserved for deals clearing 1.10x or higher.',
  },
  {
    label: 'Loan-to-value discipline',
    detail:
      '75% LTV is a common ceiling across many direct lending programs today, down from looser standards in prior cycles.',
  },
  {
    label: 'Larger reserve requirements',
    detail:
      'lenders are generally asking for more post-closing liquidity than they did three to five years ago.',
  },
  {
    label: 'Realistic valuations',
    detail:
      'an appraisal grounded in current market cap rates, not the value assumed at your last refinance.',
  },
];

export default function CreDebtMaturityWallPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          {
            name: 'CRE Debt Maturity Wall',
            path: '/insights/cre-debt-maturity-wall',
          },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <div className="text-xs text-grey mb-3">Updated September 2026</div>
        <h1 className="font-display text-[40px] font-medium max-w-[24ch] mb-4">
          The CRE Debt Maturity Wall: What Owners Need to Know Before
          Refinancing
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-10">
          A historic volume of commercial real estate debt is coming due over
          the next two years &mdash; and most of it was originated at rates well
          below where the market sits today. If you have a commercial mortgage
          maturing in 2026 or 2027, refinancing on the same terms you got last
          time is not a safe assumption.
        </p>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            The scale of the problem
          </h2>
          <p className="text-slate mb-5">
            According to the Mortgage Bankers Association&rsquo;s 2025 Commercial
            Real Estate Survey of Loan Maturity Volumes, roughly $875 billion of
            the $5.0 trillion in outstanding U.S. commercial mortgages is
            scheduled to mature in 2026, with another $652 billion following in
            2027. S&amp;P Global Market Intelligence, using a different
            methodology, puts the number higher &mdash; projecting the maturity
            wall will keep climbing before peaking near $1.26 trillion in 2027.
          </p>
          <p className="text-slate">
            The two estimates differ because they measure different things: MBA
            surveys loan servicers for year-end balances (which already reflect
            extensions and workouts), while S&amp;P models maturities directly
            from property-level records. Either way, the conclusion is the same
            &mdash; a very large volume of CRE debt has to be refinanced,
            extended, recapitalized, or sold over the next two to three years,
            and lenders have signaled that open-ended &ldquo;extend and
            pretend&rdquo; workouts are largely over.
          </p>
        </section>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Why this refinancing cycle is different
          </h2>
          <p className="text-slate mb-6">
            Much of the debt maturing now was originated during the
            ultra-low-rate period of 2020&ndash;2021, when five- to ten-year
            commercial loan terms were common. Borrowers refinancing today are
            moving from those historically low rates into a materially higher
            cost of capital &mdash; often a jump of one to two full percentage
            points or more, depending on property type and loan vintage.
          </p>
          <p className="text-slate mb-6">That gap matters for three reasons:</p>
          <ol className="divide-y divide-hair border-t border-hair list-none">
            {reasons.map((reason, i) => (
              <li key={reason.label} className="py-4 flex gap-3">
                <span className="font-display text-forest text-lg leading-none pt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-medium mb-1">{reason.label}</h3>
                  <p className="text-slate text-sm">{reason.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who&rsquo;s most exposed
          </h2>
          <ul className="space-y-3">
            {exposed.map((item) => (
              <li key={item.label} className="text-slate text-sm flex gap-2">
                <span className="text-forest">&mdash;</span>
                <span>
                  <strong className="font-medium">{item.label}</strong>{' '}
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-medium mb-6">
            Refinancing paths worth evaluating
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {refiPaths.map((path) => (
              <div key={path.name} className="border border-hair p-6">
                <h3 className="font-display text-lg font-medium mb-3">
                  {path.name}
                </h3>
                <p className="text-slate text-sm">{path.detail}</p>
                {path.linkHref && (
                  <p className="mt-3">
                    <Link
                      href={path.linkHref}
                      className="text-forest underline text-sm"
                    >
                      {path.linkLabel}
                    </Link>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            What lenders are looking for right now
          </h2>
          <div className="divide-y divide-hair border-t border-hair">
            {lenderCriteria.map((item) => (
              <div key={item.label} className="py-4">
                <h3 className="font-medium mb-1">{item.label}</h3>
                <p className="text-slate text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-slate text-sm mt-6">
            The practical takeaway: don&rsquo;t assume your next loan will look
            like your last one. Starting the refinance conversation
            6&ndash;12 months before your maturity date gives you time to
            address gaps &mdash; whether that means paying down principal,
            bringing in additional equity, or choosing a different loan
            structure entirely.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-medium mb-6">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-hair">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-slate text-sm max-w-[65ch]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="talk-to-advisor"
          className="border-t border-ink pt-12 scroll-mt-24"
        >
          <h2 className="font-display text-2xl font-medium mb-3">
            Talk to a loan advisor about your maturity date
          </h2>
          <p className="text-slate max-w-[60ch] mb-10">
            If you have a commercial loan maturing in the next 12&ndash;18
            months, the earlier you start the conversation, the more options you
            have. Tell us about the property and a Cressida Loan Officer will
            follow up.
          </p>
          <LoanRequestForm sourcePage="/insights/cre-debt-maturity-wall" />
        </section>
      </div>

      <Footer />
    </>
  );
}
