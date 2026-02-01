# API Fetching System Guide

This project uses a robust, type-safe HTTP client wrapper around [Axios](https://axios-http.com/). It provides a standardized way to make API requests, handle errors, and manage response types.

## 📁 Structure

- **`src/services/request.ts`**: The core Axios instance configuration. Handles interceptors, base URLs, and global request/response logic (logging, auth tokens, etc.).
- **`src/services/api.ts`**: Generic wrapper functions (`get`, `post`, `put`, `delete`, etc.) that provide type safety and standardized error handling.
- **`src/types/api.ts`**: TypeScript interfaces for standardizing API responses, pagination, and error objects.

## 🚀 Getting Started

### Configuration

The base URL is configured in `src/services/request.ts` using Vite environment variables. Ensure your `.env` file contains:

```env
VITE_API_BASE_URL=https://api.your-domain.com/v1
```

## 🛠 Usage

You can import individual methods or the `api` object from `@/services/api`.

### 1. Basic GET Request

Use the `get` function to fetch data. It automatically unwraps the `data` property from the Axios response.

```typescript
import { get } from '@/services/api'
import type { User } from '@/types/user'

async function fetchUser(id: string) {
  // The generic <User> types the response data
  const user = await get<User>(`/users/${id}`)
  console.log(user.name)
}
```

### 2. POST Request (Create)

Use `post` for creating resources. You can specify types for both the Response and the Payload.

```typescript
import { post } from '@/services/api'
import type { User, CreateUserDto } from '@/types/user'

async function createUser(newUser: CreateUserDto) {
  // post<ResponseType, PayloadType>(url, data)
  const createdUser = await post<User, CreateUserDto>('/users', newUser)
  return createdUser
}
```

### 3. PUT & PATCH (Update)

```typescript
import { put, patch } from '@/services/api'

// Full update
await put<User>('/users/123', { name: 'New Name', age: 30 })

// Partial update
await patch<User>('/users/123', { name: 'New Name' })
```

### 4. DELETE

```typescript
import { del } from '@/services/api'

await del<{ success: boolean }>('/users/123')
```

### 5. Pagination

The `getPaginated` helper simplifies handling paginated lists. It accepts a params object that is automatically serialized into a query string.

```typescript
import { getPaginated } from '@/services/api'
import type { User } from '@/types/user'

async function listUsers(page = 1) {
  const response = await getPaginated<User>('/users', {
    page,
    pageSize: 20,
    search: 'john',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  // Response is typed as PaginatedResponseData<User>
  console.log(response.data)  // User[]
  console.log(response.total) // number
  console.log(response.page)  // number
}
```

### 6. File Upload

Use the `upload` helper for `multipart/form-data`.

```typescript
import { upload } from '@/services/api'

async function uploadAvatar(file: File) {
  const formData = new FormData()
  formData.append('avatar', file)

  const result = await upload<{ url: string }>('/users/avatar', formData, (progress) => {
    console.log(`Upload is ${progress.loaded} bytes`)
  })

  return result.url
}
```

### 7. File Download

Downloads a file and triggers the browser's save dialog.

```typescript
import { download } from '@/services/api'

// Filename is optional; system tries to read Content-Disposition header first
await download('/reports/export-2024.pdf', 'my-report.pdf')
```

## 🛡️ Type Safety

Define your types in `src/types/api.ts` or domain-specific files. The system uses these standard wrappers:

```typescript
// Standard Response
interface ResponseData<T> {
  data: T
  message: string
  status: string
}

// Paginated Response
interface PaginatedResponseData<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  // ...
}
```

## ⚠️ Error Handling

Errors are caught and re-thrown as `ApiError` instances. You can catch them in your components or services.

```typescript
import { ApiError } from '@/services/api'

try {
  await get('/risky-endpoint')
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}: ${error.message}`)

    // Access structured error data from backend
    if (error.data) {
      console.log('Validation errors:', error.data.details)
    }
  }
}
```

## ⚙️ Interceptors (`request.ts`)

- **Request**: Logs requests in dev mode. Good place to attach `Authorization` headers (commented out example included).
- **Response**: Logs responses in dev mode. Handles global errors like `401 Unauthorized` (token refresh logic placeholder included) or `403 Forbidden`.

## ⚡ Integration with TanStack Query

This project includes `@tanstack/react-query` for powerful server state management. It works seamlessly with our API helpers.

### 1. Setup

Ensure your app is wrapped in `QueryClientProvider` (usually in `src/main.tsx` or `src/App.tsx`).

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
    </QueryClientProvider>
  )
}
```

### 2. Fetching Data (useQuery)

Use `get` inside the `queryFn`.

```typescript
import { useQuery } from '@tanstack/react-query'
import { get } from '@/services/api'
import type { User } from '@/types/user'

export function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => get<User>(`/users/${userId}`),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>User: {data?.name}</div>
}
```

### 3. Mutations (useMutation)

Use `post`, `put`, or `delete` inside `mutationFn`.

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { post } from '@/services/api'
import type { User, CreateUserDto } from '@/types/user'

export function CreateUserForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newUser: CreateUserDto) => post<User, CreateUserDto>('/users', newUser),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleSubmit = (data: CreateUserDto) => {
    mutation.mutate(data)
  }

  return (
    // ... form implementation
    <button onClick={() => handleSubmit({ name: 'John', email: 'john@example.com' })}>
      Create User
    </button>
  )
}
```

### 4. Pagination

Combine `getPaginated` with `useQuery` and `keepPreviousData` (or `placeholderData`).

```typescript
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getPaginated } from '@/services/api'
import { useState } from 'react'
import type { User } from '@/types/user'

export function UserList() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getPaginated<User>('/users', { page }),
    placeholderData: keepPreviousData, // Keep showing old data while fetching new page
  })

  return (
    <div>
      {data?.data.map(user => <div key={user.id}>{user.name}</div>)}

      <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(old => old + 1)} disabled={!data || page * data.pageSize >= data.total}>
        Next
      </button>
    </div>
  )
}
```
