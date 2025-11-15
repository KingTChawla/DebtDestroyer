# Onboarding Architecture - Implementation Design

**Version:** 1.0
**Date:** 2025-11-15
**Purpose:** Technical architecture for implementing the 43-screen onboarding flow using config-driven, reusable screen components

---

## Design Philosophy

### Config-Driven Architecture
- **8 smart screen components** instead of 43 separate files
- Each screen component renders different content based on JSON configuration
- Centralized configuration file for all 43 screens
- Easy to modify flow, reorder screens, or A/B test without code changes

### Performance Considerations
- Each screen component is lazy-loaded
- Configuration is minimal JSON (not heavy components)
- State updates are optimized with Zustand selectors
- Screens unmount when not visible (React Navigation default behavior)

### Maintainability
- Clear separation: UI components vs. screen logic vs. configuration
- TypeScript ensures type safety across all configs
- Easy debugging with screen IDs and step tracking
- Single source of truth for onboarding flow

---

## Screen Component Architecture

### 1. OnboardingWelcomeScreen
**Handles:** Screens 1-2 (Welcome & Motivation)

**Props:**
```typescript
interface WelcomeScreenProps {
  config: {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    illustration?: 'welcome' | 'motivation' | 'mission';
    ctaText: string;
    showSkip?: boolean;
  };
  onContinue: () => void;
  onSkip?: () => void;
}
```

**Features:**
- Full-screen hero layout
- Optional illustration/animation
- Primary CTA button
- Optional skip link
- Auto-advance after minimum view time (optional)

---

### 2. OnboardingQuestionScreen
**Handles:** Screens 3-10, 12, 27-29, 32-34 (Questions with tile/slider inputs)

**Props:**
```typescript
interface QuestionScreenProps {
  config: {
    id: string;
    question: string;
    description?: string;
    inputType: 'tile-select' | 'slider' | 'picker';
    options?: QuestionOption[];
    multiSelect?: boolean;
    required?: boolean;
    sliderConfig?: {
      min: number;
      max: number;
      step: number;
      labels?: { [key: number]: string };
    };
    progress: { current: number; total: number };
  };
  onAnswer: (value: any) => void;
  onBack: () => void;
}

interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: IconName;
  exclusive?: boolean; // For "None of these" options
}
```

**Features:**
- Renders TileSelector for tile-based questions
- Renders SliderInput for 1-10 scale questions
- Renders native Picker for dropdown questions
- Auto-advance on single-select (optional)
- Progress indicator at top
- Validation before continue

**Used For:**
- Screen 3: Primary Goal (tile-select)
- Screen 4: Experience Level (tile-select)
- Screen 5: Tracking Frequency (tile-select)
- Screen 6: Debt Confidence (tile-select)
- Screen 8: Financial Identity (tile-select)
- Screen 9: Spending Behavior (tile-select)
- Screen 10: Expense Confidence (slider)
- Screen 12: Income Stability (tile-select)
- Screen 27: Debt Burden (slider)
- Screen 28: Emotional Impact (tile-select)
- Screen 29: Financial Habits (tile-select, multi-select)
- Screen 30: Emergency Fund Status (tile-select)
- Screen 32: AI Persona (tile-select)
- Screen 33: Plan Aggressiveness (tile-select)
- Screen 34: Behavior Challenges (tile-select, multi-select)

---

### 3. OnboardingFormScreen
**Handles:** Screens 7, 11, 13-16, 31 (Form-based data entry)

**Props:**
```typescript
interface FormScreenProps {
  config: {
    id: string;
    title: string;
    description?: string;
    fields: FormField[];
    showSkip?: boolean;
    progress: { current: number; total: number };
  };
  onSubmit: (data: Record<string, any>) => void;
  onSkip?: () => void;
  onBack: () => void;
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'currency' | 'picker' | 'checklist';
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  prefix?: string; // e.g., "$"
  suffix?: string; // e.g., "%"
  options?: { id: string; label: string }[]; // For pickers/checklists
  multiSelect?: boolean; // For checklists
  defaultValue?: any;
}
```

**Features:**
- Renders multiple form fields in sequence
- Uses CurrencyInput for money fields
- Uses ChecklistSelector for multi-select
- Form validation
- Collapsible sections (for complex forms like Screen 13-14)
- "Skip for now" option
- Auto-save on blur (optional)

