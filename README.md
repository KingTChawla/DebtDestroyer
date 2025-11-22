# Debt Destroyer

**AI-Powered Debt Elimination App** - Help users eliminate debt using Dave Ramsey's Debt Snowball philosophy, enhanced with an AI Financial Coach and gamified UX inspired by Duolingo.

## 🎯 Project Overview

Debt Destroyer is a React Native cross-platform app (iOS + Android) that provides a daily AI companion to guide users through financial awareness, spending habits, and debt payoff strategies in a chat-like, emotionally intelligent, and gamified experience.

**Repository:** [https://github.com/KingTChawla/DebtDestroyer.git](https://github.com/KingTChawla/DebtDestroyer.git)

## 🏗️ Architecture

### 4-Screen Cognitive Framework
- **Dashboard** - Passive review mode (financial snapshot, debt progress)
- **Goals & Challenges** - Active play mode (XP, streaks, achievements)
- **Expenses & Budgets** - Action mode (AI expense logging, budget tools)
- **Settings & Profile** - Control mode (personalization, subscription)

### Technology Stack
- **Framework:** React Native 0.76.6 (CLI, bare workflow)
- **Language:** TypeScript
- **Navigation:** React Navigation v7
- **State Management:** Zustand + React Query
- **UI:** Custom component library with design tokens
- **Backend:** Supabase (Postgres 14+ with Row-Level Security)
- **AI:** OpenAI GPT-4o-mini with guardrails (via Edge Functions)

## 🚀 Getting Started

### Prerequisites

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions for your operating system.

### Installation

```bash
# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

### Development

#### Start Metro Bundler
```bash
npm start
```

#### Run on Android
```bash
npm run android

# Or build APK
./build-android.bat
```

#### Run on iOS (macOS only)
```bash
npm run ios
```

## 📁 Project Structure

```
DebtDestroyer/
├── src/
│   ├── screens/          # Full-screen components
│   ├── components/       # Reusable UI components
│   ├── navigation/       # Navigation configuration
│   ├── theme/           # Design tokens & styling
│   ├── types/           # TypeScript definitions
│   ├── data/            # Mock data for development
│   ├── services/        # API clients & utilities
│   └── contexts/        # React contexts (theme, etc.)
├── docs/
│   ├── spec/            # Technical specifications
│   ├── context/         # Development context files
│   ├── devlogs/         # Development session logs
│   └── Style_Guide.md   # Complete design system
├── android/             # Android native code
└── ios/                 # iOS native code (if applicable)
```

## 🎨 Design System

The app uses a comprehensive design system with:
- **15-color professional palette** with light/dark variants
- **Helvetica Neue typography** following iOS standards
- **8pt grid spacing system**
- **Modular glass-morphism cards**
- **Complete dark mode support**

See `/docs/Style_Guide.md` for detailed specifications.

## 📚 Documentation

- **Specifications:** `/docs/spec/` - Modular technical specifications
- **Context Files:** `/docs/context/` - Development session management
- **Dev Logs:** `/docs/devlogs/` - Detailed session history
- **Style Guide:** `/docs/Style_Guide.md` - Complete design system

## 🔒 Security & Privacy

- **Privacy-First Design:** User data isolation, no data selling
- **Backend Gateway Pattern:** Mobile → Backend → External APIs
- **Row-Level Security:** All database queries scoped by user_id
- **Data Encryption:** AES-256 at rest, TLS 1.3 in transit

## 🎮 Core Features

### Intelligent Onboarding
- AI-led conversational data gathering
- Instant Financial Snapshot generation
- Debt Destruction Roadmap

### AI Financial Coach
- Natural language expense logging
- Personalized debt elimination advice
- Configurable persona (Supportive, Tough Love, Neutral)

### Gamified Motivation
- XP system with level progression
- Daily challenges and streak tracking
- Achievement badges and celebrations
- Confetti animations and haptic feedback

### Debt Snowball Engine
- Smallest-to-largest payoff ordering
- Rollover calculations and projections
- Emergency fund integration

## 📈 Development Status

**Current Phase:** Phase 1 (45% complete) + Phase 6 (80% complete)
**Overall MVP Progress:** ~50% complete

### Recent Updates (2025-11-22 - Session 7)
- ✅ **Supabase Backend Migration** - Migrated from NestJS+AWS to Supabase ($25/mo vs $150-300/mo = 90% savings)
- ✅ **Database Schema Deployed** - 22 tables with full Row-Level Security policies, ENUMs, indexes, triggers
- ✅ **Service Layer Complete** - 4 services (auth, debt, expense, goal) with full CRUD operations
- ✅ **Connection Verified** - Successfully tested database access, RLS policies, auth module
- ✅ **Manual Entry Strategy** - Removed Plaid integration for privacy-first habit-building approach
- ✅ **10-Phase Roadmap** - Simplified from 12 phases, reduced timeline 30 → 28 weeks
- ✅ **Font Consistency** - Added fontFamily to 7 styles across 6 components
- ✅ **Environment Setup** - .env configuration, babel.config updates, TypeScript types

### Previous Milestones
- ✅ Onboarding Flow 93% Complete - 40 of 43 screens (2025-11-15)
- ✅ Debt Entry Wizard - 4-screen micro-flow per debt (2025-11-15)
- ✅ AI Expense Chat Modal with conversational interface (2025-11-14)
- ✅ Goals & Challenges screen with gamification components (2025-11-13)
- ✅ Complete dark mode support and theme standardization

### Next Priorities
- Build authentication screens (login/signup UI) using auth.service
- Replace mock auth in onboarding with real Supabase authentication
- Create AsyncStorage → Supabase data migration utility
- Implement offline-first sync with conflict resolution
- Build AI Edge Function for natural language operations
- Add real-time subscriptions for multi-device sync
- RevenueCat integration for subscription management

## 🤝 Contributing

This is a private development project. For questions or collaboration inquiries, please contact the repository owner.

## 📄 License

Proprietary - All rights reserved

## 🔗 Links

- **GitHub Repository:** [https://github.com/KingTChawla/DebtDestroyer.git](https://github.com/KingTChawla/DebtDestroyer.git)
- **React Native Docs:** [https://reactnative.dev](https://reactnative.dev)
- **Project Documentation:** See `/docs/` directory

---

**© 2025 Debt Destroyer. All rights reserved.**
