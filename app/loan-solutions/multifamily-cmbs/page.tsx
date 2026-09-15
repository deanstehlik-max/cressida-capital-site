import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Multifamily & CMBS Loans for Commercial Real Estate',
  description:
    'Cressida Capital arranges multifamily and CMBS financing from $1M to $75M, including non-recourse options through life companies and conduit lenders.',
  alternates: { canonical: '/loan-solutions/multifamily-cmbs' },
};

const faqs = [
  {
    question: 'What is a CMBS loan?',
    answer:
      'A CMBS (commercial mortgage-backed securities) loan is a fixed-rate, typically non-recourse loan that is pooled with other commercial mortgages and sold to investors as bonds. CMBS loans often offer competitive fixed rates and 10-year terms for stabilized properties.',
  },
  {
    question: 'What loan-to-value is typical for multifamily financing?',
    answer:
      'Multifamily and CMBS financing arranged through Cressida Capital typically runs 70% to 80% LTV, depending on property stabilization, market, and sponsor strength.',
  },
  {
    question: 'Is CMBS financing non-recourse?',
    answer:
      'Most CMBS loans are non-recourse to the borrower, aside from standard "bad boy" carve-outs for fraud or misrepresentation, which is a key reason sponsors choose CMBS over recourse bank debt.',
  },
  {
    question: 'Can I prepay a CMBS loan early?',
    answer:
      'CMBS loans typically include yield maintenance or defeasance provisions that make early prepayment costly. Loan structure should account for anticipated hold period before closing.',
  },
];

export default function MultifamilyCmbsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
          { name: 'Multifamily & CMBS', path: '/loan-solutions/multifamily-cmbs' },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Multifamily &amp; CMBS Loans
        </h1>

        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Cressida Capital arranges multifamily and CMBS financing from $1M
          to $75M, connecting stabilized property owners with life companies,
          conduit lenders, and agency programs for competitive, often
          non-recourse, long-term debt.
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 border-t border-b border-hair py-6">
          <Spec label="Loan Size" value="$1M \u2013 $75M" />
          <Spec label="Typical LTV" value="70\u201380%" />
          <Spec label="Term" value="5\u201310 years" />
          <Spec label="Property Types" value="Stabilized multifamily and commercial" />
        </dl>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who this program is for
          </h2>
          <p className="text-slate">
            Owners of stabilized multifamily or commercial properties looking
            to refinance or acquire with long-term, fixed-rate debt.
            Structuring this financing well means balancing loan term and
            guarantor requirements against property economics and investor
            goals \u2014 whether that ends up being a 5-year balloon, a
            20-year fully amortizing life company loan, or a non-recourse
            10-year fixed CMBS execution.
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
