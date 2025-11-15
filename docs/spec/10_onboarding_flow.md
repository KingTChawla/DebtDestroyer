# Debt Destroyer - Onboarding Flow Specification

**Version:** 1.0
**Last Updated:** 2025-11-15
**Status:** ✅ Specification Complete - Ready for Implementation

---

## LLM SUMMARY

- **Gravl-inspired 43-screen onboarding** optimized for high retention and emotional engagement
- **Full 1:1 structural adaptation** reimagined for debt elimination and financial awareness
- **Six major phases**: Welcome/Motivation → User Profiling → Financial Data Collection → Debt Entry → Personalization → Account Creation & Plan Reveal
- **Multi-step debt entry flow** (Screens 18-25) with detailed micro-flows per debt
- **AI persona customization** (Screen 32) with 4 coaching styles (calm, direct, high-energy, humor)
- **Behavioral psychology integration**: habit selection, emotional impact assessment, confidence sliders
- **Subscription paywall placement** (Screens 37-38) after value demonstration, before account creation
- **Gamified completion challenges** (Screen 42) mirroring Gravl's checklist approach
- **Emergency fund prioritization** (Screens 30-31) before debt snowball activation
- **Snowball Power Score** (Screen 35) with projected savings, payoff date, and personalized metrics

---

## File Summary

Complete screen-by-screen specification for DebtDestroyer's onboarding experience. Modeled after Gravl's high-conversion fitness onboarding, adapted for debt elimination with emotional intelligence, personalization, and behavioral finance principles. Designed for maximum user engagement and retention.

---

## Onboarding Philosophy

### Design Principles

1. **Emotional Engagement First** - Hook users emotionally before asking for data
2. **Progressive Disclosure** - Request information in small, digestible chunks
3. **Value Before Paywall** - Demonstrate AI insights and personalized plan before subscription
4. **Micro-Commitments** - Build investment through small steps leading to larger commitment
5. **Celebrate Progress** - Acknowledge completion of each phase with visual feedback

### Target Metrics

- **Completion Rate:** 65%+ (industry average: 40-50%)
- **Time to Complete:** 8-12 minutes average
- **Free-to-Paid Conversion:** 15%+ at paywall
- **30-Day Retention:** 40%+ from onboarded users

### User Psychology Mapping

| Phase | Psychological State | Design Strategy |
|-------|-------------------|-----------------|
| Screens 1-2 | Curiosity & Hope | Emotional hook, mission reinforcement |
| Screens 3-10 | Trust Building | Non-threatening questions, identity validation |
| Screens 11-16 | Effort Investment | Data collection feels productive, not burdensome |
| Screens 17-26 | Commitment Deepening | Debt entry = acknowledgment of problem, first step to solution |
| Screens 27-34 | Personalization | User feels seen, understood, and in control |
| Screens 35-36 | Value Realization | "Aha moment" with projected results |
| Screens 37-38 | Conversion Opportunity | Clear value proposition, urgency, social proof |
| Screens 39-43 | Activation & Onboarding | Immediate wins, habit formation, feature discovery |

---

## Phase 1: Welcome & Motivation (Screens 1-2)

### Screen 1 — Welcome

**Purpose:** Introduce the mission and set emotional tone

**Layout:**
- App logo (centered)
- Headline: "Welcome to DebtDestroyer"
- Subheadline: "Let's take control of your money — one debt at a time."
- Hero image: Minimalist illustration of upward progress
- CTA Button: "Get Started" (Primary, full-width)

**Implementation Notes:**
- Use Forest Fade gradient background
- Animate logo on entry (fade + scale)
- Haptic feedback on button press
- No skip option (ensures message absorption)

**Data Captured:** None

---

### Screen 2 — Motivational Mission

**Purpose:** Reinforce emotional buy-in and commitment

**Layout:**
- Large typography: "Freedom. Clarity. Peace of mind."
- Subtext: "Your debt-free journey starts today."
- Background: Subtle animated gradient
- CTA Button: "Next" (Primary)

**Implementation Notes:**
- 3-second minimum view time before button activates
- Subtle parallax effect on scroll
- Typography uses Title 1 style (28pt Bold)

**Data Captured:** None

---

## Phase 2: User Profiling & Goal Setting (Screens 3-10)

### Screen 3 — Primary Financial Goal

**Purpose:** Understand user's immediate financial priority

**Question:** *What's your #1 goal right now?*

**Options (Single-Select Tiles):**
- Pay off all debt
- Build my first emergency fund
- Stop overspending
- Improve credit score
- Reduce financial stress
- Learn better money habits
- Get on a long-term plan

**UI Pattern:**
- 7 tiles in vertical scroll
- Each tile: icon + label
- Active state: Forest Fade border + subtle scale
- Auto-advance on selection (no Next button needed)

**Data Captured:**
- `primary_goal` (enum)
- Timestamp

**AI Personalization Impact:**
- Influences AI coaching tone and priority recommendations
- Determines which dashboard widgets appear first

---

### Screen 4 — Money Management Experience Level

**Purpose:** Calibrate complexity of guidance and terminology

**Question:** *How would you describe your financial experience?*

**Options (Single-Select Tiles):**
- Beginner (icon: seedling)
- Intermediate (icon: growing plant)
- Experienced (icon: tree)

**UI Pattern:**
- 3 large tiles, horizontally scrollable
- Each tile includes helpful subtext:
  - Beginner: "Just starting to learn about budgets and debt"
  - Intermediate: "I have some knowledge but need structure"
  - Experienced: "I understand finance but need accountability"

**Data Captured:**
- `experience_level` (enum: beginner | intermediate | experienced)

**AI Personalization Impact:**
- Beginner: More educational content, simpler terminology
- Intermediate: Balanced tips with actionable insights
- Experienced: Advanced strategies, minimal hand-holding

---

### Screen 5 — Monthly Money Check-Ins

**Purpose:** Understand current tracking habits

**Question:** *How often do you track your money?*

**Options (Single-Select):**
- Rarely
- Sometimes
- Weekly
- Daily

