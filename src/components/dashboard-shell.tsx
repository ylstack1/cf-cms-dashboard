'use client'

import * as React from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminTabbar } from '@/components/admin/admin-tabbar'
import { TabContentWrapper } from '@/components/admin/tab-content-wrapper'
import { PageHeader } from '@/components/admin/page-header'
import { PageActions } from '@/hooks/usePageActions'
import { cn } from '@/lib/utils'
import type { Plugin } from '@/types'

interface DashboardShellProps {
  children: React.ReactNode
  plugins?: Plugin[]
}

export function DashboardShell({ children, plugins }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <PageActions>
      <div className="relative min-h-screen bg-[#0b0c15] flex flex-col">
        {/* Desktop Sidebar */}
        {!isMobile && <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} plugins={plugins} />}
        
        {/* Mobile Tabbar */}
        {isMobile && <AdminTabbar plugins={plugins} />}
        
        <main
          className={cn(
            'flex-1 min-w-0 transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8',
            // Desktop margin adjustments
            !isMobile && 'lg:ml-[70px]',
            !isMobile && !isCollapsed && 'lg:ml-64',
          )}
        >
          <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* PageHeader - Dynamic title based on current route */}
            <PageHeader plugins={plugins} />
            
            {/* Content wrapper with tab switching support */}
            <TabContentWrapper>
              {children}
            </TabContentWrapper>
          </div>
        </main>
      </div>
    </PageActions>
  )
}
