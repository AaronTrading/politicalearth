'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const gameDate = '01/01/2077'; // Placeholder

  const navLinks = [
    { href: '/carte', label: 'Carte' },
    { href: '/classement', label: 'Classement' },
    { href: '/actualites', label: 'Actualités' },
  ];

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link href="/carte">GéoPols</Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-white ${
                pathname === link.href ? 'text-white' : 'text-gray-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-lg bg-gray-800/50 px-4 py-2 rounded-lg">
          <span className="text-gray-400">Date : </span>
          <span className="font-semibold">{gameDate}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
