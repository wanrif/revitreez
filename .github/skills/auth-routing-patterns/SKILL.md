---
name: auth-routing-patterns
description:
  Add or modify auth-sensitive routes using the repo's TanStack Router, Better
  Auth, and TanStack Query patterns.
argument-hint: 'Describe the route or auth flow you are adding or changing'
---

# Auth Routing Patterns

Use this skill when a task adds or changes sign-in, sign-out, guest-only pages,
protected pages, or anything that depends on the current session.

## Core Rules

- Keep auth state owned by `src/lib/auth-query.ts`.
- Keep router auth context derived in `src/App.tsx`; do not introduce a second
  auth store.
- Protect authenticated pages with `beforeLoad: requireAuth`.
- Keep guest-only pages behind `beforeLoad: requireGuest`.
- After auth state changes, refresh or invalidate the auth session query so the
  app-wide router context stays in sync.

## Route Patterns

- Protected app pages belong under `src/routes/_app/*.tsx` and usually use
  `createFileRoute('/_app/...')` with `beforeLoad: requireAuth`.
- Guest-only entry points such as `src/routes/sign-in.tsx` should use
  `beforeLoad: requireGuest`.
- Preserve redirect handling. If a route redirects unauthenticated users, carry
  the destination through the `redirect` search param and sanitize it before
  navigation.

## Session Patterns

- Read session state with `useAuthSessionQuery()` or `useAuthSessionState()`.
- Use `refreshAuthSession`, `invalidateAuthSession`, or `clearAuthSession`
  helpers from `src/lib/auth-query.ts` instead of re-implementing session cache
  updates.
- Do not call auth client session APIs directly from multiple feature components
  when the existing query helpers already cover the case.
- Preserve the `router.invalidate()` flow in `src/App.tsx`; do not bypass it
  with route-local workarounds.

## Implementation Checklist

1. Put the route in the correct file-based location under `src/routes`.
2. Choose `requireAuth` or `requireGuest` in `beforeLoad` if the route depends
   on session state.
3. Use the auth-query helpers for reading or refreshing session state.
4. Keep post-auth navigation aligned with the sanitized redirect path.
5. Reuse shared UI components from `@/components/shared` for forms, loading, and
   feedback.

## References

- [README.md](../../../README.md)
- [src/lib/auth-query.ts](../../../src/lib/auth-query.ts)
- [src/lib/auth-route-guards.ts](../../../src/lib/auth-route-guards.ts)
- [src/App.tsx](../../../src/App.tsx)
- [src/routes/sign-in.tsx](../../../src/routes/sign-in.tsx)
- [src/routes/\_app/dashboard.tsx](../../../src/routes/_app/dashboard.tsx)
