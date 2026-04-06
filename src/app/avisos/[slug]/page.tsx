import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, AlertCircle, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface AvisoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AvisoPageProps): Promise<Metadata> {
  const supabase = await createServerClient();
  const { slug } = await params;

  const { data: aviso } = await supabase
    .from('avisos')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!aviso) {
    return { title: 'Aviso não encontrado' };
  }

  return {
    title: aviso.title,
    description: aviso.excerpt || undefined,
  };
}

export async function generateStaticParams() {
  return [];
}

function getPriorityBadge(priority: string) {
  const config: Record<string, { label: string; variant: 'destructive' | 'default' | 'secondary' }> = {
    urgent: { label: 'Urgente', variant: 'destructive' },
    normal: { label: 'Normal', variant: 'default' },
    low: { label: 'Baixa', variant: 'secondary' },
  };
  return config[priority] || config.normal;
}

export default async function AvisoDetailPage({ params }: AvisoPageProps) {
  const supabase = await createServerClient();
  const { slug } = await params;

  const { data: aviso } = await supabase
    .from('avisos')
    .select(`
      *,
      author:profiles(full_name, avatar_url)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!aviso) {
    notFound();
  }

  const priorityConfig = getPriorityBadge(aviso.priority);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Link href="/avisos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Voltar aos avisos
      </Link>

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={priorityConfig.variant}>
              {priorityConfig.label}
            </Badge>
            {aviso.is_pinned && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Fixado
              </Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{aviso.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {aviso.published_at ? formatDate(new Date(aviso.published_at)) : 'Data não disponível'}
            </span>
            {aviso.author && (
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {aviso.author.full_name}
              </span>
            )}
            {aviso.expires_at && (
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Expira em {formatDate(new Date(aviso.expires_at))}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        {aviso.content && (
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: aviso.content }}
          />
        )}

        {/* Footer info */}
        <div className="pt-8 border-t text-sm text-muted-foreground">
          {aviso.expires_at && (
            <p>
              Este aviso expira em {formatDate(new Date(aviso.expires_at))}.
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
