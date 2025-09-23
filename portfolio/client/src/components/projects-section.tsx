import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Repository } from "@shared/schema";

const featuredProjects = [
  {
    name: "lox",
    title: "Lox Programming Language",
    description: "A Python-based interpreter for the Lox programming language. Lightweight, dynamically-typed language with simple syntax for learning compiler design principles.",
    technologies: ["Python", "Compiler Design", "Interpreter"],
    liveUrl: null,
    featured: true
  },
  {
    name: "MIRNET_plus_ESRGAN",
    title: "MIRNET + ESRGAN",
    description: "Advanced computer vision project combining low-light enhancement with super-resolution techniques. Jupyter notebook implementation for image processing and enhancement.",
    technologies: ["Python", "Computer Vision", "Deep Learning", "Jupyter"],
    liveUrl: null,
    featured: true
  },
  {
    name: "ChatBot",
    title: "Documentation Chat Bot",
    description: "AI-powered chatbot for documentation that allows chatting with data. Privately deployable with knowledge integration capabilities for enhanced user interaction.",
    technologies: ["AI/NLP", "Chatbot", "Documentation", "Vercel"],
    liveUrl: "https://dino65-dev-chatbot.vercel.app/",
    featured: true
  },
  {
    name: "CodeBot",
    title: "Codestral Code Bot",
    description: "Advanced code generation and assistance bot hosted on Hugging Face Spaces. Provides intelligent code suggestions and programming help across multiple languages.",
    technologies: ["AI Code Gen", "Hugging Face", "Programming", "Assistant"],
    liveUrl: "https://huggingface.co/spaces/spedrox-sac/Codestral",
    featured: true
  }
];

export default function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("All");
  
  const { data: repositories, isLoading } = useQuery<Repository[]>({
    queryKey: ['/api/github/repositories'],
    refetchInterval: 600000, // Refresh every 10 minutes
  });

  // Get all unique technologies
  const allTechnologies = ["All", ...Array.from(new Set(featuredProjects.flatMap(p => p.technologies)))];

  // Filter projects based on search and technology
  const filteredProjects = featuredProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTech = selectedTech === "All" || project.technologies.includes(selectedTech);
    
    return matchesSearch && matchesTech;
  });

  const getTechStyles = (tech: string) => {
    const styleMap: Record<string, { bg: string; text: string; border: string }> = {
      Python: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      "Compiler Design": { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
      Interpreter: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
      "Computer Vision": { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
      "Deep Learning": { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
      Jupyter: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
      "AI/NLP": { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      Chatbot: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
      Documentation: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
      Vercel: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" },
      "AI Code Gen": { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      "Hugging Face": { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
      Programming: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
      Assistant: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" }
    };
    return styleMap[tech] || { bg: "bg-gray-500/10", text: "text-gray-500", border: "border-gray-500/20" };
  };

  const getRepoStats = (projectName: string) => {
    const repo = repositories?.find(r => 
      r.name.toLowerCase().includes(projectName.toLowerCase()) ||
      projectName.toLowerCase().includes(r.name.toLowerCase())
    );
    return repo;
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">Exploring the boundaries of technology and science</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                data-testid="project-search"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Technology Filter */}
            <div className="relative">
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="px-6 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer pr-10"
                data-testid="project-filter"
              >
                {allTechnologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
              <svg 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {featuredProjects.length} projects
            {searchTerm && <span> matching "{searchTerm}"</span>}
            {selectedTech !== "All" && <span> in {selectedTech}</span>}
          </div>
        </div>
        
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => {
            const repoStats = getRepoStats(project.name);
            
            return (
              <div 
                key={project.name}
                className="project-card bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                data-testid={`project-card-${project.name.toLowerCase()}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-card-foreground">{project.title}</h3>
                  {repoStats ? (
                    <a 
                      href={repoStats.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                      data-testid={`github-link-${project.name.toLowerCase()}`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  ) : project.liveUrl ? (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                      data-testid={`live-link-${project.name.toLowerCase()}`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  ) : null}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {repoStats?.description || project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => {
                    const styles = getTechStyles(tech);
                    return (
                      <span 
                        key={techIndex}
                        className={`px-3 py-1 ${styles.bg} ${styles.text} rounded-full text-xs border ${styles.border}`}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground text-sm">
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-muted rounded animate-pulse mr-2"></div>
                        <div className="w-8 h-3 bg-muted rounded animate-pulse"></div>
                      </div>
                    ) : repoStats ? (
                      <>
                        <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span data-testid={`stars-${project.name.toLowerCase()}`}>
                          {repoStats.stargazers_count}
                        </span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        <span>Live Demo</span>
                      </>
                    )}
                  </div>
                  
                  {project.liveUrl ? (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors"
                      data-testid={`view-project-${project.name.toLowerCase()}`}
                    >
                      Try Live Demo{" "}
                      <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  ) : repoStats ? (
                    <a 
                      href={repoStats.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors"
                      data-testid={`view-project-${project.name.toLowerCase()}`}
                    >
                      View Project{" "}
                      <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  ) : null}
                </div>
              </div>
            );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-card rounded-xl p-8 border border-border max-w-md mx-auto">
              <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 6.25A7.963 7.963 0 0112 5c-2.34 0-4.29.627-5.824 1.687" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search terms or filters to find projects.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTech("All");
                }}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="clear-filters"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/dino65-dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-border hover:border-primary"
            data-testid="view-all-projects"
          >
            <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
            </svg>
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
