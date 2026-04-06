import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FullCalendar } from '@/components/events/full-calendar';
import { EventsBentoGrid } from '@/components/events/events-bento-grid';

export default async function EventsPage() {
  const supabase = await createServerClient();

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true }) as { data: any[] | null };

  // Group events by month
  const groupedEvents = events?.reduce((acc: Record<string, any[]>, event: any) => {
    const date = new Date(event.start_date);
    const monthKey = date.toLocaleDateString('pt-PT', { year: 'numeric', month: 'long' });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(event);
    return acc;
  }, {} as Record<string, any[]>);

  // Prepare calendar events
  const calendarEvents = events?.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start_date,
    end: event.end_date,
    slug: event.slug,
    location: event.location,
    description: event.description,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Não perca nada</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">Eventos</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Calendário de eventos e atividades da Escola Secundária José Falcão
        </p>
      </div>

      {events && events.length > 0 ? (
        <div className="space-y-12">
          {/* Dynamic Bento Grid - Next 2 Months */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Próximos Eventos</h2>
            <EventsBentoGrid events={events} />
          </section>

          {/* Interactive Calendar */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Calendário Completo</h2>
            <FullCalendar events={calendarEvents} />
          </section>

          {/* Events List by Month */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Todos os Eventos</h2>
            <div className="space-y-12">
              {Object.entries(groupedEvents || {}).map(([month, monthEvents]) => (
                <section key={month}>
                  <h3 className="text-xl font-semibold mb-6 capitalize text-muted-foreground">{month}</h3>
                  <div className="space-y-4">
                    {monthEvents?.map((event) => (
                      <Link href={`/eventos/${event.slug}`} key={event.id} className="block group">
                        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-6">
                              {/* Date Badge */}
                              <div className="bg-brand-100 dark:bg-brand-900/30 rounded-xl p-4 text-center min-w-[80px] group-hover:bg-brand-200 dark:group-hover:bg-brand-900/50 transition-colors">
                                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                                  {new Date(event.start_date).getDate()}
                                </div>
                                <div className="text-xs text-muted-foreground uppercase">
                                  {new Date(event.start_date).toLocaleDateString('pt-PT', { month: 'short' })}
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                  {event.title}
                                </h4>
                                {event.description && (
                                  <p className="text-muted-foreground line-clamp-2 mb-3" dangerouslySetInnerHTML={{ __html: event.description }} />
                                )}
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(new Date(event.start_date))}
                                    {event.end_date && (
                                      <>
                                        {' '}
                                        até {formatDate(new Date(event.end_date))}
                                      </>
                                    )}
                                  </span>
                                  {event.location && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {event.location}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-20 w-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Sem eventos agendados</h3>
              <p className="text-muted-foreground mb-6">
                Não há eventos futuros neste momento. Volte mais tarde para ver o calendário de atividades da ESJF.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
