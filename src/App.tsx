import { useEffect } from 'react'

import { useAuthSessionState } from '@/lib/auth-query'
import { RouterProvider } from '@tanstack/react-router'

import router from './lib/router'

function App() {
  const { auth, data: session, isLoading } = useAuthSessionState()

  useEffect(() => {
    void router.invalidate()
  }, [isLoading, session])

  return <RouterProvider router={router} context={{ auth }} />
}

export default App
