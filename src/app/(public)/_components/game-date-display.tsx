import type { GameDate as PrismaGameDate } from "@/generated/prisma";

type GameDateDisplayProps = {
  gameDate: Pick<PrismaGameDate, "date"> | null;
};

export const GameDateDisplay = ({ gameDate }: GameDateDisplayProps) => {
  return (
    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg shadow">
      <span className="text-sm font-semibold text-gray-800">
        📅 {gameDate?.date || "..."}
      </span>
    </div>
  );
};
