import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  CheckCircle2,
  FolderTree,
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
  Code2,
} from "lucide-react";
import type { Project } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, typeof Brain> = {
  Brain, Landmark, Globe, Activity, Sparkles,
  BarChart3, Bot, ShieldAlert, MessageSquare, GitBranch,
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { toast } = useToast();

  if (!project) return null;

  const Icon = iconMap[project.icon] || Brain;

  const handleDownload = async () => {
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
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className={`w-full h-28 bg-gradient-to-br ${project.gradient} rounded-md flex items-center justify-center mb-4 -mt-2`}>
            <Icon className="w-10 h-10 text-white/90" />
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant="secondary" className="text-xs">
              {project.categoryLabel}
            </Badge>
            {project.instantRun && (
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Instant Run
              </Badge>
            )}
            <Badge variant="outline" className="text-xs capitalize">
              {project.difficulty}
            </Badge>
          </div>
          <DialogTitle className="text-xl" data-testid="text-modal-title">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {project.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          <div>
            <p className="text-sm text-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-muted-foreground" />
              Tech Stack
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-chart-2 mt-0.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-muted-foreground" />
              Project Structure
            </h4>
            <div className="bg-card rounded-md p-3 border border-card-border">
              <ul className="space-y-1.5 font-mono text-xs">
                {project.githubStructure.map((item, i) => (
                  <li key={i} className="text-muted-foreground">
                    <span className="text-foreground font-medium">
                      {item.split(" - ")[0]}
                    </span>
                    {item.includes(" - ") && (
                      <span className="text-muted-foreground">
                        {" "}
                        — {item.split(" - ").slice(1).join(" - ")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="flex-1" onClick={handleDownload} data-testid="button-modal-download">
              <Download className="w-4 h-4 mr-2" />
              Download Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
