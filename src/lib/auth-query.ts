import { authClient } from '@/lib/auth-client'
import queryClient from '@/lib/query-client'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const authSessionQueryOptions = queryOptions({
  queryKey: ['auth', 'session'],
  queryFn: async () => {
    try {
      const response = await authClient.getSession()
      return response.data ?? null
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('[Auth Session Query] Failed to fetch session, continuing as guest', error)
      }
      toast.error('Failed to get session, please try again later')
      return null
    }
  },
  retry: false,
  staleTime: 60_000,
})

export function useAuthSessionQuery() {
  return useQuery(authSessionQueryOptions)
}

export function useSignOutMutation() {
  return useMutation({
    mutationFn: async () => {
      await authClient.signOut()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authSessionQueryOptions.queryKey })
    },
  })
}
