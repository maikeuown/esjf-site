import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Search } from 'lucide-react';
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

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const supabase = await createServerClient();
  const params = await searchParams;
  const category = params.category || '';

  let query = supabase
    .from('documents')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data: documents } = await query as { data: any[] | null };

  const categories = Object.entries(categoryLabels);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Documentos</h1>
        <p className="text-muted-foreground text-lg">
          Regulamentos, circulares, ementas e outros documentos importantes
        </p>
      </div>

      {/* Category Filter */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            <Link href="/documentos">
              <Badge variant={!category ? 'default' : 'secondary'} className="cursor-pointer">
                Todos
              </Badge>
            </Link>
            {categories.map(([key, label]) => (
              <Link key={key} href={`/documentos?category=${key}`}>
                <Badge variant={category === key ? 'default' : 'secondary'} className="cursor-pointer">
                  {label}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      {documents && documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">{doc.title}</h3>
                    </div>
                    {doc.description && (
                      <p className="text-muted-foreground text-sm mb-3">{doc.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{categoryLabels[doc.category]}</Badge>
                      <span>{formatDate(new Date(doc.created_at))}</span>
                      {doc.file_size && (
                        <span>{(doc.file_size / 1024 / 1024).toFixed(2)} MB</span>
                      )}
                    </div>
                  </div>
                  <a href={doc.file_url} download={doc.file_name} target="_blank" rel="noopener noreferrer">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Nenhum documento disponível</h3>
            <p className="text-muted-foreground">
              {category ? 'Não há documentos nesta categoria' : 'Aguarde os próximos documentos'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
