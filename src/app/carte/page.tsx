import { env } from "@/lib/env";
import type { Metadata } from "next";

import { Flag, Globe, Users } from "lucide-react";

export const metadata: Metadata = {
  title: `Carte | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Carte du serveur géopolitique ${env.NEXT_PUBLIC_APP_NAME}.`,
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/carte`,
  },
};

export default function CartePage() {
  return (
    <main>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Carte du Monde</h1>
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-lg">
            <Users className="text-gray-500" />
            <span className="font-semibold">200</span>
            <span className="text-gray-500">Joueurs sur discord</span>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <Flag className="text-gray-500" />
            <span className="font-semibold">100</span>
            <span className="text-gray-500">Pays</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[600px] bg-slate-100 rounded-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Globe size={64} className="mx-auto" />
          <p className="mt-4 text-2xl">La carte interactive chargera ici.</p>
          <p>Utilisez le zoom et le glisser-déposer pour explorer.</p>
        </div>
      </div>
    </main>
  );
}
