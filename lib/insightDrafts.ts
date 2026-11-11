import type { InsightPost } from '@/lib/insights';

/**
 * Unpublished insight copy kept in the repo so `next dev` can render the
 * existing article template. Production (`next start` / Railway) never
 * returns these: publishing is an `insights_posts` row with
 * `is_published = true`, which this module does not insert.
 *
 * Title, slug, dek, and body are the source note verbatim. Category is not
 * in that note; the table default is "Market Analysis". "Closed Loan" is
 * only the listing label, because this note is a closed transaction.
 */
const insightDrafts: InsightPost[] = [
  {
    id: 'draft-acquisition-debt-sba-7a-advisory-4-22m',
    slug: 'acquisition-debt-sba-7a-advisory-4-22m',
    title:
      'Financing an HVAC Roll-Up: How We Turned Three Layers of Acquisition Debt into One $4.22M SBA 7(a)',
    dek: 'Cressida Capital advised a Virginian HVAC roll-up on a $4.22M SBA 7(a) and pari passu structure that consolidated SBA, seller and bridge debt and added working capital.',
    category: 'Closed Loan',
    author_name: null,
    published_at: null,
    body: `Growth through acquisition often leaves owners with a patchwork of debt. That was the case for a Virginian HVAC roll-up, a holding company that acquired several HVAC firms. It was carrying an existing SBA loan, a seller note and short-term bridge financing.

Cressida Capital structured the capital and placed it with an SBA lender partner: a $3,720,000 SBA 7(a) term loan alongside a $500,000 pari passu conventional loan, for $4,220,000 in total. The transaction closed in 8 weeks.

**The result:**
- One 10-year, fully amortizing structure in place of three separate debts
- About $300,000 in new working capital
- Secured by business assets, with no commercial real estate purchase needed

Our job is to find the right lender and structure for each business. If your company is carrying acquisition or bridge debt, contact Dean Stehlik at deans@cressidacapital.com or 213.481.6267.

*Cressida does not make or fund SBA loans. SBA loans are made by SBA lender partners.*`,
  },
];

export function unpublishedInsightDraft(slug: string): InsightPost | null {
  if (process.env.NODE_ENV === 'production') return null;
  return insightDrafts.find((post) => post.slug === slug) ?? null;
}
