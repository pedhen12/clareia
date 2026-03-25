"use client";

import { useEffect, useState } from "react";
import { achievements, getUnlockedAchievements } from "@/lib/achievements";
import { useProfile } from "@/hooks/useProfile";
import { useCompletedLessons } from "@/hooks/useCompletedLessons";

export default function ConquistasPage() {
  const { profile } = useProfile();
  const { completedLessons } = useCompletedLessons();
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    const unlocked = getUnlockedAchievements();
    setUnlockedAchievements(unlocked.map((a) => a.id));
  }, []);

  const calculateStreak = () => {
    if (typeof window === 'undefined') return 0;
    const studyDays = JSON.parse(localStorage.getItem("study_days") || "[]");
    if (studyDays.length === 0) return 0;
    const sortedDays = [...studyDays].sort().reverse();
    let streak = 0;

    for (let i = 0; i < sortedDays.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split("T")[0];

      if (sortedDays[i] === expectedDateStr) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const stats = {
    completedLessons: completedLessons.length,
    streak: calculateStreak(),
    quizzesTaken: 0,
    points: profile?.points || 0,
  };

  const getProgress = (achievement: typeof achievements[0]) => {
    if (achievement.id.includes("lesson")) {
      const target = parseInt(achievement.id.split("-")[0]);
      return Math.min(100, (stats.completedLessons / target) * 100);
    }
    if (achievement.id.includes("streak")) {
      const target = parseInt(achievement.id.split("-")[1]);
      return Math.min(100, (stats.streak / target) * 100);
    }
    if (achievement.id.includes("points")) {
      const target = parseInt(achievement.id.split("-")[1]);
      return Math.min(100, (stats.points / target) * 100);
    }
    return 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Conquistas 🏆
        </h1>
        <p className="text-slate-400">
          {unlockedAchievements.length} de {achievements.length} desbloqueadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          const progress = getProgress(achievement);

          return (
            <div
              key={achievement.id}
              className={`rounded-lg p-6 border transition-all ${
                isUnlocked
                  ? "bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-600/50 shadow-lg shadow-yellow-600/10"
                  : "bg-slate-800 border-slate-700 opacity-60"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`text-5xl transition-all ${
                    isUnlocked ? "scale-110" : "grayscale opacity-50"
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {!isUnlocked && progress > 0 && (
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Progresso</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {isUnlocked && (
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
                  <span>✓</span>
                  <span>Desbloqueada!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
