/**
 * App Constants
 * Application-wide constants and configuration values
 */

export const APP_NAME = 'Debt Destroyer';
export const APP_TAGLINE = 'Eliminate Debt. Build Freedom.';

// Phase tracking
export const CURRENT_PHASE = 'Phase 1: UI/UX System';
export const PHASE_STATUS = 'In Progress';

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  NORMAL: 'Normal',
  PRO: 'Pro',
  LIFETIME: 'Lifetime',
} as const;

// Debt types
export const DEBT_TYPES = {
  CREDIT_CARD: 'credit-card',
  PERSONAL: 'personal',
  AUTO: 'auto',
  STUDENT: 'student',
  MEDICAL: 'medical',
  BNPL: 'bnpl',
} as const;

// Emergency Fund target
export const EMERGENCY_FUND_TARGET = 1000;

// Feature flags (for gradual rollout)
export const FEATURES = {
  BANK_LINKING: false, // Phase 4
  GAMIFICATION: false, // Phase 5
  COMPANION_MODE: false, // Phase 6
  PAYMENT_ACCELERATORS: false, // Phase 7
} as const;
