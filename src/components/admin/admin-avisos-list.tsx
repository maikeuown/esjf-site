'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Plus, Trash2, Eye, Search, Pin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';

const priorityConfig: Record<string, { label: string; className: string }> = {
  urgent: { label: 'Urgente', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  normal: { label: 'Normal', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  low: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
};

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' }> = {
  draft: { label: 'Rascunho', variant: 'secondary' },
  published: { label: 'Publicado', variant: 'default' },
  scheduled: { label: 'Agendado', variant: 'secondary' },
  archived: { label: 'Arquivado', variant: 'secondary' },
};

export function AdminAvisosList({ avisos }: { avisos: any[] }) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [search, setSearch] = useState('');

  const filtered = avisos.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.slug && a.slug.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este aviso?')) return;
    const { error } = await supabase.from('avisos').delete().eq('id', id);
    if (error) alert('Erro: ' + error.message);
    else router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Avisos</h1>
        <Link href="/admin/avisos/new">
          <Button className="bg-brand-600 hover:bg-brand-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Novo Aviso
          </Button>
        </Link>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Pesquisar avisos..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.length > 0 ? (
              filtered.map((aviso) => {
                const priority = priorityConfig[aviso.priority] || priorityConfig.normal;
                const status = statusConfig[aviso.status] || statusConfig.draft;
                return (
                  <div key={aviso.id} className="p-4 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {aviso.is_pinned && <Pin className="h-4 w-4 text-amber-500 shrink-0" />}
                        <h3 className="font-medium truncate">{aviso.title}</h3>
                        <Badge className={priority.className}>{priority.label}</Badge>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {aviso.published_at ? formatDate(new Date(aviso.published_at)) : formatDate(new Date(aviso.created_at))}
                        {aviso.expires_at && ` · Expira: ${formatDate(new Date(aviso.expires_at))}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Link href={`/avisos/${aviso.slug}`} target="_blank">
                        <Button variant="ghost" size="icon" title="Ver"><Eye className="h-4 w-4" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(aviso.id)} title="Eliminar">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center text-muted-foreground">Nenhum aviso encontrado</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
