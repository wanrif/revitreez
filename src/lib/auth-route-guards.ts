import type { RouterContext } from '@/lib/router-context'

import { getRedirectPathFromHref } from '@/lib/auth-navigation'
import { ensureAuthSession, getCachedAuthSession } from '@/lib/auth-query'
import { redirect } from '@tanstack/react-router'

interface RouteLocation {
  href: string
}

interface RequireAuthArgs {
  context: Pick<RouterContext, 'auth' | 'queryClient'>
  location: RouteLocation
}

interface RequireGuestArgs {
  context: Pick<RouterContext, 'auth' | 'queryClient'>
  location: RouteLocation
}

function getKnownSessionOrNull(context: Pick<RouterContext, 'auth' | 'queryClient'>) {
  if (context.auth.session) {
    return context.auth.session
  }

  const cachedSession = getCachedAuthSession(context.queryClient)

  if (cachedSession) {
    return cachedSession
  }

  return null
}

export async function getSessionOrNull(context: Pick<RouterContext, 'auth' | 'queryClient'>) {
  const knownSession = getKnownSessionOrNull(context)

  if (knownSession) {
    return knownSession
  }

  if (!context.auth.isLoading) {
    return null
  }

  try {
    return await ensureAuthSession(context.queryClient)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[Auth Route Guard] Session check failed, continuing as guest', error)
    }

    return null
  }
}

export async function requireAuth({ context, location }: RequireAuthArgs) {
  const session = await getSessionOrNull(context)

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

export async function requireGuest({ context, location }: RequireGuestArgs) {
  const session = getKnownSessionOrNull(context)

  if (session) {
    throw redirect({ to: getRedirectPathFromHref(location.href) })
  }
}
