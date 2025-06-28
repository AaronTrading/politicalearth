"use client";

import type {
  EconomicRanking,
  GameDate,
  MilitaryRanking,
  News,
} from "@/lib/types";
import { useState } from "react";

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
  const [militaryRankings, setMilitaryRankings] = useState<MilitaryRanking[]>(
    initialMilitaryRankings
  );
  const [economicRankings, setEconomicRankings] = useState<EconomicRanking[]>(
    initialEconomicRankings
  );
  const [news, setNews] = useState<News[]>(initialNews);
  const [gameDate, setGameDate] = useState<GameDate | null>(initialGameDate);

  const updateGameDate = async (newDate: string) => {
    try {
      const response = await fetch("/api/game-date", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDate }),
      });

      if (response.ok) {
        const updatedDate = await response.json();
        setGameDate(updatedDate);
        alert("Date mise à jour avec succès!");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la date:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  const updateMilitaryRanking = async (
    id: number,
    data: Partial<MilitaryRanking>
  ) => {
    try {
      const response = await fetch(`/api/military-rankings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMilitaryRankings((prev) =>
          prev.map((ranking) =>
            ranking.id === id ? { ...ranking, ...data } : ranking
          )
        );
        alert("Classement militaire mis à jour!");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  const updateEconomicRanking = async (
    id: number,
    data: Partial<EconomicRanking>
  ) => {
    try {
      const response = await fetch(`/api/economic-rankings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setEconomicRankings((prev) =>
          prev.map((ranking) =>
            ranking.id === id ? { ...ranking, ...data } : ranking
          )
        );
        alert("Classement économique mis à jour!");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  const updateNews = async (id: number, data: Partial<News>) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setNews((prev) =>
          prev.map((article) =>
            article.id === id ? { ...article, ...data } : article
          )
        );
        alert("Actualité mise à jour!");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  const createNews = async (data: Omit<News, "id">) => {
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newArticle = await response.json();
        setNews((prev) => [newArticle, ...prev]);
        alert("Actualité créée!");
      }
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      alert("Erreur lors de la création");
    }
  };

  const tabs = [
    { id: "date", label: "Date du Jeu", icon: "📅" },
    { id: "military", label: "Classement Militaire", icon: "⚔️" },
    { id: "economic", label: "Classement Économique", icon: "💰" },
    { id: "news", label: "Actualités", icon: "📰" },
  ] as const;

  return (
    <div className="animate-fade-in">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        {activeTab === "date" && (
          <DateManagement gameDate={gameDate} updateGameDate={updateGameDate} />
        )}
        {activeTab === "military" && (
          <MilitaryManagement
            rankings={militaryRankings}
            updateRanking={updateMilitaryRanking}
          />
        )}
        {activeTab === "economic" && (
          <EconomicManagement
            rankings={economicRankings}
            updateRanking={updateEconomicRanking}
          />
        )}
        {activeTab === "news" && (
          <NewsManagement
            news={news}
            updateNews={updateNews}
            createNews={createNews}
          />
        )}
      </div>
    </div>
  );
}

function DateManagement({
  gameDate,
  updateGameDate,
}: {
  gameDate: GameDate | null;
  updateGameDate: (date: string) => void;
}) {
  const [newDate, setNewDate] = useState(gameDate?.date || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDate.trim()) {
      updateGameDate(newDate.trim());
    }
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>📅</span>
        Gestion de la Date du Jeu
      </h2>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date actuelle du jeu</p>
            <p className="text-xl font-bold text-gray-900">
              {gameDate?.date || "Non définie"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nouvelle date du jeu
          </label>
          <input
            type="text"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder="Ex: 15 Mars 2077"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <span>💾</span>
          Mettre à jour la date
        </button>
      </form>
    </div>
  );
}

function MilitaryManagement({
  rankings,
  updateRanking,
}: {
  rankings: MilitaryRanking[];
  updateRanking: (id: number, data: Partial<MilitaryRanking>) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<MilitaryRanking>>({});

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
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
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
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
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
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
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
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
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
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    ranking.forces
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm">
                  {editingId === ranking.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        💾 Sauver
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                      >
                        ❌ Annuler
                      </button>
                    </div>
                  ) : (
                    <button
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

function EconomicManagement({
  rankings,
  updateRanking,
}: {
  rankings: EconomicRanking[];
  updateRanking: (id: number, data: Partial<EconomicRanking>) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<EconomicRanking>>({});

  const handleEdit = (ranking: EconomicRanking) => {
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
        <span>💰</span>
        Gestion du Classement Économique
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
                PIB
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border border-gray-300">
                Croissance
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border border-gray-300">
                Commerce
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
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
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
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <span className="font-medium">{ranking.country}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm text-gray-900">
                  {editingId === ranking.id ? (
                    <input
                      type="text"
                      value={editData.gdp || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, gdp: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    ranking.gdp
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm text-gray-900">
                  {editingId === ranking.id ? (
                    <input
                      type="text"
                      value={editData.growth || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, growth: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    ranking.growth
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm text-gray-900">
                  {editingId === ranking.id ? (
                    <input
                      type="text"
                      value={editData.trade || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, trade: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    ranking.trade
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-sm">
                  {editingId === ranking.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        💾 Sauver
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                      >
                        ❌ Annuler
                      </button>
                    </div>
                  ) : (
                    <button
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

function NewsManagement({
  news,
  updateNews,
  createNews,
}: {
  news: News[];
  updateNews: (id: number, data: Partial<News>) => void;
  createNews: (data: Omit<News, "id">) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<News>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newArticle, setNewArticle] = useState<Omit<News, "id">>({
    title: "",
    content: "",
    category: "",
    date: "",
    imageUrl: "",
  });

  const handleEdit = (article: News) => {
    setEditingId(article.id);
    setEditData(article);
  };

  const handleSave = () => {
    if (editingId && editData) {
      updateNews(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleCreate = () => {
    if (
      newArticle.title &&
      newArticle.content &&
      newArticle.category &&
      newArticle.date
    ) {
      createNews(newArticle);
      setNewArticle({
        title: "",
        content: "",
        category: "",
        date: "",
        imageUrl: "",
      });
      setIsCreating(false);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewArticle({
      title: "",
      content: "",
      category: "",
      date: "",
      imageUrl: "",
    });
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span>📰</span>
          Gestion des Actualités
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
        >
          <span>➕</span>
          Créer une actualité
        </button>
      </div>

      {isCreating && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nouvelle Actualité
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                value={newArticle.title}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <input
                type="text"
                value={newArticle.category}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="text"
                value={newArticle.date}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Image (optionnel)
              </label>
              <input
                type="text"
                value={newArticle.imageUrl || ""}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, imageUrl: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu
            </label>
            <textarea
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              💾 Créer
            </button>
            <button
              onClick={handleCancelCreate}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ❌ Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            {editingId === article.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={editData.title || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <input
                      type="text"
                      value={editData.category || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="text"
                      value={editData.date || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Image
                    </label>
                    <input
                      type="text"
                      value={editData.imageUrl || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, imageUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenu
                  </label>
                  <textarea
                    value={editData.content || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    💾 Sauver
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    ❌ Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(article)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    ✏️ Éditer
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {article.content}
                </p>
                {article.imageUrl && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      Image:{" "}
                      <span className="font-mono text-xs">
                        {article.imageUrl}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