**UI Pattern:**
- 4 horizontal cards with frequency icons
- Tap to select, auto-advance

**Data Captured:**
- `tracking_frequency` (enum)

**AI Personalization Impact:**
- Influences notification frequency and nudge intensity
- "Rarely" users get more educational prompts

---

### Screen 6 — Debt Management Confidence

**Purpose:** Assess user's self-efficacy and emotional state

**Question:** *How confident do you feel about paying off debt?*

**Options (Single-Select):**
- Low (icon: worried face)
- Medium (icon: neutral face)
- High (icon: confident face)

**UI Pattern:**
- 3 emotion-based tiles
- Color-coded: Low (Velvet Rose tint), Medium (neutral), High (Emerald Shadow tint)

**Data Captured:**
- `debt_confidence` (enum: low | medium | high)

**AI Personalization Impact:**
- Low confidence → More encouragement, smaller initial goals
- High confidence → Challenge-based motivation, aggressive targets

---

### Screen 7 — Basic Profile Info

**Purpose:** Gather demographic context for personalization

**Fields:**
- Age (numeric input, optional)
- State/Country (dropdown/autocomplete)
- Household size (picker: 1, 2, 3, 4, 5+)

**UI Pattern:**
- Stacked input fields
- Clear labels with helper text
- "Skip for now" option (bottom, subtle link)
- Primary CTA: "Continue"

**Data Captured:**
- `age` (integer, nullable)
- `location` (string)
- `household_size` (integer)

**AI Personalization Impact:**
- Location influences cost-of-living adjustments in budget suggestions
- Household size affects expense benchmarks

---

### Screen 8 — Financial Identity Tile Selector

**Purpose:** Emotional resonance and situation acknowledgment

**Question:** *Which best describes your financial situation?*

**Tiles (Single-Select, Large Format):**
- "Drowning in debt" (icon: anchor)
- "Getting by, but tight" (icon: balance scale)
- "Stable, but want better habits" (icon: steady line)
- "Doing okay, want a plan" (icon: map)
- "Doing well, want optimization" (icon: upward arrow)

**UI Pattern:**
- 5 large tiles, vertical scroll
- Each tile has empathetic subtext
- Haptic feedback on selection
- No judgment language anywhere

**Data Captured:**
- `financial_identity` (enum)

**AI Personalization Impact:**
- "Drowning" → Crisis-mode support, immediate wins prioritized
- "Optimization" → Advanced strategies, efficiency focus

---

### Screen 9 — Spending Behavior Awareness

**Purpose:** Self-assessment of spending discipline

**Question:** *How would you describe your spending habits?*

**Options (Single-Select):**
- Overspender (icon: shopping bag)
- Impulse spender (icon: lightning)
- Mostly controlled (icon: check)
- Very disciplined (icon: shield)

**UI Pattern:**
- 4 cards with icons
- Non-judgmental, supportive copy

**Data Captured:**
- `spending_behavior` (enum)

**AI Personalization Impact:**
- Influences frequency of spending alerts
- Determines which challenges are suggested first

---

### Screen 10 — Expense Confidence Slider

**Purpose:** Quantify awareness of spending patterns

**UI Elements:**
- Title: *How confident are you that you know where your money goes each month?*
- Slider: 1-10 scale
  - 1 = "No idea"
  - 10 = "I track every penny"
- Live value display above slider thumb
- Haptic feedback at 5 and 10

**Data Captured:**
- `expense_awareness` (integer 1-10)

**AI Personalization Impact:**
- Low scores (1-4) → AI suggests detailed expense tracking challenge first
- High scores (8-10) → Skip basic tracking, focus on optimization

---

## Phase 3: Financial Data Collection (Screens 11-16)

### Screen 11 — Monthly Income Input

**Purpose:** Establish baseline income data

**Fields:**
- **Primary income** (currency input, required)
  - Helper text: "After-tax take-home pay"
- **Secondary income** (currency input, optional)
  - Helper text: "Side gigs, freelance, etc."
- **Pay frequency** (picker)
  - Weekly / Bi-weekly / Semi-monthly / Monthly

**UI Pattern:**
- Currency input with proper formatting ($X,XXX)
- Picker appears as segmented control
- Primary CTA: "Continue"
- "I'm not sure" link → Provides estimation helper

**Data Captured:**
- `primary_income` (decimal)
- `secondary_income` (decimal, nullable)
- `pay_frequency` (enum)

**Validation:**
- Primary income must be > 0
- Reasonable maximum (e.g., $50,000/month to catch typos)

**AI Personalization Impact:**
- Used in all budget calculations
- Determines debt payment capacity

---

### Screen 12 — Income Stability

**Purpose:** Risk assessment for aggressive vs. conservative planning

**Question:** *Is your income stable?*

**Options (Single-Select):**
- Stable (icon: solid line)
- Somewhat unstable (icon: wavy line)
- Very unstable (icon: erratic line)

**Helper Text:**
- Stable: "Same amount each month"
- Somewhat: "Varies but predictable"
- Very: "Commission, seasonal, or irregular"

**Data Captured:**
- `income_stability` (enum)

**AI Personalization Impact:**
- Unstable income → Recommend larger emergency fund first
- Unstable income → More conservative snowball projections

---

### Screen 13 — Essential Expenses Input

**Purpose:** Calculate baseline living costs

**Fields (All currency inputs):**
- Rent/Mortgage
- Utilities (electric, water, gas, internet)
- Groceries
- Transportation (gas, transit, car payment)
- Insurance (health, auto, renters/home)

**UI Pattern:**
- Collapsible categories (start with all collapsed)
- Each category expands to show breakdown
- Running total at bottom
- "Add other essentials" button
- "Skip for now" option (bottom link)

**Data Captured:**
- `essential_expenses` (object with category breakdowns)
- `total_essential_expenses` (calculated)

**Validation:**
- Each field optional but encouraged
- Total cannot exceed income (warning, not blocking)

**AI Personalization Impact:**
- Establishes baseline for discretionary income calculation
- Identifies budget optimization opportunities

