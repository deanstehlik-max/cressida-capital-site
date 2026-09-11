import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About Cressida Capital',
  description:
    'Cressida Capital is a full-service commercial real estate finance advisory firm and direct lender, founded in 2013, with $800M+ in financing arranged nationwide.',
  alternates: { canonical: '/about' },
};

const principles = [
  {
    name: 'Strategy',
    description:
      'We provide multiple financing solutions to satisfy the individual needs of each client, rather than forcing every deal into a single lender’s standard box.',
  },
  {
    name: 'Partnerships',
    description:
      'We work with clients, lenders, and our own team to promote a coordinated, seamless loan process from application through closing.',
  },
  {
    name: 'Superior Service',
    description:
      'We continuously exceed expectations and do what we say we are going to do, at every step of the financing process.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      <Nav />

      <div className="max-w-[1180px] mx-auto px-8 py-16">
        <h1 className="font-display text-[40px] font-medium max-w-[20ch] mb-4">
          About Cressida Capital
        </h1>
        <p className="text-lg text-slate max-w-[62ch] mb-14">
          Cressida Capital is a full-service commercial real estate finance
          advisory firm and direct lender, founded in {brand.founded}.
          Drawing on {brand.yearsInBusiness}+ years of relationships across{' '}
          {brand.stats.lenderRelationships} banks, credit unions, and private
          capital sources, we deliver customized debt solutions for even the
          most complex client needs — having arranged{' '}
          {brand.stats.financingArranged} in commercial real estate
          financing to date.
        </p>

        <section className="mb-16">
          <h2 className="font-display text-2xl font-medium mb-8">
            How We Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-b border-hair py-8">
            {principles.map((p) => (
              <div key={p.name}>
                <h3 className="font-display text-lg font-medium mb-2">{p.name}</h3>
                <p className="text-sm text-slate">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 max-w-[62ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            We Protect Our Brokers
          </h2>
          <p className="text-slate">
            We know your relationships are your business. Cressida Capital
            protects our brokers and referral sources on every deal — no
            exceptions, no circumvention. When you bring us a client, that
            relationship stays yours for the life of the deal and beyond.
          </p>
        </section>

        <section className="mb-16 max-w-[62ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Advisory and Direct Lending, Under One Roof
          </h2>
          <p className="text-slate mb-4">
            Cressida Capital operates two complementary businesses: a
            full-service mortgage advisory practice that shops each deal
            across our network of {brand.stats.lenderRelationships} lender
            relationships to find the most competitive terms available, and
            Cressida Direct, our nationwide direct lending platform funding
            small-balance commercial real estate loans from{' '}
            {brand.stats.directLendingRange} without a third-party bank in
            the middle.
          </p>
          <Link href="/cressida-direct" className="text-sm text-forest border-b border-forest pb-0.5">
            Learn about Cressida Direct
          </Link>
        </section>

        <section className="max-w-[62ch]">
          <h2 className="font-display text-2xl font-medium mb-4">
            Ready to Discuss Your Deal?
          </h2>
          <p className="text-slate mb-6">
            Speak with a Cressida Loan Officer to explore your financing
            options.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate mb-8">
            <span>
              Phone{' '}
              <a
                href={`tel:${brand.phone.replace(/[^\d]/g, '')}`}
                className="font-medium hover:text-forest"
              >
                {brand.phone}
              </a>
            </span>
            <span>
              Email{' '}
              <a
                href={`mailto:${brand.email}`}
                className="font-medium hover:text-forest"
              >
                {brand.email}
              </a>
            </span>
          </div>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 text-sm font-medium bg-brass text-white"
          >
            Start a Loan Request
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}
