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

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  nation?: string;
  pib?: number;
  createdAt: string;
  emailVerified: boolean;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<
    'military' | 'economic' | 'news' | 'date' | 'users'
  >('military');
  const [militaryRankings, setMilitaryRankings] = useState<MilitaryRanking[]>(
    []
  );
  const [economicRankings, setEconomicRankings] = useState<EconomicRanking[]>(
    []
  );
  const [news, setNews] = useState<News[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [gameDate, setGameDate] = useState<GameDate | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [militaryRes, economicRes, newsRes, dateRes, usersRes] =
        await Promise.all([
          fetch('/api/military-rankings'),
          fetch('/api/economic-rankings'),
          fetch('/api/news'),
          fetch('/api/game-date'),
          fetch('/api/users'),
        ]);

      const military = await militaryRes.json();
      const economic = await economicRes.json();
      const newsData = await newsRes.json();
      const dateData = await dateRes.json();
      const usersData = await usersRes.json();

      setMilitaryRankings(military);
      setEconomicRankings(economic);
      setNews(newsData);
      setUsers(usersData);
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

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted || loading) {
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
            color: '#333',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          🔧 Panneau d&apos;Administration
        </h1>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
            gap: '10px',
          }}
        >
          {[
            { key: 'date', label: '📅 Date du Jeu' },
            { key: 'military', label: '⚔️ Classement Militaire' },
            { key: 'economic', label: '💰 Classement Économique' },
            { key: 'news', label: '📰 Actualités' },
            { key: 'users', label: '👥 Utilisateurs' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(
                  tab.key as 'military' | 'economic' | 'news' | 'date'
                )
              }
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: activeTab === tab.key ? '#007bff' : '#e9ecef',
                color: activeTab === tab.key ? 'white' : '#333',
                boxShadow:
                  activeTab === tab.key
                    ? '0 4px 8px rgba(0, 123, 255, 0.3)'
                    : '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'date' && (
          <DateManagement gameDate={gameDate} updateGameDate={updateGameDate} />
        )}
        {activeTab === 'military' && (
          <MilitaryManagement
            rankings={militaryRankings}
            updateRanking={updateMilitaryRanking}
          />
        )}
        {activeTab === 'economic' && (
          <EconomicManagement
            rankings={economicRankings}
            updateRanking={updateEconomicRanking}
          />
        )}
        {activeTab === 'news' && (
          <NewsManagement
            news={news}
            updateNews={updateNews}
            createNews={createNews}
          />
        )}
        {activeTab === 'users' && (
          <UserManagement users={users} refreshData={fetchData} />
        )}
      </div>
    </div>
  );
}

// Date Management Component
function DateManagement({
  gameDate,
  updateGameDate,
}: {
  gameDate: GameDate | null;
  updateGameDate: (date: string) => void;
}) {
  const [newDate, setNewDate] = useState(gameDate?.date || '');

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        📅 Gestion de la Date du Jeu
      </h2>
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555',
          }}
        >
          Date actuelle:
        </label>
        <input
          type="text"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          placeholder="Ex: 2077, Janvier 2025, etc."
          style={{
            width: '300px',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
          }}
        />
      </div>
      <button
        onClick={() => updateGameDate(newDate)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(40, 167, 69, 0.3)',
        }}
      >
        Mettre à jour la date
      </button>
    </div>
  );
}

