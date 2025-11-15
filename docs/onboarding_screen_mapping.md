# Onboarding Flow: Screen-by-Screen Component Mapping

**Purpose:** Detailed mapping of all 43 screens to specific screen components and UI elements

---

## Screen Component Architecture Summary

We will build **8 smart screen components** that handle 43 different configurations:

| Screen Component | Handles | Screen Count |
|-----------------|---------|--------------|
| `OnboardingWelcomeScreen` | Welcome & Motivation | 2 screens |
| `OnboardingQuestionScreen` | Questions with tiles/sliders | 18 screens |
| `OnboardingFormScreen` | Form-based data entry | 8 screens |
| `OnboardingDebtFlowScreen` | Multi-step debt entry wizard | 9 screens |
| `OnboardingResultsScreen` | Calculations & insights | 2 screens |
| `OnboardingPaywallScreen` | Subscription & upsell | 2 screens |
| `OnboardingCompletionScreen` | Account, plan, activation | 4 screens |
| **TOTAL** | | **43 screens** |

---

## Phase 1: Welcome & Motivation (2 screens)

### Screen Component: `OnboardingWelcomeScreen`

#### Screen 1 — Welcome
**UI Components:**
- Full-screen layout with centered content
- App logo
- Title (Large Title typography)
- Subtitle (Body typography)
- Primary Button ("Get Started")

**Data:**
- None (informational only)

**Navigation:**
- Next → Screen 2

---

#### Screen 2 — Motivational Mission
**UI Components:**
- Full-screen layout
- Large Title: "Freedom. Clarity. Peace of mind."
- Subtitle: "Your debt-free journey starts today."
- Animated gradient background (optional)
- Primary Button ("Next")

**Data:**
- None (informational only)

**Navigation:**
- Next → Screen 3

---

## Phase 2: User Profiling & Goal Setting (8 screens)

### Screen Component: `OnboardingQuestionScreen`

#### Screen 3 — Primary Financial Goal
**UI Components:**
- `OnboardingProgress` (3 of 43)
- Question headline
- `TileSelector` (single-select, 7 options, auto-advance)

**Options:**
1. Pay off all debt (CheckCircleIcon)
2. Build my first emergency fund (ShieldCheckIcon)
3. Stop overspending (XCircleIcon)
4. Improve credit score (ChartBarIcon)
5. Reduce financial stress (HeartIcon)
6. Learn better money habits (AcademicCapIcon)
7. Get on a long-term plan (CalendarIcon)

**Data Stored:**
- `onboardingStore.primaryGoal`

**Navigation:**
- Auto-advance on selection → Screen 4

---

#### Screen 4 — Money Management Experience Level
**UI Components:**
- `OnboardingProgress` (4 of 43)
- Question headline
- `TileSelector` (single-select, 3 options, large tiles, auto-advance)

**Options:**
1. Beginner (icon: seedling emoji or SparklesIcon)
   - Description: "Just starting to learn about budgets and debt"
2. Intermediate (icon: chart)
   - Description: "I have some knowledge but need structure"
3. Experienced (icon: trophy)
   - Description: "I understand finance but need accountability"

**Data Stored:**
- `onboardingStore.experienceLevel`

**Navigation:**
- Auto-advance → Screen 5

---

#### Screen 5 — Monthly Money Check-Ins
**UI Components:**
- `OnboardingProgress` (5 of 43)
- Question headline
- `TileSelector` (single-select, 4 options, auto-advance)

**Options:**
1. Rarely (ClockIcon)
2. Sometimes (CalendarIcon)
3. Weekly (CalendarDaysIcon)
4. Daily (CheckIcon)

**Data Stored:**
- `onboardingStore.trackingFrequency`

**Navigation:**
- Auto-advance → Screen 6

---

#### Screen 6 — Debt Management Confidence
**UI Components:**
- `OnboardingProgress` (6 of 43)
- Question headline
- `TileSelector` (single-select, 3 emotion tiles, auto-advance)

**Options:**
1. Low (FaceFrownIcon, Velvet Rose tint)
2. Medium (FaceSmileIcon, neutral)
3. High (FaceGrinIcon, Emerald Shadow tint)

