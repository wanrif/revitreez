import type { AuthSession } from '@/lib/auth-client'

export interface AuthRouterContext {
  session: AuthSession
  isAuthenticated: boolean
  isLoading: boolean
}

export interface RouterContext {
  auth: AuthRouterContext
}
