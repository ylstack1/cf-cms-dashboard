import { Play } from "lucide-react"

export function HeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Banner */}
      <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#212440] to-[#12131f] border border-white/5 p-8 flex flex-col justify-center min-h-[300px]">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] -ml-16 -mb-16" />

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dypius Earn</h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
            Maximize your assets with Dypius Earn products. Dypius provides three productive methods to utilize your
            assets: Staking, Farming, and Vault. Begin earning now!
          </p>

          <div className="flex items-center gap-8">
            <StatItem icon="⚡" value="9,188" />
            <StatItem icon="💰" value="10,195" />
            <StatItem icon="⏱" value="27,000" />
          </div>
        </div>

        {/* Decorative Planet/Swirl */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-64 h-64 pointer-events-none hidden md:block">
          <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl transform rotate-45 shadow-[0_0_50px_rgba(124,58,237,0.5)] flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-white/30 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Video/Feature Card */}
      <div className="rounded-3xl bg-[#141522] border border-white/5 p-4 flex flex-col">
        <div className="relative aspect-video rounded-xl bg-black overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=350')] bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-white ml-1" />
            </div>
          </div>
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500" />
            <span className="text-xs font-medium text-white shadow-black drop-shadow-md">
              DeFi Yield Protocol (DYP)...
            </span>
          </div>
        </div>
        <div className="mt-4 px-2">
          <h3 className="text-white font-medium">Dypius</h3>
          <p className="text-sm text-gray-500">Embrace new opportunities</p>
        </div>
      </div>
    </div>
  )
}

function StatItem({ icon, value }: { icon: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs">{icon}</div>
      <span className="text-white font-medium">{value}</span>
    </div>
  )
}
