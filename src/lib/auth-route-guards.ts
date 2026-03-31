import { authSessionQueryOptions } from '@/lib/auth-query'
import queryClient from '@/lib/query-client'
import { redirect } from '@tanstack/react-router'

interface RouteLocation {
  href: string
}

interface RequireAuthArgs {
  location: RouteLocation
}

export async function getSessionOrNull() {
  try {
    return await queryClient.ensureQueryData(authSessionQueryOptions)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[Auth Route Guard] Session check failed, continuing as guest', error)
    }
    return null
  }
}

export async function requireAuth({ location }: RequireAuthArgs) {
  const session = await getSessionOrNull()

  if (!session) {
    throw redirect({
      to: '/sign-in',
      search: {
        redirect: location.href,
      },
    })
  }

  return session
}

export async function requireGuest() {
  const session = await getSessionOrNull()

  if (session) {
    throw redirect({ to: '/dashboard' })
  }
}
