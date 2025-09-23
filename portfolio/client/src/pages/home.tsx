import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import GitHubStats from "@/components/github-stats";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import TimelineSection from "@/components/timeline-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="animated-bg min-h-screen text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <GitHubStats />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <TimelineSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href="#home" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          data-testid="scroll-to-top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
