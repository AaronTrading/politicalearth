'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
  nation?: string;
  pib?: number;
}

export default function DashboardPanel() {
  const { data: session, isPending } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/');
      return;
    }

    if (session?.user) {
      setUserData(session.user as UserData);
      setLoading(false);
    }
  }, [session, isPending, router]);

  if (isPending || loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h2>Chargement de votre dashboard...</h2>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
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
          🏛️ Dashboard Politique
        </h1>

        {/* Carte de profil */}
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            {userData?.image && (
              <img
                src={userData.image}
                alt="Avatar"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '3px solid #007bff',
                }}
              />
            )}
            <div>
              <h2
                style={{ fontSize: '24px', marginBottom: '8px', color: '#333' }}
              >
                {userData?.name || 'Utilisateur'}
              </h2>
              <p style={{ color: '#666', marginBottom: '4px' }}>
                📧 {userData?.email}
              </p>
              <p style={{ color: '#666', fontSize: '14px' }}>
                🆔 ID: {userData?.id}
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Carte Nation */}
            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #e9ecef',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  marginBottom: '12px',
                  color: '#333',
                }}
              >
                🏴 Nation
              </h3>
              {userData?.nation ? (
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#28a745',
                  }}
                >
                  {userData.nation}
                </p>
              ) : (
                <p style={{ color: '#dc3545', fontStyle: 'italic' }}>
                  Aucune nation attribuée
                </p>
              )}
              <p
                style={{ fontSize: '12px', color: '#6c757d', marginTop: '8px' }}
              >
                Votre nation sera attribuée par un administrateur
              </p>
            </div>

            {/* Carte PIB */}
            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #e9ecef',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  marginBottom: '12px',
                  color: '#333',
                }}
              >
                💰 PIB
              </h3>
              {userData?.pib ? (
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#28a745',
                  }}
                >
                  {userData.pib.toLocaleString()} M€
                </p>
              ) : (
                <p style={{ color: '#dc3545', fontStyle: 'italic' }}>
                  PIB non défini
                </p>
              )}
              <p
                style={{ fontSize: '12px', color: '#6c757d', marginTop: '8px' }}
              >
                Votre PIB sera défini par un administrateur
              </p>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            📋 Informations du Serveur
          </h2>

          <div
            style={{
              backgroundColor: '#e3f2fd',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #bbdefb',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                marginBottom: '12px',
                color: '#1976d2',
              }}
            >
              🎮 Bienvenue sur Political Earth !
            </h3>
            <p style={{ lineHeight: '1.6', color: '#333' }}>
              Vous êtes maintenant connecté au serveur géopolitique Political
              Earth. Un administrateur va bientôt vous attribuer une nation et
              définir votre PIB de départ. En attendant, vous pouvez explorer le
              site et consulter les actualités et classements.
            </p>
          </div>

          {(!userData?.nation || !userData?.pib) && (
            <div
              style={{
                backgroundColor: '#fff3cd',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #ffeaa7',
                marginTop: '20px',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  marginBottom: '12px',
                  color: '#856404',
                }}
              >
                ⏳ En attente d&apos;attribution
              </h3>
              <p style={{ lineHeight: '1.6', color: '#856404' }}>
                Votre profil est en cours de configuration. Un administrateur va
                vous attribuer une nation et définir votre PIB initial. Vous
                recevrez une notification une fois ces éléments configurés.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
