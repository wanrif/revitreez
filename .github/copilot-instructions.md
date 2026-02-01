# RevitReez AI Coding Guide

## Tech Stack

- **Runtime**: Bun (use `bun`, not `npm`)
- **Frontend**: React 19 + TypeScript + Vite 7
- **Routing**: TanStack Router (file-based, auto-generated `routeTree.gen.ts`)
- **State**: TanStack Query + TanStack Form + Zustand
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` (no config file needed)
- **HTTP**: Custom Axios wrapper (`src/services/api.ts`)

## Commands

```bash
bun dev          # Dev server (VITE_PORT or 5173)
bun run build    # TypeScript check + production build
bun run lint     # ESLint
bun run format   # Prettier (auto-sorts imports + Tailwind classes)
```

## Critical Patterns

### Imports — Always use `@/` alias

```typescript
import { Button } from '@/components/ui/button'
import { get } from '@/services/api'
```

### API Requests — Never import axios directly

```typescript
import { get, post, put, patch, del, getPaginated, upload } from '@/services/api'

// All responses are ResponseData<T>: { data: T, message: string, status: string }
const { data: user } = await get<User>(`/users/${id}`)

// Pagination returns PaginatedResponseData<T> with total, page, pageSize
const users = await getPaginated<User>('/users', { page: 1, pageSize: 20 })
```

See [src/services/API_GUIDE.md](../src/services/API_GUIDE.md) for file uploads,
error handling, and full examples.

### Routing — File-based in `src/routes/`

| File         | Purpose                                                    |
| ------------ | ---------------------------------------------------------- |
| `__root.tsx` | Root layout, global meta, `notFoundComponent`              |
| `_app.tsx`   | Layout route (wraps children with `MainLayout`)            |
| `_app/*.tsx` | Pages under MainLayout (e.g., `_app/users.tsx` → `/users`) |

Creating a route:

```typescript
// src/routes/_app/users.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/users')({
  component: UsersPage,
})
```

The router plugin auto-regenerates `routeTree.gen.ts` — never edit it manually.

### Data Fetching with TanStack Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query'
import { get, post } from '@/services/api'

// Fetch
const { data } = useQuery({
  queryKey: ['users', id],
  queryFn: () => get<User>(`/users/${id}`),
})

// Mutate
const mutation = useMutation({
  mutationFn: (data: CreateUserDto) => post<User, CreateUserDto>('/users', data),
})
```

### Components — Use `cn()` for conditional classes

```typescript
import { cn } from '@/lib/utils'

<div className={cn('base-class', isActive && 'active-class', className)} />
```

### Type Helpers (`src/types/api.ts`)

```typescript
type CreateDto<T> = Omit<T, 'id' | keyof Timestamps>  // For create payloads
type UpdateDto<T> = Partial<CreateDto<T>>              // For update payloads
type ApiItem<T> = ResponseData<T>                      // Single item response
type ApiList<T> = ResponseData<T[]>                    // List response
```

## Architecture

```
src/
├── routes/           # File-based routing (auto-generates routeTree.gen.ts)
├── components/
│   ├── layouts/      # MainLayout, Navbar, Providers
│   └── ui/           # Reusable components (Button, Loader, etc.)
├── services/
│   ├── api.ts        # Typed HTTP wrappers (get, post, etc.)
│   └── request.ts    # Axios instance config (interceptors, base URL)
├── lib/
│   ├── router.tsx    # Router config (error boundary, pending state)
│   └── query-client.tsx
├── types/            # API types and DTOs
└── stores/           # Zustand stores (when needed)
```

## Key Conventions

- **Providers**: `src/components/layouts/providers.tsx` wraps app with
  ThemeProvider, QueryClientProvider, and devtools
- **Error handling**: Router has default error component; API throws `ApiError`
  class
- **Pending states**: Router shows `<Loader />` during navigation
- **Theme**: `next-themes` with `class` attribute and `theme` storage key
- **Forms**: TanStack Form with Zod validation (devtools enabled)
- **ESLint**: Flat config with TanStack Query/Router plugins and Prettier
  integration
