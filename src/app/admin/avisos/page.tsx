import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Plus, Pencil, Trash2, Eye, Pin } from 'lucide-react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

const priorityConfig = {
  urgent: { label: 'Urgente', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  normal: { label: 'Normal', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  low: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
};

const statusConfig = {
  draft: { label: 'Rascunho', variant: 'secondary' as const },
  published: { label: 'Publicado', variant: 'default' as const },
  scheduled: { label: 'Agendado', variant: 'secondary' as const },
  archived: { label: 'Arquivado', variant: 'secondary' as const },
};

export default async function AdminAvisosPage() {
  const supabase = await createServerClient();

  const { data: avisos } = await supabase
    .from('avisos')
    .select(`
      id,
      title,
      slug,
      status,
      priority,
      is_pinned,
      published_at,
      expires_at,
      created_at
    `)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false }) as { data: any[] | null };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Avisos</h1>
        <Link href="/admin/avisos/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Aviso
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 font-semibold">Título</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Prioridade</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Estado</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Data</th>
                <th className="text-right p-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {avisos && avisos.length > 0 ? (
                avisos.map((aviso) => {
                  const priority = priorityConfig[aviso.priority as keyof typeof priorityConfig] || priorityConfig.normal;
                  const status = statusConfig[aviso.status as keyof typeof statusConfig] || statusConfig.draft;
                  
                  return (
                    <tr key={aviso.id} className="border-t hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {aviso.is_pinned && (
                            <Pin className="h-4 w-4 text-amber-500" />
                          )}
                          <div>
                            <div className="font-medium">{aviso.title}</div>
                            <div className="text-sm text-muted-foreground md:hidden">{aviso.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <Badge className={priority.className}>
                          {priority.label}
                        </Badge>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <Badge variant={status.variant}>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                        {aviso.published_at ? formatDate(new Date(aviso.published_at)) : formatDate(new Date(aviso.created_at))}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/avisos/${aviso.slug}`} target="_blank">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/avisos/edit/${aviso.id}`}>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteAvisoButton id={aviso.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground">
                    Nenhum aviso criado ainda.
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

async function DeleteAvisoButton({ id }: { id: string }) {
  async function deleteAviso(formData: FormData) {
    'use server';
    const supabase = await createServerClient();
    await supabase.from('avisos').delete().eq('id', id);
    revalidatePath('/admin/avisos');
  }

  return (
    <form action={deleteAviso}>
      <Button variant="ghost" size="icon" type="submit">
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
}
