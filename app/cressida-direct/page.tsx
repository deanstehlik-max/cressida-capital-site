import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { brand } from '@/lib/brand';

const CRESSIDA_DIRECT_URL = 'https://www.cressidadirect.com';

export const metadata: Metadata = {
  title: 'Cressida Direct \u2014 Nationwide Direct Lending',
  description:
    'Cressida Direct is Cressida Capital\u2019s nationwide direct lending platform, funding small-balance commercial and investment real estate loans without a third-party bank.',
  alternates: { canonical: '/cressida-direct' },
};

export default function CressidaDirectPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cressida Direct', path: '/cressida-direct' },
        ]}
      />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[16ch] mb-4">
          Cressida Direct
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-10">
          Cressida Direct is {brand.displayName}&rsquo;s nationwide direct
          lending platform. We underwrite and fund small-balance commercial
          and investment real estate loans from{' '}
          {brand.stats.directLendingRange} in-house &mdash; no third-party
          bank in the middle.
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14 border-t border-b border-hair py-6">
          <Spec label="Loan Size" value={brand.stats.directLendingRange} />
          <Spec label="Funding" value="Direct \u2014 in-house" />
          <Spec label="Coverage" value="Nationwide" />
          <Spec label="Documentation" value="Light doc options" />
        </dl>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Direct lending, not brokerage
          </h2>
          <p className="text-slate mb-4">
            {brand.displayName} operates two complementary businesses. The
            advisory practice shops each deal across{' '}
            {brand.stats.lenderRelationships} lender relationships to find the
            most competitive terms available. Cressida Direct is the other
            side: a principal lender that funds from its own capital, which
            keeps underwriting fast and documentation simpler on
            small-balance deals.
          </p>
          <p className="text-slate">
            Apply and manage Direct loan requests on the dedicated Cressida
            Direct site, or start a request here if you are not sure which
            path fits.
          </p>
        </section>

        <section className="mb-14 max-w-[70ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Who Cressida Direct is for
          </h2>
          <p className="text-slate mb-4">
            Investors and small-balance commercial owners whose loan size
            often sits below a bank&rsquo;s minimum, or whose timeline and
            documentation cannot wait on a traditional credit committee.
            Typical uses include purchase, refinance, and cash-out on
            income-producing property.
          </p>
          <p className="text-slate">
            The{' '}
            <Link
              href="/loan-solutions/light-doc"
              className="text-forest border-b border-forest pb-0.5"
            >
              Light Doc Program
            </Link>{' '}
            is funded through Cressida Direct.
          </p>
        </section>

        <div className="flex gap-3 flex-wrap">
          <a
            href={CRESSIDA_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-sm font-medium bg-brass text-white"
          >
            Visit Cressida Direct
          </a>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 text-sm font-medium border border-brass text-brass"
          >
            Start a Loan Request
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11.5px] text-grey mb-1">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
