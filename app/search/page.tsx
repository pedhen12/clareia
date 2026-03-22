"use client";

import { useState } from "react";
import Link from "next/link";
import { data } from "@/lib/data";

const subjectInfo = {
  matematica: { name: "Matemática", icon: "📐" },
  portugues: { name: "Português", icon: "📖" },
  historia: { name: "História", icon: "🏛️" },
  geografia: { name: "Geografia", icon: "🌍" },
  ingles: { name: "Inglês", icon: "🌐" },
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  const allLessons = data.flatMap((subjectData) =>
    subjectData.lessons.map((lesson) => ({
      ...lesson,
      subject: subjectData.subject,
      subjectName: subjectInfo[subjectData.subject as keyof typeof subjectInfo]?.name || subjectData.subject,
      subjectIcon: subjectInfo[subjectData.subject as keyof typeof subjectInfo]?.icon || "📚",
      grade: subjectData.grade,
    }))
  );

  const filteredLessons = allLessons.filter((lesson) => {
    // Text search filter
    const matchesSearch = searchQuery.trim() === "" || 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Subject filter
    const matchesSubject = subjectFilter === "all" || lesson.subject === subjectFilter;
    
    // Grade filter
    const matchesGrade = gradeFilter === "all" || lesson.grade === gradeFilter;
    
    return matchesSearch && matchesSubject && matchesGrade;
  });

  const subjectFilters = [
    { id: "all", name: "Todas", icon: "📚" },
    { id: "matematica", name: "Matemática", icon: "📐" },
    { id: "portugues", name: "Português", icon: "📖" },
    { id: "historia", name: "História", icon: "🏛️" },
    { id: "geografia", name: "Geografia", icon: "🌍" },
    { id: "ingles", name: "Inglês", icon: "🌐" },
  ];

  const gradeFilters = [
    { id: "all", name: "Todas" },
    { id: "6º ano", name: "6º ano" },
    { id: "7º ano", name: "7º ano" },
    { id: "8º ano", name: "8º ano" },
    { id: "9º ano", name: "9º ano" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🔍 Buscar Aulas</h1>
        <p className="text-slate-400 mb-6">Pesquise por título, matéria ou tema</p>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite o que você quer aprender..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 pl-12"
            autoFocus
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</div>
        </div>

        {/* Subject Filters */}
        <div className="mb-4">
          <p className="text-sm text-slate-400 mb-2">Matéria</p>
          <div className="flex flex-wrap gap-2">
            {subjectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSubjectFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  subjectFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {filter.icon} {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Filters */}
        <div>
          <p className="text-sm text-slate-400 mb-2">Série</p>
          <div className="flex flex-wrap gap-2">
            {gradeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setGradeFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  gradeFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {searchQuery.trim() === "" && subjectFilter === "all" && gradeFilter === "all" ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-slate-400">Digite algo ou escolha um filtro para começar a busca</p>
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-slate-400">Nenhuma aula encontrada</p>
          <p className="text-slate-500 text-sm mt-2">Tente usar outros filtros ou palavras-chave</p>
        </div>
      ) : (
        <div>
          <p className="text-slate-400 mb-4">
            {filteredLessons.length} {filteredLessons.length === 1 ? "aula encontrada" : "aulas encontradas"}
          </p>
          <div className="space-y-4">
            {filteredLessons.map((lesson) => (
              <Link
                key={`${lesson.subject}-${lesson.grade}-${lesson.id}`}
                href={`/subjects/${lesson.subject}/${lesson.grade}/${lesson.id}`}
                className="group block"
              >
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{lesson.subjectIcon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                          {lesson.subjectIcon} {lesson.subjectName}
                        </span>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                          {lesson.grade}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h2>
                      <p className="text-slate-400 mb-2">{lesson.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>⏱️ {lesson.duration} minutos</span>
                        <span className="text-blue-400 group-hover:text-blue-300 transition-colors">Assistir →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
