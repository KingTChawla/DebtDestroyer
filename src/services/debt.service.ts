import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Debt = Database['public']['Tables']['debts']['Row'];
type DebtInsert = Database['public']['Tables']['debts']['Insert'];
type DebtUpdate = Database['public']['Tables']['debts']['Update'];

export const debtService = {
  async getAll() {
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .order('payoff_order', { ascending: true, nullsFirst: false });

    if (error) throw error;
    return data as Debt[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Debt;
  },

  async create(debt: DebtInsert) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('debts')
      .insert({ ...debt, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data as Debt;
  },

  async update(id: string, updates: DebtUpdate) {
    const { data, error } = await supabase
      .from('debts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Debt;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('debts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getTotalDebt() {
    const { data, error } = await supabase
      .from('debts')
      .select('current_balance')
      .eq('status', 'open');

    if (error) throw error;

    const total = data.reduce((sum, debt) => sum + debt.current_balance, 0);
    return total;
  },

  async getSnowballOrder() {
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('status', 'open')
      .order('current_balance', { ascending: true });

    if (error) throw error;
    return data as Debt[];
  },
};
