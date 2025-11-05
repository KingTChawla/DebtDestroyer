# Debt Destroyer — End-to-End App Specification (Markdown)

A cross-platform React Native app (iOS + Android) that helps users **eliminate debt** using Dave Ramsey's **Debt Snowball** philosophy, enhanced with an **AI Financial Coach** and **Behavioral UX** inspired by *The Total Money Makeover* and *Duolingo's gamified motivation system*.

The app acts as a **daily AI companion** that guides users through financial awareness, spending habits, and debt payoff strategies in a **chat-like, emotionally intelligent, and gamified experience**.

**Monetization:** Subscription-based model with three tiers (Free / Pro / Lifetime).  
**Core Principles:** Behavior > Math, smallest-to-largest payoff, no lending, privacy by design.

---

## 0) Development Environment Setup

**Status:** ✅ **COMPLETE** (Setup Date: 2025-11-05)

📖 **Setup Guide:** [React Native Dev Environment Setup - Windows 11](./React_Native_Dev_Environment_Setup_Windows.md)

**Installed & Configured:**
- ✅ Node.js v18.20.8 LTS
- ✅ npm v10.8.2
- ✅ Java JDK 17.0.17 LTS
- ✅ Watchman 2025.02.23
- ✅ Android SDK (API 33, 34, 36)
- ✅ Android Build Tools (35.0.0, 36.0.0, 36.1.0)
- ✅ ANDROID_HOME environment variable
- ✅ React Native CLI 2.0.1
- ✅ Android Emulator (Medium_Phone_API_36.1)

**iOS Builds:** Will use cloud build service (Expo EAS / Bitrise / Codemagic) when needed.

**Ready to proceed with Phase 1: UI/UX System development.**

---

## 1) Product Pillars (What We're Building)

### 1. Intelligent Onboarding — Build a Complete Financial Profile
- Conversational AI-led onboarding process (voice or text) gathers:  
  Income, debts, monthly expenses, subscriptions, and savings.
- Personalized **Financial Snapshot** dashboard generated instantly.
- AI analyzes data to create a **Debt Destruction Roadmap** (snowball-style).
- Includes emergency fund setup (target $1,000) before Snowball activation.

### 2. Daily AI Companion (Voice/Text Expense Logging)
- User can log any expense by **talking** or **typing**, e.g., “Spent $8 on lunch.”
- AI parses input, categorizes spending, and updates the **daily expense summary**.
- End-of-day: AI provides feedback, trends, and savings suggestions.

### 3. Gamified Debt Destruction Loop
- Duolingo-style **habit loop** with streaks, badges, confetti, and positive reinforcement.
- Daily micro-actions (confirm expenses, avoid spending, cancel subs).
- Reward system based on financial wins: “You skipped coffee and saved $5!”

### 4. Companion Mode (Couples & Households)
- Link two profiles under one subscription.
- Shared or separate finances, with optional visibility controls.
- Shared progress dashboard and weekly “Money Stand-Up.”

### 5. AI Debt Coach
- Provides contextual suggestions for debt elimination, savings, and spending control.
- Suggests next best actions daily: “Pay $37 more to close Card #1 by next week.”
- Uses **Total Money Makeover-inspired sequencing** (smallest-to-largest debts).
---

## 2) Core Features

### 2.1 AI-Powered Onboarding & Financial Profiling
- Conversational flow (chat UI with AI tone calibration).
- Collects and validates financial data through prompts.
- AI summary output:
  - Total income, total debt, net balance, spending categories, subscription costs.
  - “You currently spend 32% of income on discretionary categories.”
- Generates a **Personalized Snowball Plan** immediately.

### 2.2 Snowball Engine 2.0
- Same principles as before, now augmented by AI insights.
- Auto-rollover payments when debts are closed.
- Debt payoff order customizable (Snowball, Avalanche, or AI Hybrid).

### 2.3 Daily Habit Loop (Gamified Reinforcement)
- Micro-sessions (under 90 seconds) to review expenses and log wins.
- Rewards, streaks, XP, and emotional messaging.
- “Skipping coffee saved $10 — you just fast-tracked your payoff by one day!”

### 2.4 Conversational Expense Logging
- Text or voice-based input directly from home screen.
- AI automatically categorizes and tags entries.
- Daily summary dashboard: visual spend overview + AI comments.

### 2.5 AI Insights & Coaching
- Machine learning model surfaces insights from daily spending.
- Context-aware nudges (“You’re spending 20% above your average in dining”).
- End-of-week reflection with coaching tone and suggestions.

### 2.6 Companion Mode
- Couples collaborate under one plan or two linked plans.
- Weekly Money Stand-Up checklist & shared milestone tracking.

### 2.7 Security, Privacy & Control
- Read-only financial connections (Plaid).
- Secure storage & encryption at rest and in transit.
- AI operates locally where possible (edge compute for sensitive data).

---

## 3) Competitive Context (Build to Win)

- **EveryDollar:** aligned philosophy; budgeting-first UX; we win on daily habit game + Companion Mode + sequencing EF-Snowball.
- **YNAB:** strong budgeting; steeper learning; debt is not the core loop; we win on focus + gamification.
- **Debt Payoff Planner:** calculator-centric; we win on habit loop, Companion Mode, and automation.
- **Tally/Rocket/Monarch:** broader finance or automation; we win on behavior-led approach and no new debt ethos.

---

## 4) Tech Stack

### 4.1 Mobile (React Native CLI - Bare Workflow)

- **Framework:** React Native (TypeScript) - Bare workflow (no Expo managed)
- **OTA Updates:** CodePush (Microsoft App Center) for over-the-air updates
- **State Management:** Redux Toolkit + React Query (for server state)
- **Forms:** react-hook-form + Zod (validation)
- **Navigation:** React Navigation v6
- **Charts:** Victory Native (via react-native-svg)
- **Secure Storage:** react-native-keychain (iOS Keychain / Android Keystore)
- **Notifications:**
  - OneSignal SDK (recommended) OR
  - @react-native-firebase/messaging (FCM) + @react-native-community/push-notification-ios (APNs)
- **In-App Purchases:** RevenueCat SDK (react-native-purchases)
- **Analytics:**
  - Amplitude SDK (recommended) OR
  - Mixpanel SDK OR
  - @react-native-firebase/analytics
