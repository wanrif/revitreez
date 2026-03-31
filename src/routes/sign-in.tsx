import { useState } from 'react'

import { Button, Checkbox, Input } from '@/components/shared'
import { authClient } from '@/lib/auth-client'
import { authSessionQueryOptions, useAuthSessionQuery } from '@/lib/auth-query'
import { requireGuest } from '@/lib/auth-route-guards'
import queryClient from '@/lib/query-client'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'

export const Route = createFileRoute('/sign-in')({
  beforeLoad: requireGuest,
  component: SignInPage,
})

type AuthMode = 'sign-in' | 'sign-up' | 'forgot-password'

const OAUTH_PROVIDERS: string[] = (import.meta.env.VITE_AUTH_PROVIDERS || 'google,github')
  .split(',')
  .map((provider: string) => provider.trim().toLowerCase())
  .filter(Boolean)

const signInSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean(),
})

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
    rememberMe: z.boolean(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Password confirmation does not match',
    path: ['confirmPassword'],
  })

const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email'),
})

function sanitizeRedirect(value: string | undefined): string {
  const fallback = '/dashboard'
  if (!value) return fallback
  // Reject anything with a scheme (e.g. http://, https://) or protocol-relative URLs (//)
  if (/^[a-z][a-z\d+\-.]*:/i.test(value) || value.startsWith('//')) return fallback
  // Must start with a single /
  if (!value.startsWith('/')) return fallback
  return value
}

