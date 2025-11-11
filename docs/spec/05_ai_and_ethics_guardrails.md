# 05) AI & Ethics Guardrails

**LLM SUMMARY:**
- AI scope strictly limited to debt elimination and budgeting assistance
- Backend-enforced prompt guardrails and response validation
- Rate limiting: Free tier (10 requests/day), Pro tier (100 requests/day)
- Cost monitoring with daily caps per user to prevent exploitation
- PII sanitization before sending data to OpenAI
- User-configurable AI persona (Supportive/Tough Love/Neutral)
- Comprehensive audit logging and abuse detection

## AI Scope Limitation (Critical Security)

**Problem:** Users could exploit AI chat feature for general-purpose tasks unrelated to the app (homework help, creative writing, etc.), costing the app money and violating terms.

**Solution:** Backend enforces strict prompt guardrails and context boundaries.

### AI Guardrails Implementation

#### 1. System Prompt (Enforced by Backend)

Backend prepends this system prompt to EVERY AI request:

```
You are a financial coach AI assistant for the Debt Destroyer app.

STRICT RULES:
- You ONLY discuss debt elimination, budgeting, expenses, and financial planning.
- You NEVER answer questions unrelated to personal finance.
- You NEVER write code, essays, or creative content.
- You NEVER provide investment advice (stocks, crypto, etc.).
- If user asks off-topic questions, respond: "I can only help with debt elimination and budgeting. How can I assist with your financial goals?"

USER CONTEXT (from database):
- Total Debt: $X
- Monthly Income: $Y
- Current Goal: [goal name]
- Recent Expenses: [last 5 expenses]

Use this context to provide personalized, actionable financial advice.
```

#### 2. Prompt Filtering (Pre-API Call)

Backend analyzes user input BEFORE sending to OpenAI:

```typescript
// Backend AI Service
async function sanitizeUserPrompt(userInput: string): Promise<string> {
  // Block obvious off-topic patterns
  const bannedPatterns = [
    /write.*code/i,
    /write.*essay/i,
    /help.*homework/i,
    /tell.*joke/i,
    /creative.*story/i,
    /what is.*meaning of life/i,
    /translate.*to.*spanish/i,
    /explain.*quantum.*physics/i,
    /write.*poem/i,
    /help.*with.*math/i,
  ];

  for (const pattern of bannedPatterns) {
    if (pattern.test(userInput)) {
      throw new Error('AI_SCOPE_VIOLATION');
    }
  }

  // Check for repeated off-topic attempts (abuse detection)
  const recentAttempts = await redis.get(`ai_attempts:${userId}`);
  if (recentAttempts && JSON.parse(recentAttempts).length > 5) {
    throw new Error('AI_ABUSE_DETECTED');
  }

  return userInput;
}
```

#### 3. Response Validation (Post-API Call)

Backend checks OpenAI response for off-topic content:

