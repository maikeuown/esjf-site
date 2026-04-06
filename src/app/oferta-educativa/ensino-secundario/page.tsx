import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, FlaskConical, Calculator, Languages, ArrowRight, BookOpen, Award, Clock, Users } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    icon: FlaskConical,
    name: 'Ciências e Tecnologias',
    description: 'Para alunos com interesse em Ciências, Engenharia, Medicina e áreas tecnológicas.',
    subjects: ['Matemática A', 'Física e Química A', 'Biologia e Geologia', 'Geometria Descritiva A'],
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Calculator,
    name: 'Ciências Socioeconómicas',
    description: 'Para alunos interessados em Economia, Gestão, Direito e Ciências Sociais.',
    subjects: ['Matemática Aplicada às Ciências Sociais', 'Economia A', 'Geografia A', 'História A'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Languages,
    name: 'Ciências Sociais e Humanas',
    description: 'Para alunos com vocação para Letras, Psicologia, Comunicação e Humanidades.',
    subjects: ['Português A', 'História A', 'Geografia A', 'Filosofia', 'Literatura Portuguesa'],
    color: 'from-purple-500 to-purple-600',
  },
];

const stats = [
  { icon: Users, value: '300+', label: 'Alunos no Secundário' },
  { icon: Award, value: '95%', label: 'Taxa de Aprovação' },
  { icon: Clock, value: '3', label: 'Anos de Duração' },
];

export default function SecondaryEducationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-4 py-2 mb-4">
            <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">10º, 11º e 12º anos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ensino Secundário</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cursos Científico-Humanísticos para o sucesso no Ensino Superior e na vida profissional
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="border-border/50 card-shimmer-static">
              <CardContent className="p-4 text-center">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Courses */}
        <h2 className="text-2xl font-bold mb-6">Cursos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {courses.map((course, index) => (
            <Card key={index} className="border-border/50 card-shimmer-static">
              <CardContent className="p-6">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <course.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Disciplinas Específicas
                </h4>
                <div className="space-y-2">
                  {course.subjects.map((subj, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                      {subj}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card className="mb-8 border-border/50 card-shimmer-static">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Acesso ao Ensino Superior</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Os cursos científico-humanísticos da ESJF preparam os alunos para o acesso ao Ensino Superior,
              com excelentes resultados nos exames nacionais e nas provas de ingresso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Award, text: 'Preparação sólida para exames nacionais' },
                { icon: Users, text: 'Acompanhamento personalizado dos alunos' },
                { icon: BookOpen, text: 'Aulas de apoio e estudo orientado' },
                { icon: Clock, text: 'Horário curricular completo e equilibrado' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/oferta-educativa/cursos-profissionais">
            <Button className="gap-2 bg-brand-600 hover:bg-brand-700">
              Cursos Profissionais
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contactos">
            <Button variant="outline" className="gap-2">
              Contactar Escola
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
