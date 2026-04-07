import { createServerClient } from '@/lib/supabase/server';
import { AdminAvisosList } from '@/components/admin/admin-avisos-list';

export default async function AdminAvisosPage() {
  const supabase = await createServerClient();

  const { data: avisos } = await supabase
    .from('avisos')
    .select('id, title, slug, status, priority, is_pinned, published_at, expires_at, created_at')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false }) as { data: any[] | null };

  return <AdminAvisosList avisos={avisos || []} />;
}
