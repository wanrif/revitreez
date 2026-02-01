import React from 'react'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-teal-600 text-white shadow-sm hover:bg-teal-700 active:bg-teal-800 focus-visible:ring-teal-600 dark:bg-teal-500 dark:hover:bg-teal-600 dark:active:bg-teal-700 dark:focus-visible:ring-teal-500',
  secondary:
    'bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 active:bg-gray-400 focus-visible:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:active:bg-gray-500 dark:focus-visible:ring-gray-500',
  ghost:
    'bg-transparent text-teal-600 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500 dark:text-teal-300 dark:hover:bg-slate-800 dark:active:bg-slate-700 dark:focus-visible:ring-teal-400',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...rest }, ref) => {
    const disabledClasses = rest.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
    const baseClasses =
      'inline-flex items-center justify-center corner-squircle rounded-3xl font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-slate-900'

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          disabledClasses,
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
