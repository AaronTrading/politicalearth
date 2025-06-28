import { env } from "@/lib/env";
import type { Metadata } from "next";
import { prisma } from "../../../lib/prisma";
import PageHeader from "../_components/page-header";
import RankingTable from "../_components/ranking-table";

export const metadata: Metadata = {
  title: `Classement | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Classement du serveur géopolitique ${env.NEXT_PUBLIC_APP_NAME}.`,
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/classement`,
  },
};

export default async function ClassementPage() {
  // Récupération des données depuis la base
  const [militaryRankings, economicRankings, gameDate] = await Promise.all([
    prisma.militaryRanking.findMany({
      orderBy: { rank: "asc" },
    }),
    prisma.economicRanking.findMany({
      orderBy: { rank: "asc" },
    }),
    prisma.gameDate.findFirst({
      where: { isActive: true },
    }),
  ]);

  // Format data for the ranking tables
  const economicData = economicRankings.map((ranking) => ({
    id: ranking.id,
    rank: ranking.rank,
    country: ranking.country,
    flag: ranking.flag,
    gdp: ranking.gdp,
    growth: ranking.growth,
    trade: ranking.trade,
  }));

  const militaryData = militaryRankings.map((ranking) => ({
    id: ranking.id,
    rank: ranking.rank,
    country: ranking.country,
    flag: ranking.flag,
    power: ranking.power,
    budget: ranking.budget,
    forces: ranking.forces,
  }));

  const economicColumns = [
    { key: "rank", label: "Rang", align: "center" as const },
    { key: "country", label: "Pays" },
    {
      key: "gdp",
      label: "PIB",
      align: "right" as const,
    },
    {
      key: "growth",
      label: "Croissance",
      align: "right" as const,
    },
    {
      key: "trade",
      label: "Commerce",
      align: "right" as const,
    },
  ];

  const militaryColumns = [
    { key: "rank", label: "Rang", align: "center" as const },
    { key: "country", label: "Pays" },
    {
      key: "power",
      label: "Puissance",
      align: "right" as const,
    },
    {
      key: "budget",
      label: "Budget",
      align: "right" as const,
    },
    {
      key: "forces",
      label: "Forces",
      align: "right" as const,
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Classements Mondiaux"
        subtitle={`Puissance militaire et économique des nations en ${
          gameDate?.date || "2077"
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Economic Rankings */}
          <div className="animate-slide-up">
            <RankingTable
              title="Classement Économique"
              icon="💰"
              data={economicData}
              columns={economicColumns}
            />
          </div>

          {/* Military Rankings */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <RankingTable
              title="Classement Militaire"
              icon="⚔️"
              data={militaryData}
              columns={militaryColumns}
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌍</span>
              <h3 className="text-lg font-semibold text-gray-900">
                Pays Répertoriés
              </h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {economicRankings.length}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💰</span>
              <h3 className="text-lg font-semibold text-gray-900">
                PIB Total Mondial
              </h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {economicRankings
                .reduce((sum, country) => sum + parseFloat(country.gdp), 0)
                .toFixed(1)}
              T $
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⚔️</span>
              <h3 className="text-lg font-semibold text-gray-900">
                Personnel Militaire
              </h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {militaryRankings.length} pays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
