import { Button } from "@/components/ui/button";
import { Triangle } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Triangle className="w-6 h-6 text-primary" fill="currentColor" />
          <span className="text-xl font-bold text-foreground">AXIOM</span>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
          Start Trading
        </Button>
      </div>
    </nav>
  );
};
