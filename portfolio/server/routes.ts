import type { Express } from "express";
import { createServer, type Server } from "http";
import { getUncachableGitHubClient } from "./githubClient.js";
import { githubStatsSchema, repositorySchema, githubUserSchema, blogPostSchema } from "@shared/schema";
import { parseString } from "xml2js";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get GitHub user stats
  app.get("/api/github/stats", async (req, res) => {
    try {
      const github = await getUncachableGitHubClient();
      const { data: user } = await github.rest.users.getByUsername({
        username: 'dino65-dev'
      });

      const stats = {
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      };

      const validatedStats = githubStatsSchema.parse(stats);
      res.json(validatedStats);
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      res.status(500).json({ 
        error: 'Failed to fetch GitHub statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get GitHub repositories
  app.get("/api/github/repositories", async (req, res) => {
    try {
      const github = await getUncachableGitHubClient();
      const { data: repos } = await github.rest.repos.listForUser({
        username: 'dino65-dev',
        sort: 'updated',
        per_page: 50
      });

      const validatedRepos = repos.map((repo: any) => 
        repositorySchema.parse({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          updated_at: repo.updated_at,
          topics: repo.topics || [],
        })
      );

      res.json(validatedRepos);
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      res.status(500).json({ 
        error: 'Failed to fetch GitHub repositories',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get GitHub user profile
  app.get("/api/github/user", async (req, res) => {
    try {
      const github = await getUncachableGitHubClient();
      const { data: user } = await github.rest.users.getByUsername({
        username: 'dino65-dev'
      });

      const validatedUser = githubUserSchema.parse({
        login: user.login,
        id: user.id,
        name: user.name,
        bio: user.bio,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        location: user.location,
        blog: user.blog,
        twitter_username: user.twitter_username,
      });

      res.json(validatedUser);
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      res.status(500).json({ 
        error: 'Failed to fetch GitHub user profile',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get Medium blog posts
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const mediumRSSUrl = "https://medium.com/feed/@dinmaybrahma";
      const response = await fetch(mediumRSSUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Medium RSS: ${response.status}`);
      }
      
      const xmlData = await response.text();
      
      parseString(xmlData, (err, result) => {
        if (err) {
          console.error('Error parsing RSS XML:', err);
          return res.status(500).json({ 
            error: 'Failed to parse Medium RSS feed',
            message: err.message 
          });
        }

        try {
          const items = result.rss?.channel?.[0]?.item || [];
          const posts = items.slice(0, 6).map((item: any) => {
            const cleanDescription = item.description?.[0]
              ?.replace(/<[^>]*>/g, '') // Remove HTML tags
              ?.substring(0, 200) + '...' || 'No description available';

            return blogPostSchema.parse({
              title: item.title?.[0] || 'Untitled',
              link: item.link?.[0] || '',
              pubDate: item.pubDate?.[0] || '',
              description: cleanDescription,
              author: item['dc:creator']?.[0] || 'Dinmay Kumar Brahma',
              guid: item.guid?.[0]?._ || item.guid?.[0] || item.link?.[0]
            });
          });

          res.json(posts);
        } catch (parseError) {
          console.error('Error processing RSS items:', parseError);
          res.status(500).json({ 
            error: 'Failed to process Medium blog posts',
            message: parseError instanceof Error ? parseError.message : 'Unknown error'
          });
        }
      });
    } catch (error) {
      console.error('Error fetching Medium blog posts:', error);
      res.status(500).json({ 
        error: 'Failed to fetch Medium blog posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
