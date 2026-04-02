import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

const MINUTE = 60 * 1000

function shouldRetryRequest(failureCount: number, error: unknown): boolean {
  if (failureCount >= 2) {
    return false
  }

  const status =
    typeof error === 'object' && error && 'status' in error && typeof error.status === 'number'
      ? error.status
      : undefined

  if (status && status >= 400 && status < 500) {
    return false
  }

  if (isAxiosError(error)) {
    const axiosStatus = error.response?.status
    if (axiosStatus && axiosStatus >= 400 && axiosStatus < 500) {
      return false
    }
  }

  return true
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 30 * MINUTE,
      retry: shouldRetryRequest,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
      staleTime: 30_000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})

export default queryClient
