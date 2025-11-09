/**
 * Mock Data Service
 * Provides sample data for UI development and testing
 */

import {
  User,
  Debt,
  SnowballPlan,
  Expense,
  Budget,
  Goal,
  Challenge,
  UserChallenge,
  UserProgress,
  AIInsight,
  Badge,
  ExpenseSummary,
} from '../types';

// ============================================================================
// MOCK USER DATA
// ============================================================================

export const mockUser: User = {
  id: 'user-001',
  email: 'john.doe@example.com',
  name: 'John Doe',
  tier: 'Pro',
  createdAt: new Date('2024-01-15'),
  currency: 'USD',
  locale: 'en-US',
};

// ============================================================================
// MOCK DEBT DATA
// ============================================================================

export const mockDebts: Debt[] = [
  {
    id: 'debt-001',
    userId: 'user-001',
    name: 'Best Buy Card',
    type: 'credit-card',
    principal: 800,
    currentBalance: 650,
    apr: 22.99,
    minPayment: 35,
    dueDay: 15,
    status: 'open',
    payoffOrder: 1,
    openedAt: new Date('2023-06-01'),
  },
  {
    id: 'debt-002',
    userId: 'user-001',
    name: 'Chase Credit Card',
    type: 'credit-card',
    principal: 3500,
    currentBalance: 2800,
    apr: 18.24,
    minPayment: 85,
    dueDay: 20,
    status: 'open',
    payoffOrder: 2,
    openedAt: new Date('2022-11-10'),
  },
  {
    id: 'debt-003',
    userId: 'user-001',
    name: 'Personal Loan',
    type: 'personal',
    principal: 5000,
    currentBalance: 4200,
    apr: 12.5,
    minPayment: 150,
    dueDay: 1,
    status: 'open',
    payoffOrder: 3,
    openedAt: new Date('2023-03-15'),
  },
  {
    id: 'debt-004',
    userId: 'user-001',
    name: 'Car Loan',
    type: 'auto',
    principal: 18000,
    currentBalance: 14500,
    apr: 5.9,
    minPayment: 320,
    dueDay: 10,
    status: 'open',
    payoffOrder: 4,
    openedAt: new Date('2022-05-20'),
  },
  {
    id: 'debt-005',
    userId: 'user-001',
    name: 'Student Loan',
    type: 'student',
    principal: 25000,
    currentBalance: 22500,
    apr: 4.5,
    minPayment: 250,
    dueDay: 5,
    status: 'open',
    payoffOrder: 5,
    openedAt: new Date('2018-09-01'),
  },
];

export const mockSnowballPlan: SnowballPlan = {
  id: 'plan-001',
  userId: 'user-001',
  method: 'snowball',
  monthlyBudget: 1200,
  startDate: new Date('2024-11-01'),
  targetDebtFreeDate: new Date('2028-03-15'),
  emergencyFundTarget: 1000,
  emergencyFundCurrent: 750,
  debtPayoffSchedule: [
    {
      debtId: 'debt-001',
      debtName: 'Best Buy Card',
      currentBalance: 650,
      monthlyPayment: 435,
      projectedPayoffDate: new Date('2025-01-15'),
      order: 1,
    },
    {
      debtId: 'debt-002',
      debtName: 'Chase Credit Card',
      currentBalance: 2800,
      monthlyPayment: 520,
      projectedPayoffDate: new Date('2025-07-20'),
      order: 2,
    },
    {
      debtId: 'debt-003',
      debtName: 'Personal Loan',
      currentBalance: 4200,
      monthlyPayment: 670,
      projectedPayoffDate: new Date('2026-02-01'),
      order: 3,
    },
    {
      debtId: 'debt-004',
      debtName: 'Car Loan',
      currentBalance: 14500,
      monthlyPayment: 990,
      projectedPayoffDate: new Date('2027-06-10'),
      order: 4,
    },
    {
      debtId: 'debt-005',
      debtName: 'Student Loan',
      currentBalance: 22500,
      monthlyPayment: 1240,
      projectedPayoffDate: new Date('2028-03-05'),
      order: 5,
    },
  ],
};

// ============================================================================
// MOCK EXPENSE DATA
// ============================================================================

