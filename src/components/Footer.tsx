import { Triangle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Triangle className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="text-lg font-bold text-foreground">AXIOM</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2025 Axiom. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
