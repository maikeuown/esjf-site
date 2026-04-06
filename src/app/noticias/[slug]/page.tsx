import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const supabase = await createServerClient();
  const { slug } = await params;

  const { data: news } = await supabase
    .from('news')
    .select('title, excerpt, featured_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!news) {
    return { title: 'Notícia não encontrada' };
  }

  return {
    title: news.title,
    description: news.excerpt || undefined,
    openGraph: {
      title: news.title,
      description: news.excerpt || undefined,
      images: news.featured_image_url ? [{ url: news.featured_image_url }] : [],
    },
  };
}

// Dynamic rendering - data comes from Supabase
export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const supabase = await createServerClient();
  const { slug } = await params;
  
  const { data: news } = await supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug, color),
      author:profiles(full_name, avatar_url)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!news) {
    notFound();
  }

  // Fetch related news
  const { data: relatedNews } = await supabase
    .from('news')
    .select('id, title, slug, featured_image_url, published_at')
    .eq('status', 'published')
    .neq('id', news.id)
    .order('published_at', { ascending: false })
    .limit(3) as { data: any[] | null };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Link href="/noticias" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Voltar às notícias
      </Link>

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {news.category && (
              <Badge style={{ backgroundColor: news.category.color }}>
                {news.category.name}
              </Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{news.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {news.published_at ? formatDate(new Date(news.published_at)) : 'Data não disponível'}
            </span>
            {news.author && (
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {news.author.full_name}
              </span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {news.featured_image_url && (
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={news.featured_image_url}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/* Share */}
        <div className="flex items-center gap-4 pt-8 border-t">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Partilhar
          </Button>
        </div>
      </article>

      {/* Related News */}
      {relatedNews && relatedNews.length > 0 && (
        <section className="mt-16 pt-16 border-t">
          <h2 className="text-2xl font-bold mb-6">Notícias Relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <Link href={`/noticias/${item.slug}`} key={item.id} className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {item.featured_image_url && (
                    <div className="relative h-40 overflow-hidden bg-muted">
                      <Image
                        src={item.featured_image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.published_at ? formatDate(new Date(item.published_at)) : ''}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
