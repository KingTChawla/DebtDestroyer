# 06) Security & Privacy

**LLM SUMMARY:**
- Privacy-first architecture with user data isolation via Row-Level Security
- Backend gateway pattern prevents direct external API calls from mobile
- AES-256 encryption at rest, TLS 1.3 in transit, KMS for key management
- JWT authentication with short-lived access tokens and refresh token rotation
- Comprehensive audit logging, anomaly detection, and incident response
- GDPR compliance with data portability and right to deletion
- SOC 2 certification planned for enterprise trust
- Read-only bank access via Plaid with explicit user consent

## Core Security Principles

### Privacy First Architecture
1. **User Data Isolation:** All database queries MUST be scoped by `user_id` from JWT token
2. **Row-Level Security:** Postgres RLS policies enforced on ALL tables
3. **Encryption:** Data encrypted at rest (AES-256) and in transit (TLS 1.3)
4. **Minimal Collection:** Only collect data necessary for debt elimination features
5. **No Data Selling:** User financial data is NEVER sold to third parties
6. **Household Opt-In:** Shared data requires explicit consent from both users

### Backend Gateway Pattern
1. **Mobile → Backend → External APIs:** Mobile app NEVER calls external APIs directly
2. **No API Keys in Frontend:** OpenAI, Plaid, Stripe keys stored in AWS Secrets Manager
3. **Backend Proxy:** All external integrations (AI, Plaid, payments) proxied through NestJS backend
4. **JWT Authentication:** Every API request authenticated with JWT (user_id extraction)
5. **Rate Limiting:** Backend enforces per-user rate limits (prevent abuse)

## Data Protection & Encryption

### Encryption at Rest
- **Database Encryption:** PostgreSQL RDS encryption enabled (AES-256)
- **Field-Level Encryption:** Sensitive fields encrypted with AWS KMS
  - `InstitutionConnection.access_token`
  - `InstitutionConnection.item_id`
  - Any future PII fields
- **Key Management:** AWS KMS with automatic key rotation (every 365 days)
- **Backup Encryption:** All database backups encrypted with customer-managed keys

### Encryption in Transit
- **API Communication:** TLS 1.3 for all mobile ↔ backend traffic
- **Database Connections:** TLS 1.3 for backend ↔ database connections
- **External API Calls:** TLS 1.3 for backend ↔ third-party integrations
- **Certificate Pinning:** Mobile app implements certificate pinning to prevent MITM attacks

### Secrets Management
- **Storage:** AWS Secrets Manager for all API keys and secrets
- **Rotation:** Automatic rotation policies for all secrets
- **Access Control:** IAM policies restrict secret access to specific services
- **Auditing:** All secret access logged and monitored

## Authentication & Authorization

### Multi-Factor Authentication (MFA)
- **Methods Available:** Email OTP, SMS, TOTP (Google Authenticator)
- **Implementation:** Auth0 or AWS Cognito for MFA management
- **Recovery:** Backup codes for account recovery
- **Risk-Based Authentication:** Adaptive MFA based on login patterns

### JWT Token Management
- **Access Token:** 15-minute TTL, short-lived for security
- **Refresh Token:** 30-day TTL with rotation on every use
- **Token Storage:**
  - Mobile: Secure Keychain/Keystore storage
  - Backend: Redis for invalidation lists
- **Token Revocation:** Immediate revocation capability for compromised tokens

```typescript
// JWT Payload Structure
interface JWTPayload {
  sub: string;        // User ID
  email: string;      // User email
  tier: string;       // Subscription tier
  role: string;       // User role
  iat: number;        // Issued at
  exp: number;        // Expires at
  jti: string;        // JWT ID for revocation
  scope: string[];    // Permission scopes
}
```

### Role-Based Access Control (RBAC)
- **User Roles:**
  - `owner`: Full account control
  - `member`: Limited household access
  - `readonly`: View-only household access
- **Resource Scoping:**
  - User-level: Personal data only
  - Household-level: Shared financial data
- **Permission Checks:** Every API request validates user permissions

## Row-Level Security Implementation

