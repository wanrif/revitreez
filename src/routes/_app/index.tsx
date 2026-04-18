import Button from '@/components/shared/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: LandingPage,
})

const features = [
  {
    icon: (
      <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 10V3L4 14h7v7l9-11h-7z'
        />
      </svg>
    ),
    title: 'Lightning Fast',
    description: 'Powered by Vite and Bun for blazing fast development and build times.',
  },
  {
    icon: (
      <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
        />
      </svg>
    ),
    title: 'Type Safe',
    description: 'Full TypeScript support with strict type checking throughout the codebase.',
  },
  {
    icon: (
      <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
        />
      </svg>
    ),
    title: 'File-Based Routing',
    description: 'TanStack Router with automatic route generation from your file structure.',
  },
  {
    icon: (
      <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
        />
      </svg>
    ),
    title: 'Modern Styling',
    description: 'Tailwind CSS v4 with dark mode support and custom utilities.',
  },
  {
    icon: (
      <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
        />
      </svg>
    ),
    title: 'Data Fetching',
    description: 'TanStack Query for powerful server state management and caching.',
  },
  {
    icon: (
      <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
        />
      </svg>
    ),
    title: 'API Ready',
    description: 'Pre-configured Axios wrapper with typed responses and error handling.',
  },
]

const techStack = [
  { name: 'React 19', color: 'bg-sky-500' },
  { name: 'TypeScript', color: 'bg-blue-600' },
  { name: 'Vite', color: 'bg-purple-500' },
  { name: 'Bun', color: 'bg-amber-500' },
  { name: 'TanStack Router', color: 'bg-rose-500' },
  { name: 'TanStack Query', color: 'bg-red-500' },
  { name: 'Tailwind CSS v4', color: 'bg-cyan-500' },
  { name: 'Zustand', color: 'bg-orange-500' },
]

function LandingPage() {
  return (
    <div className='-mx-4 -mt-6 sm:-mx-6 lg:-mx-8'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-linear-to-b from-accent-soft to-background px-4 py-20 sm:px-6 lg:px-8'>
        {/* Background decoration */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/14 blur-3xl' />
          <div className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl' />
        </div>

        <div className='relative mx-auto max-w-4xl text-center'>
          {/* Badge */}
          <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75'></span>
              <span className='relative inline-flex h-2 w-2 rounded-full bg-primary'></span>
            </span>
            Production Ready Boilerplate
          </div>

          {/* Heading */}
          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl'>
            Build faster with{' '}
            <span className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
              Revitreez
            </span>
          </h1>

          {/* Subheading */}
          <p className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'>
            A modern React boilerplate with everything you need to build production-ready
            applications. Type-safe, fast, and developer-friendly.
          </p>

          {/* CTA Buttons */}
          <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <a href='https://github.com/wanrif/revitreez' target='_blank' rel='noopener noreferrer'>
              <Button variant='ghost' size='lg'>
                <svg
                  className='mr-2 h-5 w-5'
                  fill='currentColor'
                  role='img'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>GitHub</title>
                  <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
                </svg>
                View on GitHub
              </Button>
            </a>
          </div>

          {/* Tech stack pills */}
          <div className='mt-12'>
            <p className='mb-4 text-sm font-medium text-muted-foreground'>Built with</p>
            <div className='flex flex-wrap justify-center gap-2'>
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className='inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-sm font-medium text-surface-foreground shadow-sm ring-1 ring-border corner-squircle'
                >
                  <span className={`h-2 w-2 rounded-full ${tech.color}`}></span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='px-4 py-20 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Everything you need to ship fast
            </h2>
            <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
              Pre-configured with best practices and modern tooling so you can focus on building
              your product.
            </p>
          </div>

          <div className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='group rounded-3xl border border-border bg-surface p-6 transition-all corner-squircle hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10'
              >
                <div className='mb-4 inline-flex rounded-3xl bg-accent-soft p-3 text-primary transition-colors corner-squircle group-hover:bg-primary group-hover:text-primary-foreground'>
                  {feature.icon}
                </div>
                <h3 className='mb-2 text-lg font-semibold text-foreground'>{feature.title}</h3>
                <p className='text-muted-foreground'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className='bg-surface-muted px-4 py-20 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Get started in seconds
            </h2>
            <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
              Clone, install, and start building. It's that simple.
            </p>
          </div>

          <div className='mt-12 overflow-hidden rounded-2xl bg-surface-inverse text-surface-inverse-foreground shadow-2xl ring-1 ring-border/40'>
            {/* Terminal header */}
            <div className='flex items-center gap-2 border-b border-white/10 bg-white/6 px-4 py-3'>
              <div className='h-3 w-3 rounded-full bg-red-500'></div>
              <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
              <div className='h-3 w-3 rounded-full bg-green-500'></div>
              <span className='ml-2 text-sm text-surface-inverse-muted'>terminal</span>
            </div>
            {/* Terminal content */}
            <div className='p-6 font-mono text-sm'>
              <div className='space-y-3'>
                <p>
                  <span className='text-success'>$</span>{' '}
                  <span className='text-surface-inverse-foreground/88'>
                    git clone https://github.com/wanrif/revitreez.git
                  </span>
                </p>
                <p>
                  <span className='text-success'>$</span>{' '}
                  <span className='text-surface-inverse-foreground/88'>cd revitreez</span>
                </p>
                <p>
                  <span className='text-success'>$</span>{' '}
                  <span className='text-surface-inverse-foreground/88'>bun install</span>
                </p>
                <p>
                  <span className='text-success'>$</span>{' '}
                  <span className='text-surface-inverse-foreground/88'>bun dev</span>
                </p>
                <p className='mt-4 text-surface-inverse-muted'>
                  <span className='text-accent'>→</span> Ready at{' '}
                  <span className='text-primary'>http://localhost:5173</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='px-4 py-20 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Ready to build something amazing?
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Stop wasting time on boilerplate. Start building your next project with Revitreez today.
          </p>
          <div className='mt-10'>
            <Button variant='primary' size='lg'>
              Start Building Now
              <svg className='ml-2 h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 7l5 5m0 0l-5 5m5-5H6'
                />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-border bg-surface px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-6xl text-center'>
          <p className='text-sm text-muted-foreground'>
            Built with React, TypeScript, and Tailwind CSS
          </p>
          <p className='mt-2 text-sm text-muted-foreground/80'>
            © {new Date().getFullYear()} Revitreez. Open source and free to use.
          </p>
        </div>
      </footer>
    </div>
  )
}
