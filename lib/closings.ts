import { getSupabaseServerClient } from '@/lib/supabase';

export type Closing = {
  id: string;
  closed_on: string;
  loan_program: string;
  property_type: string | null;
  deal_title: string;
  city: string | null;
  state: string | null;
  amount: number;
};

/**
 * Closings kept in the repo and merged with the Supabase `closings` table.
 * Same fields as a published row: program, short title, city/state, one amount.
 * City and state only — no borrower name and no street address.
 *
 * `closed_on` is not shown in the ledger. It only controls newest-first order.
 * 2026-10-16 is the date this closing was approved for the public site, which
 * places it ahead of the 2014–2017 rows already in Supabase.
 *
 * `amount` is the $8.17M total project cost (the single figure this list shows).
 * Cressida arranged the financing as a correspondent: a $4.12M bank first lien,
 * a $2.80M CDC/SBA 504 second, land equity the owner already held, and a $500K
 * SBA 7(a) working-capital companion. Those pieces are not separate rows.
 * The ledger does not render images — none of the existing rows have one.
 */
const repoClosings: Closing[] = [
  {
    id: 'cape-coral-sba-504-assisted-living',
    closed_on: '2026-10-16',
    loan_program: 'sba',
    property_type: 'assisted-living',
    deal_title: 'Assisted living ground-up construction',
    city: 'Cape Coral',
    state: 'FL',
    amount: 8_170_000,
  },
];

function closingIdentity(c: Closing): string {
  return [
    c.loan_program,
    (c.city ?? '').trim().toLowerCase(),
    (c.state ?? '').trim().toLowerCase(),
    c.deal_title.trim().toLowerCase(),
  ].join('|');
}

/** Newest `closed_on` first, matching the Supabase query order. */
export function sortClosings(closings: Closing[]): Closing[] {
  return [...closings].sort((a, b) => {
    if (a.closed_on === b.closed_on) return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    return a.closed_on < b.closed_on ? 1 : -1;
  });
}

/**
 * Remote rows win when the same id or the same program/title/city/state
 * already exists, so a later Supabase edit does not duplicate the repo row.
 */
export function mergeClosings(remote: Closing[], local: Closing[] = repoClosings): Closing[] {
  const seen = new Set<string>();
  const merged: Closing[] = [];
  for (const closing of [...remote, ...local]) {
    const idKey = `id:${closing.id}`;
    const titleKey = `title:${closingIdentity(closing)}`;
    if (seen.has(idKey) || seen.has(titleKey)) continue;
    seen.add(idKey);
    seen.add(titleKey);
    merged.push(closing);
  }
  return sortClosings(merged);
}

/**
 * Published closings, most recent first.
 * Supabase is the source for historical rows. Repo closings are merged in so
 * a deal approved for the site still renders when it is not in that table yet.
 * A Supabase miss falls back to the repo rows instead of an empty list.
 */
export async function getClosings(limit?: number): Promise<Closing[]> {
  let remote: Closing[] = [];
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('closings')
      .select('id, closed_on, loan_program, property_type, deal_title, city, state, amount')
      .eq('is_published', true);

    if (error) {
      console.error('getClosings error:', error);
    } else {
      remote = data ?? [];
    }
  } catch (err) {
    console.error('getClosings failed:', err);
  }

  const merged = mergeClosings(remote);
  return typeof limit === 'number' ? merged.slice(0, limit) : merged;
}

export function formatAmount(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 2)}M`;
  }
  return `$${(amount / 1_000).toFixed(0)}K`;
}

const programLabels: Record<string, string> = {
  'bridge-hard-money': 'BRIDGE',
  sba: 'SBA',
  construction: 'CONSTRUCTION',
  'multifamily-cmbs': 'MULTIFAMILY/CMBS',
  investor: 'INVESTOR',
  'residential-portfolio': 'RESIDENTIAL',
  'light-doc': 'LIGHT DOC',
};

export function programLabel(slug: string): string {
  return programLabels[slug] ?? slug.toUpperCase();
}
