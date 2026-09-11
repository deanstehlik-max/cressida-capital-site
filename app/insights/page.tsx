import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getPublishedInsights } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'Insights \u2014 Commercial Real Estate Market Analysis',
  description:
    'Market analysis and commentary on commercial real estate financing from Cressida Capital.',
  alternates: { canonical: '/insights' },
};

// Static, curated guides that live in the codebase rather than the Supabase
// insights_posts table. Rendered above any published posts.
const guides = [
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

export default async function InsightsPage() {
  const posts = await getPublishedInsights();

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
        ]}
      />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Insights
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-12">
          Market analysis and commentary on commercial real estate financing.
        </p>

        <div className="divide-y divide-hair border-t border-ink">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="block py-7 group">
              <div className="text-xs text-grey mb-2">{guide.category}</div>
              <h2 className="font-display text-2xl font-medium mb-2 group-hover:text-forest transition-colors">
                {guide.title}
              </h2>
              <p className="text-slate text-sm max-w-[60ch]">{guide.dek}</p>
            </Link>
          ))}
          {posts.map((post) => (
            <Link key={post.slug} href={`/insights/${post.slug}`} className="block py-7 group">
              <div className="text-xs text-grey mb-2">
                {post.category}
                {post.published_at &&
                  ` \u00b7 ${new Date(post.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}`}
              </div>
              <h2 className="font-display text-2xl font-medium mb-2 group-hover:text-forest transition-colors">
                {post.title}
              </h2>
              <p className="text-slate text-sm max-w-[60ch]">{post.dek}</p>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-sm text-grey mt-8">
            More market analysis and commentary is published here regularly
            &mdash; check back soon.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}
