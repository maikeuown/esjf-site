'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, Briefcase, Calculator, FlaskConical, Palette, Languages, ArrowRight, Users, Clock, MapPin, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const courseData = {
  basico: {
    icon: Calculator,
    title: 'Ensino Básico',
    subtitle: '3º Ciclo (7º, 8º e 9º anos)',
    description: 'O Ensino Básico na ESJF oferece um currículo diversificado e projetos educativos inovadores, preparando os alunos para o sucesso no Ensino Secundário.',
    color: 'from-blue-500 to-blue-600',
    features: [
      { icon: Users, text: 'Turmas equilibradas e acompanhamento personalizado' },
      { icon: Clock, text: 'Horário curricular completo e diversificado' },
      { icon: MapPin, text: 'Instalações modernas e recursos pedagógicos' },
      { icon: Award, text: 'Proyectos educativos inovadores e interdisciplinares' },
    ],
    disciplines: [
      'Português', 'Matemática', 'Inglês', 'Educação Física',
      'Ciências Naturais', 'História e Geografia', 'Educação Visual',
      'Educação Tecnológica', 'Educação Musical', 'Físico-Química',
      'Cidadania e Desenvolvimento',
    ],
  },
  secundario: {
    icon: GraduationCap,
    title: 'Ensino Secundário',
    subtitle: 'Cursos Científico-Humanísticos (10º, 11º e 12º anos)',
    description: 'O Ensino Secundário da ESJF oferece três cursos científico-humanísticos com forte componente académica, preparando os alunos para o Ensino Superior.',
    color: 'from-emerald-500 to-emerald-600',
    courses: [
      {
        name: 'Ciências e Tecnologias',
        icon: FlaskConical,
        description: 'Para alunos com interesse em Ciências, Engenharia, Medicina e áreas tecnológicas.',
        subjects: ['Matemática A', 'Física e Química A', 'Biologia e Geologia', 'Geometria Descritiva A'],
      },
      {
        name: 'Ciências Socioeconómicas',
        icon: Calculator,
        description: 'Para alunos interessados em Economia, Gestão, Direito e Ciências Sociais.',
        subjects: ['Matemática Aplicada às Ciências Sociais', 'Economia A', 'Geografia A', 'História A'],
      },
      {
        name: 'Ciências Sociais e Humanas',
        icon: Languages,
        description: 'Para alunos com vocação para Letras, Psicologia, Comunicação e Humanidades.',
        subjects: ['Português A', 'História A', 'Geografia A', 'Filosofia', 'Literatura Portuguesa'],
      },
    ],
  },
  profissionais: {
    icon: Briefcase,
    title: 'Cursos Profissionais',
    subtitle: 'Formação técnica e profissional de nível IV',
    description: 'Os Cursos Profissionais da ESJF combinam formação técnica sólida com estágios em contexto real de trabalho, preparando os alunos para uma inserção profissional imediata.',
    color: 'from-purple-500 to-purple-600',
    courses: [
      {
        name: 'Técnico Auxiliar de Saúde',
        icon: Award,
        description: 'Formação para apoio técnico em serviços de saúde, hospitais e clínicas.',
        subjects: ['Anatomofisiologia', 'Cuidados de Enfermagem', 'Psicologia', 'Primeiros Socorros'],
        duration: '3 anos',
        stage: 'Estágios em unidades de saúde',
      },
    ],
  },
};

export default function EducationalOfferingPage() {
  const [activeTab, setActiveTab] = useState('basico');

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <BookOpen className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Formação</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Oferta Educativa</h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Do Ensino Básico ao Secundário, dos Cursos Científico-Humanísticos aos Cursos Profissionais,
          oferecemos percursos educativos diversificados para o sucesso de todos os alunos
        </p>
      </motion.div>

      {/* Interactive Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl bg-secondary/50 p-1.5 rounded-xl">
            <TabsTrigger 
              value="basico" 
              className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-blue-400"
            >
              <Calculator className="h-4 w-4 hidden sm:inline" />
              Ensino Básico
            </TabsTrigger>
            <TabsTrigger 
              value="secundario" 
              className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-emerald-600 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-emerald-400"
            >
              <GraduationCap className="h-4 w-4 hidden sm:inline" />
              Ensino Secundário
            </TabsTrigger>
            <TabsTrigger 
              value="profissionais" 
              className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-600 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-purple-400"
            >
              <Briefcase className="h-4 w-4 hidden sm:inline" />
              Cursos Profissionais
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Ensino Básico */}
        <TabsContent value="basico">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <Card className="border-border/50 card-shimmer-static">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${courseData.basico.color} flex items-center justify-center shadow-lg`}>
                        <Calculator className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{courseData.basico.title}</h2>
                        <p className="text-muted-foreground">{courseData.basico.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {courseData.basico.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {courseData.basico.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                          <feature.icon className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                          <p className="text-sm">{feature.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Disciplines */}
                    <h3 className="font-semibold mb-3">Disciplinas</h3>
                    <div className="flex flex-wrap gap-2">
                      {courseData.basico.disciplines.map((disc, i) => (
                        <span key={i} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          {disc}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <div>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Porquê escolher a ESJF?</h3>
                    <div className="space-y-4 mb-6">
                      {[
                        { icon: Users, text: 'Turmas equilibradas' },
                        { icon: Clock, text: 'Ensino de qualidade' },
                        { icon: MapPin, text: 'Instalações modernas' },
                        { icon: Award, text: 'Resultados excelentes' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                            <item.icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                          </div>
                          <p className="text-sm font-medium">{item.text}</p>
                        </div>
                      ))}
                    </div>
                    <Link href="/contactos">
                      <Button className="w-full bg-brand-600 hover:bg-brand-700 gap-2">
                        Contactar Escola
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Ensino Secundário */}
        <TabsContent value="secundario">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <Card className="border-border/50 card-shimmer-static">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${courseData.secundario.color} flex items-center justify-center shadow-lg`}>
                      <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{courseData.secundario.title}</h2>
                      <p className="text-muted-foreground">{courseData.secundario.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {courseData.secundario.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courseData.secundario.courses.map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-border/50 card-shimmer-static">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                        <course.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Cursos Profissionais */}
        <TabsContent value="profissionais">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <Card className="border-border/50 card-shimmer-static">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${courseData.profissionais.color} flex items-center justify-center shadow-lg`}>
                      <Briefcase className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{courseData.profissionais.title}</h2>
                      <p className="text-muted-foreground">{courseData.profissionais.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {courseData.profissionais.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseData.profissionais.courses.map((course, i) => (
                <Card key={i} className="border-border/50 card-shimmer-static">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <course.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{course.description}</p>

                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Disciplinas Técnicas
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.subjects.map((subj, j) => (
                        <span key={j} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          {subj}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{course.stage}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-brand-50 via-blue-50 to-brand-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-brand-200 dark:border-slate-700">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Porquê a Escola Secundária José Falcão?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: FlaskConical, title: 'Ensino de Qualidade', desc: 'Corpo docente qualificado e métodos de ensino inovadores' },
                { icon: Palette, title: 'Atividades Extracurriculares', desc: 'Desporto, cultura, projetos e competições académicas' },
                { icon: Languages, title: 'Programa Erasmus+', desc: 'Oportunidades de mobilidade e cooperação internacional' },
                { icon: BookOpen, title: 'Apoio Educativo', desc: 'Serviços de Psicologia, tutorias e acompanhamento personalizado' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 bg-background/80 backdrop-blur-sm rounded-xl">
                  <div className="h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
