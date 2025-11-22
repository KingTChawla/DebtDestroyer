# 03) Data Model

**LLM SUMMARY:**
- Supabase Postgres with Row-Level Security (RLS) for user data isolation
- Manual-entry only (no Plaid) - all financial data user-provided
- AI-first design: All data accessible via natural language commands
- Core entities: User, Debt, Income, Expenses, Goals, Gamification, AI Interactions
- All queries scoped by `auth.uid()` via Supabase RLS
- 15 core tables for comprehensive financial tracking
- Enum types for consistent data validation

## Core Entities

### User
- `id` (UUID) - Primary key
- `auth_provider_id` (String) - External auth provider identifier
- `email` (String) - User email address
- `country` (String) - User country code
- `currency` (String) - ISO 4217 currency code
- `tier` (Enum: free|pro|lifetime) - Subscription tier
- `settings_json` (JSON) - User preferences and app settings
- `consents_json` (JSON) - Privacy consents and permissions
- `created_at` (DateTime) - Registration timestamp
- `updated_at` (DateTime) - Last update timestamp

### Household
- `id` (UUID) - Primary key
- `owner_user_id` (UUID) - FK to User who created household
- `mode` (Enum: combined|uncombined) - Financial integration approach
- `created_at` (DateTime) - Household creation timestamp
- `updated_at` (DateTime) - Last update timestamp

**Combined Mode:** All debts/expenses are shared
**Uncombined Mode:** Individual finances with optional shared visibility

### HouseholdMember
- `household_id` (UUID) - FK to Household
- `user_id` (UUID) - FK to User
- `role` (Enum: Owner|Member) - Permission level in household
- `permissions_json` (JSON) - Granular access controls
- `created_at` (DateTime) - Membership start date

## Financial Data Model

### Debt (Manual Entry)
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to User
- `owner_scope` (Enum: user|household) - Debt ownership level (future: households)
- `owner_id` (UUID) - FK to User or Household based on scope
- `name` (String) - Debt name/description
- `type` (Enum: credit_card|auto_loan|student_loan|personal_loan|mortgage|medical|other)
- `principal` (Decimal) - Original debt amount
- `current_balance` (Decimal) - Current outstanding balance
- `apr` (Decimal) - Annual percentage rate
- `min_payment` (Decimal) - Minimum required monthly payment
- `due_day` (Integer) - Payment due day (1-31)
- `status` (Enum: open|closed|paid_off) - Debt status
- `payoff_order` (Integer, nullable) - Order in snowball plan
- `interest_start_date` (Date) - When interest starts accruing
- `opened_at` (DateTime) - Debt origination date
- `closed_at` (DateTime, nullable) - Debt payoff date
- `metadata_json` (JSON, nullable) - Additional debt details

### SnowballPlan
- `id` (UUID) - Primary key
- `owner_scope` (Enum: user|household) - Plan ownership level
- `owner_id` (UUID) - FK to User or Household
- `method` (Enum: snowball|avalanche|custom) - Debt payoff strategy
- `start_date` (Date) - Plan start date
- `target_date` (Date, nullable) - Estimated payoff completion date
- `ef_target` (Decimal) - Emergency fund target amount
- `monthly_payment_amount` (Decimal) - Total monthly payment budget
- `config_json` (JSON) - Method-specific configuration
- `status` (Enum: active|paused|completed) - Plan status
- `created_at` (DateTime) - Plan creation date
- `updated_at` (DateTime) - Last plan modification

### PaymentEvent
- `id` (UUID) - Primary key
- `debt_id` (UUID) - FK to Debt
- `date` (Date) - Payment date
- `amount` (Decimal) - Payment amount
- `type` (Enum: minimum|extra|payoff|rollover) - Payment type
- `source` (Enum: scheduled|manual|rounded_up) - Payment origin
- `notes` (String, nullable) - Payment notes/receipt reference
- `created_at` (DateTime) - Payment record creation date

## Transaction & Expense Model

