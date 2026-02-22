import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { portfolioAssets } from "@/lib/finverse-data";
import { TrendingUp, TrendingDown } from "lucide-react";

function DonutChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  let cumulative = 0;

  return (
    <div ref={ref} className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        {portfolioAssets.map((asset, i) => {
          const offset = cumulative;
          cumulative += asset.allocation;
          const circumference = Math.PI * 2 * 38;
          const strokeLength = (asset.allocation / 100) * circumference;
          const strokeOffset = (offset / 100) * circumference;

          return (
            <motion.circle
              key={asset.ticker}
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke={asset.color}
              strokeWidth="8"
              strokeDasharray={`${strokeLength} ${circumference - strokeLength}`}
              strokeDashoffset={-strokeOffset}
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={inView ? { opacity: 1, pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: i * 0.15 }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs text-muted-foreground">Total Value</span>
        <span className="text-xl font-display font-bold">$284.7K</span>
        <span className="text-xs text-emerald-400 font-mono">+12.4%</span>
      </div>
    </div>
  );
}

function SparkLine({ positive }: { positive: boolean }) {
  const points = Array.from({ length: 20 }, (_, i) => {
    const base = positive ? 30 + i * 1.5 : 60 - i * 0.5;
    return `${i * 5},${base + (Math.random() - 0.5) * 15}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 100 80" className="w-20 h-8">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#10b981" : "#ef4444"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PortfolioChart() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16" data-testid="portfolio-chart">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-lg font-display font-bold mb-6">Asset Allocation</h3>
          <DonutChart />
          <div className="mt-6 grid grid-cols-2 gap-3">
            {portfolioAssets.map((asset) => (
              <div
                key={asset.ticker}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-300 relative hover-elevate ${
                  selectedAsset === asset.ticker ? "bg-purple-500/10 border border-purple-500/30" : ""
                }`}
                onClick={() => setSelectedAsset(selectedAsset === asset.ticker ? null : asset.ticker)}
                data-testid={`asset-${asset.ticker}`}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                <span className="text-xs font-medium">{asset.ticker}</span>
                <span className="text-xs text-muted-foreground ml-auto">{asset.allocation}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-lg font-display font-bold mb-6">Holdings</h3>
          <div className="space-y-3">
            {portfolioAssets.map((asset, i) => (
              <motion.div
                key={asset.ticker}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 p-3 rounded-xl transition-all duration-300 relative hover-elevate"
                data-testid={`holding-${asset.ticker}`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: asset.color + "20", color: asset.color }}>
                  {asset.ticker.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.ticker}</p>
                </div>
                <SparkLine positive={asset.change >= 0} />
                <div className="text-right">
                  <p className="text-sm font-mono font-semibold">${asset.value.toLocaleString()}</p>
                  <p className={`text-xs font-mono flex items-center gap-0.5 justify-end ${asset.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {asset.change >= 0 ? "+" : ""}{asset.change}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
