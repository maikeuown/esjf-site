'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Printer, Mail, Clock, Send } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/client';

const schoolInfo = {
  name: 'Escola Secundária José Falcão',
  address: 'Av. Dom Afonso Henriques, Apartado 2071, 3001-654 Coimbra',
  phone: '239 487 170 / 171 / 172',
  fax: '239 484 958 / 239 487 179',
  email: 'geral@esjf.pt',
  hours: 'Segunda a Sexta: 9h00 - 17h00',
};

export default function ContactsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createBrowserClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

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
    } else {
      setSuccess(true);
      e.currentTarget.reset();
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Contactos</h1>
        <p className="text-muted-foreground text-lg">
          Entre em contacto com a Escola Secundária José Falcão
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Informações de Contacto</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Morada</h4>
                    <p className="text-muted-foreground">{schoolInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Telefone</h4>
                    <p className="text-muted-foreground">{schoolInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Printer className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Fax</h4>
                    <p className="text-muted-foreground">{schoolInfo.fax}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a href={`mailto:${schoolInfo.email}`} className="text-primary hover:underline">
                      {schoolInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Horário</h4>
                    <p className="text-muted-foreground">{schoolInfo.hours}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Localização</h3>
              <div className="h-64 bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.5!2d-8.42!3d40.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEyJzM2LjAiTiA4wrAyNScxMi4wIlc!5e0!3m2!1spt-PT!2spt!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">Envie-nos uma Mensagem</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
                Mensagem enviada com sucesso! Entraremos em contacto brevemente.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input id="name" name="name" required placeholder="O seu nome" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="seu@email.pt" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Assunto</Label>
                <Select name="category" defaultValue="geral">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o assunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Geral</SelectItem>
                    <SelectItem value="secretaria">Secretaria</SelectItem>
                    <SelectItem value="direcao">Direção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto da Mensagem *</Label>
                <Input id="subject" name="subject" required placeholder="Assunto" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  required 
                  placeholder="Escreva a sua mensagem..."
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'A enviar...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
