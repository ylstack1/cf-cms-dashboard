import { DollarSign, Wallet, Activity, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function StatsBar() {
  const stats = [
    {
      label: "Total Value Locked",
      value: "$145,231,890",
      change: "+5.2%",
      isPositive: true,
      icon: DollarSign,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      label: "DYP Price",
      value: "$0.1523",
      change: "+12.5%",
      isPositive: true,
      icon: TrendingUp,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      label: "Total Paid Rewards",
      value: "$42,345,112",
      change: "+2.3%",
      isPositive: true,
      icon: Wallet,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Active Stakers",
      value: "12,453",
      change: "-0.5%",
      isPositive: false,
      icon: Activity,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#12131f] rounded-2xl p-6 border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
            >
              {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {stat.change}
            </div>
          </div>
          <div>
            <span className="text-gray-400 text-sm font-medium block mb-1">{stat.label}</span>
            <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}
