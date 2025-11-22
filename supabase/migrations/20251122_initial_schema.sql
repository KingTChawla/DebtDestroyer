-- ============================================================================
-- DEBT DESTROYER - SUPABASE DATABASE SCHEMA
-- ============================================================================
-- Version: 1.0
-- Created: 2025-11-22
-- Architecture: Supabase (Postgres 14+) with Row-Level Security
-- Strategy: Manual entry only, AI-first design
-- ============================================================================

-- Note: Supabase uses gen_random_uuid() by default (no extension needed)

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'lifetime');
CREATE TYPE household_mode AS ENUM ('combined', 'uncombined');
CREATE TYPE household_role AS ENUM ('owner', 'member');
CREATE TYPE debt_type AS ENUM ('credit_card', 'auto_loan', 'student_loan', 'personal_loan', 'mortgage', 'medical', 'other');
CREATE TYPE debt_status AS ENUM ('open', 'closed', 'paid_off');
CREATE TYPE snowball_method AS ENUM ('snowball', 'avalanche', 'custom');
CREATE TYPE plan_status AS ENUM ('active', 'paused', 'completed');
CREATE TYPE payment_type AS ENUM ('minimum', 'extra', 'payoff', 'rollover');
CREATE TYPE payment_source AS ENUM ('scheduled', 'manual', 'rounded_up');
CREATE TYPE expense_input_method AS ENUM ('voice', 'text', 'manual');
CREATE TYPE streak_type AS ENUM ('daily_login', 'expense_logging', 'debt_payment');
CREATE TYPE quest_status AS ENUM ('active', 'completed', 'failed', 'expired');
CREATE TYPE challenge_type AS ENUM ('daily', 'weekly', 'monthly', 'seasonal');
CREATE TYPE challenge_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE goal_type AS ENUM ('emergency_fund', 'debt_payoff', 'savings', 'expense_reduction', 'custom');
CREATE TYPE goal_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE goal_status AS ENUM ('active', 'completed', 'abandoned', 'paused');
CREATE TYPE milestone_type AS ENUM ('debt_payoff', 'savings_goal', 'streak_achievement', 'level_up');
CREATE TYPE owner_scope AS ENUM ('user', 'household');
CREATE TYPE frequency_type AS ENUM ('daily', 'weekly', 'monthly', 'quarterly', 'yearly');

-- ============================================================================
-- USER PROFILE
-- ============================================================================

CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  age INTEGER,
  location TEXT,
  country TEXT DEFAULT 'US',
  currency TEXT DEFAULT 'USD',
  tier subscription_tier DEFAULT 'free',

  -- Onboarding data (financial identity)
  primary_goal TEXT,
  experience_level TEXT,
  tracking_frequency TEXT,
  debt_confidence TEXT,
  financial_identity TEXT,
  spending_behavior TEXT,
  expense_awareness INTEGER CHECK (expense_awareness BETWEEN 1 AND 10),
  debt_burden_level INTEGER CHECK (debt_burden_level BETWEEN 1 AND 10),
  emotional_impact TEXT,
  financial_habits TEXT[],
  ai_persona TEXT DEFAULT 'supportive',
  plan_intensity TEXT DEFAULT 'standard',

  settings JSONB DEFAULT '{}'::jsonb,
  consents JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INCOME
-- ============================================================================

CREATE TABLE public.income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  primary_income DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  secondary_income DECIMAL(12, 2) DEFAULT 0.00,
  income_stability TEXT DEFAULT 'stable',
  total_monthly_income DECIMAL(12, 2) GENERATED ALWAYS AS (primary_income + COALESCE(secondary_income, 0)) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- EXPENSES
-- ============================================================================