export const mockExpenses: Expense[] = [
  {
    id: 'exp-001',
    userId: 'user-001',
    amount: 45.32,
    category: 'food',
    description: 'Grocery shopping at Walmart',
    date: new Date('2024-11-08'),
    inputMethod: 'text',
    recurring: false,
    createdAt: new Date('2024-11-08'),
  },
  {
    id: 'exp-002',
    userId: 'user-001',
    amount: 12.50,
    category: 'food',
    description: 'Lunch at Chipotle',
    date: new Date('2024-11-07'),
    inputMethod: 'voice',
    recurring: false,
    createdAt: new Date('2024-11-07'),
  },
  {
    id: 'exp-003',
    userId: 'user-001',
    amount: 15.99,
    category: 'entertainment',
    description: 'Netflix subscription',
    date: new Date('2024-11-05'),
    inputMethod: 'manual',
    recurring: true,
    recurringId: 'rec-001',
    createdAt: new Date('2024-11-05'),
  },
  {
    id: 'exp-004',
    userId: 'user-001',
    amount: 65.00,
    category: 'utilities',
    description: 'Electric bill',
    date: new Date('2024-11-03'),
    inputMethod: 'manual',
    recurring: true,
    recurringId: 'rec-002',
    createdAt: new Date('2024-11-03'),
  },
  {
    id: 'exp-005',
    userId: 'user-001',
    amount: 30.00,
    category: 'transportation',
    description: 'Gas station',
    date: new Date('2024-11-06'),
    inputMethod: 'text',
    recurring: false,
    createdAt: new Date('2024-11-06'),
  },
];

export const mockBudget: Budget = {
  id: 'budget-001',
  userId: 'user-001',
  monthlyIncome: 4500,
  categories: {
    housing: 1200,
    food: 400,
    transportation: 300,
    utilities: 200,
    insurance: 250,
    healthcare: 150,
    entertainment: 100,
    shopping: 150,
    personal: 100,
    debt: 1200,
    savings: 250,
    other: 200,
  },
  createdAt: new Date('2024-11-01'),
  updatedAt: new Date('2024-11-01'),
};

export const mockExpenseSummary: ExpenseSummary = {
  period: 'monthly',
  totalSpent: 2847.23,
  budgetAllocated: 3300,
  remaining: 452.77,
  byCategory: [
    {category: 'housing', spent: 1200, budget: 1200},
    {category: 'food', spent: 387.45, budget: 400},
    {category: 'transportation', spent: 245.32, budget: 300},
    {category: 'utilities', spent: 189.50, budget: 200},
    {category: 'insurance', spent: 250, budget: 250},
    {category: 'healthcare', spent: 85.00, budget: 150},
    {category: 'entertainment', spent: 147.23, budget: 100},
    {category: 'shopping', spent: 213.45, budget: 150},
    {category: 'personal', spent: 67.28, budget: 100},
    {category: 'debt', spent: 0, budget: 1200},
    {category: 'savings', spent: 0, budget: 250},
    {category: 'other', spent: 62.00, budget: 200},
  ],
};

// ============================================================================
// MOCK GAMIFICATION DATA
// ============================================================================

export const mockUserProgress: UserProgress = {
  userId: 'user-001',
  level: 5,
  xp: 2350,
  xpToNextLevel: 3000,
  currentStreak: 12,
  longestStreak: 28,
  lastCheckIn: new Date('2024-11-08'),
  totalDebtsCompleted: 2,
};

export const mockGoals: Goal[] = [
  {
    id: 'goal-001',
    userId: 'user-001',
    type: 'emergency_fund',
    title: 'Build $1,000 Emergency Fund',
    description: 'Save $1,000 for unexpected expenses',
    targetAmount: 1000,
    currentAmount: 750,
    status: 'active',
    createdAt: new Date('2024-11-01'),
  },
  {
    id: 'goal-002',
    userId: 'user-001',
    type: 'debt_payoff',
    title: 'Pay off Best Buy Card',
    description: 'Eliminate smallest debt first',
    targetAmount: 650,
    currentAmount: 350,
    deadline: new Date('2025-01-15'),
    status: 'active',
    createdAt: new Date('2024-11-01'),
  },
  {
    id: 'goal-003',
    userId: 'user-001',
    type: 'savings',
    title: 'Save for Vacation',
    description: 'Save $2,000 for summer vacation',
    targetAmount: 2000,
    currentAmount: 450,
    deadline: new Date('2025-06-01'),
    status: 'active',
    createdAt: new Date('2024-10-15'),
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: 'challenge-001',
    type: 'daily',
    name: 'No Coffee Today',
    description: "Skip your daily coffee and save $5",
    xpReward: 10,
    icon: '☕',
    target: 1,
    rulesJson: {type: 'skip_category', category: 'entertainment'},
  },
  {
    id: 'challenge-002',
    type: 'weekly',
    name: 'No-Spend Week',
    description: 'Avoid discretionary spending for 7 days',
    xpReward: 150,
    icon: '🎯',
    target: 7,
    rulesJson: {type: 'no_discretionary', days: 7},
  },
  {
    id: 'challenge-003',
    type: 'monthly',
    name: 'Debt Destroyer',
    description: 'Pay off one complete debt this month',
    xpReward: 500,
    icon: '💪',
    target: 1,
    rulesJson: {type: 'pay_off_debt', count: 1},
  },
];

