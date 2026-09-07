export type PropertyType = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  relevantPrograms: { slug: string; name: string }[];
  faqs: { question: string; answer: string }[];
};

export const propertyTypes: PropertyType[] = [
  {
    slug: 'retail',
    name: 'Retail',
    summary: 'Anchored and unanchored retail centers, single-tenant retail, and mixed-use retail.',
    description:
      'Cressida Capital arranges financing for anchored and unanchored retail centers, single-tenant net-lease retail, and mixed-use properties with a retail component, from acquisition and refinance through repositioning.',
    relevantPrograms: [
      { slug: 'bridge-hard-money', name: 'Bridge & Hard Money' },
      { slug: 'multifamily-cmbs', name: 'Multifamily & CMBS' },
      { slug: 'investor', name: 'Investor' },
    ],
    faqs: [
      {
        question: 'Can I finance a retail center with vacancies?',
        answer:
          'Yes, typically through a bridge loan while the property is leased up, then refinanced into permanent financing once stabilized.',
      },
      {
        question: 'Is anchored retail financed differently than unanchored retail?',
        answer:
          'Anchored centers with credit tenants generally qualify for more competitive permanent financing terms, while unanchored or transitional retail is more commonly financed with bridge or hard money loans.',
      },
    ],
  },
  {
    slug: 'office',
    name: 'Office',
    summary: 'Owner-occupied and investment office properties, from single-tenant to multi-tenant buildings.',
    description:
      'Cressida Capital finances office properties for both owner-occupiers, through SBA and conventional programs, and investors acquiring or refinancing multi-tenant office buildings.',
    relevantPrograms: [
      { slug: 'sba', name: 'SBA 7(a) / 504' },
      { slug: 'bridge-hard-money', name: 'Bridge & Hard Money' },
      { slug: 'investor', name: 'Investor' },
    ],
    faqs: [
      {
        question: 'Can I get SBA financing for an office building?',
        answer:
          'Yes, if your business occupies at least 51% of the property. Investment office properties without owner occupancy require conventional, bridge, or CMBS financing instead.',
      },
    ],
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    summary: 'Warehouse, light industrial, manufacturing, and flex space.',
    description:
      'Cressida Capital arranges financing for warehouse, light industrial, manufacturing, and flex industrial properties, including owner-occupied facilities and investment acquisitions.',
    relevantPrograms: [
      { slug: 'sba', name: 'SBA 7(a) / 504' },
      { slug: 'bridge-hard-money', name: 'Bridge & Hard Money' },
      { slug: 'construction', name: 'Construction' },
    ],
    faqs: [
      {
        question: 'What financing works best for an owner-occupied warehouse?',
        answer:
          'SBA 504 financing is often the most efficient path for owner-occupied industrial buildings, offering up to 90% financing with long-term, below-market fixed rates on the CDC portion.',
      },
    ],
  },
  {
    slug: 'multifamily',
    name: 'Multifamily',
    summary: 'Apartment buildings and multifamily portfolios, from small-balance to institutional scale.',
    description:
      'Cressida Capital finances multifamily properties across the full spectrum — from small-balance apartment buildings through Cressida Direct to large stabilized portfolios through agency, life company, and CMBS execution.',
    relevantPrograms: [
      { slug: 'multifamily-cmbs', name: 'Multifamily & CMBS' },
      { slug: 'light-doc', name: 'Light Doc Program' },
      { slug: 'bridge-hard-money', name: 'Bridge & Hard Money' },
    ],
    faqs: [
      {
        question: 'What loan size range covers multifamily properties?',
        answer:
          'From $200K on small-balance deals through Cressida Direct\u2019s Light Doc Program up to $75M on larger stabilized properties through Multifamily & CMBS financing.',
      },
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    summary: 'Hotels, motels, and other lodging properties, including flagged and independent brands.',
    description:
      'Cressida Capital arranges bridge and permanent financing for flagged and independent hotels, including acquisitions, refinances, PIP (property improvement plan) funding, and repositioning.',
    relevantPrograms: [
      { slug: 'bridge-hard-money', name: 'Bridge & Hard Money' },
      { slug: 'investor', name: 'Investor' },
    ],
    faqs: [
      {
        question: 'Can hotel PIP requirements be financed?',
        answer:
          'Yes, PIP costs are commonly rolled into bridge financing alongside acquisition or refinance proceeds, subject to lender underwriting.',
      },
    ],
  },
  {
    slug: 'self-storage',
    name: 'Self-Storage',
    summary: 'Climate-controlled and traditional self-storage facilities.',
    description:
      'Cressida Capital finances self-storage facilities for acquisition, refinance, and expansion, including both traditional drive-up and climate-controlled formats.',
    relevantPrograms: [
      { slug: 'bridge-hard-money', name: 'Bridge & Hard Money' },
      { slug: 'construction', name: 'Construction' },
      { slug: 'multifamily-cmbs', name: 'Multifamily & CMBS' },
    ],
    faqs: [
      {
        question: 'Is self-storage eligible for CMBS financing?',
        answer:
          'Yes, stabilized self-storage facilities are commonly financed through CMBS or life company execution, similar to other stabilized commercial asset classes.',
      },
    ],
  },
  {
    slug: 'land',
    name: 'Land',
    summary: 'Entitled and unentitled land for future commercial or residential development.',
    description:
      'Cressida Capital arranges financing for land acquisition and, once entitled, construction takeout financing for ground-up development.',
    relevantPrograms: [
      { slug: 'bridge-hard-money', name: 'Bridge & Hard Money' },
      { slug: 'construction', name: 'Construction' },
    ],
    faqs: [
      {
        question: 'Can I get financing for unentitled land?',
        answer:
          'Unentitled land is harder to finance and typically requires higher equity contributions or private/hard money capital until entitlements are secured.',
      },
    ],
  },
];

export function getPropertyType(slug: string) {
  return propertyTypes.find((p) => p.slug === slug);
}