**Data Stored:**
- `onboardingStore.debtConfidence`

**Navigation:**
- Auto-advance → Screen 7

---

#### Screen 7 — Basic Profile Info

### Screen Component: `OnboardingFormScreen`

**UI Components:**
- `OnboardingProgress` (7 of 43)
- Title
- 3 form fields (stacked):
  1. Age (number input, optional)
  2. State/Country (text input or picker)
  3. Household size (picker: 1, 2, 3, 4, 5+)
- "Skip for now" link
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.demographics.age`
- `onboardingStore.demographics.location`
- `onboardingStore.demographics.householdSize`

**Navigation:**
- Continue → Screen 8

---

#### Screen 8 — Financial Identity Tile Selector

### Screen Component: `OnboardingQuestionScreen`

**UI Components:**
- `OnboardingProgress` (8 of 43)
- Question headline
- `TileSelector` (single-select, 5 large tiles, auto-advance)

**Options:**
1. "Drowning in debt" (AnchorIcon or ExclamationTriangleIcon)
2. "Getting by, but tight" (ScaleIcon)
3. "Stable, but want better habits" (MinusIcon)
4. "Doing okay, want a plan" (MapIcon)
5. "Doing well, want optimization" (ArrowTrendingUpIcon)

**Data Stored:**
- `onboardingStore.financialIdentity`

**Navigation:**
- Auto-advance → Screen 9

---

#### Screen 9 — Spending Behavior Awareness

### Screen Component: `OnboardingQuestionScreen`

**UI Components:**
- `OnboardingProgress` (9 of 43)
- Question headline
- `TileSelector` (single-select, 4 tiles, auto-advance)

**Options:**
1. Overspender (ShoppingBagIcon)
2. Impulse spender (BoltIcon)
3. Mostly controlled (CheckCircleIcon)
4. Very disciplined (ShieldCheckIcon)

**Data Stored:**
- `onboardingStore.spendingBehavior`

**Navigation:**
- Auto-advance → Screen 10

---

#### Screen 10 — Expense Confidence Slider

### Screen Component: `OnboardingQuestionScreen`

**UI Components:**
- `OnboardingProgress` (10 of 43)
- Question headline
- `SliderInput` (1-10 scale)
  - Min label: "No idea"
  - Max label: "I track every penny"
  - Shows live value above slider
  - Haptic feedback
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.expenseAwareness` (1-10)

**Navigation:**
- Continue → Screen 11

---

## Phase 3: Financial Data Collection (6 screens)

#### Screen 11 — Monthly Income Input

### Screen Component: `OnboardingFormScreen`

**UI Components:**
- `OnboardingProgress` (11 of 43)
- Title: "Let's look at your income"
- `CurrencyInput` (Primary income) - required
  - Helper text: "After-tax take-home pay"
- `CurrencyInput` (Secondary income) - optional
  - Helper text: "Side gigs, freelance, etc."
- Picker (Pay frequency) - required
  - Options: Weekly, Bi-weekly, Semi-monthly, Monthly
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.income.primary`
- `onboardingStore.income.secondary`
- `onboardingStore.income.frequency`

**Validation:**
- Primary income must be > 0

**Navigation:**
- Continue → Screen 12

---

#### Screen 12 — Income Stability

### Screen Component: `OnboardingQuestionScreen`

**UI Components:**
- `OnboardingProgress` (12 of 43)
- Question headline
- `TileSelector` (single-select, 3 tiles with icons, auto-advance)

**Options:**
1. Stable (solid line icon)
   - "Same amount each month"
2. Somewhat unstable (wavy line icon)
   - "Varies but predictable"
3. Very unstable (erratic line icon)
   - "Commission, seasonal, or irregular"

**Data Stored:**
- `onboardingStore.income.stability`

**Navigation:**
- Auto-advance → Screen 13

---

#### Screen 13 — Essential Expenses Input

### Screen Component: `OnboardingFormScreen`

**UI Components:**
- `OnboardingProgress` (13 of 43)
- Title: "Monthly essential expenses"
- Description: "These are your must-pay bills"
- Collapsible sections (all start collapsed):
  1. Rent/Mortgage (`CurrencyInput`)
  2. Utilities (`CurrencyInput` - helper: "Electric, water, gas, internet")
  3. Groceries (`CurrencyInput`)
  4. Transportation (`CurrencyInput` - helper: "Gas, transit, car payment")
  5. Insurance (`CurrencyInput` - helper: "Health, auto, renters/home")
- Running total display at bottom
- "Skip for now" link
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.expenses.essential` (object with categories)

