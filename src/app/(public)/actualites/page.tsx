import { env } from "@/lib/env";
import type { Metadata } from "next";
import { prisma } from "../../../lib/prisma";
import NewsCard from "../_components/news-card";
import PageHeader from "../_components/page-header";

export const metadata: Metadata = {
  title: `Actualités | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Actualités du serveur géopolitique ${env.NEXT_PUBLIC_APP_NAME}.`,
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/actualites`,
  },
};

export default async function ActualitesPage() {
  // Récupération des données depuis la base
  const [news, gameDate] = await Promise.all([
    prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.gameDate.findFirst({
      where: { isActive: true },
    }),
  ]);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Actualités Mondiales"
        subtitle={`Les dernières nouvelles géopolitiques - ${
          gameDate?.date || "2077"
        }`}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard
                key={article.id}
                title={article.title}
                category={article.category}
                date={article.date}
                content={article.content}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-gray-400">📰</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune actualité disponible
            </h3>
            <p className="text-gray-600">
              Les dernières nouvelles apparaîtront ici dès qu&apos;elles seront
              publiées.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
