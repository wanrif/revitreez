import type { RouterContext } from '@/lib/router-context'

import { Loader } from '@/components/shared/loader'
import { createRouter } from '@tanstack/react-router'

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
  defaultPendingComponent: () => <Loader />,
  defaultErrorComponent: ({ error }) => (
    <div className='rounded-3xl border border-border bg-surface p-4 text-center text-surface-foreground shadow-sm corner-squircle'>
      <h3 className='text-lg font-semibold text-danger'>Something went wrong</h3>
      <p className='mt-2 text-sm text-muted-foreground'>
        {error?.message || 'An unexpected error occurred'}
      </p>
    </div>
  ),
  context: {
    auth: {
      session: null,
      isAuthenticated: false,
      isLoading: true,
    },
    queryClient,
  } satisfies RouterContext,
})

export default router
