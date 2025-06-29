import "./globals.css";

import { Inter } from "next/font/google";

import { Footer } from "./(public)/_components/footer";
import { Header } from "./(public)/_components/header";
import { ToastProvider } from "./(public)/_components/toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}
      >
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
