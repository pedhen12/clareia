"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">😵</div>
        <h1 className="text-4xl font-bold text-white mb-4">Algo deu errado!</h1>
        <p className="text-slate-400 mb-8">Não se preocupe, isso acontece às vezes. Tente novamente!</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            🔄 Tentar novamente
          </button>
          <Link href="/" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            🏠 Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
