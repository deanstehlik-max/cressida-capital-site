import Link from 'next/link';
import { brand } from '@/lib/brand';

// Rates should be wired to a real data source (a small API route + cron,
// or a scheduled edge function) rather than hardcoded before launch.
const rates = [
  { label: 'Prime Rate', value: '6.75%' },
  { label: 'SOFR (30-day avg)', value: '3.65%' },
  { label: '5-Year Treasury', value: '4.54%', up: true },
  { label: '10-Year Treasury', value: '4.78%' },
];

export default function Hero() {
  return (
    <div className="relative bg-forest-dark text-paper overflow-hidden">
      <BlueprintBackground />
      <div className="relative z-10 max-w-[1180px] mx-auto px-8 py-[88px] pb-[70px] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[60px] items-end">
        <div>
          <h1 className="font-display text-[36px] lg:text-[50px] font-medium leading-[1.08] tracking-tight max-w-[11.5ch]">
            Debt solutions structured for what banks won&rsquo;t finance.
          </h1>
          <p className="mt-[22px] text-[16.5px] text-[#C9D3CC] max-w-[46ch]">
            Cressida Capital arranges bridge, SBA, construction, and permanent
            financing for commercial and investment real estate nationwide
            &mdash; plus direct lending through Cressida Direct on
            small-balance deals from {brand.stats.directLendingRange}.
          </p>
          <div className="mt-8 flex gap-[14px] flex-wrap">
            <Link
              href="/start-a-loan-request"
              className="inline-block px-5 py-[11px] text-[13.5px] font-medium bg-brass border border-brass text-white hover:bg-transparent hover:text-brass transition-colors"
            >
              Start a Loan Request
            </Link>
            <Link
              href="/contact"
              className="inline-block px-5 py-[11px] text-[13.5px] font-medium border border-brass-light text-brass-light hover:bg-brass-light hover:text-forest-dark transition-colors"
            >
              Speak with a Mortgage Advisor
            </Link>
          </div>
          <div className="mt-[26px] text-xs text-[#8FA098]">
            {brand.license} &middot; {brand.city}, {brand.region}
          </div>
        </div>

        <div className="border-l border-white/25 pl-9">
          <div className="text-[12.5px] text-[#93A69C] mb-[18px]">
            Benchmark rates &mdash; updated daily
          </div>
          {rates.map((rate, i) => (
            <div
              key={rate.label}
              className={`flex justify-between items-baseline py-[14px] border-b border-white/[.14] ${
                i === 0 ? 'border-t' : ''
              }`}
            >
              <span className="text-[13.5px] text-[#B9C6BF]">{rate.label}</span>
              <span
                className={`num text-[26px] font-medium tracking-tight ${
                  rate.up ? 'text-brass-light' : 'text-white'
                }`}
              >
                {rate.value}
              </span>
            </div>
          ))}
          <div className="mt-[14px] text-[11.5px] text-[#7C8F86]">
            Reference only, not a rate lock
          </div>
        </div>
      </div>
    </div>
  );
}

function BlueprintBackground() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#D9A94A" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1200" height="640" fill="url(#grid)" />
        <g stroke="#D9A94A" strokeWidth="1.5" fill="none">
          <path d="M0 560 L0 480 L60 480 L60 440 L120 440 L120 500 L180 500 L180 400 L200 400 L200 360 L240 360 L240 500 L300 500 L300 460 L340 460 L340 420 L380 420 L380 480 L430 480 L430 340 L450 340 L450 300 L470 300 L470 340 L490 340 L490 480 L560 480 L560 420 L600 420 L600 460 L660 460 L660 380 L680 380 L680 340 L700 340 L700 380 L720 380 L720 460 L790 460 L790 500 L850 500 L850 440 L900 440 L900 480 L960 480 L960 400 L1000 400 L1000 360 L1040 360 L1040 480 L1100 480 L1100 520 L1200 520" />
          <line x1="0" y1="560" x2="1200" y2="560" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
