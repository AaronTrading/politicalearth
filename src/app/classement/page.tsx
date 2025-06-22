import { prisma } from '../../lib/prisma';

export default async function ClassementPage() {
  // Récupération des données depuis la base
  const [militaryRankings, economicRankings, gameDate] = await Promise.all([
    prisma.militaryRanking.findMany({
      orderBy: { rank: 'asc' },
    }),
    prisma.economicRanking.findMany({
      orderBy: { rank: 'asc' },
    }),
    prisma.gameDate.findFirst({
      where: { isActive: true },
    }),
  ]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header avec date du jeu */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 0',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0,
          }}
        >
          Classements Mondiaux
        </h1>
        <p style={{ color: '#6b7280', marginTop: '8px', fontSize: '14px' }}>
          Puissance militaire et économique des nations en{' '}
          {gameDate?.date || '2077'}
        </p>
      </div>

      {/* Contenu principal */}
      <div
        style={{ padding: '32px 16px', maxWidth: '1400px', margin: '0 auto' }}
      >
        <div
          style={{
            display: 'flex',
            height: 'calc(100vh - 200px)',
            width: '100%',
            gap: '16px',
          }}
        >
          {/* Economic Rankings - LEFT PANEL */}
          <div
            style={{
              width: 'calc(50% - 8px)',
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid #a2a9b1',
            }}
          >
            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '12px 16px',
                borderBottom: '2px solid #a2a9b1',
                position: 'sticky',
                top: 0,
                zIndex: 10,
              }}
            >
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                💰 Classement Économique
              </h2>
            </div>

            <div style={{ overflow: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead
                  style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#f1f3f4',
                    zIndex: 5,
                  }}
                >
                  <tr>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Rang
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Pays
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      PIB
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Croissance
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Commerce
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {economicRankings.map((country, index) => (
                    <tr
                      key={country.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                      }}
                    >
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                          textAlign: 'center',
                        }}
                      >
                        {country.rank}
                      </td>
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                        }}
                      >
                        <span style={{ marginRight: '6px' }}>
                          {country.flag}
                        </span>
                        {country.country}
                      </td>
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                          textAlign: 'right',
                        }}
                      >
                        {country.gdp}
                      </td>
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                          textAlign: 'right',
                          color: country.growth.startsWith('+')
                            ? '#16a34a'
                            : '#dc2626',
                        }}
                      >
                        {country.growth}
                      </td>
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                          textAlign: 'right',
                        }}
                      >
                        {country.trade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Military Rankings - RIGHT PANEL */}
          <div
            style={{
              width: 'calc(50% - 8px)',
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid #a2a9b1',
            }}
          >
            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '12px 16px',
                borderBottom: '2px solid #a2a9b1',
                position: 'sticky',
                top: 0,
                zIndex: 10,
              }}
            >
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                ⚔️ Classement Militaire
              </h2>
            </div>

            <div style={{ overflow: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead
                  style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#f1f3f4',
                    zIndex: 5,
                  }}
                >
                  <tr>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Rang
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Pays
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Puissance
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Budget
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #a2a9b1',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Forces
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {militaryRankings.map((country, index) => (
                    <tr
                      key={country.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                      }}
                    >
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                          textAlign: 'center',
                        }}
                      >
                        {country.rank}
                      </td>
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                        }}
                      >
                        <span style={{ marginRight: '6px' }}>
                          {country.flag}
                        </span>
                        {country.country}
                      </td>
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                          textAlign: 'right',
                        }}
                      >
                        {country.power}/100
                      </td>
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                          textAlign: 'right',
                        }}
                      >
                        {country.budget}
                      </td>
                      <td
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #a2a9b1',
                          fontSize: '12px',
                          textAlign: 'right',
                        }}
                      >
                        {country.forces}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
