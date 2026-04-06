import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Users, Mail, Eye, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  editor: 'Editor',
  secretary: 'Secretaria',
};

export default async function AdminUsersPage() {
  const supabase = await createServerClient();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  async function markAsRead(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createServerClient();
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    revalidatePath('/admin/messages');
  }

  async function deleteMessage(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createServerClient();
    await supabase.from('contact_messages').delete().eq('id', id);
    revalidatePath('/admin/messages');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Utilizadores</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 font-semibold">Nome</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Email</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Função</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Registo</th>
              </tr>
            </thead>
            <tbody>
              {profiles && profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr key={profile.id} className="border-t hover:bg-secondary/50">
                    <td className="p-4">
                      <div className="font-medium">{profile.full_name}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">
                      {profile.email}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <Badge
                        variant={profile.role === 'admin' ? 'default' : 'secondary'}
                      >
                        {roleLabels[profile.role]}
                      </Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground">
                      {formatDate(new Date(profile.created_at))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-muted-foreground">
                    Nenhum utilizador encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
