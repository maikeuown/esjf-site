'use client';

import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const fetchDocs = async () => {
    setLoading(true);
    const supabase = createBrowserClient();
    let query = supabase.from('documents').select('*').eq('is_published', true).order('created_at', { ascending: false });
    if (activeCategory) query = query.eq('category', activeCategory);
    if (search) query = query.ilike('title', `%${search}%`);
    const { data } = await query;
    setDocuments(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchDocs(); }, [activeCategory]);

  const handleSearch = (val: string) => {
    setSearch(val);
    const supabase = createBrowserClient();
    let query = supabase.from('documents').select('*').eq('is_published', true).order('created_at', { ascending: false });
    if (activeCategory) query = query.eq('category', activeCategory);
    if (val) query = query.ilike('title', `%${val}%`);
    query.then(({ data }) => setDocuments(data || []));
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
          Regulamentos, circulares, ementas e outros documentos importantes
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 p-6 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm shadow-sm max-w-2xl mx-auto">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Pesquisar documentos..." value={search} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setActiveCategory(''); setTimeout(() => handleSearch(search), 0); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!activeCategory ? 'bg-brand-600 text-white' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'}`}>
            Todos
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button key={key} onClick={() => { setActiveCategory(key); handleSearch(search); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === key ? 'bg-brand-600 text-white' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'}`}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">{documents.length} documento{documents.length !== 1 ? 's' : ''} encontrado{documents.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Documents Grid - Block View */}
      {loading ? <p className="text-center text-muted-foreground">A carregar...</p> : documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => {
            const fileSize = doc.file_size ? formatFileSize(doc.file_size) : 'N/A';
            return (
              <Card key={doc.id} className="card-glow-lift-pulse border-border/50 cursor-pointer overflow-hidden">
                <CardContent className="p-6">
                  <div className="icon-glow icon-glow-brand h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4 transition-all duration-400">
                    <FileText className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-glow hover:text-brand-600 transition-colors line-clamp-2">{doc.title}</h3>
                  {doc.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-glow">{doc.description}</p>}
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                    <Badge variant="secondary">{categoryLabels[doc.category] || 'Outro'}</Badge>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(new Date(doc.created_at))}</span>
                    <span className="flex items-center gap-1"><File className="h-3 w-3" />{fileSize}</span>
                  </div>
                  <div className="flex gap-2">
                    {doc.file_url && (
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-1 text-foreground"><Eye className="h-3 w-3" /> Ver</Button>
                      </a>
                    )}
                    <a href={doc.file_url} download={doc.file_name} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="gap-1 bg-brand-600 hover:bg-brand-700 text-white"><Download className="h-3 w-3" /> Descarregar</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">{search || activeCategory ? 'Nenhum documento encontrado' : 'Ainda não há documentos'}</h3>
            <p className="text-muted-foreground mb-6">
              {search || activeCategory ? `Não encontrámos documentos${search ? ` para "${search}"` : ''}${search && activeCategory ? ' nesta categoria' : ''}.` : 'Os documentos importantes aparecerão aqui.'}
            </p>
            {(search || activeCategory) && <Button variant="outline" onClick={() => { setSearch(''); setActiveCategory(''); fetchDocs(); }}>Limpar filtros</Button>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (!bytes) return 'N/A';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
