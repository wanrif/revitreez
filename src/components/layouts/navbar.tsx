import { Button, Skeleton } from '@/components/shared'
import { ButtonTheme } from '@/components/ui'
import { useAuthSessionQuery, useSignOutMutation } from '@/lib/auth-query'
import { Link } from '@tanstack/react-router'

const Navbar = () => {
  const { data: session, isLoading } = useAuthSessionQuery()
  const signOutMutation = useSignOutMutation()

  const user = session?.user
  const userLabel = user?.name || user?.email || 'Account'

  return (
    <header className='border-b border-neutral-100 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center gap-6'>
            <h1 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
              Revitreez
            </h1>
            <nav className='hidden items-center gap-3 sm:flex'>
              <Link
                to='/'
                className='text-sm text-neutral-600 transition-colors hover:text-teal-600 dark:text-neutral-300 dark:hover:text-teal-400'
              >
                Home
              </Link>
              <Link
                to='/dashboard'
                className='text-sm text-neutral-600 transition-colors hover:text-teal-600 dark:text-neutral-300 dark:hover:text-teal-400'
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className='flex items-center gap-3'>
            <ButtonTheme />
            <Skeleton loading={isLoading} className='h-8 w-24 rounded-md'>
              {session ? (
                <>
                  <span className='hidden text-sm text-neutral-600 sm:inline dark:text-neutral-300'>
                    {userLabel}
                  </span>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => signOutMutation.mutate()}
                    disabled={signOutMutation.isPending}
                  >
                    {signOutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                  </Button>
                </>
              ) : (
                <Link to='/sign-in'>
                  <Button variant='ghost' size='sm'>
                    Sign In
                  </Button>
                </Link>
              )}
            </Skeleton>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
