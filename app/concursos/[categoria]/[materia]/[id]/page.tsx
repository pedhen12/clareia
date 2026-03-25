"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIAS_INFO, concursosData, type CategoriaConcurso } from "@/lib/concursos-data";

export default function VideoaulaPage() {
  const params = useParams();
  const categoria = params.categoria as CategoriaConcurso;
  const materia = decodeURIComponent(params.materia as string).replace(/-/g, ' ');
  const videoId = params.id as string;
  
  const [concluido, setConcluido] = useState(false);
  
  const video = concursosData.find((item) => item.id === videoId);
  const info = CATEGORIAS_INFO[categoria];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = `concurso_${categoria}_${materia}_${videoId}`;
      const status = localStorage.getItem(key);
      setConcluido(status === 'concluido');
    }
  }, [categoria, materia, videoId]);

  const marcarConcluido = () => {
    if (typeof window !== 'undefined') {
      const key = `concurso_${categoria}_${materia}_${videoId}`;
      const novoStatus = !concluido;
      if (novoStatus) {
        localStorage.setItem(key, 'concluido');
      } else {
        localStorage.removeItem(key);
      }
      setConcluido(novoStatus);
    }
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vídeo não encontrado</h1>
          <Link href="/concursos" className="text-blue-400 hover:underline">
            ← Voltar para Concursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link 
          href={`/concursos/${categoria}/${params.materia}`} 
          className="text-slate-400 hover:text-white mb-6 inline-block"
        >
          ← Voltar para {materia}
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{info?.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{video.titulo}</h1>
              <p className="text-slate-400">{info?.nome} • {materia}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg overflow-hidden mb-6">
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Sobre esta aula</h2>
              <p className="text-slate-300">{video.descricao}</p>
            </div>
            <button
              onClick={marcarConcluido}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ml-4 ${
                concluido
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {concluido ? '✓ Concluído' : 'Marcar como concluído'}
            </button>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-400 border-t border-slate-700 pt-4">
            <div>
              <span className="font-semibold text-white">Duração:</span> {video.duracao} minutos
            </div>
            <div>
              <span className="font-semibold text-white">Tipo:</span> Videoaula
            </div>
            <div>
              <span className="font-semibold text-white">Categoria:</span> {info?.nome}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Outras aulas de {materia}</h3>
          <div className="space-y-3">
            {concursosData
              .filter(
                (item) =>
                  item.categoria === categoria &&
                  item.materia === materia &&
                  item.tipo === 'videoaula' &&
                  item.id !== videoId
              )
              .slice(0, 5)
              .map((outroVideo) => (
                <Link
                  key={outroVideo.id}
                  href={`/concursos/${categoria}/${params.materia}/${outroVideo.id}`}
                  className="flex gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <img
                    src={`https://img.youtube.com/vi/${outroVideo.videoId}/mqdefault.jpg`}
                    alt={outroVideo.titulo}
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{outroVideo.titulo}</h4>
                    <p className="text-sm text-slate-400 line-clamp-2">{outroVideo.descricao}</p>
                    <span className="text-xs text-slate-500 mt-1 inline-block">
                      {outroVideo.duracao} min
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
