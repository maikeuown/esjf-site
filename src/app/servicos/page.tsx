'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Heart, ArrowRight, Phone, MapPin, Mail, GraduationCap, X, Eye, Target, FileText, Users, Building, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    icon: Clock,
    title: 'Secretaria',
    description: 'Serviço de administração escolar, matrículas, certidões e apoio a alunos.',
    gradient: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    glowColor: 'blue' as const,
    color: 'blue' as const,
    hours: 'Segunda a Sexta: 08:30 - 17:00',
    contact: 'secretaria@esjf.pt',
    phone: '239 487 170 / 171 / 172',
    href: '/servicos/secretaria',
    details: {
      overview: 'A Secretaria é o serviço central de administração da Escola Secundária José Falcão, responsável por todas as questões relacionadas com a vida académica dos alunos.',
      services: [
        'Matrículas e renovações de inscrição',
        'Emissão de certidões e declarações',
        'Consulta de horários e pautas',
        'Emissão de cédulas e documentos escolares',
        'Informações sobre Bolsas de Estudo (ASE)',
        'Processos de transferência e mudança de escola',
        'Apoio a encarregados de educação',
      ],
      requirements: [
        'Documento de identificação do aluno',
        'Cartão de Cidadão do Encarregado de Educação',
        'Comprovativo de morada',
        'Fotocópia do NIF do aluno e do Encarregado',
        '2 Fotografias tipo passe',
      ],
      impact: 'A Secretaria atende diariamente dezenas de alunos e encarregados de educação, garantindo um serviço eficiente e próximo.',
      note: 'Recomendamos o contacto prévio para verificar a documentação necessária e os períodos de matrícula.',
    },
  },
  {
    icon: BookOpen,
    title: 'Biblioteca',
    description: 'Espaço de estudo, pesquisa e leitura com acervo diversificado.',
    gradient: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'emerald' as const,
    color: 'emerald' as const,
    hours: 'Segunda a Sexta: 09:00 - 18:00',
    contact: 'biblioteca@esjf.pt',
    phone: '239 487 173',
    href: '/servicos/biblioteca',
    details: {
      overview: 'A Biblioteca Escolar da ESJF é um espaço moderno e acolhedor, com um acervo diversificado que abrange literatura, ciências, artes e recursos digitais.',
      services: [
        'Empréstimo de livros e recursos multimédia',
        'Espaço de estudo individual e em grupo',
        'Acesso a bases de dados e recursos digitais',
        'Clube de Leitura mensal',
        'Orientação de pesquisas e trabalhos escolares',
        'Horário de estudo acompanhado após as aulas',
      ],
      features: [
        'Mais de 10.000 títulos no acervo',
        'Computadores com acesso à internet',
        'Sala de estudo silenciosa',
        'Espaço de leitura descontraída com revistas e jornais',
        'Projetor para apresentações e workshops',
      ],
      impact: 'A Biblioteca é um dos espaços mais frequentados da escola, promovendo o gosto pela leitura e o sucesso educativo.',
      note: 'O empréstimo de livros é gratuito para todos os alunos e professores da escola.',
    },
  },
  {
    icon: Heart,
    title: 'Serviço de Psicologia (SPO)',
    description: 'Apoio psicológico e orientação escolar e profissional para alunos.',
    gradient: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    textColor: 'text-pink-600 dark:text-pink-400',
    glowColor: 'pink' as const,
    color: 'pink' as const,
    hours: 'Horário sob marcação',
    contact: 'spo@esjf.pt',
    phone: '239 487 174',
    href: '/servicos/spo',
    details: {
      overview: 'O Serviço de Psicologia e Orientação (SPO) da ESJF oferece apoio psicológico e orientação escolar e profissional, contribuindo para o desenvolvimento integral dos alunos.',
      services: [
        'Aconselhamento psicológico individual',
        'Orientação escolar e profissional',
        'Apoio em situações de dificuldade pessoal ou familiar',
        'Mediação de conflitos',
        'Workshops de competências sociais e emocionais',
        'Acompanhamento de alunos com necessidades específicas',
        'Sessões de informação para pais e encarregados de educação',
      ],
      features: [
        'Equipa de psicólogos qualificados',
        'Confidencialidade garantida',
        'Sessões agendadas com flexibilidade',
        'Parceria com entidades externas de apoio',
        'Programa de mentoria entre alunos',
      ],
      impact: 'O SPO é fundamental para o bem-estar emocional e o sucesso escolar dos alunos, ajudando-os a superar desafios e a tomar decisões informadas sobre o seu futuro.',
      note: 'O acesso ao SPO é gratuito e confidencial. Pode marcar diretamente ou através do seu diretor de turma.',
    },
  },
  {
    icon: Users,
    title: 'Apoio ao Aluno',
    description: 'Programas de tutoria, estudo acompanhado e reforço académico.',
    gradient: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    glowColor: 'purple' as const,
    color: 'purple' as const,
    hours: 'Segunda a Sexta: 15:30 - 17:00',
    contact: 'apoioaluno@esjf.pt',
    phone: '239 487 175',
    href: '/servicos/apoio-aluno',
    details: {
      overview: 'O programa de Apoio ao Aluno da ESJF oferece diversas formas de acompanhamento académico para garantir o sucesso de todos os estudantes.',
      services: [
        'Estudo acompanhado com acompanhamento docente',
        'Explicações entre pares (alunos mais velhos ajudam os mais novos)',
        'Programa de tutoria individualizada',
        'Reforço em disciplinas específicas (Português, Matemática, Inglês)',
        'Workshops de técnicas de estudo e gestão do tempo',
        'Preparação para exames nacionais',
      ],
      features: [
        'Sala de estudo equipada e silenciosa',
        'Acesso a materiais de estudo e resumos',
        'Professores disponíveis para dúvidas',
        'Grupos de estudo organizados por disciplina',
        'Horário flexível de atendimento',
      ],
      impact: 'O Apoio ao Aluno tem contribuído significativamente para a melhoria dos resultados académicos e redução do insucesso escolar na ESJF.',
      note: 'A inscrição é gratuita e pode ser feita a qualquer momento junto do seu diretor de turma.',
    },
  },
  {
    icon: Building,
    title: 'Bar e Refeitório',
    description: 'Serviço de alimentação com ementas equilibradas e acessíveis.',
    gradient: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    glowColor: 'amber' as const,
    color: 'amber' as const,
    hours: 'Bar: 08:00 - 18:00 | Refeitório: 12:00 - 14:30',
    contact: 'cantina@esjf.pt',
    phone: '239 487 176',
    href: '/servicos/bar-refeitorio',
    details: {
      overview: 'O Bar e Refeitório da ESJF oferece refeições equilibradas e a preços acessíveis, com ementas elaboradas por nutricionistas.',
      services: [
        'Refeitório com almoço completo (sopa, prato, sobremesa)',
        'Bar com snacks e bebidas saudáveis',
        'Ementas semanais afixadas e disponíveis online',
        'Opções para regimes alimentares especiais',
        'Máquinas de vending com opções saudáveis',
      ],
      features: [
        'Refeições a partir de 2,50€ (geral) e 1,80€ (escalão A)',
        'Ementas elaboradas por nutricionista',
        'Espaço de refeição amplo e arejado',
        'Opções vegetarianas disponíveis',
        'Produtos locais e sazonais privilegiados',
      ],
      impact: 'O serviço de alimentação é essencial para o bem-estar dos alunos, garantindo refeições nutritivas a preços acessíveis para todos.',
      note: 'Os escalões de ASE dão direito a refeições a preço reduzido. Consulte a secretaria para informações.',
    },
  },
  {
    icon: Award,
    title: 'Ação Social Escolar (ASE)',
    description: 'Apoios financeiros para famílias com dificuldades económicas.',
    gradient: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'brand' as const,
    color: 'blue' as const,
    hours: 'Candidaturas: setembro-outubro de cada ano',
    contact: 'ase@esjf.pt',
    phone: '239 487 177',
    href: '/servicos/ase',
    details: {
      overview: 'A Ação Social Escolar (ASE) é um conjunto de apoios financeiros destinados a alunos de famílias com dificuldades económicas, garantindo a igualdade de oportunidades.',
      services: [
        'Escalão A e B para refeições a preço reduzido',
        'Bolsas de estudo para material escolar',
        'Apoio para visitas de estudo e atividades extracurriculares',
        'Fundo de emergência para situações imprevistas',
        'Apoio para transporte escolar',
        'Comparticipação em manuais escolares',
      ],
      features: [
        'Candidatura anual (setembro-outubro)',
        'Avaliação baseada no rendimento do agregado familiar',
        'Renovação automática em alguns casos',
        'Confidencialidade total dos dados',
        'Apoio personalizado do assistente social da escola',
      ],
      impact: 'O ASE garante que nenhum aluno fica para trás por razões económicas, promovendo a inclusão e igualdade de oportunidades.',
      note: 'As candidaturas abrem no início de cada ano letivo. Esteja atento aos avisos na escola ou contacte a secretaria.',
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

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const isExpanded = expandedService !== null;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <GraduationCap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Ao seu dispor</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Serviços</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Serviços disponíveis para apoiar alunos, encarregados de educação e a comunidade escolar da ESJF
        </p>
      </motion.div>

      {/* Services Grid / Expanded View */}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={itemVariants} layout>
                  <Card
                    className="h-full border-border/50 cursor-pointer group card-glow-lift-pulse"
                    onClick={() => setExpandedService(index)}
                  >
                    <CardContent className="p-6">
                      {/* Icon */}
                      <div className={`icon-glow icon-glow-${service.glowColor} h-14 w-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-xl transition-all duration-400`}>
                        <service.icon className="h-7 w-7 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold mb-3 text-glow">{service.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed text-glow">{service.description}</p>

                      {/* Hours */}
                      <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4 p-3 bg-secondary/50 rounded-lg">
                        <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{service.hours}</span>
                      </div>

                      {/* Contact */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span>{service.contact}</span>
                      </div>

                      {/* Click hint */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 font-medium">
                          Saber mais
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                        <Eye className="h-4 w-4 text-muted-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
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
                className="mb-6 gap-2"
                onClick={() => setExpandedService(null)}
              >
                <X className="h-4 w-4" />
                Voltar a todos
              </Button>

              {/* Expanded Card */}
              {(() => {
                const service = services[expandedService!];
                const ServiceIcon = service.icon;
                const details = service.details;

                return (
                  <Card className="border-border/50 card-glow-lift-pulse overflow-hidden">
                    {/* Gradient Top Border */}
                    <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>

                    <CardContent className="p-8">
                      {/* Header */}
                      <div className="flex items-start gap-5 mb-8">
                        <div className={`icon-glow icon-glow-${service.glowColor} h-16 w-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl transition-all duration-400`}>
                          <ServiceIcon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold text-glow">{service.title}</h2>
                          <p className="text-muted-foreground text-lg mt-1 text-glow">{service.description}</p>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                          <Clock className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Horário</p>
                            <p className="text-sm text-muted-foreground">{service.hours}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                          <Mail className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{service.contact}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                          <Phone className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Telefone</p>
                            <p className="text-sm text-muted-foreground">{service.phone}</p>
                          </div>
                        </div>
                        {service.href && (
                          <Link href={service.href} className="flex items-start gap-3 p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors">
                            <FileText className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Página do serviço</p>
                              <p className="text-sm text-brand-600 dark:text-brand-400">Ver detalhes →</p>
                            </div>
                          </Link>
                        )}
                      </div>

                      {/* Overview */}
                      <div className="mb-8 p-6 rounded-xl bg-secondary/50">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                          Visão Geral
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{details.overview}</p>
                      </div>

                      {/* Services */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                          {details.services ? 'Serviços Disponíveis' : 'Atividades'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {details.services && details.services.map((item: string, i: number) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                              <div className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></div>
                              <p className="text-sm text-muted-foreground">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features/Requirements */}
                      {'features' in details && details.features && (
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                            Características
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {details.features.map((feature: string, i: number) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                <p className="text-sm text-muted-foreground">{feature}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {'requirements' in details && details.requirements && (
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                            Documentos Necessários
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {details.requirements.map((doc: string, i: number) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                                <p className="text-sm text-amber-700 dark:text-amber-300">{doc}</p>
                              </div>
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

                      {/* Note */}
                      {'note' in details && details.note && (
                        <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                          <h3 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            Nota Importante
                          </h3>
                          <p className="text-amber-700 dark:text-amber-300">{details.note}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-brand-50 via-blue-50 to-brand-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-brand-200 dark:border-slate-700">
          <CardContent className="p-8 lg:p-12">
            <h2 className="text-2xl font-bold mb-8">Informações de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="tel:+351239487170" className="card flex items-start gap-4 p-5 bg-background/80 backdrop-blur-sm rounded-xl border-border/50 cursor-pointer">
                <div className={`icon-glow icon-glow-blue h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0 transition-all duration-400`}>
                  <Phone className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-glow">Telefone</h4>
                  <p className="text-muted-foreground text-sm text-glow">239 487 170 / 171 / 172</p>
                </div>
              </a>
              <a href="mailto:geral@esjf.pt" className="card flex items-start gap-4 p-5 bg-background/80 backdrop-blur-sm rounded-xl border-border/50 cursor-pointer">
                <div className={`icon-glow icon-glow-emerald h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0 transition-all duration-400`}>
                  <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-glow">Email</h4>
                  <p className="text-muted-foreground text-sm text-glow">geral@esjf.pt</p>
                </div>
              </a>
              <Link href="/contactos" className="card flex items-start gap-4 p-5 bg-background/80 backdrop-blur-sm rounded-xl border-border/50 cursor-pointer">
                <div className={`icon-glow icon-glow-amber h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0 transition-all duration-400`}>
                  <MapPin className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-glow">Morada</h4>
                  <p className="text-muted-foreground text-sm text-glow">Av. Dom Afonso Henriques, Coimbra</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
