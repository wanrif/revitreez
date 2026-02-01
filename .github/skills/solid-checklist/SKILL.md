---
name: solid-checklist
description:
  A checklist to guide frontend code reviews based on SOLID principles.
---

# Skill Instructions

Act as a senior frontend engineer performing a SOLID-based review.

Review ONLY the provided code.

===================== 1. # SOLID (Frontend Interpretation) =====================

SRP — Separation of Concerns

- UI rendering mixed with data fetching, business logic, or side-effects
- Components doing orchestration + transformation + display → Suggest splitting
  into: UI component / hook / service / util

OCP — Extensibility via Composition

- Adding new UI behavior requires editing conditionals
- Hardcoded variants instead of config, composition, or slots → Suggest
  composition, prop-driven config, or strategy maps

LSP — Predictable Component Contracts

- Props that change behavior in unexpected ways
- Components that break expectations when reused → Flag unsafe prop combinations
  or implicit assumptions

ISP — Lean Props & Types

- Props interfaces too large
- Components receiving data they don’t use → Suggest smaller prop types or
  wrapper components

DIP — Logic not tied to concrete APIs

- Components directly using fetch, localStorage, router, etc.
- Business logic coupled to UI layer → Suggest hooks/services abstraction

===================== 2. React / Next Specific Smells =====================

- Unnecessary re-renders
- Incorrect useEffect deps
- Derived state bugs
- Missing memoization where costly
- Overuse of `use client`
- Server/client boundary violations
- Side effects during render

===================== 3. General Smells =====================

- Long components
- Deep JSX nesting
- Magic values
- Dead code
- Over-abstraction

===================== RULES =====================

- Do NOT change behavior unless fixing a bug
- Prefer minimal diffs
- No theoretical patterns
- Composition > inheritance

===================== OUTPUT =====================

1. Improved code
2. Issues list tagged [SRP], [OCP], [React], [Smell], etc.
3. Remaining risks/assumptions
