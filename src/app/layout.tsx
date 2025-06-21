import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Header from '../components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GéoPols - Serveur Géopolitique',
  description: 'Le site officiel du serveur géopolitique GéoPols.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        <Header />
        <main className="container mx-auto p-8">{children}</main>
      </body>
    </html>
  );
}
