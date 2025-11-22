# Debt Destroyer - Core Project Summary

**Purpose:** This document provides a comprehensive yet concise overview of the Debt Destroyer project for AI assistants and new developers. It captures the essential architecture, features, and technical decisions in ~1,500-2,000 tokens.

## Project Overview

**Debt Destroyer** is a React Native cross-platform app (iOS + Android) that helps users eliminate debt using Dave Ramsey's Debt Snowball philosophy, enhanced with an AI Financial Coach and behavioral UX design inspired by Duolingo's gamification system.

**Core Value Proposition:** Daily AI companion that guides users through financial awareness, spending habits, and debt payoff strategies in a chat-like, emotionally intelligent, and gamified experience.

## Architecture Summary

### 3-Layer Backend Gateway Pattern
1. **Mobile App (React Native):** 4-screen cognitive framework, never calls external APIs directly
2. **Backend Gateway (Supabase):** Auth, Row-Level Security, Edge Functions for AI/webhooks, Postgres database
3. **External APIs (Proxied):** OpenAI (AI coach), RevenueCat/Stripe (payments)

### Key Architectural Principles
- **Privacy First:** All database queries scoped by `user_id` from JWT, Row-Level Security enabled
- **Backend Gateway:** Mobile → Backend → External APIs (NEVER direct)
- **AI Guardrails:** Scope-limited AI with cost controls and rate limiting
- **Data Encryption:** AES-256 at rest, TLS 1.3 in transit, KMS for sensitive fields

## 4-Screen Cognitive Architecture

| Screen | User Mode | Focus | Key Features |
|--------|-----------|-------|--------------|
| Dashboard | Passive Review | Awareness & Motivation | Financial snapshot, debt progress, AI insights |
| Goals & Challenges | Active Play | Engagement & Reward | XP, streaks, challenges, achievements |
| Expenses & Budgets | Action | Data Entry & Planning | AI expense logging, budget tools, analytics |
| Settings & Profile | Control | Personalization | Profile, AI persona, preferences, subscription |

## Core Features

### 1. Gravl-Inspired Onboarding (43 Screens)
- **6-Phase Flow:** Welcome/Motivation → User Profiling → Financial Data Collection → Debt Entry → Personalization → Plan Reveal
- **Multi-Step Debt Entry:** 8-screen micro-flow per debt (type, creditor, balance, APR, payment, due date, autopay)
- **AI Persona Selection:** 4 coaching styles (calm & supportive, direct & disciplined, high-energy, humor)
- **Behavioral Psychology:** Emotional impact assessment, confidence sliders, habit selection
- **Value Demonstration:** Snowball Power Score with projected savings and payoff date before paywall
- **Strategic Paywall:** Subscription offer after insights, with one-time upsell discount
- **Activation Checklist:** Get Started challenges drive immediate engagement
- **Target Metrics:** 65%+ completion rate, 15%+ paywall conversion, 8-12 min completion time
- Full spec: `/docs/spec/10_onboarding_flow.md`

### 2. AI Financial Coach
- Natural expense logging: "I spent $8 on lunch"
- Categorization and budget insights
- Personalized advice within strict debt elimination scope
- Configurable persona: Calm & Supportive, Direct & Disciplined, High-Energy, Humor & Lighthearted

### 3. Gamified Motivation
- XP system: +10 for check-ins, +50 for payments, +500 for debt payoff
- Streak tracking with milestone badges (7, 30, 90, 180, 365 days)
- System challenges: "No-Spend Week," "Cancel-3 Subscriptions"
- Confetti animations, haptic feedback, celebration moments

### 4. Debt Snowball Engine
- Manual debt entry (MVP) → Bank integration (Phase 10)
- Smallest-to-largest payoff ordering
- Rollover calculations and payoff projections
- Emergency fund integration

## Technology Stack

### Mobile
- **Framework:** React Native 0.76.6 (CLI, bare workflow)
- **Language:** TypeScript
- **Navigation:** React Navigation v7
- **State:** Zustand + React Query
- **UI:** Custom component library with design tokens
- **Updates:** CodePush for OTA updates

### Backend
- **Framework:** Supabase (Postgres 14+ with RLS)
- **Database:** PostgreSQL with Row-Level Security
- **Auth:** Supabase Auth (email, Google, Apple)
- **Edge Functions:** Deno runtime for AI proxy and webhooks
- **AI:** OpenAI GPT-4o-mini with guardrails (via Edge Function)
- **Storage:** Supabase Storage for receipts/files
- **Cost:** $25/month (Pro tier) vs $150-300/month (AWS)

### External Integrations
- **Bank Data:** REMOVED - Manual entry only for habit-building focus
- **Payments:** RevenueCat (mobile) + Stripe (web)
- **Notifications:** OneSignal (future)
- **Analytics:** Custom implementation (future)

## Development Status & Roadmap

### Current Status (November 2025)
- ✅ Development environment setup complete
- ✅ Phase 1: Core UX system (45% complete)
- ✅ Phase 6: Supabase backend (80% complete)
- ✅ Design system and component library built
- ✅ 40 of 43 onboarding screens complete
- ✅ Database schema deployed with 22 tables
- ✅ Service layer complete for core entities
- 🔄 Overall MVP: ~50% complete

### MVP Strategy
- **Manual entry only** for debts, income, expenses (NO Plaid)
- **Local-first** with AsyncStorage → Supabase sync
- **No bank integration** (removed from roadmap)
- Validate product-market fit before complex integrations

