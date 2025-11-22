# 09) Build Phases & Roadmap

**LLM SUMMARY:**
- 10-phase plan (revised from 12): Manual-entry only, Supabase backend
- MVP: Local-first with AsyncStorage (Phases 1-5)
- Backend: Supabase instead of NestJS+AWS ($25/mo vs $250/mo)
- No Plaid integration - habit-builder focus
- Timeline: 28 weeks to full launch

## Architecture Strategy

**Latest Revision (2025-11-22):**
- **Backend:** Supabase (Postgres + Auth + Edge Functions)
- **No Plaid:** Manual entry only for habit-building
- **10 Phases:** Simplified from original 12-phase plan
- **Cost:** $25/month (Supabase Pro) vs $150-300/month (AWS)

**Key Principles:**
1. Front-load UI/UX before backend
2. Local-first approach (AsyncStorage → Supabase sync)
3. Manual entry validates core value
4. Supabase for faster MVP and lower cost

## Phase-by-Phase Build Plan

### Phase 1 — Core UX System & 4-Screen Framework (4 weeks)

**Status:** 🔄 **IN PROGRESS** (~45% Complete)

**Completed:**
- ✅ Project initialization (React Native 0.76.6 with TypeScript)
- ✅ Complete design system (colors, typography, spacing, shadows)
- ✅ Component library foundation (Button, Card, Input)
- ✅ Navigation setup (React Navigation v7)
- ✅ Build automation (Android build scripts)
- ✅ WelcomeScreen and OnboardingIntroScreen

**In Progress (4-Screen Model Adaptation):**
- Update MainTabNavigator from 5 tabs → 4 tabs:
  1. Dashboard (merge overview + debt list + plan)
  2. Goals & Challenges (new gamification hub)
  3. Expenses & Budgets (new AI-powered logging)
  4. Settings & Profile
- Complete remaining onboarding screens
- Build AI conversational input component
- Additional UI components (ProgressBar, Badge, Chart, GoalCard)

**Deliverables:**
- Complete 4-screen navigation structure
- Conversational onboarding flow
- Base screen templates with placeholder content
- Component library covering 80% of UI needs
- Dark mode + accessibility support

**Acceptance Criteria:**
- All 4 main screens navigable with placeholder content
- Onboarding flow complete with mocked data
- No TypeScript errors or console warnings
- Dark mode works across all screens

---

### Phase 2 — Dashboard & AI Insights (3 weeks) [MVP]

**Objective:** Build the Dashboard (Home) screen with AI-powered insights and debt overview.

**MVP Scope:** Manual debt entry only (no Plaid). Users add debts via forms.

**Deliverables:**
- Financial snapshot component (total debt, progress, debt-free date)
- **Manual debt entry form:**
  - Debt name, type (credit card, loan, etc.)
  - Principal amount, APR, minimum payment
  - Due day of month
- Debt tackling strategy view (snowball-prioritized list)
- AI insights panel (mock responses for MVP)
- Quick action buttons (Add Expense, Log Goal, View Summary)
- Snowball calculation engine (TypeScript module)
- Local persistence (AsyncStorage) for offline support

**Acceptance Criteria:**
- Dashboard displays all key metrics at a glance
- **Users can manually add/edit/delete debts**
- Debt list shows smallest-to-largest ordering (Snowball)
- Snowball calculations accurate (payoff dates, rollover logic)
- Data persists locally between app sessions
- **No Plaid integration required for MVP**

---

### Phase 3 — Goals & Challenges (Gamification Hub) (3 weeks) [MVP]

**Objective:** Build the Goals & Challenges screen with gamified engagement mechanics.

**Deliverables:**
- User-defined goals system (create, track, complete)
- System challenges engine (daily/weekly/monthly)
- XP & leveling system
- Streak tracking (consecutive days)
- Badges & achievements
- Confetti animations on milestones
- Visual progress components (progress bars, percentage rings)
- Leaderboard (optional, household/friends comparison)

**Acceptance Criteria:**
- Users can create and track custom goals
- Challenges unlock based on user state
- XP awards correctly for all actions
- Streaks increment/reset properly
- Confetti triggers on milestone completions
- Gamification feels rewarding and motivating

---

### Phase 4 — Expenses & Budgets (AI-Powered Logging) (3 weeks) [MVP]

**Objective:** Build expense logging and budget management with conversational AI.

**Deliverables:**
- **AI conversational input** (voice + text)
  - "I spent $8 on lunch" → automatic categorization
  - Voice recognition with offline fallback
  - Smart suggestions and quick categories
- **Manual expense entry** forms
- **Budget allocation** tool (percentage-based budgeting)
- **Spending analytics** with charts
- **Expense categories** management
- **Recurring expense** detection and tracking
- **Daily expense summary** with AI insights

