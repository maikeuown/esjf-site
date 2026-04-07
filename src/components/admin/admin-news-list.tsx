'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import { Plus, Pencil, Trash2, Eye, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';

const categoryColors: Record<string, string> = {
  geral: '#059669',
  academico: '#1e40af',
  eventos: '#d97706',
  desporto: '#dc2626',
  cultura: '#7c3aed',
};

export function AdminNewsList() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('news')
      .select(`*, category:news_categories(name, slug, color)`)
      .order('created_at', { ascending: false });
    setNews(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  const filtered = news.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.slug?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar esta notícia?')) return;
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) alert('Erro: ' + error.message);
    else fetchNews();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Notícias</h1>
        <Link href="/admin/news/new">
          <Button className="bg-brand-600 hover:bg-brand-700 text-white gap-2">
            <Plus className="h-4 w-4" /> Nova Notícia
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar notícias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? <p className="text-muted-foreground">A carregar...</p> : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.length > 0 ? filtered.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                        {item.status === 'published' ? 'Publicado' : item.status === 'draft' ? 'Rascunho' : item.status === 'scheduled' ? 'Agendado' : 'Arquivado'}
                      </Badge>
                      {item.category && <Badge style={{ backgroundColor: categoryColors[item.category.slug] || item.category.color }}>{item.category.name}</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.published_at ? formatDate(new Date(item.published_at)) : formatDate(new Date(item.created_at))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link href={`/noticias/${item.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" title="Ver"><Eye className="h-4 w-4" /></Button>
                    </Link>
                    <Link href={`/admin/news/${item.id}/edit`}>
                      <Button variant="ghost" size="icon" title="Editar"><Pencil className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} title="Eliminar">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center text-muted-foreground">Nenhuma notícia encontrada</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
