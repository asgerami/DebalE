import { useState, useEffect, useCallback } from "react";
import { getProfile, updateProfile } from "../lib/supabase-crud";
import { Profile } from "../lib/supabase";

export function useProfile(userId: string | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProfile(userId);
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const saveProfile = async (updates: Partial<Profile>) => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await updateProfile(userId, updates);
      setProfile(updated);
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refresh: fetchProfile, saveProfile };
}
