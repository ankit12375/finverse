import { Code2, Layers, Cpu, FileCode } from "lucide-react";

const stats = [
  { icon: Layers, label: "Full-Stack Apps", value: "3", color: "text-chart-1" },
  { icon: Code2, label: "Backend", value: "1", color: "text-chart-2" },
  { icon: Cpu, label: "AI / GenAI", value: "2", color: "text-chart-4" },
  { icon: FileCode, label: "Instant HTML", value: "3", color: "text-chart-5" },
];

export function StatsBar() {
  return (
    <div className="border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 justify-center"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className={`${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
