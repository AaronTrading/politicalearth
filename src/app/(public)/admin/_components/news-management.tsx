"use client";

import type { News } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NewsManagementProps {
  initialNews: News[];
}

export default function NewsManagement({ initialNews }: NewsManagementProps) {
  const router = useRouter();
  const [news, setNews] = useState<News[]>(initialNews);
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
        router.refresh();
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
        router.refresh();
      }
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      alert("Erreur lors de la création");
    }
  };

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
          type="button"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCreate}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              💾 Créer
            </button>
            <button
              type="button"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    💾 Sauver
                  </button>
                  <button
                    type="button"
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
                    type="button"
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
