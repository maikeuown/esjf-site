import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Download, Search, Eye, Calendar, File, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { DocumentsFilters } from '@/components/documents/documents-filters';

const categoryLabels: Record<string, string> = {
  regulamentos: 'Regulamentos',
  circulares: 'Circulares',
  ementas: 'Ementas',
  resultados: 'Resultados',
  informacoes: 'Informações',
  matriculas: 'Matrículas',
  outros: 'Outros',
};

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ category?: string; search?: string }> }) {
  const supabase = await createServerClient();
  const params = await searchParams;
  const category = params.category || '';
  const search = params.search || '';

  let query = supabase
    .from('documents')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  const { data: documents } = await query as { data: any[] | null };

  const categoryFilters = Object.entries(categoryLabels).map(([key, label]) => ({
    value: key,
    label,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Documentação</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">Documentos</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Regulamentos, circulares, ementas e outros documentos importantes da Escola Secundária José Falcão
        </p>
      </div>

      {/* Glassmorphism Filters */}
      <DocumentsFilters
        categories={categoryFilters}
        activeCategory={category}
        activeSearch={search}
        resultCount={documents?.length || 0}
      />

      {/* Documents List */}
      {documents && documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((doc) => {
            const fileSize = doc.file_size ? formatFileSize(doc.file_size) : 'Tamanho desconhecido';
            
            return (
              <Card key={doc.id} className="hover:shadow-md transition-shadow border-border/50 card-shimmer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                        {doc.title}
                      </h3>
                      {doc.description && (
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{doc.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="gap-1">
                          {categoryLabels[doc.category] || 'Outro'}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(new Date(doc.created_at))}
                        </span>
                        <span className="flex items-center gap-1">
                          <File className="h-4 w-4" />
                          {fileSize}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      {doc.file_url && (
                        <a 
                          href={doc.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            Ver
                          </Button>
                        </a>
                      )}
                      <a 
                        href={doc.file_url} 
                        download={doc.file_name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-brand-600 hover:bg-brand-700 gap-2">
                          <Download className="h-4 w-4" />
                          Descarregar
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Friendly Empty State */
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-20 w-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                {search || category ? 'Nenhum documento encontrado' : 'Ainda não há documentos'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {search 
                  ? `Não encontrámos documentos para "${search}".`
                  : category 
                    ? `Não há documentos na categoria "${categoryLabels[category] || category}".`
                    : 'Os documentos importantes da escola aparecerão aqui. Volte brevemente!'
                }
              </p>
              {(search || category) && (
                <Link href="/documentos">
                  <Button variant="outline">
                    Limpar filtros
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
