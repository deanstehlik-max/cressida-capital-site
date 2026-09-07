import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { propertyTypes } from '@/lib/propertyTypes';

export const metadata: Metadata = {
  title: 'Commercial Property Types We Finance',
  description:
    'Cressida Capital arranges commercial real estate financing across retail, office, industrial, multifamily, hospitality, self-storage, and land.',
  alternates: { canonical: '/property-types' },
};

export default function PropertyTypesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Property Types', path: '/property-types' },
        ]}
      />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Property Types
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-12">
          Cressida Capital arranges commercial real estate financing across
          every major property type, from owner-occupied small business
          buildings to large institutional-scale assets.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hair border border-hair">
          {propertyTypes.map((type) => (
            <Link
              key={type.slug}
              href={`/property-types/${type.slug}`}
              className="bg-paper p-7 hover:bg-forest/[.04] transition-colors"
            >
              <h2 className="font-display text-xl font-medium mb-2">{type.name}</h2>
              <p className="text-sm text-slate">{type.summary}</p>
              <span className="inline-block mt-4 text-[13px] text-forest border-b border-forest pb-0.5">
                View financing options
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
