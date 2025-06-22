'use client';

import { useEffect, useState } from 'react';

interface MilitaryRanking {
  id: number;
  rank: number;
  country: string;
  flag: string;
  power: number;
  budget: string;
  forces: string;
}

interface EconomicRanking {
  id: number;
  rank: number;
  country: string;
  flag: string;
  gdp: string;
  growth: string;
  trade: string;
}

interface News {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
}

interface GameDate {
  id: number;
  date: string;
  isActive: boolean;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    'military' | 'economic' | 'news' | 'date'
  >('military');
  const [militaryRankings, setMilitaryRankings] = useState<MilitaryRanking[]>(
    []
  );
  const [economicRankings, setEconomicRankings] = useState<EconomicRanking[]>(
    []
  );
  const [news, setNews] = useState<News[]>([]);
  const [gameDate, setGameDate] = useState<GameDate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [militaryRes, economicRes, newsRes, dateRes] = await Promise.all([
        fetch('/api/military-rankings'),
        fetch('/api/economic-rankings'),
        fetch('/api/news'),
        fetch('/api/game-date'),
      ]);

      const military = await militaryRes.json();
      const economic = await economicRes.json();
      const newsData = await newsRes.json();
      const dateData = await dateRes.json();

      setMilitaryRankings(military);
      setEconomicRankings(economic);
      setNews(newsData);
      setGameDate(dateData);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setLoading(false);
    }
  };

  const updateGameDate = async (newDate: string) => {
    try {
      const response = await fetch('/api/game-date', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: newDate }),
      });

      if (response.ok) {
        const updatedDate = await response.json();
        setGameDate(updatedDate);
        alert('Date mise à jour avec succès!');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la date:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const updateMilitaryRanking = async (
    id: number,
    data: Partial<MilitaryRanking>
  ) => {
    try {
      const response = await fetch(`/api/military-rankings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchData();
        alert('Classement militaire mis à jour!');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const updateEconomicRanking = async (
    id: number,
    data: Partial<EconomicRanking>
  ) => {
    try {
      const response = await fetch(`/api/economic-rankings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchData();
        alert('Classement économique mis à jour!');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const updateNews = async (id: number, data: Partial<News>) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchData();
        alert('Actualité mise à jour!');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const createNews = async (data: Omit<News, 'id'>) => {
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchData();
        alert('Actualité créée!');
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Chargement...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          🔧 Administration - Political Earth
        </h1>

        {/* Navigation tabs */}
        <div
          style={{ marginBottom: '30px', borderBottom: '2px solid #e5e7eb' }}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { key: 'military', label: '⚔️ Classement Militaire' },
              { key: 'economic', label: '💰 Classement Économique' },
              { key: 'news', label: '📰 Actualités' },
              { key: 'date', label: '📅 Date du Jeu' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor:
                    activeTab === tab.key ? '#3b82f6' : 'transparent',
                  color: activeTab === tab.key ? 'white' : '#374151',
                  borderRadius: '6px 6px 0 0',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date du jeu */}
        {activeTab === 'date' && gameDate && (
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>
              Date du Jeu Actuelle
            </h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                value={gameDate.date}
                onChange={(e) =>
                  setGameDate({ ...gameDate, date: e.target.value })
                }
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
              />
              <button
                onClick={() => updateGameDate(gameDate.date)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Mettre à jour
              </button>
            </div>
          </div>
        )}

        {/* Classements militaires */}
        {activeTab === 'military' && (
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>
              Classements Militaires
            </h2>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {militaryRankings.slice(0, 20).map((ranking) => (
                <div
                  key={ranking.id}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '10px',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ width: '30px' }}>{ranking.rank}</span>
                  <span style={{ width: '30px' }}>{ranking.flag}</span>
                  <input
                    value={ranking.country}
                    onChange={(e) => {
                      const updated = militaryRankings.map((r) =>
                        r.id === ranking.id
                          ? { ...r, country: e.target.value }
                          : r
                      );
                      setMilitaryRankings(updated);
                    }}
                    style={{
                      width: '150px',
                      padding: '4px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    type="number"
                    value={ranking.power}
                    onChange={(e) => {
                      const updated = militaryRankings.map((r) =>
                        r.id === ranking.id
                          ? { ...r, power: parseFloat(e.target.value) }
                          : r
                      );
                      setMilitaryRankings(updated);
                    }}
                    style={{
                      width: '80px',
                      padding: '4px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    value={ranking.budget}
                    onChange={(e) => {
                      const updated = militaryRankings.map((r) =>
                        r.id === ranking.id
                          ? { ...r, budget: e.target.value }
                          : r
                      );
                      setMilitaryRankings(updated);
                    }}
                    style={{
                      width: '100px',
                      padding: '4px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    value={ranking.forces}
                    onChange={(e) => {
                      const updated = militaryRankings.map((r) =>
                        r.id === ranking.id
                          ? { ...r, forces: e.target.value }
                          : r
                      );
                      setMilitaryRankings(updated);
                    }}
                    style={{
                      width: '80px',
                      padding: '4px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                    }}
                  />
                  <button
                    onClick={() => updateMilitaryRanking(ranking.id, ranking)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Sauver
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Classements économiques */}
        {activeTab === 'economic' && (
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>
              Classements Économiques
            </h2>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {economicRankings.slice(0, 20).map((ranking) => (
                <div
                  key={ranking.id}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '10px',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ width: '30px' }}>{ranking.rank}</span>
                  <span style={{ width: '30px' }}>{ranking.flag}</span>
                  <input
                    value={ranking.country}
                    onChange={(e) => {
                      const updated = economicRankings.map((r) =>
                        r.id === ranking.id
                          ? { ...r, country: e.target.value }
                          : r
                      );
                      setEconomicRankings(updated);
                    }}
                    style={{
                      width: '150px',
                      padding: '4px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    value={ranking.gdp}
                    onChange={(e) => {
                      const updated = economicRankings.map((r) =>
                        r.id === ranking.id ? { ...r, gdp: e.target.value } : r
                      );
                      setEconomicRankings(updated);
                    }}
                    style={{
                      width: '100px',
                      padding: '4px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    value={ranking.growth}
                    onChange={(e) => {
                      const updated = economicRankings.map((r) =>
                        r.id === ranking.id
                          ? { ...r, growth: e.target.value }
                          : r
                      );
                      setEconomicRankings(updated);
                    }}
                    style={{
                      width: '80px',
                      padding: '4px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    value={ranking.trade}
                    onChange={(e) => {
                      const updated = economicRankings.map((r) =>
                        r.id === ranking.id
                          ? { ...r, trade: e.target.value }
                          : r
                      );
                      setEconomicRankings(updated);
                    }}
                    style={{
                      width: '100px',
                      padding: '4px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                    }}
                  />
                  <button
                    onClick={() => updateEconomicRanking(ranking.id, ranking)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Sauver
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actualités */}
        {activeTab === 'news' && (
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>
              Actualités
            </h2>

            {/* Formulaire pour nouvelle actualité */}
            <div
              style={{
                marginBottom: '30px',
                padding: '15px',
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ marginBottom: '10px' }}>
                Créer une nouvelle actualité
              </h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <input
                  id="newTitle"
                  placeholder="Titre"
                  style={{
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                  }}
                />
                <input
                  id="newCategory"
                  placeholder="Catégorie"
                  style={{
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                  }}
                />
                <input
                  id="newDate"
                  placeholder="Date"
                  style={{
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                  }}
                />
                <textarea
                  id="newContent"
                  placeholder="Contenu"
                  style={{
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    minHeight: '100px',
                  }}
                />
                <button
                  onClick={() => {
                    const title = (
                      document.getElementById('newTitle') as HTMLInputElement
                    ).value;
                    const category = (
                      document.getElementById('newCategory') as HTMLInputElement
                    ).value;
                    const date = (
                      document.getElementById('newDate') as HTMLInputElement
                    ).value;
                    const content = (
                      document.getElementById(
                        'newContent'
                      ) as HTMLTextAreaElement
                    ).value;

                    if (title && category && date && content) {
                      createNews({ title, category, date, content });
                      (
                        document.getElementById('newTitle') as HTMLInputElement
                      ).value = '';
                      (
                        document.getElementById(
                          'newCategory'
                        ) as HTMLInputElement
                      ).value = '';
                      (
                        document.getElementById('newDate') as HTMLInputElement
                      ).value = '';
                      (
                        document.getElementById(
                          'newContent'
                        ) as HTMLTextAreaElement
                      ).value = '';
                    }
                  }}
                  style={{
                    padding: '10px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Créer l'actualité
                </button>
              </div>
            </div>

            {/* Liste des actualités existantes */}
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {news.map((article) => (
                <div
                  key={article.id}
                  style={{
                    marginBottom: '20px',
                    padding: '15px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <input
                      value={article.title}
                      onChange={(e) => {
                        const updated = news.map((n) =>
                          n.id === article.id
                            ? { ...n, title: e.target.value }
                            : n
                        );
                        setNews(updated);
                      }}
                      style={{
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        value={article.category}
                        onChange={(e) => {
                          const updated = news.map((n) =>
                            n.id === article.id
                              ? { ...n, category: e.target.value }
                              : n
                          );
                          setNews(updated);
                        }}
                        style={{
                          padding: '8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          width: '150px',
                        }}
                      />
                      <input
                        value={article.date}
                        onChange={(e) => {
                          const updated = news.map((n) =>
                            n.id === article.id
                              ? { ...n, date: e.target.value }
                              : n
                          );
                          setNews(updated);
                        }}
                        style={{
                          padding: '8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          width: '150px',
                        }}
                      />
                    </div>
                    <textarea
                      value={article.content}
                      onChange={(e) => {
                        const updated = news.map((n) =>
                          n.id === article.id
                            ? { ...n, content: e.target.value }
                            : n
                        );
                        setNews(updated);
                      }}
                      style={{
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        minHeight: '100px',
                      }}
                    />
                    <button
                      onClick={() => updateNews(article.id, article)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: 'fit-content',
                      }}
                    >
                      Mettre à jour
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
