'use client';

export function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-white mb-4">Carregando...</h2>
        <LoadingSpinner />
      </div>
    </div>
  );
}
