import Button from '@/components/shared/button'
import { Loader } from '@/components/shared/loader'
import { useAuthSessionQuery } from '@/lib/auth-query'
import { requireAuth } from '@/lib/auth-route-guards'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard')({
  beforeLoad: requireAuth,
  component: DashboardPage,
})

function DashboardPage() {
  const { data: session, isLoading, refetch, isRefetching } = useAuthSessionQuery()

  if (isLoading) {
    return <Loader label='Loading your dashboard' showLabel className='min-h-[40vh]' />
  }

  if (!session) {
    return (
      <div className='space-y-4 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950 corner-squircle dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100'>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Session expired</h2>
          <p className='text-sm text-amber-900/80 dark:text-amber-100/80'>
            Your protected session is no longer available. Sign in again to continue.
          </p>
        </div>
        <Link to='/sign-in'>
          <Button size='sm'>Go to Sign In</Button>
        </Link>
      </div>
    )
  }

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
