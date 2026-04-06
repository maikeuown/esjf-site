import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Calendar, FileText, Users, MessageSquare, Eye } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
  const supabase = await createServerClient();

  // Get counts
  const { count: newsCount } = await supabase
    .from('news')
    .select('*', { count: 'exact', head: true });

  const { count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true });

  const { count: documentsCount } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true });

  const { count: messagesCount } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true });

  const { count: unreadMessages } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);

  const stats = [
    { label: 'Notícias', value: newsCount || 0, icon: Newspaper, href: '/admin/news', color: 'text-blue-600' },
    { label: 'Eventos', value: eventsCount || 0, icon: Calendar, href: '/admin/events', color: 'text-green-600' },
    { label: 'Documentos', value: documentsCount || 0, icon: FileText, href: '/admin/documents', color: 'text-purple-600' },
    { label: 'Mensagens', value: messagesCount || 0, icon: MessageSquare, href: '/admin/messages', color: 'text-orange-600' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/admin/news/new">
            <Button>Nova Notícia</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.label}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                {stat.label === 'Mensagens' && unreadMessages && unreadMessages > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {unreadMessages} não lidas
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/news/new">
              <div className="p-4 bg-secondary rounded-lg text-center hover:bg-accent transition-colors">
                <Newspaper className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Nova Notícia</div>
              </div>
            </Link>
            <Link href="/admin/events/new">
              <div className="p-4 bg-secondary rounded-lg text-center hover:bg-accent transition-colors">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Novo Evento</div>
              </div>
            </Link>
            <Link href="/admin/documents/new">
              <div className="p-4 bg-secondary rounded-lg text-center hover:bg-accent transition-colors">
                <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Novo Documento</div>
              </div>
            </Link>
            <Link href="/admin/media">
              <div className="p-4 bg-secondary rounded-lg text-center hover:bg-accent transition-colors">
                <Eye className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Ver Media</div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimas Notícias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Consulte a gestão de notícias na secção dedicada.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Consulte a gestão de eventos na secção dedicada.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
