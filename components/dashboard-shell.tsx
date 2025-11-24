"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
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
    <div className="relative min-h-screen bg-[#0b0c15] flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={cn(
          "flex-1 min-w-0 transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8",
          "ml-[70px]",
          !isCollapsed && "lg:ml-64",
        )}
      >
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">{children}</div>
      </main>
    </div>
  )
}
