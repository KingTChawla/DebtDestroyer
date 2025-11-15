/**
 * Onboarding Screen Configurations
 * Centralized configuration for all 43 onboarding screens
 */

import {WelcomeScreenConfig} from '../screens/onboarding/OnboardingWelcomeScreen';
import {QuestionScreenConfig} from '../screens/onboarding/OnboardingQuestionScreen';
import {FormScreenConfig} from '../screens/onboarding/OnboardingFormScreen';

// ============================================================================
// Welcome Screens (Screens 1-2)
// ============================================================================

export const welcomeScreens: WelcomeScreenConfig[] = [
  // Screen 1: Welcome
  {
    id: 'welcome',
    title: 'Welcome to DebtDestroyer',
    subtitle: "Let's take control of your money — one debt at a time.",
    illustration: 'welcome',
    ctaText: 'Get Started',
    showSkip: false,
  },

  // Screen 2: Motivational Mission
  {
    id: 'motivation',
    title: 'Freedom. Clarity. Peace of mind.',
    subtitle: 'Your debt-free journey starts today.',
    illustration: 'motivation',
    ctaText: 'Next',
    showSkip: false,
    minViewTime: 3, // 3 seconds minimum before button activates
  },
];

// ============================================================================
// Question Screens (Screens 3-6, 8-10, 12, 27-30, 32-34)
// ============================================================================