- **Crash Reporting:** Sentry (@sentry/react-native)
- **Performance Monitoring:** @react-native-firebase/perf or Sentry Performance
- **UI Components:**
  - React Native Paper (Material Design) OR
  - Custom component library (recommended for design control)
- **Date/Time:** date-fns or dayjs (lightweight)
- **Animations:** Reanimated 2 + react-native-gesture-handler
- **Testing:**
  - Jest (unit tests)
  - React Native Testing Library (component tests)
  - Detox (E2E tests)

### 4.2 Backend & Infra

- Node.js (TypeScript) + NestJS (REST + Webhooks)
- DB: PostgreSQL (AWS RDS) + Prisma ORM
- Cache/Queues: Redis (ElastiCache), SQS
- Storage: S3 (presigned URLs)
- Auth: Auth0 or Firebase Auth or AWS Cognito (MFA optional)
- Bank aggregation: Plaid (Transactions, Liabilities)
- Payments: Stripe (web) + RevenueCat (mobile)
- Email: Postmark / SendGrid
- Feature flags: Unleash (optional)
- Monitoring: Datadog + CloudWatch
- Secrets/KMS: AWS Secrets Manager + AWS KMS
- IaC: Terraform

### 4.3 Cost Notes (ballpark)

- Plaid: usage-based; expect low hundreds—thousands/month as MAU grows.
- RevenueCat: free — ~$120+/mo with scale.
- Stripe: ~2.9% + $0.30 (web); Apple/Google IAP fees apply (15% small biz).
- OneSignal/FCM, Amplitude, Sentry, Datadog: free tiers then scale.

---

## 5) Architecture Overview

```
Mobile App (RN)
  ↓ (TLS + JWT)
API Gateway / NestJS
  ├─ Auth (Auth0/Firebase/Cognito)
  ├─ Entitlements (RevenueCat/Stripe webhooks → SQS → Worker)
  ├─ Plaid (Link token exchange; webhooks → SQS → Worker)
  ├─ Snowball Engine (domain service)
  ├─ Gamification/Quests (config-driven)
  ├─ Notifications (OneSignal/FCM)
  ├─ Persistence (Postgres + Prisma) + Cache (Redis)
  ├─ S3 (exports/artifacts) ← presigned URLs
  └─ KMS/Secrets Manager (tokens & PII field encryption)
```

---

## 6) Data Model (Core)

### User
- `id`, `auth_provider_id`, `email`, `country`, `currency`, `tier`, `settings_json`, `consents_json`, `created_at`

### Household
- `id`, `owner_user_id`, `mode` (enum: combined|uncombined), `created_at`

### HouseholdMember
- `household_id`, `user_id`, `role` (enum: Owner|Member), `permissions_json`, `created_at`

### InstitutionConnection
- `id`, `user_id`, `provider` (enum), `item_id` (enc), `access_token` (enc), `status`, `last_sync_at`, `created_at`

### Account
- `id`, `connection_id`, `type` (enum), `name`, `mask`, `balance`, `shared_visibility` (enum: private|shared), `created_at`

### Debt
- `id`, `owner_scope` (enum: user|household), `owner_id`, `account_id` (nullable), `name`, `type` (enum), `principal`, `apr`, `min_payment`, `due_day`, `status` (enum: open|closed), `payoff_order`, `opened_at`, `closed_at`

### SnowballPlan
- `id`, `owner_scope`, `owner_id`, `method` (enum: snowball|avalanche|custom), `start_date`, `target_date`, `ef_target`, `config_json`

### PaymentEvent
- `id`, `debt_id`, `date`, `amount`, `type` (enum: minimum|extra|payoff), `source` (enum: scheduled|manual|rounded-up), `created_at`

### Transaction
- `id`, `account_id`, `date`, `amount`, `merchant`, `category`, `confirmed` (boolean), `recurring_id` (nullable), `created_at`

### Streak
- `id`, `user_id`, `current_streak`, `longest_streak`, `last_check_in`, `updated_at`

### Quest
- `id`, `user_id`, `quest_type`, `progress`, `target`, `status` (enum: active|completed), `reward_xp`, `completed_at`

### Milestone
- `id`, `owner_scope`, `owner_id`, `milestone_type`, `date`, `metadata_json`, `created_at`

### Entitlement
- `id`, `user_id`, `tier`, `source` (enum: direct|shared), `expires_at`, `updated_at`

### UserFinancialProfile
- `user_id`
- `income`
- `monthly_expenses`
- `subscriptions_json`
- `savings_balance`
- `ai_analysis_json`
- `created_at`
- `updated_at`

### ExpenseLog
- `id`
- `user_id`
- `date`
- `amount`
- `category`
- `note`
- `input_method` (voice|text)
- `created_at`


---

## 7) API Endpoints (REST)

### Auth
- `POST /auth/register` — email + password or OAuth
- `POST /auth/login` — returns access + refresh JWT
- `POST /auth/refresh` — rotate tokens
- `POST /auth/logout` — invalidate refresh token

### User & Household
- `GET /me` — current user + entitlement + household
- `PATCH /me/settings` — update settings/consents
- `POST /household` — create household (owner role)
- `POST /household/invite` — generate invite code
- `POST /household/join` — join via code
- `PATCH /household/permissions` — update member permissions

### Institutions & Accounts
- `POST /institutions/plaid/link-token` — init Plaid Link
- `POST /institutions/plaid/exchange` — public_token → access_token
- `GET /institutions/connections` — list connections
- `DELETE /institutions/connections/:id` — revoke connection
- `GET /accounts` — list accounts (user or household-scoped)
- `PATCH /accounts/:id` — update name/visibility

### Debts
- `GET /debts` — list debts (scoped)
- `POST /debts` — manual debt entry
- `PATCH /debts/:id` — update debt
- `DELETE /debts/:id` — soft delete
- `POST /debts/:id/mark-paid` — close debt, trigger roll-down

### Snowball Plan
- `GET /plan` — current plan
- `POST /plan` — generate/regenerate plan
- `PATCH /plan` — update method/config
- `GET /plan/schedule` — month-by-month payoff schedule

### Transactions
- `GET /transactions` — list (confirmed/unconfirmed)
- `PATCH /transactions/:id` — confirm/edit category
- `POST /transactions/bulk-confirm` — batch confirm

