import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  title: {
    default: 'Escola Secundária José Falcão | Coimbra',
    template: '%s | ESJF Coimbra',
  },
  description: 'Escola Secundária José Falcão - Um dos primeiros Liceus de Portugal, monumento de interesse público em Coimbra. Educação para a cidadania, valores e paz.',
  keywords: ['escola', 'liceu', 'Coimbra', 'José Falcão', 'ensino básico', 'ensino secundário', 'educação', 'Portugal'],
  authors: [{ name: 'ESJF Coimbra' }],
  creator: 'ESJF Coimbra',
  publisher: 'Escola Secundária José Falcão',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: '/',
    title: 'Escola Secundária José Falcão | Coimbra',
    description: 'Um dos primeiros Liceus de Portugal, monumento de interesse público em Coimbra.',
    siteName: 'ESJF Coimbra',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Escola Secundária José Falcão',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escola Secundária José Falcão | Coimbra',
    description: 'Um dos primeiros Liceus de Portugal, monumento de interesse público em Coimbra.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
