import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { propertyTypes, getPropertyType } from '@/lib/propertyTypes';

type Props = { params: Promise<{ slug: string }> };

// Pre-renders every property type page at build time — same crawlability
// as a static page, without seven near-duplicate files.
export function generateStaticParams() {
  return propertyTypes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const type = getPropertyType(slug);
  if (!type) return {};

  return {
    title: `${type.name} Financing \u2014 Commercial Real Estate Loans`,
    description: type.description,
    alternates: { canonical: `/property-types/${type.slug}` },
  };
}

export default async function PropertyTypePage({ params }: Props) {
  const { slug } = await params;
  const type = getPropertyType(slug);
  if (!type) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Property Types', path: '/property-types' },
          { name: type.name, path: `/property-types/${type.slug}` },
        ]}
      />
      {type.faqs.length > 0 && <FaqJsonLd items={type.faqs} />}
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          {type.name} Financing
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-12">{type.description}</p>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-medium mb-6">
            Relevant loan programs
          </h2>
          <div className="flex flex-wrap gap-3">
            {type.relevantPrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/loan-solutions/${program.slug}`}
                className="inline-block px-4 py-2 border border-forest text-forest text-sm hover:bg-forest hover:text-white transition-colors"
              >
                {program.name}
              </Link>
            ))}
          </div>
        </section>

        {type.faqs.length > 0 && (
          <section className="mb-14">
            <h2 className="font-display text-2xl font-medium mb-6">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-hair">
              {type.faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-slate text-sm max-w-[65ch]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

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
