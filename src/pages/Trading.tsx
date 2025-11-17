import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BookOpen, Clock, Zap, Star, BarChart3, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { useWebSocket } from "@/hooks/useWebSocket";

interface TradingPair {
  name: string;
  baseAsset: string;
  quoteAsset: string;
  price: string;
  change: string;
  volume: string;
  high: string;
  low: string;
  positive: boolean;
  favorite: boolean;
}

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface TradeEntry {
  price: number;
  amount: number;
  time: string;
  type: "buy" | "sell";
}

const parseVolumeString = (input: string | undefined): number => {
  if (!input) return 0;
  const numeric = parseFloat(input.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(numeric)) return 0;
  if (input.includes("B")) return numeric * 1_000_000_000;
  if (input.includes("M")) return numeric * 1_000_000;
  if (input.includes("K")) return numeric * 1_000;
  return numeric;
};

const normaliseOrderBookEntries = (entries: any[] | undefined): OrderBookEntry[] => {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries
    .map((entry) => ({
      price: Number(entry.price),
      amount: Number(entry.amount),
      total: Number(entry.total),
    }))
    .filter((entry) => Number.isFinite(entry.price) && Number.isFinite(entry.amount) && Number.isFinite(entry.total));
};

const normaliseTrades = (trades: any[] | undefined): TradeEntry[] => {
  if (!Array.isArray(trades)) {
    return [];
  }

  return trades
    .map((trade) => ({
      price: Number(trade.price),
      amount: Number(trade.amount),
      time: typeof trade.time === "string" ? trade.time : new Date(trade.time).toISOString(),
      type: trade.type === "sell" ? "sell" : "buy",
    }))
    .filter((trade) => Number.isFinite(trade.price) && Number.isFinite(trade.amount));
};

const initialTradingPairs: TradingPair[] = [
  { name: "SOL/USDT", baseAsset: "SOL", quoteAsset: "USDT", price: "$142.35", change: "+5.23%", volume: "$125M", high: "$145.20", low: "$138.50", positive: true, favorite: true },
  { name: "SOL/USDC", baseAsset: "SOL", quoteAsset: "USDC", price: "$142.28", change: "+5.18%", volume: "$98M", high: "$145.15", low: "$138.45", positive: true, favorite: false },
  { name: "ETH/USDT", baseAsset: "ETH", quoteAsset: "USDT", price: "$2,234.12", change: "+3.45%", volume: "$89M", high: "$2,250.00", low: "$2,180.00", positive: true, favorite: true },
  { name: "BTC/USDT", baseAsset: "BTC", quoteAsset: "USDT", price: "$43,521.00", change: "-1.23%", volume: "$450M", high: "$44,200.00", low: "$43,150.00", positive: false, favorite: true },
  { name: "BONK/USDT", baseAsset: "BONK", quoteAsset: "USDT", price: "$0.000023", change: "+12.34%", volume: "$12M", high: "$0.000025", low: "$0.000020", positive: true, favorite: false },
  { name: "JUP/USDT", baseAsset: "JUP", quoteAsset: "USDT", price: "$0.85", change: "+8.45%", volume: "$8M", high: "$0.92", low: "$0.78", positive: true, favorite: true },
  { name: "JTO/USDT", baseAsset: "JTO", quoteAsset: "USDT", price: "$2.15", change: "+15.67%", volume: "$7.5M", high: "$2.25", low: "$1.85", positive: true, favorite: false },
  { name: "RAY/USDT", baseAsset: "RAY", quoteAsset: "USDT", price: "$1.87", change: "+6.78%", volume: "$6.2M", high: "$1.95", low: "$1.72", positive: true, favorite: false },
  { name: "ORCA/USDT", baseAsset: "ORCA", quoteAsset: "USDT", price: "$3.24", change: "+4.12%", volume: "$3.8M", high: "$3.35", low: "$3.05", positive: true, favorite: false },
  { name: "PYTH/USDT", baseAsset: "PYTH", quoteAsset: "USDT", price: "$0.42", change: "-2.15%", volume: "$5.5M", high: "$0.45", low: "$0.40", positive: false, favorite: false },
];

