'use client'

import * as React from 'react'
import { useRouterState } from '@tanstack/react-router'
import { AdminHeader } from '@/components/admin/admin-header'
import { usePageActions } from '@/hooks/usePageActions'
import type { Plugin } from '@/types'

interface PageHeaderProps {
  plugins?: Plugin[]
}

export function PageHeader({ plugins }: PageHeaderProps) {
  const router = useRouterState()
  const pathname = router.location.pathname
  const { actions } = usePageActions()

  const getPageTitle = () => {
    if (pathname?.startsWith('/admin/dashboard')) return 'Dashboard'
    if (pathname?.startsWith('/admin/content')) return 'Content'
    if (pathname?.startsWith('/admin/collections')) return 'Collections'
    if (pathname?.startsWith('/admin/media')) return 'Media'
    if (pathname?.startsWith('/admin/users')) return 'Users'
    if (pathname?.startsWith('/admin/plugins')) return 'Plugins'
    if (pathname?.startsWith('/admin/settings')) return 'Settings'
    return 'Admin'
  }

  const title = getPageTitle()

  return <AdminHeader plugins={plugins} title={title} actions={actions} />
}