**Navigation:**
- Continue → Screen 14

---

#### Screen 14 — Lifestyle Expenses Input

### Screen Component: `OnboardingFormScreen`

**UI Components:**
- `OnboardingProgress` (14 of 43)
- Title: "Lifestyle spending"
- Description: "Average monthly estimate is fine"
- Form fields:
  1. Dining out / food delivery (`CurrencyInput`)
  2. Entertainment (`CurrencyInput` - helper: "Streaming, events, hobbies")
  3. Subscriptions (`CurrencyInput`)
  4. Shopping (`CurrencyInput` - helper: "Clothes, household items")
- Running total display
- "Skip for now" link
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.expenses.lifestyle`

**Navigation:**
- Continue → Screen 15

---

#### Screen 15 — Savings & Cash Reserves

### Screen Component: `OnboardingFormScreen`

**UI Components:**
- `OnboardingProgress` (15 of 43)
- Title: "Your current cash position"
- Form fields:
  1. Current savings (`CurrencyInput`)
  2. Checking balance (`CurrencyInput`)
  3. Emergency fund question:
     - Radio buttons: "Yes (amount: ___)", "No", "I'm building one (current: ___)"
     - Conditional `CurrencyInput` based on selection
- Supportive copy: "No judgment — we'll help you build one"
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.savings.current`
- `onboardingStore.savings.checking`
- `onboardingStore.savings.emergencyFund.status`
- `onboardingStore.savings.emergencyFund.amount`

**Navigation:**
- Continue → Screen 16

---

#### Screen 16 — Subscription Discovery Checklist

### Screen Component: `OnboardingFormScreen`

**UI Components:**
- `OnboardingProgress` (16 of 43)
- Title: "Which of these do you pay for?"
- `ChecklistSelector` (multi-select, show cost)
  - Options (12-15 common subscriptions):
    - Netflix ($15.99/mo)
    - Hulu ($14.99/mo)
    - Disney+ ($10.99/mo)
    - Spotify ($10.99/mo)
    - Apple Music ($10.99/mo)
    - Amazon Prime ($14.99/mo)
    - Gym membership ($50/mo)
    - iCloud Storage ($2.99/mo)
    - Adobe Creative Cloud ($54.99/mo)
    - Microsoft 365 ($6.99/mo)
    - Meal kits ($80/mo)
    - News/magazines ($10/mo)
