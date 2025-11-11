# 02) Architecture & Tech Stack

**LLM SUMMARY:**
- 3-layer architecture: Mobile (React Native) → Backend Gateway (NestJS) → External APIs
- Privacy-first with backend proxy pattern (no direct external API calls from mobile)
- Postgres + Prisma ORM with Row-Level Security for data isolation
- AWS infrastructure: RDS, ElastiCache (Redis), Secrets Manager, S3, ECR
- NestJS backend with JWT auth, rate limiting, and service-oriented design
- React Native CLI (bare workflow) with TypeScript, OTA updates via CodePush
- External integrations: OpenAI (AI coach), Plaid (bank connections), RevenueCat/Stripe (payments)

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

## High-Level Architecture (3-Layer Pattern)

**Critical Principle:** Mobile app NEVER calls external APIs directly. All external integrations go through backend gateway.

```
┌─────────────────────────────────────────────────────────────────┐
│                        MOBILE APP (React Native)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Dashboard   │  │ Goals/Chall. │  │  Expenses    │          │
│  │   Screen     │  │    Screen    │  │   Screen     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  • No direct API calls to OpenAI, Plaid, Stripe, etc.          │
│  • Only communicates with Backend Gateway                       │
│  • JWT authentication on every request                          │
└─────────────────────────────────────────────────────────────────┘
                              ▼ (TLS 1.3 + JWT)
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND GATEWAY (NestJS)                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              AUTHENTICATION & AUTHORIZATION             │    │
│  │  • JWT validation on all requests                      │    │
│  │  • User ID extraction from token                       │    │
│  │  • Row-Level Security enforcement                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   BUSINESS LOGIC LAYER                  │    │
│  │  ├─ AI Service (OpenAI proxy with prompt guardrails)   │    │
│  │  ├─ Plaid Service (token exchange, webhook processing) │    │
│  │  ├─ Snowball Engine (debt calculation logic)           │    │
│  │  ├─ Gamification Service (XP, streaks, challenges)     │    │
│  │  ├─ Payment Service (RevenueCat/Stripe webhook proxy)  │    │
│  │  └─ Notification Service (OneSignal/FCM proxy)         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   DATA ISOLATION LAYER                  │    │
│  │  • All queries scoped by user_id from JWT              │    │
│  │  • Postgres RLS policies enforced                      │    │
│  │  • Household permissions checked before access         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Persistence: Postgres + Prisma ORM                             │
│  Cache: Redis (user sessions, rate limits)                      │
│  Secrets: AWS Secrets Manager + KMS encryption                  │
└─────────────────────────────────────────────────────────────────┘
                              ▼ (Server-to-Server)
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL APIS (Proxied)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   OpenAI     │  │    Plaid     │  │ RevenueCat/  │          │
│  │     API      │  │     API      │  │   Stripe     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  • Backend makes ALL external API calls                         │
│  • API keys stored in Secrets Manager (never in frontend)       │
│  • Rate limiting enforced at backend layer                      │
│  • User data NEVER sent to external APIs without sanitization   │
└─────────────────────────────────────────────────────────────────┘
```

## Key Architectural Decisions

1. **Backend Gateway Pattern:** Mobile app → Backend → External APIs (NEVER direct)
2. **Data Isolation:** All queries scoped by `user_id` from authenticated JWT token
3. **AI Proxy:** Backend sanitizes prompts and enforces guardrails before calling OpenAI
4. **Secrets Management:** All API keys in AWS Secrets Manager, rotated regularly
5. **Privacy by Design:** User data encrypted at rest and in transit

## Tech Stack Details

### 4.1 Mobile (React Native CLI - Bare Workflow)

- **Framework:** React Native (TypeScript) - Bare workflow (no Expo managed)
- **OTA Updates:** CodePush (Microsoft App Center) for over-the-air updates
- **Navigation:** React Navigation v6 (Stack + Tab navigators)
- **State Management:** Zustand (lightweight) + React Query (server state)
- **UI Components:** Custom components following Atomic Design principles
- **Animations:** React Native Reanimated 3 + Lottie
- **Secure Storage:** React Native Keychain for JWT tokens
- **Push Notifications:** React Native Push Notification + OneSignal
- **Voice Input:** React Native Voice + Expo Speech (for AI chat)
- **Biometrics:** React Native Biometrics for secure login

### 4.2 Backend (NestJS)

- **Framework:** NestJS (Node.js + TypeScript)
- **Authentication:** JWT with refresh token rotation
- **Database:** PostgreSQL 14+ with Prisma ORM
- **Caching:** Redis (session storage, rate limits)
- **File Storage:** AWS S3 for receipts, exports
- **Background Jobs:** Bull Queue + Redis
- **Logging:** Winston + structured JSON logs
- **Health Checks:** `/health` endpoint with DB/Redis status
- **API Rate Limiting:** Express-rate-limit + Redis store

### 4.3 External APIs (Proxied)

**OpenAI API**
- GPT-4 for AI financial coaching
- Usage tracking and cost controls
- Prompt guardrails enforced in backend

**Plaid API**
- Bank account linking and transaction data
- Webhook processing for transaction updates
- Token exchange and refresh token management

**RevenueCat + Stripe**
- Subscription management and payments
- RevenueCat for mobile subscription logic
- Stripe webhook proxy for payment events

### 4.4 AWS Infrastructure

**Compute**
- EKS (Kubernetes) for backend deployment
- Auto-scaling based on CPU/memory metrics
- Blue-green deployments via GitOps

**Database**
- RDS PostgreSQL with Multi-AZ
- Automated daily backups + point-in-time recovery
- Read replicas for reporting/analytics

**Cache & Storage**
- ElastiCache Redis cluster
- S3 for file storage with lifecycle policies
- CloudFront CDN for static assets

**Security & Monitoring**
- Secrets Manager for API key rotation
- CloudWatch for metrics and logging
- X-Ray for distributed tracing
- WAF for API protection

### 4.5 Development & CI/CD

**Version Control**
- Git with conventional commits (Conventional Commits spec)
- Feature branch workflow with PR templates
- Automated version bumping via semantic-release

**Testing**
- Jest + React Native Testing Library for mobile
- Jest + Supertest for backend API testing
- E2E testing with Detox (mobile) + Cypress (backend)

**CI/CD Pipeline**
- GitHub Actions for automated builds
- Mobile: Build → Test → Deploy to TestFlight/Play Store Internal
- Backend: Build → Test → Security Scan → Deploy to EKS
- Infrastructure: Terraform with Atlantis for PR-based deployments

## Environment Configuration

**Development**
- Local Postgres + Docker Compose for backend
- React Native Metro bundler with hot reload
- Localstack for AWS service mocking

**Staging**
- Full AWS environment (scaled-down version)
- Separate Plaid/OpenAI API keys for testing
- Automated data seeding for consistent test data

**Production**
- High-availability AWS setup across multiple AZs
- Database backups with 30-day retention
- Application performance monitoring (APM) via DataDog

---
*See: [Product Overview](01_product_overview.md) → [Data Model](03_data_model.md) → [Security Architecture](06_security_and_privacy.md)*