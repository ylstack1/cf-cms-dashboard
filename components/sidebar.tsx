"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Coins,
  Sprout,
  Vote,
  ArrowLeftRight,
  Wallet,
  Settings,
  HelpCircle,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Store,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export function SidebarContent({ collapsed = false, className }: { collapsed?: boolean; className?: string }) {
  const mainMenuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: Coins, label: "Staking", active: false },
    { icon: Sprout, label: "Farming", active: false },
    { icon: Wallet, label: "Vault", active: false },
    { icon: ArrowLeftRight, label: "Bridge", active: false },
    { icon: Vote, label: "Governance", active: false },
  ]

  const otherMenuItems = [
    { icon: CreditCard, label: "Buy DYP" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Support" },
  ]

  return (
    <div className={cn("flex flex-col bg-[#0a0b11]", className)}>
      {/* Header */}
      <div className={cn("flex items-center gap-3 p-4", collapsed ? "justify-center" : "px-6")}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
          <Store className="w-5 h-5 text-white" />
        </div>
        <span
          className={cn(
            "font-bold text-lg tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-all duration-300",
            collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block",
          )}
        >
          DYPIUS EARN
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-hide">
        <div>
          <h3
            className={cn(
              "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-6 transition-all duration-300 whitespace-nowrap overflow-hidden",
              collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block",
            )}
          >
            Menu
          </h3>
          <nav className="space-y-1 px-3">
            {mainMenuItems.map((item) => (
              <Link
                key={item.label}
                href="#"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  item.active ? "bg-indigo-500/10 text-indigo-400" : "text-gray-400 hover:text-white hover:bg-white/5",
                  collapsed && "justify-center",
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors shrink-0",
                    item.active ? "text-indigo-400" : "text-gray-500 group-hover:text-white",
                  )}
                />
                <span
                  className={cn(
                    "font-medium text-sm whitespace-nowrap transition-all duration-300",
                    collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block",
                  )}
                >
                  {item.label}
                </span>

                {item.active && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3
            className={cn(
              "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-6 transition-all duration-300 whitespace-nowrap overflow-hidden",
              collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block",
            )}
          >
            Settings
          </h3>
          <nav className="space-y-1 px-3">
            {otherMenuItems.map((item) => (
              <Link
                key={item.label}
                href="#"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                  "text-gray-400 hover:text-white hover:bg-white/5",
                  collapsed && "justify-center",
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 text-gray-500 group-hover:text-white shrink-0" />
                <span
                  className={cn(
                    "font-medium text-sm whitespace-nowrap transition-all duration-300",
                    collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-[#0a0b11]">
        <div className={cn("flex items-center gap-3 px-2 transition-all duration-300", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
            DY
          </div>
          <div
            className={cn(
              "flex flex-col overflow-hidden transition-all duration-300",
              collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 flex",
            )}
          >
            <span className="text-sm font-bold text-white truncate">Dypian User</span>
            <span className="text-xs text-gray-500 truncate">Premium Member</span>
          </div>
          {!collapsed && (
            <LogOut className="w-4 h-4 text-gray-500 ml-auto hover:text-red-400 cursor-pointer shrink-0" />
          )}
        </div>
      </div>
    </div>
  )
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#0a0b11] border-r border-white/5 transition-all duration-300 z-50 flex flex-col",
        isCollapsed ? "w-[70px]" : "w-64",
      )}
    >
      {/* Sidebar Content */}
      <SidebarContent collapsed={isCollapsed} className="flex-1 min-h-0" />

      {/* Toggle Button */}
      <div className="p-3 border-t border-white/5 bg-[#0a0b11]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full h-8 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </aside>
  )
}
