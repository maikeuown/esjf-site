import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Trophy, Users, Palette, Music, Dumbbell, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    icon: Globe,
    title: 'Erasmus+',
    description: 'Programa europeu de mobilidade e cooperação para alunos e professores.',
    details: 'Participação em projetos com escolas de vários países europeus, promovendo a interculturalidade e o desenvolvimento de competências globais.',
    color: 'text-blue-600',
  },
  {
    icon: Trophy,
    title: 'Olimpíadas da Oratória',
    description: 'Competição nacional de arte de falar em público.',
    details: 'Os nossos alunos participam anualmente nas Olimpíadas da Oratória, desenvolvendo competências de comunicação e expressão oral.',
    color: 'text-yellow-600',
  },
  {
    icon: Trophy,
    title: 'Jogos Matemáticos',
    description: 'Competições de raciocínio e resolução de problemas matemáticos.',
    details: 'Participação em diversas competições matemáticas a nível nacional, estimulando o gosto pela matemática.',
    color: 'text-green-600',
  },
  {
    icon: Dumbbell,
    title: 'Desporto Escolar',
    description: 'Atividades desportivas extracurriculares e competições.',
    details: 'Diversas modalidades desportivas disponíveis, desde futsal, basquetebol, atletismo e muito mais.',
    color: 'text-red-600',
  },
  {
    icon: Palette,
    title: 'Clube de Arte e Cultura',
    description: 'Expressão artística e cultural através de diversas atividades.',
    details: 'Oficinas de arte, visitas a museus, teatro e outras atividades culturais que enriquecem a formação dos alunos.',
    color: 'text-purple-600',
  },
  {
    icon: Music,
    title: 'Música e Teatro',
    description: 'Grupos musicais e teatrais da escola.',
    details: 'Oportunidades para os alunos explorarem o seu talento musical e teatral através de grupos e apresentações.',
    color: 'text-pink-600',
  },
  {
    icon: Heart,
    title: 'Educação para a Cidadania',
    description: 'Projetos de intervenção cívica e comunitária.',
    details: 'Desenvolvimento de projetos que promovem a cidadania ativa, solidariedade e intervenção na comunidade.',
    color: 'text-indigo-600',
  },
  {
    icon: Users,
    title: 'Associação de Estudantes',
    description: 'Representação dos alunos e organização de atividades.',
    details: 'A Associação de Estudantes representa os alunos e organiza diversas atividades ao longo do ano letivo.',
    color: 'text-orange-600',
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Projetos e Atividades</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Atividades extracurriculares e projetos que enriquecem a experiência educativa dos nossos alunos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <project.icon className={`h-10 w-10 mb-4 ${project.color}`} />
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <p className="text-sm text-muted-foreground">{project.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card className="mt-12 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Participe!</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Todas estas atividades são abertas a todos os alunos. Informe-se na secretaria ou com os 
            seus professores sobre como participar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contactos">
              <Button>
                Contactar Escola
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/eventos">
              <Button variant="outline">
                Ver Eventos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
