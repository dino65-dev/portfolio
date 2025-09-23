import { useState, useEffect } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "education" | "project" | "achievement" | "research";
  location?: string;
  technologies?: string[];
  highlight?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2022-2026",
    title: "B.Tech in Biotechnology & Biochemical Engineering",
    description: "Currently pursuing undergraduate studies at Indian Institute of Technology Guwahati, focusing on the intersection of biotechnology and artificial intelligence.",
    type: "education",
    location: "IIT Guwahati",
    highlight: true
  },
  {
    year: "2024",
    title: "AI/ML Research Focus",
    description: "Deep dive into machine learning, reinforcement learning, and computer vision. Exploring applications in biotech and developing novel approaches to AI optimization.",
    type: "research",
    technologies: ["Python", "PyTorch", "TensorFlow", "Computer Vision"]
  },
  {
    year: "2024",
    title: "FlowRL Research",
    description: "Pioneered research on FlowRL - a new reinforcement learning approach that makes language models think smarter, published comprehensive analysis on Medium.",
    type: "research",
    technologies: ["Reinforcement Learning", "NLP", "Language Models"],
    highlight: true
  },
  {
    year: "2024",
    title: "Google's Agent Payments Protocol Analysis",
    description: "Conducted in-depth research and analysis of Google's Agent Payments Protocol (AP2), exploring the future of AI-driven payment systems.",
    type: "research",
    technologies: ["Blockchain", "AI Agents", "Payment Systems"]
  },
  {
    year: "2024",
    title: "MIRNET + ESRGAN Implementation",
    description: "Developed advanced computer vision project combining low-light enhancement with super-resolution techniques for image processing.",
    type: "project",
    technologies: ["Computer Vision", "Deep Learning", "Image Processing"]
  },
  {
    year: "2024",
    title: "Documentation ChatBot",
    description: "Built AI-powered chatbot for documentation with knowledge integration capabilities, deployed on Vercel for enhanced user interaction.",
    type: "project",
    technologies: ["AI/NLP", "Chatbot", "Vercel", "Documentation"]
  },
  {
    year: "2024",
    title: "Codestral Code Bot",
    description: "Created advanced code generation and assistance bot hosted on Hugging Face Spaces, providing intelligent programming help across multiple languages.",
    type: "project",
    technologies: ["AI Code Gen", "Hugging Face", "Programming"]
  },
  {
    year: "2023",
    title: "Lox Programming Language",
    description: "Implemented a Python-based interpreter for the Lox programming language, exploring compiler design principles and language implementation.",
    type: "project",
    technologies: ["Python", "Compiler Design", "Interpreter"]
  }
];

