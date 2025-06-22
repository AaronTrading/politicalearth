'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [gameDate, setGameDate] = useState('2077');

  useEffect(() => {
    const fetchGameDate = async () => {
      try {
        const response = await fetch('/api/game-date');
        const data = await response.json();
        if (data && data.date) {
          setGameDate(data.date);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la date:', error);
      }
    };

    fetchGameDate();
  }, []);

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

        {/* Date */}
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
            📅 {gameDate}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
