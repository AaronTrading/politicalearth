"use client";

import { useEffect, useState } from "react";

export function GameDateDisplay() {
  const [gameDate, setGameDate] = useState<string>("2077");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDate = async () => {
      try {
        const response = await fetch("/api/game-date");
        const data = await response.json();
        if (data?.date) {
          setGameDate(data.date);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la date:", error);
        // Keep default date on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDate();
  }, []);

  return (
    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg shadow">
      <span className="text-sm font-semibold text-gray-800">
        📅 {isLoading ? "..." : gameDate}
      </span>
    </div>
  );
}
