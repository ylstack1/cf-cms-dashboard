'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { usePlugins } from '@/hooks/usePlugins'
import { DashboardShell } from '@/components/dashboard-shell'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace('/login')
    }
  }, [hydrated, isAuthenticated, router])

  const { data: pluginsData } = usePlugins({ enabled: true }, hydrated && isAuthenticated)

  if (!hydrated) {
    return <div className="min-h-screen bg-[#0b0c15]" />
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0c15] flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    )
  }

  const enabledPlugins = pluginsData?.data.filter((p) => p.enabled && p.menuItems) || []

  return <DashboardShell plugins={enabledPlugins}>{children}</DashboardShell>
}
