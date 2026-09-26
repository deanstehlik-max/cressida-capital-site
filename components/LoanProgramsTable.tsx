import Link from 'next/link';

export const loanPrograms = [
  { slug: 'bridge-hard-money', name: 'Bridge & Hard Money', size: '$1M \u2013 $50M', ltv: '65\u201375%', term: '6\u201336 months', mostRequested: true },
  { slug: 'sba', name: 'SBA 7(a) / 504', size: '$500K \u2013 $15M', ltv: 'Up to 90%', term: '10\u201325 years' },
  { slug: 'construction', name: 'Construction', size: '$2M \u2013 $40M', ltv: 'Up to 80% LTC', term: '18\u201336 months' },
  { slug: 'multifamily-cmbs', name: 'Multifamily & CMBS', size: '$1M \u2013 $75M', ltv: '70\u201380%', term: '5\u201310 years' },
  { slug: 'investor', name: 'Investor', size: '$1M \u2013 $50M', ltv: '65\u201375%', term: '5\u201310 years' },
  { slug: 'residential-portfolio', name: 'Residential Portfolio', size: 'Varies by portfolio', ltv: '\u2014', term: '\u2014' },
  { slug: 'light-doc', name: 'Light Doc Program', size: '$200K \u2013 $3M', ltv: 'Up to 70%', term: '5\u201330 years' },
];

/** Extracts dollar amounts (e.g. "$200K", "$50M") from a loan-size label. */
function parseSizeValues(size: string): number[] {
  const values: number[] = [];
  for (const match of size.matchAll(/\$([\d.]+)\s*(K|M)/gi)) {
    const amount = parseFloat(match[1]) * (match[2].toUpperCase() === 'M' ? 1_000_000 : 1_000);
    if (!Number.isNaN(amount)) values.push(amount);
  }
  return values;
}

function formatSizeValue(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `$${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
  }
  return `$${Math.round(value / 1_000)}K`;
}

/** Program count, computed from the list so the summary card stays accurate. */
export function getProgramCount(programs = loanPrograms): number {
  return programs.length;
}

/**
 * Lowest minimum to highest maximum loan size across every program, computed
 * from the list (never hardcoded) so the summary card stays accurate as
 * programs change. Non-numeric sizes (e.g. "Varies by portfolio") are ignored.
 */
export function getLoanRange(programs = loanPrograms): string {
  const values = programs.flatMap((p) => parseSizeValues(p.size));
  if (values.length === 0) return '\u2014';
  return `${formatSizeValue(Math.min(...values))} \u2013 ${formatSizeValue(Math.max(...values))}`;
}

export default function LoanProgramsTable() {
  return (
    <div>
      <div className="loan-row text-[11px] uppercase tracking-wider text-grey border-b-2 border-forest pb-2.5">
        <span>Program</span>
        <span>Loan Size</span>
        <span className="hidden min-[880px]:block">Typical LTV</span>
        <span className="hidden min-[880px]:block">Term</span>
        <span />
      </div>
      {loanPrograms.map((p) => (
        <Link
          key={p.slug}
          href={`/loan-solutions/${p.slug}`}
          className="loan-row py-5 border-b border-hair hover:bg-forest/[.04] transition-colors"
        >
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-[17px] font-bold">{p.name}</span>
            {p.mostRequested && (
              <span className="loan-tag self-center">MOST REQUESTED</span>
            )}
          </span>
          <span className="font-display text-[15px] font-bold text-brass">{p.size}</span>
          <span className="hidden min-[880px]:block text-[13.5px] text-slate">{p.ltv}</span>
          <span className="hidden min-[880px]:block text-[13.5px] text-slate">{p.term}</span>
          <span className="text-[13px] font-medium text-brass text-right">Details</span>
        </Link>
      ))}
    </div>
  );
}