- "Add custom subscription" button
- Running total at bottom
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.subscriptions[]`

**Navigation:**
- Continue → Screen 17

---

## Phase 4: Debt Entry Flow (9 screens)

### Screen Component: `OnboardingDebtFlowScreen`

#### Screen 17 — Debt Entry Overview
**Phase:** `intro`

**UI Components:**
- `OnboardingProgress` (17 of 43)
- Headline: "Let's map out your debts"
- Body text:
  - "You'll enter each debt one at a time."
  - "We'll build your Snowball Plan automatically."
  - "The more detail you provide, the better your plan."
- Illustration (stack of debts → organized list)
- Progress: "0 debts entered"
- Primary Button ("Start Entering Debts")
- "I don't have any debts" link (skip to Screen 26)

**Data:**
- None (informational)

**Navigation:**
- Start → Screen 18 (debt entry loop)
- Skip → Screen 26

---

#### Screens 18-24 — Individual Debt Entry (Repeating Loop)
**Phase:** `entry` (7-step wizard per debt)

**Step 1 (Screen 18): Debt Type**
- `TileSelector` (single-select, 7 options)
  - Credit Card (CreditCardIcon)
  - Personal Loan (HandshakeIcon)
  - Student Loan (AcademicCapIcon)
  - Auto Loan (TruckIcon)
  - Medical Debt (HeartIcon)
  - Payday Loan (CalendarIcon)
  - Other (FolderIcon)

**Step 2 (Screen 19): Creditor Name**
- Text input with autocomplete
- Label: "Who do you owe?"
- Placeholder: "e.g., Chase, Capital One, Dr. Smith"
- Optional field

**Step 3 (Screen 20): Current Balance**
- `CurrencyInput` (required)
- Label: "What's the current balance?"
- Helper text: "Check your latest statement"
- "Round to nearest $100" toggle

**Step 4 (Screen 21): Minimum Payment**
- `CurrencyInput` (required)
- Label: "What's the minimum monthly payment?"
- Helper text: "Found on your statement"
- Auto-suggest based on balance

**Step 5 (Screen 22): Interest Rate (APR)**
- Percentage input (optional)
- Label: "What's the interest rate (APR)?"
- Helper text: "Usually shown on statements"
- "I don't know" option

**Step 6 (Screen 23): Due Date**
- Date picker (day of month 1-31)
- Label: "When is the payment due?"
- Optional field

**Step 7 (Screen 24): Auto-pay Status**
- `TileSelector` (single-select, 4 options)
  - Yes, minimum payment
  - Yes, fixed amount
  - Yes, full balance (credit cards)
  - No

**Data Stored (per debt):**
- `onboardingStore.addDebt({type, name, currentBalance, minPayment, apr, dueDay, autopay})`

**Navigation:**
- Each step auto-advances to next
- After Step 7 → Screen 25

---

#### Screen 25 — Debt Summary Review
**Phase:** `summary`

**UI Components:**
- `OnboardingProgress` (25 of 43)
- `DebtCard` (shows just-entered debt)
  - Creditor name
  - Balance
  - Minimum payment
  - Interest rate
- Checkmark animation on load
- Progress: "X debts entered"
- Edit button (returns to Screen 18 for current debt)
- Primary Button ("Add Another Debt") - prominent
- Secondary Button ("I'm Done Adding Debts") - smaller

**Data:**
- Current debt saved to array

**Navigation:**
- Add Another → Screen 18 (new debt loop)
- Done → Screen 26

---

#### Screen 26 — Debt Count Confirmation
**Phase:** `confirmation`

**UI Components:**
- `OnboardingProgress` (26 of 43)
- Summary card: "You've entered X debts totaling $X,XXX"
- Question: "Do you have any other debts to add?"
- Optional: Reminder list of debt types
- Two buttons:
  - "Yes, add more" → Screen 18
  - "No, I've entered everything" → Screen 27

**Data:**
- Confirmation of completeness

**Navigation:**
- Yes → Screen 18
- No → Screen 27

---

## Phase 5: Emotional & Behavioral Assessment (4 screens)

### Screen Component: `OnboardingQuestionScreen`

#### Screen 27 — Debt Burden Slider

**UI Components:**
- `OnboardingProgress` (27 of 43)
- Title: "How overwhelming does your debt feel?"
- `SliderInput` (1-10 scale)
  - Min label: "Manageable, just needs a plan"
  - Max label: "Crushing, keeps me up at night"
  - Emoji feedback changes with value
  - Haptic feedback
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.debtBurden` (1-10)

**Navigation:**
- Continue → Screen 28

---

#### Screen 28 — Emotional Impact Assessment

**UI Components:**
- `OnboardingProgress` (28 of 43)
- Question: "How much stress is your debt causing you?"
- `TileSelector` (single-select, 4 tiles, auto-advance)

**Options:**
1. Low (calm face icon)
   - "It's there, but I'm okay"
2. Medium (slightly worried icon)
   - "It bothers me regularly"
3. High (stressed face icon)
   - "It's a constant worry"
4. Extreme (very stressed icon)
   - "It's affecting my health/relationships"

**Data Stored:**
- `onboardingStore.emotionalImpact`

