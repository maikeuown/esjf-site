import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Construction, Library, Dumbbell, Monitor, Coffee, Accessibility, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const currentFacilities = [
  { icon: Library, name: 'Biblioteca', description: 'Espaço de estudo e pesquisa com acervo diversificado' },
  { icon: Monitor, name: 'Sala de Informática', description: 'Equipada com computadores e acesso à internet' },
  { icon: Dumbbell, name: 'Pavilhão Gimnodesportivo', description: 'Espaço para Educação Física e atividades desportivas' },
  { icon: Coffee, name: 'Bar/Refeitório', description: 'Serviço de refeições eConvívio' },
  { icon: Accessibility, name: 'Acessibilidade', description: 'Adaptações para mobilidade reduzida' },
];

const renovationPlans = [
  'Modernização de todas as salas de aula com equipamento tecnológico',
  'Laboratórios de Ciências e Tecnologias renovados',
  'Biblioteca ampliada e modernizada',
  'Auditório equipado com tecnologia audiovisual',
  'Pavilhão gimnodesportivo renovado',
  'Refeitório com maior capacidade',
  'Espaços de convivência e estudo',
  'Acessibilidade total (elevadores, rampas)',
  'Eficiência energética e sustentabilidade',
  'Espaços exteriores requalificados',
];

export default function FacilitiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Instalações</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Espaços atuais e o futuro da nossa escola após a reabilitação profunda
        </p>

        {/* Current Facilities */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Building2 className="h-7 w-7 text-primary" />
              Instalações Atuais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFacilities.map((facility, index) => (
                <div key={index} className="flex gap-4 p-4 bg-secondary rounded-lg">
                  <facility.icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{facility.name}</h3>
                    <p className="text-sm text-muted-foreground">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Renovation Project */}
        <Card className="mb-8 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Construction className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Projeto de Reabilitação Profunda</h2>
                <p className="text-muted-foreground text-lg mb-4">
                  A Escola Secundária José Falcão está a passar por uma transformação profunda, 
                  com um investimento de <strong className="text-foreground">23,8 milhões de euros</strong>. 
                  Este projeto visa modernizar completamente as instalações, criando um ambiente educativo 
                  do século XXI.
                </p>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6">
              <h3 className="font-bold mb-4">O que vai mudar:</h3>
              <ul className="space-y-2">
                {renovationPlans.map((plan, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                    <span className="text-muted-foreground">{plan}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Image Placeholder */}
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <div className="h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="h-16 w-16 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground">
              Imagem ilustrativa do projeto de reabilitação
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contactos">
            <Button>
              Contactar Escola
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/a-escola">
            <Button variant="outline">
              Voltar à Escola
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
