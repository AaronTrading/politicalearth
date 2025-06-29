"use client";

import type { MilitaryRanking } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MilitaryManagementProps {
  rankings: MilitaryRanking[];
}

export default function MilitaryManagement({
  rankings,
}: MilitaryManagementProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<MilitaryRanking>>({});

  const updateRanking = async (id: number, data: Partial<MilitaryRanking>) => {
    try {
      const response = await fetch(`/api/military-rankings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Classement militaire mis à jour!");
        router.refresh();
      }
    } catch (error: unknown) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleEdit = (ranking: MilitaryRanking) => {
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
                      <button
                        type="button"
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        💾 Sauver
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                      >
                        ❌ Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleEdit(ranking)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      ✏️ Éditer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
