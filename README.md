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
- **Backend:** NestJS (Node.js) with PostgreSQL
- **AI:** OpenAI GPT-4o-mini with guardrails

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

**Current Phase:** Phase 1 - Core UX System (~93% complete)

### Recent Updates (2025-11-15 - Session 6)
- ✅ **Onboarding Flow 93% Complete** - 40 of 43 screens built using 7 smart components
- ✅ **Debt Entry Wizard** - 4-screen micro-flow per debt (Type → Creditor → Details → Review)
- ✅ **Snowball Insights Screen** - Real-time payoff calculations with interest savings projections
- ✅ **Paywall Screen** - 4 subscription tiers (Free trial, Monthly, Annual, Lifetime)
- ✅ **Account Creation Screen** - Email/Google/Apple authentication with password validation
- ✅ **OnboardingDebt Type System** - Separate user-friendly type for better UX
- ✅ **TypeScript Error Fixes** - Resolved 12+ errors across 5 onboarding screens
- ✅ **Config-Driven Architecture Validated** - 5.7 screens per component average

### Previous Milestones
- ✅ Onboarding form screens with nested property architecture (2025-11-15 - Session 5)
- ✅ AI Expense Chat Modal with conversational interface (2025-11-14)
- ✅ Goals & Challenges screen with 11 gamification components (2025-11-13)
- ✅ Complete dark mode support across all screens
- ✅ Theme system standardization (getStyles pattern)

### Next Priorities
- Integrate payment provider (RevenueCat/Stripe) for paywall functionality
- Implement Google/Apple Sign-In SDKs for social authentication
- Connect snowball calculations to NestJS backend API
- Add email verification flow
- Build OnboardingDebt → Debt transformation logic
- Implement Screens 42-43 (Get Started Challenge, Dashboard Introduction)
- Full flow testing on Android/iOS devices
- Analytics event tracking throughout onboarding

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
