"use client";

import type {
  EconomicRanking as PrismaEconomicRanking,
  GameDate as PrismaGameDate,
  MilitaryRanking as PrismaMilitaryRanking,
  News as PrismaNews,
} from "@/generated/prisma";

import { useState } from "react";

import { AdminTabs } from "./admin-tabs";
import { DateManagement } from "./date-management";
import { EconomicManagement } from "./economic-management";
import { MilitaryManagement } from "./military-management";
import { NewsManagement } from "./news-management";

type AdminPanelProps = {
  initialMilitaryRankings: Pick<
    PrismaMilitaryRanking,
    "id" | "rank" | "country" | "flag" | "power" | "budget" | "forces"
  >[];
  initialEconomicRankings: Pick<
    PrismaEconomicRanking,
    "id" | "rank" | "country" | "flag" | "gdp" | "growth" | "trade"
  >[];
  initialNews: Pick<
    PrismaNews,
    "id" | "title" | "content" | "category" | "date" | "imageUrl"
  >[];
  initialGameDate: Pick<PrismaGameDate, "id" | "date" | "isActive"> | null;
};

export const AdminPanel = ({
  initialMilitaryRankings,
  initialEconomicRankings,
  initialNews,
  initialGameDate,
}: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<
    "military" | "economic" | "news" | "date"
  >("date");

  return (
    <div className="animate-fade-in">
      <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        {activeTab === "date" && <DateManagement gameDate={initialGameDate} />}
        {activeTab === "military" && (
          <MilitaryManagement rankings={initialMilitaryRankings} />
        )}
        {activeTab === "economic" && (
          <EconomicManagement rankings={initialEconomicRankings} />
        )}
        {activeTab === "news" && <NewsManagement news={initialNews} />}
      </div>
    </div>
  );
};
