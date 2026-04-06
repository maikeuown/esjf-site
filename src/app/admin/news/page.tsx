import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function AdminNewsPage() {
  const supabase = await createServerClient();

  const { data: news } = await supabase
    .from('news')
    .select(`
      id,
      title,
      slug,
      status,
      published_at,
      created_at,
      category:news_categories(name, color)
    `)
    .order('created_at', { ascending: false }) as { data: any[] | null };

  async function deleteNews(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createServerClient();
    await supabase.from('news').delete().eq('id', id);
    revalidatePath('/admin/news');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Notícias</h1>
        <Link href="/admin/news/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Notícia
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 font-semibold">Título</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Categoria</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Estado</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Data</th>
                <th className="text-right p-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {news && news.length > 0 ? (
                news.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-secondary/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground md:hidden">{item.slug}</div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {item.category ? (
                        <Badge style={{ backgroundColor: item.category.color }}>
                          {item.category.name}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <Badge
                        variant={
                          item.status === 'published'
                            ? 'default'
                            : item.status === 'draft'
                            ? 'secondary'
                            : 'secondary'
                        }
                      >
                        {item.status === 'published'
                          ? 'Publicado'
                          : item.status === 'draft'
                          ? 'Rascunho'
                          : item.status === 'scheduled'
                          ? 'Agendado'
                          : 'Arquivado'}
                      </Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground">
                      {item.published_at ? formatDate(new Date(item.published_at)) : '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/noticias/${item.slug}`} target="_blank">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/news/${item.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <form action={deleteNews}>
                          <input type="hidden" name="id" value={item.id} />
                          <Button variant="ghost" size="icon" type="submit">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground">
                    Nenhuma notícia encontrada
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
