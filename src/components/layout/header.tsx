'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
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
  const { profile } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">ESJF</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-bold text-foreground">Escola Secundária José Falcão</h1>
              <p className="text-xs text-muted-foreground">Coimbra</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 hidden group-hover:block pt-2">
                    <div className="w-56 rounded-md border bg-background shadow-lg p-2">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block rounded-sm px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {profile ? (
              <Link href="/admin">
                <Button size="sm">Admin</Button>
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
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pl-6 space-y-1 mt-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex gap-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
