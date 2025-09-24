import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";

export default function BlogSection() {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    refetchInterval: 1800000, // Refresh every 30 minutes
  });

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="text-accent">Articles</span>
            </h2>
            <p className="text-muted-foreground text-lg">Technical insights and thoughts from Medium</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                  <div className="h-3 bg-muted rounded w-4/6"></div>
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="text-accent">Articles</span>
            </h2>
            <div className="text-muted-foreground">
              <p className="mb-4">Articles will be available soon on Medium</p>
              <a 
                href="https://medium.com/@dinmaybrahma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
                data-testid="medium-profile-link"
              >
                Follow me on Medium →
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-accent">Articles</span>
          </h2>
          <p className="text-muted-foreground text-lg">Technical insights and thoughts from Medium</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.slice(0, 6).map((post, index) => (
            <article 
              key={post.guid || index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              data-testid={`blog-post-${index}`}
            >
              <div className="flex items-center justify-between mb-4">
                <time className="text-sm text-muted-foreground" data-testid={`blog-date-${index}`}>
                  {formatDate(post.pubDate)}
                </time>
                <div className="text-accent">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795H20L20 5.59l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.190-.19.190-.246.190-.537V7.794l-5.389 13.688h-.728L4.51 7.794v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404H0v-.404l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {post.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  By {post.author || 'Dinmay Kumar Brahma'}
                </span>
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors text-sm font-medium"
                  data-testid={`blog-link-${index}`}
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://medium.com/@dinmaybrahma" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-border hover:border-primary"
            data-testid="view-all-articles"
          >
            <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795H20L20 5.59l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.190-.19.190-.246.190-.537V7.794l-5.389 13.688h-.728L4.51 7.794v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404H0v-.404l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z" clipRule="evenodd"/>
            </svg>
            View All Articles on Medium
          </a>
        </div>
      </div>
    </section>
  );
}