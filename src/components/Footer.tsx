import { Triangle, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Triangle className="w-6 h-6 text-primary" fill="currentColor" />
              <span className="text-lg font-bold text-foreground">AXIOM</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The gateway to DeFi. Trade smarter, faster, safer.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://x.com/axiomexchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://discord.gg/axiomtrade" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Discord"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="flex flex-col gap-2">
              <Link to="/discover" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Discover
              </Link>
              <Link to="/trading" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Trading
              </Link>
              <Link to="/perpetuals" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Perpetuals
              </Link>
              <Link to="/yield" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Yield
              </Link>
              <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Portfolio
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <a 
                href="https://docs.axiom.trade/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Docs
              </a>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Leaderboard
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Axiom. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
