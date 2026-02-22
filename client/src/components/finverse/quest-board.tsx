import { motion } from "framer-motion";
import { quests } from "@/lib/finverse-data";
import { Diamond, Layers, Rocket, BookOpen, Shield, Flame, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, typeof Diamond> = { Diamond, Layers, Rocket, BookOpen, Shield, Flame };

const difficultyConfig = {
  easy: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  medium: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  hard: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  legendary: { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
};

export function QuestBoard() {
  return (
    <div id="quests" className="max-w-6xl mx-auto px-4 py-16" data-testid="quest-board">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">Active Missions</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3">Quest Board</h2>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm">Complete financial quests to earn XP, unlock achievements, and level up your trading profile.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quests.map((quest, i) => {
          const Icon = iconMap[quest.icon] || Zap;
          const diff = difficultyConfig[quest.difficulty];
          const progress = Math.min((quest.progress / quest.total) * 100, 100);
          const isComplete = progress >= 100;

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`glass-card glass-card-hover rounded-xl p-6 relative overflow-hidden ${isComplete ? "border-emerald-500/30" : ""}`}
              data-testid={`quest-card-${quest.id}`}
            >
              {isComplete && (
                <div className="absolute top-3 right-3">
                  <span className="text-emerald-400 text-xs font-mono font-bold">COMPLETED</span>
                </div>
              )}

              <div className="flex items-start gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${diff.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${diff.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{quest.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{quest.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className={`text-[10px] ${diff.color} ${diff.border}`}>
                  {quest.difficulty}
                </Badge>
                <Badge variant="outline" className="text-[10px] text-muted-foreground">
                  {quest.category}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {quest.progress}/{quest.total}
                  </span>
                  <span className="font-mono text-purple-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" />{quest.xp} XP
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${isComplete ? "bg-emerald-500" : "bg-gradient-to-r from-purple-500 to-cyan-500"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
