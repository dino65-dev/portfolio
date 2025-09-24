import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AIChat from "@/components/ai-chat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, ExternalLink, User, BookOpen } from "lucide-react";

export default function BlogPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    refetchInterval: 1800000, // Refresh every 30 minutes
  });

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
      return `${Math.ceil(diffDays / 365)} years ago`;
    } catch {
      return 'Recently published';
    }
  };

  const getReadingTime = (description: string) => {
    const wordsPerMinute = 200;
    const wordCount = description.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime < 1 ? 1 : readingTime;
  };

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  if (isLoading) {
    return (
      <div className="animated-bg min-h-screen text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mb-12"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                      <div className="h-3 bg-muted rounded w-4/6"></div>
                    </div>
                    <div className="h-4 bg-muted rounded w-24"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <AIChat isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    );
  }

  if (error || !posts?.length) {
    return (
      <div className="animated-bg min-h-screen text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <Link href="/">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">Blog</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Technical insights and thoughts from my Medium publications
              </p>
              
              <div className="bg-card rounded-xl p-8 border border-border">
                <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-4">Articles Coming Soon</h2>
                <p className="text-muted-foreground mb-6">
                  I'm currently working on exciting content about AI/ML, quantum computing, 
                  and biotechnology research. Stay tuned for detailed technical articles!
                </p>
                <a 
                  href="https://medium.com/@dinmaybrahma" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Follow me on Medium
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <AIChat isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    );
  }

  return (
    <div className="animated-bg min-h-screen text-foreground">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <Link href="/">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Technical <span className="text-accent">Blog</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Deep dives into AI/ML research, quantum computing applications in biotechnology, 
                and cutting-edge developments in computational biology and computer vision.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-6">
                <Badge variant="secondary" className="text-sm">
                  {posts.length} Articles Published
                </Badge>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  Dinmay Kumar Brahma
                </div>
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-accent" />
                Featured Article
              </h2>
              <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPost.pubDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {getReadingTime(featuredPost.description)} min read
                    </div>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {featuredPost.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      {featuredPost.author || 'Dinmay Kumar Brahma'}
                      <span className="text-muted-foreground/60">•</span>
                      <span>{formatTime(featuredPost.pubDate)}</span>
                    </div>
                    <a 
                      href={featuredPost.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {regularPosts.map((post, index) => (
                  <Card 
                    key={post.guid || index}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50 group"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.pubDate)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {getReadingTime(post.description)} min read
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          {post.author || 'Dinmay Kumar Brahma'}
                          <span className="text-muted-foreground/60">•</span>
                          <span>{formatTime(post.pubDate)}</span>
                        </div>
                        <a 
                          href={post.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-medium"
                        >
                          Read More
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center bg-card rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Get notified about new articles on AI/ML research, quantum computing, and biotechnology innovations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://medium.com/@dinmaybrahma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Follow on Medium
              </a>
              <Link href="/#contact">
                <Button variant="outline" className="px-6 py-3">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChat isOpen={isChatOpen} onToggle={toggleChat} />
    </div>
  );
}