import { DashboardShell } from "@/components/dashboard-shell"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { PoolGrid } from "@/components/pool-grid"
import { FAQSection } from "@/components/faq-section"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <Header />
      <HeroSection />
      <StatsBar />
      <PoolGrid />
      <FAQSection />
    </DashboardShell>
  )
}
