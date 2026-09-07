import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getInsightBySlug } from '@/lib/insights';
import { brand } from '@/lib/brand';

type Props = { params: { slug: string } };

// Posts live in Supabase, not the codebase, so this can't use
// generateStaticParams the way loan/property pages do without a rebuild per
// post. Revalidate periodically instead so new posts appear without a full
// redeploy, while still being served as fast, cached HTML most of the time.
export const revalidate = 3600; // 1 hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getInsightBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.dek,
    alternates: { canonical: `/insights/${post.slug}` },
  };
}

export default async function InsightPostPage({ params }: Props) {
  const post = await getInsightBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: post.title, path: `/insights/${post.slug}` },
        ]}
      />
      <ArticleJsonLd
        headline={post.title}
        description={post.dek}
        datePublished={post.published_at}
        url={`${brand.url}/insights/${post.slug}`}
        authorName={post.author_name}
      />
      <Nav />

      <article className="max-w-[760px] mx-auto px-8 py-16">
        <div className="text-xs text-grey mb-3">
          {post.category}
          {post.published_at &&
            ` \u00b7 ${new Date(post.published_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}`}
        </div>
        <h1 className="font-display text-[36px] font-medium leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-slate mb-10">{post.dek}</p>

        <div className="prose-cressida">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </article>

      <Footer />
    </>
  );
}
