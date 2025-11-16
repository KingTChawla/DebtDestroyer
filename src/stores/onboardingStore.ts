/**
 * Onboarding State Management
 * Zustand store with AsyncStorage persistence for onboarding flow data
 */

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Debt, ExpenseCategory, OnboardingDebt} from '../types';

// ============================================================================
// Types
// ============================================================================

export interface OnboardingDemographics {
  age?: number;
  location?: string;
  householdSize?: number;
}

export interface OnboardingIncome {
  primary: number;
  secondary?: number;
  frequency?: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';
}

export type IncomeStability = 'stable' | 'somewhat_unstable' | 'very_unstable';

export interface OnboardingExpenses {
  essential: Record<string, number>;
  lifestyle: Record<string, number>;
}

export interface OnboardingSavings {
  current: number;
  checking: number;
  emergencyFund: {
    status: 'yes' | 'no' | 'building';
    amount?: number;
  };
}

export interface OnboardingSubscription {
  name: string;
  cost: number;
  frequency: 'monthly' | 'yearly';
}

export interface OnboardingStore {
  // ============================================================================
  // Navigation State
  // ============================================================================
  currentStepIndex: number;
  completedSteps: string[];

  // ============================================================================
  // User Profile Data (Screens 3-10)
  // ============================================================================
  userName: string | null; // User's first name
  primaryGoal: string | null;
  experienceLevel: 'beginner' | 'intermediate' | 'experienced' | null;
  trackingFrequency: 'rarely' | 'sometimes' | 'weekly' | 'daily' | null;
  debtConfidence: 'low' | 'medium' | 'high' | null;
  demographics: OnboardingDemographics;
  financialIdentity: string | null;
  spendingBehavior: 'overspender' | 'impulse' | 'controlled' | 'disciplined' | null;
  expenseAwareness: number | null; // 1-10 slider

  // ============================================================================
  // Financial Data (Screens 11-16)
  // ============================================================================
  income: OnboardingIncome;
  incomeStability: IncomeStability | null;
  monthlyExpenses: Record<string, number>; // Flattened expenses for form screens
  expenses: OnboardingExpenses;
  savings: OnboardingSavings;
  subscriptions: string[]; // Array of subscription IDs
  subscriptions_costs?: Record<string, number>; // Custom costs for subscriptions

  // ============================================================================
  // Debts (Screens 17-26)
  // ============================================================================
  debts: OnboardingDebt[];

  // ============================================================================
  // Assessment (Screens 27-29)
  // ============================================================================
  debtBurden: number | null; // 1-10 slider
  emotionalImpact: 'low' | 'medium' | 'high' | 'extreme' | null;
  financialHabits: string[];

  // ============================================================================
  // Personalization (Screens 30-34)
  // ============================================================================
  emergencyFundPriority: 'yes' | 'no' | 'save_first' | 'skip' | null;
  emergencyFundGoal: number;
  aiPersona: 'supportive' | 'direct' | 'energetic' | 'humorous' | null;
  planIntensity: 'slow' | 'standard' | 'gazelle' | null;
  selectedChallenges: string[];

  // ============================================================================
  // Subscription Selection (Screens 37-38)
  // ============================================================================
  selectedPlan: 'free' | 'monthly' | 'annual' | 'lifetime' | null;
  sawUpsell: boolean;
  acceptedUpsell: boolean;

  // ============================================================================
  // Account (Screen 39)
  // ============================================================================
  accountCreated: boolean;
  email?: string;
  authMethod?: 'google' | 'apple' | 'email';

  // ============================================================================
  // Completion
  // ============================================================================
  onboardingComplete: boolean;
  completedAt?: string; // ISO timestamp

  // ============================================================================
  // Actions
  // ============================================================================

