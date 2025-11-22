import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Goal = Database['public']['Tables']['goals']['Row'];
type GoalInsert = Database['public']['Tables']['goals']['Insert'];
type GoalUpdate = Database['public']['Tables']['goals']['Update'];

export const goalService = {
  async getAll() {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Goal[];
  },

  async getActive() {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('status', 'active')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Goal[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Goal;
  },

  async create(goal: GoalInsert) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('goals')
      .insert({ ...goal, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  async update(id: string, updates: GoalUpdate) {
    const { data, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateProgress(id: string, amount: number) {
    const goal = await this.getById(id);
    const newAmount = goal.current_amount + amount;

    const updates: GoalUpdate = {
      current_amount: newAmount,
    };

    if (newAmount >= goal.target_amount) {
      updates.status = 'completed';
      updates.completed_at = new Date().toISOString();
    }

    return this.update(id, updates);
  },
};
