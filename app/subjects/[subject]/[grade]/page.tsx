"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { data } from "@/lib/data";

const subjectInfo = {
  matematica: { name: "Matemática", icon: "🔢" },
  portugues: { name: "Português", icon: "📖" },
  historia: { name: "História", icon: "🏛️" },
  geografia: { name: "Geografia", icon: "🌍" },
  ingles: { name: "Inglês", icon: "🌐" },
};

export default function GradeLessonsPage() {
  const params = useParams();
  const subject = params.subject as string;
  const grade = decodeURIComponent(params.grade as string);
  const info = subjectInfo[subject as keyof typeof subjectInfo];

  const subjectData = data.find((d) => d.subject === subject && d.grade === grade);
  const lessons = subjectData?.lessons || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href={`/subjects/${subject}`}
          className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block"
        >
          ← Voltar
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">
          {info?.icon} {info?.name} - {grade}
        </h1>
        <p className="text-slate-400">{lessons.length} aulas disponíveis</p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/subjects/${subject}/${grade}/${lesson.id}`}
            className="group block"
          >
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎬</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {lesson.title}
                  </h2>
                  <p className="text-slate-400 mb-2">{lesson.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>⏱️ {lesson.duration} minutos</span>
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                      Começar →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
