import { env } from "@/lib/env";
import type { Metadata } from "next";

import Link from "next/link";

import { Button } from "./_components/button";
import { FeaturesList } from "./_components/home/features-list";

export const metadata: Metadata = {
  title: `Serveur Géopolitique | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Le site officiel du serveur géopolitique ${env.NEXT_PUBLIC_APP_NAME}.`,
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/`,
  },
};

export default function HomePage() {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-white">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Bienvenue sur{" "}
            <span className="text-blue-600">{env.NEXT_PUBLIC_APP_NAME}</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Le centre de commandement pour toutes vos activités géopolitiques.
            Suivez les classements, explorez la carte et restez informé des
            dernières actualités.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/carte">
              <Button size="lg" className="w-full sm:w-auto">
                🗺️ Explorer la carte
              </Button>
            </Link>
            <Link href="/classement">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                📊 Voir les classements
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez tous les outils à votre disposition pour suivre
              l&apos;évolution géopolitique mondiale
            </p>
          </div>

          <FeaturesList  />
        </div>
      </section>
    </main>
  );
}
