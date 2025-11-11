# Debt Destroyer - Master Documentation Index

**Purpose:** Comprehensive index of all modular documentation for the Debt Destroyer project. This is your starting point for understanding any aspect of the system.

## Quick Start

### For New Development Sessions
👉 **Start here:** `/docs/context/context_loader.md` - Session setup and context establishment

### For Project Overview
👉 **Read this:** `/docs/context/core_summary.md` - Complete project overview in 1,500-2,000 tokens

---

## 📋 Specification Modules

### Core Product & Architecture

#### [01) Product Overview](./01_product_overview.md)
**Product vision, value proposition, and core features**
- React Native cross-platform app for debt elimination
- 4-screen cognitive architecture design
- AI Financial Coach with behavioral UX
- Dave Ramsey's Debt Snowball methodology
- Subscription monetization model
- Key differentiators and competitive positioning

#### [02) Architecture & Tech Stack](./02_architecture_and_stack.md)
**Complete technical architecture and technology choices**
- 3-layer architecture: Mobile → Backend → External APIs
- React Native CLI setup with TypeScript
- NestJS backend with PostgreSQL + Prisma ORM
- AWS infrastructure and security patterns
- Development environment status and setup
- CI/CD pipeline and deployment strategy

#### [03) Data Model](./03_data_model.md)
**Complete database schema and entity relationships**
- User and Household management
- Financial data (debts, accounts, transactions)
- Gamification entities (XP, streaks, quests)
- Row-Level Security implementation
- Field encryption and data privacy
- Audit trails and compliance considerations

#### [04) API Endpoints](./04_api_endpoints.md)
**REST API design with security and authentication**
- JWT authentication and authorization
- Complete endpoint specifications
- Rate limiting and cost controls
- Error handling patterns
- Data isolation and security
- API response standards

### Advanced Systems & Features

#### [05) AI & Ethics Guardrails](./05_ai_and_ethics_guardrails.md)
**AI implementation with ethical constraints and cost controls**
- AI scope limitation and prompt guardrails
- Rate limiting per subscription tier
- PII sanitization and privacy controls
- Cost monitoring and abuse detection
- Persona system and tone customization
- Compliance and audit requirements

#### [06) Security & Privacy](./06_security_and_privacy.md)
**Comprehensive security architecture and compliance framework**
- Privacy-first design principles
- Backend gateway security pattern
- Data encryption (at rest and in transit)
- GDPR compliance and data rights
- Row-Level Security policies
- Incident response and monitoring

#### [07) UI/UX Framework](./07_ui_ux_framework.md)
**Design system, components, and cognitive architecture**
- Complete design tokens (colors, typography, spacing)
- Component library specifications
- 4-screen cognitive framework mapping
- Micro-interactions and animations
- Accessibility and inclusive design
- Behavioral psychology integration

#### [08) Gamification System](./08_gamification_system.md)
**Behavioral finance gamification with psychology-driven design**
- Positive reinforcement mechanics
- XP and leveling system
- Streak tracking and milestones
- Challenge and quest engine
- AI-powered motivation and nudges
- Social and competitive elements

#### [09) Build Phases & Roadmap](./09_build_phases_and_roadmap.md)
**12-phase development plan with MVP strategy**
- Current Phase 1 progress (45% complete)
- MVP scope and manual entry strategy
- Post-MVP feature rollout plan
- Testing and quality assurance strategy
- Timeline and resource requirements
- Success metrics and validation criteria

---

## 🎯 Context & Session Management

### Development Session Setup

#### [Core Summary](../context/core_summary.md)
**Complete project overview for AI assistants and new developers**
- 1,500-2,000 token comprehensive summary
- Architecture overview and key decisions
- Current development status and roadmap
- Technology stack and constraints
- Quick start guide and reference materials

#### [Context Loader](../context/context_loader.md)
**Reusable prompt for establishing development session context**
- Session setup and alignment tool
- Project constraints and guidelines
- Current development priorities
- File structure and navigation
- Quality checklists and common issues

#### [Last Development Log](../context/last_devlog.md)
**Previous session progress and continuity**
- Session accomplishments and outcomes
- Current development status
- Next session preparation
- Technical decisions and solutions
- Development queue and priorities

---

## 📝 Development Logs

### Monthly Development Records

#### [November 2025](../devlogs/devlog_2025-11.md)
**Documentation modularization and architecture planning**
- Session 1: Complete specification reorganization
- Documentation architecture redesign
- Modular system implementation
- Context management setup
- Development readiness assessment

---

## 🗂️ File Structure Reference

### Documentation Organization
```
docs/
├── spec/                     # Technical specifications
│   ├── 00_index.md          # This file - master index
│   ├── 01_product_overview.md
│   ├── 02_architecture_and_stack.md
│   ├── 03_data_model.md
│   ├── 04_api_endpoints.md
│   ├── 05_ai_and_ethics_guardrails.md
│   ├── 06_security_and_privacy.md
│   ├── 07_ui_ux_framework.md
│   ├── 08_gamification_system.md
│   └── 09_build_phases_and_roadmap.md
├── context/                  # Session management
│   ├── core_summary.md      # Project overview
│   ├── context_loader.md    # Session setup prompt
│   └── last_devlog.md       # Previous session
└── devlogs/                  # Development logs
    └── devlog_2025-11.md    # Current month
```

