import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Residential Portfolio Loans for Non-Owner-Occupied Investors',
  description:
    'Cressida Capital arranges structured financing for investors who own portfolios of non-owner-occupied 1-4 family residential homes across the United States.',
  alternates: { canonical: '/loan-solutions/residential-portfolio' },
};

const faqs = [
  {
    question: 'What is a residential portfolio loan?',
    answer:
      'A residential portfolio loan finances a group of non-owner-occupied 1-4 family residential properties under a single facility, rather than requiring a separate mortgage for each property.',
  },
  {
    question: 'Who qualifies for residential portfolio financing?',
    answer:
      'Investors who own or are acquiring multiple non-owner-occupied single-family or small multifamily (1-4 unit) rental properties located anywhere in the United States.',
  },
  {
    question: 'Can I add properties to an existing portfolio loan?',
    answer:
      'Structures vary by lender, but many portfolio facilities are designed to accommodate future acquisitions being added to or refinanced under the same facility. Cressida Capital structures this based on the investor\u2019s growth plans.',
  },
];

export default function ResidentialPortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
          { name: 'Residential Portfolio', path: '/loan-solutions/residential-portfolio' },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Residential Portfolio Loans
        </h1>

        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Cressida Capital arranges structured financing for investors who
          own portfolios of non-owner-occupied 1-4 family residential homes
          located anywhere in the United States.
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 border-t border-b border-hair py-6">
          <Spec label="Loan Size" value="Varies by portfolio" />
          <Spec label="Property Types" value="Non-owner-occupied 1-4 unit residential" />
          <Spec label="Coverage" value="Nationwide" />
          <Spec label="Structure" value="Single facility across multiple properties" />
        </dl>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who this program is for
          </h2>
          <p className="text-slate">
            Investors who own portfolios of rental homes often struggle to
            find a single lender willing to finance the group as one deal.
            Cressida Capital&rsquo;s investor network offers innovative
            structured financing built specifically for non-owner-occupied
            residential portfolios, simplifying what would otherwise be a
            property-by-property financing process.
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