**Navigation:**
- Auto-advance → Screen 29

---

#### Screen 29 — Financial Habits Assessment

**UI Components:**
- `OnboardingProgress` (29 of 43)
- Question: "Which of these apply to you? (Select all that apply)"
- `ChecklistSelector` (multi-select)

**Options:**
- Impulse spending
- No budget or spending plan
- Not tracking expenses
- Missed payments in the past
- No savings or emergency fund
- Living paycheck to paycheck
- Actually, I have good habits (exclusive option)

**Data Stored:**
- `onboardingStore.financialHabits[]`

**Reassurance:** "These are just to help personalize your plan"

**Navigation:**
- Continue → Screen 30

---

## Phase 6: Personalization (5 screens)

#### Screen 30 — Emergency Fund Goal

### Screen Component: `OnboardingQuestionScreen`

**UI Components:**
- `OnboardingProgress` (30 of 43)
- Question: "Do you have $1,000 saved for emergencies?"
- `TileSelector` (single-select, 4 options, auto-advance)

**Options:**
1. Yes, I have $1,000+ saved
2. Not yet, but I'm working on it
3. No, and I want to save this first
4. Skip this for now

**Data Stored:**
- `onboardingStore.emergencyFundPriority`

**Navigation:**
- Option 3 → Screen 31
- Others → Screen 32

---

#### Screen 31 — Emergency Fund Target Input

### Screen Component: `OnboardingFormScreen`

**Conditional:** Only if Screen 30 = "want to save this first"

**UI Components:**
- `OnboardingProgress` (31 of 43)
- Title: "Let's set your emergency fund goal"
- `CurrencyInput` (default: $1,000)
- Slider for quick amounts: $500 / $1,000 / $1,500 / $2,000
- Helper text: "Dave Ramsey recommends starting with $1,000"
- Motivational copy: "Once you hit this, we'll unleash the debt snowball"
- Primary Button ("Continue")

**Data Stored:**
- `onboardingStore.emergencyFundGoal`

**Navigation:**
- Continue → Screen 32

---

#### Screen 32 — AI Persona Preference

### Screen Component: `OnboardingQuestionScreen`

**UI Components:**
- `OnboardingProgress` (32 of 43)
- Question: "How do you want your AI money coach to talk to you?"
- `TileSelector` (single-select, 4 large tiles with examples, auto-advance)

**Options:**
1. Calm & Supportive (HeartIcon)
   - Example: "You've got this. Let's take it one step at a time."
   - Best for: High stress/anxiety users
2. Direct & Disciplined (ShieldIcon)
   - Example: "Time to face the numbers. No more excuses."
   - Best for: Accountability seekers
3. High-Energy Motivation (BoltIcon)
   - Example: "YES! You're crushing it! Let's GO!"
   - Best for: Celebration-driven users
4. Humor & Lighthearted (FaceSmileIcon)
   - Example: "Debt? More like debt-be-gone, am I right?"
   - Best for: Levity seekers

**Each tile tappable to preview longer sample**

**Data Stored:**
- `onboardingStore.aiPersona`

**Navigation:**
- Auto-advance → Screen 33

---

#### Screen 33 — Plan Aggressiveness

### Screen Component: `OnboardingQuestionScreen`

**UI Components:**
- `OnboardingProgress` (33 of 43)
- Question: "How intense do you want your payoff plan to be?"
- `TileSelector` (single-select, 3 large tiles, auto-advance)

**Options:**
1. Slow & Steady (turtle icon)
   - "Comfortable pace, sustainable lifestyle"
   - Target: Min + small extra ($50-100/mo)
   - For: Lower income, high essentials
2. Standard (gauge icon)
   - "Balanced approach, noticeable progress"
   - Target: Min + moderate extra ($150-300/mo)
   - For: Moderate flexibility
3. Gazelle Intensity (rocket icon)
   - "All-in, maximum speed, Dave Ramsey style"
   - Target: Min + aggressive extra ($400+/mo)
   - For: Urgent payoff, high income

**Data Stored:**
- `onboardingStore.planIntensity`