CREATE TABLE public.essential_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  housing DECIMAL(12, 2) DEFAULT 0.00,
  utilities DECIMAL(12, 2) DEFAULT 0.00,
  groceries DECIMAL(12, 2) DEFAULT 0.00,
  transportation DECIMAL(12, 2) DEFAULT 0.00,
  insurance DECIMAL(12, 2) DEFAULT 0.00,
  childcare DECIMAL(12, 2) DEFAULT 0.00,
  healthcare DECIMAL(12, 2) DEFAULT 0.00,
  other_essentials DECIMAL(12, 2) DEFAULT 0.00,
  total_essential DECIMAL(12, 2) GENERATED ALWAYS AS (
    housing + utilities + groceries + transportation + insurance +
    COALESCE(childcare, 0) + healthcare + other_essentials
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.lifestyle_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  dining_out DECIMAL(12, 2) DEFAULT 0.00,
  entertainment DECIMAL(12, 2) DEFAULT 0.00,
  shopping DECIMAL(12, 2) DEFAULT 0.00,
  subscriptions DECIMAL(12, 2) DEFAULT 0.00,
  hobbies DECIMAL(12, 2) DEFAULT 0.00,
  personal_care DECIMAL(12, 2) DEFAULT 0.00,
  gifts DECIMAL(12, 2) DEFAULT 0.00,
  other_lifestyle DECIMAL(12, 2) DEFAULT 0.00,
  total_lifestyle DECIMAL(12, 2) GENERATED ALWAYS AS (
    dining_out + entertainment + shopping + subscriptions +
    hobbies + personal_care + gifts + other_lifestyle
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  cost DECIMAL(12, 2) NOT NULL,
  billing_frequency TEXT DEFAULT 'monthly',
  category TEXT,
  is_essential BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.expense_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  input_method expense_input_method DEFAULT 'manual',
  confidence_score DECIMAL(3, 2) CHECK (confidence_score BETWEEN 0 AND 1),
  is_business BOOLEAN DEFAULT FALSE,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.recurring_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  frequency frequency_type NOT NULL,
  day_of_month INTEGER CHECK (day_of_month BETWEEN 1 AND 31),
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  category TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  active BOOLEAN DEFAULT TRUE,
  next_occurrence DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SAVINGS
-- ============================================================================

CREATE TABLE public.savings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  current_savings DECIMAL(12, 2) DEFAULT 0.00,
  checking_balance DECIMAL(12, 2) DEFAULT 0.00,
  emergency_fund_priority TEXT DEFAULT 'before_debt',
  emergency_fund_goal DECIMAL(12, 2) DEFAULT 1000.00,
  emergency_fund_progress DECIMAL(12, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- DEBTS
-- ============================================================================

CREATE TABLE public.debts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  owner_scope owner_scope DEFAULT 'user',
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  type debt_type NOT NULL,
  creditor_name TEXT,
  principal DECIMAL(12, 2) NOT NULL,
  current_balance DECIMAL(12, 2) NOT NULL,
  apr DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  min_payment DECIMAL(12, 2) NOT NULL,
  due_day INTEGER CHECK (due_day BETWEEN 1 AND 31),
  status debt_status DEFAULT 'open',
  payoff_order INTEGER,
  interest_start_date DATE,
  opened_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.snowball_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  owner_scope owner_scope DEFAULT 'user',
  owner_id UUID NOT NULL,
  method snowball_method DEFAULT 'snowball',
  start_date DATE NOT NULL,
  target_date DATE,
  ef_target DECIMAL(12, 2) DEFAULT 1000.00,
  monthly_payment_amount DECIMAL(12, 2) NOT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  status plan_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debt_id UUID NOT NULL REFERENCES public.debts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  type payment_type NOT NULL,
  source payment_source DEFAULT 'manual',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- GAMIFICATION
-- ============================================================================

CREATE TABLE public.streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  streak_type streak_type NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_check_in DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, streak_type)
);

CREATE TABLE public.xp_tracking (
  user_id UUID PRIMARY KEY REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  xp_to_next_level INTEGER DEFAULT 100,
  xp_breakdown JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  progress INTEGER DEFAULT 0,
  target INTEGER NOT NULL,
  unit TEXT,
  status quest_status DEFAULT 'active',
  reward_xp INTEGER DEFAULT 0,
  deadline TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_type challenge_type NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  rules JSONB DEFAULT '{}'::jsonb,
  xp_reward INTEGER DEFAULT 0,
  duration_days INTEGER DEFAULT 7,
  icon TEXT,
  difficulty challenge_difficulty DEFAULT 'medium',
  active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  target INTEGER NOT NULL,
  status quest_status DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  goal_type goal_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(12, 2) NOT NULL,
  current_amount DECIMAL(12, 2) DEFAULT 0.00,
  deadline DATE,
  status goal_status DEFAULT 'active',
  priority goal_priority DEFAULT 'medium',
  auto_track BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  owner_scope owner_scope DEFAULT 'user',
  owner_id UUID NOT NULL,
  milestone_type milestone_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ENTITLEMENTS
-- ============================================================================

CREATE TABLE public.entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  tier subscription_tier DEFAULT 'free',
  source TEXT DEFAULT 'direct',
  expires_at TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT FALSE,
  subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- AI INTERACTION DATA
-- ============================================================================

CREATE TABLE public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  intent TEXT,
  entities_extracted JSONB DEFAULT '{}'::jsonb,
  feedback TEXT CHECK (feedback IN ('helpful', 'not_helpful')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.ai_usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  requests_count INTEGER DEFAULT 0,
  tier_limit INTEGER DEFAULT 10,
  tokens_used INTEGER DEFAULT 0,
  cost_estimate DECIMAL(10, 4) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ============================================================================
-- SETTINGS & PREFERENCES
-- ============================================================================

CREATE TABLE public.app_settings (
  user_id UUID PRIMARY KEY REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'auto',
  language TEXT DEFAULT 'en',
  currency TEXT DEFAULT 'USD',
  date_format TEXT DEFAULT 'MM/DD/YYYY',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  biometric_auth_enabled BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  daily_reminder BOOLEAN DEFAULT TRUE,
  payment_due_reminders BOOLEAN DEFAULT TRUE,
  streak_warnings BOOLEAN DEFAULT TRUE,
  achievements BOOLEAN DEFAULT TRUE,
  ai_insights BOOLEAN DEFAULT TRUE,
  marketing BOOLEAN DEFAULT FALSE,
  quiet_hours_enabled BOOLEAN DEFAULT FALSE,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.income ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.essential_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lifestyle_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recurring_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.snowball_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- User Profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);

-- Income
CREATE POLICY "Users can view own income" ON public.income FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own income" ON public.income FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own income" ON public.income FOR UPDATE USING (auth.uid() = user_id);

-- Essential Expenses
CREATE POLICY "Users can view own essential expenses" ON public.essential_expenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own essential expenses" ON public.essential_expenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own essential expenses" ON public.essential_expenses FOR UPDATE USING (auth.uid() = user_id);

-- Lifestyle Expenses
CREATE POLICY "Users can view own lifestyle expenses" ON public.lifestyle_expenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own lifestyle expenses" ON public.lifestyle_expenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own lifestyle expenses" ON public.lifestyle_expenses FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscriptions" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own subscriptions" ON public.subscriptions FOR DELETE USING (auth.uid() = user_id);

-- Expense Logs
CREATE POLICY "Users can view own expenses" ON public.expense_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own expenses" ON public.expense_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own expenses" ON public.expense_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own expenses" ON public.expense_logs FOR DELETE USING (auth.uid() = user_id);

-- Recurring Expenses
CREATE POLICY "Users can view own recurring expenses" ON public.recurring_expenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own recurring expenses" ON public.recurring_expenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own recurring expenses" ON public.recurring_expenses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own recurring expenses" ON public.recurring_expenses FOR DELETE USING (auth.uid() = user_id);

-- Savings
CREATE POLICY "Users can view own savings" ON public.savings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own savings" ON public.savings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own savings" ON public.savings FOR UPDATE USING (auth.uid() = user_id);

-- Debts
CREATE POLICY "Users can view own debts" ON public.debts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own debts" ON public.debts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own debts" ON public.debts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own debts" ON public.debts FOR DELETE USING (auth.uid() = user_id);

-- Snowball Plans
CREATE POLICY "Users can view own plans" ON public.snowball_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans" ON public.snowball_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plans" ON public.snowball_plans FOR UPDATE USING (auth.uid() = user_id);

-- Payment Events
CREATE POLICY "Users can view payment events for own debts" ON public.payment_events FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.debts WHERE debts.id = payment_events.debt_id AND debts.user_id = auth.uid()));
CREATE POLICY "Users can insert payment events for own debts" ON public.payment_events FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.debts WHERE debts.id = payment_events.debt_id AND debts.user_id = auth.uid()));