### 10-Phase Build Plan (Updated 2025-11-22)
1. **Phase 1:** Core UX & 4-Screen Framework (4 weeks) - 45% COMPLETE
2. **Phase 2:** Dashboard & AI Insights (3 weeks)
3. **Phase 3:** Goals & Challenges (3 weeks)
4. **Phase 4:** Expenses & Budgets (3 weeks)
5. **Phase 5:** Settings & Profile (3 weeks)
6. **Phase 6:** Supabase Setup & Auth (2 weeks) - 80% COMPLETE
7. **Phase 7:** Data Sync & Real-time (2 weeks)
8. **Phase 8:** AI Financial Coach (3 weeks)
9. **Phase 9:** Subscription & Payments (3 weeks)
10. **Phase 10:** Advanced Features & Polish (3 weeks)

**Total Timeline:** 28 weeks (~7 months)

## Data Model Highlights

### Core Entities
- **User:** Profile, settings, consents, subscription tier
- **Household:** Shared finances with granular permissions
- **Debt:** Manual/bank-linked, snowball ordering, payoff tracking
- **ExpenseLog:** Manual entries, AI categorization
- **Transaction:** Bank transaction data (Phase 10)
- **Gamification:** XP, streaks, quests, challenges, badges

### Security Architecture
- **Row-Level Security:** Every table scoped by `user_id`
- **Field Encryption:** Sensitive data encrypted with AWS KMS
- **Audit Logging:** All sensitive operations logged
- **Rate Limiting:** Per-user limits for AI requests and API calls

## AI & Ethics Framework

### AI Scope Limitation
- **Allowed:** Debt elimination, budgeting, expense analysis
- **Blocked:** General knowledge, code generation, investment advice
- **Rate Limits:** Free (10/day), Pro (100/day)
- **Cost Controls:** Daily caps per user, token usage monitoring

### Privacy Controls
- **PII Sanitization:** Names, account numbers never sent to AI
- **User Consent:** Explicit opt-in for data sharing
- **Data Minimization:** Only collect necessary financial data
- **Right to Deletion:** GDPR-compliant hard delete process

## Monetization

### Subscription Tiers
- **Free:** Manual entry, basic features, 10 AI requests/day
- **Pro ($9.99/month):** Bank sync, advanced analytics, 100 AI requests/day
- **Lifetime ($199):** One-time purchase, all features

### Revenue Model
- Primary: Subscription revenue
- Secondary: Optional premium features (future)

## Competitive Positioning

**Key Differentiators:**
1. **AI-First Coaching:** Conversational interface vs. traditional banking apps
2. **Behavioral Science:** Gamification and habit formation focus
3. **Privacy by Design:** User data isolation, no data selling
4. **Simplicity:** 4-screen cognitive framework
5. **Ethical AI:** Scope-limited, cost-controlled AI assistance

## Development Guidelines

### Code Organization
```
src/
├── screens/          # Full-screen components
├── components/       # Reusable UI
├── theme/           # Design tokens
├── types/           # TypeScript definitions
├── utils/           # Helper functions
├── services/        # API clients
└── hooks/           # Custom React hooks
```

### Key Principles
- **TypeScript-first:** Strong typing for all components
- **Accessibility:** Screen reader support, high contrast, large touch targets
- **Performance:** 60fps animations, minimal bundle size
- **Privacy-first:** No API keys in frontend, all external calls via backend

## Success Metrics

### MVP Success Criteria
- 1,000+ users in first month
- 50% weekly active user rate
- Average 3+ debts per user
- 40% 30-day retention

### Full Product Targets
- 15% free-to-paid conversion
- $10,000+ MRR within 6 months
- 60% bank linking rate (post-MVP)
- 4.5+ star app store rating

## Quick Start for Developers

### Environment Setup
- Node.js 18+, React Native CLI, Android Studio
- See: `/docs/React_Native_Dev_Environment_Setup_Windows.md`

### Local Development
```bash
# Start Metro bundler
npx react-native start

# Run on Android emulator
npx react-native run-android

# Build APK for testing
./build-android.bat
```

### Key Files to Understand
- `/src/App.tsx` - Main app component
- `/src/navigation/` - Navigation structure
- `/src/theme/` - Design system tokens
- `/docs/spec/` - Detailed specification modules
- `/docs/spec/10_onboarding_flow.md` - 43-screen onboarding specification
- `/docs/Style_Guide.md` - Complete design system and component specifications

---

## Last Update (2025-11-22)
- **Supabase Backend Migration:** Migrated from NestJS+AWS to Supabase for 90% cost reduction ($25/mo vs $150-300/mo) and 2-week timeline savings
- **Database Schema Deployed:** Created and deployed complete schema with 22 tables, full Row-Level Security policies, 22 ENUMs, indexes, and triggers
- **Service Layer Complete:** Built 4 service modules (auth, debt, expense, goal) with full CRUD operations, type-safe TypeScript, automatic user_id injection
- **Connection Verified:** Successfully tested Supabase connection, confirmed all tables created, RLS policies active, auth module working
- **Manual Entry Strategy:** Removed Plaid integration entirely to focus on habit-building through intentional logging (privacy-first, cost savings)
- **10-Phase Roadmap:** Simplified from 12 phases to 10 phases, reduced timeline from 30 weeks to 28 weeks
- **Architecture Updated:** Updated all documentation (02_architecture_and_stack.md, 09_build_phases_and_roadmap.md, 03_data_model.md) to reflect Supabase
- **Font Consistency:** Added fontFamily to 7 emoji/icon styles across 6 components for typography consistency
- **Environment Configuration:** Set up .env with Supabase credentials, babel.config for react-native-dotenv, TypeScript types for env variables
- **Phase 6 Progress:** Supabase backend 80% complete (database schema ✅, service layer ✅, authentication screens pending)

*This summary provides the essential context for understanding the Debt Destroyer project. For detailed specifications, see the individual modules in `/docs/spec/`.*