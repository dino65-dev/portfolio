import { useQuery } from "@tanstack/react-query";
import type { GitHubStats } from "@shared/schema";

export default function GitHubStats() {
  const { data: stats, isLoading, error } = useQuery<GitHubStats>({
    queryKey: ['/api/github/stats'],
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GitHub <span className="text-accent">Statistics</span>
            </h2>
            <p className="text-muted-foreground text-lg">Live stats from my GitHub repositories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GitHub <span className="text-accent">Statistics</span>
            </h2>
            <div className="text-destructive">
              Unable to load GitHub statistics at this time.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GitHub <span className="text-accent">Statistics</span>
          </h2>
          <p className="text-muted-foreground text-lg">Live stats from my GitHub repositories</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-card-foreground">Public Repos</h3>
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-1.18-.32-2.29-.879-3.243a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.829 1 1 0 11-1.415-1.415A3.987 3.987 0 0013 12a3.988 3.988 0 00-.172-1.586 1 1 0 010-1.415z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-primary" data-testid="github-repos">
              {stats?.public_repos || '15+'}
            </div>
            <p className="text-muted-foreground text-sm mt-2">Active repositories</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-card-foreground">Followers</h3>
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-accent" data-testid="github-followers">
              {stats?.followers || '6'}
            </div>
            <p className="text-muted-foreground text-sm mt-2">GitHub followers</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-card-foreground">Following</h3>
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-3xl font-bold text-yellow-500" data-testid="github-following">
              {stats?.following || '3'}
            </div>
            <p className="text-muted-foreground text-sm mt-2">People following</p>
          </div>
        </div>
      </div>
    </section>
  );
}
