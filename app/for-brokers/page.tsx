import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import LoanRequestForm from '@/components/LoanRequestForm';

export const metadata: Metadata = {
  title: 'For Brokers \u2014 Refer Commercial Real Estate Deals',
  description:
    'Refer commercial real estate financing deals to Cressida Capital. Co-broker or refer outright \u2014 we handle underwriting, lender placement, and closing.',
  alternates: { canonical: '/for-brokers' },
};

const faqs = [
  {
    question: 'How does Cressida Capital\u2019s broker referral program work?',
    answer:
      'Submit a deal summary through the form on this page. Cressida Capital will review the request, contact you to discuss terms, and handle underwriting and lender placement. Referring brokers are compensated according to a co-broker agreement executed before closing.',
  },
  {
    question: 'Do I stay involved in the deal after referring it?',
    answer:
      'That\u2019s your choice. Some brokers prefer to co-broker and stay involved through closing; others prefer a clean referral and step back once the introduction is made. Either way, referral terms are documented up front.',
  },
  {
    question: 'What loan sizes and property types can be referred?',
    answer:
      'Any commercial real estate financing need Cressida Capital arranges \u2014 bridge, SBA, construction, multifamily, CMBS, investor, and small-balance direct lending from $200K to $50M \u2014 across all major property types.',
  },
  {
    question: 'Is there a fee to refer a deal?',
    answer:
      'No. There is no cost to submit a referral. Compensation to the referring broker is paid by Cressida Capital according to the co-broker agreement, not charged to the broker.',
  },
];

export default function ForBrokersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'For Brokers', path: '/for-brokers' },
        ]}
      />
      <FaqJsonLd items={faqs} />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          For Brokers
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-12">
          Refer a commercial real estate financing deal to Cressida Capital
          and we handle underwriting, lender placement, and closing —
          co-broker and stay involved, or step back once the introduction is
          made.
        </p>

        <section className="mb-16 max-w-[62ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            We Protect Our Brokers
          </h2>
          <p className="text-slate">
            We know your relationships are your business. Cressida Capital
            protects our brokers and referral sources on every deal — no
            exceptions, no circumvention. When you bring us a client, that
            relationship stays yours for the life of the deal and beyond.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
          <section>
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

          <section>
            <h2 className="font-display text-2xl font-medium mb-6">
              Submit a referral
            </h2>
            <LoanRequestForm sourcePage="/for-brokers" />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
