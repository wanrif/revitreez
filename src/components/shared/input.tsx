import React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className='w-full'>
        {label && (
          <label htmlFor={inputId} className='mb-1 block text-sm font-medium text-muted-foreground'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-2xl border border-input bg-surface px-4 py-2 text-sm text-foreground transition outline-none placeholder:text-muted-foreground',
            'focus:border-primary focus:ring-2 focus:ring-ring/20',
            error && 'border-danger focus:border-danger focus:ring-danger/15',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p id={inputId ? `${inputId}-error` : undefined} className='mt-1 text-xs text-danger'>
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
