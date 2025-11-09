/**
 * TypeScript Type Definitions
 * Central location for all shared types
 */

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Main: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Goals: undefined;
  Expenses: undefined;
};

export type OnboardingStackParamList = {
  OnboardingIntro: undefined;
  OnboardingDebts: undefined;
  OnboardingIncome: undefined;
  OnboardingEmergencyFund: undefined;
  OnboardingComplete: undefined;
};

// ============================================================================
// THEME TYPES
// ============================================================================

export type {ColorScheme} from '../theme/colors';

// ============================================================================
// USER & SUBSCRIPTION TYPES
// ============================================================================

export type SubscriptionTier = 'Normal' | 'Pro' | 'Lifetime';

export interface User {
  id: string;
  email: string;
  name: string;
  tier: SubscriptionTier;
  createdAt: Date;
  avatar?: string;
  currency: string;
  locale: string;
}

export interface AIPersona {
  tone: 'Supportive' | 'Tough Love' | 'Neutral';
  focusLevel: 'Beginner' | 'Intermediate' | 'Gazelle Intensity';
  communicationFrequency: 'Daily' | 'Weekly' | 'Minimal';
}

export interface UserSettings {
  notifications: {
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  darkMode: 'auto' | 'light' | 'dark';
  aiPersona: AIPersona;
}

// ============================================================================
// DEBT TYPES
// ============================================================================

export type DebtType =
  | 'credit-card'
  | 'personal'
  | 'auto'
  | 'student'
  | 'medical'
  | 'bnpl';

export type DebtStatus = 'open' | 'closed';

export interface Debt {
  id: string;
  userId: string;
  name: string;
  type: DebtType;
  principal: number;
  currentBalance: number;
  apr: number;
  minPayment: number;
  dueDay: number;
  status: DebtStatus;
  payoffOrder: number;
  openedAt: Date;
  closedAt?: Date;
}

export interface SnowballPlan {
  id: string;
  userId: string;
  method: 'snowball' | 'avalanche' | 'custom';
  monthlyBudget: number;
  startDate: Date;
  targetDebtFreeDate: Date;
  emergencyFundTarget: number;
  emergencyFundCurrent: number;
  debtPayoffSchedule: DebtPayoffSchedule[];
}

export interface DebtPayoffSchedule {
  debtId: string;
  debtName: string;
  currentBalance: number;
  monthlyPayment: number;
  projectedPayoffDate: Date;
  order: number;
}

// ============================================================================
// EXPENSE & BUDGET TYPES
// ============================================================================

export type ExpenseCategory =
  | 'housing'
  | 'food'
  | 'transportation'
  | 'utilities'
  | 'insurance'
  | 'healthcare'
  | 'entertainment'
  | 'shopping'
  | 'personal'
  | 'debt'
  | 'savings'
  | 'other';

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
  inputMethod: 'voice' | 'text' | 'manual';
  recurring: boolean;
  recurringId?: string;
  createdAt: Date;
}

export interface Budget {
  id: string;
  userId: string;
  monthlyIncome: number;
  categories: {
    [key in ExpenseCategory]: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseSummary {
  period: 'daily' | 'weekly' | 'monthly';
  totalSpent: number;
  budgetAllocated: number;
  remaining: number;
  byCategory: {
    category: ExpenseCategory;
    spent: number;
    budget: number;
  }[];
}

// ============================================================================
// GAMIFICATION TYPES
// ============================================================================

export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date;
  totalDebtsCompleted: number;
}

export type GoalType = 'emergency_fund' | 'debt_payoff' | 'savings' | 'custom';
export type GoalStatus = 'active' | 'completed' | 'abandoned';

export interface Goal {
  id: string;
  userId: string;
  type: GoalType;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  status: GoalStatus;
  createdAt: Date;
  completedAt?: Date;
}

export type ChallengeType = 'daily' | 'weekly' | 'monthly';
export type ChallengeStatus = 'active' | 'completed' | 'failed';

export interface Challenge {
  id: string;
  type: ChallengeType;
  name: string;
  description: string;
  xpReward: number;
  icon: string;
  target: number;
  rulesJson: any;
}

export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  challenge: Challenge;
  progress: number;
  target: number;
  status: ChallengeStatus;
  startedAt: Date;
  completedAt?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

// ============================================================================
// AI & INSIGHTS TYPES
// ============================================================================

export interface AIInsight {
  id: string;
  type: 'tip' | 'warning' | 'celebration' | 'recommendation';
  title: string;
  message: string;
  actionable: boolean;
  actionText?: string;
  actionRoute?: string;
  createdAt: Date;
}

// ============================================================================
// ONBOARDING TYPES
// ============================================================================

export interface OnboardingData {
  debts: Omit<Debt, 'id' | 'userId' | 'currentBalance' | 'status' | 'payoffOrder' | 'closedAt'>[];
  monthlyIncome: number;
  monthlyExpenses: {
    category: ExpenseCategory;
    amount: number;
  }[];
  emergencyFundCurrent: number;
  emergencyFundTarget: number;
}
