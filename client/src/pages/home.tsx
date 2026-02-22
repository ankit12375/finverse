import { useState, useMemo } from "react";
import { projects } from "@/lib/projects-data";
import type { ProjectCategory } from "@shared/schema";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { StatsBar } from "@/components/stats-bar";
import { FilterTabs } from "@/components/filter-tabs";
import type { Project } from "@shared/schema";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (activeFilter !== "all") {
      filtered = filtered.filter((p) => p.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <StatsBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg" data-testid="text-no-results">
              No projects match your filters. Try a different category or search term.
            </p>
          </div>
        )}
      </div>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
