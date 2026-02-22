import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Flame, Trophy, Star } from "lucide-react";
import { achievements } from "@/lib/finverse-data";

function CircularProgress({ value, max, size = 120 }: { value: number; max: number; size?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const percentage = (value / max) * 100;
  const circumference = Math.PI * 2 * 42;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="6" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#xpGradient)"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-display font-bold">15</span>
        <span className="text-[10px] text-muted-foreground">LEVEL</span>
      </div>
    </div>
  );
}

export function XPProgress() {
  const [streak, setStreak] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const target = 42;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setStreak(current);
      if (current >= target) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-4 py-16" data-testid="xp-progress">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">Gamification Engine</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3">Your Progress</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8 flex flex-col items-center"
        >
          <CircularProgress value={12450} max={20000} />
          <div className="mt-6 text-center w-full">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>12,450 XP</span>
              <span>20,000 XP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-purple-500/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                initial={{ width: 0 }}
                whileInView={{ width: "62%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">7,550 XP to Level 16</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center animate-pulse-glow">
            <Flame className="w-10 h-10 text-amber-400" />
          </div>
          <p className="text-4xl font-display font-bold mt-4">{streak}</p>
          <p className="text-sm text-muted-foreground mt-1">Day Streak</p>
          <div className="flex gap-1 mt-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono ${
                  i < 5 ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-muted-foreground"
                }`}
              >
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">Keep logging in to maintain your streak!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-purple-400" />
            <h3 className="font-display font-bold">Achievements</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((badge, i) => (
              <motion.div
                key={badge.name}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, type: "spring" }}
                className={`flex flex-col items-center p-3 rounded-xl ${
                  badge.unlocked ? "bg-purple-500/10" : "bg-white/5 opacity-40"
                }`}
                data-testid={`achievement-${i}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  badge.unlocked ? "bg-gradient-to-br from-purple-500 to-cyan-500" : "bg-white/10"
                }`}>
                  <Star className={`w-5 h-5 ${badge.unlocked ? "text-white" : "text-muted-foreground"}`} />
                </div>
                <p className="text-[10px] text-center mt-2 leading-tight">{badge.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
