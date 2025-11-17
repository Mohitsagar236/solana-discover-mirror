import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, TrendingUp, Clock, Target, Award } from "lucide-react";

const topTraders = [
  { rank: 1, name: "CryptoWhale", volume: "$12.5M", profit: "+$234K", trades: 1250, winRate: "84%", badge: "🏆" },
  { rank: 2, name: "DeFiKing", volume: "$8.3M", profit: "+$189K", trades: 980, winRate: "81%", badge: "🥈" },
  { rank: 3, name: "SolanaMax", volume: "$6.7M", profit: "+$156K", trades: 845, winRate: "79%", badge: "🥉" },
  { rank: 4, name: "TokenMaster", volume: "$5.2M", profit: "+$134K", trades: 720, winRate: "76%" },
  { rank: 5, name: "TradeGuru", volume: "$4.8M", profit: "+$128K", trades: 695, winRate: "75%" },
  { rank: 6, name: "CryptoNinja", volume: "$4.1M", profit: "+$112K", trades: 610, winRate: "73%" },
  { rank: 7, name: "DeFiPro", volume: "$3.9M", profit: "+$98K", trades: 580, winRate: "72%" },
  { rank: 8, name: "BlockchainBoss", volume: "$3.5M", profit: "+$87K", trades: 545, winRate: "71%" },
  { rank: 9, name: "SolTrader", volume: "$3.2M", profit: "+$76K", trades: 520, winRate: "70%" },
  { rank: 10, name: "TokenHunter", volume: "$2.9M", profit: "+$68K", trades: 490, winRate: "69%" },
  { rank: 11, name: "SwapMaster", volume: "$2.7M", profit: "+$65K", trades: 475, winRate: "68%" },
  { rank: 12, name: "YieldFarmer", volume: "$2.5M", profit: "+$62K", trades: 455, winRate: "67%" },
  { rank: 13, name: "LiquidityPro", volume: "$2.3M", profit: "+$58K", trades: 440, winRate: "66%" },
  { rank: 14, name: "PerpTrader", volume: "$2.1M", profit: "+$55K", trades: 425, winRate: "65%" },
  { rank: 15, name: "MarginKing", volume: "$1.9M", profit: "+$51K", trades: 410, winRate: "64%" },
  { rank: 16, name: "OptionsBoss", volume: "$1.8M", profit: "+$48K", trades: 395, winRate: "63%" },
  { rank: 17, name: "FuturesWhale", volume: "$1.6M", profit: "+$45K", trades: 380, winRate: "62%" },
  { rank: 18, name: "SpotExpert", volume: "$1.5M", profit: "+$42K", trades: 365, winRate: "61%" },
  { rank: 19, name: "ArbitrageBot", volume: "$1.4M", profit: "+$39K", trades: 350, winRate: "60%" },
  { rank: 20, name: "GridTrader", volume: "$1.3M", profit: "+$36K", trades: 335, winRate: "59%" },
  { rank: 21, name: "ScalpMaster", volume: "$1.2M", profit: "+$33K", trades: 320, winRate: "58%" },
  { rank: 22, name: "SwingKing", volume: "$1.1M", profit: "+$30K", trades: 305, winRate: "57%" },
];

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<"24h" | "7d" | "30d" | "all">("24h");

  const timeFilters = [
    { value: "24h" as const, label: "24 Hours" },
    { value: "7d" as const, label: "7 Days" },
    { value: "30d" as const, label: "30 Days" },
    { value: "all" as const, label: "All Time" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-primary">Leaderboard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Top traders on Axiom. Compete for the highest rankings and exclusive rewards.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {timeFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={timeFilter === filter.value ? "default" : "outline"}
                  onClick={() => setTimeFilter(filter.value)}
                  className="min-w-[120px]"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">10,450</h3>
              <p className="text-muted-foreground">Active Traders</p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">$125M</h3>
              <p className="text-muted-foreground">Total Volume ({timeFilter})</p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">$50K</h3>
              <p className="text-muted-foreground">Rewards Pool</p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">76%</h3>
              <p className="text-muted-foreground">Avg Win Rate</p>
            </Card>
          </div>

          <Card className="bg-card border-border overflow-hidden">
            <div className="p-6 bg-muted/20 border-b border-border">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                Top Traders
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/20">
                  <tr>
                    <th className="text-left p-4 font-semibold">Rank</th>
                    <th className="text-left p-4 font-semibold">Trader</th>
                    <th className="text-left p-4 font-semibold">Volume ({timeFilter})</th>
                    <th className="text-left p-4 font-semibold">Total Profit</th>
                    <th className="text-left p-4 font-semibold">Win Rate</th>
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
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            trader.rank <= 3 ? 'bg-primary/20' : 'bg-primary/10'
                          }`}>
                            <span className="font-bold text-primary">{trader.name[0]}</span>
                          </div>
                          <div>
                            <span className="font-semibold block">{trader.name}</span>
                            {trader.rank <= 3 && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                Top {trader.rank}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold">{trader.volume}</td>
                      <td className="p-4 font-semibold text-green-500">{trader.profit}</td>
                      <td className="p-4">
                        <Badge variant="default" className="font-semibold">
                          {trader.winRate}
                        </Badge>
                      </td>
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
