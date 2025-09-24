import { useEffect, useRef, useState } from "react";

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const programmingSkills = [
    { name: "Python", level: 95 },
    { name: "C++", level: 85 },
    { name: "Java", level: 80 },
    { name: "C", level: 75 },
  ];

  const technologies = [
    { name: "TensorFlow", icon: "🧠" },
    { name: "PyTorch", icon: "🔥" },
    { name: "NumPy", icon: "🔢" },
    { name: "Pandas", icon: "🐼" },
    { name: "Git", icon: "🔧" },
    { name: "Azure", icon: "☁️" },
  ];

  const specializations = [
    { name: "Computer Vision", level: "Expert" },
    { name: "Natural Language Processing", level: "Advanced" },
    { name: "Deep Learning", level: "Expert" },
    { name: "Quantum Computing", level: "Intermediate" },
  ];

  const otherSkills = [
    "Research", "Problem Solving", "Algorithm Design", 
    "Data Analysis", "Bioinformatics", "Technical Writing"
  ];

  const getSpecializationColor = (level: string) => {
    switch (level) {
      case "Expert": return "text-accent";
      case "Advanced": return "text-primary";
      case "Intermediate": return "text-yellow-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section id="skills" className="py-20 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-accent">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg">Technologies I work with and proficiency levels</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Programming Languages */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
              <svg className="w-6 h-6 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              Programming Languages
            </h3>
            <div className="space-y-4">
              {programmingSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground" data-testid={`skill-level-${skill.name.toLowerCase()}`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full skill-bar transition-all duration-2000 ease-in-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%'
                      }}
                      data-testid={`skill-bar-${skill.name.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Frameworks */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
              <svg className="w-6 h-6 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
              Technologies & Frameworks
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <div 
                  key={tech.name}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                  data-testid={`tech-${tech.name.toLowerCase()}`}
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span className="text-foreground font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI/ML Specializations */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
              <svg className="w-6 h-6 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              AI/ML Specializations
            </h3>
            <div className="space-y-3">
              {specializations.map((spec) => (
                <div 
                  key={spec.name}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <span className="text-foreground font-medium">{spec.name}</span>
                  <span 
                    className={`font-bold ${getSpecializationColor(spec.level)}`}
                    data-testid={`specialization-${spec.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {spec.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Skills */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
              <svg className="w-6 h-6 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Other Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                  data-testid={`other-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
