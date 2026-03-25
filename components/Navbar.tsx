'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserMenu } from '@/components/AuthButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const pathname = usePathname();
  const { user, isAuthenticated, loading } = useAuth();

  // Load theme on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const getLinkClasses = (href: string) => {
    const baseClasses = "text-slate-300 hover:text-white transition-colors font-medium";
    const activeClasses = "text-blue-400 border-b-2 border-blue-400";
    return isActive(href) ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-blue-400 transition-colors">
          ✨ Clareia
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={getLinkClasses("/")}>
            Home
          </Link>
          <Link href="/subjects" className={getLinkClasses("/subjects")}>
            Matérias
          </Link>
          <Link href="/search" className={getLinkClasses("/search")}>
            🔍 Buscar
          </Link>
          <Link href="/favoritas" className={getLinkClasses("/favoritas")}>
            ❤️ Favoritas
          </Link>
          <Link href="/conquistas" className={getLinkClasses("/conquistas")}>
            🏆 Conquistas
          </Link>
          <Link href="/anotacoes" className={getLinkClasses("/anotacoes")}>
            📝 Anotações
          </Link>
          <Link href="/tutor" className={getLinkClasses("/tutor")}>
            Tutor de IA
          </Link>
          <Link href="/ranking" className={getLinkClasses("/ranking")}>
            Ranking
          </Link>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          {/* Auth-based menu */}
          {!loading && (
            <>
              {isAuthenticated && user ? (
                <UserMenu user={{
                  email: user.email,
                  name: user.user_metadata?.name || user.email?.split('@')[0],
                  avatar_url: user.user_metadata?.avatar_url
                }} />
              ) : (
                <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Entrar
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700 py-4 px-4">
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">🏠</span>
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link
              href="/subjects"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isActive("/subjects")
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium">Matérias</span>
            </Link>
            <Link
              href="/search"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isActive("/search")
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">🔍</span>
              <span className="text-sm font-medium">Buscar</span>
            </Link>
            <Link
              href="/favoritas"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isActive("/favoritas")
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">❤️</span>
              <span className="text-sm font-medium">Favoritas</span>
            </Link>
            <Link
              href="/conquistas"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isActive("/conquistas")
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium">Conquistas</span>
            </Link>
            <Link
              href="/tutor"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isActive("/tutor")
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">🤖</span>
              <span className="text-sm font-medium">Tutor IA</span>
            </Link>
            <Link
              href="/ranking"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isActive("/ranking")
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium">Ranking</span>
            </Link>
            
            {!loading && (
              isAuthenticated ? (
                <Link
                  href="/perfil"
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                    isActive("/perfil")
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-2xl">👤</span>
                  <span className="text-sm font-medium">Perfil</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-2xl">🔐</span>
                  <span className="text-sm font-medium">Entrar</span>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
