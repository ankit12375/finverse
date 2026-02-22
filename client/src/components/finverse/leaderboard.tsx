import { motion } from "framer-motion";
import { leaderboard } from "@/lib/finverse-data";
import { Trophy, Crown, Medal, Flame, Zap, ChevronUp } from "lucide-react";

const rankIcons = [Crown, Trophy, Medal];
const rankColors = ["text-amber-400", "text-gray-300", "text-amber-600"];
const rankBgs = ["from-amber-500/20 to-yellow-500/10", "from-gray-400/15 to-gray-500/5", "from-amber-700/15 to-amber-800/5"];

export function Leaderboard() {
  return (
    <div id="leaderboard" className="max-w-4xl mx-auto px-4 py-16" data-testid="leaderboard">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase">Global Rankings</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3">Leaderboard</h2>
      </motion.div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-6 py-3 text-xs text-muted-foreground font-mono border-b border-purple-500/10">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Trader</div>
          <div className="col-span-2 text-center">Level</div>
          <div className="col-span-2 text-center">Streak</div>
          <div className="col-span-3 text-right">XP</div>
        </div>

        {leaderboard.map((user, i) => {
          const isTop3 = i < 3;
          const isCurrentUser = user.name === "Ankit_Sharma";
          const RankIcon = isTop3 ? rankIcons[i] : null;

          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`grid grid-cols-12 gap-2 px-6 py-4 items-center border-b border-white/5 transition-all duration-300 relative hover-elevate ${
                isCurrentUser ? "bg-purple-500/10 border-l-2 border-l-purple-500" : ""
              } ${isTop3 ? `bg-gradient-to-r ${rankBgs[i]}` : ""}`}
              data-testid={`leaderboard-row-${user.rank}`}
            >
              <div className="col-span-1">
                {RankIcon ? (
                  <RankIcon className={`w-5 h-5 ${rankColors[i]}`} />
                ) : (
                  <span className="text-sm font-mono text-muted-foreground">#{user.rank}</span>
                )}
              </div>

              <div className="col-span-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCurrentUser ? "bg-gradient-to-br from-purple-500 to-cyan-500 text-white" : "bg-white/10 text-foreground"
                }`}>
                  {user.avatar}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isCurrentUser ? "text-purple-400" : ""}`}>{user.name}</p>
                  <p className="text-[10px] text-muted-foreground">{user.badge}</p>
                </div>
              </div>

              <div className="col-span-2 text-center">
                <span className="text-sm font-display font-bold">{user.level}</span>
              </div>

              <div className="col-span-2 flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span className="text-sm font-mono">{user.streak}</span>
              </div>

              <div className="col-span-3 text-right">
                <span className="text-sm font-mono font-semibold flex items-center justify-end gap-1">
                  <Zap className="w-3 h-3 text-purple-400" />
                  {user.xp.toLocaleString()}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 text-center"
      >
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2">
          <ChevronUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-muted-foreground">You moved up <span className="text-emerald-400 font-bold">3 positions</span> this week</span>
        </div>
      </motion.div>
    </div>
  );
}
