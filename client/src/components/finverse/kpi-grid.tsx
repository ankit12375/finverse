import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wallet, TrendingUp, Target, Zap } from "lucide-react";
import { kpiData } from "@/lib/finverse-data";

const iconMap: Record<string, typeof Wallet> = { Wallet, TrendingUp, Target, Zap };

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display font-bold text-2xl sm:text-3xl animate-counter-glow">
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

export function KPIGrid() {
  return (
    <div id="dashboard" className="max-w-6xl mx-auto px-4 py-16" data-testid="kpi-grid">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">Real-Time Analytics</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3">Portfolio Command Center</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => {
          const Icon = iconMap[kpi.icon] || Zap;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card glass-card-hover rounded-xl p-6 relative overflow-hidden"
              data-testid={`kpi-card-${i}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full" />
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <span className={`text-xs font-mono font-semibold ${kpi.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {kpi.change >= 0 ? "+" : ""}{kpi.change}%
                </span>
              </div>
              <AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
              <p className="text-xs text-muted-foreground mt-2">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
