import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  History,
  PieChart,
  RefreshCw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWebSocket } from "@/hooks/useWebSocket";
import { apiService } from "@/services/api";

interface Holding {
  token: string;
  amount: number;
  price: number;
  change24h: number;
}

interface DerivedHolding extends Holding {
  valueUSD: number;
  previousValueUSD: number;
  allocation: number;
}

interface PerformanceEntry {
  period: string;
  pnl: string;
  percentage: string;
  positive: boolean;
}

interface Transaction {
  type: string;
  token: string;
  amount: string;
  value: string;
  time: string;
  positive: boolean;
}

type LivePriceMap = Record<string, { price?: number; change24h?: number } | undefined>;

const initialHoldings: Holding[] = [
  { token: "SOL", amount: 12.5, price: 142.35, change24h: 5.23 },
  { token: "JUP", amount: 1800, price: 0.85, change24h: 8.45 },
  { token: "BONK", amount: 8_500_000, price: 0.000023, change24h: 12.34 },
  { token: "USDC", amount: 1250, price: 1, change24h: 0.01 },
  { token: "PYTH", amount: 950, price: 0.78, change24h: -3.12 },
  { token: "ORCA", amount: 410, price: 3.45, change24h: 4.67 },
];

const basePerformanceData: PerformanceEntry[] = [
  { period: "24h", pnl: "+$209.34", percentage: "+8.45%", positive: true },
  { period: "7d", pnl: "+$456.78", percentage: "+18.92%", positive: true },
  { period: "30d", pnl: "+$892.45", percentage: "+38.76%", positive: true },
  { period: "All Time", pnl: "+$1,234.56", percentage: "+84.5%", positive: true },
];

const transactions: Transaction[] = [
  { type: "Buy", token: "SOL", amount: "5.2 SOL", value: "$741.00", time: "2 hours ago", positive: true },
  { type: "Stake", token: "JUP", amount: "1,000 JUP", value: "$820.00", time: "18 hours ago", positive: true },
  { type: "Sell", token: "BONK", amount: "1,200,000 BONK", value: "$27.60", time: "1 day ago", positive: false },
  { type: "Buy", token: "PYTH", amount: "350 PYTH", value: "$280.70", time: "3 days ago", positive: true },
  { type: "Swap", token: "USDC", amount: "500 USDC", value: "$500.00", time: "5 days ago", positive: true },
  { type: "Buy", token: "ORCA", amount: "120 ORCA", value: "$414.00", time: "1 week ago", positive: true },
];

