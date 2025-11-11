# Debt Destroyer - Style Guide

**Version:** 2.2
**Last Updated:** 2025-11-11
**Platform:** React Native (iOS + Android)
**Status:** ✅ Production Ready Design System

---

## LLM SUMMARY

- React Native design system with 4-screen cognitive architecture (Dashboard, Goals, Expenses, Settings)
- Professional 15-color palette with light/dark variants and theme-aware implementation
- Complete Helvetica Neue typography system following iOS standards
- Modular glass-morphism GradientCard system with screen-matching base colors
- 8pt grid spacing system with consistent padding and border radius patterns
- Comprehensive component library (Button, Card, Input, Badge, ProgressBar)
- Navigation theming with dark mode support and proper icon variants
- Accessibility-first approach with 4.5:1 contrast ratios and 44pt touch targets
- Token-efficient patterns optimized for AI development session continuity

---

## File Summary

Complete design system reference for Debt Destroyer React Native app, encompassing visual design patterns, component specifications, and implementation guidelines. Optimized for AI-assisted development with clear patterns and efficient reference sections.

---

## Design Philosophy

### Core Principles
1. **Behavior > Math** - Focus on habit formation over complex calculations
2. **Cognitive Simplicity** - Each screen optimized for specific user mindset
3. **iOS-First Design** - Follow Apple Human Interface Guidelines
4. **Gamification with Purpose** - Positive reinforcement only
5. **Privacy by Design** - Clear hierarchy for sensitive financial data

### 4-Screen Architecture
- **Dashboard** - Passive review mode (instant awareness)
- **Goals** - Active play mode (gamified engagement)
- **Expenses** - Action mode (low-friction logging)
- **Settings** - Control mode (personalization)

---

## Color System

### Professional Palette (15 Colors)

#### Primary Colors
| Color | Light → Dark | Use Case |
|-------|-------------|----------|
| Forest Fade | `#275E59` → `#183E3A` | Primary brand, success states |
| Sapphire Night | `#0A4A8B` → `#042F5C` | Secondary actions, priority elements |
| Midnight Plum | `#6A25B0` → `#4A1583` | Premium features, highlights |
| Cosmic Violet | `#5A0C9A` → `#3E086A` | Special actions, gamification |
| Royal Indigo | `#45409B` → `#2E2770` | Professional elements, charts |

#### Accent Colors
| Color | Light → Dark | Use Case |
|-------|-------------|----------|
| Velvet Rose | `#B42352` → `#7E173A` | Debt indicators, warnings |
| Burnt Merlot | `#8C2654` → `#611538` | Urgent actions, accelerators |
| Copper Ember | `#9B4C14` → `#6A340F` | Streaks, achievements, rewards |
| Ocean Teal | `#0A7E85` → `#06535A` | Financial insights, growth |
| Deep Azure | `#0A5BAA` → `#043C74` | Information, help states |

#### Neutral Colors
| Color | Light → Dark | Use Case |
|-------|-------------|----------|
| Emerald Shadow | `#0E7A72` → `#04514A` | Success states, completion |
| Space Navy | `#172245` → `#0B132B` | Deep backgrounds, modals |
| Marine Steel | `#346373` → `#234552` | Surface elements, cards |
| Obsidian Blue | `#183A66` → `#102541` | Borders, dividers |

### Background Colors
```typescript
background: {
  light: '#F9F3E6',  // Creamy, warm, reduces eye strain
  dark: '#1A1F2E',   // Professional navy-gray
}
```

### Semantic Mapping
```typescript
// Brand colors
primary: '#275E59',      // Forest Fade
secondary: '#0A4A8B',    // Sapphire Night
accent: '#B42352',       // Velvet Rose

// Semantic colors
success: '#0E7A72',      // Emerald Shadow
warning: '#9B4C14',      // Copper Ember
error: '#B42352',        // Velvet Rose
info: '#0A5BAA',         // Deep Azure

// Debt-specific
debtRed: '#B42352',      // Velvet Rose
payoffGreen: '#0E7A72',  // Emerald Shadow
snowballBlue: '#0A4A8B', // Sapphire Night
```

### Theme-Aware Usage
```typescript
import { getColor, forestFade } from '../theme';
const forestColor = getColor(forestFade, isDark); // Auto light/dark selection
```

