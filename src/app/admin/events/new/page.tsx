'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor, ContentPreview } from '@/components/admin/rich-text-editor';
import { createBrowserClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';
import { Save, Eye, Pencil, Calendar as CalIcon, MapPin } from 'lucide-react';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [content, setContent] = useState('');
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const supabase = createBrowserClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate) {
      alert('Preencha o título e a data de início.');
      return;
    }
    setLoading(true);

    const startDateTime = new Date(`${startDate}T${startTime || '00:00'}`).toISOString();
    const endDateTime = endDate ? new Date(`${endDate}T${endTime || '23:59'}`).toISOString() : null;
    const slug = slugify(title);

    const { error } = await supabase.from('events').insert({
      title, slug, description: content,
      start_date: startDateTime, end_date: endDateTime,
      location, external_link: externalLink || null,
      status: 'published',
    } as any);

    if (error) alert('Erro ao guardar: ' + error.message);
    else router.push('/admin/events');
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-3 py-1 mb-2">
            <CalIcon className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Novo Evento</span>
          </div>
          <h1 className="text-3xl font-bold">Criar Evento</h1>
        </div>
        <Button type="button" onClick={handleSave} disabled={loading} className="bg-brand-600 hover:bg-brand-700 gap-2 text-white">
          <Save className="h-4 w-4" />
          {loading ? 'A guardar...' : 'Guardar'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Descrição do Evento</CardTitle>
                <div className="flex items-center gap-1">
                  <Button type="button" variant={editorTab === 'edit' ? 'default' : 'outline'} size="sm" onClick={() => setEditorTab('edit')} className="gap-1 h-8"><Pencil className="h-3 w-3" /> Editar</Button>
                  <Button type="button" variant={editorTab === 'preview' ? 'default' : 'outline'} size="sm" onClick={() => setEditorTab('preview')} className="gap-1 h-8"><Eye className="h-3 w-3" /> Pré-visualizar</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editorTab === 'edit' ? (
                <RichTextEditor content={content} onChange={setContent} placeholder="Descreva o evento..." minHeight="300px" />
              ) : (
                <ContentPreview content={content} />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Detalhes</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do evento" required />
              </div>
              <div>
                <Label htmlFor="startDate">Data de Início *</Label>
                <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="startTime">Hora de Início</Label>
                <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="endDate">Data de Fim</Label>
                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="endTime">Hora de Fim</Label>
                <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="location" className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Localização</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Local do evento" />
              </div>
              <div>
                <Label htmlFor="externalLink">Link Externo</Label>
                <Input id="externalLink" value={externalLink} onChange={(e) => setExternalLink(e.target.value)} placeholder="https://..." />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
