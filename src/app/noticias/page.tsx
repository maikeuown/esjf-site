import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Newspaper, Search, ArrowRight, Calendar, Mail, Bell, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsFilters } from '@/components/news/news-filters';

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; category?: string }> }) {
  const supabase = await createServerClient();
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const search = params.search || '';
  const category = params.category || '';
  const perPage = 9;

  // Fetch categories
  const { data: categories } = await supabase
    .from('news_categories')
    .select('*')
    .order('name') as { data: any[] | null };

  // Build query
  let query = supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug, color)
    `, { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  if (category) {
    query = query.eq('category_id', category);
  }

  // Get total count
  const { count: totalCount } = await query;

  // Get paginated results
  const { data: news } = await query
    .range((currentPage - 1) * perPage, currentPage * perPage - 1);

  const totalPages = Math.ceil((totalCount || 0) / perPage);

  const categoryFilters = categories?.map(cat => ({
    value: cat.id,
    label: cat.name,
    color: cat.color,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Fique informado</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">Notícias</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Fique a par de todas as novidades e acontecimentos da Escola Secundária José Falcão
        </p>
      </div>

      {/* Glassmorphism Filters - Client Component */}
      <NewsFilters
        categories={categoryFilters}
        activeCategory={category}
        activeSearch={search}
        resultCount={totalCount || 0}
      />

      {/* News Grid */}
      {news && news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {news.map((item, i) => (
            <Link href={`/noticias/${item.slug}`} key={item.id} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border-border/50">
                {item.featured_image_url && (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={item.featured_image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center gap-2 mb-3">
                    {item.category && (
                      <Badge
                        className="text-white"
                        style={{ backgroundColor: item.category.color }}
                      >
                        {item.category.name}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  {item.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.published_at ? formatDate(new Date(item.published_at)) : 'Recente'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="mb-8 border-dashed">
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-20 w-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
                <Newspaper className="h-10 w-10 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                {search ? 'Nenhum resultado encontrado' : 'Ainda não há notícias'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {search 
                  ? `Não encontrámos notícias para "${search}". Tente uma pesquisa diferente.`
                  : 'As novidades da Escola Secundária José Falcão aparecerão aqui. Volte brevemente!'
                }
              </p>
              
              {search && (
                <Link href="/noticias">
                  <Button variant="outline" className="mb-4">
                    Limpar pesquisa
                  </Button>
                </Link>
              )}
              
              {/* Newsletter Suggestion */}
              <div className="mt-8 p-6 bg-gradient-to-br from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20 rounded-xl border border-brand-200 dark:border-brand-800">
                <Bell className="h-8 w-8 text-brand-600 dark:text-brand-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Não perca as próximas novidades</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscreva o nosso boletim informativo para receber as notícias por email
                </p>
                <div className="flex gap-2 max-w-sm mx-auto">
                  <Input 
                    type="email" 
                    placeholder="O seu email" 
                    className="flex-1"
                  />
                  <Button className="bg-brand-600 hover:bg-brand-700">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {currentPage > 1 && (
            <Link href={`/noticias?page=${currentPage - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}>
              <Button variant="outline">Anterior</Button>
            </Link>
          )}

          <span className="px-4 py-2 text-sm">
            Página {currentPage} de {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link href={`/noticias?page=${currentPage + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}>
              <Button variant="outline">Próxima</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
