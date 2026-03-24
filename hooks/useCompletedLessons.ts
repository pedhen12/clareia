"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export function useCompletedLessons() {
  const { user, isAuthenticated } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [studyDays, setStudyDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load completed lessons and study days
  useEffect(() => {
    if (!isAuthenticated || !user) {
      // Fallback to localStorage
      const progress = JSON.parse(localStorage.getItem("user_progress") || "{}");
      setCompletedLessons(progress.completedLessons || []);
      setStudyDays(progress.studyDays || []);
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        // Load completed lessons
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('completed_lessons')
          .select('lesson_id')
          .eq('user_id', user!.id);

        if (lessonsError) throw lessonsError;

        const lessonIds = lessonsData?.map(item => item.lesson_id) || [];
        setCompletedLessons(lessonIds);

        // Load study days
        const { data: daysData, error: daysError } = await supabase
          .from('study_days')
          .select('study_date')
          .eq('user_id', user!.id);

        if (daysError) throw daysError;

        const days = daysData?.map(item => item.study_date) || [];
        setStudyDays(days);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, isAuthenticated]);

  // Mark lesson as completed
  const completeLesson = async (lessonId: string) => {
    if (!isAuthenticated || !user) {
      // Update localStorage
      const progress = JSON.parse(localStorage.getItem("user_progress") || "{}");
      const completed = progress.completedLessons || [];
      if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        progress.completedLessons = completed;
        localStorage.setItem("user_progress", JSON.stringify(progress));
        setCompletedLessons(completed);
      }
      return { success: true };
    }

    try {
      // Check if already completed
      if (completedLessons.includes(lessonId)) {
        return { success: true, alreadyCompleted: true };
      }

      // Insert into database
      const { error } = await supabase
        .from('completed_lessons')
        .insert({
          user_id: user.id,
          lesson_id: lessonId,
        });

      if (error) throw error;

      // Update local state
      setCompletedLessons(prev => [...prev, lessonId]);

      // Register study day
      const today = new Date().toISOString().split('T')[0];
      await supabase
        .from('study_days')
        .insert({
          user_id: user.id,
          date: today,
        })
        .select()
        .maybeSingle(); // Ignore if already exists

      // Update points in profile
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', user.id)
        .single();

      const currentPoints = currentProfile?.points || 0;
      
      await supabase
        .from('profiles')
        .update({ points: currentPoints + 10 })
        .eq('id', user.id);

      return { success: true };
    } catch (err) {
      console.error('Error completing lesson:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  return {
    completedLessons,
    studyDays,
    loading,
    completeLesson,
    isLessonCompleted,
  };
}
