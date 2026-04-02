import type { AuthSession } from '@/lib/auth-client'
import type { QueryClient } from '@tanstack/react-query'

import { authClient } from '@/lib/auth-client'
import queryClient from '@/lib/query-client'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const authSessionQueryKey = ['auth', 'session'] as const

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
  queryFn: async () => {
    const response = await authClient.getSession()

    if (response.error) {
      const error = new Error(response.error.message || 'Failed to fetch auth session') as Error & {
        code?: string
        status?: number
        statusText?: string
      }

      error.code = response.error.code
      error.status = response.error.status
      error.statusText = response.error.statusText

      throw error
    }

    return response.data ?? null
  },
  retry: shouldRetryAuthSession,
  refetchOnReconnect: true,
  refetchOnWindowFocus: true,
})

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
  await invalidateAuthSession(queryClientInstance)

  return queryClientInstance.fetchQuery({
    ...authSessionQueryOptions,
    staleTime: 0,
  })
}

export function useAuthSessionQuery() {
  return useQuery(authSessionQueryOptions)
}

export function useSignOutMutation() {
  return useMutation({
    mutationFn: async () => {
      await authClient.signOut()
    },
    onMutate: async () => {
      const previousSession = getCachedAuthSession()

      await clearAuthSession()

      return { previousSession }
    },
    onError: (error, _variables, context) => {
      setCachedAuthSession(context?.previousSession ?? null)
      toast.error(error instanceof Error ? error.message : 'Sign-out failed')
    },
    onSuccess: () => {
      toast.success('Signed out successfully')
    },
    onSettled: async () => {
      await invalidateAuthSession()
    },
  })
}
