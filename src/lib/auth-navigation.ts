const DEFAULT_AUTHENTICATED_REDIRECT = '/dashboard'
const SIGN_IN_ROUTE = '/sign-in'

export function sanitizeRedirectPath(value: string | undefined): string {
  if (!value) return DEFAULT_AUTHENTICATED_REDIRECT

  if (/^[a-z][a-z\d+\-.]*:/i.test(value) || value.startsWith('//')) {
    return DEFAULT_AUTHENTICATED_REDIRECT
  }

  if (!value.startsWith('/')) {
    return DEFAULT_AUTHENTICATED_REDIRECT
  }

  return value
}

export function getRedirectPathFromHref(href: string): string {
  const url = new URL(href, window.location.origin)
  return sanitizeRedirectPath(url.searchParams.get('redirect') ?? undefined)
}

export function getCurrentAppPath(): string {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

export function buildSignInRedirectHref(redirectPath?: string): string {
  const redirect = sanitizeRedirectPath(redirectPath)

  if (redirect === DEFAULT_AUTHENTICATED_REDIRECT) {
    return SIGN_IN_ROUTE
  }

  const params = new URLSearchParams({ redirect })
  return `${SIGN_IN_ROUTE}?${params.toString()}`
}

export function isPublicPath(pathname: string): boolean {
  return pathname === '/' || pathname.startsWith(SIGN_IN_ROUTE)
}

export function isAuthApiRequest(url: string | undefined, authBaseURL: string): boolean {
  if (!url) {
    return false
  }

  const normalizedRequestUrl = new URL(url, window.location.origin)
  const normalizedAuthUrl = new URL(authBaseURL || '/api/auth', window.location.origin)

  return normalizedRequestUrl.pathname.startsWith(normalizedAuthUrl.pathname)
}

export { DEFAULT_AUTHENTICATED_REDIRECT, SIGN_IN_ROUTE }
