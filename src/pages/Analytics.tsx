import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, BarChart3, PieChart, LineChart } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { apiService } from "@/services/api";

const protocolStats = [
  { label: "Total Value Locked", value: "$1.2B", change: "+12.5%", positive: true, icon: DollarSign },
  { label: "24h Volume", value: "$450M", change: "+8.3%", positive: true, icon: Activity },
  { label: "Total Users", value: "152K", change: "+15.2%", positive: true, icon: Users },
  { label: "Active Markets", value: "85", change: "+3", positive: true, icon: BarChart3 },
];

const volumeData = [
  { date: "Nov 4", volume: "$385M", trades: "45.2K" },
  { date: "Nov 5", volume: "$412M", trades: "48.1K" },
  { date: "Nov 6", volume: "$398M", trades: "46.8K" },
  { date: "Nov 7", volume: "$445M", trades: "52.3K" },
  { date: "Nov 8", volume: "$428M", trades: "49.7K" },
  { date: "Nov 9", volume: "$467M", trades: "54.2K" },
  { date: "Nov 10", volume: "$450M", trades: "51.8K" },
];

const topTokens = [
  { name: "SOL", volume: "$125M", change: "+5.2%", positive: true, share: "27.8%" },
  { name: "USDC", volume: "$98M", change: "+3.1%", positive: true, share: "21.8%" },
  { name: "BTC", volume: "$85M", change: "+7.4%", positive: true, share: "18.9%" },
  { name: "ETH", volume: "$72M", change: "+4.8%", positive: true, share: "16.0%" },
  { name: "JUP", volume: "$45M", change: "+12.3%", positive: true, share: "10.0%" },
  { name: "Others", volume: "$25M", change: "+2.1%", positive: true, share: "5.5%" },
];

const topTraders = [
  { address: "0x7a9f...3b2c", volume: "$12.5M", trades: "1,245", pnl: "+$245K", positive: true },
  { address: "0x4e8d...7f1a", volume: "$10.2M", trades: "892", pnl: "+$198K", positive: true },
  { address: "0x9c3b...4d6e", volume: "$9.8M", trades: "756", pnl: "+$187K", positive: true },
  { address: "0x1f5a...8c2b", volume: "$8.5M", trades: "634", pnl: "+$156K", positive: true },
  { address: "0x6d2e...9a4f", volume: "$7.9M", trades: "521", pnl: "+$142K", positive: true },
];

const platformMetrics = [
  { metric: "Total Trades", value: "2.5M", period: "All Time" },
  { metric: "Average Trade Size", value: "$1,245", period: "Last 30 Days" },
  { metric: "Total Fees Collected", value: "$4.2M", period: "All Time" },
  { metric: "Unique Wallets", value: "152K", period: "All Time" },
  { metric: "Daily Active Users", value: "8.5K", period: "Last 24h" },
  { metric: "Total Liquidity Providers", value: "12.3K", period: "All Time" },
];

const yieldMetrics = [
  { pool: "USDC Pool", tvl: "$125M", apy: "12.5%", users: "4,250" },
  { pool: "SOL Pool", tvl: "$85M", apy: "15.2%", users: "3,180" },
  { pool: "JTO Pool", tvl: "$35M", apy: "28.3%", users: "1,420" },
  { pool: "ETH Pool", tvl: "$95M", apy: "10.8%", users: "2,890" },
  { pool: "JUP Pool", tvl: "$42M", apy: "22.5%", users: "1,650" },
];

