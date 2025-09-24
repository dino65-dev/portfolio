import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Repository } from "@shared/schema";

export default function GitHubRepoShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");

  const { data: repositories, isLoading, error } = useQuery<Repository[]>({
    queryKey: ['/api/github/repositories'],
    refetchInterval: 600000, // Refresh every 10 minutes
  });

  // Get unique languages from repositories
  const languages = useMemo(() => {
    if (!repositories) return ["All"];
    const langs = new Set(repositories.map(repo => repo.language).filter((lang): lang is string => Boolean(lang)));
    return ["All", ...Array.from(langs).sort()];
  }, [repositories]);

  // Filter and sort repositories
  const filteredRepos = useMemo(() => {
    if (!repositories) return [];

    let filtered = repositories.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (repo.description || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    });

    // Sort repositories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "name":
          return a.name.localeCompare(b.name);
        case "updated":
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    return filtered;
  }, [repositories, searchTerm, selectedLanguage, sortBy]);

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      Go: "#00ADD8",
      Rust: "#dea584",
      HTML: "#e34c26",
      CSS: "#1572B6",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Swift: "#ffac45",
      Kotlin: "#F18E33",
    };
    return colors[language || ""] || "#6b7280";
  };

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GitHub <span className="text-accent">Repository Showcase</span>
            </h2>
            <p className="text-muted-foreground text-lg">Exploring my latest projects and contributions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-muted rounded w-16"></div>
                  <div className="h-3 bg-muted rounded w-12"></div>
                </div>
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
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GitHub <span className="text-accent">Repository Showcase</span>
          </h2>
          <div className="text-destructive">
            Unable to load repositories at this time. Please try again later.
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
            GitHub <span className="text-accent">Repository Showcase</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Explore my {repositories?.length || 0} public repositories with live search and filtering
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none w-64"
              />
            </div>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "updated" | "stars" | "name")}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            >
              <option value="updated">Latest Updated</option>
              <option value="stars">Most Stars</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-card-foreground text-lg group-hover:text-primary transition-colors">
                  {repo.name}
                </h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {repo.description || "No description available"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {repo.language && (
                    <div className="flex items-center space-x-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span>{repo.stargazers_count}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>{repo.forks_count}</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {new Date(repo.updated_at).toLocaleDateString()}
                </div>
              </div>

              {/* Topics */}
              {repo.topics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{repo.topics.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredRepos.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No repositories found matching "{searchTerm}"
            </div>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-primary hover:text-primary/80 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}