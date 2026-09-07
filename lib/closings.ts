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
 * Fetches published closings from Supabase, most recent first.
 * Falls back to an empty array (rather than throwing) so a transient
 * Supabase issue doesn't take down the homepage or Transactions page \u2014
 * callers should handle the empty case gracefully.
 */
export async function getClosings(limit?: number): Promise<Closing[]> {
  try {
    const supabase = getSupabaseServerClient();
    let query = supabase
      .from('closings')
      .select('id, closed_on, loan_program, property_type, deal_title, city, state, amount')
      .eq('is_published', true)
      .order('closed_on', { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) {
      console.error('getClosings error:', error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error('getClosings failed:', err);
    return [];
  }
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