### Database RLS Policies

All tables implement comprehensive Row-Level Security policies:

```sql
-- Enable RLS on all user-scoped tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- User Data Isolation Policy
CREATE POLICY user_data_isolation ON users
  FOR ALL
  USING (id = current_setting('app.current_user_id')::uuid);

-- Debt Access Policy (includes household sharing)
CREATE POLICY debt_access_policy ON debts
  FOR ALL
  USING (
    -- User can access their own debts
    owner_scope = 'user' AND owner_id = current_setting('app.current_user_id')::uuid
    OR
    -- User can access shared household debts
    owner_scope = 'household' AND owner_id IN (
      SELECT household_id FROM household_members
      WHERE user_id = current_setting('app.current_user_id')::uuid
      AND permissions_json->>'debts' = 'read'
    )
  );

-- Expense Logging Policy (user-only, no sharing)
CREATE POLICY expense_user_only ON expenses
  FOR ALL
  USING (user_id = current_setting('app.current_user_id')::uuid);
```

### Backend Security Context

```typescript
// Security middleware sets user context for every request
@Injectable()
export class SecurityContext implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractToken(req);
    const payload = await this.jwtService.verify(token);

    // Set Postgres session variable for RLS
    await this.prisma.$executeRaw`SET app.current_user_id = ${payload.sub}`;

    // Add user context to request
    req.user = {
      id: payload.sub,
      email: payload.email,
      tier: payload.tier,
      permissions: await this.getUserPermissions(payload.sub)
    };

    next();
  }
}
```

## Privacy & Consent Management

### Data Minimization Principle
- **Collection Justification:** Every data field必须有明确的功能需求
- **Purpose Limitation:** Data only used for stated debt elimination purposes
- **Storage Limitation:** Automatic data purging based on retention policies
- **Accuracy:** Users can review and correct their financial data

### Consent Management
- **Granular Consent:** Separate consent for different data processing activities
- **Withdrawal Rights:** Users can withdraw consent at any time
- **Consent Versioning:** Track which consent version was agreed to
- **Consent History:** Complete audit trail of consent changes

```typescript
// Consent Schema
interface UserConsent {
  financial_data_processing: boolean;    // Required for app functionality
  analytics_usage: boolean;              // Optional, for app improvement
  marketing_communications: boolean;     // Optional, promotional content
  household_data_sharing: boolean;       // Optional, for couples/households
  third_party_research: boolean;         // Optional, anonymized research
  consent_version: string;               // Version of consent agreement
  consent_date: Date;                    // When consent was given
  ip_address: string;                    // For audit purposes
  user_agent: string;                    // For audit purposes
}
```

### Household Data Sharing
- **Explicit Opt-In:** Both users must explicitly agree to share financial data
- **Granular Controls:** Users can choose what to share (debts, goals, expenses)
- **Easy Revocation:** Either user can revoke sharing permissions instantly
- **Privacy by Default:** All financial data starts as private, user must opt-in to share

## Monitoring & Incident Response

### Comprehensive Audit Logging

All sensitive operations are logged with full context:

```typescript
interface AuditLog {
  id: string;
  user_id: string;
  action: string;              // "debt_created", "payment_logged", "account_accessed"
  resource_type: string;       // "debt", "expense", "goal"
  resource_id: string;         // UUID of affected resource
  old_values: object;          // Before state (for updates)
  new_values: object;          // After state
  ip_address: string;
  user_agent: string;
  timestamp: Date;
  session_id: string;
  risk_score: number;          // 1-10, based on action sensitivity
  location: {
    country: string;
    city: string;
  };
}
```

### Anomaly Detection & Alerts
- **Login Anomalies:** Unusual locations, devices, or time patterns
- **Data Access Patterns:** Sudden increases in data export or API usage
- **Financial Anomalies:** Large debt amounts, unusual payment patterns
- **AI Usage Anomalies:** Excessive or suspicious AI request patterns

### Incident Response Plan

**Severity Levels:**
- **Critical:** Data breach, system-wide outage
- **High:** Security vulnerability, significant data exposure
- **Medium:** Limited data exposure, service degradation
- **Low:** Minor security incident, isolated issue

