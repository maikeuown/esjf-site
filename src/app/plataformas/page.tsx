import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Monitor, BookOpen, GraduationCap, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const platforms = [
  {
    name: 'Inovar Alunos',
    description: 'Consulta de notas, horários, faltas e informação escolar dos alunos',
    icon: GraduationCap,
    url: 'https://inovaralunos.pt',
    color: 'bg-blue-500',
  },
  {
    name: 'Inovar Consulta',
    description: 'Plataforma de consulta de horários e informação geral',
    icon: Monitor,
    url: '#',
    color: 'bg-green-500',
  },
  {
    name: 'Inovar PAA',
    description: 'Plano Anual de Atividades da escola',
    icon: BookOpen,
    url: '#',
    color: 'bg-purple-500',
  },
  {
    name: 'Inovar Pessoal',
    description: 'Área reservada ao pessoal docente e não docente',
    icon: Monitor,
    url: '#',
    color: 'bg-orange-500',
  },
  {
    name: 'SIGA',
    description: 'Sistema de Informação e Gestão da Administração Escolar',
    icon: Monitor,
    url: '#',
    color: 'bg-indigo-500',
  },
  {
    name: 'Unicard (SIGE)',
    description: 'Sistema integrado de gestão escolar e cartões escolares',
    icon: Monitor,
    url: '#',
    color: 'bg-red-500',
  },
  {
    name: 'Moodle',
    description: 'Plataforma de aprendizagem e recursos educativos',
    icon: BookOpen,
    url: '#',
    color: 'bg-yellow-500',
  },
  {
    name: 'Google Workspace',
    description: 'Ferramentas Google para colaboração e produtividade',
    icon: Mail,
    url: 'https://workspace.google.com',
    color: 'bg-blue-600',
  },
];

export default function PlatformsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Monitor className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Plataformas Digitais</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Aceda a todas as plataformas digitais utilizadas pela nossa escola
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((platform, index) => (
          <a
            key={index}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`h-12 w-12 rounded-lg ${platform.color} flex items-center justify-center mb-4`}>
                  <platform.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {platform.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {platform.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Aceder
                  <ExternalLink className="h-3 w-3 ml-1" />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Help Section */}
      <Card className="mt-12 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4">Precisa de Ajuda?</h2>
          <p className="text-muted-foreground mb-6">
            Se tem dificuldades em aceder a alguma plataforma ou necessita de credenciais de acesso, 
            contacte a secretaria da escola.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contactos">
              <Button>
                Contactar Secretaria
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/servicos/secretaria">
              <Button variant="outline">
                Informações da Secretaria
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
