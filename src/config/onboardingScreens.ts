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

  // Screen 8: Financial Identity
  {
    id: 'financial_identity',
    question: 'Which best describes your financial situation?',
    inputType: 'tile-select',
    options: [
      {
        id: 'drowning',
        label: 'Drowning in debt',
        description: 'Feeling overwhelmed and need immediate help',
        icon: 'ExclamationTriangleIcon',
      },
      {
        id: 'tight',
        label: 'Getting by, but tight',
        description: 'Making ends meet but barely',
        icon: 'ScaleIcon',
      },
      {
        id: 'stable',
        label: 'Stable, but want better habits',
        description: 'Doing okay but could improve',
        icon: 'MinusIcon',
      },
      {
        id: 'plan',
        label: 'Doing okay, want a plan',
        description: 'Looking for structure and optimization',
        icon: 'MapIcon',
      },
      {
        id: 'optimizing',
        label: 'Doing well, want optimization',
        description: 'Financially secure, seeking efficiency',
        icon: 'ArrowTrendingUpIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'large',
    progress: {current: 8, total: 43},
    storeKey: 'financialIdentity',
  },

  // Screen 9: Spending Behavior
  {
    id: 'spending_behavior',
    question: 'How would you describe your spending habits?',
    inputType: 'tile-select',
    options: [
      {
        id: 'overspender',
        label: 'Overspender',
        description: 'I spend more than I should',
        icon: 'ShoppingBagIcon',
      },
      {
        id: 'impulse',
        label: 'Impulse spender',
        description: 'I make unplanned purchases often',
        icon: 'BoltIcon',
      },
      {
        id: 'controlled',
        label: 'Mostly controlled',
        description: 'I usually stick to my budget',
        icon: 'CheckCircleIcon',
      },
      {
        id: 'disciplined',
        label: 'Very disciplined',
        description: 'I rarely make unnecessary purchases',
        icon: 'ShieldCheckIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'medium',
    progress: {current: 9, total: 43},
    storeKey: 'spendingBehavior',
  },

  // Screen 10: Expense Awareness (Slider)
  {
    id: 'expense_awareness',
    question: 'How confident are you that you know where your money goes each month?',
    inputType: 'slider',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      minLabel: 'No idea',
      maxLabel: 'Track every penny',
      showValue: true,
    },
    progress: {current: 10, total: 43},
    storeKey: 'expenseAwareness',
  },

  // Screen 12: Income Stability
  {
    id: 'income_stability',
    question: 'Is your income stable?',
    inputType: 'tile-select',
    options: [
      {
        id: 'stable',
        label: 'Stable',
        description: 'Consistent paycheck every month',
        icon: 'MinusIcon',
      },
      {
        id: 'somewhat_unstable',
        label: 'Somewhat unstable',
        description: 'Income varies but predictable',
        icon: 'ArrowsUpDownIcon',
      },
      {
        id: 'very_unstable',
        label: 'Very unstable',
        description: 'Income fluctuates significantly',
        icon: 'ChartBarIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'large',
    progress: {current: 12, total: 43},
    storeKey: 'incomeStability',
  },

  // Screen 27: Debt Burden (Slider)
  {
    id: 'debt_burden',
    question: 'How overwhelming does your debt feel?',
    inputType: 'slider',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      minLabel: 'Manageable, just needs a plan',
      maxLabel: 'Crushing, keeps me up at night',
      showValue: true,
    },
    progress: {current: 27, total: 43},
    storeKey: 'debtBurden',
  },

  // Screen 28: Emotional Impact
  {
    id: 'emotional_impact',
    question: 'How much stress is your debt causing you?',
    inputType: 'tile-select',
    options: [
      {
        id: 'low',
        label: 'Low',
        description: "It's there, but I'm okay",
        icon: 'FaceSmileIcon',
      },
      {
        id: 'medium',
        label: 'Medium',
        description: 'It bothers me regularly',
        icon: 'ExclamationCircleIcon',
      },
      {
        id: 'high',
        label: 'High',
        description: "It's a constant worry",
        icon: 'ExclamationTriangleIcon',
      },
      {
        id: 'extreme',
        label: 'Extreme',
        description: "It's affecting my health/relationships",
        icon: 'FireIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'large',
    progress: {current: 28, total: 43},
    storeKey: 'emotionalImpact',
  },

  // Screen 29: Financial Habits (Multi-select checklist)
  {
    id: 'financial_habits',
    question: 'Which of these apply to you? (Select all that apply)',
    description: 'These are just to help personalize your plan',
    inputType: 'tile-select',
    options: [
      {id: 'impulse_spending', label: 'Impulse spending', icon: 'BoltIcon'},
      {id: 'no_budget', label: 'No budget or spending plan', icon: 'DocumentIcon'},
      {id: 'not_tracking', label: 'Not tracking expenses', icon: 'EyeSlashIcon'},
      {id: 'missed_payments', label: 'Missed payments in the past', icon: 'ClockIcon'},
      {id: 'no_savings', label: 'No savings or emergency fund', icon: 'BanknotesIcon'},
      {id: 'paycheck_to_paycheck', label: 'Living paycheck to paycheck', icon: 'CurrencyDollarIcon'},
      {id: 'good_habits', label: 'Actually, I have good habits', icon: 'CheckCircleIcon'},
    ],
    multiSelect: true,
    autoAdvance: false,
    columns: 1,
    progress: {current: 29, total: 43},
    storeKey: 'financialHabits',
  },

  // Screen 30: Emergency Fund Priority
  {
    id: 'emergency_fund_priority',
    question: 'Do you have $1,000 saved for emergencies?',
    inputType: 'tile-select',
    options: [
      {
        id: 'yes',
        label: 'Yes, I have $1,000+ saved',
        icon: 'CheckCircleIcon',
      },
      {
        id: 'building',
        label: "Not yet, but I'm working on it",
        icon: 'ArrowTrendingUpIcon',
      },
      {
        id: 'save_first',
        label: 'No, and I want to save this first',
        icon: 'ShieldCheckIcon',
      },
      {
        id: 'skip',
        label: 'Skip this for now',
        icon: 'ArrowRightIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'large',
    progress: {current: 30, total: 43},
    storeKey: 'emergencyFundPriority',
  },

  // Screen 32: AI Persona
  {
    id: 'ai_persona',
    question: 'How do you want your AI money coach to talk to you?',
    inputType: 'tile-select',
    options: [
      {
        id: 'supportive',
        label: 'Calm & Supportive',
        description: "You've got this. Let's take it one step at a time.",
        icon: 'HeartIcon',
      },
      {
        id: 'direct',
        label: 'Direct & Disciplined',
        description: 'Time to face the numbers. No more excuses.',
        icon: 'ShieldCheckIcon',
      },
      {
        id: 'energetic',
        label: 'High-Energy Motivation',
        description: "YES! You're crushing it! Let's GO!",
        icon: 'BoltIcon',
      },
      {
        id: 'humorous',
        label: 'Humor & Lighthearted',
        description: 'Debt? More like debt-be-gone, am I right?',
        icon: 'FaceSmileIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'large',
    progress: {current: 32, total: 43},
    storeKey: 'aiPersona',
  },

  // Screen 33: Plan Intensity
  {
    id: 'plan_intensity',
    question: 'How intense do you want your payoff plan to be?',
    inputType: 'tile-select',
    options: [
      {
        id: 'slow',
        label: 'Slow & Steady',
        description: 'Comfortable pace, sustainable lifestyle',
        icon: 'MinusIcon',
      },
      {
        id: 'standard',
        label: 'Standard',
        description: 'Balanced approach, noticeable progress',
        icon: 'ChartBarIcon',
      },
      {
        id: 'gazelle',
        label: 'Gazelle Intensity',
        description: 'All-in, maximum speed, Dave Ramsey style',
        icon: 'RocketLaunchIcon',
      },
    ],
    multiSelect: false,
    autoAdvance: true,
    tileSize: 'large',
    progress: {current: 33, total: 43},
    storeKey: 'planIntensity',
  },

  // Screen 34: Behavior Challenges (Multi-select checklist)
  {
    id: 'behavior_challenges',
    question: 'Choose 1-3 challenges to start with',
    description: 'Pick challenges that feel achievable right now',
    inputType: 'tile-select',
    options: [
      {id: 'no_eating_out', label: 'No eating out for 3 days', icon: 'HomeIcon'},
      {id: 'skip_coffee', label: 'Skip coffee shop for a week', icon: 'CupIcon'},
      {id: 'no_amazon', label: 'No Amazon purchases for 5 days', icon: 'ShoppingBagIcon'},
      {id: 'no_impulse', label: 'No impulse buys (24-hour rule)', icon: 'ClockIcon'},
      {id: 'track_expenses', label: 'Track every expense for 7 days', icon: 'DocumentTextIcon'},
      {id: 'review_subscriptions', label: 'Review all subscriptions', icon: 'ListBulletIcon'},
      {id: 'cancel_subscriptions', label: 'Find 3 subscriptions to cancel', icon: 'XMarkIcon'},
      {id: 'create_budget', label: 'Create your first budget', icon: 'CalculatorIcon'},
      {id: 'enable_autopay', label: 'Enable autopay for all debts', icon: 'ArrowPathIcon'},
    ],
    multiSelect: true,
    autoAdvance: false,
    columns: 1,
    progress: {current: 34, total: 43},
    storeKey: 'selectedChallenges',
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
