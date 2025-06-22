import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Political Earth - Serveur Géopolitique',
  description: 'Le site officiel du serveur géopolitique Political Earth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
