import { TrendingUp, TrendingDown } from "lucide-react";
import { tickerData } from "@/lib/finverse-data";

export function TickerMarquee() {
  const items = [...tickerData, ...tickerData];

  return (
    <div className="w-full overflow-hidden border-y border-purple-500/20 bg-black/40 backdrop-blur-sm py-3" data-testid="ticker-marquee">
      <div className="animate-ticker flex gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="flex items-center gap-2 font-mono text-sm">
            <span className="text-purple-400 font-semibold">{item.symbol}</span>
            <span className="text-foreground">${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            <span className={`flex items-center gap-0.5 ${item.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.change >= 0 ? "+" : ""}{item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
