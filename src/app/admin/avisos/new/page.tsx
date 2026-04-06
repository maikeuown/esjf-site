'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RichTextEditor, ContentPreview } from '@/components/admin/rich-text-editor';
import { createBrowserClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';
import { Save, Eye, Pencil, Pin, Megaphone } from 'lucide-react';

export default function NewAvisoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [priority, setPriority] = useState<'urgent' | 'normal' | 'low'>('normal');
  const [isPinned, setIsPinned] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [content, setContent] = useState('');
  const supabase = createBrowserClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Preencha o título e o conteúdo.');
      return;
    }
    setLoading(true);

    const slug = slugify(title);
    const { error } = await supabase.from('avisos').insert({
      title, slug, content, excerpt,
      priority, is_pinned: isPinned, status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    } as any);

    if (error) {
      alert('Erro ao guardar: ' + error.message);
    } else {
      router.push('/admin/avisos');
    }
    setLoading(false);
  };

  const priorityColors = { urgent: 'text-red-600', normal: 'text-blue-600', low: 'text-gray-600' };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 rounded-full px-3 py-1 mb-2">
            <Megaphone className="h-3 w-3 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Novo Aviso</span>
          </div>
          <h1 className="text-3xl font-bold">Criar Aviso</h1>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-brand-600 hover:bg-brand-700 gap-2">
          <Save className="h-4 w-4" />
          {loading ? 'A guardar...' : 'Guardar'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Conteúdo</CardTitle>
                <Tabs defaultValue="edit" className="w-auto">
                  <TabsList className="grid grid-cols-2 w-[200px]">
                    <TabsTrigger value="edit" className="gap-1"><Pencil className="h-3 w-3" /> Editar</TabsTrigger>
                    <TabsTrigger value="preview" className="gap-1"><Eye className="h-3 w-3" /> Pré-visualizar</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="edit">
                <TabsContent value="edit">
                  <RichTextEditor content={content} onChange={setContent} placeholder="Escreva o conteúdo do aviso..." minHeight="300px" />
                </TabsContent>
                <TabsContent value="preview">
                  <ContentPreview content={content} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Definições</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do aviso" required />
              </div>
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                <input type="checkbox" id="isPinned" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} className="h-4 w-4 rounded" />
                <Label htmlFor="isPinned" className={`flex items-center gap-1 cursor-pointer ${priorityColors[priority]}`}>
                  <Pin className={`h-4 w-4 ${isPinned ? 'fill-current' : ''}`} /> Fixado no topo
                </Label>
              </div>
              <div>
                <Label htmlFor="status">Estado</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Breve resumo" rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
