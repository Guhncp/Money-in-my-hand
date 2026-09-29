import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthThemeProvider } from '@/context/AuthThemeContext';
import { FinanceProvider } from '@/context/FinanceContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Money in My Hand | Controle Financeiro Pessoal',
  description:
    'Controle financeiro inteligente com temas dinâmicos adaptados ao seu perfil e estilo de vida.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="adult-male">
      <body>
        <AuthThemeProvider>
          <FinanceProvider>{children}</FinanceProvider>
        </AuthThemeProvider>
      </body>
    </html>
  );
}
