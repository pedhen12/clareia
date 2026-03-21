"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { data } from "@/lib/data";

const subjectInfo = {
  matematica: { 
    name: "Matemática", 
    icon: "🔢",
    color: "from-blue-600 to-blue-700",
    description: "Aprenda álgebra, geometria, estatística e muito mais"
  },
  portugues: { 
    name: "Português", 
    icon: "📖",
    color: "from-green-600 to-green-700",
    description: "Domine literatura, gramática e interpretação de textos"
  },
  historia: { 
    name: "História", 
    icon: "🏛️",
    color: "from-amber-600 to-amber-700",
    description: "Explore a história do Brasil e do mundo"
  },
  geografia: { 
    name: "Geografia", 
    icon: "🌍",
    color: "from-emerald-600 to-emerald-700",
    description: "Aprenda sobre clima, continentes e demografia"
  },
  ingles: { 
    name: "Inglês", 
    icon: "🌐",
    color: "from-purple-600 to-purple-700",
    description: "Desenvolva habilidades em vocabulário e gramática inglesa"
  },
};

export default function SubjectsPage() {
  const params = useParams();
  const subject = params.subject as string;
  const info = subjectInfo[subject as keyof typeof subjectInfo];

  const grades = ["6º ano", "7º ano", "8º ano", "9º ano"] as const;
  const availableGrades = data
    .filter((d) => d.subject === subject)
    .map((d) => d.grade);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/subjects" className="hover:text-blue-400 transition-colors">
              Matérias
            </Link>
            <span>/</span>
            <span className="text-white">{info?.name}</span>
          </nav>
        </div>
      </div>

      {/* Colored Gradient Header Banner */}
      <div className={`bg-gradient-to-r ${info?.color} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-start gap-6">
            <div className="text-7xl">{info?.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {info?.name}
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                {info?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Escolha uma série para começar</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grades.map((grade) => {
            const hasContent = availableGrades.includes(grade);
            const lessonCount = data.find(d => d.subject === subject && d.grade === grade)?.lessons.length || 0;
            return (
              <Link
                key={grade}
                href={
                  hasContent
                    ? `/subjects/${subject}/${grade}`
                    : "#"
                }
                className={hasContent ? "group block" : ""}
              >
                <div
                  className={`border border-slate-700 rounded-lg p-8 text-center transition-all duration-300 ${
                    hasContent
                      ? "bg-slate-800 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer"
                      : "bg-slate-900 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="text-5xl mb-4">📚</div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {grade}
                  </h2>
                  {hasContent ? (
                    <p className="text-slate-400 mb-4">
                      Clique para explorar as aulas
                    </p>
                  ) : (
                    <p className="text-slate-500">Brevemente disponível</p>
                  )}
                  {hasContent && <p className="text-slate-500 text-sm mt-1">{lessonCount} aulas</p>}
                  {hasContent && (
                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                      Iniciar →
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
