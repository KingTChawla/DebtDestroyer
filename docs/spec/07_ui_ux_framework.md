# 07) UI/UX Framework & Design System

**LLM SUMMARY:**
- 4-screen cognitive architecture optimized for different user mindsets
- Complete design system with tokens, typography, spacing, and component library
- Behavioral psychology principles for habit formation and motivation
- Micro-interactions with haptic feedback and confetti animations
- Conversational AI interface with voice + text input
- Progressive disclosure and positive reinforcement
- Cross-platform React Native with accessibility and dark mode support

## Design System Architecture

### Design Tokens (Complete)

#### Colors
```typescript
// Brand Colors
const brand = {
  primary: '#4F46E5',      // Indigo
  primaryLight: '#818CF8', // Light Indigo
  primaryDark: '#3730A3',  // Dark Indigo
  secondary: '#10B981',    // Emerald
  accent: '#F59E0B',       // Amber
};

// Semantic Colors
const semantic = {
  success: '#10B981',      // Emerald
  warning: '#F59E0B',      // Amber
  error: '#EF4444',        // Red
  info: '#3B82F6',         // Blue
};

// Neutral Colors
const neutral = {
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',
};

// Dark Mode Colors
const dark = {
  background: '#111827',
  surface: '#1F2937',
  surfaceHover: '#374151',
  border: '#374151',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
};
```

#### Typography
```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '12px',    // Caption, labels
    sm: '14px',    // Body small
    base: '16px',  // Body
    lg: '18px',    // Body large
    xl: '20px',    // Heading small
    '2xl': '24px', // Heading medium
    '3xl': '30px', // Heading large
    '4xl': '36px', // Display
    '5xl': '48px', // Hero
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};
```

#### Spacing (4px Scale)
```typescript
const spacing = {
  0: '0px',
  1: '4px',    // xs
  2: '8px',    // sm
  3: '12px',   // md
  4: '16px',   // lg
  5: '20px',   // xl
  6: '24px',   // 2xl
  8: '32px',   // 3xl
  10: '40px',  // 4xl
  12: '48px',  // 5xl
  16: '64px',  // 6xl
  20: '80px',  // 7xl
  24: '96px',  // 8xl
};
```

#### Shadows & Elevation
```typescript
const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};
```

## Component Library

### Core Components

#### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onPress: () => void;
}

// Usage Examples
<Button variant="primary" size="md" onPress={handleAction}>
  Get Started
</Button>

<Button variant="outline" size="sm" icon={<PlusIcon />}>
  Add Debt
</Button>
```

#### Card Component
```typescript
interface CardProps {
  variant: 'default' | 'elevated' | 'bordered';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress?: () => void;
}

// Usage Examples
<Card variant="elevated" padding="md">
  <Text>Credit Card Debt</Text>
  <Text variant="h2">$2,450</Text>
</Card>
```

### Progress Components

#### ProgressBar
```typescript
interface ProgressBarProps {
  progress: number;        // 0-100
  color?: 'primary' | 'success' | 'warning' | 'error';
  height?: number;
  animated?: boolean;
  showPercentage?: boolean;
}

<ProgressBar
  progress={75}
  color="success"
  showPercentage
  animated
/>
```

#### CircularProgress
```typescript
interface CircularProgressProps {
  progress: number;
  size: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode; // For text in center
}
```

### Gamification Components

#### XPCounter
```typescript
interface XPCounterProps {
  current: number;
  nextLevel: number;
  level: number;
  animated?: boolean;
}

<XPCounter
  current={1250}
  nextLevel={2000}
  level={3}
  animated
/>
```

#### StreakIndicator
```typescript
interface StreakIndicatorProps {
  current: number;
  longest: number;
  fire?: boolean;          // Show fire animation
}

<StreakIndicator current={7} longest={15} fire />
```

#### Badge
```typescript
interface BadgeProps {
  type: 'achievement' | 'milestone' | 'streak';
  icon: string;
  title: string;
  description?: string;
  earned?: boolean;
  new?: boolean;
}
```

### Data Visualization Components

#### Victory Native Charts
```typescript
// Debt Payoff Progress Chart
<BarChart
  data={debtProgressData}
  x="month"
  y="balance"
  animate={{ duration: 1000 }}
