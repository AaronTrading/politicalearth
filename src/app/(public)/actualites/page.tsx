import { env } from "@/lib/env";
import type { Metadata } from "next";

import type {
  GameDate as PrismaGameDate,
  News as PrismaNews,
} from "@/generated/prisma";

import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

import { PageHeader } from "../_components/page-header";
import { NewsList } from "./_components/news-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Actualités | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Actualités du serveur géopolitique ${env.NEXT_PUBLIC_APP_NAME}.`,
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/actualites`,
  },
};

export default async function ActualitesPage() {
  const [news, gameDate]: [PrismaNews[], PrismaGameDate | null] =
    await Promise.all([
      prisma.news.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.gameDate.findFirst({
        where: { isActive: true },
      }),
    ]);

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Actualités Mondiales"
        subtitle={cn(
          "Les dernières nouvelles géopolitiques - ",
          gameDate?.date || "2077"
        )}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <NewsList news={news} />
      </div>
    </main>
  );
}