---

## Typography System

### Font Family: Helvetica Neue ✅ **FULLY IMPLEMENTED**
**Weights:** Light (300), Regular (400), Medium (500), Bold (700)

### Typography Scale (iOS Standard)
| Style | Size | Weight | Use Case |
|-------|------|--------|----------|
| Large Title | 34pt | Bold | Screen titles, navigation headers |
| Title 1 | 28pt | Bold | Dashboard counters, section headers |
| Title 2 | 22pt | Medium | "Priority Debt", section titles |
| Title 3 | 20pt | Medium | Debt names, goal titles |
| Headline | 17pt | Medium | Button labels, emphasized text |
| Body | 17pt | Regular | Main reading text, descriptions |
| Callout | 16pt | Regular | AI insights, highlighted info |
| Subheadline | 15pt | Regular | Secondary labels, metadata |
| Footnote | 13pt | Regular | APR percentages, timestamps |
| Caption 1 | 12pt | Regular | Progress percentages, helper text |
| Caption 2 | 11pt | Light | Tab bar labels, small metadata |

### Typography Rules
1. **Never skip heading levels** - Maintain hierarchy
2. **Maximum 3 heading levels per screen** - Reduce cognitive load
3. **Use Body for all paragraphs** - Consistency
4. **Minimum readable size: 11pt** - Accessibility
5. **Line length: 40-60 characters** - Optimal readability

### Screen-Specific Usage
**Dashboard:** Title 1 (counters) → Title 2 (sections) → Title 3 (debts)
**Goals:** Title 1 (screen) → Title 2 (goals) → Headline (XP)
**Settings:** Title 1 (screen) → Title 2 (sections) → Body (settings)

---

## Spacing & Layout

### 8pt Grid System
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

### Layout Standards
```typescript
screenPadding: 16,           // Minimum horizontal padding
radius: {
  sm: 8,      // Small elements (badges)
  md: 12,     // Medium elements (cards)
  lg: 20,     // Large elements (main cards)
  full: 9999, // Circular (buttons, avatars)
}
```

### Container Guidelines
- **Horizontal padding:** 16pt minimum
- **Vertical padding:** 16pt minimum
- **Max content width:** 90% of screen
- **Card margin bottom:** 12pt between cards
- **Tap target minimum:** 44pt × 44pt

---

## Components

### Button System
```typescript
// Primary Button
{
  backgroundColor: colors.primary, // Forest Fade
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 9999,
  minHeight: 44,
}

// Secondary Button
{
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: colors.primary,
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 9999,
  minHeight: 44,
}

// Icon Button (Accelerate)
{
  width: 56, height: 56,
  borderRadius: 9999,
  backgroundColor: colors.warning, // Copper Ember
  alignItems: 'center', justifyContent: 'center',
}
```

### Modular Glass-Morphism Card System ✅ **FULLY IMPLEMENTED**

#### Design Philosophy
Creates visual consistency through seamless background integration and premium glass-morphism effects.

#### Card Base Colors Pattern
```typescript
const cardBaseColors = {
  light: '#F9F3E6',  // Match colors.background.light
  dark: '#1A1F2E',   // Match colors.background.dark
};
```

#### GradientCard Implementation
```typescript
<GradientCard
  baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
  useGradient={false}  // Solid background for screen-matching
  style={styles.itemCard}>
  {/* Content component - no background styling */}
</GradientCard>
```

#### Component Composition Pattern
**Content components** (DebtCard, GoalCard, etc.) should:
- NOT include background colors, shadows, or border radius
- Focus only on content layout and internal spacing
- Rely on parent `GradientCard` wrapper for visual styling

### Input Fields
```typescript
{
  fontFamily: 'HelveticaNeue', fontSize: 17, lineHeight: 22,
  paddingVertical: 12, paddingHorizontal: 16,
  borderRadius: 8, borderWidth: 1,
  borderColor: colors.border.light / colors.border.dark,
  backgroundColor: colors.background.light / colors.background.dark,
  minHeight: 44,
}
// Placeholder: #999999, Focus border: colors.primary
```

### Progress Bars
```typescript
{
  height: 8, borderRadius: 4, overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.3)', // on colored
}
// Fill: white (on colored) or colors.primary (on neutral)
```

