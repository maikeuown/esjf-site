import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { MessageSquare, Eye, Trash2, Mail } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function AdminMessagesPage() {
  const supabase = await createServerClient();

  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  async function markAsRead(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createServerClient();
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    revalidatePath('/admin/messages');
  }

  async function deleteMessage(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createServerClient();
    await supabase.from('contact_messages').delete().eq('id', id);
    revalidatePath('/admin/messages');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mensagens Recebidas</h1>
      </div>

      <div className="space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <Card key={msg.id} className={!msg.is_read ? 'border-primary' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {!msg.is_read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                      <h3 className="text-lg font-semibold">{msg.subject}</h3>
                      {!msg.is_read && (
                        <Badge>Não lida</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {msg.name} ({msg.email})
                      </span>
                      <span>{formatDate(new Date(msg.created_at))}</span>
                      <Badge variant="secondary">{msg.category}</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{msg.message}</p>
                <div className="flex gap-2">
                  <form action={markAsRead}>
                    <input type="hidden" name="id" value={msg.id} />
                    <Button variant="outline" size="sm" type="submit">
                      <Eye className="h-4 w-4 mr-2" />
                      Marcar como lida
                    </Button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={msg.id} />
                    <Button variant="ghost" size="sm" type="submit">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Apagar
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Nenhuma mensagem recebida
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
