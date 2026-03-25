export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: {
    completedLessons: number;
    streak: number;
    quizzesTaken: number;
    points: number;
  }) => boolean;
};

export const achievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "Primeira Aula",
    description: "Complete sua primeira aula",
    icon: "🎓",
    condition: (stats) => stats.completedLessons >= 1,
  },
  {
    id: "five-lessons",
    title: "Estudioso",
    description: "Complete 5 aulas",
    icon: "📚",
    condition: (stats) => stats.completedLessons >= 5,
  },
  {
    id: "ten-lessons",
    title: "Dedicado",
    description: "Complete 10 aulas",
    icon: "⭐",
    condition: (stats) => stats.completedLessons >= 10,
  },
  {
    id: "twenty-five-lessons",
    title: "Mestre",
    description: "Complete 25 aulas",
    icon: "👑",
    condition: (stats) => stats.completedLessons >= 25,
  },
  {
    id: "fifty-lessons",
    title: "Lenda",
    description: "Complete 50 aulas",
    icon: "🏆",
    condition: (stats) => stats.completedLessons >= 50,
  },
  {
    id: "streak-3",
    title: "Consistente",
    description: "Estude por 3 dias seguidos",
    icon: "🔥",
    condition: (stats) => stats.streak >= 3,
  },
  {
    id: "streak-7",
    title: "Incansável",
    description: "Estude por 7 dias seguidos",
    icon: "💪",
    condition: (stats) => stats.streak >= 7,
  },
  {
    id: "streak-14",
    title: "Inabalável",
    description: "Estude por 14 dias seguidos",
    icon: "🚀",
    condition: (stats) => stats.streak >= 14,
  },
  {
    id: "points-100",
    title: "Pontuador",
    description: "Alcance 100 pontos",
    icon: "💯",
    condition: (stats) => stats.points >= 100,
  },
  {
    id: "points-500",
    title: "Gênio",
    description: "Alcance 500 pontos",
    icon: "🧠",
    condition: (stats) => stats.points >= 500,
  },
];

export const checkNewAchievements = (stats: {
  completedLessons: number;
  streak: number;
  quizzesTaken: number;
  points: number;
}): Achievement[] => {
  if (typeof window === 'undefined') return [];
  
  const unlockedIds = JSON.parse(
    localStorage.getItem("unlocked_achievements") || "[]"
  );

  const newAchievements = achievements.filter(
    (achievement) =>
      !unlockedIds.includes(achievement.id) && achievement.condition(stats)
  );

  if (newAchievements.length > 0) {
    const updatedUnlocked = [
      ...unlockedIds,
      ...newAchievements.map((a) => a.id),
    ];
    localStorage.setItem(
      "unlocked_achievements",
      JSON.stringify(updatedUnlocked)
    );
  }

  return newAchievements;
};

export const getUnlockedAchievements = (): Achievement[] => {
  if (typeof window === 'undefined') return [];
  
  const unlockedIds = JSON.parse(
    localStorage.getItem("unlocked_achievements") || "[]"
  );
  return achievements.filter((a) => unlockedIds.includes(a.id));
};