**Response Timeline:**
- **Detection:** Automated monitoring + manual review
- **Assessment:** 1 hour for critical incidents
- **Containment:** 2 hours for critical incidents
- **Communication:** User notification within 72 hours for data breaches
- **Remediation:** Complete fix within 7 days for critical issues

## Compliance Framework

### GDPR Compliance
- **Lawful Basis:** Legitimate interest for debt elimination services
- **Data Subject Rights:**
  - Right to access: Self-service data export
  - Right to rectification: Edit financial data
  - Right to erasure: "Right to be forgotten" implementation
  - Right to portability: Structured data export (JSON + CSV)
  - Right to object: Opt-out of non-essential processing

### Data Portability Implementation
- **Export Formats:** JSON for technical users, CSV for spreadsheet import
- **Export Scope:** Complete financial history including debts, payments, goals
- **Automated Processing:** Ready for import into other financial tools
- **Metadata Inclusion:** Timestamps, data sources, processing history

### Right to Deletion (Hard Delete)
- **Grace Period:** 30-day soft delete for user reconsideration
- **Cascade Deletion:** Automatic removal of all related data
- **Verification:** Email confirmation required before permanent deletion
- **Exceptions:** Legal requirements for financial record retention

### SOC 2 Certification Roadmap
**Phase 1 (Pre-launch):**
- OWASP Top 10 vulnerability assessment and remediation
- Third-party penetration testing
- Security documentation and policies
- Employee background checks

**Phase 2 (6 months post-launch):**
- SOC 2 Type I audit preparation
- Control environment implementation
- Monitoring and logging enhancements
- Incident response procedure validation

**Phase 3 (12 months post-launch):**
- SOC 2 Type II audit
- Ongoing control monitoring
- Annual compliance reviews
- Continuous improvement process

## Bank Integration Security

### Plaid Security Controls
- **Read-Only Access:** No write permissions to user bank accounts
- **Limited Scope:** Only Transactions and Liabilities endpoints
- **Token Security:** Access tokens encrypted and stored securely
- **Webhook Verification:** All Plaid webhooks cryptographically verified

### Bank Data Handling
- **Minimal Data Retention:** Transaction data retained only as needed
- **Sensitive Data Masking:** Account numbers truncated in UI and logs
- **Secure Transmission:** All bank data transmitted via TLS 1.3
- **No Persistent Storage:** Raw bank responses not logged permanently

## Third-Party Risk Management

### Vendor Security Assessment
- **Due Diligence:** Security review before integrating any third-party service
- **Contractual Requirements:** Data processing agreements with all vendors
- **Regular Reviews:** Annual security assessments for critical vendors
- **Exit Strategies:** Data migration plans for vendor transitions

### API Security
- **Authentication:** All third-party APIs use dedicated service accounts
- **Rate Limiting:** Vendor-specific rate limits enforced
- **Error Handling:** Sensitive data never exposed in error messages
- **Monitoring:** Third-party API availability and performance tracking

## Security Testing & Validation

### Automated Security Testing
- **Static Analysis:** Code scanning for vulnerabilities (SAST)
- **Dynamic Analysis:** Runtime application security testing (DAST)
- **Dependency Scanning:** Third-party library vulnerability scanning
- **Infrastructure as Code:** Security validation for Terraform configs

### Manual Security Assessment
- **Penetration Testing:** Third-party security firm assessment
- **Code Review:** Security-focused code reviews for all changes
- **Architecture Review:** Regular security architecture assessments
- **Threat Modeling:** STRIDE threat model for new features

### Security Training
- **Developer Training:** OWASP Top 10, secure coding practices
- **Security Awareness:** Phishing prevention, data handling procedures
- **Incident Response:** Regular incident response tabletop exercises
- **Compliance Training:** GDPR, financial regulations, security best practices

---
*See: [AI & Ethics Guardrails](05_ai_and_ethics_guardrails.md) → [Architecture & Stack](02_architecture_and_stack.md) → [Data Model](03_data_model.md)*