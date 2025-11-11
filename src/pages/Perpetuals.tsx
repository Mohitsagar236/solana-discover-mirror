import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Shield, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Zap,
    title: "Deep Liquidity",
    description: "Access the deepest liquidity pools for seamless trading with minimal slippage",
  },
  {
    icon: Target,
    title: "Instant Fills",
    description: "Execute trades instantly with lightning-fast order matching",
  },
  {
    icon: Shield,
    title: "Up to 50x Leverage",
    description: "Maximize your trading potential with flexible leverage options",
  },
  {
    icon: TrendingUp,
    title: "Zero Gas Fees",
    description: "Trade without worrying about network fees eating your profits",
  },
];

const Perpetuals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-2">
              Powered by Hyperliquid
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Perpetual
              </span>{" "}
              Futures
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Trade leveraged perpetuals with deep liquidity and instant fills. Experience professional-grade trading with zero gas fees.
            </p>
          </div>

          <Card className="bg-card border-border p-8 mb-12 hover:shadow-xl transition-shadow">
            <div className="aspect-video w-full bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-lg flex items-center justify-center mb-6 overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="text-center relative z-10">
                <TrendingUp className="w-24 h-24 text-primary mx-auto mb-4 animate-pulse" />
                <p className="text-xl text-foreground/80 font-semibold">Advanced Perpetuals Trading Interface</p>
                <p className="text-sm text-muted-foreground mt-2">Real-time charts • Order book • Position management</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg text-center hover:bg-muted/30 transition-colors">
                <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
                <p className="text-2xl font-bold text-primary">$2.1B</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center hover:bg-muted/30 transition-colors">
                <p className="text-sm text-muted-foreground mb-1">Open Interest</p>
                <p className="text-2xl font-bold text-primary">$850M</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center hover:bg-muted/30 transition-colors">
                <p className="text-sm text-muted-foreground mb-1">Funding Rate</p>
                <p className="text-2xl font-bold text-green-500">0.01%</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center hover:bg-muted/30 transition-colors">
                <p className="text-sm text-muted-foreground mb-1">Max Leverage</p>
                <p className="text-2xl font-bold text-primary">50x</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/trading">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group"
              >
                Start Trading Perps
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Perpetuals;