export const mockUserChallenges: UserChallenge[] = [
  {
    id: 'uc-001',
    userId: 'user-001',
    challengeId: 'challenge-001',
    challenge: mockChallenges[0],
    progress: 0,
    target: 1,
    status: 'active',
    startedAt: new Date('2024-11-08'),
  },
  {
    id: 'uc-002',
    userId: 'user-001',
    challengeId: 'challenge-002',
    challenge: mockChallenges[1],
    progress: 3,
    target: 7,
    status: 'active',
    startedAt: new Date('2024-11-02'),
  },
];

export const mockBadges: Badge[] = [
  {
    id: 'badge-001',
    name: 'First Steps',
    description: 'Completed onboarding',
    icon: '🎉',
    unlockedAt: new Date('2024-11-01'),
  },
  {
    id: 'badge-002',
    name: 'Week Warrior',
    description: 'Maintained 7-day streak',
    icon: '🔥',
    unlockedAt: new Date('2024-11-07'),
  },
  {
    id: 'badge-003',
    name: 'Debt Slayer',
    description: 'Paid off first debt',
    icon: '⚔️',
    unlockedAt: new Date('2024-10-20'),
  },
  {
    id: 'badge-004',
    name: 'Budget Master',
    description: 'Stayed under budget for 1 month',
    icon: '📊',
  },
  {
    id: 'badge-005',
    name: 'Gazelle Intensity',
    description: 'Reached level 10',
    icon: '🦌',
  },
];

// ============================================================================
// MOCK AI INSIGHTS
// ============================================================================

export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-001',
    type: 'tip',
    title: 'Almost There!',
    message:
      "You're only $37 away from paying off your Best Buy Card. One extra payment could finish it this month!",
    actionable: true,
    actionText: 'Make Payment',
    actionRoute: 'Debts',
    createdAt: new Date('2024-11-08'),
  },
  {
    id: 'insight-002',
    type: 'warning',
    title: 'Spending Alert',
    message:
      "You've spent $147 on entertainment this month, which is 47% over your $100 budget.",
    actionable: true,
    actionText: 'View Budget',
    actionRoute: 'Expenses',
    createdAt: new Date('2024-11-07'),
  },
  {
    id: 'insight-003',
    type: 'celebration',
    title: '12-Day Streak! 🔥',
    message:
      "You've checked in for 12 consecutive days. You're building a powerful habit!",
    actionable: false,
    createdAt: new Date('2024-11-08'),
  },
  {
    id: 'insight-004',
    type: 'recommendation',
    title: 'Emergency Fund Progress',
    message:
      "You're $250 away from your $1,000 emergency fund goal. Consider redirecting some savings this month.",
    actionable: true,
    actionText: 'View Goals',
    actionRoute: 'Goals',
    createdAt: new Date('2024-11-06'),
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getTotalDebt = (): number => {
  return mockDebts
    .filter(d => d.status === 'open')
    .reduce((sum, debt) => sum + debt.currentBalance, 0);
};

export const getMonthlyMinPayments = (): number => {
  return mockDebts
    .filter(d => d.status === 'open')
    .reduce((sum, debt) => sum + debt.minPayment, 0);
};

export const getNextDebtToPayOff = (): Debt | undefined => {
  return mockDebts
    .filter(d => d.status === 'open')
    .sort((a, b) => a.payoffOrder - b.payoffOrder)[0];
};

export const getMonthsUntilDebtFree = (): number => {
  const targetDate = mockSnowballPlan.targetDebtFreeDate;
  const now = new Date();
  const monthsDiff =
    (targetDate.getFullYear() - now.getFullYear()) * 12 +
    (targetDate.getMonth() - now.getMonth());
  return Math.max(0, monthsDiff);
};

export const getEmergencyFundProgress = (): number => {
  return (
    (mockSnowballPlan.emergencyFundCurrent /
      mockSnowballPlan.emergencyFundTarget) *
    100
  );
};

export const getThisMonthExpenses = (): Expense[] => {
  const now = new Date();
  return mockExpenses.filter(
    exp =>
      exp.date.getMonth() === now.getMonth() &&
      exp.date.getFullYear() === now.getFullYear(),
  );
};

export const getCategoryIcon = (category: string): string => {
  const icons: {[key: string]: string} = {
    housing: '🏠',
    food: '🍔',
    transportation: '🚗',
    utilities: '💡',
    insurance: '🛡️',
    healthcare: '🏥',
    entertainment: '🎬',
    shopping: '🛍️',
    personal: '👤',
    debt: '💳',
    savings: '💰',
    other: '📦',
  };
  return icons[category] || '📦';
};

export const getDebtTypeLabel = (type: string): string => {
  const labels: {[key: string]: string} = {
    'credit-card': 'Credit Card',
    personal: 'Personal Loan',
    auto: 'Auto Loan',
    student: 'Student Loan',
    medical: 'Medical Debt',
    bnpl: 'Buy Now Pay Later',
  };
  return labels[type] || type;
};
