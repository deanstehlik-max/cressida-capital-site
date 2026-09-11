export type Guide = {
  href: string;
  category: string;
  title: string;
  dek: string;
};

// Static, curated guides that live in the codebase rather than the Supabase
// insights_posts table. Ordered newest-first, so guides[0] is the most
// recently published guide.
export const guides: Guide[] = [
  {
    href: '/insights/cre-debt-maturity-wall',
    category: 'Guide',
    title: 'The CRE Debt Maturity Wall',
    dek: 'A historic volume of commercial real estate debt matures in 2026 and 2027. What owners need to know before refinancing \u2014 and the loan paths worth evaluating.',
  },
  {
    href: '/insights/dscr-loan-rates',
    category: 'Guide',
    title: 'DSCR Loan Rates & Qualification',
    dek: 'How DSCR loan pricing works, what ranges to expect, and how to qualify based on a property\u2019s rental income \u2014 no tax returns or W-2s required.',
  },
];
