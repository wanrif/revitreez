import React from 'react'

// import { TanStackDevtools } from '@tanstack/react-devtools'
// import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'

import queryClient from '@/lib/query-client'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider storageKey='theme' attribute='class'>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' />
        {/* <TanStackDevtools plugins={[formDevtoolsPlugin()]} /> */}
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers
