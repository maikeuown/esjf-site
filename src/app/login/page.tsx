'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const supabase = createBrowserClient();

  const handleEmailPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Login efetuado com sucesso! A redirecionar...');
      setTimeout(() => router.push(redirect), 1000);
    }
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('magic-email') as string;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}${redirect}`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Link mágico enviado! Verifique o seu email.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-brand-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">ESJF</span>
          </div>
          <CardTitle className="text-2xl">Área de Administração</CardTitle>
          <CardDescription>
            Escola Secundária José Falcão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Email e Senha</TabsTrigger>
              <TabsTrigger value="magic">Link Mágico</TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <form onSubmit={handleEmailPassword} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="seu@email.pt" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <LogIn className="h-4 w-4 mr-2" />
                  {loading ? 'A entrar...' : 'Entrar'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="magic">
              <form onSubmit={handleMagicLink} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="magic-email">Email</Label>
                  <Input id="magic-email" name="magic-email" type="email" required placeholder="seu@email.pt" />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <Mail className="h-4 w-4 mr-2" />
                  {loading ? 'A enviar...' : 'Enviar Link Mágico'}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Receberá um email com um link para entrar automaticamente
                </p>
              </form>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 text-sm rounded-md">
              {message}
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <Link href="/recuperar-password" className="text-primary hover:underline">
              Esqueceu a sua senha?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