const fallbackOrderBook: { asks: OrderBookEntry[]; bids: OrderBookEntry[] } = {
  asks: [
    { price: 142.38, amount: 12.5, total: 1779.75 },
    { price: 142.37, amount: 25.3, total: 3601.96 },
    { price: 142.36, amount: 8.7, total: 1238.53 },
    { price: 142.35, amount: 45.2, total: 6434.22 },
    { price: 142.34, amount: 18.6, total: 2647.52 },
  ],
  bids: [
    { price: 142.33, amount: 15.8, total: 2248.81 },
    { price: 142.32, amount: 32.1, total: 4568.47 },
    { price: 142.31, amount: 18.9, total: 2689.66 },
    { price: 142.3, amount: 52.4, total: 7456.52 },
    { price: 142.29, amount: 28.7, total: 4083.72 },
  ],
};

const fallbackTrades: TradeEntry[] = [
  { price: 142.35, amount: 2.5, time: new Date().toISOString(), type: "buy" },
  { price: 142.34, amount: 5.2, time: new Date(Date.now() - 3000).toISOString(), type: "sell" },
  { price: 142.36, amount: 1.8, time: new Date(Date.now() - 7000).toISOString(), type: "buy" },
  { price: 142.33, amount: 8.5, time: new Date(Date.now() - 12000).toISOString(), type: "sell" },
];

const openOrders = [
  { pair: "SOL/USDT", type: "Limit", side: "Buy", price: "$141.50", amount: "10 SOL", filled: "0%", total: "$1,415", time: "Nov 11, 14:20" },
  { pair: "ETH/USDT", type: "Limit", side: "Sell", price: "$2,250", amount: "2 ETH", filled: "50%", total: "$4,500", time: "Nov 11, 13:45" },
  { pair: "JUP/USDT", type: "Stop", side: "Buy", price: "$0.90", amount: "1000 JUP", filled: "0%", total: "$900", time: "Nov 11, 12:30" },
];

const tradeHistory = [
  { pair: "SOL/USDT", type: "Market", side: "Buy", price: "$142.15", amount: "5 SOL", total: "$710.75", fee: "$0.71", time: "Nov 11, 11:25", status: "Completed" },
  { pair: "BTC/USDT", type: "Limit", side: "Sell", price: "$43,800", amount: "0.5 BTC", total: "$21,900", fee: "$21.90", time: "Nov 10, 16:40", status: "Completed" },
  { pair: "ETH/USDT", type: "Market", side: "Buy", price: "$2,220", amount: "1 ETH", total: "$2,220", fee: "$2.22", time: "Nov 10, 09:15", status: "Completed" },
  { pair: "JTO/USDT", type: "Limit", side: "Buy", price: "$1.85", amount: "100 JTO", total: "$185", fee: "$0.19", time: "Nov 9, 14:20", status: "Completed" },
];

