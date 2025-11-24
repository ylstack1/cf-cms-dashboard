import { ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PoolGrid() {
  const pools = [
    { id: 1, token: "DYP", apr: "25%", tvl: "$12,694.01", lockTime: "90 days", isNew: true },
    { id: 2, token: "DYP", apr: "25%", tvl: "$12,692.27", lockTime: "90 days", isNew: false },
    { id: 3, token: "DYP", apr: "20%", tvl: "$11,049.65", lockTime: "120 days", isNew: false },
    { id: 4, token: "DYP", apr: "15%", tvl: "$65,211.71", lockTime: "60 days", isNew: true },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {pools.map((pool) => (
        <div
          key={pool.id}
          className="group relative bg-[#12131f] rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300"
        >
          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1a1c2e] flex items-center justify-center border border-white/10 relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#12131f] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-300 text-xs uppercase mb-1">{pool.token}</h4>
                  <span className="text-lg font-bold text-white">{pool.apr} APR</span>
                </div>
              </div>
              {pool.isNew && (
                <span className="px-3 py-1 rounded-full bg-[#1a1c2e] border border-blue-500/30 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  New
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                  Total value locked
                </span>
                <span className="text-sm font-bold text-white">{pool.tvl}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Lock Time</span>
                <span className="text-sm font-bold text-white">{pool.lockTime}</span>
              </div>
            </div>

            <Button className="w-full bg-[#1a1c2e] hover:bg-[#252840] text-blue-400 border border-blue-500/20 rounded-xl py-6 flex items-center justify-between group-hover:bg-[#5E72E4] group-hover:text-white group-hover:border-transparent transition-all duration-300">
              <span className="font-medium">Deposit</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
