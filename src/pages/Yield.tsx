import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Coins, Lock, TrendingUp } from "lucide-react";

const yieldOptions = [
  {
    token: "USDC",
    apy: "12.5%",
    tvl: "$125M",
    risk: "Low",
  },
  {
    token: "SOL",
    apy: "15.2%",
    tvl: "$85M",
    risk: "Medium",
  },
  {
    token: "ETH",
    apy: "10.8%",
    tvl: "$95M",
    risk: "Low",
  },
  {
    token: "USDT",
    apy: "11.3%",
    tvl: "$110M",
    risk: "Low",
  },
];

const Yield = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Earn <span className="text-primary">Passive Income</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Earn up to 15% APY on your crypto with instant withdrawals
            </p>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <span>Powered by</span>
              <span className="text-2xl font-bold text-foreground">Marginfi</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card border-border p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Up to 15% APY</h3>
              <p className="text-muted-foreground">Competitive yields on your assets</p>
            </Card>

            <Card className="bg-card border-border p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Instant Withdrawals</h3>
              <p className="text-muted-foreground">Access your funds anytime</p>
            </Card>

            <Card className="bg-card border-border p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Secure & Safe</h3>
              <p className="text-muted-foreground">Non-custodial and audited</p>
            </Card>
          </div>

          <Card className="bg-card border-border p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8">Available Yields</h2>
            <div className="space-y-4">
              {yieldOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">{option.token[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{option.token}</h3>
                      <p className="text-sm text-muted-foreground">TVL: {option.tvl}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">APY</p>
                      <p className="text-2xl font-bold text-green-500">{option.apy}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Risk</p>
                      <p className={`font-semibold ${option.risk === 'Low' ? 'text-green-500' : 'text-yellow-500'}`}>
                        {option.risk}
                      </p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Deposit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 p-12 text-center">
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Start Earning Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deposit your assets and start earning passive income with the best yields in DeFi
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-full shadow-glow"
            >
              Get Started
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Yield;
