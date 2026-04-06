'use client';

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Download, Search, Eye, Calendar, File, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const categoryLabels: Record<string, string> = {
  regulamentos: 'Regulamentos',
  circulares: 'Circulares',
  ementas: 'Ementas',
  resultados: 'Resultados',
  informacoes: 'Informações',
  matriculas: 'Matrículas',
  outros: 'Outros',
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [resultCount, setResultCount] = useState(0);

  const handleSearch = async (newCategory: string = category, newSearch: string = search) => {
    setLoading(true);
    const supabase = createBrowserClient();

    let query = supabase
      .from('documents')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (newCategory) {
      query = query.eq('category', newCategory);
    }

    if (newSearch) {
      query = query.ilike('title', `%${newSearch}%`);
    }

    const { data, count } = await query as { data: any[] | null; count: number | null };
    setDocuments(data || []);
    setResultCount(count || 0);
    setLoading(false);
  };

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

      {/* Filters with Instant Search */}
      <div className="mb-8 p-6 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input - Instant Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar documentos..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(category, e.target.value);
              }}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setCategory(''); handleSearch('', search); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !category ? 'bg-brand-600 text-white' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
              }`}
            >
              Todos
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setCategory(key); handleSearch(key, search); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === key ? 'bg-brand-600 text-white' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 text-sm text-muted-foreground">
          {loading ? 'A pesquisar...' : `${resultCount} documento${resultCount !== 1 ? 's' : ''} encontrado${resultCount !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Documents List */}
      {documents && documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((doc) => {
            const fileSize = doc.file_size ? formatFileSize(doc.file_size) : 'Tamanho desconhecido';

            return (
              <Card key={doc.id} className="hover:shadow-md transition-shadow border-border/50 card-glow-lift-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="icon-glow icon-glow-brand h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0 transition-all duration-400">
                      <FileText className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-glow">
                        {doc.title}
                      </h3>
                      {doc.description && (
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 text-glow">{doc.description}</p>
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
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="gap-2 text-foreground">
                            <Eye className="h-4 w-4" />
                            Ver
                          </Button>
                        </a>
                      )}
                      <a href={doc.file_url} download={doc.file_name} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-brand-600 hover:bg-brand-700 gap-2 text-white">
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
                {search || category
                  ? `Não encontrámos documentos${search ? ` para "${search}"` : ''}${search && category ? ' nesta categoria' : ''}.`
                  : 'Os documentos importantes da escola aparecerão aqui. Volte brevemente!'
                }
              </p>
              {(search || category) && (
                <Button variant="outline" onClick={() => { setSearch(''); setCategory(''); handleSearch('', ''); }}>
                  Limpar filtros
                </Button>
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
