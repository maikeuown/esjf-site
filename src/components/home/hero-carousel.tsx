'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, BookOpen, Bell, Trophy, Wrench, FileText, Phone, MapPin, Clock, Users, Heart, Calendar, Megaphone, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CarouselSlide {
  icon: React.ElementType;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  cta: string;
  bgGradient: string;
  features: { icon: React.ElementType; text: string }[];
}

const slides: CarouselSlide[] = [
  {
    icon: GraduationCap,
    label: 'Desde 1936',
    title: 'Escola Secundária José Falcão',
    subtitle: 'Monumento de Interesse Público',
    description: 'Um dos primeiros Liceus de Portugal. Em reabilitação profunda com investimento de 23,8 milhões de euros para as gerações futuras.',
    href: '/a-escola',
    cta: 'Conhecer a Escola',
    bgGradient: 'from-brand-900 via-brand-800 to-brand-700',
    features: [
      { icon: Clock, text: '88+ anos de história' },
      { icon: Users, text: 'Comunidade educativa vibrante' },
      { icon: MapPin, text: 'Coimbra, Portugal' },
    ],
  },
  {
    icon: BookOpen,
    label: 'Formação',
    title: 'Oferta Educativa',
    subtitle: 'Ensino Básico, Secundário e Profissional',
    description: 'Do Ensino Básico ao Secundário, dos Cursos Científico-Humanísticos aos Cursos Profissionais, oferecemos percursos educativos diversificados para o sucesso de todos os alunos.',
    href: '/oferta-educativa',
    cta: 'Explorar Oferta Educativa',
    bgGradient: 'from-emerald-900 via-emerald-800 to-emerald-700',
    features: [
      { icon: BookOpen, text: 'Ensino Básico - 3º Ciclo' },
      { icon: GraduationCap, text: 'Cursos Científico-Humanísticos' },
      { icon: Wrench, text: 'Cursos Profissionais' },
    ],
  },
  {
    icon: Bell,
    label: 'Atualidade',
    title: 'Notícias, Eventos e Avisos',
    subtitle: 'Fique a par de tudo',
    description: 'Descubra as últimas notícias, eventos e avisos importantes da nossa escola. Mantenha-se informado sobre tudo o que acontece na comunidade escolar.',
    href: '/novidades',
    cta: 'Ver Novidades',
    bgGradient: 'from-blue-900 via-blue-800 to-blue-700',
    features: [
      { icon: Newspaper, text: 'Últimas notícias' },
      { icon: Calendar, text: 'Calendário de eventos' },
      { icon: Megaphone, text: 'Avisos importantes' },
    ],
  },
  {
    icon: Trophy,
    label: 'Atividades',
    title: 'Projetos e Atividades',
    subtitle: 'Para além da sala de aula',
    description: 'Desporto escolar, clubes, projetos Erasmus+, atividades culturais e muito mais. Descubra tudo o que os nossos alunos fazem para além das aulas.',
    href: '/projetos',
    cta: 'Explorar Projetos',
    bgGradient: 'from-purple-900 via-purple-800 to-purple-700',
    features: [
      { icon: Heart, text: 'Clubes e atividades' },
      { icon: Trophy, text: 'Competições académicas' },
      { icon: Users, text: 'Projetos colaborativos' },
    ],
  },
  {
    icon: Wrench,
    label: 'Serviços',
    title: 'Serviços e Secretaria',
    subtitle: 'Apoio a alunos e encarregados de educação',
    description: 'Secretaria, Biblioteca Escolar, Serviço de Psicologia e Orientação. Todos os serviços que a escola disponibiliza para a sua conveniência.',
    href: '/servicos',
    cta: 'Ver Serviços',
    bgGradient: 'from-amber-900 via-amber-800 to-amber-700',
    features: [
      { icon: Clock, text: 'Secretaria - Horário de atendimento' },
      { icon: FileText, text: 'Biblioteca e recursos' },
      { icon: Heart, text: 'Apoio psicológico (SPO)' },
    ],
  },
  {
    icon: Phone,
    label: 'Contactos',
    title: 'Fale Connosco',
    subtitle: 'Estamos disponíveis para ajudá-lo',
    description: 'Entre em contacto com a Escola Secundária José Falcão. Encontre morada, telefone, email e envie-nos uma mensagem diretamente pelo nosso site.',
    href: '/contactos',
    cta: 'Contactar Escola',
    bgGradient: 'from-pink-900 via-pink-800 to-pink-700',
    features: [
      { icon: Phone, text: '239 487 170' },
      { icon: MapPin, text: 'Av. Dom Afonso Henriques, Coimbra' },
      { icon: Clock, text: 'Seg-Sex: 08:30 - 17:30' },
    ],
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(1);

  const autoPlayInterval = 6000;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    if (!isPaused && !isHovering) {
      const timer = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isPaused, isHovering]);

  const currentSlide = slides[currentIndex];
  const Icon = currentSlide.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      className={`relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br ${currentSlide.bgGradient} transition-all duration-1000`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            key={`blob-1-${currentIndex}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          />
          <motion.div
            key={`blob-2-${currentIndex}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute top-40 right-20 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <motion.div
            key={`blob-3-${currentIndex}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-white/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: '4s' }}
          />
        </div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <Icon className="h-4 w-4 text-white/90" />
              <span className="text-sm text-white/90 font-medium">{currentSlide.label}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight"
            >
              {currentSlide.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl mb-6 text-white/80 font-light"
            >
              {currentSlide.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base sm:text-lg mb-8 text-white/70 max-w-3xl leading-relaxed"
            >
              {currentSlide.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {currentSlide.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-white/90" />
                  </div>
                  <span className="text-sm text-white/80 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href={currentSlide.href}>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all gap-2"
                >
                  {currentSlide.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contactos">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Contactar
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="h-2 rounded-full transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{
                    width: index === currentIndex ? '40px' : '8px',
                    backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {index === currentIndex && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                      className="absolute inset-0 bg-white/50 origin-left"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <button onClick={prevSlide} className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Previous slide">
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button onClick={nextSlide} className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Next slide">
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-2">
        {slides.map((slide, index) => {
          const SlideIcon = slide.icon;
          const isActive = index === currentIndex;
          return (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative p-3 rounded-xl border backdrop-blur-sm transition-all duration-300 group ${
                isActive ? 'bg-white/20 border-white/40 shadow-lg scale-110' : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SlideIcon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`} />
              <div className={`absolute right-full mr-2 px-3 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg ${isActive ? 'opacity-100' : ''}`} style={{ top: '50%', transform: 'translateY(-50%)' }}>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">{slide.label}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{slide.title}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        </div>
      </motion.div>
    </section>
  );
}
