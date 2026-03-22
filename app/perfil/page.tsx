"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { data } from "@/lib/data";

const subjectInfo = {
  matematica: { name: "Matemática", icon: "📐" },
  portugues: { name: "Português", icon: "📖" },
  historia: { name: "História", icon: "🏛️" },
  geografia: { name: "Geografia", icon: "🌍" },
  ingles: { name: "Inglês", icon: "🌐" },
};

export default function PerfilPage() {
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [studyDays, setStudyDays] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempGrade, setTempGrade] = useState("");

  useEffect(() => {
    // Load from localStorage
    const profile = JSON.parse(localStorage.getItem("student_profile") || "{}");
    const progress = JSON.parse(localStorage.getItem("user_progress") || "{}");
    
    setStudentName(profile.name || "Estudante");
    setStudentGrade(profile.grade || "6º ano");
    setTempName(profile.name || "");
    setTempGrade(profile.grade || "6º ano");
    setCompletedLessons(progress.completedLessons || []);
    setStudyDays(progress.studyDays || []);
    setPoints(progress.points || 0);
  }, []);

  const handleSaveProfile = () => {
    const profile = { name: tempName, grade: tempGrade };
    localStorage.setItem("student_profile", JSON.stringify(profile));
    setStudentName(tempName || "Estudante");
    setStudentGrade(tempGrade);
    setIsEditing(false);
  };

  // Calculate streak
  const calculateStreak = () => {
    if (studyDays.length === 0) return 0;
    const sortedDays = [...studyDays].sort().reverse();
    
    let streak = 0;
    
    for (let i = 0; i < sortedDays.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      
      if (sortedDays[i] === expectedDateStr) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Generate last 30 days for calendar
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const studied = studyDays.includes(dateStr);
      
      days.push({
        date: dateStr,
        day: date.getDate(),
        studied,
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const streak = calculateStreak();

  // Get lesson details for completed lessons
  const allLessons = data.flatMap((subjectData) =>
    subjectData.lessons.map((lesson) => ({
      ...lesson,
      subject: subjectData.subject,
      subjectName: subjectInfo[subjectData.subject as keyof typeof subjectInfo]?.name || subjectData.subject,
      subjectIcon: subjectInfo[subjectData.subject as keyof typeof subjectInfo]?.icon || "📚",
      grade: subjectData.grade,
    }))
  );

  const completedLessonDetails = allLessons.filter((lesson) =>
    completedLessons.includes(lesson.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">👤 Meu Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Informações</h2>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Nome</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Série</label>
                <select
                  value={tempGrade}
                  onChange={(e) => setTempGrade(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="6º ano">6º ano</option>
                  <option value="7º ano">7º ano</option>
                  <option value="8º ano">8º ano</option>
                  <option value="9º ano">9º ano</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <p className="text-sm text-slate-400">Nome</p>
                <p className="text-lg text-white font-bold">{studentName}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-400">Série</p>
                <p className="text-lg text-white font-bold">{studentGrade}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Editar Perfil
              </button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Estatísticas</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">🎯 Aulas Concluídas</span>
              <span className="text-2xl font-bold text-white">{completedLessons.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">⭐ Pontos</span>
              <span className="text-2xl font-bold text-yellow-400">{points}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">🔥 Sequência</span>
              <span className="text-2xl font-bold text-orange-400">{streak} dias</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>
          <div className="space-y-3">
            <Link
              href="/subjects"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors text-center"
            >
              📚 Ver Matérias
            </Link>
            <Link
              href="/search"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors text-center"
            >
              🔍 Buscar Aulas
            </Link>
            <Link
              href="/tutor"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors text-center"
            >
              🤖 Tutor de IA
            </Link>
          </div>
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">📅 Calendário de Estudos (Últimos 30 dias)</h2>
        <div className="grid grid-cols-10 gap-2">
          {calendarDays.map((day) => (
            <div
              key={day.date}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                day.studied
                  ? "bg-green-600 text-white"
                  : "bg-slate-700 text-slate-500"
              }`}
              title={day.date}
            >
              {day.day}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-600"></div>
            <span className="text-slate-400">Estudou</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-700"></div>
            <span className="text-slate-400">Não estudou</span>
          </div>
        </div>
      </div>

      {/* Recent Completed Lessons */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">📚 Aulas Concluídas Recentemente</h2>
        {completedLessonDetails.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            Você ainda não completou nenhuma aula. Comece a estudar!
          </p>
        ) : (
          <div className="space-y-3">
            {completedLessonDetails.slice(-5).reverse().map((lesson) => (
              <Link
                key={lesson.id}
                href={`/subjects/${lesson.subject}/${lesson.grade}/${lesson.id}`}
                className="block bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{lesson.subjectIcon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">
                        {lesson.subjectName}
                      </span>
                      <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">
                        {lesson.grade}
                      </span>
                    </div>
                    <p className="font-bold text-white truncate">{lesson.title}</p>
                  </div>
                  <div className="text-green-400">✓</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
