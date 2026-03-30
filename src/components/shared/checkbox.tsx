import type { ChangeEvent, FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type CheckboxProps = {
  id?: string
  label: string | ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  inputClassName?: string
  labelClassName?: string
  iconClassName?: string
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className,
  inputClassName,
  labelClassName,
  iconClassName,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <label
      className={cn(
        'group flex max-w-fit items-center gap-2 text-sm',
        disabled && 'cursor-not-allowed opacity-70',
        className,
      )}
      htmlFor={id}
    >
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className='peer sr-only'
      />

      <span
        aria-hidden='true'
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ease-out',
          'peer-focus-visible:border-teal-500 peer-focus-visible:ring-3 peer-focus-visible:ring-teal-500/20',
          checked ? 'border-teal-500 bg-teal-500 text-white' : 'bg-theme-field text-transparent',
          !disabled && 'group-hover:border-teal-500/70',
          inputClassName,
        )}
      >
        <svg
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={cn(
            'h-3 w-3 transition-opacity duration-150 ease-out',
            checked ? 'opacity-100' : 'opacity-0',
            iconClassName,
          )}
        >
          <path
            d='M3.5 8.5L6.5 11.5L12.5 4.5'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </span>

      <span className={cn('select-none', labelClassName)}>{label}</span>
    </label>
  )
}