### Badges
```typescript
{
  paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  backgroundColor: 'rgba(39, 94, 89, 0.2)', // Forest Fade badge
}
// Text: Caption 1 style, color: Forest Fade
```

---

## Icons

### Library: Heroicons
- **Solid:** Active states, primary actions
- **Outline:** Inactive states, secondary actions

### Size Standards
- Navigation/Tabs: 24pt
- Cards/Headers: 28pt
- Buttons: 20-24pt
- Inline: 16-20pt

### Icon Usage Map
| Element | Icon | Variant | Color |
|---------|------|---------|-------|
| Dashboard Tab | HomeModernIcon | Solid/Outline | Forest Fade |
| Goals Tab | TrophyIcon | Solid/Outline | Forest Fade |
| Expenses Tab | BanknotesIcon | Solid/Outline | Forest Fade |
| Settings | UserIcon | Solid | Forest Fade |
| Accelerate | RocketLaunchIcon | Solid | White |
| Completed | CheckCircleIcon | Solid | Forest Fade |
| Streak | FireIcon | Solid | Copper Ember |

### Theme-Aware Colors
**Light Mode:** Active: Forest Fade, Inactive: #666666, On colored: White
**Dark Mode:** Active: White, Inactive: #B8B8B8, On colored: White

### Navigation Implementation
```typescript
import { HomeModernIcon } from 'react-native-heroicons/solid';
import { HomeModernIcon as HomeModernIconOutline } from 'react-native-heroicons/outline';

tabBarIcon: ({focused, color}) =>
  focused ? (
    <HomeModernIcon size={24} color={color} />
  ) : (
    <HomeModernIconOutline size={24} color={color} />
  ),
```

---

## Navigation Theming ✅ **FULLY IMPLEMENTED**

### Tab Bar Styling
```typescript
tabBarStyle: {
  backgroundColor: isDark ? '#1A1F2E' : '#F9F3E6',  // Match screens
  borderTopColor: isDark ? '#2A3B4A' : '#E5D5C1',
}
tabBarActiveTintColor: isDark ? '#FFFFFF' : colors.primary,
tabBarInactiveTintColor: isDark
  ? colors.text.secondary.dark : colors.text.secondary.light,
```

### Header Styling
```typescript
headerStyle: {
  backgroundColor: isDark ? '#1A1F2E' : '#F9F3E6',  // Match screens
  borderBottomWidth: 0, elevation: 0,  // Seamless
}
headerTitleStyle: {
  fontFamily: 'HelveticaNeue-Bold', fontSize: 20,
  color: isDark ? '#FFFFFF' : '#1A1A1A',
}
headerTintColor: isDark ? '#FFFFFF' : '#1A1A1A',  // Back button
```

---

## Shadows & Elevation

### Shadow Levels
```typescript
// Level 1 (sm) - Subtle: badges, chip elements
{ shadowColor: '#000', shadowOffset: {w:0,h:1}, shadowOpacity:.05, shadowRadius:2, elevation:1 }

// Level 2 (md) - Standard: cards, list items
{ shadowColor: '#000', shadowOffset: {w:0,h:2}, shadowOpacity:.1, shadowRadius:4, elevation:2 }

// Level 3 (lg) - Elevated: featured cards, floating buttons
{ shadowColor: '#000', shadowOffset: {w:0,h:4}, shadowOpacity:.15, shadowRadius:8, elevation:4 }

// Level 4 (xl) - Floating: modals, popovers
{ shadowColor: '#000', shadowOffset: {w:0,h:10}, shadowOpacity:.16, shadowRadius:16, elevation:8 }
```

---

## Animations & Transitions

### Timing Functions
```typescript
timing: { fast: 150, normal: 250, slow: 350 }
easing: {
  standard: Easing.bezier(0.4, 0.0, 0.2, 1),
  accelerate: Easing.bezier(0.4, 0.0, 1, 1),
  decelerate: Easing.bezier(0.0, 0.0, 0.2, 1),
}
```

### Animation Guidelines
- **Buttons:** Scale 0.95 on press (150ms) + haptic feedback
- **Modals:** Slide up + fade in (350ms), slide down + fade out (250ms)
- **Tab Navigation:** Fade between screens (250ms), no slide
- **Progress Bars:** Smooth fill (500ms) with decelerate easing
- **Cards:** Subtle scale 0.98→1.0 on press (150ms)
- **Celebrations:** Trigger on goal completion/debt payoff (2000ms)

