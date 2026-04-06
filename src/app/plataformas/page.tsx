'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Monitor, BookOpen, GraduationCap, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const platforms = [
  {
    name: 'Inovar Alunos',
    description: 'Consulta de notas, horários, faltas e informação escolar dos alunos',
    icon: GraduationCap,
    url: 'https://inovaralunos.pt',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    glowColor: 'blue' as const,
  },
  {
    name: 'Inovar Consulta',
    description: 'Plataforma de consulta de horários e informação geral',
    icon: Monitor,
    url: '#',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'emerald' as const,
  },
  {
    name: 'Inovar PAA',
    description: 'Plano Anual de Atividades da escola',
    icon: BookOpen,
    url: '#',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-600 dark:text-purple-400',
    glowColor: 'purple' as const,
  },
  {
    name: 'Inovar Pessoal',
    description: 'Área reservada ao pessoal docente e não docente',
    icon: Monitor,
    url: '#',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    glowColor: 'amber' as const,
  },
  {
    name: 'SIGA',
    description: 'Sistema de Informação e Gestão da Administração Escolar',
    icon: Monitor,
    url: '#',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'brand' as const,
  },
  {
    name: 'Unicard (SIGE)',
    description: 'Sistema integrado de gestão escolar e cartões escolares',
    icon: Monitor,
    url: '#',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-600 dark:text-red-400',
    glowColor: 'red' as const,
  },
  {
    name: 'Moodle',
    description: 'Plataforma de aprendizagem e recursos educativos',
    icon: BookOpen,
    url: '#',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    glowColor: 'amber' as const,
  },
  {
    name: 'Google Workspace',
    description: 'Ferramentas Google para colaboração e produtividade',
    icon: Mail,
    url: 'https://workspace.google.com',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    glowColor: 'blue' as const,
  },
];

export default function PlatformsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <Monitor className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Ferramentas digitais</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Plataformas Digitais</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Aceda a todas as plataformas digitais utilizadas pela nossa escola
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((platform, index) => {
          const PlatformIcon = platform.icon;
          return (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full card-glow-lift-pulse border-border/50 cursor-pointer">
                <CardContent className="p-5">
                  {/* Icon */}
                  <div className={`icon-glow icon-glow-${platform.glowColor} h-12 w-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4 shadow-lg transition-all duration-400`}>
                    <PlatformIcon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-glow">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 text-glow">{platform.description}</p>

                  {/* CTA */}
                  <div className="flex items-center text-brand-600 dark:text-brand-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Aceder
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>

      {/* Help Section */}
      <Card className="mt-12 bg-gradient-to-br from-brand-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 border-brand-200 dark:border-slate-700">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4">Precisa de Ajuda?</h2>
          <p className="text-muted-foreground mb-6">
            Se tem dificuldades em aceder a alguma plataforma ou necessita de credenciais de acesso,
            contacte a secretaria da escola.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contactos">
              <Button className="gap-2 bg-brand-600 hover:bg-brand-700">
                Contactar Secretaria
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/servicos/secretaria">
              <Button variant="outline">
                Informações da Secretaria
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
