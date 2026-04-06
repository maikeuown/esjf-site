import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Plus } from 'lucide-react';

export default function AdminMediaPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestão de Media</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Upload de Imagem
        </Button>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Galeria de Media</h3>
          <p className="text-muted-foreground mb-6">
            Esta funcionalidade permite carregar e gerir imagens e ficheiros de media.
            <br />
            Para ativar o upload, configure os buckets de armazenamento no Supabase.
          </p>
          <div className="text-sm text-muted-foreground">
            <p>Buckets necessários:</p>
            <ul className="list-disc list-inside mt-2">
              <li>news-images</li>
              <li>event-images</li>
              <li>documents</li>
              <li>media</li>
              <li>highlights</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
