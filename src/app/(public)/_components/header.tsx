import Link from "next/link";

import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "Carte" },
  { href: "/classement", label: "Classement" },
  { href: "/actualites", label: "Actualités" },
  { href: "/admin", label: "🔧 Admin" },
];

export const Header = async () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-gray-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PE</span>
            </div>
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 tracking-tight hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-md"
            >
              Political Earth
            </Link>
          </div>

          <nav
            className="hidden md:block"
            role="navigation"
            aria-label="Navigation principale"
          >
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

// <GameDateDisplay gameDate={gameDate} />