### Transaction
- `id` (UUID) - Primary key
- `account_id` (UUID) - FK to Account
- `date` (Date) - Transaction date
- `amount` (Decimal) - Transaction amount (negative for expenses)
- `merchant` (String) - Merchant/vendor name
- `category` (String) - Transaction category
- `subcategory` (String, nullable) - More detailed categorization
- `description` (String, nullable) - Transaction description
- `confirmed` (Boolean) - Whether user has confirmed categorization
- `pending` (Boolean) - Whether transaction is still pending
- `recurring_id` (UUID, nullable) - FK to RecurringTransaction pattern
- `metadata_json` (JSON, nullable) - Additional transaction data
- `created_at` (DateTime) - Transaction import date

### ExpenseLog
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to User (expense logger)
- `date` (Date) - Expense date
- `amount` (Decimal) - Expense amount
- `category` (String) - Expense category
- `description` (String, nullable) - Expense description
- `input_method` (Enum: voice|text|camera|receipt_scan) - How expense was logged
- `confidence_score` (Float, nullable) - AI categorization confidence
- `is_business` (Boolean) - Whether this is a business expense
- `receipt_url` (String, nullable) - S3 URL for receipt image
- `created_at` (DateTime) - Expense log creation date

### RecurringTransaction
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to User
- `name` (String) - Recurring transaction name
- `amount` (Decimal) - Regular amount
- `frequency` (Enum: daily|weekly|monthly|quarterly|yearly) - How often it occurs
- `day_of_month` (Integer, nullable) - For monthly transactions
- `day_of_week` (Integer, nullable) - For weekly transactions
- `category` (String) - Default category
- `start_date` (Date) - When pattern started
- `end_date` (Date, nullable) - When pattern ends (if known)
- `active` (Boolean) - Whether pattern is currently active
- `next_occurrence` (Date, nullable) - Calculated next date
- `created_at` (DateTime) - Pattern creation date

## Gamification & Engagement Model

### Streak
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to User
- `current_streak` (Integer) - Current consecutive days
- `longest_streak` (Integer) - Best historical streak
- `last_check_in` (Date) - Most recent check-in date
- `streak_type` (Enum: daily_login|expense_logging|debt_payment) - What the streak tracks
- `created_at` (DateTime) - Streak creation date
- `updated_at` (DateTime) - Last streak update

### Quest
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to User
- `quest_type` (Enum: expense_tracking|no_spend|savings_challenge|debt_extra)
- `title` (String) - Quest display name
- `description` (String) - Quest description
- `progress` (Integer) - Current progress toward goal
- `target` (Integer) - Target value to complete quest
- `unit` (String) - Progress unit (e.g., "days", "dollars")
- `status` (Enum: active|completed|failed|expired)
- `reward_xp` (Integer) - XP granted on completion
- `deadline` (DateTime, nullable) - Quest completion deadline
- `completed_at` (DateTime, nullable) - Completion timestamp
- `metadata_json` (JSON, nullable) - Quest-specific data

### Challenge (System Challenges)
- `id` (UUID) - Primary key
- `challenge_type` (Enum: daily|weekly|monthly|seasonal)
- `name` (String) - Challenge display name
- `description` (String) - Challenge description
- `rules_json` (JSON) - Challenge rules and conditions
- `xp_reward` (Integer) - Base XP reward
- `duration_days` (Integer) - Challenge duration
- `icon` (String) - Challenge icon identifier
- `difficulty` (Enum: easy|medium|hard) - Challenge difficulty
- `active` (Boolean) - Whether challenge is currently available
- `start_date` (Date, nullable) - When challenge becomes active
- `end_date` (Date, nullable) - When challenge expires
- `created_at` (DateTime) - Challenge creation date

### UserChallenge
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to User
- `challenge_id` (UUID) - FK to Challenge
- `progress` (Integer) - User's current progress
- `target` (Integer) - Goal for this specific user instance
- `status` (Enum: active|completed|failed|expired)
- `started_at` (DateTime) - When user started challenge
- `completed_at` (DateTime, nullable) - Completion timestamp
- `metadata_json` (JSON, nullable) - User-specific challenge data

## Goals & Milestones

### Goal
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to User
- `goal_type` (Enum: emergency_fund|debt_payoff|savings|expense_reduction|custom)
- `title` (String) - Goal display name
- `description` (String, nullable) - Goal description
- `target_amount` (Decimal) - Target amount to achieve
- `current_amount` (Decimal) - Current progress toward target
- `deadline` (Date, nullable) - Goal completion deadline
- `status` (Enum: active|completed|abandoned|paused)
- `priority` (Enum: high|medium|low) - Goal importance
- `auto_track` (Boolean) - Whether goal progress is auto-calculated
- `created_at` (DateTime) - Goal creation date
- `completed_at` (DateTime, nullable) - Completion timestamp