---

### Screen 14 — Lifestyle Expenses Input

**Purpose:** Identify discretionary spending patterns

**Fields (All currency inputs):**
- Dining out / food delivery
- Entertainment (streaming, events, hobbies)
- Subscriptions
- Shopping (clothes, household items)

**UI Pattern:**
- Similar to Screen 13
- More forgiving tone (no judgment)
- Helper text: "Average monthly estimate is fine"

**Data Captured:**
- `lifestyle_expenses` (object)
- `total_lifestyle_expenses` (calculated)

**AI Personalization Impact:**
- Primary target for spending reduction recommendations
- Identifies "quick win" savings opportunities

---

### Screen 15 — Savings & Cash Reserves

**Purpose:** Assess financial buffer and emergency readiness

**Fields:**
- Current savings (currency input)
- Checking balance (currency input)
- **Question:** *Do you have an emergency fund?*
  - Yes (amount: _____)
  - No
  - I'm building one (current: _____)

**UI Pattern:**
- Stacked fields with clear labels
- Emergency fund question has conditional input
- Supportive copy: "No judgment — we'll help you build one"

**Data Captured:**
- `current_savings` (decimal)
- `checking_balance` (decimal)
- `emergency_fund_status` (enum + amount)

**AI Personalization Impact:**
- Determines if emergency fund phase is needed before snowball
- Influences risk tolerance in debt payoff strategy

---

### Screen 16 — Subscription Discovery Checklist

**Purpose:** Uncover hidden recurring expenses

**Question:** *Which of these do you pay for?*

**UI Elements:**
- Multi-select checklist (12-15 common subscriptions)
  - Netflix, Hulu, Disney+
  - Spotify, Apple Music
  - Amazon Prime
  - Gym membership
  - Cloud storage (iCloud, Dropbox)
  - Adobe, Microsoft 365
  - Meal kits, subscription boxes
  - News/magazines
- "Add custom subscription" button
- Running total at bottom

**Data Captured:**
- `subscriptions` (array of objects: name, cost, frequency)
- `total_subscription_cost` (calculated monthly equivalent)

**AI Personalization Impact:**
- Flags low-usage subscriptions for cancellation
- Adds to total monthly obligations
- Suggests "cancel 3 subscriptions" challenge

---

## Phase 4: Debt Entry Flow (Screens 17-26)

### Screen 17 — Debt Entry Overview

**Purpose:** Prepare user for multi-step debt input process

**Content:**
- Headline: "Let's map out your debts"
- Body:
  - "You'll enter each debt one at a time."
  - "We'll build your Snowball Plan automatically."
  - "The more detail you provide, the better your plan."
- Illustration: Stack of debts → organized list
- CTA: "Start Entering Debts" (Primary)

**UI Pattern:**
- Encouraging, not overwhelming
- Progress indicator: "0 debts entered"
- "I don't have any debts" option (skip to Screen 26)

**Data Captured:** None (informational only)

---

### Screens 18-25 — Individual Debt Entry (Repeating Micro-Flow)

Each debt follows this 8-screen micro-flow. User repeats until all debts entered.

---

#### Screen 18 — Debt Type Selection

**Question:** *What type of debt is this?*

**Options (Single-Select Tiles):**
- Credit Card (icon: card)
- Personal Loan (icon: handshake)
- Student Loan (icon: graduation cap)
- Auto Loan (icon: car)
- Medical Debt (icon: medical cross)
- Payday Loan (icon: calendar)
- Other (icon: folder)

**Data Captured:** `debt_type` (enum)

---

#### Screen 19 — Creditor Name

**Field:** Text input with autocomplete

**UI:**
- Label: "Who do you owe?" (friendly tone)
- Placeholder: "e.g., Chase, Capital One, Dr. Smith"
- Autocomplete suggestions for common creditors
- Optional field

**Data Captured:** `creditor_name` (string)

---

#### Screen 20 — Current Balance

**Field:** Currency input (required)

**UI:**
- Label: "What's the current balance?"
- Helper text: "Check your latest statement"
- Large numeric input with $ prefix
- Optional "Round to nearest $100" toggle

**Data Captured:** `current_balance` (decimal)

**Validation:**
- Must be > 0
- Warning if > $100,000 (typo check)

---

#### Screen 21 — Minimum Payment

**Field:** Currency input (required)

**UI:**
- Label: "What's the minimum monthly payment?"
- Helper text: "Found on your statement"
- Auto-suggest based on balance (e.g., 2% rule for credit cards)

**Data Captured:** `minimum_payment` (decimal)

**Validation:**
- Must be > 0
- Warning if > 50% of balance (typo check)

---

#### Screen 22 — Interest Rate (APR)

**Field:** Percentage input (optional but encouraged)

**UI:**
- Label: "What's the interest rate (APR)?"
- Helper text: "Usually shown on statements"
- Numeric input with % suffix
- "I don't know" option → Estimates based on debt type average

**Data Captured:** `interest_rate` (decimal, nullable)

**AI Personalization Impact:**
- Enables interest savings calculation
- If unknown, uses category defaults (credit card: 18%, student: 5%, etc.)

---

#### Screen 23 — Due Date

**Field:** Date picker (day of month)

**UI:**
- Label: "When is the payment due?"
- Picker: 1-31 (day of month)
- Optional field

**Data Captured:** `due_date_day` (integer 1-31, nullable)

**AI Personalization Impact:**
- Enables payment reminder scheduling
- Helps optimize payment timing for cash flow

---

#### Screen 24 — Auto-pay Setup

**Question:** *Do you have auto-pay enabled for this debt?*

**Options (Single-Select):**
- Yes, minimum payment
- Yes, fixed amount
- Yes, full balance (credit cards)
- No

**Data Captured:** `autopay_status` (enum)

**AI Personalization Impact:**
- Flags missed payment risk for non-autopay debts
- Suggests enabling autopay for minimum payments

---

#### Screen 25 — Debt Summary Review

