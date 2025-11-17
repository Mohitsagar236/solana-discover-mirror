import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, TrendingDown, Zap, DollarSign, BarChart3, Coins, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface IntegrationProps {
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  logoPath?: string;
  logoAlt?: string;
  ctaText: string;
  ctaLink: string;
  reverse?: boolean;
  demoType?: "perpetuals" | "yield";
}

const PerpetualsDemo = () => (
  <div className="w-full space-y-4 p-4">
    <div className="text-center mb-4">
      <Badge className="bg-blue-600 mb-2">Live Perpetuals Markets</Badge>
      <p className="text-sm text-muted-foreground">Real-time trading data</p>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      {[
        { name: "BTC-PERP", price: "$43,245", change: "+2.4%", positive: true, leverage: "20x" },
        { name: "ETH-PERP", price: "$2,284", change: "+1.8%", positive: true, leverage: "20x" },
        { name: "SOL-PERP", price: "$143.50", change: "-0.5%", positive: false, leverage: "15x" },
        { name: "ARB-PERP", price: "$1.45", change: "+5.2%", positive: true, leverage: "10x" },
      ].map((market, index) => (
        <Card key={index} className="p-3 bg-gradient-to-br from-muted/50 to-muted/20 hover:border-primary transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm">{market.name}</span>
            <Badge variant="outline" className="text-xs">{market.leverage}</Badge>
          </div>
          <p className="font-bold text-lg mb-1">{market.price}</p>
          <div className="flex items-center gap-1">
            {market.positive ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-500" />
            )}
            <span className={`text-xs font-semibold ${market.positive ? "text-green-500" : "text-red-500"}`}>
              {market.change}
            </span>
          </div>
        </Card>
      ))}
    </div>
    
    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
      <div className="bg-muted/30 p-3 rounded-lg">
        <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
        <p className="text-muted-foreground mb-1">Fill Speed</p>
        <p className="font-bold text-yellow-500">Instant</p>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <DollarSign className="w-5 h-5 text-green-500 mx-auto mb-1" />
        <p className="text-muted-foreground mb-1">Gas Fees</p>
        <p className="font-bold text-green-500">$0</p>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <BarChart3 className="w-5 h-5 text-blue-500 mx-auto mb-1" />
        <p className="text-muted-foreground mb-1">Liquidity</p>
        <p className="font-bold text-blue-500">Deep</p>
      </div>
    </div>
    
    <Card className="p-3 bg-primary/5 border-primary/30 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">24h Volume</p>
          <p className="font-bold text-lg text-primary">$724M</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Open Interest</p>
          <p className="font-bold text-lg text-primary">$1.2B</p>
        </div>
      </div>
    </Card>
  </div>
);

const YieldDemo = () => (
  <div className="w-full space-y-4 p-4">
    <div className="text-center mb-4">
      <Badge className="bg-green-600 mb-2">Top Yield Pools</Badge>
      <p className="text-sm text-muted-foreground">Earn passive income</p>
    </div>
    
    <div className="space-y-3">
      {[
        { name: "USDC Pool", apy: "15.2%", tvl: "$45M", risk: "Low", icon: "💵" },
        { name: "SOL Pool", apy: "22.8%", tvl: "$32M", risk: "Medium", icon: "◎" },
        { name: "mSOL Pool", apy: "18.5%", tvl: "$28M", risk: "Low", icon: "🔥" },
        { name: "BTC Pool", apy: "12.3%", tvl: "$52M", risk: "Low", icon: "₿" },
      ].map((pool, index) => (
        <Card key={index} className="p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 hover:border-green-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{pool.icon}</div>
              <div>
                <p className="font-bold text-sm">{pool.name}</p>
                <p className="text-xs text-muted-foreground">TVL: {pool.tvl}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-green-600">{pool.apy}</p>
              <Badge variant="outline" className="text-xs">{pool.risk} Risk</Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
    
    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
      <div className="bg-muted/30 p-3 rounded-lg">
        <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
        <p className="text-muted-foreground mb-1">Withdraw</p>
        <p className="font-bold text-blue-500">Instant</p>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <Coins className="w-5 h-5 text-purple-500 mx-auto mb-1" />
        <p className="text-muted-foreground mb-1">Auto-Compound</p>
        <p className="font-bold text-purple-500">Yes</p>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <Shield className="w-5 h-5 text-green-500 mx-auto mb-1" />
        <p className="text-muted-foreground mb-1">Audited</p>
        <p className="font-bold text-green-500">3x</p>
      </div>
    </div>
    
    <Card className="p-3 bg-green-600/10 border-green-600/30 mt-4">
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">Your potential earnings on $10,000</p>
        <p className="font-bold text-2xl text-green-600">$1,520 / year</p>
        <p className="text-xs text-muted-foreground mt-1">Based on 15.2% APY</p>
      </div>
    </Card>
  </div>
);

interface IntegrationProps {
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  logoPath?: string;
  logoAlt?: string;
  ctaText: string;
  ctaLink: string;
  reverse?: boolean;
}

export const IntegrationShowcase = ({
  title,
  subtitle,
  description,
  imagePath,
  logoPath,
  logoAlt,
  ctaText,
  ctaLink,
  reverse = false,
  demoType,
}: IntegrationProps) => {
  const getDemoContent = () => {
    switch (demoType) {
      case "perpetuals":
        return <PerpetualsDemo />;
      case "yield":
        return <YieldDemo />;
      default:
        return (
          <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden">
            <img 
              src={imagePath} 
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <p class="text-4xl font-bold text-primary">${title}</p>
                  </div>
                `;
              }}
            />
          </div>
        );
    }
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`${reverse ? 'lg:order-2' : ''}`}>
            <Card className="bg-card border-2 border-border p-2 overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all">
              {getDemoContent()}
            </Card>
          </div>
          
          <div className={`${reverse ? 'lg:order-1' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-xl text-primary font-semibold mb-6">
              {subtitle}
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              {description}
            </p>
            
            {logoPath && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-muted-foreground">Powered by</span>
                <img src={logoPath} alt={logoAlt} className="h-6" onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.insertAdjacentHTML('afterend', `<span class="font-bold text-lg">${logoAlt}</span>`);
                }} />
              </div>
            )}
            
            <Link to={ctaLink}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg hover:shadow-primary/50 transition-all group">
                {ctaText}
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
