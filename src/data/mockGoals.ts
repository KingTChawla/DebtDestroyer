/**
 * Mock Data: Goals
 * Sample goals for development and testing (Journey/Quest system)
 */

import {Goal, MilestoneData, Badge} from '../types';
import {getColor, emeraldShadow, sapphireNight, royalIndigo} from '../theme/colorsLibrary';

// Goals in upward progression order (future → active → achieved)
export const mockGoals: Goal[] = [
  // Future Quest (not started yet)
  {
    id: 'goal-1',
    userId: 'user-1',
    state: 'future',
    title: 'Travel Fund Expedition',
    description: 'Japan Trip!',
    targetAmount: 5000,
    currentAmount: 0,
    icon: 'flag',
    iconColor: '#999999', // Gray for future state
    category: 'lifestyle',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Active Quest (in progress)
  {
    id: 'goal-2',
    userId: 'user-1',
    state: 'active',
    title: 'Dream Home Adventure',
    description: 'Down payment savings',
    targetAmount: 25000,
    currentAmount: 15000,
    icon: 'home',
    iconColor: getColor(sapphireNight, false),
    category: 'savings',
    timeLeftMonths: 12,
    nextBadge: 'home-saver-bronze',
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
    updatedAt: new Date(),
  },

  // Achieved Quest (completed)
  {
    id: 'goal-3',
    userId: 'user-1',
    state: 'achieved',
    title: 'Emergency Fund Quest',
    description: 'Safety net secured!',
    targetAmount: 1000,
    currentAmount: 1000,
    icon: 'shield-check',
    iconColor: getColor(emeraldShadow, false),
    category: 'emergency',
    completedDate: new Date(2024, 2, 15), // March 2024
    achievementBadge: 'emergency-fund-hero',
    createdAt: new Date(2024, 0, 1), // January 2024
    updatedAt: new Date(2024, 2, 15),
  },

  // Another Achieved Quest
  {
    id: 'goal-4',
    userId: 'user-1',
    state: 'achieved',
    title: 'Car Fund Victory',
    description: 'Reliable transportation secured',
    targetAmount: 8000,
    currentAmount: 8000,
    icon: 'car',
    iconColor: getColor(emeraldShadow, false),
    category: 'lifestyle',
    completedDate: new Date(2024, 1, 1), // February 2024
    achievementBadge: 'car-saver-champion',
    createdAt: new Date(2023, 6, 1), // July 2023
    updatedAt: new Date(2024, 1, 1),
  },
];

// Milestone Summary Data
export const mockMilestoneData: MilestoneData = {
  totalGoalsCompleted: 2,
  totalAmountSaved: 9000,
  currentStreak: 7,
  badges: [
    {
      id: 'badge-1',
      name: 'Emergency Fund Hero',
      description: 'Completed your first emergency fund',
      icon: 'shield-star',
      category: 'goal',
      unlockedAt: new Date(2024, 2, 15),
    },
    {
      id: 'badge-2',
      name: 'Car Saver Champion',
      description: 'Saved $8,000 for reliable transportation',
      icon: 'trophy',
      category: 'goal',
      unlockedAt: new Date(2024, 1, 1),
    },
    {
      id: 'badge-3',
      name: '7-Day Warrior',
      description: 'Maintained a 7-day streak',
      icon: 'fire',
      category: 'streak',
      unlockedAt: new Date(),
    },
  ],
};