**Used For:**
- Screen 7: Basic Profile (age, location, household size)
- Screen 11: Monthly Income (income inputs, pay frequency)
- Screen 13: Essential Expenses (rent, utilities, groceries, etc.)
- Screen 14: Lifestyle Expenses (dining, entertainment, etc.)
- Screen 15: Savings & Cash Reserves (savings, checking, emergency fund)
- Screen 16: Subscription Discovery (checklist)
- Screen 31: Emergency Fund Target (currency input)

---

### 4. OnboardingDebtFlowScreen
**Handles:** Screens 17-26 (Debt entry multi-step flow)

**Props:**
```typescript
interface DebtFlowScreenProps {
  config: {
    id: string;
    phase: 'intro' | 'entry' | 'summary' | 'confirmation';
    progress: { current: number; total: number };
  };
  onContinue: () => void;
  onBack: () => void;
}
```

**Internal Sub-States:**
```typescript
// Screen 17: Intro
{ phase: 'intro' }

// Screens 18-24: Entry (loops for each debt)
{ phase: 'entry', step: 1-7 }
  Step 1: Debt Type
  Step 2: Creditor Name
  Step 3: Current Balance
  Step 4: Minimum Payment
  Step 5: Interest Rate (APR)
  Step 6: Due Date
  Step 7: Auto-pay Status

// Screen 25: Summary (after each debt)
{ phase: 'summary', debtIndex: n }

// Screen 26: Confirmation
{ phase: 'confirmation' }
```

**Features:**
- Multi-step form wizard
- Progress indicator for current debt
- "Add Another Debt" flow
- Debt summary cards with edit functionality
- Running total of debts entered
- Validation per step
- Can save and return later

**State Management:**
- Stores debts array in Zustand
- Each debt object matches Debt type from types/index.ts

---

### 5. OnboardingPersonalizationScreen
**Handles:** Special personalization screens with unique UIs

**Currently just a wrapper - delegates to OnboardingQuestionScreen**
- Could be used for future custom visualizations
- Placeholder for persona preview animations
- Challenge selection with visual previews

---

### 6. OnboardingResultsScreen
**Handles:** Screens 35-36 (Snowball Power Score & Insights)

**Props:**
```typescript
interface ResultsScreenProps {
  config: {
    id: string;
    type: 'snowball-score' | 'insights';
    progress: { current: number; total: number };
  };
  onContinue: () => void;
}
```

**Features:**
- **Screen 35: Snowball Power Score**
  - Calculates payoff acceleration percentage
  - Shows interest savings estimate
  - Displays projected debt-free date
  - Graph visualization (current path vs. snowball path)
  - Confetti animation on load

- **Screen 36: Personalized Insights**
  - AI-generated insights from user data
  - Highest-interest debt highlight
  - Quickest win identification
  - Spending leak detection
  - Budget recommendations
  - Collapsible insight sections

**Calculations:**
- Uses SnowballCalculator utility (to be created)
- Runs backend-style calculations on frontend for MVP
- Will be replaced with actual API call in Phase 6

---

### 7. OnboardingPaywallScreen
**Handles:** Screens 37-38 (Subscription & Upsell)

**Props:**
```typescript
interface PaywallScreenProps {
  config: {
    id: string;
    type: 'primary' | 'upsell';
    pricing: PricingOption[];
    benefits: string[];
    socialProof?: {
      rating: number;
      reviewCount: number;
      testimonials?: Testimonial[];
    };
    urgency?: {
      countdown?: number; // seconds
      limitedOffer?: string;
    };
  };
  onSelectPlan: (planId: string) => void;
  onContinueFree: () => void;
  onClose?: () => void; // For primary paywall
}

interface PricingOption {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year' | 'lifetime';
  badge?: 'BEST VALUE' | 'MOST POPULAR';
  features?: string[];
  savings?: string; // e.g., "Save $40/year"
}
```

**Features:**
- **Screen 37: Primary Paywall**
  - Full-screen modal
  - 3 pricing cards (Monthly, Annual, Lifetime)
  - Benefits checklist
  - Social proof (rating, testimonials)
  - "Start Free Trial" CTA
  - "See Free Version" link
  - Close button → Triggers upsell

- **Screen 38: One-Time Offer**
  - Only shown if user closes primary or selects monthly
  - Countdown timer (10 minutes, cosmetic)
  - Discounted annual price
  - Urgency messaging
  - "Claim Discount" CTA
  - "No thanks, continue" link

**Integration:**
- RevenueCat for payment processing (Phase 9)
- For MVP: Just selection tracking, no actual payment

---

### 8. OnboardingCompletionScreen
**Handles:** Screens 39-43 (Account creation, plan reveal, activation)

