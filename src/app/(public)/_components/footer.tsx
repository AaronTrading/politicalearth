import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">PE</span>
              </div>
              <span className="text-xl font-bold text-white">
                Political Earth
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              Le centre de commandement pour toutes vos activités géopolitiques.
              Suivez les classements, explorez la carte et restez informé des
              dernières actualités.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/carte"
                  className="hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
                >
                  Carte
                </Link>
              </li>
              <li>
                <Link
                  href="/classement"
                  className="hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
                >
                  Classement
                </Link>
              </li>
              <li>
                <Link
                  href="/actualites"
                  className="hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
                >
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Administration</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
                >
                  🔧 Panel Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Political Earth. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            Serveur géopolitique - Version 1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
