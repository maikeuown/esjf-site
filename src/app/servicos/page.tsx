'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Heart, ArrowRight, Phone, MapPin, Mail, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    icon: Clock,
    title: 'Secretaria',
    description: 'Serviço de administração escolar, matrículas, certidões e apoio a alunos e encarregados de educação.',
    hours: 'Segunda a Sexta: 08:30 - 17:00',
    contact: 'secretaria@esjf.pt',
    href: '/servicos/secretaria',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: BookOpen,
    title: 'Biblioteca',
    description: 'Espaço de estudo, pesquisa e leitura com acervo diversificado e apoio ao estudo.',
    hours: 'Segunda a Sexta: 09:00 - 18:00',
    contact: 'biblioteca@esjf.pt',
    href: '/servicos/biblioteca',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Heart,
    title: 'Serviço de Psicologia (SPO)',
    description: 'Apoio psicológico e orientação escolar e profissional para alunos e famílias.',
    hours: 'Horário sob marcação',
    contact: 'spo@esjf.pt',
    href: '/servicos/spo',
    gradient: 'from-pink-500 to-pink-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-6">
          <GraduationCap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Ao seu dispor</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Serviços</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Serviços disponíveis para apoiar alunos, encarregados de educação e a comunidade escolar da ESJF
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {services.map((service, index) => (
          <Link href={service.href} key={index} className="group">
            <motion.div variants={itemVariants}>
              <Card className="h-full border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
                {/* Gradient Top Border */}
                <div className={`h-1 bg-gradient-to-r ${service.gradient}`}></div>
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">{service.description}</p>
                  
                  {/* Hours */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4 p-3 bg-secondary/50 rounded-lg">
                    <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{service.hours}</span>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>{service.contact}</span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-brand-600 dark:text-brand-400 font-medium">
                    Saber mais
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Contact Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-brand-50 via-blue-50 to-brand-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-brand-200 dark:border-slate-700">
          <CardContent className="p-8 lg:p-12">
            <h2 className="text-2xl font-bold mb-8">Informações de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="tel:+351239487170" className="flex items-start gap-4 p-5 bg-background/80 backdrop-blur-sm rounded-xl hover:bg-background transition-colors">
                <div className="h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefone</h4>
                  <p className="text-muted-foreground text-sm">239 487 170 / 171 / 172</p>
                </div>
              </a>
              <a href="mailto:geral@esjf.pt" className="flex items-start gap-4 p-5 bg-background/80 backdrop-blur-sm rounded-xl hover:bg-background transition-colors">
                <div className="h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground text-sm">geral@esjf.pt</p>
                </div>
              </a>
              <a href="/contactos" className="flex items-start gap-4 p-5 bg-background/80 backdrop-blur-sm rounded-xl hover:bg-background transition-colors">
                <div className="h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Morada</h4>
                  <p className="text-muted-foreground text-sm">
                    Av. Dom Afonso Henriques<br />
                    3001-654 Coimbra
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