**Props:**
```typescript
interface CompletionScreenProps {
  config: {
    id: string;
    phase: 'account' | 'loading' | 'plan-reveal' | 'checklist' | 'dashboard-intro';
    progress: { current: number; total: number };
  };
  onContinue: () => void;
}
```

**Features:**
- **Screen 39: Account Creation**
  - Social login buttons (Google, Apple)
  - Email/password form
  - Terms & Privacy links

- **Screen 40: Loading**
  - Animated spinner
  - Rotating motivational messages
  - 3-5 second artificial delay

- **Screen 41: Plan Reveal**
  - Debt snowball order visualization
  - Monthly payment breakdown
  - First target debt highlight
  - Estimated timeline
  - Confetti animation

- **Screen 42: Get Started Checklist**
  - Gamified checklist (7 items)
  - XP rewards per task
  - Progress bar
  - Items link to relevant screens

- **Screen 43: Dashboard Introduction**
  - Simplified dashboard preview
  - Optional tutorial tooltips
  - "Continue to Dashboard" CTA
  - Marks onboarding as complete

---

## Centralized Configuration

### Configuration File Structure

```typescript
// src/config/onboardingFlow.ts

export const onboardingFlow: OnboardingStep[] = [
  {
    id: 'welcome',
    screenComponent: 'OnboardingWelcomeScreen',
    config: {
      id: 'welcome',
      title: 'Welcome to DebtDestroyer',
      subtitle: "Let's take control of your money — one debt at a time.",
      illustration: 'welcome',
      ctaText: 'Get Started',
    },
  },
  {
    id: 'motivation',
    screenComponent: 'OnboardingWelcomeScreen',
    config: {
      id: 'motivation',
      title: 'Freedom. Clarity. Peace of mind.',
      subtitle: 'Your debt-free journey starts today.',
      illustration: 'motivation',
      ctaText: 'Next',
    },
  },
  {
    id: 'primary_goal',
    screenComponent: 'OnboardingQuestionScreen',
    config: {
      id: 'primary_goal',
      question: "What's your #1 goal right now?",
      inputType: 'tile-select',
      options: [
        { id: 'pay_off_debt', label: 'Pay off all debt', icon: 'CheckCircleIcon' },
        { id: 'emergency_fund', label: 'Build my first emergency fund', icon: 'ShieldCheckIcon' },
        // ... more options
      ],
      progress: { current: 3, total: 43 },
    },
  },
  // ... 40 more configurations
];

interface OnboardingStep {
  id: string;
  screenComponent: ScreenComponentName;
  config: any; // Typed based on screenComponent
  conditionalDisplay?: (state: OnboardingState) => boolean; // For conditional screens
}
```

### Navigation Flow

```typescript
// src/navigation/OnboardingNavigator.tsx

import { onboardingFlow } from '../config/onboardingFlow';

const OnboardingNavigator = () => {
  const currentStepIndex = useOnboardingStore(state => state.currentStepIndex);
  const currentStep = onboardingFlow[currentStepIndex];

  const handleContinue = () => {
    // Save data to store
    // Move to next step
    // Skip conditional screens if needed
  };

  return (
    <Stack.Navigator>
      {onboardingFlow.map((step, index) => (
        <Stack.Screen
          key={step.id}
          name={step.id}
          component={SCREEN_COMPONENTS[step.screenComponent]}
          initialParams={{ config: step.config }}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
};
```

---

## State Management with Zustand

### Store Structure

```typescript
// src/stores/onboardingStore.ts

interface OnboardingStore {
  // Navigation
  currentStepIndex: number;
  completedSteps: string[];

  // User Profile Data (Screens 3-10)
  primaryGoal: string | null;
  experienceLevel: string | null;
  trackingFrequency: string | null;
  debtConfidence: string | null;
  demographics: {
    age?: number;
    location?: string;
    householdSize?: number;
  };
  financialIdentity: string | null;
  spendingBehavior: string | null;
  expenseAwareness: number | null; // 1-10

  // Financial Data (Screens 11-16)
  income: {
    primary: number;
    secondary?: number;
    frequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';
    stability: 'stable' | 'somewhat_unstable' | 'very_unstable';
  };
  expenses: {
    essential: Record<string, number>;
    lifestyle: Record<string, number>;
  };
  savings: {
    current: number;
    checking: number;
    emergencyFund: {
      status: 'yes' | 'no' | 'building';
      amount?: number;
    };
  };
  subscriptions: Array<{ name: string; cost: number; frequency: string }>;

  // Debts (Screens 17-26)
  debts: Debt[];

  // Assessment (Screens 27-29)
  debtBurden: number; // 1-10
  emotionalImpact: 'low' | 'medium' | 'high' | 'extreme';
  financialHabits: string[];

  // Personalization (Screens 30-34)
  emergencyFundGoal: number;
  aiPersona: 'supportive' | 'direct' | 'energetic' | 'humorous';
  planIntensity: 'slow' | 'standard' | 'gazelle';
  selectedChallenges: string[];

  // Subscription Selection (Screens 37-38)
  selectedPlan: 'free' | 'monthly' | 'annual' | 'lifetime' | null;
  sawUpsell: boolean;

  // Account (Screen 39)
  accountCreated: boolean;
  email?: string;
  authMethod?: 'google' | 'apple' | 'email';

  // Completion
  onboardingComplete: boolean;

  // Actions
  setCurrentStep: (index: number) => void;
  updateAnswer: (field: string, value: any) => void;
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebt: (id: string, debt: Partial<Debt>) => void;
  removeDebt: (id: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}
```

