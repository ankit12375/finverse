import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  ExternalLink,
  Brain,
  Landmark,
  Globe,
  Activity,
  Sparkles,
  BarChart3,
  Bot,
  ShieldAlert,
  MessageSquare,
  GitBranch,
  Zap,
} from "lucide-react";
import type { Project } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, typeof Brain> = {
  Brain, Landmark, Globe, Activity, Sparkles,
  BarChart3, Bot, ShieldAlert, MessageSquare, GitBranch,
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  intermediate: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  advanced: "bg-red-500/10 text-red-700 dark:text-red-400",
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const Icon = iconMap[project.icon] || Brain;
  const { toast } = useToast();

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/projects/${project.id}/download`);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.title.toLowerCase().replace(/\s+/g, "-")}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Download started",
        description: `${project.title} project files are downloading.`,
      });
    } catch {
      toast({
        title: "Download failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      className="group cursor-pointer hover-elevate transition-all duration-300 flex flex-col border-card-border"
      onClick={onClick}
      style={{ animationDelay: `${index * 60}ms` }}
      data-testid={`card-project-${project.id}`}
    >
      <div className={`relative h-32 bg-gradient-to-br ${project.gradient} rounded-t-md flex items-center justify-center`}>
        <Icon className="w-12 h-12 text-white/90" />
        {project.instantRun && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-[10px] font-semibold bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Zap className="w-2.5 h-2.5 mr-0.5" />
              Instant Run
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="text-[10px] bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {project.categoryLabel}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base leading-tight" data-testid={`text-project-title-${project.id}`}>
            {project.title}
          </h3>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          {project.subtitle}
        </p>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-[10px] px-1.5 py-0">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={handleDownload}
            data-testid={`button-download-${project.id}`}
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            data-testid={`button-details-${project.id}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
