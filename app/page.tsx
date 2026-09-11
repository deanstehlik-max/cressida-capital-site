import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import StatStrip from '@/components/StatStrip';
import ClosingsTable from '@/components/ClosingsTable';
import LoanProgramsTable from '@/components/LoanProgramsTable';
import Footer from '@/components/Footer';
import { brand } from '@/lib/brand';
import { getClosings } from '@/lib/closings';
import { getPublishedInsights } from '@/lib/insights';
import { guides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Commercial Real Estate Financing Nationwide',
  description:
    'Cressida Capital arranges bridge, SBA, construction, multifamily, and CMBS financing for commercial real estate nationwide, plus direct lending from $200K to $3M.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const [closings, insights] = await Promise.all([
    getClosings(4),
    getPublishedInsights(1),
  ]);
  const latestInsight = insights[0];

  // Prefer a real published Supabase post. When none exist yet, fall back to
  // the newest static guide (guides[0]) so the widget still surfaces real
  // content instead of a placeholder. Once any Supabase post is published,
  // the Supabase-first branch takes over automatically.
  const featured = latestInsight
    ? {
        category: latestInsight.category,
        title: latestInsight.title,
        dek: latestInsight.dek,
        href: `/insights/${latestInsight.slug}`,
      }
    : guides[0] ?? null;

  return (
    <>
      <Nav />
      <Hero />
      <StatStrip />

      <div className="max-w-[1180px] mx-auto px-8">
        <section className="py-[72px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14">
          <div>
            <div className="flex justify-between items-baseline border-b border-ink pb-4 mb-2">
              <h2 className="font-display text-2xl font-medium">Recent Closings</h2>
              <a href="/transactions" className="text-[13px] text-forest border-b border-forest pb-0.5">
                View all transactions
              </a>
            </div>
            <ClosingsTable closings={closings} />
          </div>
          <div>
            <div className="border-b border-ink pb-4 mb-2">
              <h2 className="font-display text-2xl font-medium">Latest Insight</h2>
            </div>
            {featured ? (
              <div className="border-t border-ink pt-5">
                <div className="text-xs text-grey mb-2.5">{featured.category}</div>
                <h3 className="font-display text-[21px] font-medium leading-tight mb-3">
                  {featured.title}
                </h3>
                <p className="text-slate text-sm max-w-[38ch]">{featured.dek}</p>
                <a
                  href={featured.href}
                  className="inline-block mt-3.5 text-[13px] border-b border-ink"
                >
                  Read the note
                </a>
              </div>
            ) : (
              <p className="text-sm text-grey pt-5 border-t border-ink">
                New market analysis coming soon.
              </p>
            )}
          </div>
        </section>

        <section className="py-[72px]">
          <div className="flex justify-between items-baseline mb-0">
            <h2 className="font-display text-2xl font-medium">Loan Solutions</h2>
            <a href="/loan-solutions" className="text-[13px] text-forest border-b border-forest pb-0.5">
              All programs
            </a>
          </div>
          <LoanProgramsTable />
        </section>
      </div>

      <div className="bg-forest-dark text-paper py-[60px]">
        <div className="max-w-[1180px] mx-auto px-8 flex justify-between items-center flex-wrap gap-6">
          <h2 className="font-display text-[28px] font-medium max-w-[14ch]">
            Ready to structure your financing?
          </h2>
          <div className="text-sm text-[#B9C6BF]">
            A Cressida Loan Officer &middot; {brand.phone} &middot; {brand.email}
          </div>
          <a
            href="/contact"
            className="inline-block px-5 py-[11px] text-[13.5px] font-medium bg-brass border border-brass text-white"
          >
            Start a Loan Request
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
