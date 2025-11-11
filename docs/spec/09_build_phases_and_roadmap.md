# 09) Build Phases & Roadmap

**LLM SUMMARY:**
- MVP prioritizes manual entry over bank integrations for faster market validation
- 4-screen architecture implementation before backend complexity
- 12-phase development plan from UI system through bank integration
- Front-loaded UX development with local storage for MVP testing
- Plaid integration as final phase after product-market fit validation
- Clear acceptance criteria and deliverables for each phase
- Progressive enhancement approach with optional advanced features

## Architecture Revision & MVP Strategy

**Architecture Revision (2025-11-05):**
- Updated from 5-tab design to cognitive-optimized 4-screen framework
- Preserves completed work from DevLogs 1-2 while improving UX focus

**MVP Strategy Revision (2025-11-08):**
- **Plaid/Bank integration is OUT OF SCOPE for MVP**
- Manual entry only for debts, income, and expenses
- Validates product-market fit before adding complex external integrations
- Phase 10 (Bank Linking) becomes final post-MVP phase

**Key Principles:**
1. **Front-load UI/UX** before backend complexity
2. **Local-first** approach for MVP testing
3. **Manual entry validation** proves core value proposition
4. **Progressive enhancement** with optional advanced features

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

### Phase 6 — Backend API & Authentication (4 weeks) [Post-MVP]

**Objective:** Build NestJS backend with authentication, database, and core APIs.

**Deliverables:**
- **NestJS backend** setup with TypeScript
- **PostgreSQL database** with Prisma ORM
- **JWT authentication** system
- **User management** APIs
- **Debt & expense** CRUD APIs
- **Gamification** APIs (XP, streaks, challenges)
- **AI proxy service** (OpenAI integration with guardrails)
- **Row-Level Security** implementation
- **API documentation** (OpenAPI/Swagger)

**Acceptance Criteria:**
- JWT authentication works with refresh token rotation
- All CRUD operations work with proper user isolation
- Row-Level Security prevents cross-user data access
- AI proxy enforces prompt guardrails and rate limiting
- API responses are properly documented
- Database migrations work correctly

---

### Phase 7 — Mobile API Integration & Sync (3 weeks) [Post-MVP]

**Objective:** Integrate mobile app with backend APIs and implement data synchronization.

**Deliverables:**
- **API client** integration in React Native app
- **Authentication flow** (login, register, token refresh)
- **Data synchronization** between local storage and backend
- **Offline support** with conflict resolution
- **Real-time updates** (WebSocket or polling)
- **Error handling** and retry logic
- **Loading states** and progressive enhancement
- **Data migration** from local to backend storage

**Acceptance Criteria:**
- Users can register and login successfully
- Data syncs automatically between devices
- App works offline and syncs when online
- Real-time updates appear without app refresh
- Network errors are handled gracefully
- Loading states provide good UX feedback
- Local data migrates cleanly to backend

---

### Phase 8 — AI Financial Coach (3 weeks) [Post-MVP]

**Objective:** Implement full AI financial coaching with enhanced capabilities.

**Deliverables:**
- **Enhanced AI responses** with user context
- **Financial analysis** and insights
- **Spending pattern** recognition
- **Debt optimization** recommendations
- **Motivational messaging** with personality
- **Contextual nudges** and smart alerts
- **Cost controls** and usage monitoring
- **AI analytics** and improvement tracking

**Acceptance Criteria:**
- AI provides personalized financial advice
- Spending patterns are accurately identified
- Debt recommendations are mathematically sound
- User context improves response quality
- AI usage stays within cost limits
- Abuse detection prevents exploitation
- User satisfaction with AI interactions

---

### Phase 9 — Subscription & Payments (3 weeks) [Post-MVP]

**Objective:** Implement subscription tiers and payment processing.

**Deliverables:**
- **RevenueCat integration** for mobile subscriptions
- **Stripe integration** for web payments
- **Subscription tiers** (Free, Pro, Lifetime)
- **Payment processing** and webhooks
- **Entitlement system** with feature gates
- **Subscription management** (upgrade, downgrade, cancel)
- **Free trial** implementation
- **Receipt validation** and fraud prevention

**Acceptance Criteria:**
- Users can subscribe and manage subscriptions
- Feature gates work correctly for each tier
- Payment webhooks update entitlements properly
- Receipts are validated and fraudulent attempts blocked
- Subscription changes take effect immediately
- Free trial converts properly to paid subscriptions
- Customer support can manage subscription issues

---

### Phase 10 — Bank Integration & Plaid (4 weeks) [Post-MVP Final Phase]

**Objective:** Add bank linking and automated transaction import.

**Deliverables:**
- **Plaid integration** with Link component
- **Bank account** linking and token exchange
- **Transaction import** and categorization
- **Automatic debt detection** from liabilities
- **Account syncing** and balance updates
- **Webhook processing** for real-time updates
- **Bank branding** and institution display
- **Error handling** for connection issues