### Daily Loop
- `GET /daily/status` — streak, XP, level, today's tasks
- `POST /daily/check-in` — mark check-in, increment streak
- `GET /daily/quests` — active quests
- `POST /daily/quests/:id/complete` — mark quest done

### Gamification
- `GET /gamification/profile` — level, XP, badges
- `GET /gamification/leaderboard` — household or friends (if enabled)
- `GET /gamification/nudges` — contextual nudges

### Entitlements
- `GET /entitlements` — current tier + features
- `POST /entitlements/webhook` — RevenueCat/Stripe webhook receiver

### Payment Accelerators (Ammo)
- `GET /ammo/round-ups` — weekly summary
- `POST /ammo/round-ups/redirect` — apply to debt
- `GET /ammo/subscriptions` — recurring charges + cancel links

### Data Portability & Privacy
- `POST /export` — request data export (async job → S3 presigned URL)
- `POST /delete` — GDPR delete (hard delete after grace period)

### Admin (internal)
- `GET /admin/users` — list users (paginated)
- `POST /admin/users/:id/reset-entitlement` — manual override
- `GET /admin/audit-logs` — security audit trail

### AI & Onboarding
- `POST /onboarding` — submit financial profile
- `GET /ai/analysis` — return AI debt prioritization & insights
- `POST /ai/expense` — log new expense (voice/text)
- `GET /ai/daily-summary` — daily spending summary and nudges

---

## 8) Subscription Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Normal** | Free | - Manual debts<br>- Basic Snowball plan<br>- Daily check-in (streaks/XP)<br>- 1 household member |
| **Pro** | $9.99/mo or $99/yr | - Bank linking (Plaid)<br>- Companion Mode (2 members)<br>- Gamification (quests/badges)<br>- Round-ups & cancel-assist<br>- Advanced analytics<br>- Priority support |
| **Lifetime** | $299 one-time | - All Pro features<br>- Forever<br>- No recurring fees |

---

## 9) Monetization & Revenue Flows

### Revenue Streams
1. **Subscriptions (primary):** Pro monthly/annual via App Store, Google Play, and web (Stripe).
2. **Lifetime purchases:** one-time payment for perpetual Pro access.

### Payment Processing
- **Mobile:** RevenueCat handles Apple/Google IAP, webhooks trigger entitlement updates.
- **Web:** Stripe Checkout + Stripe billing portal for subscription management.
- **Webhooks:** Both feed SQS → worker updates `entitlements` table.

### Refund Policy
- 7-day money-back guarantee (manual review).
- No refunds on Lifetime after 30 days.

---

## 10) Security & Compliance

### Data Protection
- **Encryption at rest:** RDS encryption enabled; field-level encryption (KMS) for `access_token`, `item_id`.
- **Encryption in transit:** TLS 1.3 for all API traffic.
- **Secrets management:** AWS Secrets Manager + rotation policies.

### Authentication & Authorization
- **MFA:** optional email/SMS/TOTP (via Auth0/Firebase/Cognito).
- **JWT:** short-lived access token (15 min), long-lived refresh token (30 days, rotated on use).
- **RBAC:** Owner/Member roles in Household; scoped queries enforce permissions.

### Privacy & Consent
- **Read-only bank access:** Plaid Transactions + Liabilities only; no write permissions.
- **Explicit consent:** users opt-in for account sharing in Companion Mode.
- **Data portability:** self-service export (JSON + CSV).
- **Right to deletion:** GDPR-compliant hard delete after 30-day grace period.

### Monitoring & Incident Response
- **Audit logs:** all sensitive actions (debt changes, entitlement updates, account access).
- **Anomaly detection:** alert on unusual login patterns, failed auth attempts.
- **On-call runbook:** escalation paths for data breaches, service outages.

### Compliance Milestones
1. **Pre-launch:** OWASP Top 10 remediation, pen test (no High/Critical findings).
2. **6 months post-launch:** SOC 2 Type I audit.
3. **12 months post-launch:** SOC 2 Type II audit.

---

## 11) Gamification Deep Dive

### Mechanics
- Positive-only reinforcement (no penalties).
- Habit tracking (daily check-ins, expense entries, savings wins).
- Gratification messages & confetti.
- XP sources: check-ins (+10), savings (+50), debt payments (+200), payoffs (+500).

### Psychology-Driven Design
- Based on *Tiny Habits* and *The Total Money Makeover* principles.
- Reduces decision fatigue by prompting one small, achievable action daily.
- Conversational UI to lower user resistance.

### Core Mechanics

#### Streaks
- **Trigger:** Daily check-in (confirm transactions + micro-action).
- **Rules:** Miss 1 day = streak resets to 0.
- **Milestones:** 7-day, 30-day, 90-day, 365-day badges.

#### XP & Levels
- **XP sources:**
  - Daily check-in: +10 XP
  - Debt payment (any): +50 XP
  - Debt payoff: +500 XP
  - Quest completion: variable (50-200 XP)
- **Leveling:** Every 1,000 XP = 1 level; unlock cosmetic rewards (avatar borders, confetti styles).

#### Quests
- **Examples:**
  - "No-Spend Week" → Don't log any discretionary spending for 7 days → 150 XP
  - "Cancel-3" → Cancel 3 subscriptions → 200 XP
  - "Snowball Sprint" → Pay off 1 debt this month → 500 XP
- **Quest engine:** server-side configs (JSON); unlock conditions (e.g., "at least 3 open debts").

#### Nudges & Contextual Prompts
- **"+$37 kills this on the 23rd"** → Show when user is close to payoff and has available budget.
- **"You've got $18 in round-ups this week"** → Remind to redirect to smallest debt.
- **"Weekly Money Stand-Up due tomorrow"** → Push notification for Companion Mode couples.

### Positive Reinforcement Model
- **No punitive mechanics:** No lives, no energy loss.
- **Celebration moments:** Confetti animations, haptic feedback, "Victory Card" artifact on payoff.
AI communicates with warmth and positivity:
- “You’re $8 closer to financial freedom today.”
- “That $15 you saved today? Let’s send it to your smallest debt!”
- “Skipping that meal out helped you reach Level 3: Gazelle Intensity!”

Tone progression adapts to user engagement — encouraging, empathetic, motivating.

---

## 12) Phase-by-Phase Build Plan

### Phase 1 — **UX System & Conversational Onboarding (4 weeks)**
- Chat-based onboarding UI with AI prompts.
- Voice/text expense input prototypes.
- Design system (light/dark themes, empathy colors, micro-animations).
- Mock AI analysis & summary dashboards.

