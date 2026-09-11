import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import LoanRequestForm from '@/components/LoanRequestForm';

export const metadata: Metadata = {
  title: 'DSCR Loan Rates & Qualification \u2014 Investor Property Financing',
  description:
    'How DSCR loan pricing works, what ranges to expect, and how to qualify based on a property\u2019s rental income \u2014 no tax returns or W-2s required. Get a deal-specific DSCR rate from Cressida Capital.',
  alternates: { canonical: '/insights/dscr-loan-rates' },
};

const faqs = [
  {
    question: 'What is a good DSCR ratio?',
    answer:
      'A DSCR of 1.25 or higher means the property generates 25% more income than its debt payment requires \u2014 generally the strongest pricing tier. Most lenders, including Cressida, will still qualify deals down to a 1.0x floor, meaning the rent exactly covers the mortgage payment.',
  },
  {
    question: 'Can I get a DSCR loan with a ratio below 1.0x?',
    answer:
      'Cressida\u2019s DSCR floor is 1.0x. Below that, the property\u2019s income doesn\u2019t fully cover its debt service, and additional structure \u2014 lower leverage, larger reserves, or a different loan program \u2014 is typically required.',
  },
  {
    question: 'How do DSCR loan rates compare to a conventional mortgage?',
    answer:
      'DSCR rates typically run 0.5 to 1.5 percentage points above a comparable conventional loan. The trade-off is qualification speed and flexibility: no personal income documentation is required.',
  },
  {
    question: 'What\u2019s the maximum LTV on a DSCR loan?',
    answer:
      '75% across Cressida\u2019s DSCR programs, both General Commercial and Investor Residential.',
  },
  {
    question: 'Do DSCR loans work for short-term rentals?',
    answer:
      'Yes. Many lenders, including Cressida, will consider projected short-term rental income as part of the DSCR calculation \u2014 talk to an advisor about how your property\u2019s rental history or market comps factor into qualification.',
  },
  {
    question: 'How fast can a DSCR loan close?',
    answer:
      'Because there\u2019s no personal income verification, DSCR loans generally close faster than conventional financing \u2014 timelines depend on appraisal and title, not tax transcript processing.',
  },
  {
    question: 'Is a DSCR loan the same as a commercial loan?',
    answer:
      'Not exactly. DSCR loans are a category of investment-property financing that use property cash flow to qualify. They can apply to both 1\u20134 unit residential investment properties and small commercial assets, depending on the program.',
  },
];

const pricingTiers = [
  {
    program: 'Standard DSCR',
    size: 'Up to $5M (Investor Residential) / $3M (General Commercial)',
    ltv: '75%',
    tier: '1.10x and above',
    pricing: 'Our best available pricing tier \u2014 lowest spread over benchmark',
  },
  {
    program: 'Aggressive DSCR',
    size: 'Up to $5M (Investor Residential) / $3M (General Commercial)',
    ltv: '75%',
    tier: '1.0x floor',
    pricing: 'Slightly higher rate in exchange for more flexible qualification',
  },
];

const pricingFactors = [
  {
    label: 'DSCR ratio',
    detail:
      'A property generating 1.25x its debt service will price better than one at 1.0x. Cressida\u2019s floor is 1.0x \u2014 if the rent covers the mortgage payment, you may qualify.',
  },
  {
    label: 'Loan-to-value (LTV)',
    detail:
      'Cressida\u2019s DSCR programs cap at 75% LTV across the board. Lower leverage generally supports better pricing.',
  },
  {
    label: 'Credit profile',
    detail:
      'Stronger credit scores and larger reserves reduce risk and improve your rate.',
  },
  {
    label: 'Rate structure',
    detail:
      'Fixed vs. adjustable, and whether you accept a prepayment penalty, both move the number.',
  },
];

const programs = [
  {
    name: 'General Commercial DSCR / Mini-Perm',
    size: '$200,000\u2013$3,000,000',
    ltv: 'Up to 75%',
    bestFor: 'Stabilized commercial and mixed-use investment properties',
  },
  {
    name: 'Investor Residential DSCR',
    size: 'Up to $5,000,000',
    ltv: 'Up to 75%',
    bestFor:
      '1\u20134 unit and small multifamily rental portfolios, including higher-value single assets',
  },
];

const evaluates = [
  'DSCR ratio \u2014 net operating income divided by annual debt service (Cressida\u2019s minimum floor is 1.0x)',
  'Loan-to-value \u2014 up to 75% across our DSCR programs',
  'Credit score \u2014 stronger scores unlock better tiers and pricing',
  'Reserves \u2014 cash reserves after closing, typically several months of payments',
  'Property type and use \u2014 long-term rental, short-term rental, and mixed-use are all considered case by case',
];

