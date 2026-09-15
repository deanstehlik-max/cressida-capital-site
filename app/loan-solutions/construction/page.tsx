import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Commercial Construction Loans',
  description:
    'Cressida Capital arranges commercial construction loans from $2M to $40M, financing up to 80% loan-to-cost for ground-up development and major renovation.',
  alternates: { canonical: '/loan-solutions/construction' },
};

const faqs = [
  {
    question: 'What is loan-to-cost (LTC) in a construction loan?',
    answer:
      'Loan-to-cost measures the loan amount against total project cost \u2014 land, hard costs, soft costs, and fees \u2014 rather than the finished value of the property. Construction loans through Cressida Capital typically go up to 80% LTC.',
  },
  {
    question: 'Do construction loans require pre-leasing or pre-sales?',
    answer:
      'Requirements vary by lender and asset class. Some lenders require a minimum level of pre-leasing or pre-sales before closing, while others weigh sponsor experience and market fundamentals more heavily. Cressida Capital matches each deal to lenders whose guidelines fit the project.',
  },
  {
    question: 'What property types qualify for construction financing?',
    answer:
      'Ground-up development and substantial renovation across multifamily, industrial, retail, office, hospitality, and mixed-use property types.',
  },
  {
    question: 'How is a construction loan different from a bridge loan?',
    answer:
      'A construction loan funds in stages (draws) as work is completed and is used for ground-up development or major renovation. A bridge loan funds in a single disbursement and is typically used for acquisition or light repositioning of an already-standing property.',
  },
];

export default function ConstructionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
          { name: 'Construction', path: '/loan-solutions/construction' },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Construction Loans
        </h1>

        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Cressida Capital arranges commercial construction loans from $2M to
          $40M, financing up to 80% of total project cost for ground-up
          development and major renovation across most commercial property
          types.
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 border-t border-b border-hair py-6">
          <Spec label="Loan Size" value="$2M \u2013 $40M" />
          <Spec label="Typical LTC" value="Up to 80%" />
          <Spec label="Term" value="18\u201336 months" />
          <Spec label="Property Types" value="Multifamily, industrial, retail, office, hospitality" />
        </dl>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who this program is for
          </h2>
          <p className="text-slate">
            Developers and sponsors building ground-up projects or executing
            major renovations need a lender that understands entitlements,
            cost overruns, and future value \u2014 and that can balance
            recourse, pre-leasing, and leverage against the specifics of the
            asset class and submarket. Cressida Capital negotiates terms with
            lenders whose guidelines fit the project&rsquo;s risk profile
            rather than forcing every deal into one bank&rsquo;s box.
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