**Status:** 🔄 **IN PROGRESS** (~45% Complete)

**Completed:**
- ✅ Project initialization (React Native 0.76.6 with TypeScript)
- ✅ Organized folder structure (src/screens, components, theme, etc.)
- ✅ Design tokens (colors, typography, spacing, shadows)
- ✅ Constants module (app configuration, feature flags)
- ✅ Utility functions (formatCurrency, formatDate, etc.)
- ✅ Type definitions (User, Debt, navigation types)
- ✅ Build automation (build-android.bat for debug/release APKs)
- ✅ Component library (Button, Card, Input)
- ✅ Navigation setup (React Navigation v7 - Root, Onboarding, Main Tabs)
- ✅ WelcomeScreen implementation
- ✅ OnboardingIntroScreen (fully implemented)
- ✅ Screen structure (11 screens: 1 Welcome + 5 Onboarding + 5 Main)

**In Progress:**
- Remaining onboarding screens (Debts, Income, Emergency Fund, Complete)
- Dashboard content implementation
- Form validation and state management
- Additional components (Charts, Progress indicators, Badges)

**Deliverables**
- Design tokens (colors, spacing, typography)
- Component library (Buttons, Cards, Inputs, Charts, etc.)
- Screen flows:
  - Onboarding (manual debt entry)
  - Emergency Fund progress
  - Snowball Plan view
  - Daily Habit Loop
  - Companion Mode (household setup)
  - Paywall
  - Settings

**Acceptance**
- Full navigation with mocked data
- Dark mode + A11y (font scaling, contrast)
- Component library reusable across screens

---

### Phase 2 — Domain Logic + Local Snowball Engine (1-2 weeks)

- Offline prototype of debt plan generation.
- Daily check-in logic with gamified rewards.

**Deliverables**
- TypeScript Snowball module
- Local persistence (AsyncStorage) for prototype
- Daily loop state (streak/XP/levels/quests)

**Acceptance**
- Input debts → generate plan → mark debt paid → roll-down works
- Daily check-in increments streak/XP; quests unlock per rules

---

### Phase 3 — **AI Core & Coaching Layer (4 weeks)**
- AI profile generation & contextual prompts.
- NLP for expense recognition.
- Behavioral tracking (skip spends, streaks, emotional feedback).

### Phase 4 — Backend Skeleton + Auth + Entitlements (2-3 weeks)

**Deliverables**
- NestJS + Prisma, Postgres, Redis
- Auth (Auth0/Firebase/Cognito) + JWT/refresh flow
- RevenueCat (mobile) + Stripe (web) webhooks → entitlements
- REST scaffold: `/auth`, `/debts`, `/plan`, `/daily`, `/entitlements`

**Acceptance**
- Login/logout; Normal tier by default
- Sandbox purchase → Pro/Lifetime applied within <30s
- Paywall gates correctly

---

### Phase 5 — Bank Linking & Transactions (Plaid) (4-6 weeks)

**Deliverables**
- Plaid Link + token exchange; access_token stored encrypted
- Ingest accounts, liabilities, transactions; webhook→SQS→worker
- Confirm to log UI uses real proposals
- Recurring detection v1 (heuristics)
- Merge manual + auto debts (dedupe)

**Acceptance**
- Link bank; see debts/cards imported
- Daily screen shows yesterday's transactions to confirm
- Webhook-driven updates keep balances in sync

---

### Phase 6 — Gamification Engine (3-4 weeks)

**Deliverables**
- Streaks, XP, levels, badges; weekly stats
- Quest engine (server configs) + unlock rules
- Contextual nudges ("+$X kills on [date]")
- Push via OneSignal/FCM (quiet hours)

**Acceptance**
- Daily loop < 90s; streak persists across devices
- XP/levels/badges correct; quests award on completion
- Notifications respect preferences

---
### Phase 7 — **Security Hardening & Compliance (2 weeks)**
- MFA, data encryption, privacy workflows, SOC 2 preparation.
**Deliverables**
- MFA (email/TOTP/SMS)
- Field-level encryption + key rotation runbook
- WAF, rate limits, audit logs, admin RBAC
- Data export/delete self-service; retention policy
- Pen test + SOC 2 readiness checklist

**Acceptance**
- No High/Critical findings
- DSR (export/delete) within SLA
- Monitoring dashboards active; on-call runbooks tested

### Phase 8 — Companion Mode (Couples) (3-5 weeks)

**Deliverables**
- Household entity (up to 2 members)
- Entitlement sharing under one subscription
- Combined/Uncombined toggle; consented visibility per account/debt
- Shared Dashboard + Weekly Money Stand-Up checklist
- Private comments on milestones

**Acceptance**
- Invite code → join household; roles set (Owner/Member)
- Entitlements shared instantly
- Combined/Uncombined behaviors & privacy rules enforced

-

### Phase 9 — Payment Accelerators ("Ammo") (3-4 weeks)

**Deliverables**
- Round-ups to debt via ACH rails: Dwolla/Sila/Modern Treasury (or simulate redirects if rails deferred)
- Subscription Radar with cancel-assist deep links
- One-click overpay prompts around paydays

**Acceptance**
- Weekly sweep to smallest debt (or approved redirect)
- Live recurring charges + merchant deep links
- Overpay prompts trigger when close to payoff

---
---

## 13) UI/UX Deliverables (Atomic)

- **Design tokens JSON:** brand, neutral, semantic colors; spacing scale; font sizes/weights; radii/shadows
- **Component stories (Storybook):** Buttons, Inputs, Selects, Toggles, Avatars, Badges, Progress, Cards, Charts
- **Screen flows (IDs + navigation graph):** Onboarding → EF → Debts → Plan → Daily → Paywall → Settings → Companion
- **Micro-interactions:** confetti on payoff, haptics on level-up, progress bar ticks per confirmed transaction

## 13A) UX & Behavioral Psychology Principles

- **Positive Reinforcement:** Reward micro-wins (skipped purchase, subscription canceled).
- **Cognitive Load Reduction:** Chat-style input simplifies data entry.
- **Habit Formation:** Inspired by Tiny Habits and Atomic Habits frameworks.
- **AI Empathy Layer:** Tone adapts to user mood (coach vs motivator mode).
- **Gamified Motivation:** Uses streaks, confetti, and debt ladder visuals for progress gratification.


