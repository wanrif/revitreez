import { cn } from '@/lib/utils'

type LoaderSize = 'sm' | 'md' | 'lg' | number
type LoaderVariant = 'spinner' | 'dots' | 'pulse' | 'bars'

export interface LoaderProps {
  label?: string
  size?: LoaderSize
  fullscreen?: boolean
  showLabel?: boolean
  className?: string
  variant?: LoaderVariant
}

export function Loader({
  label = 'Loading…',
  size = 'md',
  fullscreen = false,
  showLabel = false,
  className,
  variant = 'spinner',
}: LoaderProps) {
  // Larger sizes when fullscreen
  const baseSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
        ? fullscreen
          ? 32
          : 20
        : size === 'lg'
          ? fullscreen
            ? 64
            : 40
          : fullscreen
            ? 48
            : 28

  const container = cn(
    fullscreen
      ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80'
      : 'flex h-full items-center justify-center pt-8',
    className,
  )

  return (
    <div className={container} role='status' aria-live='polite' aria-busy>
      <div className='flex flex-col items-center gap-4'>
        {variant === 'spinner' && <SpinnerLoader size={baseSize} />}
        {variant === 'dots' && <DotsLoader size={baseSize} />}
        {variant === 'pulse' && <PulseLoader size={baseSize} />}
        {variant === 'bars' && <BarsLoader size={baseSize} />}
        {showLabel ? (
          <p
            className={cn(
              'font-medium text-neutral-600 dark:text-neutral-400',
              fullscreen ? 'text-base' : 'text-sm',
            )}
          >
            {label}
          </p>
        ) : (
          <span className='sr-only'>{label}</span>
        )}
      </div>
    </div>
  )
}

function SpinnerLoader({ size }: { size: number }) {
  return (
    <div className='relative' style={{ width: size, height: size }}>
      {/* Outer ring */}
      <div
        className='absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-teal-500 border-r-teal-500/30'
        style={{ animationDuration: '1s' }}
      />
      {/* Inner ring */}
      <div
        className='absolute inset-1 animate-spin rounded-full border-2 border-transparent border-b-teal-400 border-l-teal-400/30'
        style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}
      />
      {/* Center dot */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500' />
      </div>
    </div>
  )
}

function DotsLoader({ size }: { size: number }) {
  const dotSize = Math.max(size / 5, 6)
  const gap = dotSize / 2

  return (
    <div className='flex items-center' style={{ gap }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className='animate-bounce rounded-full bg-teal-500'
          style={{
            width: dotSize,
            height: dotSize,
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  )
}

function PulseLoader({ size }: { size: number }) {
  return (
    <div className='relative' style={{ width: size, height: size }}>
      {/* Ripple effects */}
      <div
        className='absolute inset-0 animate-ping rounded-full bg-teal-400/30'
        style={{ animationDuration: '1.5s' }}
      />
      <div
        className='absolute inset-2 animate-ping rounded-full bg-teal-400/40'
        style={{ animationDuration: '1.5s', animationDelay: '0.3s' }}
      />
      {/* Center circle */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div
          className='animate-pulse rounded-full bg-teal-500'
          style={{ width: size / 3, height: size / 3 }}
        />
      </div>
    </div>
  )
}

function BarsLoader({ size }: { size: number }) {
  const barWidth = Math.max(size / 6, 4)
  const gap = barWidth / 2

  return (
    <div className='flex items-end' style={{ height: size, gap }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className='rounded-full bg-teal-500'
          style={{
            width: barWidth,
            animation: 'bars 1s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
            height: '40%',
          }}
        />
      ))}
      <style>{`
        @keyframes bars {
          0%, 100% { height: 40%; opacity: 0.5; }
          50% { height: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  )
}
