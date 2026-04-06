import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, Clock, Users, ArrowRight, GraduationCap, Trophy, Newspaper } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

export default async function Home() {
  const supabase = await createServerClient();

  // Fetch highlights for carousel
  const { data: highlights } = await supabase
    .from('highlights')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true })
    .limit(5);

  // Fetch latest news
  const { data: latestNews } = await supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug, color),
      author:profiles(full_name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(6);

  // Fetch upcoming events
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(4);

  return (
    <div>
      {/* Hero Carousel / Highlights */}
      <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Escola Secundária José Falcão
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Um dos primeiros Liceus de Portugal. Monumento de interesse público.
              <br />
              <span className="text-lg">Educação para a cidadania, para os valores e para a paz.</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/a-escola">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90">
                  Conhecer a Escola
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contactos">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contactar
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/plataformas" className="group">
              <div className="bg-background rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <BookOpen className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-sm">Plataformas</h3>
              </div>
            </Link>
            <Link href="/eventos" className="group">
              <div className="bg-background rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-sm">Calendário</h3>
              </div>
            </Link>
            <Link href="/servicos/secretaria" className="group">
              <div className="bg-background rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-sm">Secretaria</h3>
              </div>
            </Link>
            <Link href="/documentos" className="group">
              <div className="bg-background rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-sm">Documentos</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Últimas Notícias</h2>
              <p className="text-muted-foreground mt-2">Fique a par de tudo o que acontece na nossa escola</p>
            </div>
            <Link href="/noticias" className="hidden md:flex">
              <Button variant="outline">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews?.map((news) => (
              <Link href={`/noticias/${news.slug}`} key={news.id} className="group">
                <article className="bg-background rounded-lg border overflow-hidden hover:shadow-lg transition-shadow h-full">
                  {news.featured_image_url && (
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={news.featured_image_url}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {news.category && (
                      <span 
                        className="inline-block px-2 py-1 text-xs font-semibold rounded-full text-white mb-3"
                        style={{ backgroundColor: news.category.color }}
                      >
                        {news.category.name}
                      </span>
                    )}
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    {news.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                        {news.excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Newspaper className="h-4 w-4 mr-1" />
                      {news.published_at ? formatDate(new Date(news.published_at)) : 'Recente'}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/noticias">
              <Button variant="outline">
                Ver todas as notícias
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Próximos Eventos</h2>
              <p className="text-muted-foreground mt-2">Não perca os eventos da nossa escola</p>
            </div>
            <Link href="/eventos" className="hidden md:flex">
              <Button variant="outline">
                Ver calendário
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents?.map((event) => (
              <Link href={`/eventos/${event.slug}`} key={event.id} className="group">
                <div className="bg-background rounded-lg p-6 border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-2xl font-bold text-primary">
                        {new Date(event.start_date).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {new Date(event.start_date).toLocaleDateString('pt-PT', { month: 'short' })}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      {event.location && (
                        <p className="text-sm text-muted-foreground">
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About School */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sobre a Nossa Escola</h2>
              <p className="text-muted-foreground mb-4">
                Fundada em 1936 como Liceu D. João III, a Escola Secundária José Falcão é um dos primeiros três Liceus criados em Portugal e está classificada como monumento de interesse público.
              </p>
              <p className="text-muted-foreground mb-6">
                Atualmente, a escola encontra-se num ambicioso projeto de reabilitação profunda, orçado em 23,8 milhões de euros, que a transformará num espaço moderno e acolhedor para as gerações futuras.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1936</div>
                  <div className="text-sm text-muted-foreground">Ano de Fundação</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">88+</div>
                  <div className="text-sm text-muted-foreground">Anos de História</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">23.8M€</div>
                  <div className="text-sm text-muted-foreground">Investimento</div>
                </div>
              </div>
              <Link href="/a-escola">
                <Button>
                  Saber mais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
              <GraduationCap className="h-32 w-32 text-brand-500/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Platforms */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Trophy className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Plataformas Digitais</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Aceda às plataformas digitais da escola: Inovar, Moodle, SIGA, Google Workspace e muito mais.
          </p>
          <Link href="/plataformas">
            <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90">
              Aceder às Plataformas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