const Trading = () => {
  const { toast } = useToast();
  const { prices, isConnected, subscribe } = useWebSocket();
  const subscribedSymbolsRef = useRef<string[]>([]);

  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("limit");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [pairs, setPairs] = useState<TradingPair[]>(initialTradingPairs);
  const [selectedPairName, setSelectedPairName] = useState<string>(initialTradingPairs[0]?.name ?? "");
  const [filterPair, setFilterPair] = useState("All");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderBook, setOrderBook] = useState<{ asks: OrderBookEntry[]; bids: OrderBookEntry[] }>(fallbackOrderBook);
  const [recentTradesData, setRecentTradesData] = useState<TradeEntry[]>(fallbackTrades);
  const [myOpenOrders, setMyOpenOrders] = useState(openOrders);
  const [myTradeHistory, setMyTradeHistory] = useState(tradeHistory);

  const selectedPair = useMemo<TradingPair | undefined>(() => {
    return pairs.find(pair => pair.name === selectedPairName) ?? pairs[0];
  }, [pairs, selectedPairName]);

  const formatPrice = useCallback((value: number) => {
    if (!Number.isFinite(value)) {
      return "$0.00";
    }

    if (value < 0.01) {
      return `$${value.toFixed(6)}`;
    }
    if (value < 1) {
      return `$${value.toFixed(4)}`;
    }
    if (value < 100) {
      return `$${value.toFixed(2)}`;
    }
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }, []);

  const formatPercent = useCallback((value: number) => {
    if (!Number.isFinite(value)) {
      return "+0.00%";
    }

    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  }, []);

  const formatVolume = useCallback((value: number) => {
    if (!Number.isFinite(value)) {
      return "$0";
    }

    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(1)}B`;
    }
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(0)}M`;
    }
    if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(0)}K`;
    }
    return `$${value.toFixed(2)}`;
  }, []);

  const formatOrderBookEntry = useCallback((entries: OrderBookEntry[]) => {
    return entries.map((entry) => ({
      price: formatPrice(Number(entry.price)).replace('$', ''),
      amount: Number(entry.amount).toFixed(2),
      total: Number(entry.total).toFixed(2),
    }));
  }, [formatPrice]);

  const normalisePair = useCallback((pair: TradingPair): TradingPair => {
    const rawPrice = parseFloat(pair.price.replace(/[$,]/g, ""));
    const rawChange = parseFloat(pair.change.replace(/[%+]/g, ""));

    return {
      ...pair,
      price: Number.isFinite(rawPrice) ? formatPrice(rawPrice) : "$0.00",
      change: Number.isFinite(rawChange) ? formatPercent(rawChange) : "+0.00%",
      positive: Number.isFinite(rawChange) ? rawChange >= 0 : true,
    };
  }, [formatPercent, formatPrice]);

  const loadPairs = useCallback(async () => {
    try {
      const response = await apiService.getTradingPairs();
      const mappedPairs: TradingPair[] = response.map((pair: any) => {
        const base = initialTradingPairs.find((p) => p.name === pair.name);
        const defaultPrice = base ? parseFloat(base.price.replace(/[$,]/g, "")) : 0;
        const defaultChange = base ? parseFloat(base.change.replace(/[%+]/g, "")) : 0;

        return normalisePair({
          name: pair.name,
          baseAsset: pair.baseAsset,
          quoteAsset: pair.quoteAsset,
          price: formatPrice(pair.lastPrice ?? defaultPrice),
          change: formatPercent(pair.change24h ?? defaultChange),
          volume: formatVolume(pair.volume24h ?? (base ? parseVolumeString(base.volume) : 0)),
          high: formatPrice(pair.high24h ?? defaultPrice),
          low: formatPrice(pair.low24h ?? defaultPrice),
          positive: (pair.change24h ?? defaultChange) >= 0,
          favorite: base?.favorite ?? false,
        });
      });

      if (mappedPairs.length > 0) {
        setPairs(mappedPairs);
        if (!mappedPairs.some((pair) => pair.name === selectedPairName)) {
          setSelectedPairName(mappedPairs[0].name);
        }
      }
    } catch (error) {
      console.error("Failed to fetch trading pairs", error);
      toast({
        title: "Using cached markets",
        description: "Unable to fetch live trading pairs. Showing default data.",
      });
    }
  }, [formatPercent, formatPrice, formatVolume, normalisePair, selectedPairName, toast]);

  const fetchOrderBook = useCallback(async (pairName: string) => {
    try {
      const payload = await apiService.getOrderBook(pairName.replace("/", "-"));
      const asks = normaliseOrderBookEntries(payload?.asks);
      const bids = normaliseOrderBookEntries(payload?.bids);

      if (asks.length > 0 && bids.length > 0) {
        setOrderBook({ asks, bids });
      } else {
        setOrderBook(fallbackOrderBook);
      }
    } catch (error) {
      console.error("Failed to fetch order book", error);
      setOrderBook(fallbackOrderBook);
    }
  }, []);

  const fetchRecentTrades = useCallback(async (pairName: string) => {
    try {
      const trades = await apiService.getRecentTrades(pairName.replace("/", "-"));
      const normalised = normaliseTrades(trades);
      setRecentTradesData(normalised.length > 0 ? normalised : fallbackTrades);
    } catch (error) {
      console.error("Failed to fetch recent trades", error);
      setRecentTradesData(fallbackTrades);
    }
  }, []);

  useEffect(() => {
    loadPairs();
  }, [loadPairs]);

  useEffect(() => {
    if (!selectedPairName) {
      return;
    }

    fetchOrderBook(selectedPairName);
    fetchRecentTrades(selectedPairName);
  }, [fetchOrderBook, fetchRecentTrades, selectedPairName]);

  useEffect(() => {
    if (!isConnected || pairs.length === 0) {
      return;
    }

    const symbols = Array.from(new Set(pairs.map(pair => pair.baseAsset)));
    if (symbols.join("|") === subscribedSymbolsRef.current.join("|")) {
      return;
    }

    subscribe(symbols);
    subscribedSymbolsRef.current = symbols;
  }, [isConnected, pairs, subscribe]);

  useEffect(() => {
    if (!selectedPair && pairs.length > 0) {
      setSelectedPairName(pairs[0].name);
    }
  }, [pairs, selectedPair]);

  // Update prices from WebSocket
  useEffect(() => {
    if (Object.keys(prices).length === 0) {
      return;
    }

    setPairs(prevPairs =>
      prevPairs.map(pair => {
        const livePrice = prices[pair.baseAsset];
        if (!livePrice) {
          return pair;
        }

        const previousHigh = parseFloat(pair.high.replace(/[$,]/g, "")) || livePrice.price;
        const previousLow = parseFloat(pair.low.replace(/[$,]/g, "")) || livePrice.price;

        return {
          ...pair,
          price: formatPrice(livePrice.price),
          change: formatPercent(livePrice.change24h),
          positive: livePrice.change24h >= 0,
          volume: formatVolume(livePrice.volume24h),
          high: formatPrice(Math.max(previousHigh, livePrice.price)),
          low: formatPrice(Math.min(previousLow, livePrice.price)),
        };
      })
    );
  }, [formatPercent, formatPrice, formatVolume, prices]);

  const filteredPairs = useMemo(() => {
    return pairs.filter(pair =>
      filterPair === "All" ||
      (filterPair === "Favorites" && pair.favorite) ||
      pair.quoteAsset === filterPair
    );
  }, [filterPair, pairs]);

  const formattedOrderBook = useMemo(() => ({
    asks: formatOrderBookEntry(orderBook.asks),
    bids: formatOrderBookEntry(orderBook.bids),
  }), [formatOrderBookEntry, orderBook]);

  const calculateTotal = useCallback(() => {
    if (!selectedPair) {
      return "0.00";
    }

    const amountNum = parseFloat(amount) || 0;
    const priceNum = orderType === "market"
      ? parseFloat(selectedPair.price.replace(/[$,]/g, ""))
      : parseFloat(price) || 0;
    const total = amountNum * (Number.isFinite(priceNum) ? priceNum : 0);
    return total.toFixed(2);
  }, [amount, orderType, price, selectedPair]);

  const handlePercentageClick = useCallback((percent: number) => {
    if (!selectedPair) {
      return;
    }

    const balance = 10_000; // Placeholder balance until wallet integration exists
    const ratio = percent / 100;

    if (tradeType === "buy") {
      const priceValue = orderType === "market"
        ? parseFloat(selectedPair.price.replace(/[$,]/g, ""))
        : parseFloat(price || "0");
      if (priceValue > 0) {
        setAmount(((balance * ratio) / priceValue).toFixed(4));
      }
    } else {
      setAmount((balance * ratio).toFixed(4));
    }
  }, [orderType, price, selectedPair, tradeType]);

  const handleTrade = async () => {
    if (!selectedPair) {
      toast({
        variant: "destructive",
        title: "No market selected",
        description: "Pick a trading pair before placing an order.",
      });
      return;
    }

    if (!amount || (orderType !== "market" && !price)) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter amount and price",
      });
      return;
    }

    const parsedAmount = parseFloat(amount);
    const executionPrice = orderType === "market"
      ? parseFloat(selectedPair.price.replace(/[$,]/g, ""))
      : parseFloat(price);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Enter a positive amount to continue.",
      });
      return;
    }

    if (!Number.isFinite(executionPrice) || executionPrice <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid price",
        description: "Enter a valid price.",
      });
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        pair: selectedPair.name,
        side: tradeType,
        type: orderType,
        amount: parsedAmount,
        price: executionPrice,
      };

      await apiService.placeOrder(orderData);
      
      toast({
        title: "Order Placed Successfully",
        description: `${tradeType.toUpperCase()} ${amount} ${selectedPair.baseAsset} at ${orderType === "market" ? "Market Price" : "$" + price}`,
      });

      // Reset form
      setAmount("");
      setPrice("");
      
      // Refresh orders (in real app, would refetch from API)
      const timestamp = new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      if (orderType === "market") {
        // Add to trade history
        setMyTradeHistory(prev => [{
          pair: selectedPair.name,
          type: "Market",
          side: tradeType === "buy" ? "Buy" : "Sell",
          price: selectedPair.price,
          amount: `${amount} ${selectedPair.baseAsset}`,
          total: `$${calculateTotal()}`,
          fee: `$${(parseFloat(calculateTotal()) * 0.001).toFixed(2)}`,
          time: timestamp,
          status: "Completed"
        }, ...prev]);
      } else {
        // Add to open orders
        setMyOpenOrders(prev => [{
          pair: selectedPair.name,
          type: orderType === "limit" ? "Limit" : "Stop",
          side: tradeType === "buy" ? "Buy" : "Sell",
          price: `$${price}`,
          amount: `${amount} ${selectedPair.baseAsset}`,
          filled: "0%",
          total: `$${calculateTotal()}`,
          time: timestamp
        }, ...prev]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (index: number) => {
    const order = myOpenOrders[index];
    setMyOpenOrders(prev => prev.filter((_, i) => i !== index));

    if (order) {
      try {
        await apiService.cancelOrder(`${order.pair}-${index}`);
      } catch (error) {
        console.error("Failed to cancel order on server", error);
      }
    }

    toast({
      title: "Order Cancelled",
      description: "Your order has been cancelled successfully",
    });
  };

  const toggleFavorite = (pairName: string) => {
    setPairs(prev => prev.map(p => 
      p.name === pairName ? { ...p, favorite: !p.favorite } : p
    ));
  };

  if (!selectedPair) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Card className="p-8 text-center">
              <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">Loading trading pairs…</p>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-[1920px]">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Spot <span className="text-primary">Trading</span>
                </h1>
                <p className="text-muted-foreground">
                  Trade 10+ pairs with zero slippage and instant execution
                </p>
              </div>
              <div className="hidden md:flex gap-3">
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
                  <p className="text-lg font-bold text-primary">$724M</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">Active Pairs</p>
                  <p className="text-lg font-bold text-primary">{pairs.length}</p>
                </Card>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Markets Sidebar */}
            <Card className="lg:col-span-1 p-4 max-h-[800px] overflow-hidden flex flex-col">
              <div className="mb-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Markets
                </h3>
                <div className="flex gap-1 flex-wrap">
                  {["All", "Favorites", "USDT", "USDC"].map((filter) => (
                    <Button
                      key={filter}
                      variant={filterPair === filter ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setFilterPair(filter)}
                    >
                      {filter === "Favorites" && <Star className="w-3 h-3 mr-1" />}
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-1">
                {filteredPairs.map((pair) => (
                  <div
                    key={pair.name}
                    onClick={() => setSelectedPairName(pair.name)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedPair.name === pair.name
                        ? "bg-primary/10 border border-primary"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm">{pair.name}</span>
                        {pair.favorite && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <span className={`text-xs font-semibold ${pair.positive ? "text-green-500" : "text-red-500"}`}>
                        {pair.change}
                      </span>
                    </div>
                    <p className="text-sm font-bold mb-1">{pair.price}</p>
                    <p className="text-xs text-muted-foreground">Vol: {pair.volume}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chart + Order Book */}
            <Card className="lg:col-span-2 p-4">
              {/* Selected Pair Info */}
              <div className="mb-4 pb-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedPair.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">{selectedPair.price}</span>
                      <span className={`text-sm font-semibold ${selectedPair.positive ? "text-green-500" : "text-red-500"}`}>
                        {selectedPair.change}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toggleFavorite(selectedPair.name)}>
                    <Star className={`w-4 h-4 ${selectedPair.favorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">24h High</p>
                    <p className="font-semibold">{selectedPair.high}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">24h Low</p>
                    <p className="font-semibold">{selectedPair.low}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">24h Volume</p>
                    <p className="font-semibold">{selectedPair.volume}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Quote Asset</p>
                    <p className="font-semibold">{selectedPair.quoteAsset}</p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mb-4">
                <div className="aspect-video bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-16 h-16 text-primary mx-auto mb-2 opacity-50" />
                    <p className="text-muted-foreground font-semibold">TradingView Chart</p>
                    <p className="text-xs text-muted-foreground">Real-time price action for {selectedPair.name}</p>
                  </div>
                </div>
              </div>

              {/* Order Book / Trades */}
              <Tabs defaultValue="orderbook">
                <TabsList className="grid w-full grid-cols-2 mb-3">
                  <TabsTrigger value="orderbook">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Order Book
                  </TabsTrigger>
                  <TabsTrigger value="trades">
                    <Clock className="w-4 h-4 mr-2" />
                    Recent Trades
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="orderbook" className="mt-0">
                  <div className="text-xs font-semibold text-muted-foreground grid grid-cols-3 mb-2 px-2">
                    <span>Price ({selectedPair.quoteAsset})</span>
                    <span className="text-right">Amount ({selectedPair.baseAsset})</span>
                    <span className="text-right">Total</span>
                  </div>
                  <div className="space-y-0.5 mb-3">
                    {formattedOrderBook.asks.map((ask, index) => (
                      <div key={`ask-${index}`} className="grid grid-cols-3 text-xs py-1 px-2 hover:bg-red-500/10 rounded cursor-pointer">
                        <span className="text-red-500 font-semibold">{ask.price}</span>
                        <span className="text-right">{ask.amount}</span>
                        <span className="text-right text-muted-foreground">{ask.total}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center py-2 my-2 bg-muted/20 rounded font-bold text-lg">
                    {selectedPair.price}
                  </div>
                  <div className="space-y-0.5">
                    {formattedOrderBook.bids.map((bid, index) => (
                      <div key={`bid-${index}`} className="grid grid-cols-3 text-xs py-1 px-2 hover:bg-green-500/10 rounded cursor-pointer">
                        <span className="text-green-500 font-semibold">{bid.price}</span>
                        <span className="text-right">{bid.amount}</span>
                        <span className="text-right text-muted-foreground">{bid.total}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trades" className="mt-0">
                  <div className="text-xs font-semibold text-muted-foreground grid grid-cols-3 mb-2 px-2">
                    <span>Price ({selectedPair.quoteAsset})</span>
                    <span className="text-right">Amount ({selectedPair.baseAsset})</span>
                    <span className="text-right">Time</span>
                  </div>
                  <div className="space-y-0.5 max-h-[300px] overflow-y-auto">
                    {recentTradesData.map((trade, index) => (
                      <div key={`${trade.time}-${index}`} className="grid grid-cols-3 text-xs py-1.5 px-2 hover:bg-muted/10 rounded">
                        <span className={trade.type === "buy" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                          {formatPrice(trade.price)}
                        </span>
                        <span className="text-right">{trade.amount.toFixed(2)}</span>
                        <span className="text-right text-muted-foreground">{new Date(trade.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Trading Panel */}
            <Card className="lg:col-span-1 p-4">
              <h2 className="text-xl font-bold mb-4">Place Order</h2>
              <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as "buy" | "sell")} className="mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Buy
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                    Sell
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Order Type</Label>
                  <div className="flex gap-1 mt-1">
                    <Button
                      variant={orderType === "market" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOrderType("market")}
                      className="flex-1 text-xs"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Market
                    </Button>
                    <Button
                      variant={orderType === "limit" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOrderType("limit")}
                      className="flex-1 text-xs"
                    >
                      Limit
                    </Button>
                    <Button
                      variant={orderType === "stop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOrderType("stop")}
                      className="flex-1 text-xs"
                    >
                      Stop
                    </Button>
                  </div>
                </div>

                {orderType !== "market" && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Price ({selectedPair.quoteAsset})</Label>
                    <Input
                      type="number"
                      placeholder={selectedPair.price.replace(/[$,]/g, '')}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-xs text-muted-foreground">Amount ({selectedPair.baseAsset})</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex gap-1 mt-2">
                    {[25, 50, 75, 100].map((percent) => (
                      <Button
                        key={percent}
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handlePercentageClick(percent)}
                      >
                        {percent}%
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/10 p-3 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available:</span>
                    <span className="font-semibold">10,000 {tradeType === "buy" ? selectedPair.quoteAsset : selectedPair.baseAsset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-semibold">{calculateTotal()} {selectedPair.quoteAsset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee (0.1%):</span>
                    <span className="font-semibold">{(parseFloat(calculateTotal()) * 0.001).toFixed(2)} {selectedPair.quoteAsset}</span>
                  </div>
                </div>

                <Button
                  className={`w-full ${
                    tradeType === "buy"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  size="lg"
                  onClick={handleTrade}
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {tradeType === "buy" ? "Buy" : "Sell"} {selectedPair.baseAsset}
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    {orderType === "market" ? "Market orders execute instantly at best price" : "Limit orders execute when price reaches your target"}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Open Orders & Trade History */}
          <Card className="mt-4 p-6">
            <Tabs defaultValue="openorders">
              <TabsList>
                <TabsTrigger value="openorders">Open Orders ({myOpenOrders.length})</TabsTrigger>
                <TabsTrigger value="history">Trade History ({myTradeHistory.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="openorders" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/20">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold">Pair</th>
                        <th className="text-left p-3 text-sm font-semibold">Type</th>
                        <th className="text-left p-3 text-sm font-semibold">Side</th>
                        <th className="text-right p-3 text-sm font-semibold">Price</th>
                        <th className="text-right p-3 text-sm font-semibold">Amount</th>
                        <th className="text-right p-3 text-sm font-semibold">Filled</th>
                        <th className="text-right p-3 text-sm font-semibold">Total</th>
                        <th className="text-left p-3 text-sm font-semibold">Time</th>
                        <th className="text-center p-3 text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myOpenOrders.map((order, index) => (
                        <tr key={index} className="border-t border-border hover:bg-muted/10">
                          <td className="p-3 font-semibold">{order.pair}</td>
                          <td className="p-3">
                            <Badge variant="outline" className="rounded-full">
                              {order.type}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={`${order.side === "Buy" ? "bg-green-600" : "bg-red-600"} rounded-full`}>
                              {order.side}
                            </Badge>
                          </td>
                          <td className="p-3 text-right font-semibold">{order.price}</td>
                          <td className="p-3 text-right">{order.amount}</td>
                          <td className="p-3 text-right">
                            <span className={order.filled === "0%" ? "text-muted-foreground" : "text-primary"}>
                              {order.filled}
                            </span>
                          </td>
                          <td className="p-3 text-right font-semibold">{order.total}</td>
                          <td className="p-3 text-sm text-muted-foreground">{order.time}</td>
                          <td className="p-3 text-center">
                            <Button variant="outline" size="sm" className="rounded-full" onClick={() => cancelOrder(index)}>
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/20">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold">Pair</th>
                        <th className="text-left p-3 text-sm font-semibold">Type</th>
                        <th className="text-left p-3 text-sm font-semibold">Side</th>
                        <th className="text-right p-3 text-sm font-semibold">Price</th>
                        <th className="text-right p-3 text-sm font-semibold">Amount</th>
                        <th className="text-right p-3 text-sm font-semibold">Total</th>
                        <th className="text-right p-3 text-sm font-semibold">Fee</th>
                        <th className="text-left p-3 text-sm font-semibold">Time</th>
                        <th className="text-center p-3 text-sm font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myTradeHistory.map((trade, index) => (
                        <tr key={index} className="border-t border-border hover:bg-muted/10">
                          <td className="p-3 font-semibold">{trade.pair}</td>
                          <td className="p-3">
                            <Badge variant="outline" className="rounded-full">
                              {trade.type}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={`${trade.side === "Buy" ? "bg-green-600" : "bg-red-600"} rounded-full`}>
                              {trade.side}
                            </Badge>
                          </td>
                          <td className="p-3 text-right font-semibold">{trade.price}</td>
                          <td className="p-3 text-right">{trade.amount}</td>
                          <td className="p-3 text-right font-semibold">{trade.total}</td>
                          <td className="p-3 text-right text-muted-foreground">{trade.fee}</td>
                          <td className="p-3 text-sm text-muted-foreground">{trade.time}</td>
                          <td className="p-3 text-center">
                            <Badge variant="secondary" className="rounded-full bg-green-600/20 text-green-600">
                              {trade.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Trading;
