import type { Express } from "express";
import { createServer, type Server } from "http";
import archiver from "archiver";
import { storage } from "./storage";
import { getProjectFiles } from "./project-templates";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/projects", (_req, res) => {
    const projects = storage.getAllProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id);
    if (isNaN(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    const project = storage.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  app.get("/api/projects/:id/download", (req, res) => {
    const projectId = parseInt(req.params.id);
    if (isNaN(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = storage.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const files = getProjectFiles(projectId);
    if (!files.length) {
      return res.status(404).json({ error: "No files found for this project" });
    }

    const projectSlug = project.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${projectSlug}.zip"`
    );

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    for (const file of files) {
      archive.append(file.content, { name: `${projectSlug}/${file.path}` });
    }

    archive.finalize();
  });

  return httpServer;
}
