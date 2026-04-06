import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Eventos</h1>
        <p className="text-muted-foreground text-lg">
          Calendário de eventos e atividades da Escola Secundária José Falcão
        </p>
      </div>

      {events && events.length > 0 && groupedEvents ? (
        <div className="space-y-12">
          {Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <section key={month}>
              <h2 className="text-2xl font-bold mb-6 capitalize">{month}</h2>
              <div className="space-y-4">
                {monthEvents?.map((event) => (
                  <Link href={`/eventos/${event.slug}`} key={event.id} className="block">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <div className="bg-primary/10 rounded-lg p-4 text-center min-w-[80px]">
                            <div className="text-3xl font-bold text-primary">
                              {new Date(event.start_date).getDate()}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase">
                              {new Date(event.start_date).toLocaleDateString('pt-PT', { month: 'short' })}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                              {event.title}
                            </h3>
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
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Sem eventos agendados</h3>
            <p className="text-muted-foreground">
              Não há eventos futuros neste momento. Volte mais tarde.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
