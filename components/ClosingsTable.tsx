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
      <div className="txn-row text-[11px] uppercase tracking-wider text-grey border-b-2 border-ink pb-2.5">
        <span>Type</span>
        <span>Deal</span>
        <span className="hidden min-[880px]:block">Location</span>
        <span className="text-right">Amount</span>
      </div>
      {closings.map((c) => (
        <div
          key={c.id}
          className="txn-row py-4 border-b border-hair hover:bg-forest/5 transition-colors"
        >
          <span className="txn-tag">{programLabel(c.loan_program)}</span>
          <span className="font-semibold text-[16px]">{c.deal_title}</span>
          <span className="hidden min-[880px]:block text-sm text-slate">
            {c.city && c.state ? `${c.city}, ${c.state}` : c.city || c.state || '\u2014'}
          </span>
          <span className="num font-display font-bold text-[16px] text-right">
            {formatAmount(c.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}
