import { Closing, formatAmount, programLabel } from '@/lib/closings';

export default function ClosingsTable({ closings }: { closings: Closing[] }) {
  if (closings.length === 0) {
    return (
      <p className="text-sm text-grey py-8">
        Recent closings will appear here shortly.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-[1.2fr_1.6fr_1fr_1fr] gap-4 text-[11.5px] text-grey border-b border-ink pb-2.5">
        <span>Type</span>
        <span>Deal</span>
        <span className="hidden lg:block">Location</span>
        <span className="text-right">Amount</span>
      </div>
      {closings.map((c) => (
        <div
          key={c.id}
          className="grid grid-cols-3 lg:grid-cols-[1.2fr_1.6fr_1fr_1fr] gap-4 py-4 border-b border-hair text-sm items-baseline"
        >
          <span className="inline-block w-fit text-[10.5px] font-semibold tracking-wide text-forest border border-forest px-[7px] py-[2px]">
            {programLabel(c.loan_program)}
          </span>
          <span className="font-medium">{c.deal_title}</span>
          <span className="hidden lg:block text-slate">
            {c.city && c.state ? `${c.city}, ${c.state}` : c.city || c.state || '\u2014'}
          </span>
          <span className="num font-medium text-right">{formatAmount(c.amount)}</span>
        </div>
      ))}
    </div>
  );
}
