'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const avisosData = [
  { id: 1, title: 'Matrículas Abertas 2025/2026', excerpt: 'Período de matrículas aberto até 30 de junho.', priority: 'urgent', date: '2025-04-01', slug: 'matriculas-abertas-2025-2026' },
  { id: 2, title: 'Alteração de Horário - Secretaria', excerpt: 'Novo horário de atendimento a partir de 15 de abril.', priority: 'normal', date: '2025-04-05', slug: 'alteracao-horario-secretaria' },
  { id: 3, title: 'Encerramento Temporário da Biblioteca', excerpt: 'Biblioteca encerrada nos dias 10 e 11 de abril.', priority: 'low', date: '2025-04-03', slug: 'encerramento-biblioteca' },
  { id: 4, title: 'Reunião de Pais e Encarregados', excerpt: 'Reunião geral no dia 15 de abril.', priority: 'normal', date: '2025-04-08', slug: 'reuniao-pais-abril' },
];

const newsData = [
  { id: 1, title: 'ESJF Recebe Olimpíadas da Matemática', excerpt: 'Mais de 120 alunos participaram na fase regional.', category: 'Académico', color: '#1e40af', date: '2025-03-28', slug: 'olimpiadas-matematica' },
  { id: 2, title: 'Inauguração do Novo Laboratório de Ciências', excerpt: 'Espaço moderno com investimento de 150.000€.', category: 'Geral', color: '#059669', date: '2025-04-01', slug: 'novo-laboratorio-ciencias' },
  { id: 3, title: 'Campeões de Futsal - Torneio Inter-Escolas', excerpt: 'Equipa da ESJF vence torneio regional.', category: 'Desporto', color: '#d97706', date: '2025-04-03', slug: 'campeoes-futsal' },
  { id: 4, title: 'Projeto Erasmus+ na Polónia', excerpt: 'Alunos participam em intercâmbio sobre cidades sustentáveis.', category: 'Projetos', color: '#7c3aed', date: '2025-04-05', slug: 'erasmus-polonia' },
];

const eventsData = [
  { id: 1, title: 'Dia Aberto - Conhece a Escola', date: '2025-04-20', location: 'ESJF', slug: 'dia-aberto' },
  { id: 2, title: 'Conferência: IA na Educação', date: '2025-04-27', location: 'Auditório', slug: 'conferencia-ia' },
  { id: 3, title: 'Festival de Primavera', date: '2025-05-10', location: 'Jardim', slug: 'festival-primavera' },
  { id: 4, title: 'Workshop: Técnicas de Estudo', date: '2025-04-15', location: 'Sala 12', slug: 'workshop-estudo' },
];

const priorityConfig: Record<string, { label: string; className: string }> = {
  urgent: { label: 'Urgente', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  normal: { label: 'Normal', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  low: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
};

function ColumnHeader({ title, icon: Icon, href }: { title: string; icon: React.ElementType; href: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center mb-6 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Centered title */}
      <motion.div
        className="flex-1 flex items-center justify-center gap-2"
        animate={isHovered ? { x: -60, justifyContent: 'flex-start' } : { x: 0, justifyContent: 'center' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </motion.div>

      {/* Ver todos button - appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0"
          >
            <Link href={href}>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline cursor-pointer">
                Ver todos <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NovidadesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avisos Column */}
          <div>
            <ColumnHeader title="Avisos" icon={Megaphone} href="/avisos" />
            <div className="space-y-3">
              {avisosData.map((aviso) => {
                const priority = priorityConfig[aviso.priority] || priorityConfig.normal;
                return (
                  <Link key={aviso.id} href={`/avisos/${aviso.slug}`}>
                    <Card className="card-glow-lift-pulse border-border/50 cursor-pointer">
                      <CardContent className="p-4">
                        <Badge className={`${priority.className} mb-2`}>{priority.label}</Badge>
                        <h3 className="font-semibold mb-1 line-clamp-2 text-glow hover:text-brand-600 transition-colors">{aviso.title}</h3>
                        {aviso.excerpt && <p className="text-xs text-muted-foreground mb-1 line-clamp-1 text-glow">{aviso.excerpt}</p>}
                        <p className="text-xs text-muted-foreground">{new Date(aviso.date).toLocaleDateString('pt-PT')}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Notícias Column */}
          <div>
            <ColumnHeader title="Notícias" icon={Newspaper} href="/noticias" />
            <div className="space-y-3">
              {newsData.map((item) => (
                <Link key={item.id} href={`/noticias/${item.slug}`}>
                  <Card className="card-glow-lift-pulse border-border/50 cursor-pointer">
                    <CardContent className="p-4">
                      <Badge className="mb-2 text-white" style={{ backgroundColor: item.color }}>{item.category}</Badge>
                      <h3 className="font-semibold mb-1 line-clamp-2 text-glow hover:text-brand-600 transition-colors">{item.title}</h3>
                      {item.excerpt && <p className="text-xs text-muted-foreground mb-1 line-clamp-1 text-glow">{item.excerpt}</p>}
                      <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('pt-PT')}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Eventos Column */}
          <div>
            <ColumnHeader title="Eventos" icon={Calendar} href="/eventos" />
            <div className="space-y-3">
              {eventsData.map((event) => (
                <Link key={event.id} href={`/eventos/${event.slug}`}>
                  <Card className="card-glow-lift-pulse border-border/50 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-brand-100 dark:bg-brand-900/30 rounded-lg p-2 text-center min-w-[50px]">
                          <div className="text-lg font-bold text-brand-600 dark:text-brand-400">{new Date(event.date).getDate()}</div>
                          <div className="text-[10px] text-muted-foreground uppercase">{new Date(event.date).toLocaleDateString('pt-PT', { month: 'short' })}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 line-clamp-2 text-glow hover:text-brand-600 transition-colors">{event.title}</h3>
                          {event.location && <p className="text-xs text-muted-foreground">{event.location}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
