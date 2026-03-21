'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  const getLinkClasses = (href: string) => {
    const baseClasses = "text-slate-300 hover:text-white transition-colors font-medium";
    const activeClasses = "text-blue-400 border-b-2 border-blue-400";
    return isActive(href) ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  const getMobileLinkClasses = (href: string) => {
    const baseClasses = "block text-slate-300 hover:text-white transition-colors font-medium py-2";
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
          <Link href="/tutor" className={getLinkClasses("/tutor")}>
            Tutor de IA
          </Link>
          <Link href="/ranking" className={getLinkClasses("/ranking")}>
            Ranking
          </Link>
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
        <div className="md:hidden bg-slate-900 border-t border-slate-700 py-4 px-4 space-y-3">
          <Link
            href="/"
            className={getMobileLinkClasses("/")}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/subjects"
            className={getMobileLinkClasses("/subjects")}
            onClick={() => setIsOpen(false)}
          >
            Matérias
          </Link>
          <Link
            href="/tutor"
            className={getMobileLinkClasses("/tutor")}
            onClick={() => setIsOpen(false)}
          >
            Tutor de IA
          </Link>
          <Link
            href="/ranking"
            className={getMobileLinkClasses("/ranking")}
            onClick={() => setIsOpen(false)}
          >
            Ranking
          </Link>
        </div>
      )}
    </nav>
  );
}
