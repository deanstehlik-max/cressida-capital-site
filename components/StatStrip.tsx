import { brand } from '@/lib/brand';

export default function StatStrip() {
  const stats = [
    { figure: brand.stats.financingArranged, label: 'in commercial real estate financing arranged' },
    { figure: brand.stats.lenderRelationships, label: 'qualified lender relationships nationwide' },
    { figure: String(brand.yearsInBusiness), label: `years arranging CRE financing \u2014 founded ${brand.founded}` },
    { figure: brand.stats.loanSizeRange, label: 'loan size range across all programs' },
  ];

  return (
    <div className="bg-forest text-paper">
      <div className="max-w-[1180px] mx-auto px-8 py-11 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className={i === 0 ? '' : 'lg:border-l lg:border-white/20 lg:pl-5'}>
            <div className="num text-[32px] font-medium text-brass-light">{stat.figure}</div>
            <div className="text-[12.5px] text-[#B9C6BF] mt-1.5 max-w-[22ch]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
