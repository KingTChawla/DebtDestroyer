import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type ExpenseLog = Database['public']['Tables']['expense_logs']['Row'];
type ExpenseLogInsert = Database['public']['Tables']['expense_logs']['Insert'];
type ExpenseLogUpdate = Database['public']['Tables']['expense_logs']['Update'];

export const expenseService = {
  async getAll(startDate?: string, endDate?: string) {
    let query = supabase
      .from('expense_logs')
      .select('*')
      .order('date', { ascending: false });

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as ExpenseLog[];
  },

  async getByCategory(category: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('expense_logs')
      .select('*')
      .eq('category', category)
      .order('date', { ascending: false });

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as ExpenseLog[];
  },

  async create(expense: ExpenseLogInsert) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('expense_logs')
      .insert({ ...expense, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data as ExpenseLog;
  },

  async update(id: string, updates: ExpenseLogUpdate) {
    const { data, error } = await supabase
      .from('expense_logs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as ExpenseLog;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('expense_logs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getTotalByCategory(startDate?: string, endDate?: string) {
    let query = supabase
      .from('expense_logs')
      .select('category, amount');

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;

    const categoryTotals = data.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return categoryTotals;
  },
};
