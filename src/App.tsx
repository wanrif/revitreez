import { useEffect, useMemo } from 'react'

import { useAuthSessionQuery } from '@/lib/auth-query'
import { RouterProvider } from '@tanstack/react-router'

import router from './lib/router'

function App() {
  const { data: session, isLoading } = useAuthSessionQuery()

  const authContext = useMemo(
    () => ({
      session: session ?? null,
      isAuthenticated: Boolean(session),
      isLoading: isLoading,
    }),
    [isLoading, session],
  )

  useEffect(() => {
    void router.invalidate()
  }, [authContext])

  return <RouterProvider router={router} context={{ auth: authContext }} />
}

export default App
