import type { Express } from "express";
import { createServer, type Server } from "http";
import { getUncachableGitHubClient } from "./githubClient.js";
import { githubStatsSchema, repositorySchema, githubUserSchema, blogPostSchema, contactFormSchema } from "@shared/schema";
import { parseString } from "xml2js";
import { handleChatMessage } from "./chatService.js";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Health check endpoint for cloud deployment monitoring
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    });
  });
  
  // Readiness check endpoint
  app.get('/ready', (req, res) => {
    // Check if critical services are available
    const checks = {
      database: !!process.env.DATABASE_URL,
      ai_service: !!(process.env.OPENAI_API_KEY || process.env.AZURE_API_KEY)
    };
    
    const allReady = Object.values(checks).every(Boolean);
    
    res.status(allReady ? 200 : 503).json({
      status: allReady ? 'ready' : 'not ready',
      checks,
      timestamp: new Date().toISOString()
    });
  });
  
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

  // Get Medium blog posts with real-time fetching and search capabilities
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { search, limit = 20 } = req.query;
      const mediumRSSUrl = "https://medium.com/feed/@dinmaybrahma";
      
      // Set cache headers for real-time updates
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      
      const response = await fetch(mediumRSSUrl, {
        headers: {
          'User-Agent': 'Portfolio-Blog-Fetcher/1.0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Medium RSS: ${response.status}`);
      }
      
      const xmlData = await response.text();
      
      parseString(xmlData, (err: any, result: any) => {
        if (err) {
          console.error('Error parsing RSS XML:', err);
          return res.status(500).json({ 
            error: 'Failed to parse Medium RSS feed',
            message: err.message 
          });
        }

        try {
          const items = result.rss?.channel?.[0]?.item || [];
          let posts = items.map((item: any) => {
            // Extract full content and clean description
            const fullContent = item.description?.[0] || '';
            const cleanDescription = fullContent
              ?.replace(/<[^>]*>/g, '') // Remove HTML tags
              ?.replace(/&nbsp;/g, ' ') // Replace HTML entities
              ?.replace(/&amp;/g, '&')
              ?.replace(/&lt;/g, '<')
              ?.replace(/&gt;/g, '>')
              ?.trim();

            // Extract categories/tags if available
            const categories = item.category || [];
            const tags = Array.isArray(categories) ? categories : [categories].filter(Boolean);

            return blogPostSchema.parse({
              title: item.title?.[0] || 'Untitled',
              link: item.link?.[0] || '',
              pubDate: item.pubDate?.[0] || '',
              description: cleanDescription ? cleanDescription.slice(0, 300) + '…' : 'No description available',
              author: item['dc:creator']?.[0] || 'Dinmay Kumar Brahma',
              guid: item.guid?.[0]?._ || item.guid?.[0] || item.link?.[0],
              // Add searchable fields
              fullContent: cleanDescription,
              tags: tags
            });
          });

          // Apply search filter if provided
          if (search && typeof search === 'string') {
            const searchTerm = search.toLowerCase();
            posts = posts.filter((post: any) => 
              post.title.toLowerCase().includes(searchTerm) ||
              post.description.toLowerCase().includes(searchTerm) ||
              (post.fullContent && post.fullContent.toLowerCase().includes(searchTerm)) ||
              post.author.toLowerCase().includes(searchTerm) ||
              (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)))
            );
          }

          // Apply limit
          const limitNum = parseInt(limit as string, 10);
          if (limitNum > 0) {
            posts = posts.slice(0, limitNum);
          }

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

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // For now, just return success - email functionality would be added here
      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon.",
        data: validatedData 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(400).json({ 
        success: false,
        error: 'Invalid form data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          error: 'Message is required and must be a string' 
        });
      }

      await handleChatMessage(message, res);
    } catch (error) {
      console.error('Error in chat endpoint:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
