import Link from 'next/link';

export const loanPrograms = [
  { slug: 'bridge-hard-money', name: 'Bridge & Hard Money', size: '$1M \u2013 $50M', ltv: '65\u201375%', term: '6\u201336 months' },
  { slug: 'sba', name: 'SBA 7(a) / 504', size: '$500K \u2013 $15M', ltv: 'Up to 90%', term: '10\u201325 years' },
  { slug: 'construction', name: 'Construction', size: '$2M \u2013 $40M', ltv: 'Up to 80% LTC', term: '18\u201336 months' },
  { slug: 'multifamily-cmbs', name: 'Multifamily & CMBS', size: '$1M \u2013 $75M', ltv: '70\u201380%', term: '5\u201310 years' },
  { slug: 'investor', name: 'Investor', size: '$1M \u2013 $50M', ltv: '65\u201375%', term: '5\u201310 years' },
  { slug: 'residential-portfolio', name: 'Residential Portfolio', size: 'Varies by portfolio', ltv: '\u2014', term: '\u2014' },
  { slug: 'light-doc', name: 'Light Doc Program', size: '$200K \u2013 $3M', ltv: 'Up to 70%', term: '5\u201330 years' },
];

export default function LoanProgramsTable() {
  return (
    <div className="border-t border-ink">
      <div className="grid grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_0.6fr] gap-4 text-[11.5px] text-grey py-3">
        <span>Program</span>
        <span>Loan Size</span>
        <span className="hidden lg:block">Typical LTV</span>
        <span className="hidden lg:block">Term</span>
        <span />
      </div>
      {loanPrograms.map((p) => (
        <Link
          key={p.slug}
          href={`/loan-solutions/${p.slug}`}
          className="grid grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_0.6fr] gap-4 py-5 border-b border-hair items-baseline hover:bg-forest/[.04] transition-colors"
        >
          <span className="font-display text-[17px] font-medium">{p.name}</span>
          <span className="text-[13.5px] text-slate">{p.size}</span>
          <span className="hidden lg:block text-[13.5px] text-slate">{p.ltv}</span>
          <span className="hidden lg:block text-[13.5px] text-slate">{p.term}</span>
          <span className="text-[13px] text-forest text-right">Details</span>
        </Link>
      ))}
    </div>
  );
}
