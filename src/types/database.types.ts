export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          country: string
          currency: string
          tier: 'free' | 'pro' | 'lifetime'
          settings_json: Json | null
          consents_json: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          country?: string
          currency?: string
          tier?: 'free' | 'pro' | 'lifetime'
          settings_json?: Json | null
          consents_json?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          country?: string
          currency?: string
          tier?: 'free' | 'pro' | 'lifetime'
          settings_json?: Json | null
          consents_json?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      debts: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'mortgage' | 'medical' | 'other'
          principal: number
          current_balance: number
          apr: number
          min_payment: number
          due_day: number
          status: 'open' | 'closed' | 'paid_off'
          payoff_order: number | null
          interest_start_date: string | null
          opened_at: string | null
          closed_at: string | null
          metadata_json: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'mortgage' | 'medical' | 'other'
          principal: number
          current_balance: number
          apr: number
          min_payment: number
          due_day: number
          status?: 'open' | 'closed' | 'paid_off'
          payoff_order?: number | null
          interest_start_date?: string | null
          opened_at?: string | null
          closed_at?: string | null
          metadata_json?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'mortgage' | 'medical' | 'other'
          principal?: number
          current_balance?: number
          apr?: number
          min_payment?: number
          due_day?: number
          status?: 'open' | 'closed' | 'paid_off'
          payoff_order?: number | null
          interest_start_date?: string | null
          opened_at?: string | null
          closed_at?: string | null
          metadata_json?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      expense_logs: {
        Row: {
          id: string
          user_id: string
          date: string
          amount: number
          category: string
          description: string | null
          input_method: 'voice' | 'text' | 'camera' | 'receipt_scan'
          confidence_score: number | null
          is_business: boolean
          receipt_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          amount: number
          category: string
          description?: string | null
          input_method: 'voice' | 'text' | 'camera' | 'receipt_scan'
          confidence_score?: number | null
          is_business?: boolean
          receipt_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          amount?: number
          category?: string
          description?: string | null
          input_method?: 'voice' | 'text' | 'camera' | 'receipt_scan'
          confidence_score?: number | null
          is_business?: boolean
          receipt_url?: string | null
          created_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          goal_type: 'emergency_fund' | 'debt_payoff' | 'savings' | 'expense_reduction' | 'custom'
          title: string
          description: string | null
          target_amount: number
          current_amount: number
          deadline: string | null
          status: 'active' | 'completed' | 'abandoned' | 'paused'
          priority: 'high' | 'medium' | 'low'
          auto_track: boolean
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          goal_type: 'emergency_fund' | 'debt_payoff' | 'savings' | 'expense_reduction' | 'custom'
          title: string
          description?: string | null
          target_amount: number
          current_amount?: number
          deadline?: string | null
          status?: 'active' | 'completed' | 'abandoned' | 'paused'
          priority?: 'high' | 'medium' | 'low'
          auto_track?: boolean
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          goal_type?: 'emergency_fund' | 'debt_payoff' | 'savings' | 'expense_reduction' | 'custom'
          title?: string
          description?: string | null
          target_amount?: number
          current_amount?: number
          deadline?: string | null
          status?: 'active' | 'completed' | 'abandoned' | 'paused'
          priority?: 'high' | 'medium' | 'low'
          auto_track?: boolean
          created_at?: string
          completed_at?: string | null
        }
      }
    }
  }
}
