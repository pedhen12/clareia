"use client";

import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export interface QuizAttempt {
  lesson_id: string;
  score: number;
  total_questions: number;
  completed_at: string;
}

export function useQuizAttempts() {
  const { user, isAuthenticated } = useAuth();

  const saveQuizAttempt = async (lessonId: string, score: number, totalQuestions: number) => {
    if (!isAuthenticated || !user) {
      // Update localStorage
      const progress = JSON.parse(localStorage.getItem("user_progress") || "{}");
      const points = progress.points || 0;
      const pointsEarned = score * 10;
      progress.points = points + pointsEarned;
      localStorage.setItem("user_progress", JSON.stringify(progress));
      return { success: true, pointsEarned };
    }

    try {
      // Save quiz attempt
      const { error: quizError } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          lesson_id: lessonId,
          score,
          total_questions: totalQuestions,
        });

      if (quizError) throw quizError;

      // Calculate points (10 points per correct answer)
      const pointsEarned = score * 10;

      // Get current points and update
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', user.id)
        .single();

      const currentPoints = currentProfile?.points || 0;

      const { error: pointsError } = await supabase
        .from('profiles')
        .update({ points: currentPoints + pointsEarned })
        .eq('id', user.id);

      if (pointsError) throw pointsError;

      return { success: true, pointsEarned };
    } catch (err) {
      console.error('Error saving quiz attempt:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  const getQuizHistory = async (lessonId?: string) => {
    if (!isAuthenticated || !user) {
      return { data: [], error: null };
    }

    try {
      let query = supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (lessonId) {
        query = query.eq('lesson_id', lessonId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error('Error loading quiz history:', err);
      return { data: [], error: (err as Error).message };
    }
  };

  return {
    saveQuizAttempt,
    getQuizHistory,
  };
}
