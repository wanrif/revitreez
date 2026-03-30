import type { RouterContext } from '@/lib/router-context'

import { NotFound } from '@/components/layouts'
import { createRootRouteWithContext, HeadContent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'Revitreez',
      },
      {
        name: 'description',
        content: 'Revitreez is a boilerplate web application',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
  notFoundComponent: () => {
    return <NotFound />
  },
})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools position='bottom-right' />
    </>
  )
}
