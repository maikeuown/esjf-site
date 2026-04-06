import { BookOpen, History, Target, Users, Building2, ArrowRight, Landmark, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const sections = [
  {
    title: 'História',
    description: 'Desde a fundação como Liceu D. João III em 1936 até aos dias de hoje',
    icon: History,
    href: '/a-escola/historia',
    color: 'text-blue-600',
  },
  {
    title: 'Missão e Valores',
    description: 'Educação para a cidadania, para os valores e para a paz',
    icon: Target,
    href: '/a-escola/missao-valores',
    color: 'text-green-600',
  },
  {
    title: 'Órgãos de Gestão',
    description: 'Conheça a equipa diretiva da nossa escola',
    icon: Users,
    href: '/a-escola/orgaos-gestao',
    color: 'text-purple-600',
  },
  {
    title: 'Instalações',
    description: 'Espaços modernos em processo de reabilitação profunda',
    icon: Building2,
    href: '/a-escola/instalacoes',
    color: 'text-orange-600',
  },
];

export default function AboutSchoolPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <Landmark className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">A Escola</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A Escola Secundária José Falcão é um dos primeiros três Liceus criados em Portugal, 
          inaugurado em 1936. Classificada como monumento de interesse público, representa 
          quase um século de dedicação à educação em Coimbra.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">1936</div>
            <div className="text-sm text-muted-foreground">Ano de Fundação</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">88+</div>
            <div className="text-sm text-muted-foreground">Anos de História</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">23.8M€</div>
            <div className="text-sm text-muted-foreground">Investimento em Reabilitação</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-sm font-semibold mb-1">Monumento de</div>
            <div className="text-sm text-muted-foreground">Interesse Público</div>
          </CardContent>
        </Card>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {sections.map((section) => (
          <Link href={section.href} key={section.href} className="group">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <section.icon className={`h-10 w-10 mb-4 ${section.color}`} />
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                <div className="flex items-center text-primary font-medium">
                  Saber mais
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
        <CardContent className="p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Conheça a Nossa Oferta Educativa</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Do Ensino Básico ao Secundário, dos Cursos Científico-Humanísticos aos Cursos Profissionais, 
            oferecemos um ensino de qualidade para o futuro dos nossos alunos.
          </p>
          <Link href="/oferta-educativa">
            <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90">
              Ver Oferta Educativa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
