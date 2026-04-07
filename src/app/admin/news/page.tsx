import { createServerClient } from '@/lib/supabase/server';
import { AdminNewsList } from '@/components/admin/admin-news-list';

export default async function AdminNewsPage() {
  const supabase = await createServerClient();

  const { data: news } = await supabase
    .from('news')
    .select(`
      id, title, slug, status, published_at, created_at,
      category:news_categories(name, color)
    `)
    .order('created_at', { ascending: false }) as { data: any[] | null };

  return <AdminNewsList news={news || []} />;
}
