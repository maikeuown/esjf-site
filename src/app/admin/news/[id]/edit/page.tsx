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
import { Save, Eye, Pencil, Sparkles } from 'lucide-react';

const categories = [
  { value: 'geral', label: 'Geral' },
  { value: 'academico', label: 'Académico' },
  { value: 'eventos', label: 'Eventos' },
  { value: 'desporto', label: 'Desporto' },
  { value: 'cultura', label: 'Cultura' },
];

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState('draft');
  const [content, setContent] = useState('');
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('news').select('*').eq('id', id).single();
      if (error || !data) { alert('Notícia não encontrada'); router.push('/admin/news'); return; }
      setTitle(data.title || '');
      setExcerpt(data.excerpt || '');
      setFeaturedImageUrl(data.featured_image_url || '');
      setCategoryId(data.category_id || undefined);
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
    const { error } = await supabase.from('news').update({
      title, slug, content, excerpt,
      featured_image_url: featuredImageUrl || null,
      category_id: categoryId || null, status,
    }).eq('id', id);
    if (error) alert('Erro: ' + error.message);
    else router.push('/admin/news');
    setLoading(false);
  };

  if (fetching) return <p className="text-muted-foreground">A carregar...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-3 py-1 mb-2">
            <Sparkles className="h-3 w-3 text-brand-600 dark:text-brand-400" />
            <span className="text-xs font-medium text-brand-600 dark:text-brand-400">Editar Notícia</span>
          </div>
          <h1 className="text-3xl font-bold">Editar Notícia</h1>
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
              {editorTab === 'edit' ? <RichTextEditor content={content} onChange={setContent} minHeight="400px" /> : <ContentPreview content={content} />}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Definições</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Título *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
              <div><Label>Estado</Label>
                <Select value={status} onValueChange={setStatus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Rascunho</SelectItem><SelectItem value="published">Publicado</SelectItem><SelectItem value="scheduled">Agendado</SelectItem></SelectContent></Select>
              </div>
              <div><Label>Categoria</Label>
                <Select value={categoryId || 'none'} onValueChange={(v) => setCategoryId(v === 'none' ? undefined : v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Sem categoria</SelectItem>{categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Resumo</Label><Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} /></div>
              <div><Label>Imagem (URL)</Label><Input value={featuredImageUrl} onChange={(e) => setFeaturedImageUrl(e.target.value)} placeholder="https://..." />
                {featuredImageUrl && <div className="mt-2 rounded-lg overflow-hidden border"><img src={featuredImageUrl} alt="" className="w-full h-32 object-cover" /></div>}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