**Navigation:**
- Auto-advance → Screen 34

---

#### Screen 34 — Behavior Change Challenge Selection

### Screen Component: `OnboardingQuestionScreen`

**UI Components:**
- `OnboardingProgress` (34 of 43)
- Question: "Choose 1-3 challenges to start with"
- `ChecklistSelector` (multi-select, 1-3 required, show badge)

**Options (12 challenges grouped):**

**Quick Wins (3-7 days):**
- No eating out for 3 days (Easy)
- Skip coffee shop for a week (Easy)
- No Amazon purchases for 5 days (Medium)
- No impulse buys (24-hour rule) (Medium)

**Tracking & Awareness (7-14 days):**
- Track every expense for 7 days (Medium)
- Review all subscriptions (Easy)
- Find 3 subscriptions to cancel (Hard)

**Planning & Setup (One-time):**
- Create your first budget (Medium)
- Enable autopay for all debts (Easy)
- Set up debt payment alerts (Easy)

**Data Stored:**
- `onboardingStore.selectedChallenges[]`

**Min/max enforcement:** 1-3 selections

**Navigation:**
- Continue → Screen 35

---

## Phase 7: Results & Value Demonstration (2 screens)

### Screen Component: `OnboardingResultsScreen`

#### Screen 35 — Snowball Power Score (Generated)

**Type:** `snowball-score`

**UI Components:**
- `OnboardingProgress` (35 of 43)
- Headline: "Your Debt Freedom Blueprint"
- Confetti animation on load
- 3 key metrics (large, bold):
  1. "You'll be debt-free **28% faster** using the Snowball Method"
     - vs. minimum-payment-only trajectory
  2. "Users like you saved **$3,140** in interest on average"
     - Based on cohort and debt profile
  3. "Projected Debt-Free Date: **May 2028**"
     - Calendar visualization with countdown
- Graph: Current path (red line) vs. Snowball path (green line)
- Debt stack visualization (tallest to shortest by snowball order)
- Primary Button ("See Your Full Plan")

**Calculations:**
- Total debt
- Interest rates
- Income - expenses = available snowball payment
- Plan intensity selection
- Backend-style calculation (frontend for MVP)

**Data:**
- Display only (used in AI coaching later)

**Navigation:**
- Continue → Screen 36

---

#### Screen 36 — Personalized Insights Summary

**Type:** `insights`

**UI Components:**
- `OnboardingProgress` (36 of 43)
- Title: "Your Personalized Insights"
- 3 collapsible sections (all start open):

**Section 1: Debt Strategy Highlights**
- Highest-interest debt: [Creditor] at [X]% APR
- Quickest win: [Smallest debt] — payoff in [X] months
- Biggest savings opportunity: Refinancing [debt] could save $[X]/mo

**Section 2: Spending Analysis**
- Potential leak: $[X]/mo on subscriptions
- Quick win: Canceling [subscription] saves $[X]/year
- Budget red flag: [Category] is [X]% above typical

**Section 3: Recommended Focus**
- Start here: [Emergency fund OR Smallest debt]
- First 30 days: [Specific actionable goal]
- Challenge to try: [Personalized from Screen 34]

**Each insight:** icon + color coding

**Mix:** Urgency (red flags) + optimism (opportunities)

**Primary Button ("Get Your Full Plan")**

**Data:**
- Generated insights (AI-like, rules-based for MVP)

**Navigation:**
- Continue → Screen 37

---

## Phase 8: Monetization & Account Creation (4 screens)

### Screen Component: `OnboardingPaywallScreen`

#### Screen 37 — Subscription Paywall (Primary)

**Type:** `primary`

**UI Components:**
- Full-screen modal
- Header: "Unlock Your Debt Destroyer Plan"
- Subheadline: "Join [X,XXX] people crushing their debt"
- Benefits list (6-8):
  - ✅ Unlimited AI financial coaching
  - ✅ Personalized debt payoff plan
  - ✅ Daily accountability & check-ins
  - ✅ Automatic debt snowball calculator
  - ✅ Spending insights & budget tracking
  - ✅ Challenges, streaks, & rewards
  - ✅ Progress tracking & projections
  - ✅ [Pro only] Bank account syncing (Phase 10)

