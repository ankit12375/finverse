import type { ProjectCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Layers, Code2, Layout, Cpu, FileCode, Grid3X3 } from "lucide-react";

interface FilterTabsProps {
  activeFilter: ProjectCategory | "all";
  onFilterChange: (filter: ProjectCategory | "all") => void;
}

const filters: { value: ProjectCategory | "all"; label: string; icon: typeof Layers }[] = [
  { value: "all", label: "All Projects", icon: Grid3X3 },
  { value: "fullstack", label: "Full-Stack", icon: Layers },
  { value: "backend", label: "Backend", icon: Code2 },
  { value: "frontend", label: "Frontend", icon: Layout },
  { value: "ai-genai", label: "AI / GenAI", icon: Cpu },
  { value: "html-instant", label: "Instant HTML", icon: FileCode },
];

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap pt-8">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          data-testid={`button-filter-${filter.value}`}
        >
          <filter.icon className="w-3.5 h-3.5 mr-1.5" />
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