---

## 14) Testing Strategy

### Unit
- Snowball math (edge cases), date roll-downs, entitlement gates

### Integration
- Plaid webhooks → SQS → worker
- RevenueCat/Stripe webhooks
- ACH rails (if enabled)

### E2E
- Detox (onboarding → debt plan → daily loop → payoff); mocked network

### Security
- SAST/DAST (GitHub Advanced Security / Snyk)
- Dependency pinning (Renovate)
- Pen test pre-launch

### Performance Budgets
- P75 cold start < 2s
- P95 API < 300ms
- Crash-free ≥ 99.7%

---

## 15) Observability

### APM
- Datadog (traces, spans), Sentry (errors)

### Dashboards
- Signup funnel, bank-link success, daily retention, debts closed/user/month, EF to $1,000 within 30 days

### Alerts
- Plaid webhook failures, entitlement sync lag, auth anomalies

---

## 16) CI/CD & Repo Layout

### CI: GitHub Actions

- Lint & typecheck (ESLint + TypeScript)
- Unit/integration tests (Jest)
- **Android builds:**
  - Build APK for testing: `cd android && ./gradlew assembleRelease`
  - Build AAB for Play Store: `cd android && ./gradlew bundleRelease`
- **iOS builds:**
  - Archive & export IPA (requires macOS runner)
  - OR use cloud build service (Expo EAS, Bitrise, Codemagic)
- **CodePush deployments** for OTA updates
- Infra plan/apply (Terraform) on tagged releases

### Monorepo proposal

```
/apps
  /mobile (React Native)
/packages
  /ui (tokens, components)
  /snowball (TS engine)
  /api-client (OpenAPI/fetch)
  /config (eslint, tsconfig)
/services
  /api (NestJS)
  /workers (webhooks → SQS)
/infra
  /terraform
/docs
  /spec (this file)
```

---

## 17) .env Templates (Examples)

### Mobile (React Native CLI)

Use `react-native-config` or `react-native-dotenv` for environment variables.

**`.env` file (root of mobile app):**
```ini
# API Configuration
API_BASE_URL=https://api.yourapp.com

# OneSignal
ONESIGNAL_APP_ID=xxx-xxx-xxx-xxx

# RevenueCat
REVENUECAT_PUBLIC_KEY_IOS=appl_xxx
REVENUECAT_PUBLIC_KEY_ANDROID=goog_xxx

# Environment
ENVIRONMENT=development
```

**Usage in code (with react-native-config):**
```typescript
import Config from 'react-native-config';

const apiUrl = Config.API_BASE_URL;
const oneSignalId = Config.ONESIGNAL_APP_ID;
```

### Backend

```ini
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
AUTH_PROVIDER_DOMAIN=...
PLAID_CLIENT_ID=...
PLAID_SECRET=...
PLAID_ENV=sandbox
REVENUECAT_WEBHOOK_SECRET=...
STRIPE_WEBHOOK_SECRET=...
AWS_REGION=us-east-1
S3_BUCKET=debt-destroyer-prod
KMS_KEY_ID=arn:aws:kms:...
POSTMARK_TOKEN=...
```

---

## 18) Acceptance Tests (Sample Gherkin)

```gherkin
Feature: Snowball roll-down
  Scenario: Paying off the smallest debt rolls payment forward
    Given a user with three open debts and a monthlyBudget of $800
    When the user marks the smallest debt as paid
    Then the next month's payment for debt #2 increases by the amount of the paid debt's minPayment

Feature: Companion Mode entitlement sharing
  Scenario: Invite and join
    Given a Pro subscriber creates a household
    When the invited companion joins via invite code
    Then the companion has Pro entitlements within 30 seconds

Feature: Daily loop streak
  Scenario: Confirm transactions daily
    Given a user confirms transactions for 7 consecutive days
    Then the user's streak is 7 and a weekly badge is awarded
```

---

## 19) Copy & Tone (In-App)

- "Ammo", "Kill a debt", "Roll the payment", "Gazelle intensity"
- Positive nudges: "You're $18 away from paying Card #1 by Nov 23."

---

## 20) Build Order (One-Pager)

1. UI/UX system & screens (mocked)
2. Local Snowball + daily loop logic
3. Auth + Entitlements (RevenueCat/Stripe)
4. Plaid linking + transactions + confirm flow
5. Gamification (streaks/XP/quests/nudges)
6. Companion Mode (Household, permissions, shared dashboard)
7. Payment accelerators (round-ups, cancel-assist)
8. Security/compliance hardening

---

## 21) Project Structure & Organization

### Codebase Layout

```
debtDestoyer/                           # Project root
├── docs/                               # Documentation
│   ├── Debt_Destroyer_App_Specification.md  # This file
│   └── React_Native_Dev_Environment_Setup_Windows.md
├── screenshots/                        # Testing screenshots
└── DebtDestroyer/                      # React Native app
    ├── android/                        # Android native code
    ├── ios/                            # iOS native code
    ├── src/                            # Application source code
    │   ├── App.tsx                     # Main app component
    │   ├── screens/                    # Screen components
    │   │   ├── WelcomeScreen.tsx
    │   │   └── index.ts
    │   ├── components/                 # Reusable UI components
    │   ├── navigation/                 # React Navigation config
    │   ├── theme/                      # Design tokens (colors, spacing, typography)
    │   │   ├── colors.ts
    │   │   └── index.ts
    │   ├── types/                      # TypeScript definitions
    │   │   └── index.ts
    │   ├── constants/                  # App constants & feature flags
    │   │   └── index.ts
    │   ├── utils/                      # Helper functions
    │   │   └── index.ts
    │   ├── services/                   # API clients & integrations
    │   ├── hooks/                      # Custom React hooks
    │   └── assets/                     # Images, fonts, icons
    ├── __tests__/                      # Test files
    ├── builds/                         # APK outputs (gitignored)
    │   ├── debug/                      # Debug builds
    │   └── release/                    # Release builds
    ├── build-android.bat               # Automated build script
    ├── index.js                        # App entry point
    ├── package.json                    # Dependencies
    └── README.md                       # GitHub readme
```

### Source Organization

