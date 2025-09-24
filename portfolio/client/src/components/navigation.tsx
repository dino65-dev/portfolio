import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary hover:text-primary/90 transition-colors">
            <span className="text-accent">dino65</span>-dev
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${
                location === '/' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <a 
              href="#about" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-about"
            >
              About
            </a>
            <a 
              href="#projects" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-projects"
            >
              Projects
            </a>
            <a 
              href="#skills" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-skills"
            >
              Skills
            </a>
            <Link 
              href="/blog" 
              className={`transition-colors ${
                location === '/blog' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="nav-blog"
            >
              Blog
            </Link>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </a>
          </div>
          
          <div className="md:hidden">
            <button 
              className="text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-toggle"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/" 
                className={`transition-colors ${
                  location === '/' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-home"
              >
                Home
              </Link>
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-about"
              >
                About
              </a>
              <a 
                href="#projects" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-projects"
              >
                Projects
              </a>
              <a 
                href="#skills" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-skills"
              >
                Skills
              </a>
              <Link 
                href="/blog" 
                className={`transition-colors ${
                  location === '/blog' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-blog"
              >
                Blog
              </Link>
              <a 
                href="#contact" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-contact"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
