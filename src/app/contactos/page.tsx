'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Building, GraduationCap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { createBrowserClient } from '@/lib/supabase/client';

const schoolInfo = {
  name: 'Escola Secundária José Falcão',
  address: 'Av. Dom Afonso Henriques, Apartado 2071, 3001-654 Coimbra',
  phone: '239 487 170 / 171 / 172',
  email: 'geral@esjf.pt',
  hours: 'Segunda a Sexta: 08:30 - 17:30',
};

const contactCards = [
  {
    icon: Phone,
    title: 'Telefone',
    content: schoolInfo.phone,
    href: 'tel:+351239487170',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Mail,
    title: 'Email',
    content: schoolInfo.email,
    href: 'mailto:geral@esjf.pt',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: MapPin,
    title: 'Morada',
    content: schoolInfo.address,
    href: 'https://maps.google.com/?q=Escola+Secundária+José+Falcão+Coimbra',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Clock,
    title: 'Horário',
    content: schoolInfo.hours,
    href: null,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
];

export default function ContactsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const supabase = createBrowserClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      category: formData.get('category') as string || 'geral',
    };

    const { error } = await supabase.from('contact_messages').insert(data);

    if (error) {
      console.error('Error sending message:', error);
      setError(true);
    } else {
      setSuccess(true);
      e.currentTarget.reset();
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <MessageSquare className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Fale Connosco</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactos</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Entre em contacto com a Escola Secundária José Falcão. Estamos disponíveis para ajudá-lo.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {contactCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {card.href ? (
              <a href={card.href} className="block group">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="p-6">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{card.content}</p>
                  </CardContent>
                </Card>
              </a>
            ) : (
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.content}</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content: Map + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full border-border/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                Localização
              </h3>
              <div className="h-80 rounded-xl overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.5!2d-8.42!3d40.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEyJzM2LjAiTiA4wrAyNScxMi4wIlc!5e0!3m2!1spt-PT!2spt!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full border-border/50 card-shimmer-static">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Send className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                Envie-nos uma Mensagem
              </h2>

              {success && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-xl border border-green-200 dark:border-green-800">
                  ✓ Mensagem enviada com sucesso! Entraremos em contacto brevemente.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-xl border border-red-200 dark:border-red-800">
                  ✗ Erro ao enviar mensagem. Tente novamente mais tarde.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="O seu nome"
                      className="bg-secondary/50 focus:bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="seu@email.pt"
                      className="bg-secondary/50 focus:bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto *</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    required 
                    placeholder="Assunto da mensagem"
                    className="bg-secondary/50 focus:bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Departamento</Label>
                  <Select name="category" defaultValue="geral">
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geral">Geral</SelectItem>
                      <SelectItem value="secretaria">Secretaria</SelectItem>
                      <SelectItem value="direcao">Direção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Escreva a sua mensagem..."
                    rows={5}
                    className="bg-secondary/50 focus:bg-background"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-600 hover:bg-brand-700 gap-2" 
                  disabled={loading}
                >
                  <Send className="h-4 w-4" />
                  {loading ? 'A enviar...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Building,
            title: 'Secretaria',
            description: 'Para questões sobre matrículas, certidões e documentos.',
            color: 'from-blue-500 to-blue-600',
          },
          {
            icon: GraduationCap,
            title: 'Direção',
            description: 'Para assuntos institucionais e pedagógicos.',
            color: 'from-emerald-500 to-emerald-600',
          },
          {
            icon: Heart,
            title: 'Apoio ao Aluno',
            description: 'Serviços de Psicologia e orientação escolar.',
            color: 'from-pink-500 to-pink-600',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          >
            <Card className="h-full border-border/50 card-shimmer-static">
              <CardContent className="p-6">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