-- Streaks
CREATE POLICY "Users can view own streaks" ON public.streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON public.streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON public.streaks FOR UPDATE USING (auth.uid() = user_id);

-- XP Tracking
CREATE POLICY "Users can view own xp" ON public.xp_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own xp" ON public.xp_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own xp" ON public.xp_tracking FOR UPDATE USING (auth.uid() = user_id);

-- Quests
CREATE POLICY "Users can view own quests" ON public.quests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quests" ON public.quests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own quests" ON public.quests FOR UPDATE USING (auth.uid() = user_id);

-- Challenges (all users can view active challenges)
CREATE POLICY "Authenticated users can view challenges" ON public.challenges FOR SELECT
  USING (auth.role() = 'authenticated' AND active = TRUE);

-- User Challenges
CREATE POLICY "Users can view own user challenges" ON public.user_challenges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own user challenges" ON public.user_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own user challenges" ON public.user_challenges FOR UPDATE USING (auth.uid() = user_id);

-- Goals
CREATE POLICY "Users can view own goals" ON public.goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON public.goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON public.goals FOR DELETE USING (auth.uid() = user_id);

-- Milestones
CREATE POLICY "Users can view own milestones" ON public.milestones FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own milestones" ON public.milestones FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Entitlements
CREATE POLICY "Users can view own entitlements" ON public.entitlements FOR SELECT USING (auth.uid() = user_id);