### Milestone
- `id` (UUID) - Primary key
- `owner_scope` (Enum: user|household) - Milestone ownership level
- `owner_id` (UUID) - FK to User or Household
- `milestone_type` (Enum: debt_payoff|savings_goal|streak_achievement|level_up)
- `title` (String) - Milestone title
- `description` (String, nullable) - Milestone description
- `date` (Date) - When milestone was achieved
- `metadata_json` (JSON, nullable) - Milestone-specific data
- `created_at` (DateTime) - Milestone record creation date

## User Profile & Preferences

### UserFinancialProfile
- `user_id` (UUID) - Primary key, FK to User
- `monthly_income` (Decimal) - User's monthly income
- `monthly_expenses` (Decimal) - User's monthly expenses
- `subscriptions_json` (JSON) - Recurring subscription data
- `savings_balance` (Decimal) - Total savings across all accounts
- `emergency_fund_target` (Decimal) - User's emergency fund goal
- `ai_analysis_json` (JSON) - AI-generated insights and recommendations
- `risk_tolerance` (Enum: conservative|moderate|aggressive) - Financial risk profile
- `financial_knowledge_level` (Enum: beginner|intermediate|advanced) - Self-assessed knowledge
- `created_at` (DateTime) - Profile creation date
- `updated_at` (DateTime) - Last profile update

### Entitlement
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to User
- `tier` (Enum: free|pro|lifetime) - Subscription tier
- `source` (Enum: direct|shared|trial) - How entitlement was granted
- `expires_at` (DateTime, nullable) - When entitlement expires (if applicable)
- `auto_renew` (Boolean) - Whether subscription auto-renews
- `subscription_id` (String, nullable) - External subscription identifier
- `created_at` (DateTime) - Entitlement grant date
- `updated_at` (DateTime) - Last entitlement update

## Data Isolation & Security

### Row-Level Security (RLS) Policies

All tables implement RLS policies to ensure users can only access their own data:

```sql
-- Example RLS for expenses table
CREATE POLICY user_expense_isolation ON expenses
  FOR SELECT
  USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY user_expense_insert ON expenses
  FOR INSERT
  WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);
```

### Encryption Requirements

- **Field-Level Encryption:** Sensitive fields encrypted with AWS KMS
- **Transport Encryption:** TLS 1.3 for all database connections
- **Backup Encryption:** Encrypted database backups with customer-managed keys

**Encrypted Fields:**
- All financial amounts (debts, income, expenses)
- Account balances
- Any PII fields

---

## AI Capabilities & Data Access

### AI-Accessible Data

The AI Financial Coach has read/write access to user data for natural language commands:

**Data Modification:**
- Create/update/delete expense_logs ("Add $50 grocery expense")
- Create/update debts ("Add a $3,000 credit card at 19% APR")
- Create payment_events ("I paid $200 on my Chase card")
- Update income ("My income is now $5,000/month")
- Create/update goals ("Create a goal to save $10,000")
- Manage subscriptions ("Cancel my gym membership")

**Data Retrieval:**
- Sum total debt, calculate debt-free date
- Query expense logs by category/date range
- Calculate budget (income - expenses)
- Track goal progress percentages
- Retrieve streak counts and XP totals

**AI-Generated Insights:**
- Pattern detection ("You spent 50% more on dining this month")
- Recommendations ("Put $100 toward your smallest debt")
- Motivation ("You've paid off 15% of total debt!")
- Warnings ("Spending is 20% over budget")

### AI Privacy & Security

- **No PII to OpenAI:** User data sanitized before API calls
- **Rate Limiting:** Free (10/day), Pro (100/day)
- **Scope Limitation:** Debt elimination only, no investment advice
- **RLS Enforcement:** AI queries respect Row-Level Security policies

---
*See: [Architecture & Stack](02_architecture_and_stack.md) → [AI & Ethics](05_ai_and_ethics_guardrails.md) → [Security & Privacy](06_security_and_privacy.md)*