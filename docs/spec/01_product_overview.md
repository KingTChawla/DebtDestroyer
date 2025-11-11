# 01) Product Overview

**LLM SUMMARY:**
- React Native cross-platform app (iOS + Android) for debt elimination using Dave Ramsey's Debt Snowball method
- AI Financial Coach with behavioral UX inspired by Duolingo's gamification
- 4-screen framework: Dashboard, Goals/Challenges, Expenses/Budgets, Settings/Profile
- Subscription monetization: Free/Pro/Lifetime tiers
- Privacy-first architecture with backend gateway pattern
- Core principles: Behavior > Math, smallest-to-largest payoff, no lending, user data protection

## Product Vision

A cross-platform React Native app that helps users **eliminate debt** using Dave Ramsey's **Debt Snowball** philosophy, enhanced with an **AI Financial Coach** and **Behavioral UX** inspired by *The Total Money Makeover* and *Duolingo's gamified motivation system*.

The app acts as a **daily AI companion** that guides users through financial awareness, spending habits, and debt payoff strategies in a **chat-like, emotionally intelligent, and gamified experience**.

## Core Architecture

**Architecture:** Simplified 4-screen framework designed to reduce cognitive load and enhance daily engagement.
**Monetization:** Subscription-based model with three tiers (Free / Pro / Lifetime).
**Core Principles:** Behavior > Math, smallest-to-largest payoff, no lending, privacy by design.

## Product Pillars

### 1. Intelligent Onboarding — Build a Complete Financial Profile
- Conversational AI-led onboarding process (voice or text) gathers: Income, debts, monthly expenses, subscriptions, and savings
- Personalized **Financial Snapshot** dashboard generated instantly
- AI analyzes data to create a **Debt Destruction Roadmap** (snowball-style)
- Includes emergency fund setup (target $1,000) before Snowball activation

### 2. AI Companion — Daily Money Dialogue
- User can log expenses by **talking** or **typing**, e.g., "Spent $8 on lunch"
- AI parses input, categorizes spending, and updates the **daily expense summary**
- Provides feedback, trends, and savings suggestions through natural conversation
- AI persona is tunable (tone, focus level, difficulty) to match user preferences

### 3. Gamified Motivation — Behavioral Finance Reinvented
- Duolingo-style **habit loop** with streaks, badges, confetti, and positive reinforcement
- User-defined goals ("Save $1,000 Emergency Fund") and system challenges ("No Coffee for 3 Days")
- XP, levels, and visual rewards for every financial win
- Designed for **active play mode** — high emotional engagement and dopamine-driven habit formation

### 4. Simplicity & Clarity — Four-Screen UX Framework
- **Dashboard (Home):** Passive review mode — instant awareness of debt, progress, and AI insights
- **Goals & Challenges:** Active play mode — gamified engagement with progress tracking
- **Expenses & Budgets:** Action mode — low-friction logging and budget management
- **Settings & Profile:** Control mode — personalization, integrations, and privacy settings

Each screen is cognitively optimized for a specific user mindset, reducing decision fatigue and enhancing usability.

### 5. Companion Mode (Couples & Households) [Future Phase]
- Link two profiles under one subscription
- Shared or separate finances, with optional visibility controls
- Shared progress dashboard and weekly "Money Stand-Up"

## Development Status

**Current Status:** Development environment setup complete (2025-11-05)
**Next Phase:** Phase 1: UI/UX System development
**Build System:** React Native CLI (bare workflow), TypeScript, OTA updates via CodePush

## Key Differentiators

1. **AI-First Financial Coaching:** Conversational interface vs. traditional banking apps
2. **Behavioral Science Focus:** Gamification and habit formation over pure financial tools
3. **Privacy by Design:** User data isolation, no selling, encrypted at rest and in transit
4. **Simplicity:** 4-screen framework reduces cognitive load compared to complex banking apps
5. **Ethical Guardrails:** AI scoped only to debt elimination, cost controls, rate limiting

---
*See: [Architecture & Stack](02_architecture_and_stack.md) → [Data Model](03_data_model.md) → [API Endpoints](04_api_endpoints.md)*