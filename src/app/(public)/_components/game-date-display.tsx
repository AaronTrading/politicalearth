"use client";

import { useEffect, useState } from "react";

export const GameDateDisplay = () => {
  const currentYear = new Date().getFullYear();

  const [gameDate, setGameDate] = useState<string>(currentYear.toString());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDate = async () => {
      try {
        const response = await fetch("/api/game-date");

        if (!response.ok) {
          throw new Error("Erreur lors du chargement de la date");
        }

        const data = await response.json();

        if (data?.date) {
          setGameDate(data.date);
        }
      } catch (error: unknown) {
        console.error(
          error instanceof Error
            ? error.message
            : "Erreur lors du chargement de la date",
          error
        );
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
};
