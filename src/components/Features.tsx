import { Card } from "@/components/ui/card";
import { Zap, Target, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Order Execution Engine",
    description: "Trade with confidence.",
  },
  {
    icon: Target,
    title: "Wallet and Twitter Tracker",
    description: "Trade and track all in one place.",
  },
  {
    icon: Shield,
    title: "Hyperliquid Perpetuals",
    description: "Trade leveraged Perps.",
  },
  {
    icon: Sparkles,
    title: "Yield",
    description: "Earn while you sleep.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Advanced Features to{" "}
          <span className="text-primary">Streamline</span> Your Trading
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16">
          From wallet tracking to real-time analytics, we've got you covered.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover:border-primary transition-all duration-300 group"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