function SignInPage() {
  const { data: session, refetch, isRefetching } = useAuthSessionQuery()
  const navigate = useNavigate()
  const search = Route.useSearch() as { redirect?: string }

  const [mode, setMode] = useState<AuthMode>('sign-in')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo = sanitizeRedirect(search.redirect)
  const isSessionActive = Boolean(session)

  const goAfterAuth = async () => {
    await queryClient.invalidateQueries({ queryKey: authSessionQueryOptions.queryKey })
    await refetch()
    await navigate({ to: redirectTo, replace: true })
  }

  const signInForm = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    onSubmit: async ({ value }) => {
      const parsed = signInSchema.safeParse(value)
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message || 'Invalid sign-in payload')
        return
      }

      setIsSubmitting(true)
      try {
        const { data, error } = await authClient.signIn.email({
          email: parsed.data.email,
          password: parsed.data.password,
          callbackURL: redirectTo,
          rememberMe: parsed.data.rememberMe,
        })

        if (error) {
          toast.error(error.message || 'Sign-in failed')
          return
        }

        if (data?.url) {
          window.location.href = data.url
          return
        }

        await goAfterAuth()
        toast.success('Signed in successfully')
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Sign-in failed')
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const signUpForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: true,
    },
    onSubmit: async ({ value }) => {
      const parsed = signUpSchema.safeParse(value)
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message || 'Invalid sign-up payload')
        return
      }

      setIsSubmitting(true)
      try {
        const { error } = await authClient.signUp.email({
          name: parsed.data.name,
          email: parsed.data.email,
          password: parsed.data.password,
          rememberMe: parsed.data.rememberMe,
          callbackURL: redirectTo,
        })

        if (error) {
          toast.error(error.message || 'Sign-up failed')
          return
        }

        await goAfterAuth()
        toast.success('Account created successfully')
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Sign-up failed')
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const forgotPasswordForm = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      const parsed = forgotPasswordSchema.safeParse(value)
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message || 'Invalid email')
        return
      }

      setIsSubmitting(true)
      try {
        const { data, error } = await authClient.requestPasswordReset({
          email: parsed.data.email,
          redirectTo,
        })

        if (error) {
          toast.error(error.message || 'Could not request password reset')
          return
        }

        toast.success(data?.message || 'Password reset email sent')
        setMode('sign-in')
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Could not request password reset')
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const handleOAuthSignIn = async (provider: string) => {
    setIsSubmitting(true)
    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: redirectTo,
        disableRedirect: true,
      })

      if (error) {
        toast.error(error.message || `Could not sign in with ${provider}`)
        return
      }

      if (data?.url) {
        window.location.href = data.url
        return
      }

      toast.error(`Provider redirect URL not returned for ${provider}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Could not sign in with ${provider}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='mx-auto max-w-xl px-4 py-20'>
      <div className='rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm corner-squircle dark:border-neutral-800 dark:bg-neutral-900'>
        <h1 className='text-2xl font-semibold text-neutral-900 dark:text-neutral-100'>
          {mode === 'sign-up'
            ? 'Create Account'
            : mode === 'forgot-password'
              ? 'Reset Password'
              : 'Sign In'}
        </h1>
        <p className='mt-3 text-neutral-600 dark:text-neutral-300'>
          {mode === 'sign-up'
            ? 'Use email and password to create an account.'
            : mode === 'forgot-password'
              ? 'Request a password reset email for your account.'
              : 'Use email/password or a social provider to continue.'}
        </p>

        <div className='mt-6 space-y-4'>
          {mode === 'sign-in' ? (
            <form
              className='space-y-4'
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                void signInForm.handleSubmit()
              }}
            >
              <signInForm.Field
                name='email'
                validators={{
                  onBlur: ({ value }) => {
                    const parsed = z.email().safeParse(value)
                    return parsed.success ? undefined : parsed.error.issues[0]?.message
                  },
                }}
              >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder='Email address'
                    type='email'
                    error={field.state.meta.errors[0]}
                  />
                )}
              </signInForm.Field>

              <signInForm.Field
                name='password'
                validators={{
                  onBlur: ({ value }) => {
                    const parsed = z.string().min(1, 'Password is required').safeParse(value)
                    return parsed.success ? undefined : parsed.error.issues[0]?.message
                  },
                }}
              >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder='Password'
                    type='password'
                    error={field.state.meta.errors[0]}
                  />
                )}
              </signInForm.Field>

              <signInForm.Field name='rememberMe'>
                {(field) => (
                  <Checkbox
                    checked={field.state.value}
                    onChange={(checked) => field.handleChange(checked)}
                    label='Remember me'
                  />
                )}
              </signInForm.Field>

              <Button type='submit' disabled={isSubmitting} className='w-full justify-center'>
                {isSubmitting ? 'Please wait...' : 'Sign In'}
              </Button>
            </form>
          ) : null}

          {mode === 'sign-up' ? (
            <form
              className='space-y-4'
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                void signUpForm.handleSubmit()
              }}
            >
              <signUpForm.Field
                name='name'
                validators={{
                  onBlur: ({ value }) => {
                    const parsed = z.string().trim().min(1, 'Name is required').safeParse(value)
                    return parsed.success ? undefined : parsed.error.issues[0]?.message
                  },
                }}
              >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder='Full name'
                    error={field.state.meta.errors[0]}
                  />
                )}
              </signUpForm.Field>

              <signUpForm.Field
                name='email'
                validators={{
                  onBlur: ({ value }) => {
                    const parsed = z.email().safeParse(value)
                    return parsed.success ? undefined : parsed.error.issues[0]?.message
                  },
                }}
              >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder='Email address'
                    type='email'
                    error={field.state.meta.errors[0]}
                  />
                )}
              </signUpForm.Field>

              <signUpForm.Field
                name='password'
                validators={{
                  onBlur: ({ value }) => {
                    const parsed = z
                      .string()
                      .min(8, 'Password must be at least 8 characters')
                      .safeParse(value)
                    return parsed.success ? undefined : parsed.error.issues[0]?.message
                  },
                }}
              >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder='Password'
                    type='password'
                    error={field.state.meta.errors[0]}
                  />
                )}
              </signUpForm.Field>

              <signUpForm.Field
                name='confirmPassword'
                validators={{
                  onBlur: ({ value, fieldApi }) => {
                    const parsed = z.string().min(1, 'Confirm your password').safeParse(value)
                    if (!parsed.success) {
                      return parsed.error.issues[0]?.message
                    }

                    return value !== fieldApi.form.getFieldValue('password')
                      ? 'Password confirmation does not match'
                      : undefined
                  },
                }}
              >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder='Confirm password'
                    type='password'
                    error={field.state.meta.errors[0]}
                  />
                )}
              </signUpForm.Field>

              <signUpForm.Field name='rememberMe'>
                {(field) => (
                  <label className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300'>
                    <Checkbox
                      checked={field.state.value}
                      onCheckedChange={(checked) => field.handleChange(Boolean(checked))}
                    />
                    Remember me
                  </label>
                )}
              </signUpForm.Field>

              <Button type='submit' disabled={isSubmitting} className='w-full justify-center'>
                {isSubmitting ? 'Please wait...' : 'Create Account'}
              </Button>
            </form>
          ) : null}

          {mode === 'forgot-password' ? (
            <form
              className='space-y-4'
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                void forgotPasswordForm.handleSubmit()
              }}
            >
              <forgotPasswordForm.Field
                name='email'
                validators={{
                  onBlur: ({ value }) => {
                    const parsed = z.email().safeParse(value)
                    return parsed.success ? undefined : parsed.error.issues[0]?.message
                  },
                }}
              >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder='Email address'
                    type='email'
                    error={field.state.meta.errors[0]}
                  />
                )}
              </forgotPasswordForm.Field>

              <Button type='submit' disabled={isSubmitting} className='w-full justify-center'>
                {isSubmitting ? 'Please wait...' : 'Send Reset Email'}
              </Button>
            </form>
          ) : null}

          {mode === 'sign-in' ? (
            <div className='space-y-2'>
              <p className='text-center text-xs tracking-wide text-neutral-500 uppercase dark:text-neutral-400'>
                Or continue with
              </p>
              <div className='grid grid-cols-2 gap-3'>
                {OAUTH_PROVIDERS.map((provider: string) => (
                  <Button
                    key={provider}
                    variant='secondary'
                    disabled={isSubmitting}
                    onClick={() => handleOAuthSignIn(provider)}
                    className='w-full justify-center capitalize'
                  >
                    {provider}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {isSessionActive ? (
          <p className='mt-4 text-sm text-teal-700 dark:text-teal-400'>
            Session detected for this browser.
          </p>
        ) : (
          <p className='mt-4 text-sm text-neutral-500 dark:text-neutral-400'>
            No active session yet.
          </p>
        )}

        <div className='mt-5 flex flex-wrap gap-3'>
          {mode !== 'sign-in' ? (
            <Button variant='ghost' size='sm' onClick={() => setMode('sign-in')}>
              Back to Sign In
            </Button>
          ) : (
            <>
              <Button variant='ghost' size='sm' onClick={() => setMode('sign-up')}>
                Create Account
              </Button>
              <Button variant='ghost' size='sm' onClick={() => setMode('forgot-password')}>
                Forgot Password
              </Button>
            </>
          )}

          <Button variant='secondary' size='sm' onClick={() => refetch()} disabled={isRefetching}>
            {isRefetching ? 'Refreshing...' : 'Refresh Session'}
          </Button>
        </div>
      </div>
    </div>
  )
}
