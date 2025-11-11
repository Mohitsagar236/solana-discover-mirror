import { Button } from "@/components/ui/button";
import { Triangle, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/discover" },
    { name: "Trading", path: "/trading" },
    { name: "Perpetuals", path: "/perpetuals" },
    { name: "Yield", path: "/yield" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Rewards", path: "/rewards" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Triangle className="w-6 h-6 text-primary group-hover:rotate-180 transition-transform duration-500" fill="currentColor" />
            <span className="text-xl font-bold text-foreground">AXIOM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary relative ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/discover?chain=sol">
              <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Launch App
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/discover?chain=sol">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-2">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
