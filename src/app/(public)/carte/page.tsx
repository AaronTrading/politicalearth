import { env } from "@/lib/env";
import { Flag, Globe, Users } from "lucide-react";
import type { Metadata } from "next";

import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = {
  title: `Carte | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Carte du serveur géopolitique ${env.NEXT_PUBLIC_APP_NAME}.`,
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/carte`,
  },
};

export default function CartePage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Carte du Monde"
        subtitle="Explorez la géopolitique mondiale en temps réel"
      >
        {/* Stats in header */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">
              200
            </span>
            <span className="text-gray-600 text-sm">Joueurs</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
            <Flag className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">
              100
            </span>
            <span className="text-gray-600 text-sm">Pays</span>
          </div>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Map Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden animate-fade-in">
          <div className="h-[600px] bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Globe
                size={64}
                className="mx-auto mb-4 text-blue-400"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Carte Interactive
              </h3>
              <p className="text-gray-600 mb-4">
                La carte interactive chargera ici.
              </p>
              <p className="text-sm text-gray-500">
                Utilisez le zoom et le glisser-déposer pour explorer.
              </p>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              🎯 Contrôles
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Clic gauche : Sélectionner un pays</li>
              <li>• Molette : Zoomer/Dézoomer</li>
              <li>• Glisser : Déplacer la carte</li>
              <li>• Clic droit : Menu contextuel</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              🎨 Légende
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">
                  Pays alliés
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">
                  Pays hostiles
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span className="text-sm text-gray-600">
                  Pays neutres
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              ℹ️ Informations
            </h3>
            <p className="text-sm text-gray-600">
              Cliquez sur un pays pour voir ses détails : population, économie,
              forces militaires et relations diplomatiques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