- **Screens**: Full-screen components; exported via `index.ts`
- **Components**: Reusable UI (buttons, cards, inputs, etc.)
- **Theme**: Design system - colors, typography, spacing
- **Types**: Shared TypeScript interfaces
- **Constants**: Configuration values, feature flags
- **Utils**: Format functions, validators, calculations
- **Services**: Plaid, RevenueCat, API clients
- **Hooks**: Shared stateful logic (useDebts, useAuth, etc.)

### Import Convention

Use index files for clean imports:

```typescript
// Good
import {WelcomeScreen} from './screens';
import {colors} from './theme';
import {formatCurrency} from './utils';

// Avoid
import {WelcomeScreen} from './screens/WelcomeScreen';
```

---

## 22) Build & Development Workflow

### Quick Build (Testing)

**Default: Debug Build**
Double-click `build-android.bat` to create a standalone APK.

- Bundles JavaScript code
- Packages into APK (~46MB)
- Saves to: `builds/debug/DebtDestroyer-[timestamp]-debug.apk`
- **No Metro bundler needed** - works standalone on phone

**Release Build**
Run `build-android.bat release` for optimized production builds.

- Minified & optimized
- Saves to: `builds/release/`

### Build Script Steps

1. **Clean** - Removes old build artifacts
2. **Bundle** - Packages JavaScript with Metro
3. **Build** - Compiles native code (Gradle)
4. **Copy** - Saves timestamped APK to builds folder

### Manual Build

```batch
cd android
gradlew.bat clean
gradlew.bat assembleDebug    # or assembleRelease
```

### Installation on Phone

1. Copy APK from `builds/debug/` to phone
2. Enable "Install from Unknown Sources"
3. Tap APK to install
4. Run app

### Troubleshooting

**Build fails:**
- Check Node.js & Android SDK installed
- Delete `node_modules`, run `npm install`
- Ensure you're in DebtDestroyer folder

**Changes not showing:**
- Build fresh APK after code changes
- Uninstall old version first
- Check timestamp in filename

---

## 23) Development Logs

### DevLog 1 - Project Initialization & Foundation (2025-11-04)

**Status:** ✅ Phase 1 Foundation Complete

**Session Goals:**
- Initialize React Native project
- Set up development workflow
- Create first functional screen
- Establish build automation
- Organize project structure

**Accomplishments:**

#### 1. Project Setup
- ✅ Initialized React Native 0.76.6 (bare workflow) with TypeScript
- ✅ Installed all dependencies (945 packages)
- ✅ Configured Android SDK path in `local.properties`
- ✅ Verified development environment compatibility

#### 2. Folder Structure & Organization
Created professional source code organization:
```
src/
├── App.tsx              # Main app component (moved from root)
├── screens/             # Screen components with barrel exports
│   ├── WelcomeScreen.tsx
│   └── index.ts
├── components/          # Reusable UI (ready for Phase 1 components)
├── navigation/          # React Navigation config (planned)
├── theme/               # Design system
│   ├── colors.ts        # Color tokens with light/dark mode
│   └── index.ts
├── types/               # TypeScript definitions
│   └── index.ts         # User, Debt, navigation types
├── constants/           # App configuration
│   └── index.ts         # Feature flags, app constants
├── utils/               # Helper functions
│   └── index.ts         # formatCurrency, formatDate, etc.
├── services/            # API clients (planned for Phase 3+)
├── hooks/               # Custom React hooks (planned)
└── assets/              # Images, fonts, icons
```

#### 3. Core Implementations

**WelcomeScreen** (`src/screens/WelcomeScreen.tsx`)
- Clean, minimal welcome screen
- Dark mode support using `useColorScheme`
- Dynamic content from constants
- Features preview with emojis
- Status indicator showing current phase
- Responsive to system theme changes

**Theme System** (`src/theme/colors.ts`)
- Brand colors: primary (blue), secondary (green), accent (gold)
- Semantic colors: success, warning, error, info
- Light/dark mode color schemes
- Debt-specific colors (debtRed, payoffGreen, snowballBlue)

**Constants Module** (`src/constants/index.ts`)
- App metadata (APP_NAME, APP_TAGLINE)
- Current phase tracking
- Subscription tier definitions
- Debt type constants
- Feature flags for phased rollout

**Utilities** (`src/utils/index.ts`)
- `formatCurrency()` - Locale-aware currency formatting
- `formatPercentage()` - APR display formatting
- `formatDate()` - Short/long date formats
- `daysBetween()` - Date calculations for payoff schedules

**Type Definitions** (`src/types/index.ts`)
- `RootStackParamList` - Navigation types
- `User` - User entity with tier information
- `Debt` - Debt entity with all required fields
- `ColorScheme` - Theme type definitions

#### 4. Build Automation

**Created `build-android.bat`** - One-click build script:
- Cleans previous builds
- Bundles JavaScript with Metro
- Compiles native Android code
- Generates timestamped APKs
- Supports debug (default) and release builds
- Auto-copies to `builds/debug/` or `builds/release/`

**Build Results:**
- Debug APK: ~104MB (with debug symbols)
- Release APK: ~46MB (optimized, minified)
- Build time: ~2-4 minutes (first build), ~1-2 min (subsequent)
- **Successfully tested on physical Android device** ✅

**Usage:**
```batch
# Debug build (default)
build-android.bat

# Release build
build-android.bat release
```

#### 5. Documentation Consolidation
- Moved all documentation to `docs/` folder
- Updated app spec with project structure (Section 21)
- Added build workflow documentation (Section 22)
- Removed redundant MD files
- Single source of truth: `Debt_Destroyer_App_Specification.md`

#### 6. Quality & Best Practices
- **Clean imports** using barrel exports (index.ts files)
- **TypeScript strict mode** enabled
- **Updated test imports** to reference `src/App`
- **Gitignore updated** for build artifacts and bundle files
- **Organized parent folders** (docs, screenshots, DebtDestroyer)

**Issues Resolved:**

1. **Metro bundler error on physical device**
   - Issue: Debug APK tried to connect to Metro (not available on phone)
   - Solution: Created standalone release-like debug builds with bundled JS
   - Impact: APKs now work completely standalone on any device

2. **Android SDK not found**
   - Issue: Gradle couldn't locate Android SDK
   - Solution: Created `android/local.properties` with SDK path
   - Impact: Builds now work consistently

3. **Node version compatibility**
   - Issue: Latest RN (0.82+) requires Node 20+, we have Node 18
   - Solution: Used React Native 0.76.6 (compatible with Node 18)
   - Impact: Stable build environment maintained

