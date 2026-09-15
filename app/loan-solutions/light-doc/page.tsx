import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Light Doc Program \u2014 Small-Balance Commercial Real Estate Loans',
  description:
    'Cressida Direct offers small-balance commercial real estate loans from $200K to $3M with simplified documentation, financed directly rather than brokered.',
  alternates: { canonical: '/loan-solutions/light-doc' },
};

const faqs = [
  {
    question: 'What is a light documentation ("light doc") commercial loan?',
    answer:
      'A light doc loan simplifies the underwriting paperwork typically required for a commercial mortgage \u2014 often relying more on property cash flow and equity than extensive borrower financial documentation \u2014 which speeds up approval and closing for smaller loan amounts.',
  },
  {
    question: 'What loan sizes does the Light Doc Program cover?',
    answer: `Cressida Direct's Light Doc Program finances small-balance commercial real estate loans from ${brand.stats.directLendingRange}.`,
  },
  {
    question: 'Is the Light Doc Program brokered or direct?',
    answer:
      'The Light Doc Program is funded directly through Cressida Direct, Cressida Capital\u2019s nationwide direct lending platform, rather than brokered out to a third-party bank.',
  },
];

export default function LightDocPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Loan Solutions', path: '/loan-solutions' },
          { name: 'Light Doc Program', path: '/loan-solutions/light-doc' },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Light Doc Program
        </h1>

        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Cressida Direct is a nationwide direct lender offering small-balance
          commercial real estate loans from {brand.stats.directLendingRange}{' '}
          with simplified documentation, funded directly rather than brokered
          to a third-party bank.
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 border-t border-b border-hair py-6">
          <Spec label="Loan Size" value={brand.stats.directLendingRange} />
          <Spec label="Typical LTV" value="Up to 70%" />
          <Spec label="Term" value="5\u201330 years" />
          <Spec label="Funding" value="Direct \u2014 Cressida Direct" />
        </dl>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who this program is for
          </h2>
          <p className="text-slate">
            Owners of smaller commercial properties often get overlooked by
            banks whose minimum loan sizes and documentation requirements are
            built for much larger deals. The Light Doc Program is built
            specifically for small-balance commercial real estate, funded
            directly by Cressida rather than shopped to outside banks, which
            keeps underwriting fast and documentation simple.
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