  // Navigation
  setCurrentStep: (index: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  markStepComplete: (stepId: string) => void;

  // Data Updates (Generic)
  updateField: (field: string, value: any) => void;

  // Specific Updates (Type-safe helpers)
  setDemographics: (data: Partial<OnboardingDemographics>) => void;
  setIncome: (data: Partial<OnboardingIncome>) => void;
  setExpenses: (data: Partial<OnboardingExpenses>) => void;
  setSavings: (data: Partial<OnboardingSavings>) => void;

  // Debt Management
  addDebt: (debt: OnboardingDebt) => void;
  updateDebt: (index: number, debt: Partial<OnboardingDebt>) => void;
  removeDebt: (index: number) => void;
  clearDebts: () => void;

  // Subscription Management
  addSubscription: (subscription: OnboardingSubscription) => void;
  removeSubscription: (index: number) => void;
  clearSubscriptions: () => void;

  // Habit/Challenge Management
  toggleHabit: (habitId: string) => void;
  toggleChallenge: (challengeId: string) => void;

  // Completion
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Data Export (for API sync)
  exportData: () => OnboardingDataExport;
}

export interface OnboardingDataExport {
  profile: {
    primaryGoal: string | null;
    experienceLevel: string | null;
    demographics: OnboardingDemographics;
    financialIdentity: string | null;
    spendingBehavior: string | null;
  };
  financial: {
    income: OnboardingIncome;
    expenses: OnboardingExpenses;
    savings: OnboardingSavings;
    subscriptions: OnboardingSubscription[];
    debts: OnboardingDebt[];
  };
  assessment: {
    debtBurden: number | null;
    emotionalImpact: string | null;
    financialHabits: string[];
    expenseAwareness: number | null;
  };
  preferences: {
    aiPersona: string | null;
    planIntensity: string | null;
    emergencyFundGoal: number;
    selectedChallenges: string[];
  };
  subscription: {
    selectedPlan: string | null;
    sawUpsell: boolean;
  };
}

// ============================================================================
// Initial State
// ============================================================================

const initialState = {
  // Navigation
  currentStepIndex: 0,
  completedSteps: [],

  // Profile
  userName: null,
  primaryGoal: null,
  experienceLevel: null,
  trackingFrequency: null,
  debtConfidence: null,
  demographics: {},
  financialIdentity: null,
  spendingBehavior: null,
  expenseAwareness: null,

  // Financial
  income: {
    primary: 0,
  },
  incomeStability: null,
  monthlyExpenses: {},
  expenses: {
    essential: {},
    lifestyle: {},
  },
  savings: {
    current: 0,
    checking: 0,
    emergencyFund: {
      status: 'no' as const,
    },
  },
  subscriptions: [],

  // Debts
  debts: [],

  // Assessment
  debtBurden: null,
  emotionalImpact: null,
  financialHabits: [],

  // Personalization
  emergencyFundPriority: null,
  emergencyFundGoal: 1000, // Default $1,000
  aiPersona: null,
  planIntensity: null,
  selectedChallenges: [],

  // Subscription
  selectedPlan: null,
  sawUpsell: false,
  acceptedUpsell: false,

  // Account
  accountCreated: false,

  // Completion
  onboardingComplete: false,
};

// ============================================================================
// Store Creation
// ============================================================================

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ============================================================================
      // Navigation Actions
      // ============================================================================

      setCurrentStep: (index: number) => {
        set({currentStepIndex: index});
      },

      nextStep: () => {
        set(state => ({
          currentStepIndex: state.currentStepIndex + 1,
        }));
      },

      previousStep: () => {
        set(state => ({
          currentStepIndex: Math.max(0, state.currentStepIndex - 1),
        }));
      },

      markStepComplete: (stepId: string) => {
        set(state => ({
          completedSteps: state.completedSteps.includes(stepId)
            ? state.completedSteps
            : [...state.completedSteps, stepId],
        }));
      },

      // ============================================================================
      // Generic Update
      // ============================================================================

      updateField: (field, value) => {
        set({[field]: value});
      },

      // ============================================================================
      // Specific Updates
      // ============================================================================

      setDemographics: (data: Partial<OnboardingDemographics>) => {
        set(state => ({
          demographics: {...state.demographics, ...data},
        }));
      },

      setIncome: (data: Partial<OnboardingIncome>) => {
        set(state => ({
          income: {...state.income, ...data},
        }));
      },

      setExpenses: (data: Partial<OnboardingExpenses>) => {
        set(state => ({
          expenses: {
            essential: {...state.expenses.essential, ...(data.essential || {})},
            lifestyle: {...state.expenses.lifestyle, ...(data.lifestyle || {})},
          },
        }));
      },

      setSavings: (data: Partial<OnboardingSavings>) => {
        set(state => ({
          savings: {...state.savings, ...data},
        }));
      },

      // ============================================================================
      // Debt Management
      // ============================================================================

