"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export interface Profile {
  id: string;
  name: string;
  grade: string;
  points: number;
  created_at: string;
}

export function useProfile() {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load profile from database
  useEffect(() => {
    if (!isAuthenticated || !user) {
      // If not authenticated, use localStorage as fallback
      const localProfile = JSON.parse(localStorage.getItem("student_profile") || "{}");
      if (localProfile.name) {
        setProfile({
          id: 'local',
          name: localProfile.name,
          grade: localProfile.grade || '6º ano',
          points: 0,
          created_at: new Date().toISOString(),
        });
      }
      setLoading(false);
      return;
    }

    async function loadProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user!.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        setProfile(data || null);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, isAuthenticated]);

  // Update profile in database
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!isAuthenticated || !user) {
      // Update localStorage if not authenticated
      const localProfile = JSON.parse(localStorage.getItem("student_profile") || "{}");
      const updated = { ...localProfile, ...updates };
      localStorage.setItem("student_profile", JSON.stringify(updated));
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return { success: true };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { success: true, data };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}
