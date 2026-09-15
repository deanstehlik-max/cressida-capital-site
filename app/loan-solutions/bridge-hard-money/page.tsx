import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Bridge & Hard Money Loans for Commercial Real Estate',
  description:
    'Cressida Capital arranges bridge and hard money loans from $1M to $50M for time-sensitive commercial real estate acquisitions, refinances, and repositioning.',
  alternates: { canonical: '/loan-solutions/bridge-hard-money' },
};

// Real FAQ content, shown on the page AND passed to FaqJsonLd — schema
// should describe what's actually visible, never hidden text.
const faqs = [
  {
    question: 'What is a commercial bridge loan?',
    answer:
      'A commercial bridge loan is short-term financing (typically 6 to 36 months) used to acquire, refinance, or reposition a commercial property before permanent financing is in place. It closes faster than a conventional bank loan and is often used for time-sensitive deals.',
  },
  {
    question: 'How fast can a bridge loan close?',
    answer:
      'Bridge loans arranged through Cressida Capital can often close in 2 to 4 weeks, depending on property type, documentation, and title/appraisal turnaround, compared to 60-90+ days for a conventional bank loan.',
  },
  {
    question: 'What loan-to-value (LTV) can I expect on a bridge loan?',
    answer:
      'Typical bridge loan LTVs range from 65% to 75% of the property\u2019s value, depending on property type, condition, and sponsor experience.',
  },
  {
    question: 'What property types qualify for bridge or hard money financing?',
    answer:
      'Cressida\u2019s bridge lender network finances multifamily, anchored and unanchored retail, industrial, mobile home and RV parks, land, construction, warehouse, office, hospitality, and assisted living/skilled nursing properties.',
  },
];

export default function BridgeHardMoneyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
          { name: 'Bridge & Hard Money', path: '/loan-solutions/bridge-hard-money' },
        ]}
      />
      <FaqJsonLd items={faqs} />

      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Bridge &amp; Hard Money Loans
        </h1>

        {/* Answer-first paragraph: direct answer in the first 1-2 sentences,
            the pattern AI engines extract most reliably. */}
        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Cressida Capital arranges bridge and hard money loans from $1M to
          $50M for commercial real estate that needs to close fast &mdash;
          typically in 2 to 4 weeks &mdash; for acquisitions, refinances, and
          repositioning that conventional bank financing can&rsquo;t
          accommodate on time.
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 border-t border-b border-hair py-6">
          <Spec label="Loan Size" value="$1M \u2013 $50M" />
          <Spec label="Typical LTV" value="65\u201375%" />
          <Spec label="Term" value="6\u201336 months" />
          <Spec
            label="Property Types"
            value="Multifamily, retail, industrial, office, hospitality, land"
          />
        </dl>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who this program is for
          </h2>
          <p className="text-slate">
            Bridge financing suits owners and investors who need certainty of
            execution on a compressed timeline: an opportunistic acquisition
            with a tight closing window, a maturing loan that needs to be
            refinanced before a bank facility is ready, or a property being
            repositioned (renovated, re-tenanted, or stabilized) before it
            qualifies for permanent financing.
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

        <a
          href="/start-a-loan-request"
          className="inline-block px-6 py-3 text-sm font-medium bg-brass text-white"
        >
          Start a Loan Request
        </a>
      </div>

      <Footer />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11.5px] text-grey mb-1">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
