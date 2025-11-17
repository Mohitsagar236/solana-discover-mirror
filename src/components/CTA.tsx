import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10" />
      <div className="absolute inset-0 bg-[url('/images/landing-page/last-section.webp')] bg-cover bg-center opacity-5" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            <Zap className="w-3 h-3 mr-2 inline" />
            Ready to Trade?
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Start Trading Smarter Today
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 125,000+ traders using Axiom for lightning-fast execution, MEV protection, and industry-leading yields
          </p>
          
          {/* Key benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Sub-second fills</span>
            </div>
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/20">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold">MEV protected</span>
            </div>
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold">Up to 120% APR</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/discover?chain=sol">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-12 py-7 text-lg rounded-full shadow-2xl hover:shadow-primary/50 transition-all group"
              >
                Launch Axiom
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button
                size="lg"
                variant="outline"
                className="px-12 py-7 text-lg rounded-full border-2 hover:bg-background/50"
              >
                View Documentation
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-8">
            No registration required • Non-custodial • Connect wallet to start
          </p>
        </div>
      </div>
    </section>
  );
};
