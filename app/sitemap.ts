import type { MetadataRoute } from 'next';
import { brand } from '@/lib/brand';

const loanPrograms = [
  'bridge-hard-money',
  'sba',
  'construction',
  'multifamily-cmbs',
  'investor',
  'residential-portfolio',
  'light-doc',
];

const propertyTypes = [
  'retail',
  'office',
  'industrial',
  'multifamily',
  'hospitality',
  'self-storage',
  'land',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    '',
    '/about',
    '/about/team',
    '/loan-solutions',
    '/property-types',
    '/cressida-direct',
    '/transactions',
    '/insights',
    '/insights/dscr-loan-rates',
    '/insights/cre-debt-maturity-wall',
    '/for-brokers',
    '/contact',
  ];

  const dynamicRoutes = [
    ...loanPrograms.map((slug) => `/loan-solutions/${slug}`),
    ...propertyTypes.map((slug) => `/property-types/${slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${brand.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));
}
