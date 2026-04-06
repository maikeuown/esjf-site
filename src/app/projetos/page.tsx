'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Trophy, Users, Palette, Music, Dumbbell, ArrowRight, Heart, BookOpen, Sparkles, X, ChevronDown, ChevronUp, GraduationCap, Calendar, Award, Target, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    icon: Globe,
    title: 'Erasmus+',
    description: 'Programa europeu de mobilidade e cooperação para alunos e professores.',
    gradient: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    glowColor: 'blue',
    color: 'blue' as const,
    details: {
      overview: 'A ESJF participa ativamente no programa Erasmus+ desde 2018, com projetos de mobilidade e cooperação estratégica com escolas de vários países europeus.',
      activities: [
        'Mobilidade de alunos para intercâmbios de 1-2 semanas em escolas parceiras',
        'Formação de professores em metodologias inovadoras de ensino',
        'Desenvolvimento de projetos colaborativos sobre sustentabilidade e cidadania europeia',
        'Receção de delegações estrangeiras na nossa escola',
      ],
      countries: ['Portugal', 'Espanha', 'França', 'Polónia', 'Itália', 'Roménia'],
      impact: 'Mais de 50 alunos e 15 professores já participaram em mobilidades Erasmus+. O programa tem tido um impacto transformador na comunidade escolar, promovendo o desenvolvimento de competências linguísticas, interculturais e pessoais.',
      nextOpportunity: 'Candidaturas abertas para mobilidade em março de 2025. Consulte a secretaria para mais informações.',
    },
  },
  {
    icon: Trophy,
    title: 'Olimpíadas da Oratória',
    description: 'Competição nacional de arte de falar em público.',
    gradient: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    glowColor: 'amber',
    color: 'amber' as const,
    details: {
      overview: 'Os nossos alunos participam anualmente nas Olimpíadas da Oratória, desenvolvendo competências de comunicação, argumentação e expressão oral.',
      activities: [
        'Treino semanal de técnicas de oratória e argumentação',
        'Preparação de discursos sobre temas da atualidade',
        'Participação na fase regional e nacional da competição',
        'Workshops com oradores e profissionais de comunicação',
      ],
      achievements: ['Finalista nacional 2023', '3º lugar regional 2024', 'Menção honrosa 2022'],
      impact: 'Desenvolvimento de competências essenciais de comunicação pública, confiança pessoal e capacidade de argumentação que serão úteis ao longo de toda a vida.',
      nextOpportunity: 'As inscrições para a edição 2025 abrem em janeiro. Fale com o seu professor de Português.',
    },
  },
  {
    icon: Trophy,
    title: 'Jogos Matemáticos',
    description: 'Competições de raciocínio e resolução de problemas matemáticos.',
    gradient: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'emerald',
    color: 'emerald' as const,
    details: {
      overview: 'A ESJF participa em diversas competições matemáticas a nível nacional, estimulando o gosto pela matemática e o raciocínio lógico dos nossos alunos.',
      activities: [
        'Treino semanal com problemas de competição',
        'Participação no Campeonato Nacional de Jogos Matemáticos',
        'Olimpíadas da Matemática - fase regional e nacional',
        'Seminários de resolução criativa de problemas',
      ],
      achievements: ['Medalha de prata - ONM 2024', '2º lugar regional 2023', 'Top 20 nacional 2024'],
      impact: 'Os jogos matemáticos desenvolv o pensamento crítico, a criatividade e a perseverança. Os alunos participantes mostram melhoria significativa no desempenho académico global.',
      nextOpportunity: 'Treinos começam em outubro. Inscreve-te com o teu professor de Matemática.',
    },
  },
  {
    icon: Dumbbell,
    title: 'Desporto Escolar',
    description: 'Atividades desportivas extracurriculares e competições.',
    gradient: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-600 dark:text-red-400',
    glowColor: 'red',
    color: 'red' as const,
    details: {
      overview: 'O Desporto Escolar da ESJF oferece um vasto leque de modalidades desportivas, promovendo um estilo de vida saudável e a competição saudável.',
      activities: [
        'Futsal (masculino e feminino)',
        'Basquetebol e Voleibol',
        'Atletismo e Natação',
        'Badminton e Ténis de Mesa',
        'Ginástica e Artes Marciais',
      ],
      achievements: ['Campeões regionais de Futsal 2024', 'Medalha de ouro em Atletismo 2024', 'Top 3 regional de Basquetebol'],
      impact: 'O desporto escolar promove não só a saúde física mas também valores como o trabalho de equipa, disciplina e resiliência. Mais de 120 alunos participam regularmente.',
      nextOpportunity: 'Inscrições abertas no início de cada período. Consulta o coordenador do Desporto Escolar.',
    },
  },
  {
    icon: Palette,
    title: 'Clube de Arte e Cultura',
    description: 'Expressão artística e cultural através de diversas atividades.',
    gradient: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    glowColor: 'purple',
    color: 'purple' as const,
    details: {
      overview: 'O Clube de Arte e Cultura é um espaço de criação e expressão artística, onde os alunos podem explorar diversas formas de arte e cultura.',
      activities: [
        'Oficinas de pintura, escultura e fotografia',
        'Visitas de estudo a museus, galerias e exposições',
        'Projeto de mural artístico para a escola',
        'Participação em concursos de arte nacionais',
        'Exposições regulares na escola',
      ],
      achievements: ['Exposição "Olhares do Futuro" 2024', 'Prémio de criatividade no Concurso Nacional de Arte Jovem'],
      impact: 'O clube fomenta a sensibilidade artística, a criatividade e o pensamento divergente. Os trabalhos dos alunos estão expostos em vários espaços da escola.',
      nextOpportunity: 'Sessões todas as quartas-feiras, 15h30-17h00. Vem participar!',
    },
  },
  {
    icon: Music,
    title: 'Música e Teatro',
    description: 'Grupos musicais e teatrais da escola.',
    gradient: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    textColor: 'text-pink-600 dark:text-pink-400',
    glowColor: 'pink',
    color: 'pink' as const,
    details: {
      overview: 'Os grupos de Música e Teatro da ESJF proporcionam aos alunos a oportunidade de explorar e desenvolver os seus talentos artísticos.',
      activities: [
        'Grupo de música (guitarra, piano, bateria e voz)',
        'Grupo de teatro com encenações semestrais',
        'Festival de Primavera - atuação aberta à comunidade',
        'Workshops com músicos e atores profissionais',
        'Participação em festivais escolares regionais',
      ],
      achievements: ['Festival de Teatro Escolar - Melhor Encenação 2023', 'Atuação no Festival de Música de Coimbra 2024'],
      impact: 'A expressão artística desenvolve a confiança, empatia e criatividade. Os grupos contam com mais de 40 alunos participantes ativos.',
      nextOpportunity: 'Ensaios às terças e quintas, 16h00-17h30. Aberto a todos os níveis!',
    },
  },
  {
    icon: Heart,
    title: 'Educação para a Cidadania',
    description: 'Projetos de intervenção cívica e comunitária.',
    gradient: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'brand',
    color: 'blue' as const,
    details: {
      overview: 'O projeto de Educação para a Cidadania visa formar cidadãos conscientes, participativos e comprometidos com a construção de uma sociedade mais justa.',
      activities: [
        'Projeto Eco-Escolas - sustentabilidade ambiental',
        'Campanhas de solidariedade e recolha de bens',
        'Debates sobre temas da atualidade (igualdade, direitos humanos)',
        'Parceria com instituições locais de apoio social',
        'Comemoração de datas internacionais (Dia da Paz, Dia da Árvore)',
      ],
      achievements: ['Bandeeira Verde Eco-Escolas 2024', 'Campanha "Natal Solidário" - 500+ bens recolhidos'],
      impact: 'Os alunos desenvolvem consciência social, empatia e capacidade de intervenção cívica. O projeto tem impacto real na comunidade local.',
      nextOpportunity: 'Reuniões quinzenais às sextas, 15h30. Junta-te a nós!',
    },
  },
  {
    icon: Users,
    title: 'Associação de Estudantes',
    description: 'Representação dos alunos e organização de atividades.',
    gradient: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400',
    glowColor: 'amber',
    color: 'amber' as const,
    details: {
      overview: 'A Associação de Estudantes é o órgão de representação democrática dos alunos, organizando atividades e defendendo os seus interesses.',
      activities: [
        'Organização de eventos (Festas, Torneios, Festivais)',
        'Representação dos alunos nos órgãos de gestão da escola',
        'Gestão do bar da escola e espaço de convivência',
        'Campanhas de sensibilização e bem-estar estudantil',
        'Eleições anuais para renovação da direção',
      ],
      achievements: ['Festival de Primavera 2024 - 800+ participantes', 'Renovação do espaço de convivência dos alunos'],
      impact: 'A AE é fundamental para a vida escolar, promovendo o espírito de comunidade e dando voz aos alunos. É uma escola de democracia e cidadania.',
      nextOpportunity: 'Eleições em outubro. Candidata-te ou vota! Junta de Freguesia de estudantes.',
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 10 },
};

