import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Investor Loans for Commercial Real Estate Portfolios',
  description:
    'Cressida Capital arranges investor financing from $1M to $50M for portfolio acquisitions, cash-out refinances, and recapitalizations across property types.',
  alternates: { canonical: '/loan-solutions/investor' },
};

const faqs = [
  {
    question: 'What is an investor loan in commercial real estate?',
    answer:
      'An investor loan finances income-producing property held for investment rather than owner occupancy \u2014 typically for acquisition, cash-out refinance, or recapitalization of a single asset or portfolio.',
  },
  {
    question: 'Can I finance a portfolio of properties with one loan?',
    answer:
      'Yes. Cressida Capital arranges cross-collateralized portfolio loans that combine multiple properties under a single facility, which can simplify closing and improve overall terms compared to financing each property separately.',
  },
  {
    question: 'What is a cash-out refinance?',
    answer:
      'A cash-out refinance replaces an existing loan with a new, larger loan against the property\u2019s current value, letting the owner pull out equity in cash \u2014 commonly used to fund further acquisitions or capital improvements.',
  },
];

export default function InvestorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
          { name: 'Investor', path: '/loan-solutions/investor' },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Investor Loans
        </h1>

        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Cressida Capital arranges investor financing from $1M to $50M for
          the acquisition, cash-out refinance, and recapitalization of
          income-producing commercial real estate, including
          cross-collateralized portfolio structures.
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 border-t border-b border-hair py-6">
          <Spec label="Loan Size" value="$1M \u2013 $50M" />
          <Spec label="Typical LTV" value="65\u201375%" />
          <Spec label="Term" value="5\u201310 years" />
          <Spec label="Property Types" value="Multifamily, retail, industrial, office, mixed-use" />
        </dl>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who this program is for
          </h2>
          <p className="text-slate">
            Real estate investors growing or repositioning a portfolio, who
            need financing structured around the deal rather than a single
            bank&rsquo;s standard box \u2014 whether that&rsquo;s pulling
            equity out of a stabilized property to fund the next
            acquisition, or combining several properties under one
            cross-collateralized facility.
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
          href="/contact"
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
