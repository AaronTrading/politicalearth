"use client";

import type { MilitaryRanking as PrismaMilitaryRanking } from "@/generated/prisma";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../_components/button";
import { useToast } from "../../_components/toast/toast-store";

type MilitaryManagementProps = {
  rankings: Pick<
    PrismaMilitaryRanking,
    "id" | "rank" | "country" | "flag" | "power" | "budget" | "forces"
  >[];
};

export const MilitaryManagement = ({ rankings }: MilitaryManagementProps) => {
  const router = useRouter();

  const toast = useToast();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<
    Partial<
      Pick<
        PrismaMilitaryRanking,
        "id" | "rank" | "country" | "flag" | "power" | "budget" | "forces"
      >
    >
  >({});

  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);

  const updateRanking = async (
    id: number,
    data: Partial<
      Pick<
        PrismaMilitaryRanking,
        "id" | "rank" | "country" | "flag" | "power" | "budget" | "forces"
      >
    >
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/military-rankings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la mise à jour du classement militaire"
        );
      }

      toast.success("Classement militaire mis à jour!");
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour du classement militaire"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRanking = async (id: number) => {
    setIsDeletingLoading(true);
    try {
      const response = await fetch(`/api/military-rankings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la suppression du classement militaire"
        );
      }

      toast.success("Classement militaire supprimé!");
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du classement militaire"
      );
    } finally {
      setIsDeletingLoading(false);
    }
  };

  const handleEdit = (
    ranking: Pick<
      PrismaMilitaryRanking,
      "id" | "rank" | "country" | "flag" | "power" | "budget" | "forces"
    >
  ) => {
    setEditingId(ranking.id);
    setEditData(ranking);
  };

  const handleSave = () => {
    if (editingId && editData) {
      updateRanking(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: number) => {
    if (
      confirm("Êtes-vous sûr de vouloir supprimer ce classement militaire ?")
    ) {
      deleteRanking(id);
    }
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>⚔️</span>
        Gestion du Classement Militaire
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border border-gray-300">
                Rang
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border border-gray-300">
                Pays
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border border-gray-300">
                Puissance
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border border-gray-300">
                Budget
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border border-gray-300">
                Forces
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking, index) => (
              <tr
                key={ranking.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="px-4 py-3 border border-gray-300 text-sm text-gray-900">
                  {editingId === ranking.id ? (
                    <input
                      type="number"
                      value={editData.rank || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          rank: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-gray-900"
                    />
                  ) : (
                    ranking.rank
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <span>{ranking.flag}</span>
                    {editingId === ranking.id ? (
                      <input
                        type="text"
                        value={editData.country || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, country: e.target.value })
                        }
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm text-gray-900"
                      />
                    ) : (
                      <span className="font-medium">{ranking.country}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm text-gray-900">
                  {editingId === ranking.id ? (
                    <input
                      type="number"
                      step="0.1"
                      value={editData.power || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          power: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-gray-900"
                    />
                  ) : (
                    ranking.power
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm text-gray-900">
                  {editingId === ranking.id ? (
                    <input
                      type="text"
                      value={editData.budget || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, budget: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-gray-900"
                    />
                  ) : (
                    ranking.budget
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm text-gray-900">
                  {editingId === ranking.id ? (
                    <input
                      type="text"
                      value={editData.forces || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, forces: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-gray-900"
                    />
                  ) : (
                    ranking.forces
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm">
                  {editingId === ranking.id ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        loading={isLoading}
                        variant="success"
                        size="sm"
                      >
                        💾 Sauver
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="secondary"
                        size="sm"
                        disabled={isLoading}
                      >
                        ❌ Annuler
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(ranking)}
                        variant="primary"
                        size="sm"
                      >
                        ✏️ Éditer
                      </Button>
                      <Button
                        onClick={() => handleDelete(ranking.id)}
                        variant="danger"
                        size="sm"
                        loading={isDeletingLoading}
                      >
                        🗑️ Supprimer
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
