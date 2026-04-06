'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Trophy, Users, Palette, Music, Dumbbell, ArrowRight, Heart, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    icon: Globe,
    title: 'Erasmus+',
    description: 'Programa europeu de mobilidade e cooperação para alunos e professores.',
    details: 'Participação em projetos com escolas de vários países europeus, promovendo a interculturalidade e o desenvolvimento de competências globais.',
    gradient: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Trophy,
    title: 'Olimpíadas da Oratória',
    description: 'Competição nacional de arte de falar em público.',
    details: 'Os nossos alunos participam anualmente nas Olimpíadas da Oratória, desenvolvendo competências de comunicação e expressão oral.',
    gradient: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    icon: Trophy,
    title: 'Jogos Matemáticos',
    description: 'Competições de raciocínio e resolução de problemas matemáticos.',
    details: 'Participação em diversas competições matemáticas a nível nacional, estimulando o gosto pela matemática.',
    gradient: 'from-emerald-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Dumbbell,
    title: 'Desporto Escolar',
    description: 'Atividades desportivas extracurriculares e competições.',
    details: 'Diversas modalidades desportivas disponíveis, desde futsal, basquetebol, atletismo e muito mais.',
    gradient: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: Palette,
    title: 'Clube de Arte e Cultura',
    description: 'Expressão artística e cultural através de diversas atividades.',
    details: 'Oficinas de arte, visitas a museus, teatro e outras atividades culturais que enriquecem a formação dos alunos.',
    gradient: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Music,
    title: 'Música e Teatro',
    description: 'Grupos musicais e teatrais da escola.',
    details: 'Oportunidades para os alunos explorarem o seu talento musical e teatral através de grupos e apresentações.',
    gradient: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    icon: Heart,
    title: 'Educação para a Cidadania',
    description: 'Projetos de intervenção cívica e comunitária.',
    details: 'Desenvolvimento de projetos que promovem a cidadania ativa, solidariedade e intervenção na comunidade.',
    gradient: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    icon: Users,
    title: 'Associação de Estudantes',
    description: 'Representação dos alunos e organização de atividades.',
    details: 'A Associação de Estudantes representa os alunos e organiza diversas atividades ao longo do ano letivo.',
    gradient: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-6">
          <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Para além das aulas</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projetos e Atividades</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Atividades extracurriculares e projetos que enriquecem a experiência educativa dos nossos alunos na ESJF
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
              {/* Gradient Top Border */}
              <div className={`h-1 bg-gradient-to-r ${project.gradient}`}></div>
              <CardContent className="p-6">
                {/* Icon */}
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <project.icon className="h-7 w-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.details}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full filter blur-3xl"></div>
          </div>
          
          <CardContent className="p-8 lg:p-12 text-center relative z-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Participe!</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Todas estas atividades são abertas a todos os alunos. Informe-se na secretaria ou com os
              seus professores sobre como participar e tirar o máximo partido da sua experiência na ESJF.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contactos">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 shadow-lg gap-2">
                  Contactar Escola
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/eventos">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10">
                  Ver Eventos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
