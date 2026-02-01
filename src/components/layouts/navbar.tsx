import { ButtonTheme } from '@/components/ui'

const Navbar = () => {
  return (
    <header className='border-b border-neutral-100 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <h1 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
              Revitreez
            </h1>
          </div>
          <nav className='flex items-center space-x-4'>
            <ButtonTheme />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
