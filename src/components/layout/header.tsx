'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, ChevronDown, Home, BookOpen, GraduationCap, Newspaper, Calendar, Trophy, Wrench, FileText, Phone, Clock, Users, Palette, Globe, Heart, Dumbbell, Music, Megaphone, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  {
    label: 'Início',
    href: '/',
    icon: Home
  },
  {
    label: 'Escola',
    href: '/a-escola',
    icon: GraduationCap,
    description: 'Conheça a nossa história e valores',
    submenu: [
      { label: 'História', href: '/a-escola/historia', icon: Clock, description: 'Desde 1936' },
      { label: 'Missão e Valores', href: '/a-escola/missao-valores', icon: Heart, description: 'O que nos move' },
      { label: 'Órgãos de Gestão', href: '/a-escola/orgaos-gestao', icon: Users, description: 'A nossa equipa' },
      { label: 'Instalações', href: '/a-escola/instalacoes', icon: Wrench, description: 'O nosso espaço' },
    ]
  },
  {
    label: 'Oferta Educativa',
    href: '/oferta-educativa',
    icon: BookOpen,
    description: 'Ensino Básico, Secundário e Profissional',
    submenu: [
      { label: 'Ensino Básico', href: '/oferta-educativa/ensino-basico', icon: BookOpen, description: '5º ao 9º ano' },
      { label: 'Ensino Secundário', href: '/oferta-educativa/ensino-secundario', icon: GraduationCap, description: '10º ao 12º ano' },
      { label: 'Cursos Profissionais', href: '/oferta-educativa/cursos-profissionais', icon: Wrench, description: 'Formação técnica' },
    ]
  },
  {
    label: 'Novidades',
    href: '/novidades',
    icon: Bell,
    description: 'Notícias, Eventos e Avisos',
    submenu: [
      { label: 'Notícias', href: '/noticias', icon: Newspaper, description: 'Últimas novidades' },
      { label: 'Eventos', href: '/eventos', icon: Calendar, description: 'Calendário escolar' },
      { label: 'Avisos', href: '/avisos', icon: Megaphone, description: 'Comunicados importantes' },
    ]
  },
  {
    label: 'Projetos',
    href: '/projetos',
    icon: Trophy,
    description: 'Atividades e projetos'
  },
  {
    label: 'Serviços',
    href: '/servicos',
    icon: Wrench,
    description: 'Secretaria, Biblioteca, SPO'
  },
  {
    label: 'Documentos',
    href: '/documentos',
    icon: FileText,
    description: 'Regulamentos e circulares'
  },
  {
    label: 'Contactos',
    href: '/contactos',
    icon: Phone,
    description: 'Fale connosco'
  },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.25, 
      ease: [0.16, 1, 0.3, 1] as const 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.98,
    transition: { 
      duration: 0.2, 
      ease: [0.32, 0, 0.67, 0] as const 
    }
  }
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(saved === 'true');
      document.documentElement.classList.toggle('dark', saved === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-background/60'
          : 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - More Prominent */}
          <Link href="/" className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-12 w-12 overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm tracking-wider">ESJF</span>
            </motion.div>
            <div className="hidden md:block">
              <h1 className="text-base font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Escola Secundária José Falcão
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Coimbra · Desde 1936 · Monumento de Interesse Público
              </p>
            </div>
          </Link>

          {/* Desktop Navigation with Mega Menu */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-md hover:bg-accent/50"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>
                
                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.label && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    >
                      <div className="w-[520px] rounded-2xl border bg-background/95 dark:bg-card/95 backdrop-blur-xl shadow-2xl p-4 overflow-hidden">
                        {/* Header */}
                        <div className="px-3 pb-3 mb-3 border-b border-border/50">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                              <item.icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{item.label}</h4>
                              {item.description && (
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="grid grid-cols-2 gap-2">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-200"
                            >
                              <div className="h-9 w-9 rounded-lg bg-secondary group-hover/item:bg-brand-100 dark:group-hover/item:bg-brand-900/30 flex items-center justify-center shrink-0 transition-colors">
                                <sub.icon className="h-4 w-4 text-muted-foreground group-hover/item:text-brand-600 dark:group-hover/item:text-brand-400 transition-colors" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground group-hover/item:text-brand-600 dark:group-hover/item:text-brand-400 transition-colors">
                                  {sub.label}
                                </p>
                                {sub.description && (
                                  <p className="text-xs text-muted-foreground mt-0.5">{sub.description}</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-accent transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            {profile ? (
              <Link href="/admin">
                <Button size="sm" className="hidden md:flex bg-brand-600 hover:bg-brand-700 text-white">
                  Painel Admin
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Login
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="xl:hidden border-t overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  onClose={() => setMobileMenuOpen(false)}
                />
              ))}
              <div className="pt-4 flex gap-2 border-t">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                {profile && (
                  <Link href="/admin" className="flex-1">
                    <Button className="w-full bg-brand-600 hover:bg-brand-700">Admin</Button>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Mobile Nav Item Component
function MobileNavItem({ item, onClose }: { item: typeof navItems[0]; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={item.href}
          className="flex-1 flex items-center gap-3 px-3 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          onClick={onClose}
        >
          <Icon className="h-5 w-5" />
          {item.label}
        </Link>
        {item.submenu && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-3 rounded-md hover:bg-accent/50 transition-colors"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
      <AnimatePresence>
        {item.submenu && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-6 space-y-1 pb-2">
              {item.submenu.map((sub) => {
                const SubIcon = sub.icon;
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                    onClick={onClose}
                  >
                    <SubIcon className="h-4 w-4" />
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
