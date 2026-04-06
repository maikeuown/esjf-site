import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FlaskConical, Languages, Palette, BookOpen, ArrowRight, Music, Globe } from 'lucide-react';
import Link from 'next/link';

const subjects = [
  { icon: Calculator, name: 'Matemática', description: 'Raciocínio lógico e resolução de problemas' },
  { icon: Languages, name: 'Português', description: 'Literatura, gramática e comunicação' },
  { icon: Globe, name: 'Inglês', description: 'Língua estrangeira e comunicação internacional' },
  { icon: FlaskConical, name: 'Ciências Naturais', description: 'Biologia, Geologia e Ciências da Terra' },
  { icon: BookOpen, name: 'História e Geografia', description: 'Compreensão do mundo e da sociedade' },
  { icon: Music, name: 'Educação Visual e Tecnológica', description: 'Criatividade e expressão artística' },
];

export default function BasicEducationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Ensino Básico - 3º Ciclo</h1>
        <p className="text-xl text-muted-foreground mb-12">
          7º, 8º e 9º anos - Uma base sólida para o sucesso educativo
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Sobre o 3º Ciclo</h2>
            <p className="text-muted-foreground mb-4">
              O 3º ciclo do ensino básico abrange o 7º, 8º e 9º anos de escolaridade e constitui uma fase 
              crucial no percurso educativo dos alunos, consolidando aprendizagens anteriores e preparando 
              para o ensino secundário.
            </p>
            <p className="text-muted-foreground">
              Na Escola Secundária José Falcão, proporcionamos um ambiente educativo estimulante e inclusivo, 
              com projetos pedagógicos adequados a cada aluno.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6">Plano Curricular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {subjects.map((subject, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <subject.icon className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Projetos Educativos</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                <span>Projeto de leitura e literacia</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                <span>Clube de Ciências e Matemática</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                <span>Participação em Olimpíadas académicas</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                <span>Desporto escolar e atividades extracurriculares</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/oferta-educativa/ensino-secundario">
            <Button>
              Ensino Secundário
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contactos">
            <Button variant="outline">
              Contactar Secretaria
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
