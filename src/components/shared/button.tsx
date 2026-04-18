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
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover active:bg-primary-active focus-visible:ring-ring',
  secondary:
    'border border-border bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover active:bg-secondary-active focus-visible:ring-ring',
  ghost:
    'bg-transparent text-primary hover:bg-accent-soft hover:text-accent-soft-foreground active:bg-accent focus-visible:ring-ring',
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
      'inline-flex items-center justify-center corner-squircle rounded-3xl font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background'

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
