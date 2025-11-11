import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, TrendingUp } from "lucide-react";

const topTraders = [
  { rank: 1, name: "CryptoWhale", volume: "$12.5M", profit: "+$234K", trades: 1250, badge: "🏆" },
  { rank: 2, name: "DeFiKing", volume: "$8.3M", profit: "+$189K", trades: 980, badge: "🥈" },
  { rank: 3, name: "SolanaMax", volume: "$6.7M", profit: "+$156K", trades: 845, badge: "🥉" },
  { rank: 4, name: "TokenMaster", volume: "$5.2M", profit: "+$134K", trades: 720 },
  { rank: 5, name: "TradeGuru", volume: "$4.8M", profit: "+$128K", trades: 695 },
  { rank: 6, name: "CryptoNinja", volume: "$4.1M", profit: "+$112K", trades: 610 },
  { rank: 7, name: "DeFiPro", volume: "$3.9M", profit: "+$98K", trades: 580 },
  { rank: 8, name: "BlockchainBoss", volume: "$3.5M", profit: "+$87K", trades: 545 },
  { rank: 9, name: "SolTrader", volume: "$3.2M", profit: "+$76K", trades: 520 },
  { rank: 10, name: "TokenHunter", volume: "$2.9M", profit: "+$68K", trades: 490 },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-primary">Leaderboard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Top traders on Axiom. Compete for the highest rankings and exclusive rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card border-border p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">10,450</h3>
              <p className="text-muted-foreground">Active Traders</p>
            </Card>

            <Card className="bg-card border-border p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">$125M</h3>
              <p className="text-muted-foreground">Total Volume (24h)</p>
            </Card>

            <Card className="bg-card border-border p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">$50K</h3>
              <p className="text-muted-foreground">Rewards Pool</p>
            </Card>
          </div>

          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/20">
                  <tr>
                    <th className="text-left p-4 font-semibold">Rank</th>
                    <th className="text-left p-4 font-semibold">Trader</th>
                    <th className="text-left p-4 font-semibold">24h Volume</th>
                    <th className="text-left p-4 font-semibold">Total Profit</th>
                    <th className="text-left p-4 font-semibold">Trades</th>
                  </tr>
                </thead>
                <tbody>
                  {topTraders.map((trader) => (
                    <tr
                      key={trader.rank}
                      className={`border-t border-border hover:bg-muted/10 transition-colors ${
                        trader.rank <= 3 ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {trader.badge && <span className="text-2xl">{trader.badge}</span>}
                          <span className={`font-bold ${trader.rank <= 3 ? "text-primary" : ""}`}>
                            #{trader.rank}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-bold">{trader.name[0]}</span>
                          </div>
                          <span className="font-semibold">{trader.name}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold">{trader.volume}</td>
                      <td className="p-4 font-semibold text-green-500">{trader.profit}</td>
                      <td className="p-4 text-muted-foreground">{trader.trades}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 p-12 text-center mt-12">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Climb the Ranks</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Trade more to climb the leaderboard and unlock exclusive rewards
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
