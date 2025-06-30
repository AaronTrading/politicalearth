"use client";

import type { GameDate as PrismaGameDate } from "@/generated/prisma";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "../../_components/button";
import { useToast } from "../../_components/toast/toast-store";

type DateManagementProps = {
  gameDate: Pick<PrismaGameDate, "id" | "date" | "isActive"> | null;
};

export const DateManagement = ({ gameDate }: DateManagementProps) => {
  const router = useRouter();

  const toast = useToast();

  const [newDate, setNewDate] = useState(gameDate?.date || "");
  const [isLoading, setIsLoading] = useState(false);

  const updateGameDate = async (newDateValue: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/game-date", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDateValue }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la date");
      }

      toast.success("Date mise à jour avec succès!");
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour de la date"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
            onChange={(event) => setNewDate(event.target.value)}
            placeholder="Ex: 15 Janvier 2157"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900"
          />
          <p className="text-sm text-gray-500 mt-1">
            Format libre (ex: &quot;15 Janvier 2157&quot;, &quot;An 2157&quot;,
            etc.)
          </p>
        </div>

        <Button type="submit" loading={isLoading} size="lg">
          Mettre à jour la date
        </Button>
      </form>
    </div>
  );
};
