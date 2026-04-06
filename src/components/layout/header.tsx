'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { label: 'Início', href: '/' },
  {
    label: 'A Escola',
    href: '/a-escola',
    submenu: [
      { label: 'História', href: '/a-escola/historia' },
      { label: 'Missão e Valores', href: '/a-escola/missao-valores' },
      { label: 'Órgãos de Gestão', href: '/a-escola/orgaos-gestao' },
      { label: 'Instalações', href: '/a-escola/instalacoes' },
    ]
  },
  {
    label: 'Oferta Educativa',
    href: '/oferta-educativa',
    submenu: [
      { label: 'Ensino Básico', href: '/oferta-educativa/ensino-basico' },
      { label: 'Ensino Secundário', href: '/oferta-educativa/ensino-secundario' },
      { label: 'Cursos Profissionais', href: '/oferta-educativa/cursos-profissionais' },
    ]
  },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Documentos', href: '/documentos' },
  { label: 'Contactos', href: '/contactos' },
];

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
          ? 'bg-background/95 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-background/60'
          : 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - More Prominent */}
          <Link href="/" className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
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

          {/* Desktop Navigation with Smooth Dropdowns */}
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
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-md hover:bg-accent/50"
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>
                
                {/* Animated Submenu */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="w-56 rounded-xl border bg-background/95 backdrop-blur shadow-xl p-2 dark:bg-card/95">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block rounded-lg px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors font-medium"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-accent transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            {profile ? (
              <Link href="/admin">
                <Button size="sm" className="hidden md:flex bg-brand-600 hover:bg-brand-700">
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

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={item.href}
          className="flex-1 block px-3 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          onClick={onClose}
        >
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
              {item.submenu.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                  onClick={onClose}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
