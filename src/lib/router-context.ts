import type { AuthSession } from '@/lib/auth-client'
import type { QueryClient } from '@tanstack/react-query'

export interface AuthRouterContext {
  session: AuthSession
  isAuthenticated: boolean
  isLoading: boolean
}

export interface RouterContext {
  auth: AuthRouterContext
  queryClient: QueryClient
}
