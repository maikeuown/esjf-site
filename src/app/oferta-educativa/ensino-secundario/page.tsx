import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, FlaskConical, Calculator, Languages, BookOpen, History, ArrowRight, Atom, Sigma } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    name: 'Ciências e Tecnologias',
    icon: FlaskConical,
    subjects: ['Matemática A', 'Física e Química A', 'Biologia e Geologia'],
    description: 'Para alunos com interesse nas ciências experimentais e tecnologias',
  },
  {
    name: 'Ciências Socioeconómicas',
    icon: Calculator,
    subjects: ['Matemática A', 'Economia C', 'Geografia C'],
    description: 'Para quem se interessa pela economia, finanças e sociedade',
  },
  {
    name: 'Línguas e Humanidades',
    icon: Languages,
    subjects: ['Português', 'História A', 'Literatura Portuguesa'],
    description: 'Para amantes das letras, história e cultura',
  },
];

export default function SecondaryEducationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Ensino Secundário</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Cursos Científico-Humanísticos - Preparação para o ensino superior e para a vida profissional
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Sobre o Ensino Secundário</h2>
            <p className="text-muted-foreground mb-4">
              O ensino secundário abrange o 10º, 11º e 12º anos e prepara os alunos para o acesso ao 
              ensino superior. Os Cursos Científico-Humanísticos oferecem formações diversificadas que 
              permitem a prossecução de estudos de nível superior.
            </p>
            <p className="text-muted-foreground">
              Na ESJF, temos uma tradição de excelência no ensino secundário, com elevadas taxas de 
              aprovação e acesso ao ensino superior.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6">Cursos Científico-Humanísticos</h2>
        <div className="space-y-6 mb-8">
          {courses.map((course, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  <course.icon className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Disciplinas específicas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Acesso ao Ensino Superior</h2>
            <p className="text-muted-foreground mb-4">
              Os nossos alunos têm tido elevadas taxas de aprovação e de acesso ao ensino superior, 
              com muitos a ingressar em universidades de referência como a Universidade de Coimbra, 
              Universidade do Porto, Universidade de Lisboa, entre outras.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Taxa de Aprovação</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">85%</div>
                <div className="text-sm text-muted-foreground">Acesso ao Superior</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">Top</div>
                <div className="text-sm text-muted-foreground">Universidades</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/oferta-educativa/cursos-profissionais">
            <Button>
              Cursos Profissionais
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contactos">
            <Button variant="outline">
              Informações
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