export default function DscrLoanRatesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: 'DSCR Loan Rates', path: '/insights/dscr-loan-rates' },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <div className="text-xs text-grey mb-3">Updated September 2026</div>
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          DSCR Loan Rates &amp; Qualification
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Debt Service Coverage Ratio (DSCR) loans let real estate investors
          qualify based on a property&rsquo;s rental income instead of personal
          tax returns or W-2s. Below is how DSCR pricing works, what ranges to
          expect, and what it takes to qualify.
        </p>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-medium mb-6">
            Current DSCR loan pricing
          </h2>
          <div className="border-t border-ink">
            <div className="hidden lg:grid grid-cols-[1fr_1.7fr_0.5fr_1fr_1.8fr] gap-4 text-[11.5px] text-grey py-3">
              <span>Loan Program</span>
              <span>Max Loan Size</span>
              <span>LTV</span>
              <span>DSCR Tier</span>
              <span>Pricing</span>
            </div>
            {pricingTiers.map((t) => (
              <div
                key={t.program}
                className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr_0.5fr_1fr_1.8fr] gap-1.5 lg:gap-4 py-5 border-b border-hair lg:items-baseline"
              >
                <span className="font-display text-[17px] font-medium">
                  {t.program}
                </span>
                <span className="text-[13.5px] text-slate">{t.size}</span>
                <span className="text-[13.5px] text-slate">{t.ltv}</span>
                <span className="text-[13.5px] text-slate">{t.tier}</span>
                <span className="text-[13.5px] text-slate">{t.pricing}</span>
              </div>
            ))}
          </div>
          <p className="text-slate text-sm max-w-[70ch] mt-5">
            DSCR pricing moves with the broader rate market and shifts with each
            deal&rsquo;s specific profile, so we don&rsquo;t publish a static
            rate table &mdash; a number posted today can be stale within days.{' '}
            <a href="#get-your-rate" className="text-forest underline">
              Get your current rate
            </a>{' '}
            for an exact, deal-specific quote.
          </p>
          <p className="text-slate text-sm max-w-[70ch] mt-4">
            <strong className="font-medium">How this compares:</strong> DSCR
            rates typically run 0.5 to 1.5 percentage points above a
            conventional 30-year fixed mortgage, depending on your DSCR tier,
            LTV, and credit profile. That premium buys you approval based on the
            property&rsquo;s cash flow, with no personal income documentation,
            tax returns, or employment verification required.
          </p>
        </section>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            How DSCR pricing works
          </h2>
          <p className="text-slate mb-6">
            DSCR pricing isn&rsquo;t a single number &mdash; it moves with four
            main factors:
          </p>
          <div className="divide-y divide-hair border-t border-hair">
            {pricingFactors.map((factor) => (
              <div key={factor.label} className="py-4">
                <h3 className="font-medium mb-1">{factor.label}</h3>
                <p className="text-slate text-sm">{factor.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-slate text-sm mt-6">
            DSCR loans price at a spread above the broader bond market &mdash;
            movements in the 10-year Treasury yield show up in DSCR quotes within
            days. If you&rsquo;re comparing quotes across lenders, make sure
            you&rsquo;re comparing the same DSCR tier, LTV, and prepay structure
            &mdash; a 50-basis-point difference often just reflects a different
            deal profile, not a better lender.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-medium mb-6">
            Which DSCR program fits your deal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <div key={program.name} className="border border-hair p-6">
                <h3 className="font-display text-lg font-medium mb-4">
                  {program.name}
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-[11.5px] text-grey mb-0.5">Loan size</dt>
                    <dd className="font-medium">{program.size}</dd>
                  </div>
                  <div>
                    <dt className="text-[11.5px] text-grey mb-0.5">LTV</dt>
                    <dd className="font-medium">{program.ltv}</dd>
                  </div>
                  <div>
                    <dt className="text-[11.5px] text-grey mb-0.5">Best for</dt>
                    <dd className="text-slate">{program.bestFor}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="text-slate text-sm mt-6">
            Not sure which applies to your property?{' '}
            <a href="#get-your-rate" className="text-forest underline">
              Talk to a loan advisor &rarr;
            </a>
          </p>
        </section>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            DSCR loan qualification requirements
          </h2>
          <p className="text-slate mb-6">
            Unlike a conventional mortgage, a DSCR loan doesn&rsquo;t ask for tax
            returns, pay stubs or W-2s, or personal debt-to-income calculations.
            Instead, lenders evaluate:
          </p>
          <ul className="space-y-3">
            {evaluates.map((item) => (
              <li key={item} className="text-slate text-sm flex gap-2">
                <span className="text-forest">&mdash;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate text-sm mt-6">
            This makes DSCR financing a strong fit for self-employed investors,
            portfolio landlords, and borrowers whose tax returns understate their
            actual cash flow.
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

        <section id="get-your-rate" className="border-t border-ink pt-12 scroll-mt-24">
          <h2 className="font-display text-2xl font-medium mb-3">
            Get your current DSCR rate
          </h2>
          <p className="text-slate max-w-[60ch] mb-10">
            DSCR pricing depends on your specific deal, credit profile, and
            property &mdash; the only way to get an accurate number is a
            scenario-based quote. Tell us about the property and a Cressida Loan
            Officer will follow up with a deal-specific rate.
          </p>
          <LoanRequestForm sourcePage="/insights/dscr-loan-rates" />
        </section>
      </div>

      <Footer />
    </>
  );
}
