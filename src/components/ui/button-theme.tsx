import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/shared'

const ButtonTheme = () => {
  const { theme, setTheme } = useTheme()

  const themes = ['system', 'light', 'dark'] as const
  const currentIndex = themes.indexOf(theme as (typeof themes)[number])
  const safeIndex = currentIndex >= 0 ? currentIndex : 0
  const nextTheme = themes[(safeIndex + 1) % themes.length]

  const applyNextTheme = () => {
    setTheme(nextTheme)
  }

  const icons: Record<(typeof themes)[number], React.ReactNode> = {
    system: <Monitor />,
    light: <Sun />,
    dark: <Moon />,
  }

  return (
    <div className='inline-flex items-center'>
      <Button
        variant='ghost'
        size='sm'
        aria-label={`Switch theme (current: ${theme ?? 'system'})`}
        onClick={applyNextTheme}
        title={`Switch to ${nextTheme} theme`}
      >
        {icons[(theme as (typeof themes)[number]) ?? 'system']}
      </Button>
    </div>
  )
}

export default ButtonTheme
