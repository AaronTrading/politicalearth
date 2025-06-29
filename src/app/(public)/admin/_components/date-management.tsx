"use client";

import type { GameDate } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DateManagementProps {
  initialGameDate: GameDate | null;
}

export default function DateManagement({
  initialGameDate,
}: DateManagementProps) {
  const router = useRouter();
  const [gameDate, setGameDate] = useState<GameDate | null>(initialGameDate);
  const [newDate, setNewDate] = useState(gameDate?.date || "");

  const updateGameDate = async (newDateValue: string) => {
    try {
      const response = await fetch("/api/game-date", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDateValue }),
      });

      if (response.ok) {
        const updatedDate = await response.json();
        setGameDate(updatedDate);
        alert("Date mise à jour avec succès!");
        router.refresh();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la date:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDate.trim()) {
      updateGameDate(newDate);
    }
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-2xl">📅</span>
        Gestion de la Date du Jeu
      </h2>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Date Actuelle
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {gameDate?.date || "Non définie"}
            </p>
          </div>
          <div className="text-gray-500">
            <p className="text-sm">
              Statut: {gameDate?.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="gameDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nouvelle Date
          </label>
          <input
            type="text"
            id="gameDate"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder="Ex: 15 Janvier 2157"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900"
          />
          <p className="text-sm text-gray-500 mt-1">
            Format libre (ex: "15 Janvier 2157", "An 2157", etc.)
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Mettre à jour la date
        </button>
      </form>
    </div>
  );
}
