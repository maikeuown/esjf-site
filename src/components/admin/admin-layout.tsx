'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  FileText, 
  Image, 
  Star, 
  Users, 
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const adminNav = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Newspaper, label: 'Notícias', href: '/admin/news' },
  { icon: Calendar, label: 'Eventos', href: '/admin/events' },
  { icon: BookOpen, label: 'Páginas', href: '/admin/pages' },
  { icon: FileText, label: 'Documentos', href: '/admin/documents' },
  { icon: Image, label: 'Media', href: '/admin/media' },
  { icon: Star, label: 'Destaques', href: '/admin/highlights' },
  { icon: Users, label: 'Utilizadores', href: '/admin/users' },
  { icon: MessageSquare, label: 'Mensagens', href: '/admin/messages' },
  { icon: Settings, label: 'Definições', href: '/admin/settings' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          'border-r bg-secondary/50 flex flex-col transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16',
          'hidden md:flex'
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="font-bold">Painel Admin</h2>
              <p className="text-xs text-muted-foreground">ESJF Coimbra</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-foreground/80'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link href="/">
            <Button variant="outline" size="sm" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              {sidebarOpen && 'Ver Site'}
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="w-full" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            {sidebarOpen && 'Terminar Sessão'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden border-b p-4 flex items-center justify-between">
          <h2 className="font-bold">Painel Admin</h2>
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
        </header>

        {/* Mobile Nav */}
        <nav className="md:hidden border-b overflow-x-auto">
          <div className="flex p-2 gap-1 min-w-max">
            {adminNav.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-md text-xs transition-colors min-w-[60px]',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-foreground/80'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
