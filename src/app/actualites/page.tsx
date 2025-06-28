import { env } from "@/lib/env";
import type { Metadata } from "next";

import { prisma } from "../../lib/prisma";

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
    <main style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header avec date du jeu */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1f2937",
            margin: 0,
          }}
        >
          Actualités Mondiales
        </h1>
        <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "14px" }}>
          Les dernières nouvelles géopolitiques - {gameDate?.date || "2077"}
        </p>
      </div>

      {/* Contenu principal */}
      <div
        style={{ padding: "32px 16px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "24px",
          }}
        >
          {news.map((article) => (
            <div
              key={article.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
                transition: "transform 0.2s ease",
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {article.category}
                </span>
                <span
                  style={{
                    float: "right",
                    color: "#6b7280",
                    fontSize: "12px",
                  }}
                >
                  {article.date}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "12px",
                  lineHeight: "1.4",
                }}
              >
                {article.title}
              </h2>

              <p
                style={{
                  color: "#4b5563",
                  lineHeight: "1.6",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                {article.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
