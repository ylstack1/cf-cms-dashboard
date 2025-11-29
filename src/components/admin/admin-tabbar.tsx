'use client'

import * as React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  FileImage,
  Users,
  Plug,
  Settings,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Archive,
  Search,
  Filter,
  Grid3x3,
  List,
  Upload,
  Download,
  Shield,
  Database,
  Palette,
  Globe,
  Mail,
  Bell,
  Lock,
  Key,
  UserCheck,
  UserPlus,
  UserX,
  Folder,
  FolderOpen,
  File,
  FilePlus,
  FolderPlus,
  FolderCog,
  FolderLock,
  FolderGit,
  FolderHeart,
  FolderSearch,
  FolderSync,
  FolderEdit,
  FolderMinus,
  FolderX,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Plugin } from '@/types'

interface AdminTabbarProps {
  plugins?: Plugin[]
}

interface TabItem {
  label: string
  href: string
  icon: any
  group: string
  subItems?: SubTabItem[]
}

interface SubTabItem {
  label: string
  href: string
  icon: any
}

export function AdminTabbar({ plugins }: AdminTabbarProps) {
  const router = useRouterState()
  const pathname = router.location.pathname
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set(['content']))

  const mainTabs: TabItem[] = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/admin/dashboard', 
      group: 'main' 
    },
    { 
      icon: FileText, 
      label: 'Content', 
      href: '/admin/content', 
      group: 'content',
      subItems: [
        { icon: FilePlus, label: 'New', href: '/admin/content/new' },
        { icon: Edit, label: 'Edit', href: '/admin/content/edit' },
        { icon: Archive, label: 'Archived', href: '/admin/content/archived' },
        { icon: Trash2, label: 'Trash', href: '/admin/content/trash' },
      ]
    },
    { 
      icon: FolderTree, 
      label: 'Collections', 
      href: '/admin/collections', 
      group: 'content',
      subItems: [
        { icon: FolderPlus, label: 'New Collection', href: '/admin/collections/new' },
        { icon: FolderCog, label: 'Manage', href: '/admin/collections/manage' },
      ]
    },
    { 
      icon: FileImage, 
      label: 'Media', 
      href: '/admin/media', 
      group: 'content',
      subItems: [
        { icon: Upload, label: 'Upload', href: '/admin/media/upload' },
        { icon: Grid3x3, label: 'Gallery', href: '/admin/media/gallery' },
        { icon: Folder, label: 'Folders', href: '/admin/media/folders' },
      ]
    },
    { 
      icon: Users, 
      label: 'Users', 
      href: '/admin/users', 
      group: 'system',
      subItems: [
        { icon: UserPlus, label: 'Add User', href: '/admin/users/new' },
        { icon: UserCheck, label: 'Roles', href: '/admin/users/roles' },
        { icon: UserX, label: 'Blocked', href: '/admin/users/blocked' },
      ]
    },
    { 
      icon: Plug, 
      label: 'Plugins', 
      href: '/admin/plugins', 
      group: 'system',
      subItems: [
        { icon: Plus, label: 'Install', href: '/admin/plugins/install' },
        { icon: Settings, label: 'Configure', href: '/admin/plugins/configure' },
      ]
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/admin/settings', 
      group: 'system',
      subItems: [
        { icon: Globe, label: 'General', href: '/admin/settings/general' },
        { icon: Palette, label: 'Appearance', href: '/admin/settings/appearance' },
        { icon: Mail, label: 'Email', href: '/admin/settings/email' },
        { icon: Shield, label: 'Security', href: '/admin/settings/security' },
        { icon: Bell, label: 'Notifications', href: '/admin/settings/notifications' },
        { icon: Lock, label: 'Privacy', href: '/admin/settings/privacy' },
        { icon: Key, label: 'API', href: '/admin/settings/api' },
        { icon: Database, label: 'Backup', href: '/admin/settings/backup' },
      ]
    },
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

  const isSubActive = (href: string) => {
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
        return Folder
    }
  }

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'main':
        return 'text-blue-400 border-blue-500/20 bg-blue-500/10'
      case 'content':
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
      case 'system':
        return 'text-amber-400 border-amber-500/20 bg-amber-500/10'
      case 'plugins':
        return 'text-violet-400 border-violet-500/20 bg-violet-500/10'
      default:
        return 'text-gray-400 border-gray-500/20 bg-gray-500/10'
    }
  }

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(group)) {
      newExpanded.delete(group)
    } else {
      newExpanded.add(group)
    }
    setExpandedGroups(newExpanded)
  }

  const groupedTabs = allTabs.reduce((acc, tab) => {
    if (!acc[tab.group]) {
      acc[tab.group] = []
    }
    acc[tab.group].push(tab)
    return acc
  }, {} as Record<string, TabItem[]>)

  return (
    <div className="bg-[#0a0b11] border-b border-white/5">
      {/* Main tabbar */}
      <div className="overflow-x-auto">
        <div className="flex items-center p-2 min-w-max">
          {Object.entries(groupedTabs).map(([group, tabs], groupIndex) => (
            <div key={group} className="flex items-center">
              {/* Group separator */}
              {groupIndex > 0 && (
                <div className="flex items-center px-3">
                  <div className="w-px h-6 bg-white/10" />
                </div>
              )}
              
              {/* Group tabs */}
              <div className="flex items-center space-x-1">
                {/* Group icon */}
                <div className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-md border',
                  getGroupColor(group)
                )}>
                  <getGroupIcon className="w-3 h-3" />
                </div>
                
                {/* Tabs in this group */}
                {tabs.map((tab) => (
                  <div key={tab.href} className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className={cn(
                        'flex items-center gap-2 h-8 px-3 rounded-lg transition-all duration-200 whitespace-nowrap',
                        isActive(tab.href)
                          ? cn(
                              'text-white border shadow-lg',
                              getGroupColor(tab.group)
                            )
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Link to={tab.href}>
                        <tab.icon className={cn(
                          'w-4 h-4 shrink-0',
                          isActive(tab.href) && getGroupColor(tab.group).split(' ')[0]
                        )} />
                        <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
                        {tab.subItems && (
                          <ChevronDown className={cn(
                            'w-3 h-3 transition-transform duration-200',
                            expandedGroups.has(tab.group) && 'rotate-180'
                          )} />
                        )}
                        {isActive(tab.href) && (
                          <div className={cn(
                            'w-1.5 h-1.5 rounded-full shrink-0',
                            getGroupColor(tab.group).split(' ')[0].replace('text-', 'bg-')
                          )} />
                        )}
                      </Link>
                    </Button>
                    
                    {/* Expand/Collapse button for groups with sub-items */}
                    {tab.subItems && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleGroup(tab.group)}
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 p-0 rounded-full bg-[#0a0b11] border border-white/10"
                      >
                        <ChevronDown className={cn(
                          'w-2 h-2 transition-transform duration-200',
                          expandedGroups.has(tab.group) && 'rotate-180'
                        )} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-tabbar */}
      <div className="border-t border-white/5">
        <div className="overflow-x-auto">
          <div className="flex items-center p-2 min-w-max space-x-1">
            {allTabs
              .filter(tab => tab.subItems && expandedGroups.has(tab.group))
              .flatMap(tab => 
                tab.subItems?.map(subItem => (
                  <Button
                    key={subItem.href}
                    variant="ghost"
                    size="sm"
                    asChild
                    className={cn(
                      'flex items-center gap-1.5 h-7 px-2 rounded-md transition-all duration-200 whitespace-nowrap',
                      isSubActive(subItem.href)
                        ? cn(
                            'text-white border text-xs',
                            getGroupColor(tab.group)
                          )
                        : 'text-gray-500 hover:text-white hover:bg-white/5 text-xs'
                    )}
                  >
                    <Link to={subItem.href}>
                      <subItem.icon className="w-3 h-3 shrink-0" />
                      <span className="font-medium">{subItem.label}</span>
                    </Link>
                  </Button>
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  )
}