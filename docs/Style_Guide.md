# Debt Destroyer - Complete Style Guide

**Version:** 2.0
**Last Updated:** 2025-11-09
**Platform:** React Native (iOS + Android)
**Status:** ✅ Updated with New Color System & Typography Implementation

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons](#icons)
7. [Shadows & Elevation](#shadows--elevation)
8. [Animations & Transitions](#animations--transitions)
9. [Accessibility](#accessibility)
10. [Dark Mode](#dark-mode)
11. [Implementation Status](#implementation-status)

---

## Design Philosophy

### Core Principles

1. **Behavior > Math** - Focus on habit formation and emotional engagement over complex calculations
2. **Cognitive Simplicity** - Each screen optimized for a specific user mindset (passive, active, action, control)
3. **iOS-First Design** - Follow Apple's Human Interface Guidelines for consistency and familiarity
4. **Gamification with Purpose** - Motivate through positive reinforcement, not punishment
5. **Privacy by Design** - Clear visual hierarchy that respects sensitive financial data

### 4-Screen Architecture

Each screen serves a distinct purpose:

- **Dashboard** - Passive review mode (instant awareness)
- **Expenses** - Action mode (low-friction logging)
- **Goals** - Active play mode (gamified engagement)
- **Settings** - Control mode (personalization)

---

## Color System

### 🎨 Professional Color Palette

We use a sophisticated color system with light/dark variants for each color.

#### Primary Color Palette
| Color | Light Mode | Dark Mode | Use Case |
|-------|------------|-----------|----------|
| **Forest Fade** | `#275E59` | `#183E3A` | Primary brand color, success states |
| **Sapphire Night** | `#0A4A8B` | `#042F5C` | Secondary actions, priority elements |
| **Midnight Plum** | `#6A25B0` | `#4A1583` | Premium features, highlights |
| **Cosmic Violet** | `#5A0C9A` | `#3E086A` | Special actions, gamification |
| **Royal Indigo** | `#45409B` | `#2E2770` | Professional elements, charts |

#### Accent Color Palette
| Color | Light Mode | Dark Mode | Use Case |
|-------|------------|-----------|----------|
| **Velvet Rose** | `#B42352` | `#7E173A` | Debt indicators, warnings |
| **Burnt Merlot** | `#8C2654` | `#611538` | Urgent actions, accelerators |
| **Copper Ember** | `#9B4C14` | `#6A340F` | Streaks, achievements, rewards |
| **Ocean Teal** | `#0A7E85` | `#06535A` | Financial insights, growth |
| **Deep Azure** | `#0A5BAA` | `#043C74` | Information, help states |

#### Neutral Color Palette
| Color | Light Mode | Dark Mode | Use Case |
|-------|------------|-----------|----------|
| **Emerald Shadow** | `#0E7A72` | `#04514A` | Success states, completion |
| **Space Navy** | `#172245` | `#0B132B` | Deep backgrounds, modals |
| **Marine Steel** | `#346373` | `#234552` | Surface elements, cards |
| **Obsidian Blue** | `#183A66` | `#102541` | Borders, dividers |

### 🌅 Background Colors

**Custom backgrounds for optimal readability:**
```typescript
background: {
  light: '#F9F3E6',  // soft, creamy yellow-white (like parchment or sunlight on ivory)
  dark: '#142850',    // Obsidian Blue (deep navy with subtle teal undertone)
}
```

### 🎯 Semantic Color Mapping

```typescript
// Brand colors using our palette
primary: '#275E59',      // Forest Fade light
secondary: '#0A4A8B',    // Sapphire Night light
accent: '#B42352',       // Velvet Rose light

// Semantic colors from palette
success: '#0E7A72',      // Emerald Shadow light
warning: '#9B4C14',      // Copper Ember light
error: '#B42352',        // Velvet Rose light
info: '#0A5BAA',         // Deep Azure light

// Debt-specific colors
debtRed: '#B42352',      // Velvet Rose - debt indicator
payoffGreen: '#0E7A72',  // Emerald Shadow - success
snowballBlue: '#0A4A8B', // Sapphire Night - snowball plan
```

### 📱 Theme-Aware Implementation

```typescript
import { getColor, forestFade, sapphireNight } from '../theme';

// Automatic theme-aware color selection
const forestColor = getColor(forestFade, isDark); // #275E59 (light) or #183E3A (dark)
const sapphireColor = getColor(sapphireNight, isDark); // #0A4A8B (light) or #042F5C (dark)
```

### 🎨 Usage Guidelines

**Forest Fade (#275E59)**
- Primary brand color
- Total Debt card gradient
- Success messages
- "Snowball" badges

**Sapphire Night (#0A4A8B)**
- Priority debt cards
- Action buttons
- Navigation highlights
- Professional elements

**Velvet Rose (#B42352)**
- Debt balance indicators
- "Accelerate Payment" button
- Urgency states
- Warning elements

**Background Colors**
- Light: `#F9F3E6` - Creamy, warm, reduces eye strain
- Dark: `#142850` - Professional, calming, maintains readability

---

## Typography System

### 📖 Font Family: Helvetica Neue

**Status:** ✅ **FULLY IMPLEMENTED** across all screens and components

**Installed Weights:**
- Light (300) - `HelveticaNeue-Light`
- Regular (400) - `HelveticaNeue`
- Medium (500) - `HelveticaNeue-Medium`
- Bold (700) - `HelveticaNeue-Bold`

### 📏 Typography Scale (iOS Standard)

#### Large Title (34pt)
```typescript
{
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: 34,
  lineHeight: 40,
  letterSpacing: -0.34,
  fontWeight: '700',
}
```
**Use:** Main screen titles, navigation headers
**Spacing:** 24pt above, 16pt below

#### Title 1 (28pt)
```typescript
{
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: 28,
  lineHeight: 34,
  letterSpacing: -0.28,
  fontWeight: '700',
}
```
**Use:** Dashboard "Total Debt Countdown", section headers
**Spacing:** 20pt above, 12pt below

#### Title 2 (22pt)
```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 22,
  lineHeight: 28,
  letterSpacing: -0.11,
  fontWeight: '500',
}
```
**Use:** "Priority Debt", "Other Debts", "Your Progress Analytics"
**Spacing:** 16pt above, 10pt below

#### Title 3 (20pt)
```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 20,
  lineHeight: 26,
  letterSpacing: -0.1,
  fontWeight: '500',
}
```
**Use:** Debt names, goal titles, card headers
**Spacing:** 14pt above, 8pt below

#### Headline (17pt)
```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: 0,
  fontWeight: '500',
}
```
**Use:** Button labels, emphasized text, tab labels
**Spacing:** 8pt above, 6pt below

#### Body (17pt)
```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: 0,
  fontWeight: '400',
}
```
**Use:** Main reading text, descriptions, instructions
**Spacing:** 8pt between paragraphs

#### Callout (16pt)
```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 16,
  lineHeight: 22,
  letterSpacing: 0,
  fontWeight: '400',
}
```
**Use:** AI insights, highlighted information

#### Subheadline (15pt)
```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 15,
  lineHeight: 20,
  letterSpacing: 0,
  fontWeight: '400',
}
```
**Use:** Secondary labels, metadata (debt type, balance labels)

#### Footnote (13pt)
```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 13,
  lineHeight: 18,
  letterSpacing: 0.043,
  fontWeight: '400',
}
```
**Use:** APR percentages, timestamps, hints

#### Caption 1 (12pt)
```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.043,
  fontWeight: '400',
}
```
**Use:** Progress percentages, helper text

#### Caption 2 (11pt)
```typescript
{
  fontFamily: 'HelveticaNeue-Light',
  fontSize: 11,
  lineHeight: 15,
  letterSpacing: 0.085,
  fontWeight: '300',
}
```
**Use:** Tab bar labels, small metadata

#### Button Text (17pt)
```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: 0.043,
  fontWeight: '500',
}
```
**Use:** All action buttons

### 📝 Typography Implementation Status

**✅ COMPLETED FILES:**

**Navigation (3 files):**
- `MainTabNavigator.tsx` - Tab labels, headers
- `RootNavigator.tsx` - Stack headers
- `OnboardingNavigator.tsx` - Onboarding headers

**Screens (10 files):**
- Dashboard, Goals, Expenses, Settings
- Welcome, OnboardingIntro, OnboardingDebts
- OnboardingIncome, OnboardingEmergencyFund, OnboardingComplete

**Components (8 files):**
- Button, Badge, Input, ProgressBar
- DebtCard, ExpenseCard, GoalCard, ChallengeCard

### 🎯 Typography Rules

1. **Never skip heading levels** - Maintain hierarchy (Title 1 → Title 2 → Title 3)
2. **Maximum 3 heading levels per screen** - Reduces cognitive load
3. **Use Body for all paragraph text** - Consistency
4. **Minimum readable size: 11pt** - Accessibility
5. **Line length: 40-60 characters** - Optimal readability

### 📱 Screen-Specific Typography

#### Dashboard Screen
- Screen title: **Title 1**
- Section headers: **Title 2**
- Debt names: **Title 3**
- Labels: **Subheadline**
- Amounts: **Title 1** or **Title 2**
- Progress text: **Caption 1**

#### Goals & Challenges Screen
- Screen title: **Title 1**
- Goal/Challenge titles: **Title 2**
- Progress labels: **Subheadline**
- XP amounts: **Headline**
- Descriptions: **Body** or **Callout**
- Streak counter: **Headline**

#### Settings Screen
- Screen title: **Title 1**
- Section headers: **Title 2**
- Setting labels: **Body**
- Descriptions: **Footnote**
- Version/legal: **Caption 2**

---

## Spacing & Layout

### 📐 8pt Grid System

All spacing uses multiples of 8:

```typescript
spacing: {
  xs: 2,      // Tight spacing (captions)
  sm: 4,      // Small spacing
  base: 8,    // Base unit
  md: 16,     // Standard spacing
  lg: 24,     // Section spacing
  xl: 32,     // Page breaks
  '2xl': 40,  // Large dividers
}
```

### 🖼️ Screen Padding

```typescript
screenPadding: 16  // Minimum horizontal padding on all screens
```

### 🔲 Border Radius

```typescript
radius: {
  sm: 8,      // Small elements (badges)
  md: 12,     // Medium elements (cards)
  lg: 20,     // Large elements (main cards)
  full: 9999, // Circular (buttons, avatars)
}
```

### 📱 Layout Guidelines

**Containers:**
- Horizontal padding: 16pt minimum
- Vertical padding: 16pt minimum
- Max content width: 90% of screen

**Cards:**
- Border radius: 12pt (standard), 20pt (featured)
- Padding: 16pt (standard), 20pt (large)
- Margin bottom: 12pt between cards

**Lists:**
- Item height: 44pt minimum (tap target)
- Spacing between items: 8pt
- Section spacing: 24pt

---

## Components

### 🔘 Buttons

#### Primary Button
```typescript
{
  backgroundColor: colors.primary, // Forest Fade
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 9999,
  minHeight: 44,
}
// Text: Button style (Medium, 17pt)
```

#### Secondary Button
```typescript
{
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: colors.primary, // Forest Fade
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 9999,
  minHeight: 44,
}
```

#### Icon Button (Accelerate)
```typescript
{
  width: 56,
  height: 56,
  borderRadius: 9999,
  backgroundColor: colors.warning, // Copper Ember
  alignItems: 'center',
  justifyContent: 'center',
}
// Icon size: 28pt
```

### 🎴 Gradient Cards

**Status:** ✅ **IMPLEMENTED** with premium glass-morphism effect

#### Total Debt Card (Forest Fade)
```typescript
<GradientCard
  baseColor={getColor(forestFade, isDark)} // #275E59 (light) or #183E3A (dark)
  style={totalDebtCard}
>
```

#### Priority Debt Card (Sapphire Night)
```typescript
<GradientCard
  baseColor={getColor(sapphireNight, isDark)} // #0A4A8B (light) or #042F5C (dark)
  style={priorityDebtCard}
>
```

#### Gradient Card Features
- **3-stop elegant gradient** with warm highlights
- **Glass-morphism effect** with subtle borders
- **Theme-aware colors** (light/dark variants)
- **Readability vignette** for text contrast
- **Sophisticated polish layer** for depth

### 📝 Input Fields

```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 17,
  lineHeight: 22,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.border.light / colors.border.dark,
  backgroundColor: colors.background.light / colors.background.dark,
  minHeight: 44,
}
// Placeholder color: #999999 (60% gray)
// Focus border: colors.primary (Forest Fade)
```

### 📊 Progress Bars

```typescript
{
  height: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.3)', // on colored backgrounds
  borderRadius: 4,
  overflow: 'hidden',
}
// Fill: white (on colored) or colors.primary (on neutral)
```

### 🏷️ Badges

```typescript
{
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
  backgroundColor: 'rgba(39, 94, 89, 0.2)', // Forest Fade badge
}
// Text: Caption 1 style, color: Forest Fade
```

---

## Icons

### 🎨 Icon Library: Heroicons

**Variants:**
- Solid: Active states, primary actions
- Outline: Inactive states, secondary actions

**Size Standards:**
- Navigation/Tabs: 24pt
- Cards/Headers: 28pt
- Buttons: 20-24pt
- Inline: 16-20pt

### 📍 Icon Map

| Screen/Feature | Icon | Variant | Color |
|----------------|------|---------|-------|
| Dashboard Tab | HomeModernIcon | Solid (active) / Outline (inactive) | Forest Fade |
| Expenses Tab | BanknotesIcon | Solid (active) / Outline (inactive) | Forest Fade |
| Goals Tab | TrophyIcon | Solid (active) / Outline (inactive) | Forest Fade |
| Settings | UserIcon | Solid | Forest Fade |
| Credit Card | CreditCardIcon | Solid | White |
| Accelerate | RocketLaunchIcon | Solid | White |
| Chevron | ChevronRightIcon | Solid | White |
| Emergency Fund | ShieldCheckIcon | Solid | White |
| Debt Payoff | FireIcon | Solid | White |
| Savings | BanknotesIcon | Solid | White |
| Custom Goal | TrophyIcon | Solid | White |
| XP/Reward | StarIcon | Solid | Forest Fade |
| Completed | CheckCircleIcon | Solid | Forest Fade |
| Failed | XCircleIcon | Solid | Velvet Rose |
| Streak | FireIcon | Solid | Copper Ember |

### 🎨 Icon Colors

**Light Mode:**
- Active: `colors.primary` (Forest Fade)
- Inactive: `colors.text.secondary.light` (#666666)
- On colored backgrounds: White (#FFFFFF)

**Dark Mode:**
- Active: `colors.primary` (Forest Fade)
- Inactive: `colors.text.secondary.dark` (#B8B8B8)
- On colored backgrounds: White (#FFFFFF)

---

## Shadows & Elevation

### 🌑 Shadow Levels

#### Level 1 (sm) - Subtle
```typescript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
}
```
**Use:** Small badges, chip elements

#### Level 2 (md) - Standard
```typescript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}
```
**Use:** Standard cards, list items

#### Level 3 (lg) - Elevated
```typescript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 4,
}
```
**Use:** Featured cards, floating buttons

#### Level 4 (xl) - Floating
```typescript
{
  shadowColor: '#000',
  shadowOpacity: 0.16,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 10 },
  elevation: 8,
}
```
**Use:** Gradient cards, modals, popovers

---

## Animations & Transitions

### ⏱️ Timing Functions

```typescript
timing: {
  fast: 150,      // Quick feedback (button press)
  normal: 250,    // Standard transitions
  slow: 350,      // Complex animations
}

easing: {
  standard: Easing.bezier(0.4, 0.0, 0.2, 1),
  accelerate: Easing.bezier(0.4, 0.0, 1, 1),
  decelerate: Easing.bezier(0.0, 0.0, 0.2, 1),
}
```

### 🎬 Animation Guidelines

**Buttons:**
- Press: Scale 0.95, duration 150ms
- Release: Scale 1.0, duration 150ms
- Haptic feedback on press

**Modals:**
- Enter: Slide up + fade in, 350ms
- Exit: Slide down + fade out, 250ms

**Tab Navigation:**
- Fade between screens, 250ms
- No slide animations (iOS standard)

**Progress Bars:**
- Smooth fill animation, 500ms
- Easing: decelerate

**Gradient Cards:**
- Subtle scale on press: 0.98 → 1.0, 150ms
- Elegant opacity transitions: 200ms

**Confetti/Celebrations:**
- Trigger on: Goal completion, debt payoff, level up
- Duration: 2000ms
- Particle count: 50-100

---

## Accessibility

### ♿ Minimum Requirements

1. **Color Contrast:**
   - Body text: 4.5:1 minimum
   - Large text (18pt+): 3:1 minimum
   - UI elements: 3:1 minimum

2. **Touch Targets:**
   - Minimum: 44pt × 44pt
   - Spacing between targets: 8pt minimum

3. **Dynamic Type:**
   - Support iOS text size preferences
   - Test at all accessibility sizes
   - Allow text to scale up to 200%

4. **Screen Readers:**
   - All interactive elements labeled
   - Meaningful labels (not "Button" or "Icon")
   - Reading order follows visual hierarchy

5. **Motion:**
   - Respect `prefers-reduced-motion`
   - Provide alternative feedback (haptics, color)

### 🔊 ARIA Labels & Hints

```typescript
// Good
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Accelerate payment for Priority Debt"
  accessibilityHint="Opens payment options to pay off debt faster"
>

// Bad
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Button"
>
```

---

## Dark Mode

### 🌙 Color Adaptation

**Automatically adapts:**
- Background colors (Creamy light → Obsidian dark)
- Text colors (Dark → Light)
- Border colors (Light → Dark)
- Surface colors (White → Dark blue-gray)

**Manually adjusted:**
- Card backgrounds (lighter in dark mode for contrast)
- Shadows (more subtle in dark mode)
- Icon colors (theme-aware)

### 🌙 Dark Mode Implementation

```typescript
import { useTheme } from '../contexts';

const { isDark } = useTheme();

<View style={{
  backgroundColor: isDark ? '#142850' : '#F9F3E6',
}}>
  <Text style={{
    color: isDark ? '#FFFFFF' : '#1A1A1A',
  }}>
```

### 🎨 Theme Toggle

**Status:** ✅ **IMPLEMENTED** in Settings screen

Features:
- **Light Mode:** Manual light theme
- **Dark Mode:** Manual dark theme
- **System Mode:** Follows device settings
- **Visual Indicators:** Icons and active states
- **Instant switching:** No app restart required

### 🧪 Dark Mode Testing

Test all screens in both modes:
1. **Dashboard** - Gradient cards remain vibrant, text readable
2. **Goals** - Game elements should pop, XP visible
3. **Expenses** - Numbers critical for readability
4. **Settings** - Forms and text fields clear
5. **Theme Toggle** - All three modes functional

---

## Implementation Status

### ✅ Completed Features

**Typography System (100%)**
- ✅ Helvetica Neue font family integrated
- ✅ All 21 files updated with proper typography
- ✅ Font weights correctly mapped
- ✅ Letter spacing and line heights applied
- ✅ iOS typography standards followed

**Color System (100%)**
- ✅ 15-color professional palette implemented
- ✅ Light/dark variants for each color
- ✅ Custom background colors (creamy/obsidian)
- ✅ Theme-aware color selection functions
- ✅ Color library with helper functions

**Gradient Cards (100%)**
- ✅ Premium glass-morphism effect
- ✅ 3-stop elegant gradient system
- ✅ Theme-aware color adaptation
- ✅ Sophisticated polish and vignette layers
- ✅ Forest Fade and Sapphire Night cards implemented

**Theme System (100%)**
- ✅ Global theme context implemented
- ✅ Settings screen with theme toggle
- ✅ Light/Dark/System modes functional
- ✅ Real-time theme switching
- ✅ Persistent theme preferences (planned)

**Component Library (100%)**
- ✅ Button, Card, Input, Badge components
- ✅ ProgressBar, GoalCard, DebtCard, ChallengeCard
- ✅ GradientCard component with advanced features
- ✅ All components use proper typography and colors

### 🚧 In Progress

**State Management**
- ⏳ Redux/Context store implementation
- ⏳ Data persistence with AsyncStorage
- ⏳ Theme persistence across app restarts

**Advanced Features**
- ⏳ AI-powered insights and nudges
- ⏳ Voice/text expense logging
- ⏳ Advanced analytics and charts

### 📋 Next Steps

1. **State Management** - Implement Redux Toolkit for global state
2. **Data Persistence** - Add AsyncStorage for theme and user data
3. **Form Validation** - Advanced input validation and error handling
4. **Animations** - Micro-interactions and celebration animations
5. **Analytics** - Progress tracking and data visualization

---

## Component Library Reference

### 💻 Usage Example

```typescript
import {
  colors,
  typography,
  spacing,
  shadows,
  forestFade,
  sapphireNight,
  getColor
} from '../theme';
import { GradientCard } from '../components';
import { useTheme } from '../contexts';

const DashboardCard = () => {
  const { isDark } = useTheme();

  return (
    <GradientCard
      baseColor={getColor(forestFade, isDark)}
      style={{
        padding: spacing.lg,
        ...shadows.lg,
      }}
    >
      <Text style={{
        ...typography.styles.title1,
        color: '#FFFFFF',
        marginBottom: spacing.md,
      }}>
        TOTAL DEBT COUNTDOWN
      </Text>
      <Text style={{
        ...typography.styles.largeTitle,
        color: '#FFFFFF',
      }}>
        $12,450
      </Text>
    </GradientCard>
  );
};
```

---

## Quick Reference

### 🎨 Key Color Codes
- **Primary (Forest Fade):** `#275E59` → `#183E3A`
- **Secondary (Sapphire Night):** `#0A4A8B` → `#042F5C`
- **Accent (Velvet Rose):** `#B42352` → `#7E173A`
- **Background:** `#F9F3E6` → `#142850`

### 📏 Key Font Sizes
- **Large Title:** 34pt
- **Title 1:** 28pt
- **Title 2:** 22pt
- **Title 3:** 20pt
- **Body/Headline:** 17pt
- **Footnote:** 13pt
- **Caption:** 11-12pt

### 📐 Key Spacing
- **Base unit:** 8pt
- **Screen padding:** 16pt
- **Card padding:** 16-20pt
- **Section spacing:** 24pt

### 🔲 Key Border Radius
- **Small:** 8pt
- **Medium:** 12pt
- **Large:** 20pt
- **Full:** 9999pt

---

## File Structure

### 📁 Theme System
```
src/theme/
├── index.ts              # Main theme exports
├── colors.ts             # Color definitions
├── colorsLibrary.ts      # Professional color palette
├── typography.ts         # Helvetica Neue typography
├── spacing.ts            # 8pt grid system
└── shadows.ts            # Shadow levels
```

### 📁 Component Library
```
src/components/
├── index.ts              # Component exports
├── Button.tsx            # Button variants
├── Card.tsx              # Card variants
├── Input.tsx             # Input fields
├── Badge.tsx             # Achievement badges
├── ProgressBar.tsx       # Progress visualization
├── GradientCard.tsx      # Premium gradient cards
├── DebtCard.tsx          # Debt display cards
├── GoalCard.tsx          # Goal tracking cards
├── ExpenseCard.tsx       # Expense cards
└── ChallengeCard.tsx     # Challenge cards
```

### 📁 Context System
```
src/contexts/
├── index.ts              # Context exports
└── ThemeContext.tsx      # Global theme management
```

---

**© 2025 Debt Destroyer. All rights reserved.**

*Style Guide Version 2.0 - Updated with comprehensive color system and typography implementation*