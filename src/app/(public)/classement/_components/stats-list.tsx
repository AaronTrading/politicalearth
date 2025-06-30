import type {
  EconomicRanking as PrismaEconomicRanking,
  MilitaryRanking as PrismaMilitaryRanking,
} from "@/generated/prisma";

import { StatCard, type Stat } from "./stat-card";

type StatsListProps = {
  economicRankings: PrismaEconomicRanking[];
  militaryRankings: PrismaMilitaryRanking[];
};

export const StatsList = ({
  economicRankings,
  militaryRankings,
}: StatsListProps) => {
  const totalGdp = economicRankings
    .reduce((sum, country) => sum + parseFloat(country.gdp), 0)
    .toFixed(1);

  const stats: Stat[] = [
    {
      icon: "🌍",
      title: "Pays Répertoriés",
      value: economicRankings.length,
    },
    {
      icon: "💰",
      title: "PIB Total Mondial",
      value: `${totalGdp}T $`,
    },
    {
      icon: "⚔️",
      title: "Personnel Militaire",
      value: `${militaryRankings.length} pays`,
    },
  ];

  return (
    <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {stats.map((stat: Stat, index: number) => (
        <StatCard key={index} stat={stat} />
      ))}
    </section>
  );
};
