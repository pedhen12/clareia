"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIAS_INFO, type CategoriaConcurso } from "@/lib/concursos-data";
import { useEffect, useState } from "react";

export default function CategoriaPage() {
  const params = useParams();
  const categoria = params.categoria as CategoriaConcurso;
  const info = CATEGORIAS_INFO[categoria];
  
  const [progressoPorMateria, setProgressoPorMateria] = useState<Record<string, number>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Calcular progresso por matéria
      const respostas = JSON.parse(localStorage.getItem('user_respostas_concursos') || '[]') as { categoria: string; materia: string }[];
      const progresso: Record<string, number> = {};
      
      info?.materias.forEach((materia) => {
        const respostasMateria = respostas.filter(
          (r) => r.categoria === categoria && r.materia === materia
        );
        progresso[materia] = respostasMateria.length;
      });
      
      setProgressoPorMateria(progresso);
    }
  }, [categoria, info]);

  if (!info) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold mb-2">Categoria não encontrada</h1>
          <Link href="/concursos" className="text-blue-400 hover:underline">
            ← Voltar para Concursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/concursos"
            className="text-slate-400 hover:text-white mb-4 inline-flex items-center gap-2"
          >
            ← Voltar para Concursos
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{info.icon}</div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                {info.nome}
              </h1>
              <p className="text-xl text-slate-300 mt-2">{info.descricao}</p>
            </div>
          </div>
        </div>

        {/* Matérias */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Escolha a Matéria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.materias.map((materia) => {
              const questoesResolvidas = progressoPorMateria[materia] || 0;
              
              return (
                <Link
                  key={materia}
                  href={`/concursos/${categoria}/${materia.toLowerCase().replace(/ /g, '-')}`}
                  className="group bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-500 transition-all hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                    {materia}
                  </h3>
                  
                  {questoesResolvidas > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-slate-400 mb-2">
                        <span>Progresso</span>
                        <span>{questoesResolvidas} questões</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${info.cor} h-2 rounded-full transition-all`}
                          style={{ width: `${Math.min((questoesResolvidas / 50) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-slate-700 px-3 py-1 rounded-full">📺 Vídeos</span>
                    <span className="text-xs bg-slate-700 px-3 py-1 rounded-full">📝 Questões</span>
                    <span className="text-xs bg-slate-700 px-3 py-1 rounded-full">⏱️ Simulados</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold mb-4">💡 Dica de Estudo</h3>
          <p className="text-slate-300 leading-relaxed">
            {categoria === 'enem' && "Para o ENEM, foque em interpretar textos e resolver questões interdisciplinares. Pratique redação semanalmente!"}
            {categoria === 'vestibular' && "Vestibulares exigem conhecimento aprofundado. Estude teoria e pratique muitas questões de provas anteriores!"}
            {categoria === 'federal' && "Concursos federais costumam ter bancas como CESPE e FCC. Conheça o estilo de cada uma praticando questões!"}
            {categoria === 'estadual' && "Concursos estaduais variam por estado. Foque nas matérias básicas e conhecimentos específicos do cargo!"}
            {categoria === 'municipal' && "Concursos municipais são ótima porta de entrada. Estude português, matemática e conhecimentos gerais!"}
            {categoria === 'tribunais' && "Tribunais exigem muito direito. Foque em Constitucional e Administrativo, além de português e informática!"}
            {categoria === 'militar' && "Carreira militar requer disciplina. Estude matemática, física e português com rigor. Faça muitos simulados!"}
          </p>
        </div>
      </div>
    </div>
  );
}
