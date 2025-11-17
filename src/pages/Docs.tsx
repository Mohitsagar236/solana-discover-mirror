import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Code, Zap, Shield, Users, ExternalLink, Search, FileText, HelpCircle, TrendingUp } from "lucide-react";

const docSections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of trading on Axiom",
    badge: "Beginner",
    links: [
      "Quick Start Guide",
      "Creating Your Wallet",
      "Making Your First Trade",
      "Understanding Fees",
      "Depositing & Withdrawing"
    ],
  },
  {
    icon: TrendingUp,
    title: "Trading Features",
    description: "Advanced trading tools and strategies",
    badge: "Intermediate",
    links: [
      "Spot Trading",
      "Perpetual Futures",
      "Limit & Market Orders",
      "Stop Loss Orders",
      "Auto-Strategies",
      "Migration Sniper"
    ],
  },
  {
    icon: Zap,
    title: "Yield & Staking",
    description: "Earn passive income on your assets",
    badge: "Intermediate",
    links: [
      "Yield Farming Guide",
      "Staking SOL",
      "Liquidity Provision",
      "Risk Management",
      "APY Calculations"
    ],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Keep your funds safe",
    badge: "Essential",
    links: [
      "Wallet Security Best Practices",
      "Non-Custodial Infrastructure",
      "Two-Factor Authentication",
      "Recovery Options",
      "Common Scams to Avoid"
    ],
  },
  {
    icon: Code,
    title: "API Documentation",
    description: "Integrate with Axiom programmatically",
    badge: "Advanced",
    links: [
      "REST API Overview",
      "WebSocket API",
      "Authentication",
      "Rate Limits",
      "TypeScript SDK",
      "Code Examples"
    ],
  },
  {
    icon: HelpCircle,
    title: "FAQs",
    description: "Frequently asked questions",
    badge: "All Levels",
    links: [
      "Account Questions",
      "Trading Questions",
      "Fee Structure",
      "Withdrawal Times",
      "Supported Tokens",
      "Platform Limits"
    ],
  },
];

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-primary">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to know about trading on Axiom
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-12 bg-card border-border h-12 text-lg"
                />
              </div>
            </div>
          </div>

          <Card className="bg-card border-border p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="#" className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold mb-1">How to Make Your First Trade</p>
                  <p className="text-sm text-muted-foreground">Step-by-step guide for beginners</p>
                </div>
              </a>
              <a href="#" className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold mb-1">Understanding Trading Fees</p>
                  <p className="text-sm text-muted-foreground">Complete fee breakdown</p>
                </div>
              </a>
              <a href="#" className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold mb-1">Wallet Security Best Practices</p>
                  <p className="text-sm text-muted-foreground">Keep your funds safe</p>
                </div>
              </a>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {docSections.map((section, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 hover:border-primary transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{section.badge}</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{section.description}</p>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-sm text-primary hover:text-primary/80 flex items-center gap-2 hover:translate-x-1 transition-transform"
                      >
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border p-8">
            <h2 className="text-3xl font-bold mb-6">Frequently Accessed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="#"
                className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold">How to create a wallet</span>
                <ExternalLink className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold">Understanding trading fees</span>
                <ExternalLink className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold">Using limit orders</span>
                <ExternalLink className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold">Claiming rewards</span>
                <ExternalLink className="w-5 h-5 text-primary" />
              </a>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