**Files Created/Modified:**

**Created:**
- `DebtDestroyer/src/App.tsx`
- `DebtDestroyer/src/screens/WelcomeScreen.tsx`
- `DebtDestroyer/src/screens/index.ts`
- `DebtDestroyer/src/theme/colors.ts`
- `DebtDestroyer/src/theme/index.ts`
- `DebtDestroyer/src/types/index.ts`
- `DebtDestroyer/src/constants/index.ts`
- `DebtDestroyer/src/utils/index.ts`
- `DebtDestroyer/build-android.bat`
- `DebtDestroyer/android/local.properties`

**Modified:**
- `DebtDestroyer/index.js` - Updated import to `src/App`
- `DebtDestroyer/__tests__/App.test.tsx` - Updated import path
- `DebtDestroyer/.gitignore` - Added build outputs, bundle files
- `docs/Debt_Destroyer_App_Specification.md` - Added Sections 21-23

**Directories Created:**
- `DebtDestroyer/src/` (all subdirectories)
- `DebtDestroyer/builds/debug/`
- `DebtDestroyer/builds/release/`

**Next Session Goals:**

For DevLog 2 (Phase 1 continuation):
- [ ] Install React Navigation v6
- [ ] Create component library (Button, Card, Input, Badge)
- [ ] Build additional screens (Onboarding, Debt List, Emergency Fund)
- [ ] Add typography and spacing to theme system
- [ ] Implement navigation flow
- [ ] Add dark mode toggle
- [ ] Create Storybook for component development (optional)

**Metrics:**
- Lines of Code: ~400 (production code)
- Components: 1 screen (WelcomeScreen)
- Build Time: 3-4 minutes
- APK Size: 46MB (release), 104MB (debug)
- Dependencies: 945 npm packages
- Phase 1 Progress: ~15% complete

**Learnings:**
1. React Native bare workflow requires more setup but gives full control
2. Standalone debug builds need explicit JS bundling
3. Build automation saves significant time in development cycle
4. Barrel exports (index.ts) make imports much cleaner
5. Physical device testing reveals issues emulator doesn't show

---

### DevLog 2 - Navigation & Component Library (2025-11-05)

**Status:** ✅ Phase 1 Components & Navigation Complete

**Session Goals:**
- Expand theme system with typography, spacing, and shadows
- Build reusable component library
- Implement React Navigation architecture
- Create onboarding and main app screens
- Establish navigation flow

**Accomplishments:**

#### 1. Theme System Expansion

**Typography System** (`src/theme/typography.ts`)
- Font families (System fonts with regular/medium/bold)
- Font sizes: 8 levels from xs (12px) to 5xl (48px)
- Font weights: regular (400), medium (500), semibold (600), bold (700)
- Line heights: tight (1.25), normal (1.5), relaxed (1.75)
- Predefined text styles for common use cases:
  - Headings: h1 through h5
  - Body: body, bodyLarge, bodySmall, caption
  - Buttons: button, buttonSmall

**Spacing System** (`src/theme/spacing.ts`)
- 4px-based spacing scale (xs: 4px through 4xl: 64px)
- Use-case specific tokens:
  - screenPadding: 16px
  - cardPadding: 16px
  - sectionGap: 24px
  - itemGap: 12px
- Border radius scale (sm: 4px to full: 9999px for pills/circles)

**Shadow System** (`src/theme/shadows.ts`)
- Cross-platform shadow definitions
- 5 elevation levels: none, sm, md, lg, xl
- iOS properties: shadowColor, shadowOffset, shadowOpacity, shadowRadius
- Android elevation values
- Consistent depth across platforms

#### 2. Component Library

**Button Component** (`src/components/Button.tsx`)
- **4 variants:** primary, secondary, text, danger
- **3 sizes:** small (36px), medium (44px), large (52px)
- **Features:**
  - Loading state with ActivityIndicator
  - Disabled state handling with opacity
  - Full width option
  - Custom style and textStyle props
  - Active opacity feedback (0.7)
- **Accessibility:** Proper touch targets (minimum 44px)

**Card Component** (`src/components/Card.tsx`)
- **3 variants:**
  - default: Solid background with theme colors
  - outlined: Border with transparent background
  - elevated: Medium shadow for depth
- **Features:**
  - Optional onPress (converts to TouchableOpacity)
  - Configurable padding via spacing tokens
  - Dark mode support
  - Rounded corners (lg radius: 12px)

**Input Component** (`src/components/Input.tsx`)
- **Features:**
  - Optional label with proper spacing
  - Error message display in red
  - Prefix/suffix text (e.g., "$" for currency)
  - Dark mode support
  - Proper focus states
  - Custom container and input styles
- **Styling:**
  - Minimum height: 48px (accessibility)
  - Border changes color on error state
  - Placeholder color respects theme

#### 3. Navigation System (React Navigation v6)

**Dependencies Installed:**
```json
"@react-navigation/native": "^7.1.19"
"@react-navigation/stack": "^7.6.2"
"@react-navigation/bottom-tabs": "^7.8.1"
"react-native-gesture-handler": "^2.29.1"
"react-native-safe-area-context": "^5.6.2"
"react-native-screens": "4.18.0"
```

**RootNavigator** (`src/navigation/RootNavigator.tsx`)
- Main stack navigator with 3 routes:
  1. Welcome - App landing/splash
  2. Onboarding - Multi-step setup flow
  3. Main - Main app experience (tabs)
- Navigation Container wrapper
- Headers hidden by default
- Gesture navigation enabled

**OnboardingNavigator** (`src/navigation/OnboardingNavigator.tsx`)
- Stack navigator for onboarding flow
- 5 screens in sequence:
  1. OnboardingIntro - Journey introduction
  2. OnboardingDebts - Debt entry
  3. OnboardingIncome - Income & expenses
  4. OnboardingEmergencyFund - $1,000 emergency fund setup
  5. OnboardingComplete - Completion celebration
- Custom header styling with theme awareness
- Dark mode support for headers and backgrounds

**MainTabNavigator** (`src/navigation/MainTabNavigator.tsx`)
- Bottom tab navigator with 5 tabs:
  - **Dashboard** (Home) - Financial snapshot
  - **Debts** - Debt list management
  - **Plan** - Snowball plan visualization
  - **Daily** - Daily check-in & habits
  - **Settings** - App settings & preferences
