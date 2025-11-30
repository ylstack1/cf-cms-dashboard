'use client'

import { Link, useRouterState } from '@tanstack/react-router'
import {
  FileText,
  Plus,
  Edit,
  Eye,
  Archive,
  Trash2,
  Search,
  Filter,
  Grid3x3,
  List,
  FolderPlus,
  FolderEdit,
  FolderLock,
  Upload,
  Download,
  UserPlus,
  UserCheck,
  Shield,
  Settings,
  Database,
  Palette,
  Globe,
  Mail,
  Bell,
  Key,
  Lock,
  Plug,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubTabbarProps {
  section: string
}

interface SubTab {
  label: string
  href: string
  icon: any
  description?: string
}

export function SubTabbar({ section }: SubTabbarProps) {
  const router = useRouterState()
  const pathname = router.location.pathname

  const getSubTabs = (section: string): SubTab[] => {
    switch (section) {
      case 'content':
        return [
          { icon: Grid3x3, label: 'All Content', href: '/admin/content', description: 'View all content items' },
          { icon: Plus, label: 'Create', href: '/admin/content/create', description: 'Create new content' },
          { icon: Edit, label: 'Drafts', href: '/admin/content/drafts', description: 'View draft content' },
          { icon: Archive, label: 'Archived', href: '/admin/content/archived', description: 'Archived content' },
          { icon: Trash2, label: 'Trash', href: '/admin/content/trash', description: 'Deleted content' },
        ]
      
      case 'collections':
        return [
          { icon: Grid3x3, label: 'All Collections', href: '/admin/collections', description: 'View all collections' },
          { icon: FolderPlus, label: 'New Collection', href: '/admin/collections/create', description: 'Create new collection' },
          { icon: FolderEdit, label: 'Manage', href: '/admin/collections/manage', description: 'Manage collections' },
        ]
      
      case 'media':
        return [
          { icon: Grid3x3, label: 'Library', href: '/admin/media', description: 'Media library' },
          { icon: Upload, label: 'Upload', href: '/admin/media/upload', description: 'Upload new files' },
          { icon: FolderPlus, label: 'Folders', href: '/admin/media/folders', description: 'Manage folders' },
          { icon: Download, label: 'Downloads', href: '/admin/media/downloads', description: 'Download history' },
        ]
      
      case 'users':
        return [
          { icon: Grid3x3, label: 'All Users', href: '/admin/users', description: 'View all users' },
          { icon: UserPlus, label: 'Invite', href: '/admin/users/invite', description: 'Invite new users' },
          { icon: UserCheck, label: 'Roles', href: '/admin/users/roles', description: 'Manage user roles' },
          { icon: Shield, label: 'Permissions', href: '/admin/users/permissions', description: 'User permissions' },
        ]
      
      case 'plugins':
        return [
          { icon: Grid3x3, label: 'Installed', href: '/admin/plugins', description: 'Installed plugins' },
          { icon: Plus, label: 'Browse', href: '/admin/plugins/browse', description: 'Browse plugins' },
          { icon: Wrench, label: 'Settings', href: '/admin/plugins/settings', description: 'Plugin settings' },
        ]
      
      case 'settings':
        return [
          { icon: Globe, label: 'General', href: '/admin/settings', description: 'General settings' },
          { icon: Palette, label: 'Appearance', href: '/admin/settings/appearance', description: 'Theme and styling' },
          { icon: Mail, label: 'Email', href: '/admin/settings/email', description: 'Email configuration' },
          { icon: Bell, label: 'Notifications', href: '/admin/settings/notifications', description: 'Notification settings' },
          { icon: Key, label: 'Security', href: '/admin/settings/security', description: 'Security settings' },
          { icon: Database, label: 'Advanced', href: '/admin/settings/advanced', description: 'Advanced settings' },
        ]
      
      default:
        return []
    }
  }

  const subTabs = getSubTabs(section)
  
  if (subTabs.length === 0) {
    return null
  }

  const isActive = (href: string) => {
    if (href === `/admin/${section}`) {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className="bg-[#12131f] border-b border-white/5 overflow-x-auto">
      <div className="flex items-center p-2 min-w-max">
        {subTabs.map((tab, index) => (
          <Link
            key={tab.href}
            to={tab.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap',
              isActive(tab.href)
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
            title={tab.description}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
            {isActive(tab.href) && (
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}