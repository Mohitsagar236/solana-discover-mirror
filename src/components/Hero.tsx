import { Button } from "@/components/ui/button";
import { Triangle } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-8 inline-flex items-center justify-center">
          <Triangle className="w-16 h-16 text-primary" fill="currentColor" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          The Gateway to DeFi
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Axiom is the only trading platform you'll ever need.
        </p>
        
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-glow">
          Start Trading
        </Button>
        
        <div className="mt-16">
          <p className="text-sm text-muted-foreground mb-4">Backed by</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-foreground">Y</span>
            <span className="text-xl text-muted-foreground">Combinator</span>
          </div>
        </div>
      </div>
    </section>
  );
};
