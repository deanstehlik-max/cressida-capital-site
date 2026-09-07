import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'SBA 7(a) & 504 Loans for Commercial Real Estate',
  description:
    'Cressida Capital arranges SBA 7(a) and SBA 504 loans from $500K to $15M through a nationwide network of partner banks, with financing up to 90% LTV.',
  alternates: { canonical: '/loan-solutions/sba' },
};

const faqs = [
  {
    question: 'What is the difference between an SBA 7(a) and SBA 504 loan?',
    answer:
      'An SBA 7(a) loan is a general-purpose government-guaranteed loan that can cover real estate, equipment, and working capital in one facility. An SBA 504 loan is structured specifically for fixed assets like owner-occupied commercial real estate, typically split between a bank loan and a lower-rate certified development company (CDC) debenture.',
  },
  {
    question: 'How much down payment is required for an SBA loan?',
    answer:
      'SBA financing typically allows down payments as low as 10%, meaning financing up to 90% of the project cost, compared to the 25-35% often required by conventional commercial bank loans.',
  },
  {
    question: 'What property types qualify for SBA financing?',
    answer:
      'SBA loans are available for owner-occupied commercial real estate, including office, retail, industrial, medical, hospitality, and other business-use properties. The business must occupy at least 51% of the property.',
  },
  {
    question: 'How long does SBA loan approval take?',
    answer:
      'Timelines vary by lender and deal complexity, but working through Cressida Capital\u2019s network of partner banks typically speeds up underwriting compared to applying directly at a single bank.',
  },
];

export default function SbaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
          { name: 'SBA 7(a) / 504', path: '/loan-solutions/sba' },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          SBA 7(a) &amp; 504 Loans
        </h1>

        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Cressida Capital arranges SBA 7(a) and SBA 504 loans from $500K to
          $15M for small business owners buying or refinancing owner-occupied
          commercial real estate, through a nationwide network of national,
          regional, and community bank partners.
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 border-t border-b border-hair py-6">
          <Spec label="Loan Size" value="$500K \u2013 $15M" />
          <Spec label="Typical LTV" value="Up to 90%" />
          <Spec label="Term" value="10\u201325 years" />
          <Spec label="Property Types" value="Owner-occupied commercial (51%+ occupancy)" />
        </dl>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who this program is for
          </h2>
          <p className="text-slate">
            SBA financing suits small business owners who occupy the majority
            of the property they&rsquo;re financing and want lower down
            payments, longer amortization, and more flexible underwriting
            than a conventional bank loan allows. Cressida Capital&rsquo;s
            network of partner banks provides creative loan structures
            designed to preserve cash flow across business types and
            geographies nationwide.
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
