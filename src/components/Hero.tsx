import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Triangle, ArrowRight, Zap, Shield, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-accent rounded-full animate-ping delay-500" />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-primary rounded-full animate-ping delay-1000" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent rounded-full animate-ping delay-700" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-6 inline-flex items-center justify-center">
          <Badge variant="secondary" className="mb-2 px-4 py-2 text-sm">
            <Sparkles className="w-3 h-3 mr-2 inline" />
            New: Analytics Dashboard Now Live
          </Badge>
        </div>
        
        <div className="mb-8 inline-flex items-center justify-center">
          <Triangle className="w-20 h-20 text-primary animate-pulse" fill="currentColor" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
          The Gateway to DeFi
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          Trade, earn, and stake with the most advanced platform on <span className="text-primary font-semibold">Solana</span>
        </p>
        
        {/* Key Features Highlight */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-in fade-in duration-1000 delay-200">
          <div className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold">Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold">MEV Protected</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold">Up to 120% APR</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <Link to="/discover">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-primary/50 transition-all group">
              Start Trading
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/docs">
            <Button size="lg" variant="outline" className="px-10 py-7 text-lg rounded-full border-2 hover:bg-muted/50">
              Learn More
            </Button>
          </Link>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-in fade-in duration-1000 delay-500">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">$2.5B+</p>
            <p className="text-sm text-muted-foreground">Total Volume</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">125K+</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">&lt;0.5s</p>
            <p className="text-sm text-muted-foreground">Avg Speed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">10+</p>
            <p className="text-sm text-muted-foreground">Features</p>
          </div>
        </div>
        
        <div className="mt-16 animate-in fade-in duration-1000 delay-700">
          <p className="text-sm text-muted-foreground mb-4">Backed by</p>
          <a 
            href="https://www.ycombinator.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary transition-colors group"
          >
            <span className="text-3xl font-bold text-foreground group-hover:scale-110 transition-transform">Y</span>
            <span className="text-xl text-muted-foreground">Combinator</span>
          </a>
        </div>
      </div>
    </section>
  );
};