export const questionScreens: QuestionScreenConfig[] = [
  // Screen 3: Primary Financial Goal
  {
    id: 'primary_goal',
    question: "What's your #1 goal right now?",
    inputType: 'tile-select',
    options: [
      {
        id: 'pay_off_debt',
        label: 'Pay off all debt',
        icon: 'CheckCircleIcon',
      },
      {
        id: 'emergency_fund',
        label: 'Build my first emergency fund',
        icon: 'ShieldCheckIcon',
      },
      {
        id: 'stop_overspending',
        label: 'Stop overspending',
        icon: 'XCircleIcon',
      },
      {
        id: 'improve_credit',
        label: 'Improve credit score',
        icon: 'ChartBarIcon',
      },
      {
        id: 'reduce_stress',
        label: 'Reduce financial stress',
        icon: 'HeartIcon',
      },
      {
        id: 'better_habits',
        label: 'Learn better money habits',
        icon: 'AcademicCapIcon',
      },
      {
        id: 'long_term_plan',
        label: 'Get on a long-term plan',
        icon: 'CalendarIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'medium',
    progress: {current: 3, total: 43},
    storeKey: 'primaryGoal',
  },

  // Screen 4: Experience Level
  {
    id: 'experience_level',
    question: 'How would you describe your financial experience?',
    inputType: 'tile-select',
    options: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'Just starting to learn about budgets and debt',
        icon: 'SparklesIcon',
      },
      {
        id: 'intermediate',
        label: 'Intermediate',
        description: 'I have some knowledge but need structure',
        icon: 'ChartBarIcon',
      },
      {
        id: 'experienced',
        label: 'Experienced',
        description: 'I understand finance but need accountability',
        icon: 'TrophyIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'large',
    progress: {current: 4, total: 43},
    storeKey: 'experienceLevel',
  },

  // Screen 5: Tracking Frequency
  {
    id: 'tracking_frequency',
    question: 'How often do you track your money?',
    inputType: 'tile-select',
    options: [
      {id: 'rarely', label: 'Rarely', icon: 'ClockIcon'},
      {id: 'sometimes', label: 'Sometimes', icon: 'CalendarIcon'},
      {id: 'weekly', label: 'Weekly', icon: 'CalendarDaysIcon'},
      {id: 'daily', label: 'Daily', icon: 'CheckIcon'},
    ],
    multiSelect: false,
    autoAdvance: true,
    columns: 2,
    progress: {current: 5, total: 43},
    storeKey: 'trackingFrequency',
  },

  // Screen 6: Debt Confidence
  {
    id: 'debt_confidence',
    question: 'How confident do you feel about paying off debt?',
    inputType: 'tile-select',
    options: [
      {id: 'low', label: 'Low', description: 'I need a lot of help', icon: 'FaceFrownIcon'},
      {id: 'medium', label: 'Medium', description: 'I have some confidence', icon: 'FaceSmileIcon'},
      {id: 'high', label: 'High', description: 'I just need a plan', icon: 'SparklesIcon'},
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'large',
    progress: {current: 6, total: 43},
    storeKey: 'debtConfidence',
  },
];

// ============================================================================
// Form Screens (Screens 7, 11, 13-16, 31)
// ============================================================================

export const formScreens: FormScreenConfig[] = [
  // Screen 7: Basic Profile
  {
    id: 'basic_profile',
    title: 'Tell us a bit about yourself',
    description: 'This helps us personalize your experience.',
    fields: [
      {
        id: 'name',
        label: 'What should we call you?',
        type: 'text',
        placeholder: 'Enter your first name',
        required: true,
        storeKey: 'userName', // Direct property
      },
      {
        id: 'age',
        label: 'How old are you?',
        type: 'age-picker',
        placeholder: 'Enter your age',
        required: false,
        storeKey: 'demographics',
        storeSubKey: 'age',
      },
      {
        id: 'location',
        label: 'Where are you located?',
        type: 'text',
        placeholder: 'City, State',
        required: false,
        storeKey: 'demographics',
        storeSubKey: 'location',
      },
      {
        id: 'householdSize',
        label: 'How many people in your household?',
        type: 'number',
        placeholder: '1',
        required: false,
        storeKey: 'demographics',
        storeSubKey: 'householdSize',
        numberConfig: {
          min: 1,
          max: 10,
        },
      },
    ],
    progress: {current: 7, total: 43},
  },

  // Screen 11: Monthly Income
  {
    id: 'monthly_income',
    title: "What's your monthly income?",
    description: 'Include all sources: salary, side hustles, etc.',
    fields: [
      {
        id: 'gross',
        label: 'Gross Monthly Income (before taxes)',
        type: 'currency',
        placeholder: '$0',
        required: true,
        storeKey: 'income',
        storeSubKey: 'primary',
        currencyConfig: {
          allowZero: false,
        },
      },
      {
        id: 'takehome',
        label: 'Take-Home Income (after taxes)',
        type: 'currency',
        placeholder: '$0',
        required: true,
        storeKey: 'income',
        storeSubKey: 'secondary',
        currencyConfig: {
          allowZero: false,
        },
      },
    ],
    progress: {current: 11, total: 43},
  },

  // Screen 13: Essential Expenses
  {
    id: 'essential_expenses',
    title: 'Essential Monthly Expenses',
    description: 'These are your must-pay bills every month.',
    fields: [
      {
        id: 'housing',
        label: 'Housing (Rent/Mortgage)',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'monthlyExpenses',
      },
      {
        id: 'food',
        label: 'Food & Groceries',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'monthlyExpenses',
      },
      {
        id: 'transportation',
        label: 'Transportation (Car/Transit)',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'monthlyExpenses',
      },
      {
        id: 'utilities',
        label: 'Utilities (Electric, Water, Internet)',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'monthlyExpenses',
      },
    ],
    progress: {current: 13, total: 43},
  },

  // Screen 14: Lifestyle Expenses
  {
    id: 'lifestyle_expenses',
    title: 'Lifestyle & Discretionary Spending',
    description: 'Optional but common monthly expenses.',
    fields: [
      {
        id: 'entertainment',
        label: 'Entertainment (Streaming, Dining out)',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'monthlyExpenses',
      },
      {
        id: 'shopping',
        label: 'Shopping & Personal Care',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'monthlyExpenses',
      },
      {
        id: 'other',
        label: 'Other Monthly Expenses',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'monthlyExpenses',
      },
    ],
    progress: {current: 14, total: 43},
  },

  // Screen 15: Savings & Reserves
  {
    id: 'savings_reserves',
    title: 'Current Savings & Reserves',
    description: 'Money you have saved or can access in emergencies.',
    fields: [
      {
        id: 'emergencyFund',
        label: 'Emergency Fund',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'savings',
        storeSubKey: 'emergencyFund',
      },
      {
        id: 'otherSavings',
        label: 'Other Savings (Checking, Savings accounts)',
        type: 'currency',
        placeholder: '$0',
        required: false,
        storeKey: 'savings',
        storeSubKey: 'checking',
      },
    ],
    progress: {current: 15, total: 43},
  },

  // Screen 16: Subscription Discovery
  {
    id: 'subscription_discovery',
    title: 'Do you have any subscriptions?',
    description: "Select any that apply. We'll help you track them.",
    fields: [
      {
        id: 'subscriptions',
        label: 'Active Subscriptions',
        type: 'checklist',
        required: false,
        storeKey: 'subscriptions',
        checklistConfig: {
          items: [
            {id: 'netflix', label: 'Netflix', cost: 15.49},
            {id: 'spotify', label: 'Spotify', cost: 10.99},
            {id: 'amazon_prime', label: 'Amazon Prime', cost: 14.99},
            {id: 'hulu', label: 'Hulu', cost: 7.99},
            {id: 'disney_plus', label: 'Disney+', cost: 7.99},
            {id: 'apple_music', label: 'Apple Music', cost: 10.99},
            {id: 'youtube_premium', label: 'YouTube Premium', cost: 13.99},
            {id: 'gym', label: 'Gym Membership', cost: 50},
            {id: 'other', label: 'Other'},
          ],
          multiSelect: true,
          showCost: true,
        },
      },
    ],
    progress: {current: 16, total: 43},
  },

  // Screen 31: Emergency Fund Goal
  {
    id: 'emergency_fund_goal',
    title: 'Emergency Fund Goal',
    description: 'How many months of expenses do you want to save?',
    fields: [
      {
        id: 'emergencyFundMonths',
        label: 'Target (in months of expenses)',
        type: 'number',
        placeholder: '3',
        required: true,
        storeKey: 'emergencyFundGoal',
        numberConfig: {
          min: 1,
          max: 12,
        },
      },
    ],
    progress: {current: 31, total: 43},
  },
];

// ============================================================================
// All Screen IDs (for navigation reference)
// ============================================================================

export const ONBOARDING_SCREEN_IDS = {
  // Phase 1: Welcome (2)
  WELCOME: 'welcome',
  MOTIVATION: 'motivation',

  // Phase 2: User Profiling (8)
  PRIMARY_GOAL: 'primary_goal',
  EXPERIENCE_LEVEL: 'experience_level',
  TRACKING_FREQUENCY: 'tracking_frequency',
  DEBT_CONFIDENCE: 'debt_confidence',
  BASIC_PROFILE: 'basic_profile',
  FINANCIAL_IDENTITY: 'financial_identity',
  SPENDING_BEHAVIOR: 'spending_behavior',
  EXPENSE_AWARENESS: 'expense_awareness',

  // Phase 3: Financial Data (6)
  MONTHLY_INCOME: 'monthly_income',
  INCOME_STABILITY: 'income_stability',
  ESSENTIAL_EXPENSES: 'essential_expenses',
  LIFESTYLE_EXPENSES: 'lifestyle_expenses',
  SAVINGS_RESERVES: 'savings_reserves',
  SUBSCRIPTION_DISCOVERY: 'subscription_discovery',

  // Phase 4: Debt Entry (10)
  DEBT_ENTRY_INTRO: 'debt_entry_intro',
  DEBT_TYPE: 'debt_type',
  DEBT_CREDITOR: 'debt_creditor',
  DEBT_BALANCE: 'debt_balance',
  DEBT_MIN_PAYMENT: 'debt_min_payment',
  DEBT_APR: 'debt_apr',
  DEBT_DUE_DATE: 'debt_due_date',
  DEBT_AUTOPAY: 'debt_autopay',
  DEBT_SUMMARY: 'debt_summary',
  DEBT_CONFIRMATION: 'debt_confirmation',

  // Phase 5: Assessment (4)
  DEBT_BURDEN: 'debt_burden',
  EMOTIONAL_IMPACT: 'emotional_impact',
  FINANCIAL_HABITS: 'financial_habits',
  EMERGENCY_FUND_STATUS: 'emergency_fund_status',

  // Phase 6: Personalization (5)
  EMERGENCY_FUND_GOAL: 'emergency_fund_goal',
  AI_PERSONA: 'ai_persona',
  PLAN_INTENSITY: 'plan_intensity',
  BEHAVIOR_CHALLENGES: 'behavior_challenges',

  // Phase 7: Results (2)
  SNOWBALL_SCORE: 'snowball_score',
  PERSONALIZED_INSIGHTS: 'personalized_insights',

  // Phase 8: Monetization (2)
  PAYWALL_PRIMARY: 'paywall_primary',
  PAYWALL_UPSELL: 'paywall_upsell',

  // Phase 9: Account (2)
  ACCOUNT_CREATE: 'account_create',
  ACCOUNT_LOADING: 'account_loading',

  // Phase 10: Completion (3)
  PLAN_REVEAL: 'plan_reveal',
  GET_STARTED_CHECKLIST: 'get_started_checklist',
  DASHBOARD_INTRO: 'dashboard_intro',
} as const;

// ============================================================================
// Screen Flow Order
// ============================================================================

export const onboardingFlow = [
  ONBOARDING_SCREEN_IDS.WELCOME,
  ONBOARDING_SCREEN_IDS.MOTIVATION,
  // More screens will be added as we build them
] as const;

// ============================================================================
// Types
// ============================================================================

export type OnboardingScreenId = typeof ONBOARDING_SCREEN_IDS[keyof typeof ONBOARDING_SCREEN_IDS];
