'use client'

import { useRouterState } from '@tanstack/react-router'

export function usePageTitle(): string {
  const router = useRouterState()
  const pathname = router.location.pathname

  const getPageTitle = () => {
    if (pathname?.startsWith('/admin/dashboard')) return 'Dashboard'
    if (pathname?.startsWith('/admin/content')) return 'Content'
    if (pathname?.startsWith('/admin/collections')) return 'Collections'
    if (pathname?.startsWith('/admin/media')) return 'Media'
    if (pathname?.startsWith('/admin/users')) return 'Users'
    if (pathname?.startsWith('/admin/plugins')) return 'Plugins'
    if (pathname?.startsWith('/admin/settings')) return 'Settings'
    return 'Dashboard'
  }

  return getPageTitle()
}