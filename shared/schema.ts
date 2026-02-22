import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const projectCategoryEnum = z.enum([
  "frontend",
  "backend",
  "fullstack",
  "ai-genai",
  "html-instant",
]);

export type ProjectCategory = z.infer<typeof projectCategoryEnum>;

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  category: projectCategoryEnum,
  categoryLabel: z.string(),
  features: z.array(z.string()),
  githubStructure: z.array(z.string()),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  instantRun: z.boolean(),
  icon: z.string(),
  gradient: z.string(),
});

export type Project = z.infer<typeof projectSchema>;