**Acceptance Criteria:**
- AI parsing works for common expense descriptions
- Users can manually categorize expenses
- Budget tool helps allocate income effectively
- Spending charts show category breakdowns
- Recurring expenses are tracked separately
- **All data stored locally for MVP**

---

### Phase 5 — Settings & Profile (3 weeks) [MVP]

**Objective:** Complete user settings, profile management, and app personalization.

**Deliverables:**
- **User profile** management
- **AI persona selection** (Supportive, Tough Love, Neutral)
- **Notification preferences**
- **App settings** (dark mode, currency, date format)
- **Data export** functionality (JSON + CSV)
- **Privacy settings** and consent management
- **Help & support** section
- **About** screen with version information

**Acceptance Criteria:**
- Users can update profile information
- AI persona changes affect response style
- Notification settings work correctly
- Data export generates usable files
- Privacy consents are properly tracked
- All settings persist between app sessions

---

### Phase 6 — Supabase Setup & Auth (2 weeks) [Backend Integration]

**Objective:** Set up Supabase backend and authentication

**Deliverables:**
- Supabase project setup with database schema + RLS policies
- Email/password + Google/Apple OAuth auth
- Mobile auth flow (login, register, token refresh)
- AsyncStorage → Supabase data migration
- @supabase/supabase-js client integration

**Acceptance Criteria:**
- Users can register and login
- JWT tokens refresh automatically
- RLS policies enforce user data isolation
- Local data migrates to Supabase
- App works offline with sync on reconnect

---

### Phase 7 — Data Sync & Real-time (2 weeks) [Backend Integration]

**Objective:** Sync all local data with Supabase

**Deliverables:**
- CRUD operations via Supabase client
- React Query for optimistic updates
- Conflict resolution (last-write-wins)
- Real-time subscriptions (optional)

**Acceptance Criteria:**
- Data syncs across devices
- Offline changes upload when online
- Conflicts resolve gracefully
- Real-time updates work without refresh

---

### Phase 8 — AI Financial Coach (3 weeks) [Premium Feature]

**Objective:** Implement AI coaching via Supabase Edge Function

**Deliverables:**
- Supabase Edge Function: `ai-chat` (OpenAI GPT-4 proxy)
- Prompt guardrails (debt elimination only)
- PII sanitization before API calls
- Rate limiting (Free: 10/day, Pro: 100/day)
- AI chat interface in mobile app

**Acceptance Criteria:**
- AI provides relevant debt advice
- Guardrails block off-topic queries
- Rate limiting enforces tier limits
- PII sanitized before OpenAI calls

---

### Phase 9 — Subscription & Payments (3 weeks) [Monetization]

**Objective:** Implement subscription tiers and payments

**Deliverables:**
- RevenueCat integration (iOS/Android subscriptions)
- Stripe integration (web payments - future)
- Subscription tiers: Free ($0), Pro ($9.99/mo), Lifetime ($199)
- Feature gates (AI request limits, advanced analytics)
- Supabase Edge Function: `payment-webhook`
- 7-day free trial for Pro tier

**Acceptance Criteria:**
- Users can subscribe via App Store/Google Play
- Feature gates work correctly per tier
- Webhooks update entitlements instantly
- Free trial converts properly

---

### Phase 10 — Advanced Features & Polish (3 weeks) [Final MVP]

**Objective:** Add premium features and optimize

**Deliverables:**
- Advanced analytics (debt timeline charts, spending trends)
- Push notifications (payment reminders, streak warnings)
- Receipt OCR via Edge Function (optional)
- Performance optimization
- Accessibility enhancements
- Bug fixes and polish

**Acceptance Criteria:**
- Advanced analytics provide insights
- Push notifications work reliably
- App performance meets benchmarks
- Accessibility scores 90%+
- No critical bugs

## Testing & Quality Assurance

### Testing Strategy by Phase

**Phases 1-5 (MVP):**
- Unit tests for core logic (snowball, XP system)
- Component tests for UI
- Manual testing on physical devices

**Phases 6-10 (Backend Integration):**
- Supabase Edge Function tests
- End-to-end tests with Detox
- Performance and security testing

## Timeline & Resources

### Development Timeline
- **Phase 1-5 (MVP):** 15 weeks
- **Phase 6-7 (Supabase):** 4 weeks
- **Phase 8-10 (Premium):** 9 weeks
- **Total:** 28 weeks (~7 months)

---
*See: [Product Overview](01_product_overview.md) → [Architecture & Stack](02_architecture_and_stack.md) → [Data Model](03_data_model.md)*