### Persistence

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useOnboardingStore = create(
  persist<OnboardingStore>(
    (set, get) => ({
      // ... state and actions
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist necessary fields
        currentStepIndex: state.currentStepIndex,
        // ... all user data
        // Don't persist navigation flags
      }),
    }
  )
);
```

---

## Reusable UI Components

### Core Components to Build

1. **TileSelector**
   - Single or multi-select tile grid
   - With icons, labels, descriptions
   - Active state styling
   - Haptic feedback on selection

2. **SliderInput**
   - 1-10 scale slider
   - Custom labels at endpoints
   - Live value display
   - Haptic feedback at key values

3. **CurrencyInput**
   - Extends existing Input component
   - $ prefix
   - Automatic formatting (commas)
   - Decimal handling

4. **ChecklistSelector**
   - Multi-select checkboxes
   - Icons and labels
   - "Select all" / "Clear all" options

5. **OnboardingProgress**
   - "Step X of Y" indicator
   - Progress bar
   - Current section label

6. **DebtCard**
   - Summary display for entered debts
   - Edit and delete actions
   - Snowball order indicator

7. **PricingCard**
   - Subscription tier display
   - Badge (Best Value, etc.)
   - Feature list
   - CTA button

---

## File Structure

```
src/
├── screens/
│   └── onboarding/
│       ├── OnboardingWelcomeScreen.tsx
│       ├── OnboardingQuestionScreen.tsx
│       ├── OnboardingFormScreen.tsx
│       ├── OnboardingDebtFlowScreen.tsx
│       ├── OnboardingPersonalizationScreen.tsx
│       ├── OnboardingResultsScreen.tsx
│       ├── OnboardingPaywallScreen.tsx
│       └── OnboardingCompletionScreen.tsx
├── components/
│   └── onboarding/
│       ├── TileSelector.tsx
│       ├── SliderInput.tsx
│       ├── CurrencyInput.tsx
│       ├── ChecklistSelector.tsx
│       ├── OnboardingProgress.tsx
│       ├── DebtCard.tsx
│       └── PricingCard.tsx
├── stores/
│   └── onboardingStore.ts
├── config/
│   └── onboardingFlow.ts
├── utils/
│   └── snowballCalculator.ts
└── navigation/
    └── OnboardingNavigator.tsx (updated)
```

---

## Implementation Priority

### Phase 1: Foundation (Week 1)
1. ✅ Zustand store setup with persistence
2. ✅ Core UI components (TileSelector, SliderInput, CurrencyInput)
3. ✅ OnboardingProgress component
4. ✅ Configuration file structure

### Phase 2: Core Screens (Week 2)
5. ✅ OnboardingWelcomeScreen
6. ✅ OnboardingQuestionScreen
7. ✅ OnboardingFormScreen
8. ✅ Update OnboardingNavigator

### Phase 3: Complex Flows (Week 3)
9. ✅ OnboardingDebtFlowScreen
10. ✅ DebtCard component
11. ✅ Snowball calculator utility
12. ✅ OnboardingResultsScreen

### Phase 4: Conversion & Completion (Week 4)
13. ✅ OnboardingPaywallScreen
14. ✅ PricingCard component
15. ✅ OnboardingCompletionScreen
16. ✅ Integration testing

---

## Success Metrics

- Bundle size: Keep onboarding under 200KB
- Performance: 60fps animations, <100ms response to interactions
- Completion rate: Track drop-off at each step
- Time to complete: Target 8-12 minutes average
- Data quality: Track % of optional fields completed

---

**Next Step:** Begin implementing Phase 1 components following this architecture.