---

## Accessibility

### Requirements
1. **Color Contrast:** Body text 4.5:1, Large text 3:1, UI elements 3:1
2. **Touch Targets:** 44pt × 44pt minimum, 8pt spacing between targets
3. **Dynamic Type:** Support iOS preferences, scale up to 200%
4. **Screen Readers:** Meaningful labels, proper reading order
5. **Motion:** Respect `prefers-reduced-motion`

### ARIA Implementation
```typescript
// Good practice
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Accelerate payment for Priority Debt"
  accessibilityHint="Opens payment options to pay off debt faster"
>
```

---

## Dark Mode

### Implementation Pattern
```typescript
import { useTheme } from '../contexts';
const { isDark } = useTheme();

// Screen background
backgroundColor: isDark ? '#1A1F2E' : '#F9F3E6'

// Card base colors pattern
const cardBaseColors = { light: '#F9F3E6', dark: '#1A1F2E' };
```

### Theme Toggle ✅ **IMPLEMENTED**
- **Light Mode:** Manual light theme
- **Dark Mode:** Manual dark theme
- **System Mode:** Follow device settings
- **Instant switching:** No app restart required

---

## Implementation Status

### ✅ Completed (100%)
- **Typography System:** Helvetica Neue across 21 files
- **Color System:** 15-color palette with theme-aware functions
- **Gradient Cards:** Premium glass-morphism with modular system
- **Theme System:** Global context with real-time switching
- **Component Library:** All components use proper typography/colors
- **Navigation System:** Complete theming with dark mode support

### File Structure Reference
```
src/theme/
├── index.ts              # Main theme exports
├── colors.ts             # Color definitions
├── colorsLibrary.ts      # Professional palette
├── typography.ts         # Helvetica Neue system
├── spacing.ts            # 8pt grid
└── shadows.ts            # Shadow levels

src/components/
├── index.ts              # Component exports
├── GradientCard.tsx      # Premium glass-morphism cards
├── Button.tsx            # Button variants
└── [Other components...]

src/contexts/
├── index.ts              # Context exports
└── ThemeContext.tsx      # Global theme management
```

---

## Quick Reference

### Key Colors
- **Primary (Forest Fade):** `#275E59` → `#183E3A`
- **Secondary (Sapphire Night):** `#0A4A8B` → `#042F5C`
- **Background:** `#F9F3E6` → `#1A1F2E`
- **Card Base:** Same as background for seamless integration

### Key Typography
- **Large Title:** 34pt Bold
- **Title 1:** 28pt Bold (counters)
- **Title 2:** 22pt Medium (sections)
- **Body:** 17pt Regular (reading)

### Key Spacing
- **Base unit:** 8pt
- **Screen padding:** 16pt
- **Card padding:** 16pt (handled by GradientCard)
- **Section spacing:** 24pt

### Component Patterns
- **Cards:** Use GradientCard wrapper + content component
- **Buttons:** 44pt minimum height, proper accessibility
- **Icons:** Solid for active, outline for inactive

---

## Maintenance Notes

### Extending the Style Guide
1. **Add colors to palette** in `colorsLibrary.ts` before using
2. **Follow GradientCard pattern** for new card types
3. **Maintain 8pt grid** for all spacing decisions
4. **Test accessibility** for new components
5. **Update this document** when adding major features

### Safe Modification Patterns
- **Colors:** Extend palette, don't modify core brand colors
- **Typography:** Add new styles, don't change existing scale
- **Spacing:** Use multiples of 8pt, maintain consistency
- **Components:** Follow established composition patterns
- **Theming:** Test both light/dark modes for changes

### Quality Assurance
- **Cross-reference** with UI/UX framework specifications
- **Validate** accessibility compliance for new components
- **Test** dark mode compatibility for all changes
- **Maintain** token efficiency for AI development sessions

---

**See:** [UI/UX Framework](./spec/07_ui_ux_framework.md) • [Architecture & Stack](./spec/02_architecture_and_stack.md) • [Build Phases](./spec/09_build_phases_and_roadmap.md)

**© 2025 Debt Destroyer. All rights reserved.**