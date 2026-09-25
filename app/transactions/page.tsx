import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ClosingsTable from '@/components/ClosingsTable';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getClosings, formatAmount } from '@/lib/closings';

export const metadata: Metadata = {
  title: 'Transactions \u2014 Recent Closings',
  description:
    'Recent commercial real estate financing transactions closed by Cressida Capital, across bridge, SBA, construction, multifamily, and investor loan programs.',
  alternates: { canonical: '/transactions' },
};

export default async function TransactionsPage() {
  const closings = await getClosings();

  // Computed from whatever deals are actually rendered below, so the summary
  // stays accurate as closings are added or removed — never hardcode these.
  const dealCount = closings.length;
  const combinedVolume = formatAmount(
    closings.reduce((sum, c) => sum + c.amount, 0)
  );
  const states = Array.from(
    new Set(closings.map((c) => c.state).filter((s): s is string => Boolean(s)))
  ).sort();
  const statesLabel = states.length > 0 ? states.join(', ') : '\u2014';

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Transactions', path: '/transactions' },
        ]}
      />
      <Nav />

      {/* Hero */}
      <div className="max-w-[1180px] mx-auto px-8 py-16 grid grid-cols-1 min-[880px]:grid-cols-[1.5fr_0.9fr] gap-y-10 min-[880px]:gap-x-[64px] items-start">
        <div>
          <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
            Transactions
          </h1>
          <p className="text-lg text-slate max-w-[60ch]">
            A running record of commercial real estate financing arranged by
            Cressida Capital, updated as new deals close.
          </p>
        </div>

        {closings.length > 0 && (
          <div className="border border-hair bg-white p-6 lg:p-8">
            <div className="text-[11px] uppercase tracking-wider text-grey mb-5">
              Shown Below
            </div>
            <dl className="text-sm">
              <SummaryRow label="Deals" value={String(dealCount)} />
              <SummaryRow label="Combined Volume" value={combinedVolume} />
              <SummaryRow label="States" value={statesLabel} last />
            </dl>
          </div>
        )}
      </div>

      {/* Transaction list */}
      <div className="max-w-[1180px] mx-auto px-8 pb-16">
        <ClosingsTable closings={closings} />
      </div>

      <Footer />
    </>
  );
}

function SummaryRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 py-3 ${
        last ? '' : 'border-b border-hair'
      }`}
    >
      <dt className="text-grey">{label}</dt>
      <dd className="font-semibold text-right">{value}</dd>
    </div>
  );
}