**Pricing Cards (3):**
1. Monthly - $9.99/month
   - Billed monthly
   - Cancel anytime
2. Annual - $79.99/year ⭐ BEST VALUE
   - Save 33% ($40/year savings)
   - Badge highlight
3. Lifetime - $199 one-time 🏆 MOST POPULAR
   - Pay once, own forever
   - All future features

**Social Proof:**
- "4.8★ rating from 2,341 users"
- 1-2 testimonials with photos

**CTA:**
- Primary: "Start Free Trial" (7 days)
- Secondary: "See Free Version" (link)

**Close button (X)** → Triggers Screen 38

**Data Stored:**
- `onboardingStore.selectedPlan`
- User interaction tracking

**Navigation:**
- Select plan → Screen 39
- Close → Screen 38

---

#### Screen 38 — One-Time Offer Screen

**Type:** `upsell`

**Conditional:** Only if user closed Screen 37 or selected monthly

**UI Components:**
- Header: "⏰ WAIT! Special Launch Offer"
- Countdown timer: 10:00 → 0:00 (cosmetic)
- Offer: "Get 25% OFF Annual Plan — Just $59.99/year"
- Original price strikethrough: ~~$79.99~~
- Savings badge: "Save $60 vs. monthly!"
- Urgency: "Only available to new users during onboarding"
- Primary Button ("Claim Discount Now") - large, urgent
- Secondary Link ("No thanks, continue") - small, gray

**Data Stored:**
- `onboardingStore.sawUpsell = true`
- `onboardingStore.acceptedUpsell` (if claimed)

**Navigation:**
- Claim → Screen 39 (with discounted annual)
- No thanks → Screen 39 (with free or original selection)

---

## Phase 9: Account Creation & Loading (2 screens)

### Screen Component: `OnboardingCompletionScreen`

#### Screen 39 — Login / Create Account

**Phase:** `account`

**UI Components:**
- `OnboardingProgress` (39 of 43)
- Title: "Create Your Account"
- Social login (preferred):
  - "Continue with Google" button (Google logo)
  - "Continue with Apple" button (Apple logo)
- Divider: "or"
- Email signup:
  - Email input field
  - Password input field (8+ chars, 1 uppercase, 1 number)
  - Password requirements tooltip
  - "Create Account" button
- Bottom links:
  - "Already have an account? Log in"
  - Terms of Service
  - Privacy Policy

**Data Stored:**
- `onboardingStore.accountCreated = true`
- `onboardingStore.email`
- `onboardingStore.authMethod`

**Backend:**
- JWT token generation
- Save all onboarding data to user profile
- Email verification flow (if email)

**Navigation:**
- Success → Screen 40

---

#### Screen 40 — Creating Account Loading Screen

**Phase:** `loading`

**UI Components:**
- Animated spinner or progress indicator
- Title: "Building your personalized financial plan…"
- Rotating subtext (2-second intervals):
  - "Analyzing your debt profile…"
  - "Calculating your snowball order…"
  - "Optimizing your payoff timeline…"
  - "Preparing your dashboard…"

**Duration:** 3-5 seconds (artificial delay for effect)

**Backend processes (actual):**
- Create user account in database
- Save onboarding data to user profile
- Generate snowball order
- Calculate first-month goals
- Prepare dashboard widgets
- Send welcome email
- Initialize gamification (XP=0, Level 1)

**Navigation:**
- Auto-advance → Screen 41

---

## Phase 10: Plan Reveal & Activation (3 screens)

#### Screen 41 — Snowball Plan Reveal

**Phase:** `plan-reveal`

**UI Components:**
- `OnboardingProgress` (41 of 43)
- Header: "Your Personalized Debt Destroyer Plan"
- Confetti animation on entry

**Section 1: Your Debt Order (Snowball Sequence)**
- List of debts, smallest to largest
- Each `DebtCard` shows:
  - Creditor name
  - Current balance
  - Minimum payment
  - Projected payoff month/year
