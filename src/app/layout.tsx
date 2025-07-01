import "./globals.css";

import type { ReactNode } from "react";

import { Inter } from "next/font/google";

import { Footer } from "./(public)/_components/footer";
import { Header } from "./(public)/_components/header";
import { ToastContainer } from "./(public)/_components/toast/toast-container";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
