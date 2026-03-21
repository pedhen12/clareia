"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";

const subjectInfo = {
  matematica: {
    name: "Matemática",
    description: "Álgebra, geometria, estatística e mais",
    icon: "📐",
    color: "from-blue-600 to-blue-700",
  },
  portugues: {
    name: "Português",
    description: "Literatura, gramática e interpretação",
    icon: "📖",
    color: "from-green-600 to-green-700",
  },
  historia: {
    name: "História",
    description: "História do Brasil e do mundo",
    icon: "🏛️",
    color: "from-amber-600 to-amber-700",
  },
  geografia: {
    name: "Geografia",
    description: "Clima, continentes e demografia",
    icon: "🌍",
    color: "from-emerald-600 to-emerald-700",
  },
  ingles: {
    name: "Inglês",
    description: "Vocabulário e gramática inglesa",
    icon: "🌐",
    color: "from-purple-600 to-purple-700",
  },
};

export default function Home() {
  const subjects = [
    "matematica",
    "portugues",
    "historia",
    "geografia",
    "ingles",
  ] as const;

  return (
    <>
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 animate-fade-in">
            Bem-vindo ao Clareia ✨
          </h1>
          <p className="text-xl sm:text-2xl text-blue-50 mb-12 max-w-3xl mx-auto">
            Aprenda de forma interativa com aulas em vídeo, quizzes e um tutor de IA inteligente
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/subjects"
              className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              🚀 Começar a Estudar
            </Link>
            <Link
              href="/tutor"
              className="inline-block bg-blue-700 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg border-2 border-white"
            >
              🤖 Falar com o Tutor
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-slate-900 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><p className="text-3xl font-bold text-blue-400">80+</p><p className="text-slate-400 text-sm">Aulas</p></div>
          <div><p className="text-3xl font-bold text-green-400">5</p><p className="text-slate-400 text-sm">Matérias</p></div>
          <div><p className="text-3xl font-bold text-purple-400">4</p><p className="text-slate-400 text-sm">Séries</p></div>
          <div><p className="text-3xl font-bold text-yellow-400">24/7</p><p className="text-slate-400 text-sm">Tutor de IA</p></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ProgressBar />
        
        <h2 className="text-3xl font-bold text-white mb-8 mt-8">Escolha uma Matéria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {subjects.map((subject) => {
            const info = subjectInfo[subject];
            return (
              <Link
                key={subject}
                href={`/subjects/${subject}`}
                className="group block"
              >
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 h-full">
                  <div className="text-5xl mb-3">{info.icon}</div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {info.name}
                  </h2>
                  <p className="text-slate-400 flex-grow">{info.description}</p>
                  <div className="mt-4 text-blue-400 group-hover:text-blue-300 transition-colors font-semibold">
                    Explorar →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Como Funciona?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-start">
              <div className="text-5xl mb-4 p-4 bg-slate-700 rounded-lg">📚</div>
              <h3 className="font-bold text-white mb-2 text-lg">1. Escolha uma matéria</h3>
              <p className="text-slate-400">
                Selecione a disciplina e série que deseja estudar
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-5xl mb-4 p-4 bg-slate-700 rounded-lg">🎥</div>
              <h3 className="font-bold text-white mb-2 text-lg">2. Assista aulas</h3>
              <p className="text-slate-400">
                Aprenda com vídeos educacionais explicativos
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-5xl mb-4 p-4 bg-slate-700 rounded-lg">⭐</div>
              <h3 className="font-bold text-white mb-2 text-lg">3. Faça quizzes</h3>
              <p className="text-slate-400">
                Teste seu conhecimento e ganhe pontos
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-5xl mb-4 p-4 bg-slate-700 rounded-lg">🤖</div>
              <h3 className="font-bold text-white mb-2 text-lg">4. Use o Tutor de IA</h3>
              <p className="text-slate-400">
                Tire dúvidas instantaneamente com nossa IA especializada
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recursos Adicionais</h2>
          <p className="text-slate-300 mb-6">Tem dúvidas? Nosso Tutor de IA está sempre disponível para ajudá-lo!</p>
          <Link
            href="/tutor"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
          >
            🤖 Tutor de IA - Faça perguntas →
          </Link>
        </div>
      </div>
    </>
  );
}
