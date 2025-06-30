import { env } from "@/lib/env";
import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";

import type {
  EconomicRanking as PrismaEconomicRanking,
  GameDate as PrismaGameDate,
  MilitaryRanking as PrismaMilitaryRanking,
  News as PrismaNews,
} from "@/generated/prisma";

import { PageHeader } from "../_components/page-header";
import { AdminPanel } from "./_components/admin-panel";

export const metadata: Metadata = {
  title: `Admin | ${env.NEXT_PUBLIC_APP_NAME}`,
};

type AdminData = {
  militaryRankings: Pick<
    PrismaMilitaryRanking,
    "id" | "rank" | "country" | "flag" | "power" | "budget" | "forces"
  >[];
  economicRankings: Pick<
    PrismaEconomicRanking,
    "id" | "rank" | "country" | "flag" | "gdp" | "growth" | "trade"
  >[];
  news: Pick<
    PrismaNews,
    "id" | "title" | "content" | "category" | "date" | "imageUrl"
  >[];
  gameDate: Pick<PrismaGameDate, "id" | "date" | "isActive"> | null;
};

async function getAdminData(): Promise<AdminData> {
  try {
    const [militaryRankings, economicRankings, news, gameDate] =
      await Promise.all([
        prisma.militaryRanking.findMany({
          orderBy: { rank: "asc" },
          select: {
            id: true,
            rank: true,
            country: true,
            flag: true,
            power: true,
            budget: true,
            forces: true,
          },
        }),
        prisma.economicRanking.findMany({
          orderBy: { rank: "asc" },
          select: {
            id: true,
            rank: true,
            country: true,
            flag: true,
            gdp: true,
            growth: true,
            trade: true,
          },
        }),
        prisma.news.findMany({
          orderBy: { id: "desc" },
          select: {
            id: true,
            title: true,
            content: true,
            category: true,
            date: true,
            imageUrl: true,
          },
        }),
        prisma.gameDate.findFirst({
          where: { isActive: true },
          select: {
            id: true,
            date: true,
            isActive: true,
          },
        }),
      ]);

    return {
      militaryRankings,
      economicRankings,
      news,
      gameDate,
    };
  } catch (error: unknown) {
    console.error(
      error instanceof Error
        ? error.message
        : "Erreur lors du chargement des données admin",
      error
    );
    return {
      militaryRankings: [],
      economicRankings: [],
      news: [],
      gameDate: null,
    };
  }
}

export default async function AdminPage() {
  const data = await getAdminData();

  return (
    <main className="flex-1">
      <PageHeader
        title="🔧 Panneau d'Administration"
        subtitle="Gestion des données du serveur géopolitique"
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <AdminPanel
          initialMilitaryRankings={data.militaryRankings}
          initialEconomicRankings={data.economicRankings}
          initialNews={data.news}
          initialGameDate={data.gameDate}
        />
      </div>
    </main>
  );
}