const Analytics = () => {
  const { prices, isConnected } = useWebSocket();
  const [stats, setStats] = useState(protocolStats);
  const [volumeHistory, setVolumeHistory] = useState(volumeData);
  const [topTradersState, setTopTradersState] = useState(topTraders);
  const [loading, setLoading] = useState(false);
  type Overview = {
    totalValueLocked?: number;
    volume24h?: number;
    totalUsers?: number;
    activeMarkets?: number;
    volumeHistory?: Array<{ date: string; volume: number; trades: number }>;
  };
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [error, setError] = useState<string | null>(null);

  // Update stats with real-time data
  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      // Calculate total volume from all tokens
      const totalVolume = Object.values(prices).reduce((sum, p) => sum + p.volume24h, 0);
      
      setStats(prev => prev.map(stat => {
        if (stat.label === "24h Volume") {
          return {
            ...stat,
            value: `$${(totalVolume / 1000000).toFixed(0)}M`,
          };
        }
        return stat;
      }));
    }
  }, [prices]);

  // Fetch analytics overview and top traders from API
  useEffect(() => {
    const run = async () => {
  setLoading(true);
  setError(null);
      try {
  const overview = await apiService.getAnalyticsOverview() as Overview;
        if (overview) {
          setStats(prev => prev.map(s => {
            if (s.label === "Total Value Locked") {
              return { ...s, value: `$${(overview.totalValueLocked / 1_000_000).toFixed(0)}M` };
            }
            if (s.label === "24h Volume") {
              return { ...s, value: `$${(overview.volume24h / 1_000_000).toFixed(0)}M` };
            }
            if (s.label === "Total Users") {
              return { ...s, value: `${(overview.totalUsers / 1000).toFixed(0)}K` };
            }
            if (s.label === "Active Markets") {
              return { ...s, value: `${overview.activeMarkets}` };
            }
            return s;
          }));

          if (Array.isArray(overview.volumeHistory)) {
            const hist = overview.volumeHistory.map((d: any) => ({
              date: new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
              volume: `$${(d.volume / 1_000_000).toFixed(0)}M`,
              trades: `${(d.trades / 1000).toFixed(1)}K`,
            }));
            setVolumeHistory(hist);
          }
        }

        const traders = await apiService.getTopTraders();
        if (Array.isArray(traders)) {
          const mapped = traders.map((t: any) => ({
            address: t.address,
            volume: `$${(t.volume / 1_000_000).toFixed(1)}M`,
            trades: t.trades.toLocaleString(),
            pnl: `${t.pnl >= 0 ? '+' : ''}$${(Math.abs(t.pnl) / 1000).toFixed(0)}K`,
            positive: t.pnl >= 0,
          }));
          setTopTradersState(mapped as any);
        }
      } catch (e) {
        console.warn('Analytics API not available, using defaults');
        setError('Live analytics API unavailable; showing cached sample data.');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Analytics</span> Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time protocol metrics and trading insights
            </p>
          </div>

          {/* Protocol Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </Card>
                ))
              : protocolStats.map((stat, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${
                        stat.positive ? "text-green-500" : "text-red-500"
                      }`}>
                        {stat.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
          </div>
          {error && <ErrorState description={error} className="mb-8" />}

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="tokens">Top Tokens</TabsTrigger>
              <TabsTrigger value="traders">Top Traders</TabsTrigger>
              <TabsTrigger value="yield">Yield Pools</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Platform Metrics
                  </h3>
                  <div className="space-y-4">
                    {platformMetrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                        <div>
                          <p className="font-semibold">{metric.metric}</p>
                          <p className="text-xs text-muted-foreground">{metric.period}</p>
                        </div>
                        <p className="text-2xl font-bold text-primary">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Volume Distribution
                  </h3>
                  <div className="space-y-3">
                    {topTokens.map((token, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">{token.name.substring(0, 2)}</span>
                            </div>
                            <span className="font-semibold">{token.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{token.volume}</p>
                            <p className="text-xs text-green-500">{token.change}</p>
                          </div>
                        </div>
                        <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            style={{ width: token.share }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="volume">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">7-Day Volume History</h3>
                <div className="space-y-4">
                  {loading
                    ? Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                          <div>
                            <Skeleton className="h-5 w-24 mb-1" />
                            <Skeleton className="h-4 w-28" />
                          </div>
                          <div className="text-right">
                            <Skeleton className="h-7 w-24 mb-1 ml-auto" />
                            <Skeleton className="h-5 w-28 ml-auto" />
                          </div>
                        </div>
                      ))
                    : volumeHistory.map((data, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                          <div>
                            <p className="font-semibold">{data.date}</p>
                            <p className="text-sm text-muted-foreground">{data.trades} trades</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{data.volume}</p>
                            <Badge variant="secondary" className="mt-1 rounded-full">
                              Trading Volume
                            </Badge>
                          </div>
                        </div>
                      ))}
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">7-Day Average</p>
                  <p className="text-3xl font-bold text-primary">
                    {(() => {
                      if (!volumeHistory.length) return '$0M';
                      const avg = volumeHistory.reduce((s, d) => s + parseFloat(d.volume.replace(/[$M]/g, '')) , 0) / volumeHistory.length;
                      return `$${avg.toFixed(1)}M`;
                    })()}
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tokens">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Top Tokens by Volume (24h)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/20">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold">#</th>
                        <th className="text-left p-4 text-sm font-semibold">Token</th>
                        <th className="text-right p-4 text-sm font-semibold">24h Volume</th>
                        <th className="text-right p-4 text-sm font-semibold">Change</th>
                        <th className="text-right p-4 text-sm font-semibold">Market Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topTokens.map((token, index) => (
                        <tr key={index} className="border-t border-border hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-muted-foreground">{index + 1}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">{token.name.substring(0, 2)}</span>
                              </div>
                              <span className="font-semibold">{token.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right font-semibold">{token.volume}</td>
                          <td className="p-4 text-right">
                            <span className={token.positive ? "text-green-500" : "text-red-500"}>
                              {token.change}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Badge variant="secondary" className="rounded-full">
                              {token.share}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="traders">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Top Traders (30 Days)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/20">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold">#</th>
                        <th className="text-left p-4 text-sm font-semibold">Address</th>
                        <th className="text-right p-4 text-sm font-semibold">Volume</th>
                        <th className="text-right p-4 text-sm font-semibold">Trades</th>
                        <th className="text-right p-4 text-sm font-semibold">Total PnL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i} className="border-t border-border">
                              <td className="p-4"><Skeleton className="h-5 w-6" /></td>
                              <td className="p-4"><Skeleton className="h-6 w-40" /></td>
                              <td className="p-4 text-right"><Skeleton className="h-6 w-20 ml-auto" /></td>
                              <td className="p-4 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
                              <td className="p-4 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
                            </tr>
                          ))
                        : topTradersState.map((trader, index) => (
                            <tr key={index} className="border-t border-border hover:bg-muted/10 transition-colors">
                              <td className="p-4 text-muted-foreground">{index + 1}</td>
                              <td className="p-4">
                                <code className="bg-muted/30 px-2 py-1 rounded text-sm font-mono">
                                  {trader.address}
                                </code>
                              </td>
                              <td className="p-4 text-right font-semibold">{trader.volume}</td>
                              <td className="p-4 text-right text-muted-foreground">{trader.trades}</td>
                              <td className="p-4 text-right">
                                <span className={`font-semibold ${trader.positive ? "text-green-500" : "text-red-500"}`}>
                                  {trader.pnl}
                                </span>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="yield">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Top Yield Pools</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/20">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold">Pool</th>
                        <th className="text-right p-4 text-sm font-semibold">TVL</th>
                        <th className="text-right p-4 text-sm font-semibold">APY</th>
                        <th className="text-right p-4 text-sm font-semibold">Users</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yieldMetrics.map((pool, index) => (
                        <tr key={index} className="border-t border-border hover:bg-muted/10 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">{pool.pool.substring(0, 2)}</span>
                              </div>
                              <span className="font-semibold">{pool.pool}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right font-semibold">{pool.tvl}</td>
                          <td className="p-4 text-right">
                            <span className="text-green-500 font-semibold">{pool.apy}</span>
                          </td>
                          <td className="p-4 text-right text-muted-foreground">{pool.users}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total TVL</p>
                      <p className="text-2xl font-bold text-primary">$382M</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg APY</p>
                      <p className="text-2xl font-bold text-green-500">17.9%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                      <p className="text-2xl font-bold text-primary">13.4K</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
