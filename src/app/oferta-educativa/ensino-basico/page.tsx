import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FlaskConical, Languages, Palette, BookOpen, ArrowRight, Music, Globe, Users, Clock, Award } from 'lucide-react';
import Link from 'next/link';

const subjects = [
  { icon: Calculator, name: 'Matemática', description: 'Raciocínio lógico e resolução de problemas' },
  { icon: Languages, name: 'Português', description: 'Literatura, gramática e comunicação' },
  { icon: Globe, name: 'Inglês', description: 'Língua estrangeira e comunicação internacional' },
  { icon: FlaskConical, name: 'Ciências Naturais', description: 'Biologia, Geologia e Ciências da Terra' },
  { icon: BookOpen, name: 'História e Geografia', description: 'Compreensão do mundo e da sociedade' },
  { icon: Palette, name: 'Educação Visual e Tecnológica', description: 'Criatividade e expressão artística' },
  { icon: Music, name: 'Educação Musical', description: 'Expressão musical e artística' },
];

const features = [
  { icon: Users, title: 'Turmas Equilibradas', desc: 'Acompanhamento personalizado para cada aluno' },
  { icon: Clock, title: 'Currículo Completo', desc: 'Horário diversificado e enriquecido' },
  { icon: Award, title: 'Resultados Excelentes', desc: 'Altas taxas de sucesso e aprovação' },
];

export default function BasicEducationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 mb-4">
            <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">3º Ciclo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ensino Básico</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            7º, 8º e 9º anos - Uma base sólida para o sucesso educativo
          </p>
        </div>

        {/* About Card */}
        <Card className="mb-8 border-border/50 card-shimmer-static">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Sobre o 3º Ciclo</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              O 3º ciclo do ensino básico abrange o 7º, 8º e 9º anos de escolaridade e constitui uma fase
              crucial no percurso educativo dos alunos, consolidando aprendizagens anteriores e preparando
              para o ensino secundário.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Na Escola Secundária José Falcão, proporcionamos um ambiente educativo estimulante e inclusivo,
              com projetos pedagógicos adequados a cada aluno.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {features.map((feature, i) => (
            <Card key={i} className="border-border/50 card-shimmer-static">
              <CardContent className="p-5 text-center">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subjects */}
        <h2 className="text-2xl font-bold mb-6">Plano Curricular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {subjects.map((subject, index) => (
            <Card key={index} className="border-border/50 card-shimmer-static">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <subject.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects */}
        <Card className="mb-8 border-border/50 card-shimmer-static">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Projetos Educativos</h2>
            <ul className="space-y-3">
              {[
                'Projeto de leitura e literacia',
                'Clube de Ciências e Matemática',
                'Participação em Olimpíadas académicas',
                'Desporto escolar e atividades extracurriculares',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/oferta-educativa/ensino-secundario">
            <Button className="gap-2 bg-brand-600 hover:bg-brand-700">
              Ensino Secundário
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contactos">
            <Button variant="outline" className="gap-2">
              Contactar Secretaria
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
