import { Outlet } from '@tanstack/react-router'

import Navbar from './navbar'

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <Outlet />
      </main>
    </div>
  )
}