```typescript
async function validateAIResponse(response: string): Promise<boolean> {
  // If AI response contains code blocks, generic advice, etc., reject it
  const problematicPatterns = [
    /```/,                    // Code blocks
    /function.*\(/,          // Function definitions
    /import.*from/,          // Import statements
    /class.*{/,              // Class definitions
    /var.*=/,                // Variable assignments
    /const.*=/,              // Constants
    /let.*=/,                // Let statements
    /for.*\(/,               // For loops
    /while.*\(/,             // While loops
  ];

  for (const pattern of problematicPatterns) {
    if (pattern.test(response)) {
      return false;
    }
  }

  // Check for investment advice keywords
  const investmentKeywords = [
    'stock', 'crypto', 'bitcoin', 'ethereum', 'investing',
    'portfolio', 'dividend', 'trading', 'market', 'shares'
  ];

  const responseLower = response.toLowerCase();
  for (const keyword of investmentKeywords) {
    if (responseLower.includes(keyword)) {
      return false;
    }
  }

  return true;
}
```

### Rate Limiting and Cost Controls

#### 4. Rate Limiting Per User

- **Free tier:** 10 AI requests/day
- **Pro tier:** 100 AI requests/day
- **Premium tier:** 500 AI requests/day (future)
- Rate limits stored in Redis, enforced per `user_id`
- Sliding window implementation to prevent abuse

```typescript
async function checkAIRateLimit(userId: string, tier: string): Promise<boolean> {
  const limits = {
    free: { daily: 10, hourly: 5 },
    pro: { daily: 100, hourly: 20 },
    premium: { daily: 500, hourly: 100 }
  };

  const limit = limits[tier] || limits.free;
  const today = new Date().toISOString().split('T')[0];
  const hour = new Date().getHours();

  // Check daily limit
  const dailyKey = `ai_requests:${userId}:${today}`;
  const dailyCount = await redis.incr(dailyKey);
  if (dailyCount === 1) await redis.expire(dailyKey, 86400);
  if (dailyCount > limit.daily) return false;

  // Check hourly limit
  const hourlyKey = `ai_requests:${userId}:${today}:${hour}`;
  const hourlyCount = await redis.incr(hourlyKey);
  if (hourlyCount === 1) await redis.expire(hourlyKey, 3600);
  if (hourlyCount > limit.hourly) return false;

  return true;
}
```

#### 5. Cost Monitoring and Controls

```typescript
interface AIUsageLog {
  user_id: string;
  tokens_used: number;
  cost_usd: number;
  request_type: string;
  timestamp: Date;
  response_validation: boolean;
}

async function logAIUsage(log: AIUsageLog): Promise<void> {
  // Log to database for audit trail
  await db.aiUsageLogs.create({ data: log });

  // Check for suspicious usage patterns
  const recentCosts = await redis.zincrby(
    `ai_daily_cost:${log.user_id}`,
    log.cost_usd,
    new Date().toISOString().split('T')[0]
  );

  // Alert if user exceeds daily cost threshold
  if (parseFloat(recentCosts) > 1.0) { // $1/day limit
    await alertManager.send({
      type: 'AI_COST_EXCEEDED',
      user_id: log.user_id,
      daily_cost: recentCosts
    });
  }
}
```

### AI Feature Boundaries

#### Allowed AI Use Cases
- ✅ Parse expense input ("I spent $10 on lunch" → category, amount)
- ✅ Generate debt payoff insights ("You're $37 away from payoff")
- ✅ Provide motivational messages (aligned with Debt Snowball philosophy)
- ✅ Answer budgeting questions ("How do I allocate my income?")
- ✅ Suggest category for uncategorized expenses
- ✅ Analyze spending patterns and suggest optimizations
- ✅ Calculate debt payoff scenarios
- ✅ Explain financial concepts (in context of debt elimination)

#### Blocked AI Use Cases
- ❌ General knowledge questions ("What is the capital of France?")
- ❌ Code generation or debugging
- ❌ Creative writing (essays, stories, poems)
- ❌ Math/homework help unrelated to personal finance
- ❌ Investment advice (stocks, bonds, crypto trading)
- ❌ Legal or tax advice (beyond debt management)
- ❌ Medical or health advice
- ❌ Relationship or personal advice
- ❌ Political or religious discussions

### AI Persona Constraints

#### User-Configurable AI Tone (Settings Screen)

**Supportive Persona:**
- "You're doing great! Let's tackle this together."
- "Every small step counts toward your debt-free journey!"
- Focus: Positive reinforcement, celebrating small wins

**Tough Love Persona:**
- "You spent $50 on coffee this week. That's a debt payment."
- "Face the numbers. Your future self will thank you."
- Focus: Direct accountability, opportunity cost framing

**Neutral Persona:**
- "Here's your spending summary for the week."
- "Based on your current pace, you'll be debt-free in 18 months."
- Focus: Data-driven analysis, objective insights

#### Backend Persona Enforcement

```typescript
function getPersonaSystemPrompt(tone: string): string {
  const prompts = {
    supportive: `
      User has selected SUPPORTIVE tone.
      Be encouraging, celebrate progress, focus on positive momentum.
      Always end with encouragement about their debt-free journey.
    `,
    tough_love: `
      User has selected TOUGH LOVE tone.
      Be direct about spending choices, emphasize opportunity costs.
      Use tough language about immediate gratification vs long-term freedom.
    `,
    neutral: `
      User has selected NEUTRAL tone.
      Provide objective, data-driven insights without emotional language.
      Focus on facts, numbers, and logical recommendations.
    `
  };

  return prompts[tone] || prompts.neutral;
}
```

### AI Data Privacy

#### What AI NEVER Sees
- ❌ User's full name, email, or phone number
- ❌ Bank account numbers or routing numbers
- ❌ Social Security Numbers
- ❌ Credit card numbers (only masked last 4 digits if needed)
- ❌ Exact merchant names (generic categories used instead)
- ❌ GPS coordinates or location data
- ❌ Device identifiers or IP addresses

#### What AI Receives (Sanitized)
- ✅ Total debt amount (aggregate, no account details)
- ✅ Monthly income (number only)
- ✅ Expense categories and amounts (no merchant names if sensitive)
- ✅ Goal titles and progress
- ✅ Streak information and achievements
- ✅ General financial profile (debt-to-income ratio, etc.)

#### Data Sanitization Process

```typescript
function sanitizeUserDataForAI(userProfile: UserProfile, expenses: Expense[]): AIContext {
  return {
    total_debt: userProfile.debts.reduce((sum, debt) => sum + debt.current_balance, 0),
    monthly_income: userProfile.monthly_income,
    debt_to_income_ratio: userProfile.debts.reduce((sum, debt) => sum + debt.current_balance, 0) / userProfile.monthly_income,
    current_goal: userProfile.active_goals[0]?.title,
    recent_expenses: expenses.slice(0, 5).map(expense => ({
      amount: expense.amount,
      category: expense.category,
      // Note: merchant name removed for privacy
    })),
    streak_days: userProfile.streaks.daily_login.current_streak,
  };
}
```

### Compliance and Monitoring

#### Audit Logging
All AI requests logged with comprehensive metadata:

```typescript
interface AIAuditLog {
  request_id: string;
  user_id: string;
  timestamp: Date;
  prompt_hash: string; // For detecting duplicate requests
  input_length: number;
  output_length: number;
  tokens_used: number;
  cost_usd: number;
  response_validation_passed: boolean;
  rate_limited: boolean;
  persona_used: string;
  request_type: 'chat' | 'expense_parsing' | 'insights';
  flagged_for_review: boolean;
}
```

#### Abuse Detection

**Suspicious Patterns:**
- Multiple rapid requests (rate limiting violation)
- Repeated off-topic attempts (scope violation)
- Unusual token consumption (possible exploitation)
- Same prompt sent multiple times (automation)

**Automated Responses:**
- Temporary suspension (24 hours) for minor violations
- Account review for repeated offenses
- Permanent ban for malicious exploitation

#### Terms of Service Integration

User agreement includes explicit AI usage terms:

1. **Scope Limitation:** AI assistance limited to debt elimination and budgeting
2. **Cost Transparency:** Users notified of daily request limits
3. **Data Usage:** Clear explanation of what data is shared with AI
4. **Conduct Rules:** Prohibited uses and violation consequences
5. **Right to Opt-Out:** Users can disable AI features entirely

### Model Selection and Configuration

#### Current Model Stack
- **Primary:** GPT-4o-mini (cost-effective, fast response)
- **Function Calling:** For structured data extraction (expense parsing)
- **Temperature:** 0.3 (balanced creativity and consistency)
- **Max Tokens:** 500 (cost control, concise responses)

#### Future Model Considerations
- Fine-tuned models for financial coaching
- Local processing for sensitive operations
- Multi-modal models for receipt image processing
- Specialized models for debt calculation optimization

### Monitoring and Analytics

#### Key Metrics Tracked
- **User Engagement:** AI requests per user, session length
- **Cost Management:** Daily/monthly AI costs per user tier
- **Quality Assurance:** Response validation success rate
- **Abuse Prevention:** Flagged requests, suspensions issued
- **Feature Adoption:** Usage of different AI capabilities

#### Dashboard Alerts
- Cost threshold exceeded
- Unusual usage patterns detected
- API latency spikes
- Validation failure rate increases
- User satisfaction metrics decline

---
*See: [API Endpoints](04_api_endpoints.md) → [Security & Privacy](06_security_and_privacy.md) → [Architecture & Stack](02_architecture_and_stack.md)*