**Acceptance Criteria:**
- Users can successfully link bank accounts
- Transactions import and categorize automatically
- Debt accounts are detected and added to snowball plan
- Account balances sync regularly
- Webhooks update data in near real-time
- Connection errors are handled gracefully
- Bank branding displays correctly
- Data security meets compliance requirements

---

### Phase 11 — Companion Mode (Couples & Households) (3 weeks) [Advanced]

**Objective:** Enable shared financial management for couples and households.

**Deliverables:**
- **Household creation** and invite system
- **Member roles** and permissions
- **Shared vs separate** finances toggle
- **Household dashboard** and combined progress
- **Weekly Money Stand-Up** feature
- **Privacy controls** for sensitive data
- **Goal sharing** and collaborative tracking
- **Household analytics** and insights

**Acceptance Criteria:**
- Users can create households and invite members
- Permission system controls data access appropriately
- Shared finances display combined progress
- Privacy settings work correctly for sensitive data
- Weekly stand-up reminders engage household members
- Goal collaboration features function properly
- Analytics provide household-level insights
- Data isolation is maintained for private information

---

### Phase 12 — Advanced Features & Optimization (4 weeks) [Advanced]

**Objective:** Add premium features and optimize performance.

**Deliverables:**
- **Advanced analytics** and reporting
- **Export functionality** for tax purposes
- **Push notifications** with smart timing
- **Performance optimization** and bug fixes
- **Accessibility enhancements**
- **Internationalization** (multiple currencies)
- **Advanced AI features** (predictive insights)
- **Customer support** tools and chat

**Acceptance Criteria:**
- Advanced analytics provide meaningful insights
- Export formats work with tax software
- Push notifications increase engagement without annoying users
- App performance meets or exceeds benchmarks
- Accessibility features work for all user types
- Multiple currencies display correctly
- AI predictions are accurate and helpful
- Support tools enable efficient customer service

## Testing & Quality Assurance

### Testing Strategy by Phase

**Phases 1-5 (MVP):**
- **Unit tests** for core logic (snowball calculations, XP system)
- **Component tests** for UI components
- **Manual testing** on physical devices
- **User testing** with small beta group

**Phases 6-12 (Post-MVP):**
- **Integration tests** for API endpoints
- **End-to-end tests** with Detox
- **Performance testing** and profiling
- **Security testing** and penetration testing
- **Load testing** for backend services

### Quality Gates

**Each phase must pass:**
- All acceptance criteria completed
- Code review approved
- Tests passing (minimum 80% coverage)
- No critical or high-severity security issues
- Performance meets defined benchmarks
- User feedback positive (for UX features)

## Deployment Strategy

### MVP Deployment
- **Internal beta** (Phase 1-5 completion)
- **Limited public beta** (100-500 users)
- **App Store submission** and approval
- **Public launch** with manual entry features

### Post-MVP Rollout
- **Gradual feature rollout** by phase
- **Feature flags** for controlled releases
- **A/B testing** for major changes
- **Monitoring** and rollback capability

### Infrastructure Scaling
- **Start small** (single server, single database)
- **Scale horizontally** as user base grows
- **Implement caching** for performance
- **Add monitoring** and alerting
- **Plan for disaster recovery**

## Timeline & Resources

### Development Timeline
- **Phase 1-5 (MVP):** 16 weeks (4 months)
- **Phase 6-10 (Core Features):** 17 weeks (4 months)
- **Phase 11-12 (Advanced):** 7 weeks (2 months)
- **Total to Full Product:** 30 weeks (~7 months)

### Resource Requirements
- **1 Full-stack Developer** (primary)
- **1 Part-time UI/UX Designer** (consulting)
- **1 Part-time QA Engineer** (contract)
- **Optional:** DevOps engineer for deployment support

### Risk Mitigation
- **Technical Risk:** Proven technologies (React Native, NestJS)
- **Market Risk:** Early MVP validation with manual entry
- **Integration Risk:** Plaid integration saved for final phase
- **Scope Risk:** Clear MVP boundaries and feature prioritization

---

## Success Metrics

### MVP Success Criteria
- **User Registration:** 1,000+ users in first month
- **Engagement:** 50% weekly active user rate
- **Debt Entry:** Average 3+ debts per user
- **Retention:** 40% retention after 30 days

### Full Product Success Criteria
- **Paid Conversion:** 15% free-to-paid conversion
- **Monthly Revenue:** $10,000+ MRR within 6 months
- **Bank Linking:** 60% of users link at least one account
- **User Satisfaction:** 4.5+ star app store rating

---
*See: [Product Overview](01_product_overview.md) → [Architecture & Stack](02_architecture_and_stack.md) → [Data Model](03_data_model.md)*