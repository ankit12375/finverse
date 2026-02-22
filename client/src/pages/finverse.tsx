import { ParticleBackground } from "@/components/finverse/particle-background";
import { HeroSection } from "@/components/finverse/hero-section";
import { TickerMarquee } from "@/components/finverse/ticker-marquee";
import { KPIGrid } from "@/components/finverse/kpi-grid";
import { PortfolioChart } from "@/components/finverse/portfolio-chart";
import { XPProgress } from "@/components/finverse/xp-progress";
import { QuestBoard } from "@/components/finverse/quest-board";
import { Leaderboard } from "@/components/finverse/leaderboard";
import { CTASection } from "@/components/finverse/cta-section";

export default function FinVerse() {
  return (
    <div className="min-h-screen bg-background relative" data-testid="finverse-app">
      <ParticleBackground />

      <div className="relative z-10">
        <HeroSection />
        <TickerMarquee />
        <KPIGrid />
        <PortfolioChart />
        <XPProgress />
        <QuestBoard />
        <Leaderboard />
        <CTASection />
      </div>

      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-50 pointer-events-none" />
    </div>
  );
}
