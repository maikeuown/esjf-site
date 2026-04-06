import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, Clock, Users, ArrowRight, GraduationCap, Trophy, Newspaper, MapPin, Phone, Mail, Megaphone, Bell, Sparkles, Pin } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { WeekCalendar } from '@/components/home/week-calendar';
import { AnimatedSection } from '@/components/ui/animated-section';

const priorityConfig = {
  urgent: { label: 'Urgente', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  normal: { label: 'Normal', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  low: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
};

export default async function Home() {
  const supabase = await createServerClient();

  // Fetch highlights
  const { data: highlights } = await supabase
    .from('highlights')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true })
    .limit(5);

  // Fetch recent avisos (with error handling if table doesn't exist yet)
  let avisos: any[] = [];
  try {
    const result = await supabase
      .from('avisos')
      .select(`
        *,
        author:profiles(full_name)
      `)
      .eq('status', 'published')
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(3);
    
    if (!result.error) {
      avisos = result.data || [];
    }
  } catch (error) {
    // Table might not exist yet, silently ignore
    console.log('Avisos table not found, skipping...');
  }

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
    .limit(8);

  // Filter out expired avisos
  const now = new Date().toISOString();
  const activeAvisos = avisos?.filter(a => !a.expires_at || a.expires_at > now) || [];

  return (
    <div>
      {/* Hero Section - Modern 3-Section Layout */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <MapPin className="h-4 w-4 text-brand-200" />
              <span className="text-sm text-white/90 font-medium">Coimbra · Monumento de Interesse Público</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Escola Secundária
              <span className="block text-brand-200">José Falcão</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-4 text-white/90 font-light">
              Um dos primeiros Liceus de Portugal. Fundada em 1936.
            </p>
            <p className="text-base sm:text-lg mb-8 text-white/70 max-w-2xl">
              Educação para a cidadania, para os valores e para a paz.
              Atualmente em reabilitação profunda com investimento de 23,8 milhões de euros.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/a-escola">
                <Button size="lg" className="bg-white text-brand-800 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all">
                  Conhecer a Escola
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contactos">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Contactar
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">1936</div>
                <div className="text-sm text-white/60 mt-1">Ano de Fundação</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">88+</div>
                <div className="text-sm text-white/60 mt-1">Anos de História</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">23.8M€</div>
                <div className="text-sm text-white/60 mt-1">Investimento</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Quick Links - With Glow Lift Pulse Effect */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, label: 'Plataformas', href: '/plataformas', color: 'blue' as const, bgColor: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-600 dark:text-blue-400' },
              { icon: Calendar, label: 'Calendário', href: '/eventos', color: 'emerald' as const, bgColor: 'bg-emerald-100 dark:bg-emerald-900/30', textColor: 'text-emerald-600 dark:text-emerald-400' },
              { icon: Clock, label: 'Secretaria', href: '/servicos/secretaria', color: 'amber' as const, bgColor: 'bg-amber-100 dark:bg-amber-900/30', textColor: 'text-amber-600 dark:text-amber-400' },
              { icon: Users, label: 'Documentos', href: '/documentos', color: 'purple' as const, bgColor: 'bg-purple-100 dark:bg-purple-900/30', textColor: 'text-purple-600 dark:text-purple-400' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group block">
                <div className="card bg-background rounded-2xl p-6 text-center border border-border/50 cursor-pointer">
                  <div className={`icon-glow icon-glow-${item.color} h-12 w-12 rounded-xl ${item.bgColor} flex items-center justify-center mx-auto mb-3 transition-all duration-400`}>
                    <item.icon className={`h-6 w-6 ${item.textColor}`} />
                  </div>
                  <h3 className="font-semibold text-sm text-glow">{item.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Avisos Section */}
      {activeAvisos.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 rounded-full px-4 py-2 mb-3">
                    <Megaphone className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Comunicados</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Avisos Importantes</h2>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Comunicados e avisos importantes da Escola Secundária José Falcão
                  </p>
                </div>
                <Link href="/avisos">
                  <Button variant="outline" className="gap-2">
                    Ver todos
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <div className="space-y-4">
              {activeAvisos.map((aviso, i) => {
                const priority = priorityConfig[aviso.priority as keyof typeof priorityConfig] || priorityConfig.normal;
                
                return (
                  <AnimatedSection key={aviso.id} delay={i * 0.1}>
                    <Link href={`/avisos/${aviso.slug}`} className="group block">
                      <div className="card border-border/50 rounded-2xl overflow-hidden cursor-pointer">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={`icon-glow icon-glow-${aviso.is_pinned ? 'amber' : 'brand'} h-12 w-12 rounded-xl ${
                              aviso.is_pinned 
                                ? 'bg-amber-100 dark:bg-amber-900/30' 
                                : 'bg-brand-100 dark:bg-brand-900/30'
                            } flex items-center justify-center shrink-0 transition-all duration-400`}>
                              {aviso.is_pinned ? (
                                <Pin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                              ) : (
                                <Bell className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${priority.className}`}>
                                  {priority.label}
                                </span>
                                {aviso.is_pinned && (
                                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 flex items-center gap-1">
                                    <Pin className="h-3 w-3" />
                                    Fixado
                                  </span>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold mb-2 text-glow group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                {aviso.title}
                              </h3>
                              {aviso.excerpt && (
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-3 text-glow">
                                  {aviso.excerpt}
                                </p>
                              )}
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                {aviso.published_at ? formatDate(new Date(aviso.published_at)) : 'Recente'}
                              </div>
                            </div>

                            {/* Arrow */}
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bento Grid - Highlights & Featured Content */}
      {highlights && highlights.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">Destaques</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Informação importante e novidades da nossa escola
                </p>
              </div>
            </AnimatedSection>
            
            <BentoGrid>
              {highlights.slice(0, 5).map((highlight, i) => (
                <BentoGridItem
                  key={highlight.id}
                  title={highlight.title}
                  description={highlight.description || ''}
                  href={highlight.link_url || '#'}
                  className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                  icon={highlight.icon_url ? undefined : Newspaper}
                  image={highlight.image_url}
                />
              ))}
            </BentoGrid>
          </div>
        </section>
      )}

      {/* Latest News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 mb-3">
                  <Newspaper className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Atualidade</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Últimas Notícias</h2>
                <p className="text-muted-foreground text-lg">
                  Fique a par de tudo o que acontece na nossa escola
                </p>
              </div>
              <Link href="/noticias" className="hidden md:flex">
                <Button variant="outline" className="gap-2">
                  Ver todas
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews?.map((news, i) => (
              <AnimatedSection key={news.id} delay={i * 0.1}>
                <Link href={`/noticias/${news.slug}`} className="group block">
                  <article className="card bg-background rounded-2xl border overflow-hidden cursor-pointer">
                    {news.featured_image_url && (
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <Image
                          src={news.featured_image_url}
                          alt={news.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      {news.category && (
                        <span
                          className="inline-block px-3 py-1 text-xs font-semibold rounded-full text-white mb-3"
                          style={{ backgroundColor: news.category.color }}
                        >
                          {news.category.name}
                        </span>
                      )}
                      <h3 className="text-xl font-semibold mb-2 text-glow line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {news.title}
                      </h3>
                      {news.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 text-glow">
                          {news.excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {news.published_at ? formatDate(new Date(news.published_at)) : 'Recente'}
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/noticias">
              <Button variant="outline" className="gap-2">
                Ver todas as notícias
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Calendar Preview */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-4 py-2 mb-3">
                  <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Agenda</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Próximos Eventos</h2>
                <p className="text-muted-foreground text-lg">
                  Não perca os eventos da nossa escola
                </p>
              </div>
              <Link href="/eventos" className="hidden md:flex">
                <Button variant="outline" className="gap-2">
                  Ver calendário completo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          <WeekCalendar events={upcomingEvents || []} />
        </div>
      </section>

      {/* About School - Modern Layout */}
      <section className="py-20 bg-gradient-to-br from-brand-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-6">
                  <GraduationCap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Desde 1936</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Sobre a Nossa Escola</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Fundada em 1936 como Liceu D. João III, a Escola Secundária José Falcão é um dos primeiros três Liceus criados em Portugal. 
                  O edifício, classificado como <strong className="text-foreground">Monumento de Interesse Público</strong>, representa uma peça fundamental do património educativo português.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Atualmente, a escola encontra-se num ambicioso projeto de reabilitação profunda, orçado em <strong className="text-foreground">23,8 milhões de euros</strong>, 
                  que a transformará num espaço moderno e acolhedor para as gerações futuras, mantendo a sua riqueza histórica e cultural.
                </p>
                
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-background rounded-xl border">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">1936</div>
                    <div className="text-sm text-muted-foreground mt-1">Fundação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">88+</div>
                    <div className="text-sm text-muted-foreground mt-1">Anos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">23.8M€</div>
                    <div className="text-sm text-muted-foreground mt-1">Investimento</div>
                  </div>
                </div>
                
                <Link href="/a-escola">
                  <Button className="gap-2 bg-brand-600 hover:bg-brand-700">
                    Saber mais sobre a escola
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                {/* Image Placeholder with gradient overlay */}
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-200 to-brand-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                  <GraduationCap className="h-24 w-24 text-brand-500/30 dark:text-brand-400/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm font-medium">Edifício classificado como Monumento de Interesse Público</p>
                    </div>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-600/10 rounded-2xl -z-10"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-brand-600/5 rounded-2xl -z-10"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA - Platforms */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <Trophy className="h-14 w-14 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Plataformas Digitais</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Aceda às plataformas digitais da escola: Inovar, Moodle, SIGA, Google Workspace e muito mais.
            </p>
            <Link href="/plataformas">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 shadow-lg gap-2">
                Aceder às Plataformas
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Phone, label: 'Telefone', content: '239 487 170 / 171 / 172', href: 'tel:+351239487170', color: 'blue' as const },
              { icon: Mail, label: 'Email', content: 'geral@esjf.pt', href: 'mailto:geral@esjf.pt', color: 'emerald' as const },
              { icon: MapPin, label: 'Morada', content: 'Av. Dom Afonso Henriques, Coimbra', href: '/contactos', color: 'amber' as const },
            ].map((item, i) => (
              <a key={i} href={item.href} className="group block">
                <div className="card bg-background rounded-2xl border border-border/50 cursor-pointer">
                  <div className="p-6 flex items-center gap-4">
                    <div className={`icon-glow icon-glow-${item.color} h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0 transition-all duration-400`}>
                      <item.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-glow">{item.label}</h4>
                      <p className="text-muted-foreground text-sm text-glow">{item.content}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