### Code Structure Reference
```
src/
├── screens/                  # 4-screen architecture
│   ├── Dashboard/           # Passive review mode
│   ├── GoalsChallenges/     # Active play mode
│   ├── ExpensesBudgets/     # Action mode
│   └── SettingsProfile/     # Control mode
├── components/               # Reusable UI components
├── theme/                   # Design system tokens
├── navigation/              # 4-screen navigation
├── types/                   # TypeScript definitions
├── utils/                   # Helper functions
└── services/                # API clients
```

---

## 🚀 Quick Reference Guides

### For Different Development Needs

#### 🎨 **UI/UX Development**
Start with: [07) UI/UX Framework](./07_ui_ux_framework.md)
Reference: Design system tokens in `/src/theme/`
Components: Reusable library in `/src/components/`

#### 🔧 **Backend Development**
Start with: [02) Architecture & Tech Stack](./02_architecture_and_stack.md)
API Design: [04) API Endpoints](./04_api_endpoints.md)
Database: [03) Data Model](./03_data_model.md)

#### 🤖 **AI Feature Development**
Start with: [05) AI & Ethics Guardrails](./05_ai_and_ethics_guardrails.md)
Context: [07) UI/UX Framework](./07_ui_ux_framework.md) (AI components)
Implementation: Backend gateway pattern in architecture docs

#### 🔒 **Security & Compliance**
Start with: [06) Security & Privacy](./06_security_and_privacy.md)
Implementation: RLS policies in data model
API Security: Authentication patterns in API endpoints

#### 🎮 **Gamification Development**
Start with: [08) Gamification System](./08_gamification_system.md)
UI Components: Progress bars, XP counters, badges
Backend: Gamification APIs and data structures

#### 📋 **Project Planning**
Start with: [09) Build Phases & Roadmap](./09_build_phases_and_roadmap.md)
Current Status: Phase 1 (45% complete)
Timeline: ~7 months to full product

---

## 🎯 Current Development Focus

### Phase 1: Core UX System & 4-Screen Framework (45% Complete)

#### ✅ **Completed**
- Development environment setup
- Complete design system
- Basic component library
- Navigation foundation
- Welcome and onboarding intro screens

#### 🔄 **In Progress**
- Update MainTabNavigator from 5 tabs to 4 tabs
- Build remaining onboarding screens
- Implement AI conversational input component
- Create gamification components

#### 📋 **Next Session Priorities**
1. Navigation system update (4-screen framework)
2. Dashboard screen implementation
3. Goals & Challenges gamification
4. AI ConversationalInput component

---

## 🔍 Navigation Tips

### Finding Information Quickly

**For Technical Specifications:**
- Browse the numbered spec modules (01-09) for domain-specific information
- Each module has an "LLM SUMMARY" at the top for quick understanding
- Cross-references link related topics across modules

**For Development Sessions:**
- Always start with `/docs/context/context_loader.md`
- Review `/docs/context/last_devlog.md` for previous session context
- Use `/docs/context/core_summary.md` for project refreshers

**For Implementation Details:**
- UI/UX: Module 7 for design patterns and components
- Backend: Modules 2, 3, 4 for architecture and APIs
- Features: Modules 5, 8 for AI and gamification
- Planning: Module 9 for roadmap and phases

### Document Conventions

- **📋 Sections:** Navigation and organization
- **✅ Completed:** Finished work or confirmed status
- **🔄 In Progress:** Current work being done
- **📅 Next Steps:** Planned future work
- **🎯 Focus Areas:** Primary development priorities
- **🔍 Tips:** Guidance and best practices

---

## 📞 Getting Started

### For New Team Members
1. Read [Core Summary](../context/core_summary.md) for project overview
2. Review [Product Overview](./01_product_overview.md) for context
3. Check [Current Phase](./09_build_phases_and_roadmap.md) for development status
4. Use [Context Loader](../context/context_loader.md) for session setup

### For Returning Developers
1. Check [Last Devlog](../context/last_devlog.md) for previous session
2. Review current phase progress in [Build Phases](./09_build_phases_and_roadmap.md)
3. Use [Context Loader](../context/context_loader.md) for session setup
4. Reference relevant spec modules for current task

### For AI Assistants
1. Start with [Context Loader](../context/context_loader.md) for session setup
2. Use [Core Summary](../context/core_summary.md) for project understanding
3. Reference specific modules for domain knowledge
4. Follow architectural constraints and security guidelines

---

## 🎨 Design & UI Reference

#### [Style Guide](../Style_Guide.md)
**Complete design system and component specifications**
- React Native design system with 4-screen cognitive architecture
- Professional color palette with light/dark variants and theme-aware implementation
- Complete Helvetica Neue typography system following iOS standards
- Modular glass-morphism GradientCard system with screen-matching base colors
- Comprehensive component library patterns and accessibility guidelines

#### [React Native Environment Setup](../React_Native_Dev_Environment_Setup_Windows.md)
**Complete development environment setup guide for Windows 11**
- React Native CLI setup with Android Studio integration
- Verified installation status for all required components
- Step-by-step configuration for iOS cloud builds
- IDE integration and testing workflow instructions

---

**📌 Bookmark this file as your primary navigation hub for all Debt Destroyer documentation.**