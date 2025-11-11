# 04) API Endpoints (REST)

**LLM SUMMARY:**
- NestJS backend with JWT authentication on all endpoints
- Row-Level Security enforced via user_id from JWT claims
- Rate limiting per user (Free: 10 AI req/day, Pro: 100 AI req/day)
- RESTful design with consistent response format and error handling
- All external API integrations proxied through backend
- Comprehensive CRUD operations for debts, expenses, goals, and gamification

## Authentication & Authorization

### Auth Endpoints
- `POST /auth/register` - Email + password or OAuth (Google/Apple)
  - Request: `{ email, password, consent_version }`
  - Response: `{ user, tokens: { access, refresh }, entitlement }`

- `POST /auth/login` - Returns access + refresh JWT tokens
  - Request: `{ email, password }`
  - Response: `{ user, tokens: { access, refresh }, entitlement }`

- `POST /auth/refresh` - Rotate refresh token for security
  - Request: `{ refresh_token }`
  - Response: `{ tokens: { access, refresh } }`

- `POST /auth/logout` - Invalidate refresh token
  - Request: `{ refresh_token }`
  - Response: `{ success: true }`

- `POST /auth/forgot-password` - Initiate password reset flow
- `POST /auth/reset-password` - Complete password reset
- `POST /auth/verify-email` - Email verification

**Security Notes:**
- Access tokens: 15 minute TTL
- Refresh tokens: 30 day TTL with rotation
- All tokens signed with RS256 keys
- Rate limiting: 5 requests/minute for auth endpoints

## User & Profile Management

### User & Household
- `GET /me` - Current user + entitlement + household info
  - Response: `{ user, entitlement, household, permissions }`

- `PATCH /me/settings` - Update user settings and preferences
  - Request: `{ settings: { theme, notifications, ai_persona } }`
  - Response: Updated user object

- `PATCH /me/consents` - Update privacy consents
  - Request: `{ consents: { analytics, marketing, data_sharing } }`

- `POST /household` - Create household (user becomes owner)
  - Request: `{ mode: "combined" | "uncombined" }`
  - Response: Household object with invite code

- `POST /household/invite` - Generate household invite code
  - Request: `{ household_id, permissions }`
  - Response: `{ invite_code, expires_at }`

- `POST /household/join` - Join household via invite code
  - Request: `{ invite_code }`
  - Response: Updated membership info

- `PATCH /household/permissions` - Update member permissions
  - Request: `{ member_id, permissions }`

- `DELETE /household/members/:memberId` - Remove member from household

## Financial Institutions & Accounts

### Institutions (Plaid Integration)
- `POST /institutions/plaid/link-token` - Initialize Plaid Link flow
  - Request: `{ user_id }`
  - Response: `{ link_token }` (proxied through backend)

- `POST /institutions/plaid/exchange` - Exchange public token for access token
  - Request: `{ public_token, institution_name }`
  - Response: Connection object (access_token stored securely)

- `GET /institutions/connections` - List user's bank connections
  - Response: Array of InstitutionConnection objects

- `GET /institutions/connections/:id` - Get connection details and sync status
  - Response: InstitutionConnection with last_sync info

- `POST /institutions/connections/:id/sync` - Trigger manual sync
  - Response: `{ sync_id, status }`

- `DELETE /institutions/connections/:id` - Revoke bank connection
  - Response: `{ success: true }`

### Accounts
- `GET /accounts` - List accounts (user or household-scoped)
  - Query params: `?scope=user|household&status=active|closed`
  - Response: Array of Account objects with balances

- `GET /accounts/:id` - Get account details with recent transactions
  - Response: Account object with last 50 transactions

- `PATCH /accounts/:id` - Update account name or visibility
  - Request: `{ name?, shared_visibility? }`

- `POST /accounts/:id/sync` - Trigger account balance sync
  - Response: Updated account object

## Debt Management

### Debts
- `GET /debts` - List debts (scoped by user/household)
  - Query params: `?status=open|closed|all&sort=payoff_order|balance|apr`
  - Response: Array of Debt objects with current balances

- `POST /debts` - Manual debt entry
  - Request: `{ name, type, principal, apr, min_payment, due_day, account_id? }`
  - Response: Created Debt object

- `GET /debts/:id` - Get debt details with payment history
  - Response: Debt object + recent PaymentEvents

- `PATCH /debts/:id` - Update debt information
  - Request: `{ name?, apr?, min_payment?, due_day? }`

- `DELETE /debts/:id` - Soft delete debt (preserves payment history)
  - Response: `{ success: true }`

