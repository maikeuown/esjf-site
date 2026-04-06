import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Heart, Eye, Users, Globe, Award, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Users,
    title: 'Educação para a Cidadania',
    description: 'Formar cidadãos conscientes, participativos e responsáveis na sociedade democrática.',
  },
  {
    icon: Heart,
    title: 'Educação para os Valores',
    description: 'Promover o respeito, a tolerância, a solidariedade e a ética nas relações interpessoais.',
  },
  {
    icon: Shield,
    title: 'Educação para a Paz',
    description: 'Fomentar a resolução pacífica de conflitos e a cultura de diálogo e compreensão.',
  },
];

export default function MissionValuesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Missão e Valores</h1>
        <p className="text-xl text-muted-foreground mb-12">
          O nosso compromisso com a educação e com o futuro dos nossos alunos
        </p>

        {/* Mission */}
        <Card className="mb-8 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Target className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">A Nossa Missão</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A Escola Secundária José Falcão tem como missão proporcionar uma educação inclusiva, 
                  de qualidade e exigente, que garanta a todos os alunos a aquisição de conhecimentos, 
                  competências e valores necessários ao seu desenvolvimento integral e à sua integração 
                  na sociedade como cidadãos ativos e responsáveis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Eye className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">A Nossa Visão</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ser uma escola de referência no panorama educativo nacional, reconhecida pela excelência 
                  do seu ensino, pela inovação pedagógica e pela formação integral dos seus alunos.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Aspiramos a ser um espaço de aprendizagem estimulante e inclusivo, onde cada aluno 
                  possa desenvolver todo o seu potencial e preparar o seu projeto de vida de forma 
                  informada e autónoma.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Values */}
        <h2 className="text-2xl font-bold mb-6">Os Nossos Valores Fundamentais</h2>
        <div className="space-y-6 mb-12">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Educational Projects */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Projetos Educativos</h2>
            <p className="text-muted-foreground mb-6">
              A nossa escola desenvolve diversos projetos educativos que visam enriquecer a experiência 
              de aprendizagem e promover o desenvolvimento de competências transversais:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Programa Erasmus+</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mobilidade e cooperação internacional para alunos e professores
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Olimpíadas e Competições</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Participação em Olimpíadas da Oratória, Jogos Matemáticos e outras competições
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Educação para a Cidadania</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Projetos de intervenção cívica e comunitária
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Desporto e Cultura</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Atividades extracurriculares desportivas e culturais
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/a-escola/orgaos-gestao">
            <Button>
              Órgãos de Gestão
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/oferta-educativa">
            <Button variant="outline">
              Oferta Educativa
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
