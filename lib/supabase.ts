import { createClient } from '@supabase/supabase-js';

// Server-only client. Uses the anon/publishable key with the RLS policy
// defined in the loan_requests migration ("Public can submit loan requests" —
// insert-only for anon). Never import this file into a client component.
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
    );
  }

  return createClient(url, key);
}
