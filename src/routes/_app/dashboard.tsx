import Button from '@/components/shared/button'
import { useAuthSessionQuery } from '@/lib/auth-query'
import { requireAuth } from '@/lib/auth-route-guards'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard')({
  beforeLoad: requireAuth,
  component: DashboardPage,
})

function DashboardPage() {
  const { data: session, refetch, isRefetching } = useAuthSessionQuery()

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold text-neutral-900 dark:text-neutral-100'>Dashboard</h2>
        <p className='mt-2 text-neutral-600 dark:text-neutral-300'>
          This route is protected by TanStack Router using Better Auth session state from TanStack
          Query.
        </p>
      </div>

      <div className='rounded-3xl border border-neutral-200 bg-neutral-50 p-4 corner-squircle dark:border-neutral-800 dark:bg-neutral-900'>
        <h3 className='mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300'>
          Current session
        </h3>
        <pre className='overflow-x-auto text-xs text-neutral-700 dark:text-neutral-200'>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <Button variant='secondary' onClick={() => refetch()} disabled={isRefetching}>
        {isRefetching ? 'Refreshing...' : 'Refresh Session'}
      </Button>
    </div>
  )
}
