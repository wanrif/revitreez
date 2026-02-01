import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/assets/css/main.css'
import Providers from '@/components/layouts/providers.tsx'
import { Toaster } from '@/components/shared/sonner.tsx'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
    <Toaster richColors />
  </StrictMode>,
)
