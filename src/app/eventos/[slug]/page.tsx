import { createServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const supabase = await createServerClient();
  const { slug } = await params;
  
  const { data: event } = await supabase
    .from('events')
    .select('title, description, image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!event) {
    return { title: 'Evento não encontrado' };
  }

  return {
    title: event.title,
    description: event.description?.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const supabase = await createServerClient();
  const { slug } = await params;
  
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/eventos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Voltar aos eventos
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{event.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <div>
                <div className="font-semibold text-foreground">
                  {formatDate(new Date(event.start_date))}
                </div>
                <div className="text-sm">
                  {new Date(event.start_date).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                  {event.end_date && (
                    <>
                      {' '}
                      até {new Date(event.end_date).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                    </>
                  )}
                </div>
              </div>
            </span>
            
            {event.location && (
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {event.location}
              </span>
            )}
          </div>
        </header>

        {event.description && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </CardContent>
          </Card>
        )}

        {event.external_link && (
          <div className="flex gap-4">
            <a href={event.external_link} target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Mais informações
              </Button>
            </a>
          </div>
        )}
      </article>
    </div>
  );
}
