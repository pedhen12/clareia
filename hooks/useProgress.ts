import { useState, useEffect } from 'react';

const STORAGE_KEY = 'clareia_progress';

interface Progress {
  points: number;
  completedLessons: string[];
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({
    points: 0,
    completedLessons: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {
        console.error('Failed to parse saved progress');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const addPoints = (points: number) => {
    setProgress((prev) => ({
      ...prev,
      points: prev.points + points,
    }));
  };

  const completeLesson = (lessonId: string) => {
    setProgress((prev) => {
      const newLessons = Array.from(new Set([...prev.completedLessons, lessonId]));
      return {
        ...prev,
        completedLessons: newLessons,
      };
    });
  };

  const resetProgress = () => {
    setProgress({
      points: 0,
      completedLessons: [],
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    progress,
    addPoints,
    completeLesson,
    resetProgress,
    isLoaded,
  };
}
