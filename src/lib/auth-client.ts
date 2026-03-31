import { createAuthClient } from 'better-auth/react'

export const betterAuthBaseURL =
  import.meta.env.VITE_BETTER_AUTH_URL ?? import.meta.env.VITE_API_BASE_URL ?? ''

export const authClient = createAuthClient(
  betterAuthBaseURL ? { baseURL: betterAuthBaseURL } : undefined,
)

export type AuthSession = typeof authClient.$Infer.Session | null
