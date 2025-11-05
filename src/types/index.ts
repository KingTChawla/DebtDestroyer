/**
 * TypeScript Type Definitions
 * Central location for all shared types
 */

// Navigation types
export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Debts: undefined;
  Plan: undefined;
  Daily: undefined;
  Settings: undefined;
};

export type OnboardingStackParamList = {
  OnboardingIntro: undefined;
  OnboardingDebts: undefined;
  OnboardingIncome: undefined;
  OnboardingEmergencyFund: undefined;
  OnboardingComplete: undefined;
};

// Theme types
export type { ColorScheme } from '../theme/colors';

// User & Debt types (for future use)
export interface User {
  id: string;
  email: string;
  tier: 'Normal' | 'Pro' | 'Lifetime';
  createdAt: Date;
}

export interface Debt {
  id: string;
  name: string;
  type: 'credit-card' | 'personal' | 'auto' | 'student' | 'medical' | 'bnpl';
  principal: number;
  apr: number;
  minPayment: number;
  dueDay: number;
  status: 'open' | 'closed';
  payoffOrder: number;
}
