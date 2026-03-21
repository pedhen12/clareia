import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[150px] font-bold text-blue-500 leading-none">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-lg md:text-xl text-slate-400 mb-8">
          A página que você procura não existe.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            Voltar para Home
          </Link>
          <Link
            href="/subjects"
            className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg border border-slate-700"
          >
            Explorar Matérias
          </Link>
        </div>

        <div className="text-5xl">😕</div>
      </div>
    </div>
  );
}
