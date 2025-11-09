# Debt Destroyer - Complete Style Guide

**Version:** 1.0
**Last Updated:** 2025-11-09
**Platform:** React Native (iOS + Android)

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons](#icons)
7. [Shadows & Elevation](#shadows--elevation)
8. [Animations & Transitions](#animations--transitions)
9. [Accessibility](#accessibility)
10. [Dark Mode](#dark-mode)

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

### Brand Colors

```typescript
primary: '#1E88E5'    // Blue - trust, stability, debt action
secondary: '#43A047'  // Green - success, growth, debt payoff
accent: '#FFB300'     // Gold - achievement, rewards, XP
```

### Semantic Colors

```typescript
success: '#43A047'    // Goal completion, debt paid off
warning: '#FB8C00'    // Attention needed, accelerate action
error: '#E53935'      // Validation errors, failed challenges
info: '#1E88E5'       // Informational messages
```

### Neutral Colors

```typescript
background: {
  light: '#FFFFFF',
  dark: '#121212',
}
surface: {
  light: '#F5F5F5',
  dark: '#1E1E1E',
}
text: {
  primary: {
    light: '#212121',
    dark: '#FFFFFF',
  },
  secondary: {
    light: '#757575',
    dark: '#B0B0B0',
  },
}
border: {
  light: '#E0E0E0',
  dark: '#333333',
}
```

### Debt-Specific Colors

```typescript
debtRed: '#D32F2F'        // Debt balance indicator
payoffGreen: '#388E3C'    // Payoff success celebration
snowballBlue: '#1976D2'   // Snowball plan highlight
```

### Usage Guidelines

**Primary Blue (#1E88E5)**
- Primary action buttons
- Active tab indicators
- Links and interactive elements
- Progress indicators

**Secondary Green (#43A047)**
- Success messages
- "Snowball" badges
- Completed goals
- Positive financial changes

**Accent Gold (#FFB300)**
- XP indicators
- Level badges
- Achievement highlights
- Gamification elements

**Warning Orange (#FB8C00)**
- "Accelerate Payment" button
- Urgency indicators
- Streak fire icon

---

## Typography

### Font Family: Helvetica Neue

**Installed Weights:**
- Light (300) - `HelveticaNeue-Light`
- Regular (400) - `HelveticaNeue`
- Medium (500) - `HelveticaNeue-Medium`
- Bold (700) - `HelveticaNeue-Bold`

### Typography Scale (iOS Standard)

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

### Typography Rules

1. **Never skip heading levels** - Maintain hierarchy (Title 1 → Title 2 → Title 3)
2. **Maximum 3 heading levels per screen** - Reduces cognitive load
3. **Use Body for all paragraph text** - Consistency
4. **Minimum readable size: 11pt** - Accessibility
5. **Line length: 40-60 characters** - Optimal readability

---

## Spacing & Layout

### 8pt Grid System

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

### Screen Padding

```typescript
screenPadding: 16  // Minimum horizontal padding on all screens
```

### Border Radius

```typescript
radius: {
  sm: 8,      // Small elements (badges)
  md: 12,     // Medium elements (cards)
  lg: 20,     // Large elements (main cards)
  full: 9999, // Circular (buttons, avatars)
}
```

### Layout Guidelines

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

### Buttons

#### Primary Button
```typescript
{
  backgroundColor: colors.primary,
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
  borderColor: colors.primary,
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 9999,
  minHeight: 44,
}
```

#### Icon Button
```typescript
{
  width: 56,
  height: 56,
  borderRadius: 9999,
  backgroundColor: colors.warning,
  alignItems: 'center',
  justifyContent: 'center',
}
// Icon size: 28pt
```

### Cards

#### Standard Card
```typescript
{
  backgroundColor: surface.light / surface.dark,
  borderRadius: 12,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}
```

#### Featured Card (Purple - Total Debt)
```typescript
{
  backgroundColor: '#A855F7',
  borderRadius: 20,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
}
```

#### Priority Card (Blue - Priority Debt)
```typescript
{
  backgroundColor: '#5B7FBF',
  borderRadius: 20,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
}
```

### Input Fields

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
// Focus border: colors.primary
```

### Progress Bars

```typescript
{
  height: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.3)', // on colored backgrounds
  borderRadius: 4,
  overflow: 'hidden',
}
// Fill: white (on colored) or colors.primary (on neutral)
```

### Badges

```typescript
{
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
  backgroundColor: 'rgba(67, 160, 71, 0.2)', // Snowball badge
}
// Text: Caption 1 style, color: #43A047
```

---

## Icons

### Icon Library: Heroicons

**Variants:**
- Solid: Active states, primary actions
- Outline: Inactive states, secondary actions

**Size Standards:**
- Navigation/Tabs: 24pt
- Cards/Headers: 28pt
- Buttons: 20-24pt
- Inline: 16-20pt

### Icon Map

| Screen/Feature | Icon | Variant |
|----------------|------|---------|
| Dashboard Tab | HomeModernIcon | Solid (active) / Outline (inactive) |
| Expenses Tab | BanknotesIcon | Solid (active) / Outline (inactive) |
| Goals Tab | TrophyIcon | Solid (active) / Outline (inactive) |
| Settings | UserIcon | Solid |
| Credit Card | CreditCardIcon | Solid |
| Accelerate | RocketLaunchIcon | Solid |
| Chevron | ChevronRightIcon | Solid |
| Emergency Fund | ShieldCheckIcon | Solid |
| Debt Payoff | FireIcon | Solid |
| Savings | BanknotesIcon | Solid |
| Custom Goal | TrophyIcon | Solid |
| XP/Reward | StarIcon | Solid |
| Completed | CheckCircleIcon | Solid |
| Failed | XCircleIcon | Solid |
| Streak | FireIcon | Solid (orange) |

### Icon Colors

**Light Mode:**
- Active: `colors.primary` (#1E88E5)
- Inactive: `colors.text.secondary.light` (#757575)
- On colored backgrounds: White (#FFFFFF)

**Dark Mode:**
- Active: `colors.primary` (#1E88E5)
- Inactive: `colors.text.secondary.dark` (#B0B0B0)
- On colored backgrounds: White (#FFFFFF)

---

## Shadows & Elevation

### Shadow Levels

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
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 16,
  elevation: 8,
}
```
**Use:** Modals, popovers, bottom sheets

---

## Animations & Transitions

### Timing Functions

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

### Animation Guidelines

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

**Confetti/Celebrations:**
- Trigger on: Goal completion, debt payoff, level up
- Duration: 2000ms
- Particle count: 50-100

---

## Accessibility

### Minimum Requirements

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

### ARIA Labels & Hints

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

### Color Adaptation

**Automatically adapts:**
- Background colors
- Text colors
- Border colors
- Surface colors

**Manually adjusted:**
- Card backgrounds (lighter in dark mode for contrast)
- Shadows (more subtle in dark mode)
- Icon colors

### Dark Mode Testing

Test all screens in both modes:
1. Dashboard - colored cards should remain vibrant
2. Goals - game elements should pop
3. Expenses - readability of numbers critical
4. Settings - forms and text fields clear

### Implementation

```typescript
const colorScheme = useColorScheme();
const isDark = colorScheme === 'dark';

<View style={{
  backgroundColor: isDark ? colors.background.dark : colors.background.light,
}}>
  <Text style={{
    color: isDark ? colors.text.primary.dark : colors.text.primary.light,
  }}>
```

---

## Component Library Reference

### Usage Example

```typescript
import {colors, typography, spacing, shadows} from '../theme';

// Dashboard Total Debt Card
<View style={{
  backgroundColor: '#A855F7',
  borderRadius: 20,
  padding: spacing.lg,
  ...shadows.lg,
}}>
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
</View>
```

---

## Quick Reference

### Color Codes
- Primary Blue: `#1E88E5`
- Success Green: `#43A047`
- Accent Gold: `#FFB300`
- Warning Orange: `#FB8C00`
- Error Red: `#E53935`

### Font Sizes
- Large Title: 34pt
- Title 1: 28pt
- Title 2: 22pt
- Title 3: 20pt
- Body/Headline: 17pt
- Footnote: 13pt
- Caption: 11-12pt

### Spacing
- Base unit: 8pt
- Screen padding: 16pt
- Card padding: 16-20pt
- Section spacing: 24pt

### Border Radius
- Small: 8pt
- Medium: 12pt
- Large: 20pt
- Full: 9999pt

---

**© 2025 Debt Destroyer. All rights reserved.**