**Purpose:** Confirm entry and encourage additional debts

**Content:**
- Debt card preview (styled like final dashboard debt card)
- Details shown:
  - Creditor name
  - Balance
  - Minimum payment
  - Interest rate
- **CTA Options:**
  - "Add Another Debt" (Primary, prominent)
  - "I'm Done Adding Debts" (Secondary, smaller)

**UI Pattern:**
- Celebrate completion with checkmark animation
- Progress indicator: "X debts entered"
- Edit button (returns to Screen 18 for this debt)

**Data Captured:** User decision to continue or finish

**State Management:**
- Saves current debt to list
- Loops back to Screen 18 if "Add Another" selected
- Proceeds to Screen 26 if "Done" selected

---

### Screen 26 — Debt Count Confirmation

**Purpose:** Final opportunity to add missed debts

**Question:** *Do you have any other debts to add?*

**Options:**
- Yes (returns to Screen 18)
- No, I've entered everything

**UI:**
- Summary card: "You've entered X debts totaling $X,XXX"
- Optional: Small reminder list of debt types to jog memory

**Data Captured:** Confirmation of completeness

---

## Phase 5: Emotional & Behavioral Assessment (Screens 27-31)

### Screen 27 — Debt Burden Slider

**Purpose:** Quantify emotional weight of debt

**UI:**
- Title: *How overwhelming does your debt feel?*
- Slider: 1-10 scale
  - 1 = "Manageable, just needs a plan"
  - 10 = "Crushing, keeps me up at night"
- Emoji feedback (changes with slider value)
- Live haptic feedback

**Data Captured:** `debt_burden_level` (integer 1-10)

**AI Personalization Impact:**
- High scores (8-10) → AI uses more empathetic, stress-reduction language
- Flags user for potential financial coaching referrals

---

### Screen 28 — Emotional Impact Assessment

**Purpose:** Assess psychological toll and urgency

**Question:** *How much stress is your debt causing you?*

**Options (Single-Select Tiles):**
- Low (icon: calm face)
  - "It's there, but I'm okay"
- Medium (icon: slightly worried)
  - "It bothers me regularly"
- High (icon: stressed face)
  - "It's a constant worry"
- Extreme (icon: very stressed)
  - "It's affecting my health/relationships"

**Data Captured:** `emotional_impact` (enum)

**AI Personalization Impact:**
- Extreme cases → Prioritize quick wins, mental health resources
- Influences tone of AI coaching (more supportive vs. challenging)

---

### Screen 29 — Financial Habits Assessment

**Purpose:** Identify behavior patterns to address

**Question:** *Which of these apply to you? (Select all that apply)*

**Options (Multi-Select Checklist):**
- Impulse spending
- No budget or spending plan
- Not tracking expenses
- Missed payments in the past
- No savings or emergency fund
- Living paycheck to paycheck
- Actually, I have good habits (exclusive option)

**UI Pattern:**
- Checkboxes with supportive copy
- "Good habits" option unchecks all others if selected
- "These are just to help personalize your plan" reassurance

**Data Captured:** `financial_habits` (array of enums)

**AI Personalization Impact:**
- Each selected habit triggers specific challenge/education content
- "No budget" → Budget creation tutorial prioritized
- "Missed payments" → Autopay setup emphasized

---

### Screen 30 — Emergency Fund Goal

**Purpose:** Determine if emergency fund phase is needed

**Question:** *Do you have $1,000 saved for emergencies?*

**Options (Single-Select):**
- Yes, I have $1,000+ saved
- Not yet, but I'm working on it
- No, and I want to save this first
- Skip this for now

**Data Captured:** `emergency_fund_priority` (enum)

**AI Personalization Impact:**
- "Want to save first" → Activates Baby Step 1 (emergency fund) before snowball
- "Yes" → Proceeds directly to debt snowball setup

---

### Screen 31 — Emergency Fund Target Input

**Conditional Screen:** Only appears if Screen 30 = "want to save this first"

**UI:**
- Title: "Let's set your emergency fund goal"
- Currency input (default: $1,000)
- Helper text: "Dave Ramsey recommends starting with $1,000"
- Slider for quick amounts: $500 / $1,000 / $1,500 / $2,000
- Motivational copy: "Once you hit this, we'll unleash the debt snowball"

**Data Captured:** `emergency_fund_goal` (decimal)

**AI Personalization Impact:**
- Creates emergency fund tracking widget on dashboard
- Delays debt snowball activation until goal reached

---

## Phase 6: AI Personalization & Plan Setup (Screens 32-34)

### Screen 32 — AI Persona Preference

**Purpose:** Customize AI coaching tone and style

**Question:** *How do you want your AI money coach to talk to you?*

**Options (Single-Select Cards with Examples):**

**1. Calm & Supportive**
- Icon: Heart
- Example: "You've got this. Let's take it one step at a time."
- Best for: Users with high stress/anxiety

**2. Direct & Disciplined**
- Icon: Shield
- Example: "Time to face the numbers. No more excuses."
- Best for: Users wanting accountability

**3. High-Energy Motivation**
- Icon: Lightning
- Example: "YES! You're crushing it! Let's GO!"
- Best for: Users motivated by celebration

**4. Humor & Lighthearted**
- Icon: Smile
- Example: "Debt? More like debt-be-gone, am I right?"
- Best for: Users who want levity

**UI Pattern:**
- Large cards with persona example
- Tap to preview longer sample message
- Visual persona indicator (color + icon)

**Data Captured:** `ai_persona` (enum: supportive | direct | energetic | humorous)

**AI Personalization Impact:**
- Directly controls GPT system prompt personality parameters
- Influences message tone, emoji usage, exclamation frequency

---

### Screen 33 — Plan Aggressiveness

**Purpose:** Set debt payoff intensity and timeline expectations

**Question:** *How intense do you want your payoff plan to be?*

**Options (Single-Select Cards with Details):**

**1. Slow & Steady**
- Icon: Turtle
- Description: "Comfortable pace, sustainable lifestyle"
- Target: Minimum payments + small extra ($50-100/month)
- For: Lower income, high essential expenses

