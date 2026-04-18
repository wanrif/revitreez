---
name: component-structure
description:
  Add or reorganize components using the repo's layouts/shared/ui structure and
  frontend conventions.
argument-hint: 'Describe the component, page section, or UI refactor'
---

# Component Structure

Use this skill when a task adds new UI components, refactors shared UI, or
decides where a component belongs inside `src/components`.

## Folder Roles

- `src/components/layouts`: app shell and route-level structure such as
  `MainLayout`, navigation, providers, and error boundaries.
- `src/components/shared`: reusable building blocks with behavior or broad app
  reuse such as buttons, inputs, loaders, skeletons, and toaster wrappers.
- `src/components/ui`: smaller presentational helpers that support the shared
  layer or app chrome.

## Core Rules

- Use the `@/` alias for imports.
- Prefer barrel imports from `@/components/layouts`, `@/components/shared`, and
  `@/components/ui` when available.
- Match existing naming: PascalCase component names and folder exports through
  `index.ts`.
- Use Tailwind utilities inline and use `cn()` from `@/lib/utils` for
  conditional classes.
- Reuse the wrapper-based `Skeleton` component instead of hand-building one-off
  placeholder layouts when possible.
- Preserve the existing app shell and provider wiring instead of introducing a
  parallel layout system.

## Placement Heuristics

- Put route shell concerns in `layouts`.
- Put generic interactive primitives in `shared`.
- Put small mostly-presentational helpers in `ui`.
- If a component is only for one route and is not an obvious shared primitive,
  keep it close to that route or feature instead of promoting it too early.

## Implementation Checklist

1. Choose the narrowest correct home for the component.
2. Reuse existing shared primitives before adding duplicates.
3. Export through the folder barrel if the component is intended for reuse.
4. Keep class composition consistent with `cn()` and the current Tailwind style.
5. Add loading, empty, and error presentation with the existing shared
   components where relevant.

## References

- [README.md](../../../README.md)
- [src/components/README.md](../../../src/components/README.md)
- [src/components/layouts/providers.tsx](../../../src/components/layouts/providers.tsx)
- [src/components/layouts/main-layout.tsx](../../../src/components/layouts/main-layout.tsx)
- [src/components/shared/index.ts](../../../src/components/shared/index.ts)
- [src/components/ui/index.ts](../../../src/components/ui/index.ts)
- [src/lib/utils.ts](../../../src/lib/utils.ts)
