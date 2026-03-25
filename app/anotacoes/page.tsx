"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Note = {
  lessonId: string;
  lessonTitle: string;
  subject: string;
  grade: string;
  content: string;
  timestamp: number;
};

export default function AnotacoesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const allNotes: Note[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("note_")) {
        const noteData = localStorage.getItem(key);
        if (noteData) {
          try {
            const note = JSON.parse(noteData);
            allNotes.push(note);
          } catch (e) {
            console.error("Error parsing note:", e);
          }
        }
      }
    }
    allNotes.sort((a, b) => b.timestamp - a.timestamp);
    setNotes(allNotes);
  };

  const deleteNote = (lessonId: string) => {
    if (confirm("Tem certeza que deseja apagar esta anotação?")) {
      localStorage.removeItem(`note_${lessonId}`);
      loadNotes();
    }
  };

  const filteredNotes =
    filter === "all"
      ? notes
      : notes.filter((note) => note.subject === filter);

  const subjects = Array.from(new Set(notes.map((n) => n.subject)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Minhas Anotações ✍️
        </h1>
        <p className="text-slate-400">
          {notes.length === 0
            ? "Você ainda não tem anotações"
            : `${notes.length} anotaç${notes.length > 1 ? "ões" : "ão"} salva${notes.length > 1 ? "s" : ""}`}
        </p>
      </div>

      {notes.length > 0 && (
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Todas
          </button>
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setFilter(subject)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filter === subject
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      )}

      {filteredNotes.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-white mb-2">
            Nenhuma anotação ainda
          </h2>
          <p className="text-slate-400 mb-6">
            Faça anotações durante as aulas para revisá-las depois
          </p>
          <Link
            href="/subjects"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Explorar Aulas →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note.lessonId}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <Link
                    href={`/subjects/${note.subject}/${note.grade}/${note.lessonId}`}
                    className="text-lg font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    {note.lessonTitle}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="capitalize">{note.subject}</span>
                    <span>•</span>
                    <span>{note.grade}º ano</span>
                    <span>•</span>
                    <span>
                      {new Date(note.timestamp).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteNote(note.lessonId)}
                  className="text-red-500 hover:text-red-400 text-sm transition-colors"
                  title="Apagar anotação"
                >
                  🗑️
                </button>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-300 whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
