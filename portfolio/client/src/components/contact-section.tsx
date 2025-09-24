import EnhancedContactForm from './enhanced-contact-form';

export default function ContactSection() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dinmay-brahma-4882aa189",
      description: "Professional networking",
      color: "blue-500",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      name: "Medium",
      url: "https://medium.com/@dinmaybrahma",
      description: "Technical articles",
      color: "green-500",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795H20L20 5.59l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.190-.19.190-.246.190-.537V7.794l-5.389 13.688h-.728L4.51 7.794v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404H0v-.404l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      name: "Kaggle",
      url: "https://www.kaggle.com/dinmaybrahma",
      description: "Data science competitions",
      color: "cyan-500",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7.5 9.5l2.5 2.5L15 7l-1.5-1.5L10 9 8.5 7.5 7.5 9.5zM10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"/>
        </svg>
      )
    },
    {
      name: "Hugging Face",
      url: "https://huggingface.co/spedrox-sac",
      description: "AI model sharing",
      color: "yellow-500",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      )
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Let's <span className="text-accent">Connect</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Interested in collaborating on AI, biotechnology, or quantum computing projects? 
          Let's discuss how we can push the boundaries of science and technology together.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`bg-card hover:bg-card/80 border border-border hover:border-${link.color} rounded-xl p-6 transition-all duration-300 hover:shadow-lg group`}
              data-testid={`contact-${link.name.toLowerCase()}`}
            >
              <div className={`text-${link.color} mb-4 group-hover:scale-110 transition-transform flex justify-center`}>
                {link.icon}
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">{link.name}</h3>
              <p className="text-muted-foreground text-sm">{link.description}</p>
            </a>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold text-card-foreground mb-4">Ready to collaborate?</h3>
            <p className="text-muted-foreground mb-6">
              Whether it's discussing neural networks over coffee or diving deep into quantum algorithms, 
              I'm always excited to connect with fellow enthusiasts and researchers.
            </p>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:dinmaybrahma@outlook.com" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                data-testid="email-contact"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Send Direct Email
              </a>
              <a 
                href="https://github.com/spedrox" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 border border-border hover:border-primary flex items-center justify-center"
                data-testid="follow-github"
              >
                <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                </svg>
                Follow on GitHub
              </a>
            </div>
          </div>
          
          <EnhancedContactForm />
        </div>
      </div>
    </section>
  );
}
