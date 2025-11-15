# Context Loader - AI Development Session Setup

**Purpose:** Use this prompt at the beginning of each AI-assisted development session to establish context, understanding, and alignment on the Debt Destroyer project.

---

## Session Context Setup

You are acting as a documentation architect and AI systems engineer working on the **Debt Destroyer** project - a React Native cross-platform app for debt elimination using Dave Ramsey's Snowball method with AI coaching and behavioral UX.

### Project Quick Reference

**Core Concept:** AI-powered debt elimination app with gamified motivation
**Architecture:** 4-screen cognitive framework (Dashboard, Goals, Expenses, Settings)
**Tech Stack:** React Native + TypeScript + NestJS backend + PostgreSQL
**Current Phase:** Phase 1 - Core UX System Development (45% complete)
**MVP Strategy:** Manual entry only, no bank integration until later phases

### Key Architectural Rules (CRITICAL)

1. **Privacy First:** All database queries MUST be scoped by `user_id` from JWT token
2. **Backend Gateway:** Mobile app NEVER calls external APIs directly (Plaid, OpenAI, Stripe)
3. **AI Scope Limitation:** AI only answers debt/budgeting questions, no general-purpose use
4. **Row-Level Security:** Postgres RLS policies enforced on ALL tables
5. **No API Keys in Frontend:** All external API keys in AWS Secrets Manager

### Current Development Status

**Completed:**
- ✅ Development environment setup (React Native 0.76.6, TypeScript)
- ✅ Complete design system (colors, typography, spacing, shadows)
- ✅ Basic component library (Button, Card, Input)
- ✅ Navigation setup (React Navigation v7)
- ✅ WelcomeScreen and OnboardingIntroScreen

**In Progress (Phase 1):**
- 🔄 Adapting from 5-tab to 4-screen architecture
- 🔄 Building remaining onboarding screens
- 🔄 AI conversational input component
- 🔄 Gamification components (XP, streaks, badges)

**Next Priority:** Complete the 4-screen navigation structure and remaining UI components

### 4-Screen Architecture (Cognitive Framework)

1. **Dashboard (Passive Review):** Financial snapshot, debt progress, AI insights
2. **Goals & Challenges (Active Play):** XP, streaks, challenges, achievements
3. **Expenses & Budgets (Action):** AI expense logging, budget tools, analytics
4. **Settings & Profile (Control):** Profile, AI persona, preferences

### File Structure to Work With

```
DebtDestroyer/
├── src/
│   ├── screens/              # Add new screens here
│   │   ├── WelcomeScreen.tsx (✅ Done)
│   │   ├── OnboardingIntroScreen.tsx (✅ Done)
│   │   └── [New screens to build]
│   ├── components/           # Add reusable components here
│   │   ├── Button.tsx (✅ Done)
│   │   ├── Card.tsx (✅ Done)
│   │   ├── Input.tsx (✅ Done)
│   │   └── [New components needed]
│   ├── theme/               # Design system (✅ Complete)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   ├── navigation/          # Navigation setup (✅ Done, needs update)
│   ├── types/               # TypeScript definitions
│   ├── utils/               # Helper functions (✅ Done)
│   └── constants/           # App constants (✅ Done)
```

### Today's Development Focus

**Current Working Directory:** `D:\CursorProjects\debtDestoyer\DebtDestroyer\`

**Key Files to Reference:**
- `/src/App.tsx` - Main app component
- `/src/navigation/MainTabNavigator.tsx` - Needs 4-tab update
- `/src/theme/index.ts` - Complete design system
- `/docs/spec/01_product_overview.md` - Product requirements
- `/docs/spec/07_ui_ux_framework.md` - UI/UX specifications
- `/docs/spec/10_onboarding_flow.md` - 43-screen onboarding specification

### Development Constraints

1. **Use Existing Design System:** All colors, typography, spacing from `/src/theme/`
2. **TypeScript Strict:** All new components must be fully typed
3. **Component Naming:** PascalCase for components, camelCase for files
4. **No External API Calls:** All data is mocked/local during Phase 1
5. **Accessibility:** Include accessibility props where appropriate

### Testing & Build Commands

```bash
# Start development server
npx react-native start

# Run on Android emulator
npx react-native run-android

# Build for testing
./build-android.bat

# TypeScript checking
npx tsc --noEmit
```

### Common Issues to Avoid

1. **Don't hardcode colors** - use theme tokens
2. **Don't create API integrations** - Phase 1 is UI only
3. **Don't ignore TypeScript errors** - fix them immediately
4. **Don't forget accessibility** - add proper labels and roles
5. **Don't break 4-screen architecture** - stay within defined structure

### Documentation Reference

**For detailed specifications:**
- `/docs/spec/` - Complete technical specifications
- `/docs/context/core_summary.md` - Project overview
- `/docs/context/last_devlog.md` - Previous session progress

**Current focus areas:**
- `/docs/spec/07_ui_ux_framework.md` - UI/UX design patterns
- `/docs/spec/08_gamification_system.md` - Gamification requirements
- `/docs/spec/09_build_phases_and_roadmap.md` - Development roadmap
- `/docs/spec/10_onboarding_flow.md` - Onboarding flow specification (43 screens)

### Before Starting Work

1. **Check Current Status:** Review `last_devlog.md` for previous session's progress
2. **Review Requirements:** Check relevant specification files
3. **Verify Environment:** Ensure development server is running
4. **Understand Scope:** Stay within Phase 1 boundaries (UI/UX only)

### Quality Checklist

Before committing any work:
- [ ] TypeScript compiles without errors
- [ ] Components use proper theme tokens
- [ ] Accessibility props included where needed
- [ ] Component follows established naming conventions
- [ ] Code matches design system specifications
- [ ] No hardcoded values or magic numbers

---

**Ready to proceed with development work. What specific component or screen would you like to build or modify today?**