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
      <div className='flex min-h-screen items-center justify-center bg-surface-muted p-6'>
        <div className='w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-sm corner-squircle'>
          <h1 className='text-xl font-semibold text-foreground'>Something went wrong</h1>
          <p className='mt-3 text-sm text-muted-foreground'>
            The page crashed unexpectedly. You can refresh and continue using the app.
          </p>
          <p className='mt-2 text-xs text-muted-foreground'>{this.state.errorMessage}</p>
          <button
            type='button'
            onClick={this.handleReload}
            className='mt-5 inline-flex items-center justify-center rounded-3xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors corner-squircle hover:bg-primary-hover'
          >
            Reload App
          </button>
        </div>
      </div>
    )
  }
}

export default AppErrorBoundary
