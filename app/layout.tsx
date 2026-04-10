import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GrainOverlay } from '@/components/layout/GrainOverlay';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'UTTILL — Life, beautifully lived',
  description: 'Materiales premium para espacios extraordinarios. Pisos SPC, laminados, piedra flexible, y productos wellness.',
  keywords: ['pisos premium', 'SPC', 'laminado', 'piedra flexible', 'Costa Rica', 'materiales construcción'],
  authors: [{ name: 'UTTILL S.A.' }],
  creator: 'CIVEK Empire',
  publisher: 'UTTILL S.A.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://uttill.com',
    title: 'UTTILL — Life, beautifully lived',
    description: 'Materiales premium para espacios extraordinarios',
    siteName: 'UTTILL',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceMono.variable}`}>
      <body>
        <GrainOverlay />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
