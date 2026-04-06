import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Newspaper, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

const priorityConfig = {
  urgent: { label: 'Urgente', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  normal: { label: 'Normal', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  low: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
};

export default async function NovidadesPage() {
  const supabase = await createServerClient();

  // Fetch recent avisos
  const { data: avisos } = await supabase
    .from('avisos')
    .select('*')
    .eq('status', 'published')
    .order('is_pinned', { ascending: false })
    .order('published_at', { ascending: false })
    .limit(5) as { data: any[] | null };

  // Fetch recent news
  const { data: news } = await supabase
    .from('news')
    .select(`
      *,
      category:news_categories(name, slug, color)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(5) as { data: any[] | null };

  // Fetch upcoming events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(5) as { data: any[] | null };

  const now = new Date().toISOString();
  const activeAvisos = avisos?.filter(a => !a.expires_at || a.expires_at > now) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Tudo num só lugar</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">Novidades</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Avisos, Notícias e Eventos da Escola Secundária José Falcão
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avisos Column */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Megaphone className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              Avisos
            </h2>
            <Link href="/avisos">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {activeAvisos.length > 0 ? (
              activeAvisos.map((aviso) => {
                const priority = priorityConfig[aviso.priority as keyof typeof priorityConfig] || priorityConfig.normal;
                return (
                  <Link key={aviso.id} href={`/avisos/${aviso.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow border-border/50 card-shimmer-static">
                      <CardContent className="p-4">
                        <Badge className={`${priority.className} mb-2`}>
                          {priority.label}
                        </Badge>
                        <h3 className="font-semibold mb-1 line-clamp-2 hover:text-brand-600 transition-colors">
                          {aviso.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {aviso.published_at ? formatDate(new Date(aviso.published_at)) : 'Recente'}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            ) : (
              <Card className="border-dashed p-6 text-center">
                <p className="text-muted-foreground text-sm">Sem avisos no momento</p>
              </Card>
            )}
          </div>
        </div>

        {/* Notícias Column */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              Notícias
            </h2>
            <Link href="/noticias">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todas <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {news?.map((item) => (
              <Link key={item.id} href={`/noticias/${item.slug}`}>
                <Card className="hover:shadow-lg transition-shadow border-border/50 card-shimmer-static">
                  <CardContent className="p-4">
                    {item.category && (
                      <Badge className="mb-2 text-white" style={{ backgroundColor: item.category.color }}>
                        {item.category.name}
                      </Badge>
                    )}
                    <h3 className="font-semibold mb-1 line-clamp-2 hover:text-brand-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.published_at ? formatDate(new Date(item.published_at)) : 'Recente'}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Eventos Column */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              Eventos
            </h2>
            <Link href="/eventos">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {events?.map((event) => (
              <Link key={event.id} href={`/eventos/${event.slug}`}>
                <Card className="hover:shadow-lg transition-shadow border-border/50 card-shimmer-static">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-100 dark:bg-brand-900/30 rounded-lg p-2 text-center min-w-[50px]">
                        <div className="text-lg font-bold text-brand-600 dark:text-brand-400">
                          {new Date(event.start_date).getDate()}
                        </div>
                        <div className="text-[10px] text-muted-foreground uppercase">
                          {new Date(event.start_date).toLocaleDateString('pt-PT', { month: 'short' })}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 line-clamp-2 hover:text-brand-600 transition-colors">
                          {event.title}
                        </h3>
                        {event.location && (
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
