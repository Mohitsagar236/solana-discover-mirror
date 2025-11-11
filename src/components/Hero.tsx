import { Button } from "@/components/ui/button";
import { Triangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-8 inline-flex items-center justify-center">
          <Triangle className="w-16 h-16 text-primary" fill="currentColor" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
          The Gateway to DeFi
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          Axiom is the only trading platform you'll ever need.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <Link to="/discover">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group">
              Start Trading
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/docs">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full">
              Learn More
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 animate-in fade-in duration-1000 delay-500">
          <p className="text-sm text-muted-foreground mb-4">Backed by</p>
          <a 
            href="https://www.ycombinator.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <span className="text-2xl font-bold text-foreground">Y</span>
            <span className="text-xl text-muted-foreground">Combinator</span>
          </a>
        </div>
      </div>
    </section>
  );
};