**2. Standard**
- Icon: Gauge (medium)
- Description: "Balanced approach, noticeable progress"
- Target: Minimum + moderate extra ($150-300/month)
- For: Moderate flexibility in budget

**3. Gazelle Intensity**
- Icon: Rocket
- Description: "All-in, maximum speed, Dave Ramsey style"
- Target: Minimum + aggressive extra ($400+/month)
- For: Urgent payoff, high income, or strong discipline

**UI Pattern:**
- 3 large cards with clear tradeoffs
- Each card shows estimated payoff acceleration
- Non-judgmental language (all are valid choices)

**Data Captured:** `plan_intensity` (enum: slow | standard | gazelle)

**AI Personalization Impact:**
- Calculates snowball payment amount
- Influences challenge difficulty
- Adjusts timeline projections

---

### Screen 34 — Behavior Change Challenge Selection

**Purpose:** Commit to initial habit changes for quick wins

**Question:** *Choose 1-3 challenges to start with*

**Options (Multi-Select, 1-3 required):**

**Quick Wins (3-7 days):**
- No eating out for 3 days
- Skip coffee shop for a week
- No Amazon purchases for 5 days
- No impulse buys (24-hour rule)

**Tracking & Awareness (7-14 days):**
- Track every expense for 7 days
- Review all subscriptions
- Find 3 subscriptions to cancel

**Planning & Setup (One-time):**
- Create your first budget
- Enable autopay for all debts
- Set up debt payment alerts

**UI Pattern:**
- Checkboxes with time commitment badges
- Difficulty indicator (Easy / Medium / Hard)
- Must select 1-3 (enforced)
- "Start these on [date picker]" option

**Data Captured:** `initial_challenges` (array of challenge IDs)

**AI Personalization Impact:**
- Creates active challenges on dashboard
- Triggers completion tracking
- Awards XP and badges for completion

---

## Phase 7: Results & Value Demonstration (Screens 35-36)

### Screen 35 — Snowball Power Score (Generated)

**Purpose:** "Aha moment" — demonstrate value of the system

**Content (Dynamically Calculated):**

**Headline:** "Your Debt Freedom Blueprint"

**Key Metrics (Large, Bold):**
1. **Payoff Acceleration:** "You'll be debt-free **28% faster** using the Snowball Method"
   - vs. current minimum-payment-only trajectory
2. **Interest Savings:** "Users like you saved **$3,140** in interest on average"
   - Based on cohort data and debt profile
3. **Projected Debt-Free Date:** "**May 2028**"
   - Calendar visualization with countdown

**Visual Elements:**
- Graph: Current path (red line) vs. Snowball path (green line)
- Debt stack visualization (tallest to shortest by snowball order)
- Confetti animation on screen load

**CTA:** "See Your Full Plan" (Primary)

**Data Captured:** None (display only)

**Implementation Notes:**
- Calculations based on:
  - Total debt entered
  - Interest rates
  - Income - expenses = available snowball payment
  - Plan intensity selection (Screen 33)
- Must feel personalized (avoid generic "most users" language)
- Graph must be accurate (backend calculation)

**AI Personalization Impact:**
- This data becomes part of user profile for AI coaching context
- Used in motivational messages ("Remember, you're on track to save $3,140!")

---

### Screen 36 — Personalized Insights Summary

**Purpose:** Showcase AI's analytical value before paywall

**Content (Generated Insights):**

**Section 1: Debt Strategy Highlights**
- "Your highest-interest debt: [Creditor] at [X]% APR"
- "Your quickest win: [Smallest debt] — payoff in [X] months"
- "Biggest savings opportunity: Refinancing [debt] could save $[X]/month"

**Section 2: Spending Analysis**
- "Potential leak: You're spending $[X]/month on subscriptions"
- "Quick win: Canceling [subscription] saves $[X]/year"
- "Budget red flag: [Category] is [X]% above typical for your income"

**Section 3: Recommended Focus**
- "Start here: [Emergency fund OR Smallest debt]"
- "First 30 days: [Specific actionable goal]"
- "Challenge to try: [Personalized challenge from Screen 34 options]"

**UI Pattern:**
- 3 collapsible sections (all start open)
- Each insight has icon + color coding
- Mix of urgency (red flags) and optimism (opportunities)
- CTA at bottom: "Get Your Full Plan" (Primary)

**Data Captured:** None (display only)

**Implementation Notes:**
- Insights generated by backend AI analysis
- Must be specific (use actual numbers, names)
- Avoid generic advice that feels templated

---

## Phase 8: Monetization & Account Creation (Screens 37-40)

### Screen 37 — Subscription Paywall (Primary)

**Purpose:** Convert free users to paid subscribers

**Layout (Full-Screen Modal):**

**Header:**
- "Unlock Your Debt Destroyer Plan"
- Subheadline: "Join [X,XXX] people crushing their debt"

**Benefits List (6-8 Key Features):**
- ✅ Unlimited AI financial coaching
- ✅ Personalized debt payoff plan
- ✅ Daily accountability & check-ins
- ✅ Automatic debt snowball calculator
- ✅ Spending insights & budget tracking
- ✅ Challenges, streaks, & rewards
- ✅ Progress tracking & projections
- ✅ [Pro only] Bank account syncing (coming Phase 10)

**Pricing Options (Cards):**

**1. Monthly - $9.99/month**
- Billed monthly
- Cancel anytime
- Full access to all features

**2. Annual - $79.99/year** ⭐ BEST VALUE
- Save 33% ($40/year savings)
- Billed annually
- Full access + early feature access

**3. Lifetime - $199 one-time** 🏆 MOST POPULAR
- Pay once, own forever
- All future features included
- Priority support

**Social Proof:**
- "4.8★ rating from 2,341 users"
- 1-2 short testimonials with photos

**CTA:**
- Primary: "Start Free Trial" (7 days, then charges)
- Secondary: "See Free Version" (limited features)

