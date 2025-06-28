"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "Carte" },
  { href: "/classement", label: "Classement" },
  { href: "/actualites", label: "Actualités" },
  { href: "/admin", label: "🔧 Admin" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-md"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <nav className="px-6 py-4">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
