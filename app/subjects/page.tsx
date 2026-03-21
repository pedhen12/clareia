"use client";

import Link from "next/link";

const subjectInfo = {
  matematica: {
    name: "Matemática",
    description: "Álgebra, geometria, estatística e mais",
    icon: "📐",
  },
  portugues: {
    name: "Português",
    description: "Literatura, gramática e interpretação",
    icon: "📖",
  },
  historia: {
    name: "História",
    description: "História do Brasil e do mundo",
    icon: "🏛️",
  },
  geografia: {
    name: "Geografia",
    description: "Clima, continentes e demografia",
    icon: "🌍",
  },
  ingles: {
    name: "Inglês",
    description: "Vocabulário e gramática inglesa",
    icon: "🌐",
  },
};

export default function SubjectsPage() {
  const subjects = [
    "matematica",
    "portugues",
    "historia",
    "geografia",
    "ingles",
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Todas as Matérias
          </h1>
          <p className="text-xl text-slate-300">
            Escolha uma disciplina para começar
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
