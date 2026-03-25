"use client";

import Link from "next/link";
import { CATEGORIAS_INFO, type CategoriaConcurso } from "@/lib/concursos-data";
import { useEffect, useState } from "react";

export default function ConcursosPage() {
  const [questoesResolvidas, setQuestoesResolvidas] = useState(0);
  const [simuladosFeitos, setSimuladosFeitos] = useState(0);
  const [tempoEstudo, setTempoEstudo] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Carregar estatísticas do localStorage
      const respostas = JSON.parse(localStorage.getItem('user_respostas_concursos') || '[]');
      const simulados = JSON.parse(localStorage.getItem('simulados_concursos') || '[]') as { concluido: boolean }[];
      
      setQuestoesResolvidas(respostas.length);
      setSimuladosFeitos(simulados.filter((s) => s.concluido).length);
      
      // Calcular tempo total (mockado por enquanto)
      setTempoEstudo(Math.floor((respostas.length * 2 + simulados.length * 60) / 60));
    }
  }, []);

  const categorias = Object.entries(CATEGORIAS_INFO) as [CategoriaConcurso, typeof CATEGORIAS_INFO[CategoriaConcurso]][];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            🎓 Preparação para Concursos
          </h1>
          <p className="text-xl text-slate-300">
            Estude para vestibulares, ENEM e concursos públicos
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📝</div>
              <div>
                <div className="text-3xl font-bold text-blue-400">{questoesResolvidas}</div>
                <div className="text-slate-400">Questões Resolvidas</div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⏱️</div>
              <div>
                <div className="text-3xl font-bold text-green-400">{simuladosFeitos}</div>
                <div className="text-slate-400">Simulados Completos</div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🕐</div>
              <div>
                <div className="text-3xl font-bold text-purple-400">{tempoEstudo}h</div>
                <div className="text-slate-400">Tempo de Estudo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Escolha sua Área de Estudo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorias.map(([key, info]) => (
              <Link
                key={key}
                href={`/concursos/${key}`}
                className="group bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-500 transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className={`text-6xl mb-4 group-hover:scale-110 transition-transform`}>
                  {info.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-yellow-400 group-hover:to-purple-400">
                  {info.nome}
                </h3>
                <p className="text-slate-400 mb-4">{info.descricao}</p>
                <div className="flex flex-wrap gap-2">
                  {info.materias.slice(0, 3).map((materia) => (
                    <span
                      key={materia}
                      className="text-xs bg-slate-700 px-2 py-1 rounded-full text-slate-300"
                    >
                      {materia}
                    </span>
                  ))}
                  {info.materias.length > 3 && (
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded-full text-slate-300">
                      +{info.materias.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-8 text-center border border-purple-500">
          <h3 className="text-3xl font-bold mb-4">✨ Recursos Disponíveis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-3xl mb-2">📺</div>
              <div className="font-bold">Videoaulas</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-3xl mb-2">📝</div>
              <div className="font-bold">Questões</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="font-bold">Simulados</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-3xl mb-2">📄</div>
              <div className="font-bold">Materiais</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
