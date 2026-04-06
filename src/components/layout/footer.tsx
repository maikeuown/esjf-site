import Link from 'next/link';
import { Mail, MapPin, Phone, Printer, Globe } from 'lucide-react';

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
};

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">{schoolInfo.name}</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                {schoolInfo.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                {schoolInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <Printer className="h-4 w-4 shrink-0" />
                {schoolInfo.fax}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${schoolInfo.email}`} className="hover:text-foreground">
                  {schoolInfo.email}
                </a>
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href={schoolInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href={schoolInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {schoolInfo.name}. Todos os direitos reservados.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="/privacidade" className="hover:text-foreground">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-foreground">
              Termos de Utilização
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
