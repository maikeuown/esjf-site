'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Megaphone, Calendar, Pin, ArrowRight, Clock, Search } from 'lucide-react';
import Link from 'next/link';

const priorityConfig: Record<string, { label: string; className: string }> = {
  urgent: { label: 'Urgente', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  normal: { label: 'Normal', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  low: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
};

export default function AvisosPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const [avisos, setAvisos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchAvisos = async (filter = '') => {
    setLoading(true);
    const res = await fetch(`/api/avisos?search=${encodeURIComponent(filter)}`);
    const data = await res.json();
    setAvisos(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAvisos(); }, []);

  const handleSearch = async (val: string) => {
    setSearch(val);
    const res = await fetch(`/api/avisos?search=${encodeURIComponent(val)}`);
    const data = await res.json();
    setAvisos(data || []);
  };

  const now = new Date().toISOString();
  const activeAvisos = avisos.filter((a: any) => !a.expires_at || a.expires_at > now);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 rounded-full px-4 py-2 mb-4">
          <Megaphone className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Comunicados</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">Avisos</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Comunicados e avisos importantes da Escola Secundária José Falcão
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Pesquisar avisos..." value={search} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      {loading ? <p className="text-center text-muted-foreground">A carregar...</p> : activeAvisos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAvisos.map((aviso: any) => {
            const priority = priorityConfig[aviso.priority] || priorityConfig.normal;
            return (
              <Link key={aviso.id} href={`/avisos/${aviso.slug}`} className="group">
                <Card className="h-full card-glow-lift-pulse border-border/50 cursor-pointer overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={priority.className}>{priority.label}</Badge>
                      {aviso.is_pinned && (
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 flex items-center gap-1">
                          <Pin className="h-3 w-3" /> Fixado
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors text-glow">
                      {aviso.title}
                    </h3>
                    {aviso.excerpt && <p className="text-sm text-muted-foreground mb-4 line-clamp-3 text-glow">{aviso.excerpt}</p>}
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-auto">
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{aviso.published_at ? new Date(aviso.published_at).toLocaleDateString('pt-PT') : new Date(aviso.created_at).toLocaleDateString('pt-PT')}</span>
                      {aviso.expires_at && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{new Date(aviso.expires_at).toLocaleDateString('pt-PT')}</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
              <Megaphone className="h-10 w-10 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">{search ? 'Nenhum aviso encontrado' : 'Sem avisos no momento'}</h3>
            <p className="text-muted-foreground mb-6">{search ? `Não encontrámos avisos para "${search}".` : 'Não há avisos importantes a serem exibidos.'}</p>
            {search && <Button variant="outline" onClick={() => { setSearch(''); handleSearch(''); }}>Limpar pesquisa</Button>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Button({ variant, onClick, children }: any) {
  const cls = variant === 'outline' ? 'border rounded-lg px-4 py-2 hover:bg-secondary transition-colors' : '';
  return <button className={cls} onClick={onClick}>{children}</button>;
}
