import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface IntegrationProps {
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  logoPath?: string;
  logoAlt?: string;
  ctaText: string;
  ctaLink: string;
  reverse?: boolean;
}

export const IntegrationShowcase = ({
  title,
  subtitle,
  description,
  imagePath,
  logoPath,
  logoAlt,
  ctaText,
  ctaLink,
  reverse = false,
}: IntegrationProps) => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`${reverse ? 'lg:order-2' : ''}`}>
            <Card className="bg-card border-border p-2 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden">
                <img 
                  src={imagePath} 
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                        <p class="text-4xl font-bold text-primary">${title}</p>
                      </div>
                    `;
                  }}
                />
              </div>
            </Card>
          </div>
          
          <div className={`${reverse ? 'lg:order-1' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              {subtitle}
            </p>
            <p className="text-lg text-foreground/80 mb-8">
              {description}
            </p>
            
            {logoPath && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-muted-foreground">Powered by</span>
                <img src={logoPath} alt={logoAlt} className="h-6" onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.insertAdjacentHTML('afterend', `<span class="font-bold text-lg">${logoAlt}</span>`);
                }} />
              </div>
            )}
            
            <Link to={ctaLink}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 group">
                {ctaText}
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
