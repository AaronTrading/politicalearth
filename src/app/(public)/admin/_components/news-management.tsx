"use client";

import type { News as PrismaNews } from "@/generated/prisma";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../_components/button";
import { useToast } from "../../_components/toast/toast-store";

type NewsManagementProps = {
  news: Pick<
    PrismaNews,
    "id" | "title" | "content" | "category" | "date" | "imageUrl"
  >[];
};

export const NewsManagement = ({ news }: NewsManagementProps) => {
  const router = useRouter();

  const toast = useToast();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<
    Partial<
      Pick<
        PrismaNews,
        "id" | "title" | "content" | "category" | "date" | "imageUrl"
      >
    >
  >({});
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingLoading, setIsCreatingLoading] = useState(false);
  const [isEditingLoading, setIsEditingLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [newArticle, setNewArticle] = useState<
    Pick<PrismaNews, "title" | "content" | "category" | "date" | "imageUrl">
  >({
    title: "",
    content: "",
    category: "",
    date: "",
    imageUrl: "",
  });

  const updateNews = async (
    id: number,
    data: Partial<
      Pick<
        PrismaNews,
        "id" | "title" | "content" | "category" | "date" | "imageUrl"
      >
    >
  ) => {
    setIsEditingLoading(true);
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'actualité");
      }

      toast.success("Actualité mise à jour!");
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour de l'actualité"
      );
    } finally {
      setIsEditingLoading(false);
    }
  };

  const createNews = async (
    data: Pick<
      PrismaNews,
      "title" | "content" | "category" | "date" | "imageUrl"
    >
  ) => {
    setIsCreatingLoading(true);
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'actualité");
      }

      toast.success("Actualité créée!");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création de l'actualité"
      );
    } finally {
      setIsCreatingLoading(false);
    }
  };

  const deleteNews = async (id: number) => {
    setIsDeletingLoading(true);
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'actualité");
      }

      toast.success("Actualité supprimée!");
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression de l'actualité"
      );
    } finally {
      setIsDeletingLoading(false);
    }
  };

  const handleEdit = (
    article: Pick<
      PrismaNews,
      "id" | "title" | "content" | "category" | "date" | "imageUrl"
    >
  ) => {
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

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      deleteNews(id);
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span>📰</span>
          Gestion des Actualités
        </h2>
        <Button
          onClick={() => setIsCreating(true)}
          variant="success"
          className="flex items-center gap-2"
        >
          <span>➕</span>
          Créer une actualité
        </Button>
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
            <Button
              onClick={handleCreate}
              loading={isCreatingLoading}
              variant="success"
            >
              💾 Créer
            </Button>
            <Button
              onClick={handleCancelCreate}
              variant="secondary"
              disabled={isCreatingLoading}
            >
              ❌ Annuler
            </Button>
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
                  <Button
                    onClick={handleSave}
                    loading={isEditingLoading}
                    variant="success"
                  >
                    💾 Sauver
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="secondary"
                    disabled={isEditingLoading}
                  >
                    ❌ Annuler
                  </Button>
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
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(article)}
                      variant="primary"
                      size="sm"
                    >
                      ✏️ Éditer
                    </Button>
                    <Button
                      onClick={() => handleDelete(article.id)}
                      variant="danger"
                      size="sm"
                      loading={isDeletingLoading}
                    >
                      🗑️ Supprimer
                    </Button>
                  </div>
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
};
