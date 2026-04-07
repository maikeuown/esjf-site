'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor, ContentPreview } from '@/components/admin/rich-text-editor';
import { createBrowserClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';
import { Save, Eye, Pencil, Megaphone, Pin } from 'lucide-react';

export default function EditAvisoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [priority, setPriority] = useState('normal');
  const [isPinned, setIsPinned] = useState(false);
  const [status, setStatus] = useState('draft');
  const [content, setContent] = useState('');
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('avisos').select('*').eq('id', id).single();
      if (error || !data) { alert('Aviso não encontrado'); router.push('/admin/avisos'); return; }
      setTitle(data.title || '');
      setExcerpt(data.excerpt || '');
      setPriority(data.priority || 'normal');
      setIsPinned(data.is_pinned || false);
      setStatus(data.status || 'draft');
      setContent(data.content || '');
      setFetching(false);
    };
    fetch();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) { alert('Preencha o título e o conteúdo.'); return; }
    setLoading(true);
    const slug = slugify(title);
    const { error } = await supabase.from('avisos').update({
      title, slug, content, excerpt, priority, is_pinned: isPinned, status,
    }).eq('id', id);
    if (error) alert('Erro: ' + error.message);
    else router.push('/admin/avisos');
    setLoading(false);
  };

  if (fetching) return <p className="text-muted-foreground">A carregar...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 rounded-full px-3 py-1 mb-2">
            <Megaphone className="h-3 w-3 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Editar Aviso</span>
          </div>
          <h1 className="text-3xl font-bold">Editar Aviso</h1>
        </div>
        <Button type="button" onClick={handleSave} disabled={loading} className="bg-brand-600 hover:bg-brand-700 gap-2 text-white">
          <Save className="h-4 w-4" /> {loading ? 'A guardar...' : 'Guardar'}
        </Button>
      </div>
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Conteúdo</CardTitle>
                <div className="flex items-center gap-1">
                  <Button type="button" variant={editorTab === 'edit' ? 'default' : 'outline'} size="sm" onClick={() => setEditorTab('edit')} className="gap-1 h-8"><Pencil className="h-3 w-3" /> Editar</Button>
                  <Button type="button" variant={editorTab === 'preview' ? 'default' : 'outline'} size="sm" onClick={() => setEditorTab('preview')} className="gap-1 h-8"><Eye className="h-3 w-3" /> Pré-visualizar</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editorTab === 'edit' ? <RichTextEditor content={content} onChange={setContent} minHeight="300px" /> : <ContentPreview content={content} />}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Definições</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Título *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
              <div><Label>Estado</Label>
                <Select value={status} onValueChange={setStatus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Rascunho</SelectItem><SelectItem value="published">Publicado</SelectItem></SelectContent></Select>
              </div>
              <div><Label>Prioridade</Label>
                <Select value={priority} onValueChange={setPriority}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Baixa</SelectItem><SelectItem value="normal">Normal</SelectItem><SelectItem value="urgent">Urgente</SelectItem></SelectContent></Select>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                <input type="checkbox" id="isPinned" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} className="h-4 w-4 rounded" />
                <Label htmlFor="isPinned" className="flex items-center gap-1 cursor-pointer"><Pin className={`h-4 w-4 ${isPinned ? 'fill-current' : ''}`} /> Fixado no topo</Label>
              </div>
              <div><Label>Resumo</Label><Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} /></div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