      addDebt: (debt: OnboardingDebt) => {
        set(state => ({
          debts: [...state.debts, debt],
        }));
      },

      updateDebt: (index: number, debtUpdate: Partial<OnboardingDebt>) => {
        set(state => ({
          debts: state.debts.map((debt, i) =>
            i === index ? {...debt, ...debtUpdate} : debt,
          ),
        }));
      },

      removeDebt: (index: number) => {
        set(state => ({
          debts: state.debts.filter((_, i) => i !== index),
        }));
      },

      clearDebts: () => {
        set({debts: []});
      },

      // ============================================================================
      // Subscription Management
      // ============================================================================

      addSubscription: (subscription: OnboardingSubscription) => {
        set(state => ({
          subscriptions: [...state.subscriptions, subscription],
        }));
      },

      removeSubscription: (index: number) => {
        set(state => ({
          subscriptions: state.subscriptions.filter((_, i) => i !== index),
        }));
      },

      clearSubscriptions: () => {
        set({subscriptions: []});
      },

      // ============================================================================
      // Habit/Challenge Management
      // ============================================================================

      toggleHabit: (habitId: string) => {
        set(state => ({
          financialHabits: state.financialHabits.includes(habitId)
            ? state.financialHabits.filter(id => id !== habitId)
            : [...state.financialHabits, habitId],
        }));
      },

      toggleChallenge: (challengeId: string) => {
        set(state => ({
          selectedChallenges: state.selectedChallenges.includes(challengeId)
            ? state.selectedChallenges.filter(id => id !== challengeId)
            : [...state.selectedChallenges, challengeId],
        }));
      },

      // ============================================================================
      // Completion
      // ============================================================================

      completeOnboarding: () => {
        set({
          onboardingComplete: true,
          completedAt: new Date().toISOString(),
        });
      },

      resetOnboarding: () => {
        set({...initialState});
      },

      // ============================================================================
      // Data Export
      // ============================================================================

      exportData: (): OnboardingDataExport => {
        const state = get();
        return {
          profile: {
            primaryGoal: state.primaryGoal,
            experienceLevel: state.experienceLevel,
            demographics: state.demographics,
            financialIdentity: state.financialIdentity,
            spendingBehavior: state.spendingBehavior,
          },
          financial: {
            income: state.income,
            expenses: state.expenses,
            savings: state.savings,
            subscriptions: state.subscriptions,
            debts: state.debts,
          },
          assessment: {
            debtBurden: state.debtBurden,
            emotionalImpact: state.emotionalImpact,
            financialHabits: state.financialHabits,
            expenseAwareness: state.expenseAwareness,
          },
          preferences: {
            aiPersona: state.aiPersona,
            planIntensity: state.planIntensity,
            emergencyFundGoal: state.emergencyFundGoal,
            selectedChallenges: state.selectedChallenges,
          },
          subscription: {
            selectedPlan: state.selectedPlan,
            sawUpsell: state.sawUpsell,
          },
        };
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist user data, not navigation state
      partialize: (state) => {
        const {
          // Remove action functions from persistence
          setCurrentStep,
          nextStep,
          previousStep,
          markStepComplete,
          updateField,
          setDemographics,
          setIncome,
          setExpenses,
          setSavings,
          addDebt,
          updateDebt,
          removeDebt,
          clearDebts,
          addSubscription,
          removeSubscription,
          clearSubscriptions,
          toggleHabit,
          toggleChallenge,
          completeOnboarding,
          resetOnboarding,
          exportData,
          ...stateToPersist
        } = state;
        return stateToPersist;
      },
    },
  ),
);

// ============================================================================
// Selectors (for optimized re-renders)
// ============================================================================

export const selectCurrentStep = (state: OnboardingStore) => state.currentStepIndex;
export const selectProfileComplete = (state: OnboardingStore) =>
  !!(
    state.primaryGoal &&
    state.experienceLevel &&
    state.trackingFrequency &&
    state.debtConfidence
  );
export const selectFinancialDataComplete = (state: OnboardingStore) =>
  !!(state.income.primary > 0 && state.debts.length > 0);
export const selectOnboardingProgress = (state: OnboardingStore) => {
  const total = 43; // Total screens
  const completed = state.completedSteps.length;
  return Math.round((completed / total) * 100);
};
