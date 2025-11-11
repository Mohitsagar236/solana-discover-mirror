import { Triangle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Triangle className="w-6 h-6 text-primary" fill="currentColor" />
              <span className="text-lg font-bold text-foreground">AXIOM</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The gateway to DeFi. Trade smarter, faster, safer.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="flex flex-col gap-2">
              <Link to="/discover" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Discover
              </Link>
              <Link to="/trading" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Trading
              </Link>
              <Link to="/perpetuals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Perpetuals
              </Link>
              <Link to="/yield" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Yield
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
