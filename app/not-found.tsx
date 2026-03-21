export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-blue-400 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Página não encontrada</h2>
        <p className="text-slate-400 mb-8">Ops! A página que você procura não existe. Que tal explorar nossas matérias?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">🏠 Voltar para Home</a>
          <a href="/subjects" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">📚 Ver Matérias</a>
        </div>
      </div>
    </div>
  );
}
