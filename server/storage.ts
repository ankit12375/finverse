import { type User, type InsertUser, type Project } from "@shared/schema";
import { projects } from "./project-data";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllProjects(): Project[];
  getProjectById(id: number): Project | undefined;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  getAllProjects(): Project[] {
    return projects;
  }

  getProjectById(id: number): Project | undefined {
    return projects.find((p) => p.id === id);
  }
}

export const storage = new MemStorage();
