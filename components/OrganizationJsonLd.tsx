import { brand } from '@/lib/brand';

/**
 * Organization + FinancialService structured data.
 * This is the primary entity block AI answer engines parse to understand
 * who Cressida Capital is, what it does, and how to cite/contact it.
 * Rendered once in the root layout so it's present on every page.
 */
export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: brand.legalName,
    alternateName: brand.displayName,
    url: brand.url,
    logo: `${brand.url}/logo.png`,
    foundingDate: String(brand.founded),
    description:
      'Cressida Capital arranges commercial real estate debt financing nationwide — bridge, SBA, construction, permanent, multifamily, and CMBS loans — plus small-balance direct lending through Cressida Direct.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: brand.city,
      addressRegion: brand.region,
      addressCountry: brand.country,
    },
    telephone: brand.phone,
    email: brand.email,
    sameAs: [brand.social.linkedin],
    areaServed: 'US',
    knowsAbout: [
      'Commercial real estate financing',
      'Bridge loans',
      'SBA 7(a) and 504 loans',
      'Construction loans',
      'CMBS loans',
      'Multifamily financing',
      'Direct lending',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
