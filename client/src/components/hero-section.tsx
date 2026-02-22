import { Search, Github, Download, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <div className="relative overflow-visible bg-gradient-to-br from-background via-background to-accent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
              <Zap className="w-3 h-3 mr-1" />
              10 Production-Ready Projects
            </Badge>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            data-testid="text-hero-title"
          >
            <span className="text-foreground">GitHub Portfolio</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-1 bg-clip-text text-transparent">
              Showcase
            </span>
          </h1>

          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4"
            data-testid="text-hero-subtitle"
          >
            Curated collection of projects demonstrating full-stack development,
            AI/GenAI workflows, and modern engineering practices.
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            By <span className="font-semibold text-foreground">Ankit Sharma</span>{" "}
            — Java Backend Developer | Spring Boot | Microservices | AI Automation
          </p>

          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <Badge variant="outline" className="text-xs">
              <Github className="w-3 h-3 mr-1" />
              Open Source
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Download className="w-3 h-3 mr-1" />
              Downloadable
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Some Run Instantly
            </Badge>
          </div>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects, technologies..."
              className="pl-10 bg-card border-card-border"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
