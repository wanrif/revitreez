import type { RouterContext } from '@/lib/router-context'

import { Loader } from '@/components/shared/loader'
import { createRouter } from '@tanstack/react-router'

import { routeTree } from '../routeTree.gen'

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
    <div className='p-4 text-center'>
      <h3 className='text-lg font-semibold text-red-600'>Something went wrong</h3>
      <p className='mt-2 text-sm text-gray-600'>
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
  } satisfies RouterContext,
})

export default router
