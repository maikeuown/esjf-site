import { createServerClient } from '@/lib/supabase/server';
import { AdminAvisosList } from '@/components/admin/admin-avisos-list';

export default async function AdminAvisosPage() {
  return <AdminAvisosList />;
}
