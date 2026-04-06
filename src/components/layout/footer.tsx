'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Clock, Globe, ExternalLink, Send, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const footerLinks = {
  'Links Rápidos': [
    { label: 'Início', href: '/' },
    { label: 'A Escola', href: '/a-escola' },
    { label: 'Oferta Educativa', href: '/oferta-educativa' },
    { label: 'Notícias', href: '/noticias' },
    { label: 'Eventos', href: '/eventos' },
  ],
  'Serviços': [
    { label: 'Secretaria', href: '/servicos/secretaria' },
    { label: 'Biblioteca', href: '/servicos/biblioteca' },
    { label: 'Psicologia (SPO)', href: '/servicos/spo' },
    { label: 'Projetos', href: '/projetos' },
    { label: 'Documentos', href: '/documentos' },
  ],
  'Contactos': [
    { label: 'Morada', href: '/contactos', icon: MapPin },
    { label: 'Telefone', href: 'tel:+351239487170', icon: Phone },
    { label: 'Email', href: 'mailto:geral@esjf.pt', icon: Mail },
    { label: 'Horário', href: '/contactos', icon: Clock },
  ],
};

const schoolInfo = {
  name: 'Escola Secundária José Falcão',
  address: 'Av. Dom Afonso Henriques, Apartado 2071, 3001-654 Coimbra',
  phone: '239 487 170',
  email: 'geral@esjf.pt',
  facebook: 'https://www.facebook.com/esjfalcao',
  instagram: 'https://www.instagram.com/esjfalcao',
  horario: 'Segunda a Sexta: 08:30 - 17:30',
};

const linkColumns = Object.entries(footerLinks);

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-300">
      <div className="container mx-auto px-4">
        {/* Main Footer Content - 4 Column Layout */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* Column 1: Logo + Mission */}
            <div className="lg:col-span-1">
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm tracking-wider">ESJF</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">ESJF</h3>
                    <p className="text-xs text-slate-400">Desde 1936</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                  Um dos primeiros Liceus de Portugal, classificado como Monumento de Interesse Público. 
                  Educação para a cidadania, para os valores e para a paz.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Siga-nos</h4>
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={schoolInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={schoolInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {linkColumns[0][0]}
              </h4>
              <ul className="space-y-2.5">
                {linkColumns[0][1].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 transition-all duration-200 overflow-hidden">
                        <span className="text-brand-400">›</span>
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-white mb-4 mt-6 text-sm uppercase tracking-wider">
                {linkColumns[1][0]}
              </h4>
              <ul className="space-y-2.5">
                {linkColumns[1][1].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 transition-all duration-200 overflow-hidden">
                        <span className="text-brand-400">›</span>
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Direct Contacts */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {linkColumns[2][0]}
              </h4>
              <div className="space-y-4">
                <a href="tel:+351239487170" className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                  <div className="h-9 w-9 rounded-lg bg-brand-900/50 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">Telefone</p>
                    <p className="text-xs text-slate-400">{schoolInfo.phone}</p>
                  </div>
                </a>
                <a href="mailto:geral@esjf.pt" className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                  <div className="h-9 w-9 rounded-lg bg-brand-900/50 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">Email</p>
                    <p className="text-xs text-slate-400">{schoolInfo.email}</p>
                  </div>
                </a>
                <a href="/contactos" className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                  <div className="h-9 w-9 rounded-lg bg-brand-900/50 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">Morada</p>
                    <p className="text-xs text-slate-400 line-clamp-2">{schoolInfo.address}</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                  <div className="h-9 w-9 rounded-lg bg-brand-900/50 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Horário</p>
                    <p className="text-xs text-slate-400">{schoolInfo.horario}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Subscreva para receber as últimas notícias e atualizações da Escola Secundária José Falcão.
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="O seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white gap-2"
                >
                  {subscribed ? (
                    <>
                      <Newspaper className="h-4 w-4" />
                      Subscrito!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Subscrever
                    </>
                  )}
                </Button>
              </form>

              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-400 mt-2 text-center"
                >
                  Obrigado pela subscrição!
                </motion.p>
              )}

              {/* Quick Contact CTA */}
              <div className="mt-6 p-4 rounded-xl bg-brand-900/20 border border-brand-800/30">
                <p className="text-xs text-slate-400 mb-2">Precisa de ajuda?</p>
                <Link href="/contactos">
                  <Button variant="outline" size="sm" className="w-full border-brand-700 text-brand-300 hover:bg-brand-900/30 hover:text-brand-200">
                    Contactar Escola
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} {schoolInfo.name}. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <Link href="/privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-white transition-colors">
                Termos de Utilização
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors flex items-center gap-1">
                Mapa do Site <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
