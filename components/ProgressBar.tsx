"use client";

import { useProgress } from "@/hooks/useProgress";

export function ProgressBar() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
        <div className="animate-pulse">
          <p className="text-slate-400 text-sm">Seu Progresso</p>
          <p className="text-white font-bold">Carregando...</p>
        </div>
        <div className="text-3xl">⭐</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm">Seu Progresso</p>
        <p className="text-white font-bold">
          {progress.completedLessons.length} aulas concluídas • {progress.points} pontos
        </p>
      </div>
      <div className="text-3xl">⭐</div>
    </div>
  );
}
