import { useState, useEffect } from 'react';
import { supabase } from '../../../shared/services/supabaseService';
import { Situation, Music, Clothing } from '../../../shared/types';

export const useAdmin = () => {
  const [situations, setSituations] = useState<Situation[]>([]);
  const [music, setMusic] = useState<Music[]>([]);
  const [clothing, setClothing] = useState<Clothing[]>([]);
  const [loading, setLoading] = useState(false);

  // Load all data
  const loadAll = async () => {
    setLoading(true);
    await Promise.all([loadSituations(), loadMusic(), loadClothing()]);
    setLoading(false);
  };

  // Situations
  const loadSituations = async () => {
    const { data, error } = await supabase
      .from('situations')
      .select(`
        *,
        music:situation_music(music(*)),
        clothing:situation_clothing(clothing(*))
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const transformed = data.map((sit: any) => ({
        ...sit,
        music: sit.music?.map((sm: any) => sm.music).filter(Boolean) || [],
        clothing: sit.clothing?.map((sc: any) => sc.clothing).filter(Boolean) || [],
      }));
      setSituations(transformed);
    }
  };

  const createSituation = async (situation: Partial<Situation>) => {
    const { data, error } = await supabase
      .from('situations')
      .insert([situation])
      .select()
      .single();

    if (!error) {
      await loadSituations();
      return data;
    }
    throw error;
  };

  const updateSituation = async (id: string, updates: Partial<Situation>) => {
    const { error } = await supabase
      .from('situations')
      .update(updates)
      .eq('id', id);

    if (!error) {
      await loadSituations();
    }
    return !error;
  };

  const deleteSituation = async (id: string) => {
    const { error } = await supabase
      .from('situations')
      .delete()
      .eq('id', id);

    if (!error) {
      await loadSituations();
    }
    return !error;
  };

  // Music
  const loadMusic = async () => {
    const { data, error } = await supabase
      .from('music')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMusic(data);
    }
  };

  const createMusic = async (musicData: Partial<Music>) => {
    const { data, error } = await supabase
      .from('music')
      .insert([musicData])
      .select()
      .single();

    if (!error) {
      await loadMusic();
      return data;
    }
    throw error;
  };

  const updateMusic = async (id: string, updates: Partial<Music>) => {
    const { error } = await supabase
      .from('music')
      .update(updates)
      .eq('id', id);

    if (!error) {
      await loadMusic();
    }
    return !error;
  };

  const deleteMusic = async (id: string) => {
    const { error } = await supabase
      .from('music')
      .delete()
      .eq('id', id);

    if (!error) {
      await loadMusic();
    }
    return !error;
  };

  // Clothing
  const loadClothing = async () => {
    const { data, error } = await supabase
      .from('clothing')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setClothing(data);
    }
  };

  const createClothing = async (clothingData: Partial<Clothing>) => {
    const { data, error } = await supabase
      .from('clothing')
      .insert([clothingData])
      .select()
      .single();

    if (!error) {
      await loadClothing();
      return data;
    }
    throw error;
  };

  const updateClothing = async (id: string, updates: Partial<Clothing>) => {
    const { error } = await supabase
      .from('clothing')
      .update(updates)
      .eq('id', id);

    if (!error) {
      await loadClothing();
    }
    return !error;
  };

  const deleteClothing = async (id: string) => {
    const { error } = await supabase
      .from('clothing')
      .delete()
      .eq('id', id);

    if (!error) {
      await loadClothing();
    }
    return !error;
  };

  // Assignments
  const assignMusic = async (situationId: string, musicId: string) => {
    const { error } = await supabase
      .from('situation_music')
      .insert([{ situation_id: situationId, music_id: musicId }]);

    if (!error) {
      await loadSituations();
    }
    return !error;
  };

  const unassignMusic = async (situationId: string, musicId: string) => {
    const { error } = await supabase
      .from('situation_music')
      .delete()
      .eq('situation_id', situationId)
      .eq('music_id', musicId);

    if (!error) {
      await loadSituations();
    }
    return !error;
  };

  const assignClothing = async (situationId: string, clothingId: string) => {
    const { error } = await supabase
      .from('situation_clothing')
      .insert([{ situation_id: situationId, clothing_id: clothingId }]);

    if (!error) {
      await loadSituations();
    }
    return !error;
  };

  const unassignClothing = async (situationId: string, clothingId: string) => {
    const { error } = await supabase
      .from('situation_clothing')
      .delete()
      .eq('situation_id', situationId)
      .eq('clothing_id', clothingId);

    if (!error) {
      await loadSituations();
    }
    return !error;
  };

  useEffect(() => {
    loadAll();
  }, []);

  return {
    situations,
    music,
    clothing,
    loading,
    loadAll,
    // Situations
    createSituation,
    updateSituation,
    deleteSituation,
    // Music
    createMusic,
    updateMusic,
    deleteMusic,
    // Clothing
    createClothing,
    updateClothing,
    deleteClothing,
    // Assignments
    assignMusic,
    unassignMusic,
    assignClothing,
    unassignClothing,
  };
};
