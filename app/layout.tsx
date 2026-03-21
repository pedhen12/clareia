import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Clareia - Plataforma Educacional",
  description: "Aprenda matemática, português, história, geografia e inglês",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>" />
      </head>
      <body className="bg-slate-950 text-white antialiased">
        <Navbar />
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-slate-700 bg-slate-950 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">✨ Clareia</h3>
                  <p className="text-slate-400 text-sm">
                    Plataforma educacional interativa para estudantes brasileiros
                  </p>
                </div>

                {/* Navigation */}
                <div>
                  <h4 className="text-white font-bold mb-4">Navegação</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>
                      <a href="/" className="hover:text-blue-400 transition-colors">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/subjects" className="hover:text-blue-400 transition-colors">
                        Matérias
                      </a>
                    </li>
                    <li>
                      <a href="/tutor" className="hover:text-blue-400 transition-colors">
                        Tutor de IA
                      </a>
                    </li>
                    <li>
                      <a href="/ranking" className="hover:text-blue-400 transition-colors">
                        Ranking
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Subjects */}
                <div>
                  <h4 className="text-white font-bold mb-4">Matérias</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>
                      <a href="/subjects/matematica" className="hover:text-blue-400 transition-colors">
                        📐 Matemática
                      </a>
                    </li>
                    <li>
                      <a href="/subjects/portugues" className="hover:text-blue-400 transition-colors">
                        📖 Português
                      </a>
                    </li>
                    <li>
                      <a href="/subjects/historia" className="hover:text-blue-400 transition-colors">
                        🏛️ História
                      </a>
                    </li>
                    <li>
                      <a href="/subjects/geografia" className="hover:text-blue-400 transition-colors">
                        🌍 Geografia
                      </a>
                    </li>
                    <li>
                      <a href="/subjects/ingles" className="hover:text-blue-400 transition-colors">
                        🌐 Inglês
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-white font-bold mb-4">Sobre</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Clareia é uma plataforma educacional desenvolvida para tornar o aprendizado mais interativo e divertido.
                  </p>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-slate-700 pt-8 text-center">
                <p className="text-slate-400 text-sm">
                  © 2026 Clareia. Feito com ❤️ para estudantes brasileiros.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
