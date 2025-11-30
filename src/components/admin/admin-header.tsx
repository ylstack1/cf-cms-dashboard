'use client'

import { Menu, Bell, Search, Plus, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AdminSidebarContent } from '@/components/admin/admin-sidebar'
import { cn } from '@/lib/utils'
import type { Plugin } from '@/types'

interface AdminHeaderProps {
  plugins?: Plugin[]
  title?: string
  actions?: React.ReactNode
}

export function AdminHeader({ plugins, title, actions }: AdminHeaderProps) {
  return (
    <>
      {/* Mobile Header - Only shown when tabbar is not present */}
      <header className="lg:hidden flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Fallback menu for desktop sidebar access on mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-white/5 bg-[#0a0b11] w-64 border-none text-white">
              <AdminSidebarContent plugins={plugins} />
            </SheetContent>
          </Sheet>
          
          {title && (
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {actions}
          
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Desktop Header - Enhanced with actions */}
      <header className="hidden lg:flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {title && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Search className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          
          {actions}
        </div>
      </header>
    </>
  )
}
