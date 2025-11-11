import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Book, Code, Zap, Shield, Users, ExternalLink } from "lucide-react";

const docSections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of trading on Axiom",
    links: ["Quick Start Guide", "Creating Your Wallet", "First Trade"],
  },
  {
    icon: Zap,
    title: "Trading Features",
    description: "Advanced trading tools and strategies",
    links: ["Limit Orders", "Auto-Strategies", "Migration Sniper"],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Keep your funds safe",
    links: ["Wallet Security", "Non-Custodial Infrastructure", "Best Practices"],
  },
  {
    icon: Code,
    title: "API Documentation",
    description: "Integrate with Axiom programmatically",
    links: ["REST API", "WebSocket API", "SDK"],
  },
  {
    icon: Users,
    title: "Community",
    description: "Join the Axiom community",
    links: ["Discord", "Twitter", "Telegram"],
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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about trading on Axiom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {docSections.map((section, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 hover:border-primary transition-all"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        {link}
                        <ExternalLink className="w-3 h-3" />
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
