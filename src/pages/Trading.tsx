import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

const tradingPairs = [
  { name: "SOL/USDT", price: "$142.35", change: "+5.23%", positive: true },
  { name: "ETH/USDT", price: "$2,234.12", change: "+3.45%", positive: true },
  { name: "BTC/USDT", price: "$43,521.00", change: "-1.23%", positive: false },
  { name: "BONK/USDT", price: "$0.000023", change: "+12.34%", positive: true },
];

const Trading = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Trade <span className="text-primary">Smarter</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Advanced trading tools with lightning-fast execution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">24h Volume</h3>
              </div>
              <p className="text-3xl font-bold">$1.2B</p>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Total Value Locked</h3>
              </div>
              <p className="text-3xl font-bold">$3.5B</p>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Active Traders</h3>
              </div>
              <p className="text-3xl font-bold">45.2K</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-card border-border p-6 h-[600px]">
                <h2 className="text-2xl font-bold mb-6">Trading Chart</h2>
                <div className="w-full h-[500px] bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                    <p className="text-muted-foreground">Advanced TradingView Chart</p>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="bg-card border-border p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Markets</h2>
                <div className="space-y-4">
                  {tradingPairs.map((pair, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-muted/20 rounded-lg transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold">{pair.name}</p>
                        <p className="text-sm text-muted-foreground">{pair.price}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          pair.positive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {pair.positive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-semibold">{pair.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <h2 className="text-xl font-bold mb-4">Quick Trade</h2>
                <div className="space-y-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Buy
                  </Button>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Sell
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Trading;
