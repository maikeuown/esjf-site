import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Award, ArrowRight, MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    name: 'Técnico Auxiliar de Saúde',
    description: 'Formação para apoio técnico em serviços de saúde, hospitais e clínicas.',
    duration: '3 anos',
    level: 'Nível IV - Quadro Nacional de Qualificações',
    stages: 'Estágios em unidades de saúde da região de Coimbra',
    subjects: [
      'Anatomofisiologia',
      'Cuidados de Enfermagem',
      'Psicologia da Saúde',
      'Primeiros Socorros',
      'Higiene e Segurança',
      'Informática Aplicada à Saúde',
    ],
    careerOpportunities: [
      'Hospitais e Centros de Saúde',
      'Clínicas Privadas',
      'Lares e Residências Sénior',
      'Serviços de Apoio Domiciliário',
    ],
  },
];

const benefits = [
  { icon: Award, title: 'Qualificação Reconhecida', desc: 'Certificação de nível IV reconhecida nacionalmente' },
  { icon: Clock, title: 'Formação Prática', desc: 'Mais de 1000 horas de estágio em contexto real' },
  { icon: Users, title: 'Empregabilidade', desc: 'Altas taxas de inserção profissional após conclusão' },
];

export default function ProfessionalCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 rounded-full px-4 py-2 mb-4">
            <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Formação Técnica</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cursos Profissionais</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Formação técnica e profissional de nível IV, preparando os alunos para uma inserção profissional imediata
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {benefits.map((benefit, i) => (
            <Card key={i} className="border-border/50 card-shimmer-static">
              <CardContent className="p-5 text-center">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Details */}
        {courses.map((course, i) => (
          <div key={i} className="mb-8">
            <Card className="border-border/50 card-shimmer-static mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{course.name}</h2>
                    <p className="text-muted-foreground">{course.level}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                    <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Duração</p>
                      <p className="text-sm text-muted-foreground">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Estágios</p>
                      <p className="text-sm text-muted-foreground">{course.stages}</p>
                    </div>
                  </div>
                </div>

                {/* Subjects */}
                <h3 className="font-semibold mb-3">Componente Técnica</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.subjects.map((subj, j) => (
                    <span key={j} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                      {subj}
                    </span>
                  ))}
                </div>

                {/* Career Opportunities */}
                <h3 className="font-semibold mb-3">Oportunidades Profissionais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {course.careerOpportunities.map((opp, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-purple-500 shrink-0" />
                      <span className="text-muted-foreground">{opp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contactos">
            <Button className="gap-2 bg-brand-600 hover:bg-brand-700">
              Candidatar-se
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/oferta-educativa/ensino-secundario">
            <Button variant="outline" className="gap-2">
              Ensino Secundário
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
