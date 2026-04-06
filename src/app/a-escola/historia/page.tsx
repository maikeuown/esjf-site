import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Landmark, Building, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const timeline = [
  {
    year: '1936',
    title: 'Fundação do Liceu D. João III',
    description: 'Um dos primeiros três Liceus criados em Portugal, marcando o início do ensino secundário público em Coimbra.',
    icon: CalendarDays,
  },
  {
    year: '1978',
    title: 'Renomeação para Escola Secundária José Falcão',
    description: 'Em homenagem ao poeta e escritor português José Falcão, a escola adota o seu nome atual.',
    icon: BookOpen,
  },
  {
    year: '2012',
    title: 'Classificação como Monumento de Interesse Público',
    description: 'O edifício é classificado como monumento de interesse público, reconhecendo o seu valor arquitetónico e histórico.',
    icon: Landmark,
  },
  {
    year: '2024',
    title: 'Início do Projeto de Reabilitação Profunda',
    description: 'Arranca o ambicioso projeto de reabilitação orçado em 23,8 milhões de euros para modernizar e renovar completamente as instalações.',
    icon: Building,
  },
];

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">História da Escola</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Quase um século de dedicação à educação e à formação de gerações de alunos em Coimbra
        </p>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex gap-6">
                  <div className="hidden md:flex">
                    <div className="relative z-10 h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <div className="text-sm font-bold text-primary mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Context */}
        <Card className="mt-12 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Contexto Histórico</h2>
            <p className="text-muted-foreground mb-4">
              O Liceu D. João III foi criado em 1936, num período de expansão do ensino secundário em Portugal. 
              Foi um dos primeiros três Liceus do país, juntamente com o Liceu Pedro Nunes (Lisboa) e o 
              Liceu D. Manuel II (Porto).
            </p>
            <p className="text-muted-foreground mb-4">
              Ao longo das décadas, a escola formou gerações de estudantes e contribuiu significativamente 
              para o desenvolvimento intelectual e cultural de Coimbra, uma das cidades universitárias mais 
              antigas do mundo.
            </p>
            <p className="text-muted-foreground">
              A classificação como Monumento de Interesse Público em 2012 reconheceu não apenas o valor 
              arquitetónico do edifício, mas também o seu papel fundamental na história da educação portuguesa.
            </p>
          </CardContent>
        </Card>

        {/* Rehabilitation Project */}
        <Card className="mt-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Projeto de Reabilitação</h2>
            <p className="text-muted-foreground mb-6">
              Atualmente, a Escola Secundária José Falcão encontra-se num ambicioso projeto de reabilitação 
              profunda, orçado em <strong className="text-foreground">23,8 milhões de euros</strong>. Este 
              investimento visa transformar a escola num espaço moderno, acessível e sustentável, mantendo 
              simultaneamente o seu carácter histórico e arquitetónico.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">23.8M€</div>
                <div className="text-sm text-muted-foreground">Investimento Total</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Reabilitação Profunda</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">Moderno</div>
                <div className="text-sm text-muted-foreground">Espaços Renovados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/a-escola/missao-valores">
            <Button>
              Missão e Valores
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/a-escola/instalacoes">
            <Button variant="outline">
              Ver Instalações
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