**Fine Print:**
- "Cancel anytime • Secure payment • 30-day money-back guarantee"

**UI Pattern:**
- Pricing cards with radio selection
- Highlight "Best Value" with badge
- Terms and privacy links (footer)
- Close button (X) → Shows "Are you sure?" modal

**Data Captured:**
- User interaction (viewed paywall, selected plan, closed)
- Time on screen

**Implementation Notes:**
- A/B test Annual vs. Lifetime as default selection
- Track conversion rate by pricing option
- Free version limitations clearly defined (10 AI requests/day, no bank sync)

---

### Screen 38 — One-Time Offer Screen

**Purpose:** Time-limited urgency to boost annual conversion

**Conditional Display:**
- Only shown if user clicked "X" to close Screen 37
- OR selected monthly plan

**Layout:**

**Header:**
- "⏰ WAIT! Special Launch Offer"
- "This offer expires in [countdown timer: 10 minutes]"

**Offer Details:**
- "Get 25% OFF Annual Plan — Just $59.99/year"
- Original price shown with strikethrough: ~~$79.99~~
- Savings badge: "Save $60 vs. monthly!"

**Urgency Elements:**
- Countdown timer (10:00 → 0:00)
- "Only available to new users during onboarding"
- Limited visual design (red accent colors)

**CTA Options:**
- Primary: "Claim Discount Now" (large, urgent)
- Secondary: "No thanks, continue" (small, gray)

**Data Captured:**
- Conversion on upsell offer
- Countdown timer remaining when decided

