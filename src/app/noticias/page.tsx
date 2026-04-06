import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Newspaper, Search, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    .order('name');

  // Build query
  let query = supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug, color),
      author:profiles(full_name)
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

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Notícias</h1>
        <p className="text-muted-foreground text-lg">
          Fique a par de todas as novidades e acontecimentos da nossa escola
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="search"
                  placeholder="Pesquisar notícias..."
                  defaultValue={search}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              name="category"
              defaultValue={category}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">Todas as categorias</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <Button type="submit">Pesquisar</Button>
          </form>
        </CardContent>
      </Card>

      {/* News Grid */}
      {news && news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {news.map((item) => (
            <Link href={`/noticias/${item.slug}`} key={item.id} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                {item.featured_image_url && (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={item.featured_image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    {item.category && (
                      <Badge style={{ backgroundColor: item.category.color }}>
                        {item.category.name}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {item.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                      {item.excerpt}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.published_at ? formatDate(new Date(item.published_at)) : 'Recente'}
                    </span>
                    {item.author && (
                      <span>{item.author.full_name}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-12 text-center">
            <Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-muted-foreground">
              {search ? 'Tente uma pesquisa diferente' : 'Aguarde as próximas novidades'}
            </p>
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
          
          <span className="px-4 py-2">
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
