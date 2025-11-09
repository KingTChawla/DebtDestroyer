# Debt Destroyer Typography Style Guide
## Helvetica Neue iOS Typography System

**Last Updated:** 2025-11-09
**Version:** 1.0
**Font Family:** Helvetica Neue

---

## Table of Contents

1. [Base Setup](#base-setup)
2. [Typography Styles](#typography-styles)
3. [Usage Guidelines](#usage-guidelines)
4. [Spacing System](#spacing-system)
5. [Accessibility](#accessibility)
6. [Implementation](#implementation)

---

## Base Setup

### Font Family
- **Primary Font:** Helvetica Neue
- **Weights Available:**
  - Light (300)
  - Regular/Roman (400)
  - Medium (500)
  - Bold (700)
- **Fallback:** System (for unsupported platforms)

### Default Settings
- **Line height multiplier:** 1.2× for body text / 1.0–1.1× for headings
- **Letter spacing:**
  - 0 (neutral) for body text
  - −1% (tighter) for large headings
  - +0.25% to +0.5% (looser) for small text
- **Minimum readable size:** 11pt
- **Color contrast:** Minimum 4.5:1 for accessibility

---

## Typography Styles

### Large Title
**Main screen titles, navigation bar titles, top-level page headers**

```typescript
{
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: 34,
  lineHeight: 40,
  letterSpacing: -0.34, // -1%
  fontWeight: '700',
}
```

**Vertical Spacing:**
- Above: 24pt
- Below: 16pt

**Usage:** Dashboard title, main navigation headers, welcome screens

---

### Title 1
**Section titles, dashboard headers, hero headings**

```typescript
{
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: 28,
  lineHeight: 34,
  letterSpacing: -0.28, // -1%
  fontWeight: '700',
}
```

**Vertical Spacing:**
- Above: 20pt
- Below: 12pt

**Usage:** Financial snapshot headers, major section dividers

---

### Title 2
**Secondary section headers, category names, card headlines**

```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 22,
  lineHeight: 28,
  letterSpacing: -0.11, // -0.5%
  fontWeight: '500',
}
```

**Vertical Spacing:**
- Above: 16pt
- Below: 10pt

**Usage:** "Priority Debt", "Other Debts", "Your Progress Analytics"

---

### Title 3
**Sub-section headers, modal titles, list headers**

```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 20,
  lineHeight: 26,
  letterSpacing: -0.1, // -0.5%
  fontWeight: '500',
}
```

**Vertical Spacing:**
- Above: 14pt
- Below: 8pt

**Usage:** Debt card titles, goal names, challenge headers

---

### Headline
**Button labels, tab labels, emphasized inline text**

```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: 0,
  fontWeight: '500',
}
```

**Vertical Spacing:**
- Above: 8pt
- Below: 6pt

**Usage:** Primary action buttons, navigation titles, emphasized UI elements

---

### Body
**Main reading text, paragraphs, form field text**

```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: 0,
  fontWeight: '400',
}
```

**Vertical Spacing:**
- Between paragraphs: 8pt
- Container padding: 16pt minimum (left/right)

**Usage:** Descriptions, instructions, main content text

---

### Callout
**Supplementary information, highlights, annotations**

```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 16,
  lineHeight: 22,
  letterSpacing: 0,
  fontWeight: '400',
}
```

**Vertical Spacing:**
- Above: 8pt
- Below: 4pt

**Usage:** AI insights, important notices, highlighted information

---

### Subheadline
**Secondary labels, metadata rows, small section descriptions**

```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 15,
  lineHeight: 20,
  letterSpacing: 0,
  fontWeight: '400',
}
```

**Vertical Spacing:**
- Above: 6pt
- Below: 4pt

**Usage:** Debt type labels, balance descriptions, secondary information

---

### Footnote
**Legal text, notes, hints, timestamp info**

```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 13,
  lineHeight: 18,
  letterSpacing: 0.043, // +0.25%
  fontWeight: '400',
}
```

**Vertical Spacing:**
- Above: 4pt
- Below: 2pt

**Usage:** APR percentages, due dates, legal disclaimers

---

### Caption 1
**Image captions, input field helper text, short hints**

```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.043, // +0.25%
  fontWeight: '400',
}
```

**Vertical Spacing:**
- Above: 2pt
- Below: 2pt

**Usage:** Progress percentages, form validation messages, tooltips

---

### Caption 2
**Secondary captions, low-priority hints, copyright text**

```typescript
{
  fontFamily: 'HelveticaNeue-Light',
  fontSize: 11,
  lineHeight: 15,
  letterSpacing: 0.085, // +0.5%
  fontWeight: '300',
}
```

**Vertical Spacing:**
- Above: 2pt
- Below: 0pt

**Usage:** Tab bar labels (inactive), small metadata, version numbers

---

### Button Text

```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: 0.043, // +0.25%
  fontWeight: '500',
}
```

**Padding:**
- Small buttons: 8pt (top/bottom), 16pt (sides)
- Large buttons: 12pt (top/bottom), 20pt (sides)
- Minimum tap target: 44pt height

**Usage:** "Add Expense", "Accelerate Payment", "Get Started"

---

### Input Fields & Placeholders

```typescript
{
  fontFamily: 'HelveticaNeue',
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: 0,
  fontWeight: '400',
}
```

**Styling:**
- Placeholder color: 60% gray (#999999)
- Padding: 8pt (top/bottom) inside container
- Active border: Primary color
- Inactive border: Border color (light/dark)

---

### Navigation Bar Titles

```typescript
{
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: 0,
  fontWeight: '700',
}
```

**Alignment:**
- Large screens: Centered
- Mobile: Leading (left-aligned)

---

### Tab Bar Labels

```typescript
{
  fontFamily: 'HelveticaNeue-Medium',
  fontSize: 11,
  lineHeight: 15,
  letterSpacing: 0.085, // +0.5%
  fontWeight: '500',
}
```

**Colors:**
- Active: Primary tint color (#1E88E5)
- Inactive: 50% gray (system gray)

---

## Usage Guidelines

### Hierarchy Rules
1. **Never skip heading levels** - Don't jump from Title 1 to Title 3
2. **Maximum 3 heading levels per screen** - Reduces cognitive load
3. **Use Body for all paragraph text** - Maintains consistency
4. **Buttons use Headline or Button style** - Never Body text

### Screen-Specific Usage

#### Dashboard Screen
- Screen title: **Title 1**
- Section headers ("Priority Debt"): **Title 2**
- Debt names: **Title 3**
- Labels ("Current Balance"): **Subheadline**
- Amounts: **Title 1** or **Title 2**
- Progress text: **Caption 1**
- Tab navigation: **Tab Bar Labels**

#### Goals & Challenges Screen
- Screen title: **Title 1**
- Goal/Challenge titles: **Title 2**
- Progress labels: **Subheadline**
- XP amounts: **Headline**
- Descriptions: **Body** or **Callout**
- Streak counter: **Headline**

#### Expenses & Budgets Screen
- Screen title: **Title 1**
- Category headers: **Title 2**
- Expense items: **Headline**
- Amounts: **Title 3**
- Dates/metadata: **Footnote**
- AI commentary: **Callout**

#### Settings Screen
- Screen title: **Title 1**
- Section headers: **Title 2**
- Setting labels: **Body**
- Descriptions: **Footnote**
- Version/legal: **Caption 2**

---

## Spacing System

### 8pt Grid System
All vertical spacing should use multiples of 8:

```typescript
spacing: {
  xs: 2,    // Tight spacing (captions)
  sm: 4,    // Small spacing (inline elements)
  base: 8,  // Base unit
  md: 16,   // Standard spacing
  lg: 24,   // Section spacing
  xl: 32,   // Page breaks
  '2xl': 40 // Large dividers
}
```

### Text Container Spacing
- **Minimum side padding:** 16pt
- **Maximum line length:** 40-60 characters (for readability)
- **Mobile text width:** 85-90% of screen width
- **Paragraph spacing:** 8pt between paragraphs

---

## Accessibility

### Dynamic Type Support
All text sizes should scale according to user settings:
- Use relative sizing when possible
- Test with iOS accessibility text sizes
- Minimum tap target: 44pt × 44pt

### Color Contrast
- **Minimum ratio:** 4.5:1 for body text
- **Large text (18pt+):** 3:1 minimum
- **Primary text:** #000000 (light mode) / #FFFFFF (dark mode)
- **Secondary text:** #6E6E6E (systemGray)
- **Disabled/Placeholder:** #A8A8A8
- **Link text:** #007AFF (systemBlue) or primary color

### Best Practices
1. ✅ Use Bold for critical call-to-action text
2. ✅ Maintain heading hierarchy
3. ✅ Ensure sufficient line spacing (1.2×–1.4×)
4. ✅ Test with VoiceOver/TalkBack
5. ❌ Don't lock text to fixed sizes
6. ❌ Don't use color alone to convey meaning

---

## Implementation

### React Native Usage

```typescript
import {typography} from '../theme';

// Using predefined styles
<Text style={{
  ...typography.styles.title1,
  color: colors.text.primary.dark,
}}>
  Dashboard
</Text>

// Using individual properties
<Text style={{
  fontFamily: typography.fontFamily.bold,
  fontSize: typography.fontSize.headline,
  lineHeight: typography.lineHeight.headline,
  letterSpacing: typography.letterSpacing.normal,
}}>
  Priority Debt
</Text>
```

### Common Patterns

```typescript
// Screen Title
<Text style={{
  ...typography.styles.title1,
  marginBottom: typography.spacing.md,
}}>
  Goals & Challenges
</Text>

// Section Header
<Text style={{
  ...typography.styles.title2,
  marginTop: typography.spacing.lg,
  marginBottom: typography.spacing.base,
}}>
  Active Goals
</Text>

// Button
<TouchableOpacity style={{
  paddingVertical: 12,
  paddingHorizontal: 20,
}}>
  <Text style={typography.styles.button}>
    Get Started
  </Text>
</TouchableOpacity>
```

---

## Quick Reference

| Style | Font | Size | Weight | Use Case |
|-------|------|------|--------|----------|
| Large Title | Bold | 34pt | 700 | Screen titles |
| Title 1 | Bold | 28pt | 700 | Section headers |
| Title 2 | Medium | 22pt | 500 | Subsections |
| Title 3 | Medium | 20pt | 500 | Card headers |
| Headline | Medium | 17pt | 500 | Buttons, tabs |
| Body | Regular | 17pt | 400 | Main text |
| Callout | Regular | 16pt | 400 | Highlights |
| Subheadline | Regular | 15pt | 400 | Metadata |
| Footnote | Regular | 13pt | 400 | Hints |
| Caption 1 | Regular | 12pt | 400 | Helpers |
| Caption 2 | Light | 11pt | 300 | Small text |
| Button | Medium | 17pt | 500 | Actions |

---

**© 2025 Debt Destroyer. All rights reserved.**