- First debt: "ATTACK THIS FIRST" badge

**Section 2: Monthly Blueprint**
- Total minimum payments: $[X,XXX]
- Snowball payment (extra): $[XXX]
- Total debt payment: $[X,XXX]
- Breakdown chart (visual)

**Section 3: First Target Debt**
- Debt name
- Balance: $[X,XXX]
- Monthly payment: $[XXX]
- Payoff date: [Month Year]
- Progress bar (0%)

**Section 4: Estimated Timeline**
- Debt-free date: [Month Year]
- Total time: [X] months ([Y] years)
- Interest saved: $[X,XXX]
- Calendar visualization with milestones

**CTA:** "Start My Plan" (bottom fixed)

**Option:** "Edit plan" (returns to earlier screens)

**Data:**
- All calculations finalized

**Navigation:**
- Continue → Screen 42

---

#### Screen 42 — Get Started Challenge

**Phase:** `checklist`

**UI Components:**
- `OnboardingProgress` (42 of 43)
- Header: "Complete Your Setup"
- Progress bar: 2/7 complete

**Gamified Checklist:**
- ✅ Enter all debts (completed)
- ✅ Set income & expenses (completed)
- ⬜ Join your first challenge (+50 XP)
- ⬜ Log your first expense with AI (+100 XP)
- ⬜ Enable daily check-in notifications (+25 XP)
- ⬜ Complete your first daily check-in (+50 XP)
- ⬜ Earn your first 3-day streak (+100 XP)

**Each uncompleted item tappable** → Navigate to relevant screen

**Total XP progress bar at top**

**Incentive:** "Complete all 7 to unlock: Debt Destroyer badge + 500 XP"

**CTA:** "Continue to Dashboard" (always accessible)

**Data:**
- Challenge completion status

**Navigation:**
- Continue → Screen 43

---

#### Screen 43 — Dashboard Introduction

**Phase:** `dashboard-intro`

**UI Components:**
- Simplified dashboard preview (actual Dashboard screen)

**Section 1: Debt Overview Card**
- Total debt: $[X,XXX]
- Debt-free date: [Month Year]
- Next payment due: [Date]

**Section 2: Progress Visualization**
- Overall debt payoff progress bar (low %)
- "You've paid off $0 so far — time to start!"

**Section 3: Today's Tasks**
- Log today's expenses
- Check in with AI coach
- Review your budget

**Section 4: AI Coach Quick Prompt**
- Chat bubble: "Hey! I'm here to help. What's on your mind about money today?"
- Input bar (tappable → Opens AI chat)

**Optional: Tutorial Tooltips**
- Tooltip 1: "Tap here to log expenses with AI"
- Tooltip 2: "Check your daily progress here"
- Tooltip 3: "Visit Goals tab for challenges"
- "Got it" button dismisses

**This IS the actual Dashboard screen**

**Marks:** `onboardingStore.onboardingComplete = true`

**Navigation:**
- User is now on main app (onboarding complete)

---

## END OF FLOW

---

## Implementation Order

### Week 1: Foundation Screens (Screens 1-10)
1. OnboardingWelcomeScreen (Screens 1-2)
2. OnboardingQuestionScreen (Screens 3-6, 8-10)
3. OnboardingFormScreen (Screen 7)

### Week 2: Financial Data (Screens 11-16)
4. OnboardingFormScreen enhancements (Screens 11, 13-16)
5. OnboardingQuestionScreen (Screen 12)

### Week 3: Debt Flow (Screens 17-26)
6. OnboardingDebtFlowScreen (all phases)

### Week 4: Assessment & Personalization (Screens 27-34)
7. OnboardingQuestionScreen (remaining screens)
8. OnboardingFormScreen (Screen 31)

### Week 5: Results & Conversion (Screens 35-43)
9. OnboardingResultsScreen
10. OnboardingPaywallScreen
11. OnboardingCompletionScreen

---

## Next Steps

Start with **OnboardingWelcomeScreen** (Screens 1-2) - simplest to build and test navigation flow.
