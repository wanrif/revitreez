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
          <label
            htmlFor={inputId}
            className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 transition outline-none',
            'focus:border-teal-500 focus:ring-2 focus:ring-teal-100',
            'dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:ring-teal-900/30',
            error &&
              'border-red-400 focus:border-red-500 focus:ring-red-100 dark:border-red-600 dark:focus:ring-red-900/30',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p id={inputId ? `${inputId}-error` : undefined} className='mt-1 text-xs text-red-500'>
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
