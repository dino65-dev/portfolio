import { Octokit } from '@octokit/rest'

// Use public GitHub API or provided token
export async function getUncachableGitHubClient() {
  const githubToken = process.env.GITHUB_TOKEN;
  
  if (githubToken) {
    return new Octokit({ auth: githubToken });
  }
  
  // For public repositories, we can use GitHub API without authentication
  // but with rate limits (60 requests per hour)
  return new Octokit();
}
