'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createBrowserClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';
import { Plus, Save } from 'lucide-react';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const supabase = createBrowserClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
    const endDateTime = endDate && endTime ? new Date(`${endDate}T${endTime}`).toISOString() : null;
    const slug = slugify(title);

    const { error } = await supabase.from('events').insert({
      title,
      slug,
      description,
      start_date: startDateTime,
      end_date: endDateTime,
      location,
      external_link: externalLink || null,
      status: 'published',
    } as any);

    if (error) {
      alert('Erro ao guardar o evento: ' + error.message);
    } else {
      alert('Evento guardado com sucesso!');
      router.push('/admin/events');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Novo Evento</h1>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'A guardar...' : 'Guardar'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do evento"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do evento"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Data de Início *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="startTime">Hora de Início *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="endDate">Data de Fim</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endTime">Hora de Fim</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Local do evento"
              />
            </div>

            <div>
              <Label htmlFor="externalLink">Link Externo</Label>
              <Input
                id="externalLink"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
