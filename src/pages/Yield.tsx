import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Coins, Lock, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const yieldOptions = [
  {
    token: "USDC",
    apy: "12.5%",
    tvl: "$125M",
    risk: "Low",
    description: "Stable yield on USDC with instant liquidity",
  },
  {
    token: "SOL",
    apy: "15.2%",
    tvl: "$85M",
    risk: "Medium",
    description: "Earn high APY on your SOL holdings",
  },
  {
    token: "ETH",
    apy: "10.8%",
    tvl: "$95M",
    risk: "Low",
    description: "Secure yields on Ethereum deposits",
  },
  {
    token: "USDT",
    apy: "11.3%",
    tvl: "$110M",
    risk: "Low",
    description: "Reliable returns on USDT stablecoin",
  },
];

const Yield = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-2">
              Powered by MarginFi
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Earn{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Passive Income
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Earn up to 15% APY on your crypto with instant withdrawals. Your funds are always secure and accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card border-border p-6 text-center hover:border-primary hover:shadow-lg transition-all group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Up to 15% APY</h3>
              <p className="text-muted-foreground">Competitive yields on your assets</p>
            </Card>

            <Card className="bg-card border-border p-6 text-center hover:border-primary hover:shadow-lg transition-all group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Coins className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Instant Withdrawals</h3>
              <p className="text-muted-foreground">Access your funds anytime, no lock-ups</p>
            </Card>

            <Card className="bg-card border-border p-6 text-center hover:border-primary hover:shadow-lg transition-all group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Secure & Safe</h3>
              <p className="text-muted-foreground">Non-custodial, audited, battle-tested</p>
            </Card>
          </div>

          <Card className="bg-card border-border p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8">Available Yields</h2>
            <div className="space-y-4">
              {yieldOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-primary">{option.token[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{option.token}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">TVL: {option.tvl}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 md:gap-8 w-full md:w-auto">
                    <div className="text-left md:text-right">
                      <p className="text-sm text-muted-foreground mb-1">APY</p>
                      <p className="text-2xl font-bold text-green-500">{option.apy}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm text-muted-foreground mb-1">Risk</p>
                      <Badge variant={option.risk === 'Low' ? 'secondary' : 'outline'} className="rounded-full">
                        {option.risk}
                      </Badge>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 rounded-full">
                      Deposit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 p-12 text-center">
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Earning Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deposit your assets and start earning passive income with the best yields in DeFi. Fully secured by MarginFi.
            </p>
            <Link to="/portfolio">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Yield;
