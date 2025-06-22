'use client';

import { signIn, signOut, useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Composant AuthButton
const AuthButton: React.FC = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          color: '#6b7280',
        }}
      >
        Chargement...
      </div>
    );
  }

  if (session) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Link
          href="/dashboard"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#10b981',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
          Dashboard
        </Link>
        <button
          onClick={() => signOut()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn.social({ provider: 'discord' })}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#4752c4';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#5865f2';
      }}
    >
      🎮 Connexion
    </button>
  );
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const [gameDate, setGameDate] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchGameDate = async () => {
      try {
        const response = await fetch('/api/game-date');
        const data = await response.json();
        if (data && data.date) {
          setGameDate(data.date);
        } else {
          setGameDate('2077');
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la date:', error);
        setGameDate('2077');
      }
    };

    fetchGameDate();
  }, []);

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  const displayDate = mounted ? gameDate || '2077' : '2077';

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/carte', label: 'Carte' },
    { href: '/classement', label: 'Classement' },
    { href: '/actualites', label: 'Actualités' },
    { href: '/admin', label: '🔧 Admin' },
  ];

  return (
    <header
      style={{
        width: '100%',
        backgroundColor: 'white',
        boxShadow:
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        borderBottom: '4px solid #d1d5db',
        padding: '1rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div>
          <Link
            href="/"
            style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#1f2937',
              textDecoration: 'none',
            }}
          >
            Political Earth
          </Link>
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: pathname === link.href ? '#111827' : '#4b5563',
                backgroundColor:
                  pathname === link.href ? '#f3f4f6' : 'transparent',
                boxShadow:
                  pathname === link.href
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    : 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.color = '#111827';
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.color = '#4b5563';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth & Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AuthButton />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f3f4f6',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <span
              style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#1f2937',
              }}
            >
              📅 {displayDate}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
