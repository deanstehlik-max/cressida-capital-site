// Single source of truth for firm facts.
// Keeping these in one place avoids the NAP (name/address/phone) and stat
// inconsistencies across pages that make AI systems distrust a source.

export const brand = {
  legalName: 'Cressida Capital Corp',
  displayName: 'Cressida Capital',
  founded: 2013,
  yearsInBusiness: new Date().getFullYear() - 2013,
  license: 'CA Broker License #01956862',
  phone: '877.308.5775',
  email: 'info@cressidacapital.com',
  city: 'Los Angeles',
  region: 'CA',
  country: 'US',
  url: 'https://www.cressidacapital.com',
  stats: {
    financingArranged: '$800M+',
    lenderRelationships: '100+',
    loanSizeRange: '$200K \u2013 $50M',
    directLendingRange: '$200K \u2013 $3M',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/cressida-capital/',
  },
} as const;
