import type { Metadata } from "next";
import { env } from "../lib/env";

import Link from "next/link";

export const metadata: Metadata = {
  title: `Serveur Géopolitique | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Le site officiel du serveur géopolitique ${env.NEXT_PUBLIC_APP_NAME}.`,
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/`,
  },
};

export default function HomePage() {
  return (
    <section className="text-center">
      <div className="py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
          Bienvenue sur {env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-lg text-muted-foreground">
          Le centre de commandement pour toutes vos activités géopolitiques.
          Suivez les classements, explorez la carte et restez informé des
          dernières actualités.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/carte"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Explorer la carte
          </Link>
        </div>
      </div>
    </section>
  );
}
