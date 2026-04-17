import type { RouterContext } from '@/lib/router-context'

import { getRedirectPathFromHref } from '@/lib/auth-navigation'
import { ensureAuthSession, getCachedAuthSession } from '@/lib/auth-query'
import { redirect } from '@tanstack/react-router'

interface RouteLocation {
  href: string
}

interface RequireAuthArgs {
  context: Pick<RouterContext, 'queryClient'>
  location: RouteLocation
}

interface RequireGuestArgs {
  context: Pick<RouterContext, 'queryClient'>
  location: RouteLocation
}

export async function getSessionOrNull(queryClient: RouterContext['queryClient']) {
  const cachedSession = getCachedAuthSession(queryClient)

  if (cachedSession) {
    return cachedSession
  }

  try {
    return await ensureAuthSession(queryClient)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[Auth Route Guard] Session check failed, continuing as guest', error)
    }

    return null
  }
}

export async function requireAuth({ context, location }: RequireAuthArgs) {
  const session = await getSessionOrNull(context.queryClient)

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
  const session = await getSessionOrNull(context.queryClient)

  if (session) {
    throw redirect({ to: getRedirectPathFromHref(location.href) })
  }
}