- `POST /debts/:id/mark-paid` - Close debt and trigger roll-down
  - Request: `{ payoff_date, final_amount }`
  - Response: Updated Debt object + rollover calculation

### Snowball Plan
- `GET /plan` - Current debt payoff plan
  - Response: SnowballPlan object with debt ordering and schedule

- `POST /plan` - Generate or regenerate plan based on current debts
  - Request: `{ method: "snowball" | "avalanche" | "custom", monthly_payment }`
  - Response: Generated SnowballPlan with month-by-month schedule

- `PATCH /plan` - Update plan method or configuration
  - Request: `{ method?, monthly_payment?, ef_target? }`

- `GET /plan/schedule` - Detailed month-by-month payoff schedule
  - Query params: `?months=12|24|36|all`
  - Response: Array of monthly projections

- `GET /plan/projections` - "What-if" scenarios
  - Request: `{ extra_payment: 100, method: "snowball" }`
  - Response: Projected payoff date and interest savings

## Transactions & Expenses

### Transactions
- `GET /transactions` - List bank transactions
  - Query params: `?account_id=&category=&date_from=&date_to=&confirmed=`
  - Response: Paginated array of Transaction objects

- `GET /transactions/:id` - Get transaction details
  - Response: Transaction object with metadata

- `PATCH /transactions/:id` - Confirm or edit transaction category
  - Request: `{ category?, subcategory?, confirmed?, notes? }`

- `POST /transactions/bulk-confirm` - Batch confirm transaction categories
  - Request: `{ transaction_ids: [], default_category? }`
  - Response: `{ updated_count, failed_ids }`

### Expense Logging (AI-Powered)
- `POST /expenses` - Log expense via text/voice
  - Request: `{ input: "Spent $8 on lunch", input_method: "text" | "voice" }`
  - Response: Parsed ExpenseLog object with categorization

- `GET /expenses` - List manually logged expenses
  - Query params: `?date_from=&date_to=&category=&input_method=`
  - Response: Array of ExpenseLog objects

- `PATCH /expenses/:id` - Update expense details
  - Request: `{ amount?, category?, description? }`

- `DELETE /expenses/:id` - Remove expense log
  - Response: `{ success: true }`

- `POST /expenses/receipt` - Upload and process receipt image
  - Request: `multipart/form-data: image, notes?`
  - Response: Processed ExpenseLog with OCR data

### Recurring Expenses
- `GET /recurring` - List recurring expense patterns
  - Response: Array of RecurringTransaction objects

- `POST /recurring` - Create recurring expense pattern
  - Request: `{ name, amount, frequency, day_of_month, category }`

- `PATCH /recurring/:id` - Update recurring pattern
  - Request: `{ name?, amount?, frequency? }`

- `DELETE /recurring/:id` - Remove recurring pattern

## AI Financial Coach

### AI Chat Interface
- `POST /ai/chat` - Send message to AI financial coach
  - Request: `{ message: "Should I pay off my credit card or save?", context? }`
  - Response: `{ reply: "Based on your financial profile...", usage: { tokens, cost } }`

- `GET /ai/history` - Get conversation history
  - Query params: `?limit=50&before=timestamp`
  - Response: Array of chat messages

- `DELETE /ai/history` - Clear conversation history
  - Response: `{ success: true }`

- `POST /ai/feedback` - Provide feedback on AI response
  - Request: `{ message_id, rating: "helpful" | "not_helpful", comment? }`

### AI Insights
- `GET /ai/insights` - Get AI-generated financial insights
  - Response: `{ spending_analysis: [], debt_recommendations: [], opportunities: [] }`

- `POST /ai/analyze-spending` - Trigger spending pattern analysis
  - Response: Detailed analysis with trends and recommendations

## Gamification & Engagement

### Daily Check-in & Streaks
- `GET /daily/status` - Current streak, XP, level, today's tasks
  - Response: `{ streak: { current: 7, longest: 15 }, xp: 1250, level: 3, tasks: [] }`

- `POST /daily/check-in` - Mark daily check-in and increment streak
  - Request: `{ mood: "great" | "okay" | "struggling", note? }`
  - Response: Updated streak information with XP earned

- `GET /daily/quests` - Active quests for today
  - Response: Array of active Quest objects

- `POST /daily/quests/:id/complete` - Mark quest as completed
  - Request: `{ notes?, evidence? }`
  - Response: Updated Quest object + XP earned

