import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import LoanRequestForm from '@/components/LoanRequestForm';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Contact Cressida Capital',
  description:
    'Start a commercial real estate loan request with Cressida Capital, or reach a loan officer directly at 877.308.5775 or info@cressidacapital.com.',
  alternates: { canonical: '/contact' },
};

const phoneHref = `tel:${brand.phone.replace(/[^\d]/g, '')}`;

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <Nav />

      {/* Hero band */}
      <section className="bg-forest text-paper">
        <div className="max-w-[1180px] mx-auto px-8 py-[72px] grid grid-cols-1 min-[880px]:grid-cols-2 gap-[60px] items-center">
          <div>
            <h1 className="font-display text-[40px] lg:text-[50px] font-medium leading-[1.08] tracking-tight max-w-[14ch]">
              Let&rsquo;s talk about your deal.
            </h1>
            <p className="mt-[22px] text-[16.5px] text-[#C9D3CC] max-w-[48ch]">
              Tell us what you&rsquo;re financing and a Cressida Loan Officer
              will follow up within one business day. For time-sensitive
              requests, calling directly is fastest.
            </p>
            <div className="mt-8 flex gap-[14px] flex-wrap">
              <Link
                href="#loan-request"
                className="inline-block px-5 py-[11px] text-[13.5px] font-medium bg-brass border border-brass text-white hover:bg-transparent hover:text-brass transition-colors"
              >
                Start a Loan Request
              </Link>
              <a
                href={phoneHref}
                className="inline-block px-5 py-[11px] text-[13.5px] font-medium border border-brass-light text-brass-light hover:bg-brass-light hover:text-forest transition-colors"
              >
                Call {brand.phone}
              </a>
            </div>
          </div>

          <div className="hidden min-[880px]:block">
            <ArchitecturalDrawing />
          </div>
        </div>
      </section>

      {/* Contact + form */}
      <section
        id="loan-request"
        className="max-w-[1180px] mx-auto px-8 py-20 grid grid-cols-1 min-[880px]:grid-cols-[35fr_65fr] gap-y-14 min-[880px]:gap-x-[84px]"
      >
        {/* Left: Reach Us Directly ledger */}
        <div>
          <h2 className="font-display text-[28px] font-medium mb-3">
            Reach Us Directly
          </h2>
          <p className="text-slate text-sm max-w-[36ch] mb-8">
            For time-sensitive requests, calling is the fastest way to reach a
            loan officer.
          </p>

          <div className="space-y-4 text-sm">
            <LedgerRow label="Phone" value={brand.phone} href={phoneHref} />
            <LedgerRow
              label="Email"
              value={brand.email}
              href={`mailto:${brand.email}`}
            />
            <LedgerRow label="Office" value={`${brand.city}, ${brand.region}`} />
            <LedgerRow label="License" value={brand.license} />
          </div>

          <div className="border-t border-hair mt-8 pt-4">
            <p className="text-xs text-grey">
              Nationwide financing. Los Angeles based.
            </p>
          </div>
        </div>

        {/* Right: form card */}
        <div className="border border-hair bg-white p-8 lg:p-10">
          <h2 className="font-display text-[28px] font-medium mb-2">
            Start a Loan Request
          </h2>
          <p className="text-slate text-sm max-w-[52ch] mb-8">
            Tell us about the deal below and a Cressida Loan Officer will follow
            up.
          </p>
          <LoanRequestForm sourcePage="/contact" variant="underline" />
        </div>
      </section>

      <Footer />
    </>
  );
}

function LedgerRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const displayValue = href ? (
    <a href={href} className="hover:text-forest">
      {value}
    </a>
  ) : (
    value
  );
  return (
    <div className="ledger-row">
      <span className="ledger-row__label">{label}</span>
      <span className="ledger-row__leader" aria-hidden="true" />
      <span className="ledger-row__value">{displayValue}</span>
    </div>
  );
}

function ArchitecturalDrawing() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="w-full h-auto"
      role="img"
      aria-label="Line-art skyline drawing"
    >
      <defs>
        <pattern
          id="contact-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0H0V20"
            fill="none"
            stroke="#D9A94A"
            strokeWidth="0.5"
            opacity="0.35"
          />
        </pattern>
      </defs>

      {/* Drafting grid background */}
      <rect x="0" y="0" width="480" height="340" fill="url(#contact-grid)" />

      {/* Thin gold-bordered frame */}
      <rect
        x="20"
        y="20"
        width="440"
        height="300"
        fill="none"
        stroke="#D9A94A"
        strokeWidth="1.5"
      />

      {/* Corner tick marks */}
      <g stroke="#D9A94A" strokeWidth="1.5">
        <path d="M20 40 H40 M40 20 V40" fill="none" />
        <path d="M460 40 H440 M440 20 V40" fill="none" />
        <path d="M20 300 H40 M40 320 V300" fill="none" />
        <path d="M460 300 H440 M440 320 V300" fill="none" />
      </g>

      {/* City skyline silhouette in cream */}
      <g fill="#FAFAF9">
        <rect x="60" y="220" width="42" height="70" />
        <rect x="108" y="180" width="34" height="110" />
        <rect x="148" y="150" width="30" height="140" />
        <rect x="176" y="110" width="24" height="180" />
        <rect x="188" y="90" width="6" height="24" />
        <rect x="206" y="170" width="40" height="120" />
        <rect x="252" y="200" width="30" height="90" />
        <polygon points="288,290 288,150 306,120 324,150 324,290" />
        <rect x="303" y="96" width="3" height="26" />
        <rect x="332" y="190" width="36" height="100" />
        <rect x="374" y="160" width="30" height="130" />
        <rect x="410" y="210" width="30" height="80" />
      </g>

      {/* Ground line */}
      <line
        x1="40"
        y1="290"
        x2="440"
        y2="290"
        stroke="#FAFAF9"
        strokeWidth="1.5"
      />

      {/* Lit windows accent */}
      <g fill="#D9A94A" opacity="0.9">
        <rect x="184" y="130" width="4" height="6" />
        <rect x="184" y="150" width="4" height="6" />
        <rect x="184" y="170" width="4" height="6" />
        <rect x="158" y="170" width="4" height="6" />
        <rect x="158" y="190" width="4" height="6" />
        <rect x="382" y="180" width="4" height="6" />
        <rect x="382" y="200" width="4" height="6" />
      </g>
    </svg>
  );
}