**Implementation Notes:**
- Countdown timer is cosmetic (doesn't actually expire)
- Can be retriggered in email campaigns later
- A/B test 25% vs. 30% discount
- Track lift in annual plan conversion from this screen

---

### Screen 39 — Login / Create Account

**Purpose:** Secure user data and enable cross-device access

**Options:**

**Social Sign-In (Preferred):**
- Continue with Google (button with Google logo)
- Continue with Apple (button with Apple logo)

**Email Sign-In:**
- Email input field
- Password input field
- "Create Account" button

**Bottom Links:**
- "Already have an account? Log in"
- Terms of Service
- Privacy Policy

**UI Pattern:**
- Social buttons at top (faster, preferred)
- Email form below (alternative)
- Password requirements tooltip
- Auto-advance on successful auth

**Data Captured:**
- Authentication method
- User email (for account creation)
- OAuth tokens (if social login)

**Implementation Notes:**
- JWT token generation (backend)
- Store all onboarding data to user profile on account creation
- Sync free-trial or paid status to user account
- Email verification flow (if email signup)

**Security:**
- Password: 8+ chars, 1 uppercase, 1 number (enforced)
- Rate limiting on login attempts
- Secure password hashing (bcrypt)

---

### Screen 40 — Creating Account Loading Screen

**Purpose:** Build anticipation while backend processes data

**UI Elements:**
- Animated spinner or progress indicator
- Text: "Building your personalized financial plan…"
- Subtext (rotating messages, 2-second intervals):
  - "Analyzing your debt profile…"
  - "Calculating your snowball order…"
  - "Optimizing your payoff timeline…"
  - "Preparing your dashboard…"

**Duration:** 3-5 seconds (artificial delay for effect)

**Data Captured:** None

**Backend Processes (Actual):**
- Create user account in database
- Save all onboarding data to user profile
- Generate initial debt snowball order
- Calculate first-month goals
- Prepare dashboard widgets
- Send welcome email
- Initialize gamification (XP = 0, Level 1)

**Implementation Notes:**
- Real loading time should be <2 seconds
- Add artificial delay to build value perception
- Preload next screen assets during this time

---

## Phase 9: Plan Reveal & Activation (Screens 41-43)

### Screen 41 — Snowball Plan Reveal

**Purpose:** Present the finalized debt elimination roadmap

**Layout:**

**Header:**
- "Your Personalized Debt Destroyer Plan"
- Confetti animation on entry

**Section 1: Your Debt Order (Snowball Sequence)**
- List of debts, smallest to largest balance
- Each debt card shows:
  - Creditor name
  - Current balance
  - Minimum payment
  - Projected payoff month/year
- First debt highlighted with "ATTACK THIS FIRST" badge

**Section 2: Monthly Blueprint**
- Total minimum payments: $[X,XXX]
- Snowball payment (extra): $[X,XXX]
- Total debt payment: $[X,XXX]
- Breakdown chart (visual)

**Section 3: First Target Debt**
- Debt name: [Creditor]
- Balance: $[X,XXX]
- Monthly payment: $[XXX]
- Payoff date: [Month Year]
- Progress bar (currently 0%)

**Section 4: Estimated Timeline**
- Debt-free date: [Month Year]
- Total time: [X] months ([Y] years)
- Interest saved: $[X,XXX]
- Calendar visualization with milestones

**CTA:** "Start My Plan" (Primary, bottom fixed)

**UI Pattern:**
- Scrollable sections
- Expand/collapse for debt details
- Celebration micro-animations (checkmarks, progress fills)
- Option to edit plan (returns to earlier screens)

**Data Captured:** None (display only)

**Implementation Notes:**
- All calculations must be accurate (backend-driven)
- Plan updates automatically if user edits data
- Export plan as PDF option (future feature)

---

### Screen 42 — Get Started Challenge

**Purpose:** Drive immediate engagement and habit formation

**Layout:**

**Header:**
- "Complete Your Setup"
- Progress bar: 2/7 complete (based on onboarding)

**Challenge Checklist (Gamified):**

✅ Enter all debts (completed in onboarding)
✅ Set income & expenses (completed in onboarding)
⬜ Join your first challenge
⬜ Log your first expense with AI
⬜ Enable daily check-in notifications
⬜ Complete your first daily check-in
⬜ Earn your first 3-day streak

**UI Pattern:**
- Each item is a card with checkbox
- Completed items have checkmark + green tint
- Incomplete items are tappable → Navigate to relevant screen
- XP rewards shown per task (+50 XP, +100 XP, etc.)
- Total XP progress bar at top

**Incentive:**
- "Complete all 7 to unlock [bonus]: Debt Destroyer badge + 500 XP"

**CTA:** "Continue to Dashboard" (bottom, always accessible)

**Data Captured:**
- Challenge completion status
- Time to complete each step

**AI Personalization Impact:**
- Completed challenges unlock dashboard widgets
- Used to calculate initial engagement score

---

### Screen 43 — Dashboard Introduction

**Purpose:** Orient user to main app interface

**Layout (Simplified Dashboard Preview):**

**Section 1: Debt Overview Card**
- Total debt: $[X,XXX]
- Debt-free date: [Month Year]
- Next payment due: [Date]

**Section 2: Progress Visualization**
- Overall debt payoff progress bar (currently low %)
- "You've paid off $0 so far — time to start!"

**Section 3: Today's Tasks**
- Log today's expenses
- Check in with AI coach
- Review your budget

**Section 4: AI Coach Quick Prompt**
- Chat bubble: "Hey! I'm here to help. What's on your mind about money today?"
- Input bar (tappable → Opens AI chat)

**Overlay Tutorial Tooltips (Optional):**
- Tooltip 1: "Tap here to log expenses with AI"
- Tooltip 2: "Check your daily progress here"
- Tooltip 3: "Visit Goals tab for challenges"
- "Got it" button to dismiss

**CTA:** None (user is now on main dashboard)

**Data Captured:**
- Tutorial completion (if shown)
- First interaction on dashboard

**Implementation Notes:**
- This is the actual Dashboard screen (not a mock-up)
- Marks end of onboarding flow
- Sets `onboarding_completed` flag in user profile
- Triggers welcome push notification setup

---

## END OF ONBOARDING FLOW

---

## Post-Onboarding Considerations

### Data Persistence

All onboarding data must be saved to the user profile:

**User Profile Fields:**
- Demographics: age, location, household_size
- Goals: primary_goal, experience_level, financial_identity
- Behavior: spending_behavior, tracking_frequency, debt_confidence
- Financial: income, expenses, debts, subscriptions, savings
- Preferences: ai_persona, plan_intensity, initial_challenges
- Metrics: debt_burden_level, emotional_impact, expense_awareness
- Subscription: tier (free/pro/lifetime), trial_end_date

**Database Schema:**
- User table
- Debts table (one-to-many)
- Subscriptions table (one-to-many)
- Challenges table (many-to-many via user_challenges junction)
- Onboarding_responses table (JSONB for flexibility)

---

### Onboarding Analytics

**Key Metrics to Track:**

1. **Funnel Metrics:**
   - Drop-off rate per screen
   - Average time per screen
   - Overall completion rate
   - Completion time (median, p90)

2. **Conversion Metrics:**
   - Paywall view rate (% who see Screen 37)
   - Paywall conversion rate (% who subscribe)
   - Conversion by pricing tier
   - Upsell success rate (Screen 38)

3. **Engagement Indicators:**
   - Number of debts entered (avg, median)
   - Number of challenges selected
   - AI persona distribution
   - Plan intensity distribution

4. **Quality Signals:**
   - Data completeness score (% fields filled)
   - Edit/back button usage (confusion indicator)
   - Skip button usage (resistance indicator)
   - Time-to-value (welcome → plan reveal)

**Optimization Opportunities:**
- A/B test screen order (e.g., move paywall earlier/later)
- Test different AI persona examples
- Experiment with challenge selection timing
- Optimize Snowball Power Score messaging

---

### Edge Cases & Error Handling

**1. User Exits Mid-Onboarding:**
- Auto-save progress every 3 screens
- "Resume onboarding" prompt on next login
- Email follow-up: "Finish your plan — 5 minutes left!"

**2. No Debts Entered:**
- Still allow onboarding completion
- Redirect to "Build Emergency Fund" mode
- Offer budgeting-only features
- Paywall messaging adjusts ("Build Better Habits" focus)

**3. Income < Total Expenses:**
- Warning screen: "Your expenses exceed income"
- Offer budget reduction guidance
- AI suggests immediate spending cuts
- Adjust plan intensity automatically to "Slow & Steady"

**4. Invalid/Suspicious Data:**
- Backend validation for reasonable ranges
- Flag outliers for review (e.g., $1M debt, $500K income)
- Allow user to confirm unusual entries
- Prevent submission if critical fields missing

**5. Payment/Subscription Errors:**
- Graceful failure → "Try again" with clear error message
- Offer free trial extension if payment issue
- Allow completion without subscription (limited mode)

---

### Onboarding Re-Engagement (Incomplete Users)

**Email Sequence for Abandoned Onboarding:**

**Email 1 (1 hour after exit):**
- Subject: "Your debt plan is almost ready..."
- Content: Resume link + progress indicator
- CTA: "Finish in 5 minutes"

**Email 2 (24 hours after exit):**
- Subject: "Still thinking about your debt plan?"
- Content: Social proof + testimonial
- CTA: "See how others succeeded"

**Email 3 (72 hours after exit):**
- Subject: "We'll help you get started"
- Content: Offer 1-on-1 onboarding support (chat/call)
- CTA: "Get personalized help"

**Email 4 (7 days after exit):**
- Subject: "Your fresh start is waiting"
- Content: Motivational story + special offer
- CTA: "Claim your discount"

**Push Notification (if app installed):**
- Day 1: "Tap to finish your plan — almost there!"
- Day 3: "Your debt-free date is waiting to be calculated"
- Day 7: "Take control today — complete your setup"

---

## Implementation Checklist

### Phase 1: Core Onboarding Screens (MVP)

**Priority 1 (Must-Have for MVP):**
- [ ] Screens 1-2: Welcome & Motivation
- [ ] Screens 3-7: User Profiling (simplified)
- [ ] Screen 11: Income Input
- [ ] Screens 17-25: Debt Entry Flow (core functionality)
- [ ] Screen 35: Snowball Power Score (value demo)
- [ ] Screen 39: Account Creation
- [ ] Screen 41: Plan Reveal
- [ ] Screen 43: Dashboard Introduction

**Priority 2 (Enhanced MVP):**
- [ ] Screens 13-15: Expense Input
- [ ] Screen 16: Subscription Discovery
- [ ] Screen 30-31: Emergency Fund Setup
- [ ] Screen 32: AI Persona Selection
- [ ] Screen 34: Challenge Selection
- [ ] Screen 42: Get Started Checklist

**Priority 3 (Full Feature Set):**
- [ ] Screens 8-10: Detailed User Profiling
- [ ] Screens 27-29: Emotional Assessment
- [ ] Screen 33: Plan Aggressiveness
- [ ] Screen 36: Personalized Insights
- [ ] Screens 37-38: Paywall & Upsell
- [ ] Screen 40: Loading Animation

---

### Technical Implementation Requirements

**Frontend (React Native):**
- [ ] Onboarding navigation stack (separate from main app)
- [ ] Form validation library (react-hook-form)
- [ ] State management for onboarding data (Zustand store)
- [ ] Progress persistence (AsyncStorage backup)
- [ ] Animation library (react-native-reanimated)
- [ ] Analytics event tracking (all screens)

**Backend (NestJS):**
- [ ] Onboarding API endpoints (save progress, submit final)
- [ ] Snowball calculation engine
- [ ] AI persona prompt templates
- [ ] User profile creation service
- [ ] Email notification service (SendGrid/Postmark)
- [ ] Payment integration (RevenueCat)

**Database (PostgreSQL):**
- [ ] Users table
- [ ] Debts table (with user_id foreign key)
- [ ] Onboarding_progress table (JSONB for flexibility)
- [ ] Subscriptions table
- [ ] Challenges table + user_challenges junction

**AI/ML (OpenAI Integration):**
- [ ] Personalized insights generator (Screen 36)
- [ ] Spending analysis prompt
- [ ] Debt strategy recommendations
- [ ] AI persona system prompts (4 variants)

---

## Design Assets Needed

**Illustrations:**
- Welcome screen hero image (debt freedom concept)
- Motivational mission graphic (upward progress)
- Debt entry overview illustration (organized debts)
- Snowball visualization (stacked debts → payoff timeline)
- Plan reveal confetti/celebration animation
- Dashboard introduction tutorial graphics

**Icons:**
- Debt type icons (8 types: credit card, loan, etc.)
- AI persona icons (4 types: heart, shield, lightning, smile)
- Financial identity icons (5 types: anchor, balance, etc.)
- Plan intensity icons (turtle, gauge, rocket)
- Challenge category icons (20+ challenges)

**UI Components:**
- Custom slider with haptic feedback
- Currency input with formatting
- Multi-select tile grid
- Debt card component (reusable)
- Progress bar with celebration states
- Countdown timer (Screen 38)

---

## Accessibility Considerations

**Screen Reader Support:**
- All buttons have meaningful `accessibilityLabel`
- Form fields have `accessibilityHint` for context
- Progress indicators announce completion percentage
- Error messages are announced immediately

**Keyboard Navigation:**
- Tab order follows logical flow
- Enter key submits forms
- Escape key closes modals
- Auto-focus on primary input fields

**Visual Accessibility:**
- 4.5:1 contrast ratio for all text
- Error states use icons + color + text (not color alone)
- Font size respects system settings (Dynamic Type)
- Focus indicators clearly visible

**Cognitive Accessibility:**
- One question per screen (reduce overwhelm)
- Clear progress indicators (know where you are)
- Option to skip optional questions
- Auto-save prevents data loss

---

## Testing Strategy

**Unit Tests:**
- Form validation logic
- Snowball calculation accuracy
- Interest savings calculation
- Date/timeline projections

**Integration Tests:**
- Onboarding flow completion (happy path)
- Payment flow integration
- Account creation + data persistence
- Email trigger events

**User Testing:**
- 5-user think-aloud sessions (prototype)
- Completion rate tracking (analytics)
- Drop-off point identification
- Comprehension testing (do users understand questions?)

**A/B Tests:**
- Paywall placement (Screen 37 vs. earlier)
- Pricing display (annual vs. lifetime default)
- AI persona examples (different sample messages)
- Challenge selection timing (Screen 34 vs. post-onboarding)

---

## Success Metrics (Post-Launch)

**Target Benchmarks:**
- Onboarding completion rate: **65%+**
- Average completion time: **8-12 minutes**
- Paywall conversion rate: **15%+**
- 30-day retention (onboarded users): **40%+**
- Data completeness score: **80%+**
- Free-to-paid conversion (within 7 days): **20%+**

**Optimization Goals:**
- Reduce drop-off at debt entry phase (currently highest risk)
- Increase annual plan selection (vs. monthly)
- Improve upsell conversion on Screen 38
- Minimize skip button usage (indicates confusion)

---

## Final Notes

This onboarding flow is designed to:

1. **Build Trust Early** - Emotional connection before data requests
2. **Demonstrate Value** - Snowball Power Score and insights before paywall
3. **Create Investment** - Progressive commitment through micro-steps
4. **Enable Personalization** - Detailed data collection for AI customization
5. **Drive Conversion** - Strategic paywall placement with urgency tactics
6. **Ensure Activation** - Get Started checklist drives immediate engagement

**Implementation Timeline:**
- MVP (Priority 1 screens): 4 weeks
- Enhanced MVP (Priority 2): +2 weeks
- Full feature set (Priority 3): +2 weeks
- Polish & optimization: +1 week

**Total: ~9 weeks for complete onboarding flow**

---

**See Also:**
- [UI/UX Framework](./07_ui_ux_framework.md) - Component patterns and design system
- [Gamification System](./08_gamification_system.md) - XP, challenges, and rewards
- [AI & Ethics Guardrails](./05_ai_and_ethics_guardrails.md) - AI persona implementation
- [Build Phases & Roadmap](./09_build_phases_and_roadmap.md) - Development timeline

**© 2025 Debt Destroyer. All rights reserved.**