- Active tab color: primary blue
- Inactive tab color: secondary text color
- Dark mode tab bar styling
- Consistent header styling across tabs

#### 4. Onboarding Screens

**OnboardingIntroScreen** (`src/screens/OnboardingIntroScreen.tsx`) ✅ Fully Implemented
- Welcome message with tagline
- **4-step breakdown:**
  1. List Your Debts
  2. Set Your Income
  3. Emergency Fund
  4. Create Your Plan
- Visual step indicators (numbered circles)
- Info card explaining Debt Snowball method
- Primary CTA button: "Let's Get Started"
- Fully styled with dark mode support
- Navigates to OnboardingDebts

**Placeholder Screens** (Ready for Phase 1 completion):
- `OnboardingDebtsScreen.tsx` - Debt entry form
- `OnboardingIncomeScreen.tsx` - Income & expense inputs
- `OnboardingEmergencyFundScreen.tsx` - Emergency fund goal
- `OnboardingCompleteScreen.tsx` - Success celebration

#### 5. Main App Screens

**Placeholder Screens** (All 5 created with basic structure):
- `DashboardScreen.tsx` - Financial overview placeholder
- `DebtsScreen.tsx` - Debt list placeholder
- `PlanScreen.tsx` - Snowball plan placeholder
- `DailyScreen.tsx` - Daily check-in placeholder
- `SettingsScreen.tsx` - Settings placeholder

*All screens have:*
- Dark mode support
- Proper theme color integration
- Centered placeholder text
- Ready for content implementation

#### 6. App Structure Updates

**App.tsx** (`src/App.tsx`)
- Simplified to single RootNavigator component
- Clean entry point
- Navigation handles all routing

**Barrel Exports Created:**
- `src/navigation/index.ts` - Export all navigators
- `src/components/index.ts` - Export all components
- `src/screens/index.ts` - Export all screens
- `src/theme/index.ts` - Export all theme tokens

#### 7. Type System Updates

**Navigation Types** (`src/types/index.ts`)
```typescript
// Root navigation
type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Main: undefined;
}

// Onboarding flow
type OnboardingStackParamList = {
  OnboardingIntro: undefined;
  OnboardingDebts: undefined;
  OnboardingIncome: undefined;
  OnboardingEmergencyFund: undefined;
  OnboardingComplete: undefined;
}

// Main tabs
type MainTabParamList = {
  Dashboard: undefined;
  Debts: undefined;
  Plan: undefined;
  Daily: undefined;
  Settings: undefined;
}
```

**Files Created:**

**Theme System (3 files):**
- `src/theme/typography.ts` (103 lines)
- `src/theme/spacing.ts` (37 lines)
- `src/theme/shadows.ts` (56 lines)

**Components (3 files):**
- `src/components/Button.tsx` (166 lines)
- `src/components/Card.tsx` (78 lines)
- `src/components/Input.tsx` (135 lines)

**Navigation (3 files):**
- `src/navigation/RootNavigator.tsx` (32 lines)
- `src/navigation/OnboardingNavigator.tsx` (78 lines)
- `src/navigation/MainTabNavigator.tsx` (91 lines)
- `src/navigation/index.ts` (barrel exports)

**Onboarding Screens (5 files):**
- `src/screens/OnboardingIntroScreen.tsx` (238 lines - fully implemented)
- `src/screens/OnboardingDebtsScreen.tsx` (placeholder)
- `src/screens/OnboardingIncomeScreen.tsx` (placeholder)
- `src/screens/OnboardingEmergencyFundScreen.tsx` (placeholder)
- `src/screens/OnboardingCompleteScreen.tsx` (placeholder)

**Main Screens (5 files):**
- `src/screens/DashboardScreen.tsx` (placeholder)
- `src/screens/DebtsScreen.tsx` (placeholder)
- `src/screens/PlanScreen.tsx` (placeholder)
- `src/screens/DailyScreen.tsx` (placeholder)
- `src/screens/SettingsScreen.tsx` (placeholder)

**Modified:**
- `src/App.tsx` - Updated to use RootNavigator
- `src/theme/index.ts` - Re-export typography, spacing, shadows
- `src/components/index.ts` - Export Button, Card, Input
- `src/screens/index.ts` - Export all screens
- `package.json` - Added 6 navigation dependencies

**Testing:**
- All navigation flows tested manually
- Theme tokens validated across light/dark modes
- Components render correctly in all variants/sizes
- No TypeScript errors

**Next Session Goals:**

For DevLog 3 (Phase 1 completion):
- [ ] Complete remaining onboarding screens (Debts, Income, Emergency Fund, Complete)
- [ ] Build debt entry form with Input components
- [ ] Add income/expense calculator
- [ ] Create emergency fund progress component
- [ ] Implement onboarding state management (useState/Context)
- [ ] Add form validation
- [ ] Create celebration animations for OnboardingComplete
- [ ] Add progress indicator for onboarding steps
- [ ] Build initial Dashboard cards (mocked data)
- [ ] Consider adding animations (Reanimated 2)

**Metrics:**
- Lines of Code: ~1,250 (production code)
- Components: 3 (Button, Card, Input)
- Screens: 11 total (1 Welcome + 5 Onboarding + 5 Main)
- Navigation: 3 navigators (Root, Onboarding, Main Tabs)
- Theme Modules: 6 (colors, typography, spacing, shadows + index)
- Dependencies Added: 6 navigation packages
- Phase 1 Progress: ~45% complete (up from 15%)

**Learnings:**
1. React Navigation v7 has excellent TypeScript support with proper type inference
2. Barrel exports significantly improve import cleanliness across the app
3. Design tokens (theme system) make dark mode implementation trivial
4. Component library approach ensures UI consistency from the start
5. Stack + Tab navigator architecture provides flexible navigation structure
6. Placeholder screens help visualize complete navigation flow early
7. Cross-platform shadows require both iOS and Android properties

**Known Issues:**
- None at this time; all features working as expected

**Build Status:**
- ✅ Builds successfully on Android
- ✅ Navigation flows work correctly
- ✅ Dark mode toggles properly
- ✅ No TypeScript errors
- ✅ No console warnings

---

## 24) Final Deliverable

A secure, subscription-based React Native app (iOS/Android) that guides users through actionable, gamified steps to eliminate debt — solo or with a partner — while upholding strict privacy & security standards.
