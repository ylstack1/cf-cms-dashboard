import '@fontsource/geist-sans'
import '@fontsource/geist-mono'
import './styles/globals.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router'
import { Providers } from './components/providers'
import { Analytics } from '@vercel/analytics/react'
import { useAuthStore } from './store/authStore'
import { RootLayout } from './layouts/RootLayout'
import { AdminLayout } from './layouts/AdminLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'

// Placeholder component for pages under construction
const UnderConstruction = () => (
  <div className="text-white p-8">
    <h1 className="text-2xl font-bold mb-4">Page Under Construction</h1>
    <p className="text-gray-400">This page is being migrated. Please check back soon.</p>
  </div>
)

const rootRoute = createRootRoute({ component: RootLayout })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => { throw redirect({ to: '/login' }) },
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) throw redirect({ to: '/login' })
  },
})

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const adminContentRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/content',
  component: UnderConstruction,
})

const adminCollectionsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/collections',
  component: UnderConstruction,
})

const adminMediaRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/media',
  component: UnderConstruction,
})

const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/users',
  component: UnderConstruction,
})

const adminPluginsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/plugins',
  component: UnderConstruction,
})

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/settings',
  component: UnderConstruction,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  adminRoute.addChildren([
    adminDashboardRoute,
    adminContentRoute,
    adminCollectionsRoute,
    adminMediaRoute,
    adminUsersRoute,
    adminPluginsRoute,
    adminSettingsRoute,
  ]),
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
      <Analytics />
    </Providers>
  </StrictMode>,
)