const formatCurrency = (value: number) => {
  if (!Number.isFinite(value)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
};

const formatPercent = (value: number) => {
  if (!Number.isFinite(value)) {
    return "+0.00%";
  }

  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

const formatTokenAmount = (amount: number) => {
  if (!Number.isFinite(amount)) {
    return "0";
  }

  if (amount >= 1_000_000) {
    return amount.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }

  if (amount >= 1) {
    return amount.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  return amount.toLocaleString("en-US", { maximumFractionDigits: 6 });
};

const computePreviousValue = (currentValue: number, change24h: number) => {
  if (!Number.isFinite(currentValue)) {
    return 0;
  }

  const ratio = 1 + (Number.isFinite(change24h) ? change24h : 0) / 100;
  if (ratio <= 0) {
    return 0;
  }

  return currentValue / ratio;
};

const Portfolio = () => {
  const { toast } = useToast();
  const { prices, isConnected, subscribe } = useWebSocket();
  const subscribedSymbolsRef = useRef<string[]>([]);
  const [portfolioHoldings, setPortfolioHoldings] = useState<Holding[]>(initialHoldings);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateHoldingsFromPrices = useCallback((priceMap: LivePriceMap) => {
    setPortfolioHoldings((prev) =>
      prev.map((holding) => {
        const symbol = holding.token.toUpperCase();
        const live = priceMap[symbol];
        if (!live) {
          return holding;
        }

        const nextPrice = Number(live.price);
        const nextChange = Number(live.change24h);

        return {
          ...holding,
          price: Number.isFinite(nextPrice) ? nextPrice : holding.price,
          change24h: Number.isFinite(nextChange) ? nextChange : holding.change24h,
        };
      }),
    );
  }, []);

  useEffect(() => {
    if (!prices || Object.keys(prices).length === 0) {
      return;
    }

    updateHoldingsFromPrices(prices as LivePriceMap);
  }, [prices, updateHoldingsFromPrices]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    const symbols = Array.from(new Set(portfolioHoldings.map((holding) => holding.token.toUpperCase())));
    if (symbols.join("|") === subscribedSymbolsRef.current.join("|")) {
      return;
    }

    subscribe(symbols);
    subscribedSymbolsRef.current = symbols;
  }, [isConnected, subscribe, portfolioHoldings]);

  const derivedHoldings: DerivedHolding[] = useMemo(() => {
    const total = portfolioHoldings.reduce((sum, holding) => sum + holding.amount * holding.price, 0);

    return portfolioHoldings.map((holding) => {
      const valueUSD = holding.amount * holding.price;
      const previousValueUSD = computePreviousValue(valueUSD, holding.change24h);
      const allocation = total > 0 ? (valueUSD / total) * 100 : 0;

      return {
        ...holding,
        valueUSD,
        previousValueUSD,
        allocation,
      };
    });
  }, [portfolioHoldings]);

  const totalValue = useMemo(() => {
    return derivedHoldings.reduce((sum, holding) => sum + holding.valueUSD, 0);
  }, [derivedHoldings]);

  const previousDayValue = useMemo(() => {
    return derivedHoldings.reduce((sum, holding) => sum + holding.previousValueUSD, 0);
  }, [derivedHoldings]);

  const dayPnL = totalValue - previousDayValue;
  const dayChangePercent = previousDayValue > 0 ? (dayPnL / previousDayValue) * 100 : 0;

  const dayPnLLabel = useMemo(() => {
    if (!Number.isFinite(dayPnL)) {
      return "$0.00";
    }

    const absolute = formatCurrency(Math.abs(dayPnL));
    return dayPnL >= 0 ? `+${absolute}` : `-${absolute}`;
  }, [dayPnL]);

  const computedPerformanceData = useMemo(() => {
    return basePerformanceData.map((entry) => {
      if (entry.period !== "24h") {
        return entry;
      }

      return {
        period: entry.period,
        pnl: dayPnLLabel,
        percentage: formatPercent(dayChangePercent),
        positive: dayPnL >= 0,
      };
    });
  }, [dayChangePercent, dayPnL, dayPnLLabel]);

  const refreshPortfolio = useCallback(async () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing portfolio",
      description: "Fetching latest token prices...",
    });

    try {
      const latest = await apiService.getTokenPrices();
      if (latest && typeof latest === "object") {
        updateHoldingsFromPrices(latest as LivePriceMap);
      }

      toast({
        title: "Portfolio updated",
        description: "Holdings recalculated with live prices.",
      });
    } catch (error) {
      console.error("Failed to refresh portfolio", error);
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Unable to fetch the latest pricing data.",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [toast, updateHoldingsFromPrices]);

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
              Track and manage your crypto holdings in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border p-6 md:col-span-2">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    <h3 className="text-sm text-muted-foreground">Total Balance</h3>
                  </div>
                  <p className="text-5xl font-bold mb-2">{formatCurrency(totalValue)}</p>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      dayChangePercent >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {dayChangePercent >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{formatPercent(dayChangePercent)} (24h)</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant={isConnected ? "default" : "secondary"} className="h-7">
                    {isConnected ? "🟢 Live Pricing" : "🔴 Offline"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={refreshPortfolio}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-sm text-muted-foreground">24h P&L</h3>
              </div>
              <p
                className={`text-3xl font-bold mb-2 ${dayPnL >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {dayPnLLabel}
              </p>
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  dayPnL >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {dayPnL >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span>{formatPercent(dayChangePercent)}</span>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-sm text-muted-foreground">All Time P&L</h3>
              </div>
              <p className="text-3xl font-bold mb-2 text-green-500">+$1,234.56</p>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-500">
                <ArrowUpRight className="w-4 h-4" />
                <span>+84.5%</span>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {computedPerformanceData.map((data) => (
              <Card
                key={data.period}
                className="bg-card border-border p-4 hover:border-primary transition-all"
              >
                <p className="text-sm text-muted-foreground mb-1">{data.period}</p>
                <p
                  className={`text-xl font-bold ${data.positive ? "text-green-500" : "text-red-500"}`}
                >
                  {data.pnl}
                </p>
                <p className={`text-sm ${data.positive ? "text-green-500" : "text-red-500"}`}>
                  {data.percentage}
                </p>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="holdings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="holdings" className="space-y-6">
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <PieChart className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Your Holdings</h2>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline">Deposit</Button>
                    <Button className="bg-primary hover:bg-primary/90">Withdraw</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {derivedHoldings.map((holding) => (
                    <div
                      key={holding.token}
                      className="flex items-center justify-between p-5 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <span className="text-xl font-bold text-primary">{holding.token[0]}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-lg">{holding.token}</p>
                            <Badge variant="secondary" className="text-xs">
                              {Math.round(holding.allocation)}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatTokenAmount(holding.amount)} {holding.token}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg mb-1">{formatCurrency(holding.valueUSD)}</p>
                        <div
                          className={`flex items-center gap-1 justify-end text-sm ${
                            holding.change24h >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {holding.change24h >= 0 ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span className="font-semibold">{formatPercent(holding.change24h)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="bg-card border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <History className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Transaction History</h2>
                </div>
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div
                      key={`${tx.token}-${index}`}
                      className="flex items-center justify-between p-5 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
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
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={tx.positive ? "default" : "secondary"}>{tx.type}</Badge>
                            <p className="font-semibold">{tx.token}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{tx.amount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold mb-1">{tx.value}</p>
                        <p className="text-sm text-muted-foreground">{tx.time}</p>
                      </div>
                    </div>
                  ))}
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

export default Portfolio;
