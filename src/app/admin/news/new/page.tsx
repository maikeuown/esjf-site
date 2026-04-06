'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createBrowserClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Image as ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
} from 'lucide-react';

interface NewsFormPageProps {
  params: Promise<{ id?: string }>;
}

export default function NewsEditorPage({ params }: NewsFormPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const supabase = createBrowserClient();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Escreva o conteúdo da notícia...' }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    setLoading(true);

    const content = editor.getHTML();
    const slug = slugify(title);

    const { error } = await supabase.from('news').insert({
      title,
      slug,
      content,
      excerpt,
      featured_image_url: featuredImageUrl || null,
      category_id: categoryId || null,
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    });

    if (error) {
      console.error('Error saving news:', error);
      alert('Erro ao guardar a notícia: ' + error.message);
    } else {
      alert('Notícia guardada com sucesso!');
      router.push('/admin/news');
    }
    setLoading(false);
  };

  const addImage = () => {
    const url = prompt('URL da imagem:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = prompt('URL do link:');
    if (url && editor) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Nova Notícia</h1>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'A guardar...' : 'Guardar'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título da notícia"
                  required
                />
              </div>

              <div>
                <Label>Conteúdo *</Label>
                {/* Toolbar */}
                <div className="border rounded-t-lg p-2 flex flex-wrap gap-1 bg-secondary">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={editor?.isActive('bold') ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={editor?.isActive('italic') ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    className={editor?.isActive('underline') ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <UnderlineIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor?.isActive('heading', { level: 1 }) ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor?.isActive('heading', { level: 2 }) ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={addImage}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={addLink}>
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
                {/* Editor */}
                <div className="border border-t-0 rounded-b-lg min-h-[400px] p-4">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Definições</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Estado</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione categoria" />
                  </SelectTrigger>
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
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Breve resumo da notícia"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="featuredImageUrl">URL da Imagem de Destaque</Label>
                <Input
                  id="featuredImageUrl"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
