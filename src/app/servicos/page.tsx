import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Heart, ArrowRight, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Clock,
    title: 'Secretaria',
    description: 'Serviço de administração escolar, matrículas, certidões e apoio a alunos e encarregados de educação.',
    hours: 'Segunda a Sexta: 9h00 - 17h00',
    href: '/servicos/secretaria',
  },
  {
    icon: BookOpen,
    title: 'Biblioteca',
    description: 'Espaço de estudo, pesquisa e leitura com acervo diversificado e apoio ao estudo.',
    hours: 'Segunda a Sexta: 9h00 - 18h00',
    href: '/servicos/biblioteca',
  },
  {
    icon: Heart,
    title: 'Serviço de Psicologia (SPO)',
    description: 'Apoio psicológico e orientação escolar e profissional para alunos e famílias.',
    hours: 'Horário sob marcação',
    href: '/servicos/spo',
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Serviços</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Serviços disponíveis para apoiar alunos, encarregados de educação e a comunidade escolar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => (
          <Link href={service.href} key={index} className="group">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <service.icon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  {service.hours}
                </div>
                <div className="flex items-center text-primary font-medium">
                  Saber mais
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Contact Info */}
      <Card className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Informações de Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Telefone</h4>
                <p className="text-muted-foreground">239 487 170 / 171 / 172</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Morada</h4>
                <p className="text-muted-foreground">
                  Av. Dom Afonso Henriques, Apartado 2071<br />
                  3001-654 Coimbra
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
