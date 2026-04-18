import Button from '@/components/shared/button'
import { Loader } from '@/components/shared/loader'
import { useAuthSessionQuery } from '@/lib/auth-query'
import { requireAuth } from '@/lib/auth-route-guards'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard')({
  beforeLoad: requireAuth,
  component: DashboardPage,
})

function DashboardPage() {
  const { data: session, isLoading, refetch, isRefetching } = useAuthSessionQuery()

  if (isLoading) {
    return <Loader label='Loading your dashboard' showLabel className='min-h-[40vh]' />
  }

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold text-foreground'>Dashboard</h2>
        <p className='mt-2 text-muted-foreground'>
          This route is protected by TanStack Router using Better Auth session state from TanStack
          Query.
        </p>
      </div>

      <div className='rounded-3xl border border-border bg-surface p-4 corner-squircle'>
        <h3 className='mb-3 text-sm font-medium text-muted-foreground'>Current session</h3>
        <pre className='overflow-x-auto text-xs text-surface-foreground'>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <Button variant='secondary' onClick={() => refetch()} disabled={isRefetching}>
        {isRefetching ? 'Refreshing...' : 'Refresh Session'}
      </Button>
    </div>
  )
}
