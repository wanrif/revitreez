import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

interface AppErrorBoundaryProps {
  children: ReactNode
}

interface AppErrorBoundaryState {
  hasError: boolean
  errorMessage: string
}

class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'Unexpected application error',
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[AppErrorBoundary]', error, errorInfo)
    }
  }

  private handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className='flex min-h-screen items-center justify-center bg-neutral-50 p-6 dark:bg-neutral-950'>
        <div className='w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm corner-squircle dark:border-neutral-800 dark:bg-neutral-900'>
          <h1 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
            Something went wrong
          </h1>
          <p className='mt-3 text-sm text-neutral-600 dark:text-neutral-300'>
            The page crashed unexpectedly. You can refresh and continue using the app.
          </p>
          <p className='mt-2 text-xs text-neutral-500 dark:text-neutral-400'>
            {this.state.errorMessage}
          </p>
          <button
            type='button'
            onClick={this.handleReload}
            className='mt-5 inline-flex items-center justify-center rounded-3xl bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors corner-squircle hover:bg-teal-700'
          >
            Reload App
          </button>
        </div>
      </div>
    )
  }
}

export default AppErrorBoundary
