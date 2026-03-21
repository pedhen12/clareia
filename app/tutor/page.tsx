"use client";

import Link from "next/link";
import { AiTutor } from "@/components/AiTutor";

export default function TutorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 h-screen flex flex-col">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block"
        >
          ← Voltar
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">🤖 Tutor de IA</h1>
        <p className="text-slate-400">
          Faça perguntas sobre qualquer tópico que está estudando
        </p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex-1 flex flex-col min-h-0">
        <AiTutor />
      </div>
    </div>
  );
}
