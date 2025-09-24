import { z } from "zod";

export const githubStatsSchema = z.object({
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  total_private_repos: z.number().optional(),
});

export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  updated_at: z.string(),
  topics: z.array(z.string()).default([]),
});

export const githubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  location: z.string().nullable(),
  blog: z.string().nullable(),
  twitter_username: z.string().nullable(),
});

export const blogPostSchema = z.object({
  title: z.string(),
  link: z.string(),
  pubDate: z.string(),
  description: z.string(),
  author: z.string().optional(),
  guid: z.string().optional(),
  fullContent: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type GitHubStats = z.infer<typeof githubStatsSchema>;
export type Repository = z.infer<typeof repositorySchema>;
export type GitHubUser = z.infer<typeof githubUserSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
