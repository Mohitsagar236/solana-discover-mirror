import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Zap, Shield, Target } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Deep Liquidity",
    description: "Access the deepest liquidity pools for seamless trading",
  },
  {
    icon: Target,
    title: "Instant Fills",
    description: "Execute trades instantly with zero slippage",
  },
  {
    icon: Shield,
    title: "Up to 50x Leverage",
    description: "Maximize your trading potential with high leverage",
  },
  {
    icon: TrendingUp,
    title: "Low Fees",
    description: "Trade with the lowest fees in the market",
  },
];

const Perpetuals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-primary">Perpetual</span> Futures
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Trade leveraged perpetuals with deep liquidity and instant fills
            </p>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <span>Powered by</span>
              <span className="text-2xl font-bold text-foreground">Hyperliquid</span>
            </div>
          </div>

          <Card className="bg-card border-border p-8 mb-12">
            <div className="aspect-video w-full bg-muted/20 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <TrendingUp className="w-24 h-24 text-primary mx-auto mb-4 animate-pulse" />
                <p className="text-xl text-muted-foreground">Perpetuals Trading Interface</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
                <p className="text-2xl font-bold">$2.1B</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Open Interest</p>
                <p className="text-2xl font-bold">$850M</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Funding Rate</p>
                <p className="text-2xl font-bold text-green-500">0.01%</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Max Leverage</p>
                <p className="text-2xl font-bold">50x</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 hover:border-primary transition-all duration-300"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-full shadow-glow"
            >
              Start Trading Perps
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Perpetuals;