-- AI Conversations
CREATE POLICY "Users can view own conversations" ON public.ai_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON public.ai_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON public.ai_conversations FOR UPDATE USING (auth.uid() = user_id);

-- AI Usage Tracking
CREATE POLICY "Users can view own usage" ON public.ai_usage_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage" ON public.ai_usage_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage" ON public.ai_usage_tracking FOR UPDATE USING (auth.uid() = user_id);

-- App Settings
CREATE POLICY "Users can view own settings" ON public.app_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings" ON public.app_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON public.app_settings FOR UPDATE USING (auth.uid() = user_id);

-- Notification Preferences
CREATE POLICY "Users can view own notification prefs" ON public.notification_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notification prefs" ON public.notification_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notification prefs" ON public.notification_preferences FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_income_user_id ON public.income(user_id);
CREATE INDEX idx_essential_expenses_user_id ON public.essential_expenses(user_id);
CREATE INDEX idx_lifestyle_expenses_user_id ON public.lifestyle_expenses(user_id);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_expense_logs_user_id ON public.expense_logs(user_id);
CREATE INDEX idx_expense_logs_date ON public.expense_logs(date);
CREATE INDEX idx_expense_logs_category ON public.expense_logs(category);
CREATE INDEX idx_recurring_expenses_user_id ON public.recurring_expenses(user_id);
CREATE INDEX idx_savings_user_id ON public.savings(user_id);
CREATE INDEX idx_debts_user_id ON public.debts(user_id);
CREATE INDEX idx_debts_status ON public.debts(status);
CREATE INDEX idx_debts_payoff_order ON public.debts(payoff_order);
CREATE INDEX idx_payment_events_debt_id ON public.payment_events(debt_id);
CREATE INDEX idx_payment_events_date ON public.payment_events(date);
CREATE INDEX idx_streaks_user_id ON public.streaks(user_id);
CREATE INDEX idx_quests_user_id ON public.quests(user_id);
CREATE INDEX idx_quests_status ON public.quests(status);
CREATE INDEX idx_goals_user_id ON public.goals(user_id);
CREATE INDEX idx_goals_status ON public.goals(status);
CREATE INDEX idx_ai_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX idx_ai_usage_user_date ON public.ai_usage_tracking(user_id, date);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_income_updated_at BEFORE UPDATE ON public.income
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_essential_expenses_updated_at BEFORE UPDATE ON public.essential_expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lifestyle_expenses_updated_at BEFORE UPDATE ON public.lifestyle_expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recurring_expenses_updated_at BEFORE UPDATE ON public.recurring_expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_savings_updated_at BEFORE UPDATE ON public.savings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_debts_updated_at BEFORE UPDATE ON public.debts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_snowball_plans_updated_at BEFORE UPDATE ON public.snowball_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_streaks_updated_at BEFORE UPDATE ON public.streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entitlements_updated_at BEFORE UPDATE ON public.entitlements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SEED DATA (System Challenges)
-- ============================================================================

INSERT INTO public.challenges (challenge_type, name, description, xp_reward, duration_days, icon, difficulty) VALUES
('weekly', 'No-Spend Weekend', 'Go an entire weekend without spending money', 100, 2, 'ban', 'medium'),
('monthly', 'Track Every Expense', 'Log every expense for 30 days straight', 500, 30, 'clipboard-list', 'hard'),
('weekly', 'Cancel 1 Subscription', 'Find and cancel one unused subscription', 150, 7, 'x-circle', 'easy'),
('daily', 'Daily Check-in', 'Open the app and log your progress today', 10, 1, 'check-circle', 'easy'),
('weekly', 'No Dining Out Week', 'Cook all meals at home for 7 days', 200, 7, 'home', 'medium');

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
