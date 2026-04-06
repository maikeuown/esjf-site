import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Plus, Trash2, ArrowUp, ArrowDown, Star } from 'lucide-react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export default async function AdminHighlightsPage() {
  const supabase = await createServerClient();

  const { data: highlights } = await supabase
    .from('highlights')
    .select('*')
    .order('order_index', { ascending: true });

  async function deleteHighlight(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createServerClient();
    await supabase.from('highlights').delete().eq('id', id);
    revalidatePath('/admin/highlights');
  }

  async function toggleHighlight(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const isActive = formData.get('isActive') === 'true';
    const supabase = await createServerClient();
    await supabase.from('highlights').update({ is_active: !isActive }).eq('id', id);
    revalidatePath('/admin/highlights');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Destaques</h1>
        <Link href="/admin/highlights/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Destaque
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {highlights && highlights.length > 0 ? (
          highlights.map((highlight) => (
            <Card key={highlight.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-muted-foreground font-mono">#{highlight.order_index + 1}</div>
                    {highlight.image_url && (
                      <div className="h-16 w-24 bg-muted rounded overflow-hidden">
                        <img src={highlight.image_url} alt={highlight.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{highlight.title}</h3>
                      {highlight.subtitle && (
                        <p className="text-sm text-muted-foreground">{highlight.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <form action={toggleHighlight}>
                      <input type="hidden" name="id" value={highlight.id} />
                      <input type="hidden" name="isActive" value={String(highlight.is_active)} />
                      <Button variant="ghost" size="icon" type="submit">
                        <Star className={`h-4 w-4 ${highlight.is_active ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                      </Button>
                    </form>
                    <form action={deleteHighlight}>
                      <input type="hidden" name="id" value={highlight.id} />
                      <Button variant="ghost" size="icon" type="submit">
                        <Trash2 className="h-4 w-4 text-destructive" />
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
              Nenhum destaque encontrado
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
