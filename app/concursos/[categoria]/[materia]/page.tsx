"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIAS_INFO, concursosData, type CategoriaConcurso } from "@/lib/concursos-data";

export default function MateriaPage() {
  const params = useParams();
  const categoria = params.categoria as CategoriaConcurso;
  const materia = decodeURIComponent(params.materia as string).replace(/-/g, ' ');
  
  const info = CATEGORIAS_INFO[categoria];
  const videoaulas = concursosData.filter(
    (item) => item.categoria === categoria && 
              item.materia.toLowerCase() === materia.toLowerCase() &&
              item.tipo === 'videoaula'
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href={`/concursos/${categoria}`} className="text-slate-400 hover:text-white mb-4 inline-block">
          ← Voltar
        </Link>
        
        <h1 className="text-4xl font-bold mb-2">{info?.icon} {materia}</h1>
        <p className="text-slate-400 mb-8">{info?.nome}</p>

        <div className="space-y-4">
          {videoaulas.map((video) => (
            <Link
              key={video.id}
              href={`/concursos/${categoria}/${params.materia}/${video.id}`}
              className="block bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all"
            >
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-40 h-24 bg-slate-700 rounded-lg flex items-center justify-center">
                  <img 
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                    alt={video.titulo}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{video.titulo}</h3>
                  <p className="text-slate-400 text-sm mb-2">{video.descricao}</p>
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded">📺 {video.duracao} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
