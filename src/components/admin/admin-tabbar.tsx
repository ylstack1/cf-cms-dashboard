'use client'

import { Link, useRouterState } from '@tanstack/react-router'
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  FileImage,
  Users,
  Settings,
  Plug,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Plugin } from '@/types'

interface AdminTabbarProps {
  plugins?: Plugin[]
}

interface TabItem {
  label: string
  href: string
  icon: any
  group: string
}

export function AdminTabbar({ plugins }: AdminTabbarProps) {
  const router = useRouterState()
  const pathname = router.location.pathname

  const mainTabs: TabItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', group: 'main' },
    { icon: FileText, label: 'Content', href: '/admin/content', group: 'content' },
    { icon: FolderTree, label: 'Collections', href: '/admin/collections', group: 'content' },
    { icon: FileImage, label: 'Media', href: '/admin/media', group: 'content' },
    { icon: Users, label: 'Users', href: '/admin/users', group: 'system' },
    { icon: Plug, label: 'Plugins', href: '/admin/plugins', group: 'system' },
    { icon: Settings, label: 'Settings', href: '/admin/settings', group: 'system' },
  ]

  const pluginTabs: TabItem[] = plugins?.flatMap(plugin =>
    plugin.menuItems?.map(menuItem => ({
      icon: Plug,
      label: menuItem.label,
      href: menuItem.href,
      group: 'plugins'
    })) || []
  ) || []

  const allTabs = [...mainTabs, ...pluginTabs]

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'main':
        return LayoutDashboard
      case 'content':
        return FolderTree
      case 'system':
        return Shield
      case 'plugins':
        return Plug
      default:
        return FolderTree
    }
  }

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'main':
        return 'text-blue-400'
      case 'content':
        return 'text-emerald-400'
      case 'system':
        return 'text-amber-400'
      case 'plugins':
        return 'text-violet-400'
      default:
        return 'text-gray-400'
    }
  }

  const getGroupBgColor = (group: string) => {
    switch (group) {
      case 'main':
        return 'bg-blue-500/10 border-blue-500/20'
      case 'content':
        return 'bg-emerald-500/10 border-emerald-500/20'
      case 'system':
        return 'bg-amber-500/10 border-amber-500/20'
      case 'plugins':
        return 'bg-violet-500/10 border-violet-500/20'
      default:
        return 'bg-gray-500/10 border-gray-500/20'
    }
  }

  const groupedTabs = allTabs.reduce((acc, tab) => {
    if (!acc[tab.group]) {
      acc[tab.group] = []
    }
    acc[tab.group].push(tab)
    return acc
  }, {} as Record<string, TabItem[]>)

  return (
    <div className="bg-[#0a0b11] border-b border-white/5 relative">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center p-2 min-w-max">
          {Object.entries(groupedTabs).map(([group, tabs], groupIndex) => (
            <div key={group} className="flex items-center">
              {/* Group separator */}
              {groupIndex > 0 && (
                <div className="flex items-center px-3">
                  <div className="w-px h-6 bg-white/10" />
                </div>
              )}
              
              {/* Group tabs with contextual styling */}
              <div className="flex items-center space-x-1">
                {/* Group icon indicator - hidden on small screens */}
                <div className={cn(
                  'hidden sm:flex items-center justify-center w-6 h-6 rounded-md border',
                  getGroupBgColor(group),
                  getGroupColor(group)
                )}>
                  <getGroupIcon className="w-3 h-3" />
                </div>
                
                {/* Tabs in this group */}
                {tabs.map((tab) => (
                  <Link
                    key={tab.href}
                    to={tab.href}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap',
                      'relative',
                      isActive(tab.href)
                        ? cn(
                            'text-white border shadow-lg transform scale-105',
                            getGroupBgColor(group).replace('/10', '/25').replace('/20', '/35')
                          )
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <tab.icon className={cn(
                      'w-4 h-4 shrink-0',
                      isActive(tab.href) && getGroupColor(group)
                    )} />
                    <span className="font-medium text-xs sm:text-sm hidden sm:inline">{tab.label}</span>
                    <span className="font-medium text-xs sm:hidden">{tab.label.slice(0, 3)}</span>
                    
                    {/* Active indicator */}
                    {isActive(tab.href) && (
                      <>
                        <div className={cn(
                          'absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full',
                          getGroupColor(group).replace('text-', 'bg-')
                        )} />
                        <div className={cn(
                          'w-1.5 h-1.5 rounded-full shrink-0 animate-pulse',
                          getGroupColor(group).replace('text-', 'bg-')
                        )} />
                      </>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0b11] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0b11] to-transparent pointer-events-none z-10" />
    </div>
  )
}