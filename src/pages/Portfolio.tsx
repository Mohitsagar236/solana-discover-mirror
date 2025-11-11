import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

const holdings = [
  { token: "SOL", amount: "12.5", value: "$1,779.38", change: "+5.23%", positive: true },
  { token: "BONK", amount: "1,250,000", value: "$28.75", change: "+12.34%", positive: true },
  { token: "JUP", amount: "450", value: "$382.50", change: "+8.45%", positive: true },
  { token: "USDC", amount: "500", value: "$500.00", change: "0%", positive: true },
];

const transactions = [
  { type: "Buy", token: "SOL", amount: "2.5 SOL", price: "$142.35", time: "2 hours ago", positive: true },
  { type: "Sell", token: "BONK", amount: "500,000 BONK", price: "$11.50", time: "5 hours ago", positive: false },
  { type: "Buy", token: "JUP", amount: "100 JUP", price: "$85.00", time: "1 day ago", positive: true },
  { type: "Swap", token: "SOL → USDC", amount: "1 SOL", price: "$142.00", time: "2 days ago", positive: true },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Track and manage your crypto holdings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-5 h-5 text-primary" />
                <h3 className="text-sm text-muted-foreground">Total Balance</h3>
              </div>
              <p className="text-4xl font-bold mb-2">$2,690.63</p>
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+8.45% (24h)</span>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-sm text-muted-foreground">24h P&L</h3>
              </div>
              <p className="text-4xl font-bold mb-2 text-green-500">+$209.34</p>
              <div className="flex items-center gap-1 text-green-500">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-semibold">Profit</span>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-sm text-muted-foreground">All Time P&L</h3>
              </div>
              <p className="text-4xl font-bold mb-2 text-green-500">+$1,234.56</p>
              <div className="flex items-center gap-1 text-green-500">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-semibold">+84.5%</span>
              </div>
            </Card>
          </div>

          <Card className="bg-card border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Holdings</h2>
              <Button className="bg-primary hover:bg-primary/90">Deposit</Button>
            </div>
            <div className="space-y-4">
              {holdings.map((holding, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">{holding.token[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{holding.token}</p>
                      <p className="text-sm text-muted-foreground">{holding.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{holding.value}</p>
                    <div
                      className={`flex items-center gap-1 justify-end ${
                        holding.positive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {holding.positive ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span className="text-sm font-semibold">{holding.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.positive ? "bg-green-500/10" : "bg-red-500/10"
                      }`}
                    >
                      {tx.positive ? (
                        <ArrowUpRight className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{tx.type} {tx.token}</p>
                      <p className="text-sm text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{tx.amount}</p>
                    <p className="text-sm text-muted-foreground">{tx.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
