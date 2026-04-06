import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Briefcase, Calculator, FlaskConical, Palette, Languages, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EducationalOfferingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <BookOpen className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Oferta Educativa</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Do Ensino Básico ao Secundário, dos Cursos Científico-Humanísticos aos Cursos Profissionais, 
          oferecemos percursos educativos diversificados para o sucesso de todos os alunos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/oferta-educativa/ensino-basico" className="group">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Calculator className="h-10 w-10 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Ensino Básico
              </h3>
              <p className="text-muted-foreground mb-4">
                3º Ciclo (7º, 8º e 9º anos) - Currículo diversificado e projetos educativos inovadores
              </p>
              <div className="flex items-center text-primary font-medium">
                Saber mais
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/oferta-educativa/ensino-secundario" className="group">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <GraduationCap className="h-10 w-10 mb-4 text-green-600" />
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Ensino Secundário
              </h3>
              <p className="text-muted-foreground mb-4">
                Cursos Científico-Humanísticos - Ciências, Economia, Ciências Sociais e Humanidades
              </p>
              <div className="flex items-center text-primary font-medium">
                Saber mais
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/oferta-educativa/cursos-profissionais" className="group">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Briefcase className="h-10 w-10 mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Cursos Profissionais
              </h3>
              <p className="text-muted-foreground mb-4">
                Técnico Auxiliar de Saúde e outros cursos com forte componente prática
              </p>
              <div className="flex items-center text-primary font-medium">
                Saber mais
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Additional Info */}
      <Card className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Porquê a Escola Secundária José Falcão?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <FlaskConical className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Ensino de Qualidade</h4>
                <p className="text-muted-foreground text-sm">
                  Corpo docente qualificado e métodos de ensino inovadores
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Palette className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Atividades Extracurriculares</h4>
                <p className="text-muted-foreground text-sm">
                  Desporto, cultura, projetos e competições académicas
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Languages className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Programa Erasmus+</h4>
                <p className="text-muted-foreground text-sm">
                  Oportunidades de mobilidade e cooperação internacional
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <BookOpen className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Apoio Educativo</h4>
                <p className="text-muted-foreground text-sm">
                  Serviços de Psicologia, tutorias e acompanhamento personalizado
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