export default function TimelineSection() {
  const [visibleEvents, setVisibleEvents] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleEvents(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const getTypeIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'education':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
          </svg>
        );
      case 'project':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        );
      case 'research':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'achievement':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        );
    }
  };

  const getTypeColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'education': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'project': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'research': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'achievement': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    }
  };

  const getTechStyles = (tech: string) => {
    const styleMap: Record<string, { bg: string; text: string; border: string }> = {
      Python: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      PyTorch: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
      TensorFlow: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
      "Computer Vision": { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
      "Reinforcement Learning": { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
      NLP: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      "Language Models": { bg: "bg-indigo-500/10", text: "text-indigo-500", border: "border-indigo-500/20" },
      Blockchain: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" },
      "AI Agents": { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
      "Payment Systems": { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
      "Deep Learning": { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
      "Image Processing": { bg: "bg-pink-500/10", text: "text-pink-500", border: "border-pink-500/20" },
      "AI/NLP": { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      Chatbot: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
      Vercel: { bg: "bg-gray-500/10", text: "text-gray-500", border: "border-gray-500/20" },
      Documentation: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
      "AI Code Gen": { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      "Hugging Face": { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
      Programming: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
      "Compiler Design": { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
      Interpreter: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" }
    };
    return styleMap[tech] || { bg: "bg-gray-500/10", text: "text-gray-500", border: "border-gray-500/20" };
  };

  return (
    <section id="timeline" className="py-20 relative bg-gradient-to-b from-background to-background/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-accent">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg">Academic pursuits and project milestones</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

          {timelineEvents.map((event, index) => {
            const isVisible = visibleEvents.has(index);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                data-index={index}
                className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center mb-12 transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                data-testid={`timeline-event-${index}`}
              >
                {/* Desktop Layout */}
                <div className="hidden md:flex w-full items-center">
                  {isLeft ? (
                    <>
                      {/* Content Left */}
                      <div className="w-5/12 text-right pr-8">
                        <div className={`inline-block p-6 rounded-xl border ${event.highlight ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                          <div className="flex justify-end items-center mb-3">
                            <span className="text-2xl font-bold text-accent mr-3">{event.year}</span>
                            <div className={`p-2 rounded-full border ${getTypeColor(event.type)}`}>
                              {getTypeIcon(event.type)}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          {event.location && (
                            <p className="text-sm text-muted-foreground mb-2">📍 {event.location}</p>
                          )}
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{event.description}</p>
                          {event.technologies && (
                            <div className="flex flex-wrap gap-1 justify-end">
                              {event.technologies.map((tech, techIndex) => {
                                const styles = getTechStyles(tech);
                                return (
                                  <span 
                                    key={techIndex}
                                    className={`px-2 py-1 ${styles.bg} ${styles.text} rounded text-xs border ${styles.border}`}
                                  >
                                    {tech}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Timeline Node */}
                      <div className="w-2/12 flex justify-center">
                        <div className={`w-4 h-4 rounded-full border-4 ${event.highlight ? 'bg-accent border-accent' : 'bg-background border-primary'} shadow-lg`}></div>
                      </div>
                      
                      {/* Empty Right */}
                      <div className="w-5/12"></div>
                    </>
                  ) : (
                    <>
                      {/* Empty Left */}
                      <div className="w-5/12"></div>
                      
                      {/* Timeline Node */}
                      <div className="w-2/12 flex justify-center">
                        <div className={`w-4 h-4 rounded-full border-4 ${event.highlight ? 'bg-accent border-accent' : 'bg-background border-primary'} shadow-lg`}></div>
                      </div>
                      
                      {/* Content Right */}
                      <div className="w-5/12 pl-8">
                        <div className={`inline-block p-6 rounded-xl border ${event.highlight ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                          <div className="flex items-center mb-3">
                            <div className={`p-2 rounded-full border ${getTypeColor(event.type)} mr-3`}>
                              {getTypeIcon(event.type)}
                            </div>
                            <span className="text-2xl font-bold text-accent">{event.year}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          {event.location && (
                            <p className="text-sm text-muted-foreground mb-2">📍 {event.location}</p>
                          )}
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{event.description}</p>
                          {event.technologies && (
                            <div className="flex flex-wrap gap-1">
                              {event.technologies.map((tech, techIndex) => {
                                const styles = getTechStyles(tech);
                                return (
                                  <span 
                                    key={techIndex}
                                    className={`px-2 py-1 ${styles.bg} ${styles.text} rounded text-xs border ${styles.border}`}
                                  >
                                    {tech}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex w-full">
                  {/* Timeline Node */}
                  <div className="flex flex-col items-center mr-6">
                    <div className={`w-4 h-4 rounded-full border-4 ${event.highlight ? 'bg-accent border-accent' : 'bg-background border-primary'} shadow-lg`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`p-6 rounded-xl border ${event.highlight ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-full border ${getTypeColor(event.type)} mr-3`}>
                          {getTypeIcon(event.type)}
                        </div>
                        <span className="text-xl font-bold text-accent">{event.year}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      {event.location && (
                        <p className="text-sm text-muted-foreground mb-2">📍 {event.location}</p>
                      )}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{event.description}</p>
                      {event.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {event.technologies.map((tech, techIndex) => {
                            const styles = getTechStyles(tech);
                            return (
                              <span 
                                key={techIndex}
                                className={`px-2 py-1 ${styles.bg} ${styles.text} rounded text-xs border ${styles.border}`}
                              >
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold mb-4">What's Next?</h3>
            <p className="text-muted-foreground mb-6">
              Currently exploring new frontiers in AI, biotechnology, and their convergence. 
              Always open to collaboration and innovative projects.
            </p>
            <a 
              href="#contact" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              data-testid="timeline-contact-cta"
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}