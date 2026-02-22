import { motion } from "framer-motion";
import { GlitchText } from "./glitch-text";
import { ChevronDown, Zap, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4" data-testid="hero-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-orb" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px] animate-orb" style={{ animationDelay: "-7s" }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500/6 blur-[80px] animate-orb" style={{ animationDelay: "-14s" }} />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: "linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-full px-6 py-3 flex items-center gap-6"
          data-testid="nav-bar"
        >
          <span className="font-display text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            FINVERSE
          </span>
          <div className="w-px h-5 bg-purple-500/30" />
          <div className="flex gap-4 text-sm">
            {["Dashboard", "Quests", "Arena", "Leaderboard"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-muted-foreground transition-colors duration-300 hover:text-foreground" data-testid={`nav-link-${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>
        </motion.nav>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400">LIVE MARKETS</span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground">Level 15 Trader</span>
        </motion.div>

        <GlitchText
          text="MASTER THE"
          className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight leading-none text-foreground"
          delay={600}
        />
        <GlitchText
          text="FINANCIAL VERSE"
          className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight leading-none bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mt-2"
          delay={1200}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Track your portfolio, complete financial quests, earn XP, and climb the leaderboard.
          <span className="text-purple-400"> The future of finance is gamified.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 border-0 text-white px-8 py-6 text-base font-semibold rounded-full animate-pulse-glow" data-testid="button-launch">
            <Zap className="w-5 h-5 mr-2" />
            Launch Dashboard
          </Button>
          <Button variant="outline" className="border-purple-500/30 text-purple-400 px-8 py-6 text-base rounded-full" data-testid="button-explore">
            Explore Quests
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          {[
            { icon: TrendingUp, label: "Live Trading", value: "24/7" },
            { icon: Shield, label: "Risk Score", value: "A+" },
            { icon: Zap, label: "XP Rate", value: "2.4x" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <p className="text-xl font-bold font-display animate-counter-glow">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-8 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-purple-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