// Military Management Component
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
    if (editingId) {
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
    <div
      style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        ⚔️ Gestion du Classement Militaire
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Rang
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Pays
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Drapeau
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Puissance
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Budget
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Forces
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking) => (
              <tr key={ranking.id}>
                {editingId === ranking.id ? (
                  <>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="number"
                        value={editData.rank || ''}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            rank: parseInt(e.target.value),
                          })
                        }
                        style={{ width: '60px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.country || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, country: e.target.value })
                        }
                        style={{ width: '100px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.flag || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, flag: e.target.value })
                        }
                        style={{ width: '60px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="number"
                        step="0.01"
                        value={editData.power || ''}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            power: parseFloat(e.target.value),
                          })
                        }
                        style={{ width: '80px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.budget || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, budget: e.target.value })
                        }
                        style={{ width: '100px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.forces || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, forces: e.target.value })
                        }
                        style={{ width: '100px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <button
                        onClick={handleSave}
                        style={{
                          marginRight: '5px',
                          padding: '4px 8px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        💾
                      </button>
                      <button
                        onClick={handleCancel}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        ❌
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.rank}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.country}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.flag}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.power}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.budget}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.forces}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <button
                        onClick={() => handleEdit(ranking)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Éditer
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Economic Management Component
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
    if (editingId) {
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
    <div
      style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        💰 Gestion du Classement Économique
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Rang
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Pays
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Drapeau
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                PIB
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Croissance
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Commerce
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking) => (
              <tr key={ranking.id}>
                {editingId === ranking.id ? (
                  <>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="number"
                        value={editData.rank || ''}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            rank: parseInt(e.target.value),
                          })
                        }
                        style={{ width: '60px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.country || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, country: e.target.value })
                        }
                        style={{ width: '100px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.flag || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, flag: e.target.value })
                        }
                        style={{ width: '60px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.gdp || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, gdp: e.target.value })
                        }
                        style={{ width: '100px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.growth || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, growth: e.target.value })
                        }
                        style={{ width: '80px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.trade || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, trade: e.target.value })
                        }
                        style={{ width: '100px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <button
                        onClick={handleSave}
                        style={{
                          marginRight: '5px',
                          padding: '4px 8px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        💾
                      </button>
                      <button
                        onClick={handleCancel}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        ❌
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.rank}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.country}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.flag}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.gdp}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.growth}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {ranking.trade}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <button
                        onClick={() => handleEdit(ranking)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Éditer
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// News Management Component
function NewsManagement({
  news,
  updateNews,
  createNews,
}: {
  news: News[];
  updateNews: (id: number, data: Partial<News>) => void;
  createNews: (data: Omit<News, 'id'>) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<News>>({});
  const [newArticle, setNewArticle] = useState<Omit<News, 'id'>>({
    title: '',
    content: '',
    category: '',
    date: '',
    imageUrl: '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleEdit = (article: News) => {
    setEditingId(article.id);
    setEditData(article);
  };

  const handleSave = () => {
    if (editingId) {
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
    createNews(newArticle);
    setNewArticle({
      title: '',
      content: '',
      category: '',
      date: '',
      imageUrl: '',
    });
    setShowCreateForm(false);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ fontSize: '24px', color: '#333' }}>
          📰 Gestion des Actualités
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ➕ Créer un article
        </button>
      </div>

      {showCreateForm && (
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3>Créer un nouvel article</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Titre"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <textarea
              placeholder="Contenu"
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
              style={{
                width: '100%',
                height: '100px',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical',
              }}
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={newArticle.category}
              onChange={(e) =>
                setNewArticle({ ...newArticle, category: e.target.value })
              }
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <input
              type="text"
              placeholder="Date"
              value={newArticle.date}
              onChange={(e) =>
                setNewArticle({ ...newArticle, date: e.target.value })
              }
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <input
              type="text"
              placeholder="URL de l'image (optionnel)"
              value={newArticle.imageUrl}
              onChange={(e) =>
                setNewArticle({ ...newArticle, imageUrl: e.target.value })
              }
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div>
            <button
              onClick={handleCreate}
              style={{
                marginRight: '10px',
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Créer
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {news.map((article) => (
          <div
            key={article.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fafafa',
            }}
          >
            {editingId === article.id ? (
              <div>
                <input
                  type="text"
                  value={editData.title || ''}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
                <textarea
                  value={editData.content || ''}
                  onChange={(e) =>
                    setEditData({ ...editData, content: e.target.value })
                  }
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '8px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    resize: 'vertical',
                  }}
                />
                <div
                  style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}
                >
                  <input
                    type="text"
                    placeholder="Catégorie"
                    value={editData.category || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={editData.date || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="URL de l'image"
                  value={editData.imageUrl || ''}
                  onChange={(e) =>
                    setEditData({ ...editData, imageUrl: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
                <div>
                  <button
                    onClick={handleSave}
                    style={{
                      marginRight: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    💾 Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    ❌ Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3
                  style={{
                    fontSize: '20px',
                    marginBottom: '10px',
                    color: '#333',
                  }}
                >
                  {article.title}
                </h3>
                <p style={{ marginBottom: '10px', color: '#666' }}>
                  {article.content}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    color: '#888',
                    fontSize: '14px',
                  }}
                >
                  <span>📂 {article.category}</span>
                  <span>📅 {article.date}</span>
                </div>
                {article.imageUrl && (
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    🖼️ Image: {article.imageUrl}
                  </p>
                )}
                <button
                  onClick={() => handleEdit(article)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Éditer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// User Management Component
function UserManagement({
  users,
  refreshData,
}: {
  users: User[];
  refreshData: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditData({ nation: user.nation || '', pib: user.pib || 0 });
  };

  const handleSave = async () => {
    if (editingId) {
      try {
        const response = await fetch(`/api/users/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nation: editData.nation,
            pib: editData.pib,
          }),
        });

        if (response.ok) {
          refreshData();
          setEditingId(null);
          setEditData({});
          alert('Utilisateur mis à jour avec succès!');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        alert('Erreur lors de la mise à jour');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        👥 Gestion des Utilisateurs
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Avatar
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Nom
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Nation
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                PIB (M€)
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Inscription
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Avatar"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#007bff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </td>

                {editingId === user.id ? (
                  <>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      {user.name}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      {user.email}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="text"
                        value={editData.nation || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, nation: e.target.value })
                        }
                        placeholder="Ex: France"
                        style={{ width: '120px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <input
                        type="number"
                        value={editData.pib || ''}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            pib: parseFloat(e.target.value),
                          })
                        }
                        placeholder="Ex: 2500"
                        style={{ width: '80px', padding: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <button
                        onClick={handleSave}
                        style={{
                          marginRight: '5px',
                          padding: '4px 8px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        💾
                      </button>
                      <button
                        onClick={handleCancel}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        ❌
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {user.name}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {user.email}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {user.nation ? (
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                          {user.nation}
                        </span>
                      ) : (
                        <span style={{ color: '#dc3545', fontStyle: 'italic' }}>
                          Non définie
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {user.pib ? (
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                          {user.pib.toLocaleString()}
                        </span>
                      ) : (
                        <span style={{ color: '#dc3545', fontStyle: 'italic' }}>
                          Non défini
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <button
                        onClick={() => handleEdit(user)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Éditer
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6c757d',
          }}
        >
          <p>Aucun utilisateur inscrit pour le moment.</p>
        </div>
      )}
    </div>
  );
}
