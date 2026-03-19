---
name: ui-ux-design
description:
  'Create or review UI and UX with a clear visual direction, strong hierarchy,
  responsive layouts, accessible interactions, and implementation-ready
  guidance. Use when designing pages, dashboards, forms, navigation, landing
  sections, or frontend polish and refactors.'
argument-hint: 'Describe the screen, flow, or component to design or review'
---

# UI/UX Design Principles And Best Practices

Use this skill when the task is not just to make a screen functional, but to
make it intentional, usable, and implementation-ready.

This workspace already expects frontend work to avoid generic layouts, preserve
existing patterns when they exist, and produce interfaces that hold up on
desktop and mobile. Treat this skill as the workflow for turning that
expectation into concrete design decisions across both product UI and marketing
surfaces.

## When To Use

- Designing a new page, section, component, or user flow
- Refreshing an existing UI without breaking the product's visual language
- Reviewing UI for hierarchy, clarity, consistency, and usability gaps
- Adding form flows, empty states, loading states, navigation, or dashboards
- Designing hero sections, landing pages, and promotional content with a
  stronger visual identity
- Converting vague design direction into implementation-ready frontend work

## Outcomes

The result should produce:

- A clear visual direction instead of a generic default layout
- A structure that matches the user's task flow and content priority
- Responsive behavior that remains coherent across mobile and desktop
- Accessible interaction patterns with obvious states and affordances using
  practical baseline checks
- Implementation guidance that fits the existing React, Tailwind, and router
  setup

## Procedure

1. Define the screen goal. Clarify the page or component's primary job, the main
   user action, and the most important information that must be visible
   immediately.

2. Identify the context. Check whether the work extends an existing pattern or
   introduces a new visual direction. If the workspace already has an
   established layout, navigation, or component pattern, preserve it. If the
   task is a standalone marketing or showcase surface, create a stronger visual
   identity.

3. Build the information hierarchy. Decide what the user should notice first,
   second, and third. Reduce competing focal points. Group related controls and
   content together. Separate primary actions from secondary actions.

4. Choose the visual direction. Pick a deliberate combination of typography,
   spacing rhythm, color system, surface treatment, and motion. Avoid
   interchangeable defaults. Prefer one strong theme over several weak ideas
   mixed together.

5. Design interaction states. Define hover, focus, active, disabled, loading,
   empty, error, and success states where relevant. Make controls feel
   interactive before the user clicks them. Ensure critical actions remain
   obvious even in edge states.

6. Validate responsiveness early. Check the layout at small, medium, and large
   widths. Reflow content instead of merely shrinking it. Protect tap targets,
   readable line lengths, spacing, and visual balance.

7. Validate accessibility. Ensure text contrast, keyboard focus visibility,
   semantic structure, descriptive labels, and sensible motion. Use motion to
   support orientation, not as decoration that competes with tasks.

8. Translate the design into this codebase. Follow the existing component,
   routing, provider, and styling patterns. Use the `@/` alias, `cn()` for
   conditional classes, and existing shared/layout components where possible. Do
   not introduce parallel styling systems or bypass the existing app structure.

9. Review before finalizing. Confirm the design is visually distinct, usable,
   and consistent with the task. Prefer a minimal implementation that achieves a
   strong result over a large diff filled with decorative complexity.

## Decision Rules

### New Surface Vs Existing Surface

- If the task changes an existing product area, preserve the current design
  language and improve within its constraints.
- If the task creates a new hero, landing section, campaign page, or showcase
  screen, push harder on visual identity.

### Dense Data Vs Guided Flow

- For dashboards or data-heavy views, prioritize scanability, grouping, filters,
  and comparison.
- For forms, onboarding, and task flows, prioritize progression, clarity,
  validation feedback, and reduced cognitive load.

### Utility Vs Brand Expression

- For operational screens, favor clarity, speed, and low-friction interaction.
- For marketing or promotional screens, favor stronger typography, composition,
  atmosphere, and motion while keeping calls to action obvious.

## Design Principles

### Hierarchy

- One primary focal point per section
- Clear headline-to-supporting-text relationship
- Use spacing, scale, and contrast before adding extra decoration

### Layout

- Build sections with intentional rhythm and whitespace
- Avoid crowded edges and accidental misalignment
- Use containers, columns, and grouping to make scanning easier

### Typography

- Choose expressive, purposeful type instead of falling back to generic defaults
- Limit the number of type treatments so the hierarchy stays readable
- Keep body copy comfortable to scan and headlines concise

### Color And Surfaces

- Define a palette with clear semantic roles: background, surface, text, accent,
  border, status
- Avoid default purple-on-white aesthetics unless the product already uses them
- Use gradients, texture, contrast shifts, or shape language to add depth where
  appropriate

### Components And Controls

- Primary actions should stand out immediately
- Secondary actions should be available without visually competing with
  primaries
- Inputs need obvious labels, help text, validation, and error recovery

### Motion

- Use a small number of meaningful transitions
- Prefer motion that explains state changes, hierarchy, or navigation
- Avoid constant animation or ornamental movement that distracts from tasks

### Content And UX Writing

- Labels should be specific, short, and action-oriented
- Empty states should explain what happened and what to do next
- Error states should help the user recover, not just report failure

## Implementation Notes For This Workspace

- Preserve the route structure under `src/routes` and never edit
  `src/routeTree.gen.ts`.
- Keep designs consistent with `MainLayout`, the shared providers, and the
  existing app shell.
- Use Tailwind classes in the existing style and let the formatter handle
  Tailwind class ordering.
- Reuse shared components where that improves consistency, but do not force
  reuse if a new UI abstraction is genuinely needed.
- When adding frontend code, prefer minimal diffs and keep public APIs stable
  unless the task requires a change.

## Completion Checklist

Before finishing, verify that the result:

- Has an obvious primary action or focal point
- Reads clearly at mobile and desktop sizes
- Includes relevant loading, empty, error, and disabled states
- Uses accessible contrast and visible focus treatment
- Feels intentional rather than template-generated
- Fits the surrounding product instead of looking like a separate app
- Can be implemented cleanly in the current React and Tailwind setup

## Output Expectations

When using this skill, provide:

1. The chosen visual direction and why it fits the task
2. The layout and hierarchy decisions
3. The interaction and state design decisions
4. The accessibility and responsive considerations
5. The implementation plan or code changes needed
