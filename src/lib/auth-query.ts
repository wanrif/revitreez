import type { AuthSession } from '@/lib/auth-client'
import type { AuthRouterContext } from '@/lib/router-context'
import type { QueryClient } from '@tanstack/react-query'

import { authClient } from '@/lib/auth-client'
import queryClient from '@/lib/query-client'
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { SIGN_IN_ROUTE } from './auth-navigation'

export const authSessionQueryKey = ['auth', 'session'] as const

function createAuthClientError(
  message: string,
  error: {
    code?: string
    status?: number
    statusText?: string
  },
) {
  const authError = new Error(message) as Error & {
    code?: string
    status?: number
    statusText?: string
  }

  authError.code = error.code
  authError.status = error.status
  authError.statusText = error.statusText

  return authError
}

async function fetchAuthSession() {
  const response = await authClient.getSession()

  if (response.error) {
    throw createAuthClientError(response.error.message || 'Failed to fetch auth session', {
      code: response.error.code,
      status: response.error.status,
      statusText: response.error.statusText,
    })
  }

  return response.data ?? null
}

function shouldRetryAuthSession(failureCount: number, error: unknown): boolean {
  const status =
    typeof error === 'object' && error && 'status' in error && typeof error.status === 'number'
      ? error.status
      : undefined

  if (status === 401 || status === 403) {
    return false
  }

  return failureCount < 1
}

export const authSessionQueryOptions = queryOptions({
  queryKey: authSessionQueryKey,
  queryFn: fetchAuthSession,
  retry: shouldRetryAuthSession,
  staleTime: 60_000,
  refetchOnReconnect: true,
  refetchOnWindowFocus: true,
})

export function createAuthRouterContext(
  session: AuthSession | undefined,
  isLoading: boolean,
): AuthRouterContext {
  const resolvedSession = session ?? null

  return {
    session: resolvedSession,
    isAuthenticated: Boolean(resolvedSession),
    isLoading,
  }
}

export function getCachedAuthSession(queryClientInstance: QueryClient = queryClient) {
  return (queryClientInstance.getQueryData(authSessionQueryOptions.queryKey) ?? null) as AuthSession
}

export function setCachedAuthSession(
  session: AuthSession,
  queryClientInstance: QueryClient = queryClient,
) {
  queryClientInstance.setQueryData(authSessionQueryOptions.queryKey, session ?? null)
}

export async function invalidateAuthSession(queryClientInstance: QueryClient = queryClient) {
  await queryClientInstance.invalidateQueries({ queryKey: authSessionQueryOptions.queryKey })
}

export async function clearAuthSession(queryClientInstance: QueryClient = queryClient) {
  await queryClientInstance.cancelQueries({ queryKey: authSessionQueryOptions.queryKey })
  setCachedAuthSession(null, queryClientInstance)
}

export async function ensureAuthSession(queryClientInstance: QueryClient = queryClient) {
  return queryClientInstance.ensureQueryData(authSessionQueryOptions)
}

export async function refreshAuthSession(queryClientInstance: QueryClient = queryClient) {
  return queryClientInstance.fetchQuery({
    ...authSessionQueryOptions,
    staleTime: 0,
  })
}

export function useAuthSessionQuery(overrides?: { enabled?: boolean }) {
  return useQuery({ ...authSessionQueryOptions, ...overrides })
}

export function useAuthSessionState() {
  const query = useAuthSessionQuery()

  return {
    ...query,
    auth: createAuthRouterContext(query.data, query.isLoading),
  }
}

export function useSignOutMutation() {
  const queryClientInstance = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      const response = await authClient.signOut()

      if (response.error) {
        throw createAuthClientError(response.error.message || 'Sign-out failed', {
          code: response.error.code,
          status: response.error.status,
          statusText: response.error.statusText,
        })
      }
    },
    onMutate: async () => {
      const previousSession = getCachedAuthSession(queryClientInstance)

      await clearAuthSession(queryClientInstance)

      return { previousSession }
    },
    onError: (error, _variables, context) => {
      setCachedAuthSession(context?.previousSession ?? null, queryClientInstance)
      toast.error(error instanceof Error ? error.message : 'Sign-out failed')
    },
    onSuccess: () => {
      toast.success('Signed out successfully')
    },
    onSettled: async () => {
      await invalidateAuthSession(queryClientInstance)
      await navigate({ to: SIGN_IN_ROUTE, replace: true })
    },
  })
}
