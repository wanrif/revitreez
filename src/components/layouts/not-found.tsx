import Button from '@/components/shared/button'
import { Link } from '@tanstack/react-router'

const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background px-6'>
      <div className='text-center'>
        {/* Illustration */}
        <div className='mx-auto mb-8 w-64'>
          <svg viewBox='0 0 200 150' className='w-full'>
            {/* Ground */}
            <ellipse cx='100' cy='140' rx='80' ry='8' className='fill-muted' />

            {/* Character body */}
            <g className='animate-[wiggle_2s_ease-in-out_infinite]'>
              {/* Body */}
              <rect x='85' y='70' width='30' height='50' rx='15' className='fill-primary' />
              {/* Head */}
              <circle cx='100' cy='55' r='20' className='fill-primary-hover' />
              {/* Eyes */}
              <circle cx='93' cy='52' r='3' className='fill-white' />
              <circle cx='107' cy='52' r='3' className='fill-white' />
              <circle cx='94' cy='53' r='1.5' className='fill-neutral-800' />
              <circle cx='108' cy='53' r='1.5' className='fill-neutral-800' />
              {/* Confused eyebrows */}
              <path
                d='M89 46 L97 48'
                stroke='currentColor'
                strokeWidth='2'
                className='stroke-neutral-700'
              />
              <path
                d='M103 48 L111 46'
                stroke='currentColor'
                strokeWidth='2'
                className='stroke-neutral-700'
              />
              {/* Mouth */}
              <path
                d='M95 62 Q100 58 105 62'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='stroke-neutral-700'
              />
              {/* Arms */}
              <path
                d='M85 80 L65 95'
                stroke='currentColor'
                strokeWidth='8'
                strokeLinecap='round'
                className='stroke-primary'
              />
              <path
                d='M115 80 L135 70'
                stroke='currentColor'
                strokeWidth='8'
                strokeLinecap='round'
                className='stroke-primary'
              />
              {/* Question marks */}
              <text x='140' y='60' className='fill-accent text-lg font-bold'>
                ?
              </text>
              <text x='55' y='75' className='fill-accent text-sm font-bold'>
                ?
              </text>
            </g>

            {/* Legs */}
            <rect x='88' y='115' width='10' height='20' rx='5' className='fill-primary-hover' />
            <rect x='102' y='115' width='10' height='20' rx='5' className='fill-primary-hover' />

            {/* Map pieces on ground */}
            <rect
              x='40'
              y='125'
              width='15'
              height='12'
              rx='2'
              className='fill-border'
              transform='rotate(-15 47 131)'
            />
            <rect
              x='145'
              y='128'
              width='12'
              height='10'
              rx='2'
              className='fill-border'
              transform='rotate(10 151 133)'
            />
          </svg>
        </div>

        {/* 404 */}
        <h1 className='text-8xl font-bold tracking-tight text-foreground'>
          4<span className='text-primary'>0</span>4
        </h1>

        {/* Title */}
        <h2 className='mt-4 text-2xl font-semibold text-foreground'>Page not found</h2>

        {/* Description */}
        <p className='mx-auto mt-3 max-w-sm text-muted-foreground'>
          Oops! Looks like you took a wrong turn. The page you're looking for doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Link to='/'>
            <Button variant='primary' size='lg'>
              Back to Home
            </Button>
          </Link>
          <Button variant='ghost' size='lg' onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>

      {/* Wiggle animation */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>
    </div>
  )
}

export default NotFound
