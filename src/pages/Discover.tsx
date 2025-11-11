import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Search, Star, Flame } from "lucide-react";
import { useState } from "react";

const tokens = [
  { name: "Solana", symbol: "SOL", price: "$142.35", change: "+5.23%", volume: "$1.2B", mcap: "$65B", positive: true, trending: true },
  { name: "Bonk", symbol: "BONK", price: "$0.000023", change: "+12.34%", volume: "$45M", mcap: "$1.5B", positive: true, trending: true },
  { name: "Jupiter", symbol: "JUP", price: "$0.85", change: "+8.45%", volume: "$120M", mcap: "$850M", positive: true, trending: false },
  { name: "Pyth Network", symbol: "PYTH", price: "$0.42", change: "-2.15%", volume: "$80M", mcap: "$1.1B", positive: false, trending: false },
  { name: "Jito", symbol: "JTO", price: "$2.15", change: "+15.67%", volume: "$95M", mcap: "$2.3B", positive: true, trending: true },
  { name: "Render", symbol: "RNDR", price: "$8.45", change: "-1.23%", volume: "$200M", mcap: "$3.2B", positive: false, trending: false },
  { name: "Helium", symbol: "HNT", price: "$4.32", change: "+3.45%", volume: "$65M", mcap: "$750M", positive: true, trending: false },
  { name: "Raydium", symbol: "RAY", price: "$1.87", change: "+6.78%", volume: "$150M", mcap: "$450M", positive: true, trending: true },
];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-primary">Discover</span> Tokens
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore the hottest tokens on Solana
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-card border-border h-14 text-lg"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            <Button variant="default" className="rounded-full">All</Button>
            <Button variant="outline" className="rounded-full">
              <Flame className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button variant="outline" className="rounded-full">DeFi</Button>
            <Button variant="outline" className="rounded-full">Gaming</Button>
            <Button variant="outline" className="rounded-full">NFTs</Button>
            <Button variant="outline" className="rounded-full">Memes</Button>
          </div>

          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/20">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm text-muted-foreground">#</th>
                    <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Token</th>
                    <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Price</th>
                    <th className="text-left p-4 font-semibold text-sm text-muted-foreground">24h Change</th>
                    <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Volume</th>
                    <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Market Cap</th>
                    <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token, index) => (
                    <tr
                      key={index}
                      className="border-t border-border hover:bg-muted/10 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{index + 1}</span>
                          {token.trending && <Flame className="w-4 h-4 text-orange-500" />}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">{token.symbol[0]}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{token.name}</p>
                            <p className="text-sm text-muted-foreground">{token.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold">{token.price}</td>
                      <td className="p-4">
                        <div
                          className={`flex items-center gap-1 ${
                            token.positive ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {token.positive ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold">{token.change}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{token.volume}</td>
                      <td className="p-4 text-muted-foreground">{token.mcap}</td>
                      <td className="p-4">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Trade
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
