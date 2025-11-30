'use client'

import * as React from 'react'
import { useRouterState } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface TabContentWrapperProps {
  children: React.ReactNode
  className?: string
}

export function TabContentWrapper({ children, className }: TabContentWrapperProps) {
  const router = useRouterState()
  const pathname = router.location.pathname
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [currentTab, setCurrentTab] = React.useState('')

  const getActiveTab = () => {
    if (pathname?.startsWith('/admin/dashboard')) return 'dashboard'
    if (pathname?.startsWith('/admin/content')) return 'content'
    if (pathname?.startsWith('/admin/collections')) return 'collections'
    if (pathname?.startsWith('/admin/media')) return 'media'
    if (pathname?.startsWith('/admin/users')) return 'users'
    if (pathname?.startsWith('/admin/plugins')) return 'plugins'
    if (pathname?.startsWith('/admin/settings')) return 'settings'
    return 'dashboard'
  }

  const activeTab = getActiveTab()

  React.useEffect(() => {
    if (currentTab && currentTab !== activeTab) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setCurrentTab(activeTab)
        setIsTransitioning(false)
      }, 150)
      return () => clearTimeout(timer)
    } else if (!currentTab) {
      setCurrentTab(activeTab)
    }
  }, [activeTab, currentTab])

  const getTabColor = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'from-blue-500/5 to-transparent'
      case 'content':
        return 'from-emerald-500/5 to-transparent'
      case 'collections':
        return 'from-emerald-500/5 to-transparent'
      case 'media':
        return 'from-emerald-500/5 to-transparent'
      case 'users':
        return 'from-amber-500/5 to-transparent'
      case 'plugins':
        return 'from-violet-500/5 to-transparent'
      case 'settings':
        return 'from-amber-500/5 to-transparent'
      default:
        return 'from-gray-500/5 to-transparent'
    }
  }

  return (
    <div 
      className={cn(
        'relative min-h-[calc(100vh-120px)] transition-all duration-300 ease-in-out',
        'bg-gradient-to-b',
        getTabColor(activeTab),
        className
      )}
      data-active-tab={activeTab}
    >
      {/* Content container with proper isolation */}
      <div className={cn(
        'w-full transition-all duration-300 ease-in-out',
        isTransitioning 
          ? 'opacity-0 transform translate-y-2' 
          : 'opacity-100 transform translate-y-0'
      )}>
        <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
          {children}
        </div>
      </div>

      {/* Tab indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Active tab indicator */}
      <div className={cn(
        'absolute top-0 left-0 h-1 w-20 transition-all duration-300 ease-out',
        activeTab === 'dashboard' && 'bg-blue-500 left-8',
        activeTab === 'content' && 'bg-emerald-500 left-32',
        activeTab === 'collections' && 'bg-emerald-500 left-48',
        activeTab === 'media' && 'bg-emerald-500 left-64',
        activeTab === 'users' && 'bg-amber-500 left-80',
        activeTab === 'plugins' && 'bg-violet-500 left-96',
        activeTab === 'settings' && 'bg-amber-500 right-8',
      )} />
    </div>
  )
}