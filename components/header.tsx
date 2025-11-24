import { ChevronDown, Wallet, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "@/components/sidebar"

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-white -ml-2">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-white/5 bg-[#0a0b11] w-64 border-none text-white">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-xl font-bold text-white">Good Morning, Dypian!</h1>
          <p className="text-sm text-gray-400 mt-1 hidden sm:block">
            Explore latest trends, news, and powerful dApps access.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#181a25] border-white/10 hover:bg-white/10 w-10 h-10 text-gray-400 hidden sm:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
            <path d="M7 6h1v4" />
            <path d="m16.71 13.88.7 .71-2.82 2.82" />
          </svg>
        </Button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#181a25] rounded-full border border-white/10">
          <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
            Ξ
          </div>
          <span className="text-sm font-medium">Ethereum</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        <Button className="bg-[#5E72E4] hover:bg-[#4b5bc2] text-white rounded-full px-4 sm:px-6 shadow-[0_4px_14px_0_rgba(94,114,228,0.39)]">
          <Wallet className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Connect Wallet</span>
          <span className="sm:hidden">Connect</span>
        </Button>

        <Avatar className="h-10 w-10 border-2 border-purple-500/30">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">DY</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
