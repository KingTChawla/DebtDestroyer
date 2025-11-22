# 02) Architecture & Tech Stack

**Version:** 2.0 - Supabase Architecture (Updated 2025-11-22)

**LLM SUMMARY:**
- 3-layer architecture: Mobile (React Native) → Supabase Backend → External APIs
- **Manual-entry only** (no Plaid) for habit-building focus
- Supabase Postgres + Row-Level Security for data isolation
- Supabase Auth for email + OAuth (Google/Apple)
- Supabase Edge Functions for business logic (AI proxy, webhooks)
- React Native CLI (bare workflow) with TypeScript
- External integrations: OpenAI (AI coach), RevenueCat/Stripe (payments)
- **Cost-effective:** $25/month vs $150-300/month for AWS

## Development Environment Status

**Status:** ✅ **COMPLETE** (Setup Date: 2025-11-05)

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

**Supabase Setup:** Pending Phase 6

---

## Key Architecture Changes

| Component | Original (NestJS + AWS) | Revised (Supabase) |
|-----------|-------------------------|---------------------|
| **Backend** | NestJS custom server | Supabase managed platform |
| **Database** | AWS RDS + Prisma ORM | Supabase Postgres (direct access) |
| **Auth** | Custom JWT implementation | Supabase Auth (built-in) |
| **Storage** | AWS S3 | Supabase Storage |
| **Cache** | AWS ElastiCache (Redis) | ❌ Not needed for MVP |
| **Bank Integration** | Plaid (Phase 10) | **❌ Removed entirely** |
| **Monthly Cost** | ~$150-300 | **$25 (Pro tier)** |

---

## High-Level Architecture (3-Layer Pattern)

**Critical Principle:** Mobile app NEVER calls external APIs directly. All external integrations go through Supabase Edge Functions.

```
┌──────────────────────────────────────────────────────────────┐
│               MOBILE APP (React Native)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Dashboard   │  │ Goals/Chall. │  │  Expenses    │       │
│  │   Screen     │  │    Screen    │  │   Screen     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  Phase 1-5: AsyncStorage (local-only)                       │
│  Phase 6+:  Supabase Client (@supabase/supabase-js)         │
│                                                               │
│  • No direct API calls to OpenAI, Stripe, etc.              │
│  • Only communicates with Supabase                           │
│  • JWT authentication from Supabase Auth                     │
└──────────────────────────────────────────────────────────────┘
                         ▼ (TLS 1.3 + JWT)
┌──────────────────────────────────────────────────────────────┐
│              SUPABASE BACKEND PLATFORM                       │
│  ┌────────────────────────────────────────────────────┐     │
│  │        SUPABASE AUTH (Built-in)                    │     │
│  │  • Email/password + Google/Apple OAuth             │     │
│  │  • JWT token generation & refresh                  │     │
│  │  • User session management                         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │     SUPABASE POSTGRES DATABASE                     │     │
│  │  • Row-Level Security (RLS) policies               │     │
│  │  • Automatic user_id scoping via auth.uid()        │     │
│  │  • Real-time subscriptions (optional)              │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │    SUPABASE EDGE FUNCTIONS (Deno Runtime)          │     │
│  │  ├─ ai-chat: OpenAI proxy with guardrails          │     │
│  │  ├─ snowball-calc: Debt payoff projections         │     │
│  │  ├─ payment-webhook: RevenueCat/Stripe webhooks    │     │
│  │  └─ receipt-ocr: AWS Textract (optional)           │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │        SUPABASE STORAGE (S3-compatible)            │     │
│  │  • Receipt images                                  │     │
│  │  • Data exports (JSON/CSV)                         │     │
│  └────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
                         ▼ (Server-to-Server)
┌──────────────────────────────────────────────────────────────┐
│         EXTERNAL APIS (Proxied via Edge Functions)           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   OpenAI     │  │  RevenueCat  │  │    Stripe    │       │
│  │   GPT-4      │  │Subscriptions │  │   Payments   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  • Edge Functions make ALL external API calls               │
│  • API keys stored in Supabase Vault                         │
│  • Rate limiting enforced at Edge Function layer             │
│  • User data sanitized before external API calls             │
└──────────────────────────────────────────────────────────────┘
```

## Key Architectural Decisions

### 1. No Bank Integration (Plaid Removed)
**Rationale:** Debt Destroyer is a **habit-builder app**, not a bank aggregator.

**Benefits:**
- ✅ Focus on intentional manual entry for awareness
- ✅ Eliminates Plaid costs ($1-2/user/month)
- ✅ No complex OAuth flows or webhook handling
- ✅ Faster MVP development
- ✅ Users engage more deeply through active logging

### 2. Supabase Backend (Instead of NestJS + AWS)
**Rationale:** Faster MVP, lower cost, less DevOps overhead.

**Benefits:**
- ✅ Built-in auth with OAuth (Google/Apple)
- ✅ Postgres with Row-Level Security (RLS)
- ✅ Edge Functions for custom business logic (Deno runtime)
- ✅ Real-time subscriptions out-of-the-box
- ✅ **Cost:** $25/month vs $150-300/month for AWS
- ✅ **Setup:** 1 day vs 1-2 weeks

### 3. Mobile-First, Backend-Later
**Rationale:** Validate UX before infrastructure investment.

