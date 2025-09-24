// Portfolio app focuses on displaying GitHub data via API
// No persistent storage needed for this MVP

export interface IStorage {
  // Future: cache GitHub data if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Portfolio data comes from GitHub API
  }
}

export const storage = new MemStorage();
