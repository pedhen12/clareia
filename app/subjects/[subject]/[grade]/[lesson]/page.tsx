"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { data } from "@/lib/data";
import { useEffect, useState } from "react";

const subjectInfo = {
  matematica: { name: "Matemática", icon: "🔢" },
  portugues: { name: "Português", icon: "📖" },
  historia: { name: "História", icon: "🏛️" },
  geografia: { name: "Geografia", icon: "🌍" },
  ingles: { name: "Inglês", icon: "🌐" },
};

export default function LessonPage() {
  const params = useParams();
  const subject = params.subject as string;
  const grade = decodeURIComponent(params.grade as string);
  const lessonId = params.lesson as string;
  const info = subjectInfo[subject as keyof typeof subjectInfo];

  const [isCompleted, setIsCompleted] = useState(false);

  const subjectData = data.find((d) => d.subject === subject && d.grade === grade);
  const lesson = subjectData?.lessons.find((l) => l.id === lessonId);

  useEffect(() => {
    // Check if lesson is completed
    const progress = JSON.parse(localStorage.getItem("user_progress") || "{}");
    setIsCompleted(progress.completedLessons?.includes(lessonId) || false);
  }, [lessonId]);

  const handleLessonComplete = () => {
    const progress = JSON.parse(localStorage.getItem("user_progress") || "{}");
    if (!progress.completedLessons) progress.completedLessons = [];
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      localStorage.setItem("user_progress", JSON.stringify(progress));
      setIsCompleted(true);
    }
  };

  if (!lesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-slate-400">Aula não encontrada</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href={`/subjects/${subject}/${grade}`}
          className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block"
        >
          ← Voltar
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">
          {info?.icon} {lesson.title}
        </h1>
        <p className="text-slate-400">{lesson.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden mb-6">
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${lesson.videoId}`}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Sobre esta aula</h2>
            <div className="flex items-center gap-4 text-slate-400 mb-6">
              <span>⏱️ Duração: {lesson.duration} minutos</span>
              <span>📚 {grade}</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {lesson.description}
            </p>

            {isCompleted && (
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-6 text-green-400 flex items-center gap-2">
                <span>✓</span> Aula marcada como concluída
              </div>
            )}

            <button
              onClick={handleLessonComplete}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mb-4"
            >
              {isCompleted ? "✓ Aula Concluída" : "Marcar como Concluída"}
            </button>

            <Link
              href={`/subjects/${subject}/${grade}/${lessonId}/quiz`}
              className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors text-center"
            >
              Ir para Quiz →
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Próximos Passos</h3>
            <ol className="space-y-3 text-slate-400">
              <li className={`flex gap-3 ${isCompleted ? "text-green-400" : ""}`}>
                <span>1.</span>
                <span>{isCompleted ? "✓" : ""} Assistir a aula</span>
              </li>
              <li className="flex gap-3">
                <span>2.</span>
                <span>Fazer o quiz</span>
              </li>
              <li className="flex gap-3">
                <span>3.</span>
                <span>Ganhar pontos</span>
              </li>
              <li className="flex gap-3">
                <span>4.</span>
                <span>Use o Tutor de IA para tirar dúvidas</span>
              </li>
            </ol>
          </div>

          <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Dica de Estudo</h3>
            <p className="text-slate-400 text-sm">
              Assista à aula completa e anote os pontos importantes antes de fazer o quiz. Isso vai ajudar você a se lembrar melhor do conteúdo!
            </p>
            <div className="mt-4">
              <Link href="/tutor" className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-colors text-center text-sm">
                🤖 Perguntar ao Tutor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