**Phases 1-5 (MVP):** Build all 4 screens with AsyncStorage (local-only)
**Phase 6+:** Add Supabase authentication and sync

### 4. Data Isolation via Row-Level Security (RLS)
**Rationale:** Privacy-first design with automatic user scoping.

Example RLS Policy:
```sql
CREATE POLICY "Users can view own debts"
ON public.debts FOR SELECT
USING (auth.uid() = user_id);
```

### 5. AI Proxy via Edge Functions
**Rationale:** Secure OpenAI integration with guardrails.

- API keys never exposed to mobile app
- Prompt sanitization before OpenAI calls
- Rate limiting per subscription tier
- PII removal from user inputs

## Tech Stack Details

### 4.1 Mobile (React Native CLI - Bare Workflow)

**Framework & Core:**
- **React Native:** 0.76.6 (CLI, bare workflow - no Expo managed)
- **TypeScript:** Strict mode enabled
- **Navigation:** React Navigation v7 (Stack + Tab navigators)

**State Management:**
- **Zustand:** Lightweight local state (UI state, settings)
- **React Query:** Server state caching and sync (Phase 6+)
- **AsyncStorage:** Local persistence (Phases 1-5)
- **@supabase/supabase-js:** Supabase client (Phase 6+)

**UI & Animations:**
- **Custom Components:** Atomic Design principles
- **Reanimated 3:** High-performance animations
- **react-native-confetti-cannon:** Milestone celebrations
- **react-native-chart-kit:** Charts and visualizations

**Security:**
- **react-native-keychain:** Secure JWT token storage
- **No API keys in app:** All external calls via Supabase

### 4.2 Backend (Supabase)

**Supabase Services:**

**Auth:**
- Email/password with email verification
- Google OAuth and Apple Sign-In
- JWT tokens (automatic generation and refresh)
- 7-day sessions with auto-refresh

**Database:**
- PostgreSQL 14+ (Supabase hosted)
- Direct SQL queries via Supabase client
- Row-Level Security (RLS) on all tables
- Auto-generated REST API for CRUD

**Edge Functions (Deno Runtime):**
- `ai-chat` - OpenAI proxy with guardrails
- `snowball-calculate` - Debt payoff projections
- `payment-webhook` - RevenueCat/Stripe webhooks
- `receipt-ocr` - AWS Textract integration (optional)

**Storage:**
- S3-compatible file storage
- Receipt images and data exports
- RLS policies for user-specific file access

**Realtime (Optional):**
- Postgres change subscriptions
- Live sync across devices

### 4.3 External APIs (Proxied via Edge Functions)

**OpenAI API** (Phase 8)
- GPT-4 for AI financial coaching
- Usage tracking and cost controls (Free: 10/day, Pro: 100/day)
- Prompt guardrails enforced in Edge Functions

**RevenueCat + Stripe** (Phase 9)
- RevenueCat for mobile subscriptions (iOS/Android)
- Stripe for web payments (future)
- Webhook handlers via Supabase Edge Functions

**AWS Textract** (Phase 10 - Optional)
- Receipt OCR for expense extraction
- Pay-per-use integration via Edge Function

### 4.4 Supabase Infrastructure

**Hosting:**
- Region: US East or closest to users
- Tier: Free (development) → Pro ($25/month for production)
- Automatic backups with 7-day retention
- Automatic horizontal scaling

**Cost Comparison:**
- **Supabase Pro:** $25/month
- **Original AWS Stack:** $150-300/month
- **Savings:** ~$125-275/month

### 4.5 Development & CI/CD

**Version Control**
- Git with conventional commits (Conventional Commits spec)
- Feature branch workflow with PR templates
- Automated version bumping via semantic-release

**Testing**
- Jest + React Native Testing Library for mobile
- Unit tests for snowball calculations and XP logic
- Component tests for UI elements

**CI/CD Pipeline**
- GitHub Actions for automated builds
- Mobile: Build → Test → Deploy to TestFlight/Play Store Internal
- Supabase: CLI-based Edge Function deployments
- Database: Version-controlled SQL migrations

## Environment Configuration

**Development (Phases 1-5)**
- React Native Metro bundler with hot reload
- AsyncStorage for local-only persistence
- No backend dependency

**Development (Phase 6+)**
- Supabase hosted database (development project)
- Edge Functions via Supabase CLI
- Local testing with Supabase local dev (optional)

**Staging**
- Separate Supabase project for staging
- Staging API keys for OpenAI/RevenueCat
- Automated data seeding

**Production**
- Supabase Pro tier ($25/month)
- Automatic backups with 7-day retention
- Monitoring via Supabase Dashboard + Sentry

## Development Workflow

**Phase 1-5 (Local-only):**
```bash
# Start React Native development
npx react-native start
npx react-native run-android
# No backend needed - uses AsyncStorage
```

**Phase 6+ (Supabase Integration):**
```bash
# Install Supabase CLI
npm install -g supabase

# Link to Supabase project
supabase link --project-ref <project-id>

# Run database migrations
supabase db push

# Deploy Edge Functions
supabase functions deploy ai-chat

# Start mobile app
npx react-native start
npx react-native run-android
```

---
*See: [Product Overview](01_product_overview.md) → [Data Model](03_data_model.md) → [Revised Phase Plan](../REVISED_PHASE_PLAN_SUPABASE.md)*