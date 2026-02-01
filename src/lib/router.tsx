import type { ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'

import { Loader } from '@/components/shared/loader'

import { routeTree } from '../routeTree.gen'

import queryClient from './query-client'

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: 'intent',
  defaultPendingComponent: () => <Loader />,
  defaultErrorComponent: ({ error }) => (
    <div className='p-4 text-center'>
      <h3 className='text-lg font-semibold text-red-600'>Something went wrong</h3>
      <p className='mt-2 text-sm text-gray-600'>
        {error?.message || 'An unexpected error occurred'}
      </p>
    </div>
  ),
  context: {
    auth: undefined!,
  },
  Wrap: function WrapComponent({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  },
})

export default router
