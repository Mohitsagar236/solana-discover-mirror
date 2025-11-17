import { Card } from "@/components/ui/card";
import { Zap, Target, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Order Execution Engine",
    description: "Lightning-fast order execution in ≤1 block with our proprietary colocated infrastructure. Experience sub-second fills and zero slippage on limit orders.",
  },
  {
    icon: Target,
    title: "Wallet and Twitter Tracker",
    description: "Monitor whale wallets and influencer portfolios in real-time. Get instant alerts on large transfers and copy successful trading strategies.",
  },
  {
    icon: Shield,
    title: "Hyperliquid Perpetuals",
    description: "Access deep liquidity perpetual futures with up to 20x leverage. Trade BTC, ETH, SOL and more with zero gas fees and instant settlements.",
  },
  {
    icon: Sparkles,
    title: "Yield",
    description: "Earn up to 120% APR on your crypto assets through our optimized yield strategies. Powered by MarginFi with instant withdrawals and auto-compounding.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 animate-in fade-in duration-700">
          Advanced Features to{" "}
          <span className="text-primary">Streamline</span> Your Trading
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          From wallet tracking to real-time analytics, we've got you covered.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
