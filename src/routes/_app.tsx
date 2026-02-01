import { createFileRoute } from '@tanstack/react-router'

import { MainLayout } from '@/components/layouts'

export const Route = createFileRoute('/_app')({
  component: () => <MainLayout />,
})
