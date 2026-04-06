import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Plus, Download, Trash2, FileText } from 'lucide-react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

const categoryLabels: Record<string, string> = {
  regulamentos: 'Regulamentos',
  circulares: 'Circulares',
  ementas: 'Ementas',
  resultados: 'Resultados',
  informacoes: 'Informações',
  matriculas: 'Matrículas',
  outros: 'Outros',
};

export default async function AdminDocumentsPage() {
  const supabase = await createServerClient();

  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false }) as { data: any[] | null };

  async function deleteDocument(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const supabase = await createServerClient();
    await supabase.from('documents').delete().eq('id', id);
    revalidatePath('/admin/documents');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Documentos</h1>
        <Link href="/admin/documents/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Documento
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {documents && documents.length > 0 ? (
          documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">{doc.title}</h3>
                      <Badge variant={doc.is_published ? 'default' : 'secondary'}>
                        {doc.is_published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                      <Badge variant="secondary">{categoryLabels[doc.category]}</Badge>
                    </div>
                    {doc.description && (
                      <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {doc.file_name} • {doc.file_size ? `${(doc.file_size / 1024 / 1024).toFixed(2)} MB` : '-'} • {formatDate(new Date(doc.created_at))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={doc.file_url} download={doc.file_name} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                    <form action={deleteDocument}>
                      <input type="hidden" name="id" value={doc.id} />
                      <Button variant="ghost" size="icon" type="submit">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Nenhum documento encontrado
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
