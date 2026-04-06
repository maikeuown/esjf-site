import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Eye } from 'lucide-react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export default async function AdminPagesPage() {
  const supabase = await createServerClient();

  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .order('title');

  async function togglePublish(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const isPublished = formData.get('isPublished') === 'true';
    const supabase = await createServerClient();
    await supabase.from('pages').update({ is_published: !isPublished }).eq('id', id);
    revalidatePath('/admin/pages');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Páginas</h1>
      </div>

      <div className="space-y-4">
        {pages && pages.length > 0 ? (
          pages.map((page) => (
            <Card key={page.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{page.title}</h3>
                      <Badge variant={page.is_published ? 'default' : 'secondary'}>
                        {page.is_published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">/{page.slug}</p>
                    {page.meta_description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {page.meta_description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/${page.slug}`} target="_blank">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={page.id} />
                      <input type="hidden" name="isPublished" value={String(page.is_published)} />
                      <Button variant="outline" size="sm" type="submit">
                        {page.is_published ? 'Despublicar' : 'Publicar'}
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Nenhuma página encontrada
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
