import { getSupabaseServerClient } from '@/lib/supabase';

export type InsightPost = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  body: string;
  author_name: string | null;
  published_at: string | null;
};

const columns = 'id, slug, title, dek, category, body, author_name, published_at';

export async function getPublishedInsights(limit?: number): Promise<InsightPost[]> {
  try {
    const supabase = getSupabaseServerClient();
    let query = supabase
      .from('insights_posts')
      .select(columns)
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) {
      console.error('getPublishedInsights error:', error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error('getPublishedInsights failed:', err);
    return [];
  }
}

export async function getInsightBySlug(slug: string): Promise<InsightPost | null> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('insights_posts')
      .select(columns)
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) return null;
    return data;
  } catch (err) {
    console.error('getInsightBySlug failed:', err);
    return null;
  }
}
