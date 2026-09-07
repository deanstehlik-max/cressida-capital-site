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

        {posts.length === 0 ? (
          <p className="text-sm text-grey border-t border-hair pt-8">
            New market analysis is published here regularly \u2014 check back soon.
          </p>
        ) : (
          <div className="divide-y divide-hair border-t border-ink">
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
        )}
      </div>

      <Footer />
    </>
  );
}
