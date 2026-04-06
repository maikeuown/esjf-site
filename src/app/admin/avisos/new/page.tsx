'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createBrowserClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, Save, Pin } from 'lucide-react';

export default function NewAvisoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [priority, setPriority] = useState<'urgent' | 'normal' | 'low'>('normal');
  const [isPinned, setIsPinned] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const supabase = createBrowserClient();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: 'Escreva o conteúdo do aviso...' }),
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

    const { error } = await supabase.from('avisos').insert({
      title,
      slug,
      content,
      excerpt,
      priority,
      is_pinned: isPinned,
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    } as any);

    if (error) {
      console.error('Error saving aviso:', error);
      alert('Erro ao guardar o aviso: ' + error.message);
    } else {
      alert('Aviso guardado com sucesso!');
      router.push('/admin/avisos');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Novo Aviso</h1>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'A guardar...' : 'Guardar'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Conteúdo</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do aviso" required />
              </div>
              <div>
                <Label>Conteúdo *</Label>
                <div className="border rounded-t-lg p-2 flex flex-wrap gap-1 bg-secondary">
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? 'bg-primary text-primary-foreground' : ''}><Bold className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? 'bg-primary text-primary-foreground' : ''}><Italic className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive('underline') ? 'bg-primary text-primary-foreground' : ''}><UnderlineIcon className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={editor?.isActive('heading', { level: 1 }) ? 'bg-primary text-primary-foreground' : ''}><Heading1 className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive('heading', { level: 2 }) ? 'bg-primary text-primary-foreground' : ''}><Heading2 className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().setTextAlign('left').run()}><AlignLeft className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().setTextAlign('center').run()}><AlignCenter className="h-4 w-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => editor?.chain().focus().setTextAlign('right').run()}><AlignRight className="h-4 w-4" /></Button>
                </div>
                <div className="border border-t-0 rounded-b-lg min-h-[300px] p-4">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Definições</CardTitle></CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isPinned" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} className="h-4 w-4 rounded" />
                <Label htmlFor="isPinned" className="flex items-center gap-1 cursor-pointer"><Pin className="h-4 w-4" /> Fixado no topo</Label>
              </div>
              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Breve resumo do aviso" rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
