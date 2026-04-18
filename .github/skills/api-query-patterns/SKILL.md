---
name: api-query-patterns
description:
  Add data fetching and mutations with the repo's API wrappers and TanStack
  Query conventions.
argument-hint: 'Describe the data flow, endpoint, or query/mutation you need'
---

# API Query Patterns

Use this skill when a task adds API reads, writes, pagination, uploads, or
TanStack Query integration.

## Core Rules

- Import request helpers from `@/services/api`; never import `axios` directly in
  feature code.
- Keep transport details in the API wrapper layer and keep feature components
  focused on query keys, UI states, and mutation flows.
- Expect helpers such as `get`, `post`, `put`, `patch`, `del`, and `upload` to
  return `ResponseData<T>`.
- Expect `getPaginated<T>` to return `PaginatedResponseData<T>`.
- Handle failures through `ApiError` instead of ad hoc response-shape checks.

## Query Patterns

- Use stable array query keys.
- Keep query functions thin and call the existing API wrappers.
- Read payloads from `response.data` for standard responses.
- For paginated endpoints, use `getPaginated` and consume the returned paging
  metadata directly.
- Prefer TanStack Query for server state rather than route-local `useEffect`
  fetching.

## Mutation Patterns

- Use `useMutation` for writes and keep request bodies typed.
- After successful writes, invalidate or refetch the affected query keys rather
  than manually synchronizing many UI states.
- Reuse toast/error patterns already present in auth and route code when the
  feature needs user feedback.

## Implementation Checklist

1. Define or reuse the DTO and response types from `src/types`.
2. Call the appropriate helper from `@/services/api`.
3. Return typed data through TanStack Query with stable query keys.
4. Handle loading, empty, and error states in the component.
5. Invalidate related queries after successful mutations.

## References

- [README.md](../../../README.md)
- [src/services/API_GUIDE.md](../../../src/services/API_GUIDE.md)
- [src/services/api.ts](../../../src/services/api.ts)
- [src/services/request.ts](../../../src/services/request.ts)
- [src/types/api.ts](../../../src/types/api.ts)
- [src/lib/auth-query.ts](../../../src/lib/auth-query.ts)
