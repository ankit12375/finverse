import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden" data-testid="cta-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">Ready to Level Up?</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4 leading-tight">
            Start Your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Financial Quest
            </span>
          </h2>
          <p className="text-muted-foreground mt-6 text-lg max-w-xl mx-auto">
            Join thousands of traders leveling up their portfolio game. Track, learn, earn, and compete.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 border-0 text-white px-10 py-6 text-base font-semibold rounded-full animate-pulse-glow group" data-testid="button-cta-start">
              <Zap className="w-5 h-5 mr-2" />
              Start Free
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            {[
              { value: "10K+", label: "Active Traders" },
              { value: "2M+", label: "Quests Completed" },
              { value: "$50B", label: "Tracked Assets" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="font-display font-bold text-lg">Built by Ankit Sharma</p>
              <p className="text-sm text-muted-foreground">Full-Stack Developer | AI/GenAI | Enterprise Solutions</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/ankit12375" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 transition-colors font-mono" data-testid="link-github">
                github.com/ankit12375
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center">
        <p className="text-xs text-muted-foreground font-mono">
          FINVERSE v1.0 | Powered by Next-Gen Financial Intelligence
        </p>
      </footer>
    </section>
  );
}
