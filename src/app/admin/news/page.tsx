import { createServerClient } from '@/lib/supabase/server';
import { AdminNewsList } from '@/components/admin/admin-news-list';

export default async function AdminNewsPage() {
  return <AdminNewsList />;
}
