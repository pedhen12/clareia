"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const handleStart = () => {
    if (!name || !grade) {
      alert("Por favor, preencha seu nome e série!");
      return;
    }

    const profile = {
      name,
      grade,
      createdAt: Date.now(),
    };

    localStorage.setItem("user_profile", JSON.stringify(profile));
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vindo ao Clareia! ✨
          </h1>
          <p className="text-slate-400">
            Vamos começar sua jornada de aprendizado
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Qual é o seu nome?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Qual é a sua série?
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Selecione sua série</option>
              <option value="6">6º ano</option>
              <option value="7">7º ano</option>
              <option value="8">8º ano</option>
              <option value="9">9º ano</option>
            </select>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
          >
            Começar a Estudar 🚀
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Uma plataforma educacional brasileira para estudantes do fundamental
          </p>
        </div>
      </div>
    </div>
  );
}
