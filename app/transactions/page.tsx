import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ClosingsTable from '@/components/ClosingsTable';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getClosings } from '@/lib/closings';

export const metadata: Metadata = {
  title: 'Transactions \u2014 Recent Closings',
  description:
    'Recent commercial real estate financing transactions closed by Cressida Capital, across bridge, SBA, construction, multifamily, and investor loan programs.',
  alternates: { canonical: '/transactions' },
};

export default async function TransactionsPage() {
  const closings = await getClosings();

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Transactions', path: '/transactions' },
        ]}
      />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          Transactions
        </h1>
        <p className="text-lg text-slate max-w-[60ch] mb-12">
          A running record of commercial real estate financing arranged by
          Cressida Capital, updated as new deals close.
        </p>

        <ClosingsTable closings={closings} />
      </div>

      <Footer />
    </>
  );
}
