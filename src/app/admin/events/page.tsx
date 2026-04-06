import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Plus, Pencil, Trash2, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export default async function AdminEventsPage() {
  const supabase = await createServerClient();

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: false });

  async function deleteEvent(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createServerClient();
    await supabase.from('events').delete().eq('id', id);
    revalidatePath('/admin/events');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Eventos</h1>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {events && events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge
                        variant={event.status === 'published' ? 'default' : 'secondary'}
                      >
                        {event.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(new Date(event.start_date))}</span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={event.id} />
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
              Nenhum evento encontrado
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