### Challenges & Achievements
- `GET /challenges/available` - List available system challenges
  - Response: Array of Challenge objects user can join

- `POST /challenges/:id/join` - Join a system challenge
  - Response: Created UserChallenge object

- `GET /challenges/active` - User's active challenges
  - Response: Array of UserChallenge objects with progress

- `POST /challenges/:id/progress` - Update challenge progress
  - Request: `{ progress, evidence? }`

- `GET /achievements` - List earned achievements and badges
  - Response: Array of Achievement objects with earned dates

### Gamification Profile
- `GET /gamification/profile` - User's gamification stats
  - Response: `{ level, xp, next_level_xp, badges, streaks, total_quests_completed }`

- `GET /gamification/leaderboard` - Household or friends leaderboard
  - Query params: `?scope=household|friends|global&period=week|month|all`
  - Response: Array of leaderboard entries

- `GET /gamification/nudges` - Contextual motivational nudges
  - Response: Array of personalized nudges based on user behavior

## Goals & Milestones

### Goal Management
- `GET /goals` - List user's financial goals
  - Response: Array of Goal objects with progress

- `POST /goals` - Create new financial goal
  - Request: `{ goal_type, title, target_amount, deadline?, priority }`
  - Response: Created Goal object

- `GET /goals/:id` - Get goal details with progress history
  - Response: Goal object + progress timeline

- `PATCH /goals/:id` - Update goal or progress
  - Request: `{ title?, target_amount?, current_amount?, status? }`

- `DELETE /goals/:id` - Remove goal

- `POST /goals/:id/milestone` - Add milestone achievement
  - Request: `{ milestone_type, amount, notes }`

### Milestones & Progress
- `GET /milestones` - List achieved milestones
  - Query params: `?type=debt_payoff|savings|streak&limit=20`
  - Response: Array of Milestone objects

- `POST /milestones` - Record new milestone achievement
  - Request: `{ milestone_type, title, metadata }`

## Notifications & Communication

### Push Notifications
- `POST /notifications/register-device` - Register device for push notifications
  - Request: `{ device_token, platform: "ios" | "android" }`

- `PATCH /notifications/preferences` - Update notification preferences
  - Request: `{ daily_reminder: true, achievements: true, ai_insights: false }`

- `GET /notifications/history` - Recent notification history
  - Response: Array of notification objects

### In-App Messages
- `GET /messages` - Get in-app messages and announcements
  - Query params: `?type=announcement|tip|achievement&unread_only=true`
  - Response: Array of Message objects

- `PATCH /messages/:id/read` - Mark message as read

## Data Export & Management

### Export & Backup
- `POST /export/data` - Request data export (GDPR compliance)
  - Request: `{ format: "json" | "csv", include: ["debts", "expenses", "transactions"] }`
  - Response: `{ export_id, estimated_completion }`

- `GET /export/status/:exportId` - Check export status
  - Response: `{ status: "processing" | "completed" | "failed", download_url? }`

- `GET /export/download/:exportId` - Download completed export
  - Response: File download (CSV or JSON)

### Account Management
- `POST /account/deactivate` - Deactivate account (soft delete)
  - Request: `{ reason, confirmation: true }`

- `DELETE /account/permanent-delete` - Permanent account deletion (after grace period)
  - Request: `{ confirmation: "DELETE_MY_DATA" }`

## Error Response Format

All API endpoints return consistent error responses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    },
    "request_id": "req_123456789",
    "timestamp": "2025-01-11T10:30:00Z"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid request data
- `UNAUTHORIZED` - Invalid or expired JWT
- `FORBIDDEN` - User lacks permission for resource
- `NOT_FOUND` - Resource does not exist
- `RATE_LIMITED` - Too many requests
- `AI_QUOTA_EXCEEDED` - Daily AI request limit reached
- `EXTERNAL_SERVICE_ERROR` - Third-party API (Plaid, OpenAI) error

### Rate Limiting

All endpoints implement rate limiting:
- **Free Tier:** 10 AI requests/day, 100 other requests/day
- **Pro Tier:** 100 AI requests/day, 1000 other requests/day
- **Burst Limit:** 60 requests/minute across all tiers

Rate limit headers included in responses:
- `X-RateLimit-Limit` - Request limit for current period
- `X-RateLimit-Remaining` - Remaining requests
- `X-RateLimit-Reset` - Unix timestamp when limit resets

---
*See: [Data Model](03_data_model.md) → [AI & Ethics Guardrails](05_ai_and_ethics_guardrails.md) → [Security & Privacy](06_security_and_privacy.md)*