/>

// Expense Category Pie Chart
<PieChart
  data={expenseCategories}
  x="category"
  y="amount"
  colorScale={['#4F46E5', '#10B981', '#F59E0B', '#EF4444']}
/>
```

### AI Components

#### ConversationalInput
```typescript
interface ConversationalInputProps {
  onSend: (message: string, inputMethod: 'text' | 'voice') => void;
  placeholder?: string;
  suggestions?: string[];
  voiceEnabled?: boolean;
}

<ConversationalInput
  onSend={handleAISend}
  placeholder="Ask me anything about your finances..."
  suggestions={[
    "How much interest am I paying?",
    "What's my debt-free date?",
    "Should I pay extra on my credit card?"
  ]}
  voiceEnabled
/>
```

#### AIInsightCard
```typescript
interface AIInsightCardProps {
  type: 'tip' | 'warning' | 'celebration' | 'recommendation';
  title: string;
  message: string;
  actionable?: boolean;
  onAction?: () => void;
}
```

## 4-Screen Cognitive Architecture

### Screen Mapping & User Modes

| Screen | User Mode | Cognitive Focus | Design Strategy |
|--------|-----------|----------------|-----------------|
| Dashboard | Passive Review | Awareness & Motivation | Minimal text, high visual contrast, cognitive chunks |
| Goals & Challenges | Active Play | Engagement & Reward | Color-heavy, icon-driven, dopamine-focused |
| Expenses & Budgets | Action | Data Entry & Planning | Low-friction forms, conversational AI, analytics |
| Settings/Profile | Control | Personalization & Security | Clean text layout, minimal noise, clear hierarchy |

### Screen Flow Architecture

#### Onboarding Flow
```
Welcome → Intro → Debts → Income → Emergency Fund → Complete → Dashboard
```

#### Main App Navigation (4 Tabs)
```
┌─────────────────────────────────────────────────────────┐
│                    Main Tab Navigator                   │
├─────────┬─────────────┬─────────────┬─────────────────┤
│Dashboard│Goals &      │Expenses &   │Settings &       │
│         │Challenges   │Budgets      │Profile          │
└─────────┴─────────────┴─────────────┴─────────────────┘
```

#### Dashboard (Passive Review Mode)
- **Primary Focus:** Financial awareness at a glance
- **Key Components:**
  - Financial Snapshot Card
  - Debt Progress Visualization
  - AI Insights Panel
  - Quick Action Buttons
- **Design Principles:**
  - Minimal cognitive load
  - High visual hierarchy
  - Progress visibility
  - Motivational messaging

#### Goals & Challenges (Active Play Mode)
- **Primary Focus:** Gamified engagement
- **Key Components:**
  - User Goal Cards
  - Challenge Carousel
  - XP & Streak Display
  - Achievement Badges
  - Leaderboard (optional)
- **Design Principles:**
  - Dopamine-driven design
  - Color and motion
  - Instant feedback
  - Social comparison (optional)

#### Expenses & Budgets (Action Mode)
- **Primary Focus:** Data entry and financial planning
- **Key Components:**
  - AI Conversational Input
  - Quick Expense Entry
  - Budget Allocation Tool
  - Spending Analytics
  - Category Management
- **Design Principles:**
  - Low-friction input
  - Conversational interface
  - Smart categorization
  - Clear data visualization

#### Settings & Profile (Control Mode)
- **Primary Focus:** Personalization and account management
- **Key Components:**
  - Profile Information
  - AI Persona Settings
  - Notification Preferences
  - Integration Management
  - Subscription Status
- **Design Principles:**
  - Clean typography
  - Minimal visual noise
  - Clear information hierarchy
  - Trust and transparency

## Micro-Interactions & Animations

### Confetti Animation System
```typescript
// Triggered on achievements and milestones
const confettiConfig = {
  particleCount: 50,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'],
};

// Usage on debt payoff
<ConfettiCannon {...confettiConfig} />
```

### Haptic Feedback
```typescript
import { Haptics } from 'expo-haptics';

// Level up achievement
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// Button press
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Warning/error
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
```

### Spring Animations (React Native Reanimated)
```typescript
// Card press animation
const scaleAnim = useSharedValue(1);

const cardPressStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scaleAnim.value }],
}));

const handleCardPress = () => {
  scaleAnim.value = withSpring(0.95, {}, () => {
    scaleAnim.value = withSpring(1);
  });
};
```

### Progress Animations
- **Debt Progress:** Animated fill on dashboard load
- **Level Progress:** Smooth XP bar transitions
- **Streak Counter:** Animated number increments
- **Challenge Progress:** Real-time progress updates

## Behavioral Psychology Integration

### Positive Reinforcement Loop
```typescript
// Reward micro-wins with immediate feedback
const rewardMicroWin = (action: 'expense_logged' | 'debt_payment' | 'goal_completed') => {
  const rewards = {
    expense_logged: { xp: 10, message: "Great job tracking your spending!" },
    debt_payment: { xp: 50, message: "Every payment gets you closer to freedom!" },
    goal_completed: { xp: 100, message: "Amazing milestone achievement!" }
  };

  triggerReward(rewards[action]);
};
```

### Cognitive Load Reduction
- **Chunking:** Group related information into logical chunks
- **Progressive Disclosure:** Show information as needed
- **Recognition over Recall:** Use familiar patterns and icons
- **Minimize Choices:** Limit options to reduce decision fatigue

### Habit Formation Framework
Based on BJ Fogg's Tiny Habits model:

1. **Anchor Moment:** Daily app opening
2. **Tiny Behavior:** Confirm one transaction or check progress
3. **Instant Celebration:** XP, haptic feedback, positive message

### Variable Reward Schedule
- **Daily Check-in:** Guaranteed small reward (10 XP)
- **Challenge Completion:** Variable rewards (50-200 XP)
- **Achievement Unlock:** Rare, significant rewards (500+ XP)
- **Random Bonuses:** Occasional surprise rewards for engagement

## Accessibility & Inclusive Design

### Accessibility Standards
- **VoiceOver/TalkBack Support:** Screen reader compatible
- **Dynamic Type:** Supports system font size preferences
- **High Contrast:** Clear visual hierarchy for low vision users
- **Motor Accessibility:** Large touch targets (44x44 minimum)
- **Color Blindness:** Not dependent on color alone for information

### Implementation Examples
```typescript
// Accessible button with proper labeling
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add new debt"
  accessibilityHint="Opens form to add a new debt to your snowball plan"
  accessibilityRole="button"
  style={styles.addButton}
>
  <Text>Add Debt</Text>
</TouchableOpacity>

// Semantically meaningful progress indicator
<ProgressBar
  progress={75}
  accessibilityLabel="Debt payoff progress"
  accessibilityLiveRegion="polite"
  accessibilityValue={{ min: 0, max: 100, now: 75 }}
/>
```

### Dark Mode Support
- **System Integration:** Respects device dark mode preference
- **Manual Toggle:** User can override system preference
- **Optimized Colors:** Dark mode color palette for reduced eye strain
- **Consistent Experience:** Feature parity across light/dark modes

## Performance Optimization

### Animation Performance
- **Native Drivers:** Use native driver for smooth 60fps animations
- **Layout Animation:** Minimize layout thrashing
- **Image Optimization:** Compressed images with proper sizing
- **Lazy Loading:** Load components and data as needed

### Rendering Optimization
- **Component Memoization:** React.memo for expensive components
- **State Management:** Efficient state updates with Zustand
- **Image Caching:** Local image caching for better performance
- **Code Splitting:** Load screens and components on demand

## Responsive Design

### Cross-Platform Consistency
- **Screen Size Adaptation:** Responsive layouts for different device sizes
- **Platform Norms:** Follow iOS and Android design guidelines
- **Consistent Metrics:** Maintain consistent spacing and sizing
- **Touch Targets:** Appropriate sizing for both platforms

### Device Considerations
- **Notch Handling:** Safe area insets for modern devices
- **Orientation:** Optimized for portrait mode primarily
- **Keyboard Handling:** Proper UI adjustments for keyboard input
- **Multi-Window:** Support for split-screen and picture-in-picture

---
*See: [Gamification System](08_gamification_system.md) → [Build Phases](09_build_phases_and_roadmap.md) → [Security & Privacy](06_security_and_privacy.md)*