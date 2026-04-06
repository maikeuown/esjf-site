'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function NewsEditorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [content, setContent] = useState('');
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const supabase = createBrowserClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Preencha o título e o conteúdo.');
      return;
    }
    setLoading(true);

    const slug = slugify(title);
    const { error } = await supabase.from('news').insert({
      title, slug, content, excerpt,
      featured_image_url: featuredImageUrl || null,
      category_id: categoryId || null,
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    } as any);

    if (error) {
      alert('Erro ao guardar: ' + error.message);
    } else {
      router.push('/admin/news');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-3 py-1 mb-2">
            <Sparkles className="h-3 w-3 text-brand-600 dark:text-brand-400" />
            <span className="text-xs font-medium text-brand-600 dark:text-brand-400">Nova Notícia</span>
          </div>
          <h1 className="text-3xl font-bold">Criar Notícia</h1>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-brand-600 hover:bg-brand-700 gap-2">
          <Save className="h-4 w-4" />
          {loading ? 'A guardar...' : 'Guardar'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
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
              {editorTab === 'edit' ? (
                <RichTextEditor content={content} onChange={setContent} placeholder="Escreva o conteúdo da notícia..." minHeight="400px" />
              ) : (
                <ContentPreview content={content} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Definições</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título da notícia" required />
              </div>

              <div>
                <Label htmlFor="status">Estado</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sem categoria</SelectItem>
                    <SelectItem value="1">Geral</SelectItem>
                    <SelectItem value="2">Académico</SelectItem>
                    <SelectItem value="3">Eventos</SelectItem>
                    <SelectItem value="4">Desporto</SelectItem>
                    <SelectItem value="5">Cultura</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Breve resumo" rows={3} />
              </div>

              <div>
                <Label htmlFor="featuredImageUrl">Imagem de Destaque (URL)</Label>
                <Input id="featuredImageUrl" value={featuredImageUrl} onChange={(e) => setFeaturedImageUrl(e.target.value)} placeholder="https://..." />
                {featuredImageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border">
                    <img src={featuredImageUrl} alt="Preview" className="w-full h-32 object-cover" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
