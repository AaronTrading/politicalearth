"use client";

import type {
  EconomicRanking,
  GameDate,
  MilitaryRanking,
  News,
} from "@/lib/types";
import { useState } from "react";
import AdminTabs from "./admin-tabs";
import DateManagement from "./date-management";
import EconomicManagement from "./economic-management";
import MilitaryManagement from "./military-management";
import NewsManagement from "./news-management";

interface AdminPanelProps {
  initialMilitaryRankings: MilitaryRanking[];
  initialEconomicRankings: EconomicRanking[];
  initialNews: News[];
  initialGameDate: GameDate | null;
}

export default function AdminPanel({
  initialMilitaryRankings,
  initialEconomicRankings,
  initialNews,
  initialGameDate,
}: AdminPanelProps) {
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
}
