'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Printer, Clock, Globe, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  'A Escola': [
    { label: 'História', href: '/a-escola/historia' },
    { label: 'Missão e Valores', href: '/a-escola/missao-valores' },
    { label: 'Órgãos de Gestão', href: '/a-escola/orgaos-gestao' },
    { label: 'Instalações', href: '/a-escola/instalacoes' },
  ],
  'Oferta Educativa': [
    { label: 'Ensino Básico', href: '/oferta-educativa/ensino-basico' },
    { label: 'Ensino Secundário', href: '/oferta-educativa/ensino-secundario' },
    { label: 'Cursos Profissionais', href: '/oferta-educativa/cursos-profissionais' },
  ],
  'Serviços': [
    { label: 'Secretaria', href: '/servicos/secretaria' },
    { label: 'Biblioteca', href: '/servicos/biblioteca' },
    { label: 'Psicologia (SPO)', href: '/servicos/spo' },
  ],
  'Links Úteis': [
    { label: 'Plataformas Digitais', href: '/plataformas' },
    { label: 'Documentos', href: '/documentos' },
    { label: 'Notícias', href: '/noticias' },
    { label: 'Eventos', href: '/eventos' },
  ],
};

const schoolInfo = {
  name: 'Escola Secundária José Falcão',
  address: 'Av. Dom Afonso Henriques, Apartado 2071, 3001-654 Coimbra',
  phone: '239 487 170 / 171 / 172',
  fax: '239 484 958 / 239 487 179',
  email: 'geral@esjf.pt',
  facebook: 'https://www.facebook.com/esjfalcao',
  instagram: 'https://www.instagram.com/esjfalcao',
  horario: 'Segunda a Sexta: 08:30 - 17:30',
};

const linkColumns = Object.entries(footerLinks);

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* School Info - Spans 4 columns */}
            <div className="lg:col-span-4">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm tracking-wider">ESJF</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{schoolInfo.name}</h3>
                    <p className="text-xs text-slate-400">Coimbra · Desde 1936</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Um dos primeiros Liceus de Portugal, classificado como Monumento de Interesse Público. 
                  Educação para a cidadania, para os valores e para a paz.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <p className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-400" />
                  <span>{schoolInfo.address}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  <a href="tel:+351239487170" className="hover:text-white transition-colors">
                    {schoolInfo.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Printer className="h-4 w-4 shrink-0 text-brand-400" />
                  <span>{schoolInfo.fax}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                  <a href={`mailto:${schoolInfo.email}`} className="hover:text-white transition-colors">
                    {schoolInfo.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-brand-400" />
                  <span>{schoolInfo.horario}</span>
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={schoolInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
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

            {/* Link Columns - Each spans 2 columns */}
            {linkColumns.map(([title, links]) => (
              <div key={title} className="lg:col-span-2">
                <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <span className="w-0 group-hover:w-2 transition-all duration-200 overflow-hidden">›</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