export default function ProjectsPage() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const isExpanded = expandedProject !== null;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Para além das aulas</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projetos e Atividades</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Atividades extracurriculares e projetos que enriquecem a experiência educativa dos nossos alunos
        </p>
      </motion.div>

      {/* Projects Grid / Expanded View */}
      <div className="mb-16">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Full Grid View */
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {projects.map((project, index) => (
                <motion.div key={index} variants={itemVariants} layout>
                  <Card
                    className="h-full border-border/50 cursor-pointer group card-glow-lift-pulse"
                    onClick={() => setExpandedProject(index)}
                  >
                    <CardContent className="p-5">
                      {/* Icon */}
                      <div className={`icon-glow icon-glow-${project.glowColor} h-12 w-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4 shadow-lg transition-all duration-400`}>
                        <project.icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-semibold mb-2 text-glow">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-glow">{project.description}</p>

                      {/* Click hint */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        <Eye className="h-3 w-3" />
                        <span>Clique para saber mais</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Expanded Detail View */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <Button
                variant="outline"
                className="mb-6 gap-2 card-glow-lift-pulse"
                onClick={() => setExpandedProject(null)}
              >
                <X className="h-4 w-4" />
                Voltar a todos
              </Button>

              {/* Expanded Card */}
              {(() => {
                const project = projects[expandedProject!];
                const ProjectIcon = project.icon;
                const details = project.details;

                return (
                  <Card className="border-border/50 card-glow-lift-pulse overflow-hidden">
                    {/* Gradient Top Border */}
                    <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

                    <CardContent className="p-8">
                      {/* Header */}
                      <div className="flex items-start gap-5 mb-8">
                        <div className={`icon-glow icon-glow-${project.glowColor} h-16 w-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-xl transition-all duration-400`}>
                          <ProjectIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-glow">{project.title}</h2>
                          <p className="text-muted-foreground text-lg mt-1 text-glow">{project.description}</p>
                        </div>
                      </div>

                      {/* Overview */}
                      <div className="mb-8 p-6 rounded-xl bg-secondary/50">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                          Visão Geral
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{details.overview}</p>
                      </div>

                      {/* Activities */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                          Atividades
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {details.activities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                              <div className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></div>
                              <p className="text-sm text-muted-foreground">{activity}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      {'achievements' in details && details.achievements && (
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                            Conquistas
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {details.achievements.map((achievement, i) => (
                              <span key={i} className={`px-4 py-2 ${project.bgColor} ${project.textColor} rounded-full text-sm font-medium`}>
                                🏆 {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Countries (Erasmus) */}
                      {'countries' in details && details.countries && (
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Globe className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                            Países Parceiros
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {details.countries.map((country, i) => (
                              <span key={i} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                🇪🇺 {country}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Impact */}
                      <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-brand-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 border border-brand-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                          Impacto
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{details.impact}</p>
                      </div>

                      {/* Next Opportunity */}
                      <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                        <h3 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          Próxima Oportunidade
                        </h3>
                        <p className="text-amber-700 dark:text-amber-300">{details.nextOpportunity}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white overflow-hidden relative">
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
              seus professores sobre como participar.
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
