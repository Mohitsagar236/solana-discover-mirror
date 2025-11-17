import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Triangle, Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/discover" },
  ];

  const tradeLinks = [
    { name: "Spot Trading", path: "/trading" },
    { name: "Perpetuals", path: "/perpetuals" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  const earnLinks = [
    { name: "Yield Farming", path: "/yield" },
    { name: "Staking", path: "/staking" },
    { name: "Rewards", path: "/rewards" },
    { name: "Referrals", path: "/referrals" },
  ];

  const moreLinks = [
    { name: "Portfolio", path: "/portfolio" },
    { name: "Wallet", path: "/wallet" },
    { name: "Analytics", path: "/analytics" },
    { name: "Governance", path: "/governance" },
    { name: "Docs", path: "/docs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActiveSection = (links: typeof mainLinks) => {
    return links.some(link => location.pathname === link.path);
  };

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
            {mainLinks.map((link) => (
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

            {/* Trade Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  isActiveSection(tradeLinks) ? "text-primary" : "text-muted-foreground"
                }`}>
                  Trade
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {tradeLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link to={link.path} className="cursor-pointer">
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Earn Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  isActiveSection(earnLinks) ? "text-primary" : "text-muted-foreground"
                }`}>
                  Earn
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {earnLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link to={link.path} className="cursor-pointer">
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  isActiveSection(moreLinks) ? "text-primary" : "text-muted-foreground"
                }`}>
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link to={link.path} className="cursor-pointer">
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            
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
              {mainLinks.map((link) => (
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
              
              <div className="border-t border-border pt-2 mt-2">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Trade</p>
                {tradeLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm font-medium transition-colors hover:text-primary py-2 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-border pt-2">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Earn</p>
                {earnLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm font-medium transition-colors hover:text-primary py-2 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-border pt-2">
                <p className="text-xs font-semibold text-muted-foreground mb-2">More</p>
                {moreLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm font-medium transition-colors hover:text-primary py-2 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

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
