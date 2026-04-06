import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, Calendar, Pin, ArrowRight, Sparkles, Clock } from 'lucide-react';
import Link from 'next/link';

const priorityConfig = {
  urgent: { label: 'Urgente', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  normal: { label: 'Normal', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  low: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
};

export default async function AvisosPage() {
  const supabase = await createServerClient();

  const { data: avisos } = await supabase
    .from('avisos')
    .select(`
      *,
      author:profiles(full_name)
    `)
    .eq('status', 'published')
    .order('is_pinned', { ascending: false })
    .order('published_at', { ascending: false }) as { data: any[] | null };

  // Filter out expired avisos
  const now = new Date().toISOString();
  const activeAvisos = avisos?.filter(a => !a.expires_at || a.expires_at > now) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <Megaphone className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Comunicados</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">Avisos</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Comunicados e avisos importantes da Escola Secundária José Falcão
        </p>
      </div>

      {/* Avisos List */}
      {activeAvisos.length > 0 ? (
        <div className="space-y-4">
          {activeAvisos.map((aviso) => {
            const priority = priorityConfig[aviso.priority as keyof typeof priorityConfig] || priorityConfig.normal;
            
            return (
              <Card key={aviso.id} className="hover:shadow-lg transition-shadow border-border/50 card-shimmer-static">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                      aviso.is_pinned 
                        ? 'bg-amber-100 dark:bg-amber-900/30' 
                        : 'bg-brand-100 dark:bg-brand-900/30'
                    }`}>
                      {aviso.is_pinned ? (
                        <Pin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <Megaphone className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge className={priority.className}>
                          {priority.label}
                        </Badge>
                        {aviso.is_pinned && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                            <Pin className="h-3 w-3 mr-1" />
                            Fixado
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                        {aviso.title}
                      </h3>
                      {aviso.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {aviso.excerpt}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {aviso.published_at ? formatDate(new Date(aviso.published_at)) : formatDate(new Date(aviso.created_at))}
                        </span>
                        {aviso.expires_at && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Expira: {formatDate(new Date(aviso.expires_at))}
                          </span>
                        )}
                        {aviso.author && (
                          <span>Por: {aviso.author.full_name}</span>
                        )}
                      </div>
                    </div>

                    {/* Link */}
                    <Link href={`/avisos/${aviso.slug}`} className="shrink-0">
                      <Button variant="outline" size="sm" className="gap-2">
                        Ler mais
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-20 w-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
                <Megaphone className="h-10 w-10 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Sem avisos no momento</h3>
              <p className="text-muted-foreground mb-6">
                Não há avisos importantes a serem exibidos. Volte mais tarde para verificar atualizações.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
