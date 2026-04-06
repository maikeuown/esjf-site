'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Heading1, Heading2, Image as ImageIcon, Link as LinkIcon,
  AlignLeft, AlignCenter, AlignRight, Quote, Undo, Redo,
} from 'lucide-react';

interface RichTextEditorProps {
  content?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  minHeight?: string;
}

export function RichTextEditor({ content = '', placeholder = 'Escreva o conteúdo...', onChange, minHeight = '300px' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2] } }),
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt('URL da imagem:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt('URL do link:');
    if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const ToolbarButton = ({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title?: string }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      title={title}
      className={`h-8 w-8 p-0 ${active ? 'bg-primary text-primary-foreground' : ''}`}
    >
      {children}
    </Button>
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="p-1.5 flex flex-wrap gap-0.5 bg-secondary border-b">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Desfazer"><Undo className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Refazer"><Redo className="h-3.5 w-3.5" /></ToolbarButton>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Negrito"><Bold className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Itálico"><Italic className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Sublinhado"><UnderlineIcon className="h-3.5 w-3.5" /></ToolbarButton>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Título 1"><Heading1 className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Título 2"><Heading2 className="h-3.5 w-3.5" /></ToolbarButton>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista"><List className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista ordenada"><ListOrdered className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Citação"><Quote className="h-3.5 w-3.5" /></ToolbarButton>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton onClick={addImage} title="Inserir imagem"><ImageIcon className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Inserir link"><LinkIcon className="h-3.5 w-3.5" /></ToolbarButton>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Alinhar esquerda"><AlignLeft className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Centrar"><AlignCenter className="h-3.5 w-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Alinhar direita"><AlignRight className="h-3.5 w-3.5" /></ToolbarButton>
      </div>

      {/* Editor */}
      <div className="min-h-[300px] p-4 rendered-content" style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

interface PreviewProps {
  content: string;
}

export function ContentPreview({ content }: PreviewProps) {
  if (!content) {
    return (
      <div className="min-h-[300px] p-4 text-muted-foreground text-sm flex items-center justify-center border rounded-lg bg-secondary/30">
        Pré-visualização aparecerá aqui...
      </div>
    );
  }

  return (
    <div
      className="min-h-[300px] p-6 rendered-content border rounded-lg bg-background"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
