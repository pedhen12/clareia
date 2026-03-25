"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { data } from "@/lib/data";

type FavoriteLesson = {
  lessonId: string;
  subject: string;
  grade: string;
  title: string;
  description: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteLesson[]>([]);

  useEffect(() => {
    const favIds = JSON.parse(
      localStorage.getItem("favorite_lessons") || "[]"
    );
    const favLessons: FavoriteLesson[] = [];

    data.forEach((subjectData) => {
      subjectData.lessons.forEach((lesson) => {
        if (favIds.includes(lesson.id)) {
          favLessons.push({
            lessonId: lesson.id,
            subject: subjectData.subject,
            grade: subjectData.grade,
            title: lesson.title,
            description: lesson.description,
          });
        }
      });
    });

    setFavorites(favLessons);
  }, []);

  const removeFavorite = (lessonId: string) => {
    const favIds = JSON.parse(
      localStorage.getItem("favorite_lessons") || "[]"
    );
    const updated = favIds.filter((id: string) => id !== lessonId);
    localStorage.setItem("favorite_lessons", JSON.stringify(updated));
    setFavorites(favorites.filter((f) => f.lessonId !== lessonId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Aulas Favoritas ❤️
        </h1>
        <p className="text-slate-400">
          {favorites.length === 0
            ? "Você ainda não tem aulas favoritas"
            : `${favorites.length} aula${favorites.length > 1 ? "s" : ""} salva${favorites.length > 1 ? "s" : ""}`}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">🤍</div>
          <h2 className="text-xl font-bold text-white mb-2">
            Nenhuma aula favorita ainda
          </h2>
          <p className="text-slate-400 mb-6">
            Favorite aulas para acessá-las rapidamente aqui
          </p>
          <Link
            href="/subjects"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Explorar Matérias →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav.lessonId}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">📚</div>
                <button
                  onClick={() => removeFavorite(fav.lessonId)}
                  className="text-red-500 hover:text-red-400 text-2xl transition-colors"
                  title="Remover dos favoritos"
                >
                  ❤️
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {fav.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{fav.description}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <span className="capitalize">{fav.subject}</span>
                <span>•</span>
                <span>{fav.grade}º ano</span>
              </div>
              <Link
                href={`/subjects/${fav.subject}/${fav.grade}/${fav.lessonId}`}
                className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Assistir Aula →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
