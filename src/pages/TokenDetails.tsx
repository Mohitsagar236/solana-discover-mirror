import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, Star, Share2, BarChart3, Activity, DollarSign, TrendingUpIcon, Users } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useToast } from "@/hooks/use-toast";
import { getTokenBySymbol } from "@/data/tokenData";
import { apiService } from "@/services/api";

const TokenDetails = () => {
  const { symbol } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { prices, isConnected } = useWebSocket();
  
  // Try to get token from location state first, then fallback to tokenData
  const initialToken = location.state?.token || (symbol ? getTokenBySymbol(symbol) : null);
  const [token, setToken] = useState<any>(initialToken);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [timeframe, setTimeframe] = useState("24h");
  const [loading, setLoading] = useState(!initialToken);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = useCallback((value: number) => {
    if (!Number.isFinite(value)) return "$0.00";
    if (value < 0.01) return `$${value.toFixed(6)}`;
    if (value < 1) return `$${value.toFixed(4)}`;
    if (value < 100) return `$${value.toFixed(2)}`;
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }, []);

  const formatPercent = useCallback((value: number) => {
    if (!Number.isFinite(value)) return "+0.00%";
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  }, []);

  const formatLargeNumber = useCallback((value: number) => {
    if (!Number.isFinite(value)) return "$0";
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value.toFixed(2)}`;
  }, []);

  const loadTokenDetails = useCallback(async () => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    try {
      const details: any = await apiService.getTokenDetails(symbol);
      const mapped = {
        symbol: details.symbol ?? symbol.toUpperCase(),
        name: details.name ?? symbol.toUpperCase(),
        price: formatPrice(details.price),
        change: formatPercent(details.change24h),
        positive: (details.change24h ?? 0) >= 0,
        volume: formatLargeNumber(details.volume24h),
        mcap: formatLargeNumber(details.marketCap),
        trending: Math.abs(details.change24h ?? 0) >= 5,
        high24hStr: formatPrice(details.high24h),
        low24hStr: formatPrice(details.low24h),
        circulatingSupply: details.circulatingSupply,
        totalSupply: details.totalSupply,
        description: details.description,
        category: initialToken?.category ?? "DeFi",
      };
      setToken((prev: any) => ({ ...prev, ...mapped }));
    } catch (err) {
      console.error("Failed to load token details", err);
      setError("Unable to load live token details. Showing cached data if available.");
    } finally {
      setLoading(false);
    }
  }, [formatLargeNumber, formatPercent, formatPrice, initialToken?.category, symbol]);

  // Mock chart data - in production, fetch from API
  const chartData = {
    "24h": [142.35, 143.20, 142.80, 144.50, 143.90, 145.20, 144.80, 143.50, 142.90, 143.40, 144.10, 143.70],
    "7d": [138.50, 140.20, 139.80, 141.50, 140.90, 142.30, 143.10, 142.80, 143.50, 144.20, 143.90, 142.35],
    "30d": [125.40, 128.30, 130.20, 132.50, 135.80, 138.20, 140.50, 139.80, 141.20, 143.50, 142.90, 142.35],
    "1y": [45.20, 62.30, 78.50, 95.20, 112.40, 125.60, 138.80, 142.30, 145.20, 143.90, 141.50, 142.35],
  };

  const stats = [
    { label: "Market Cap", value: token?.mcap || "$65B", icon: DollarSign },
    { label: "24h Volume", value: token?.volume || "$1.2B", icon: Activity },
    { label: "Circulating Supply", value: "458.5M", icon: BarChart3 },
    { label: "All Time High", value: "$259.96", icon: TrendingUpIcon },
  ];

  const marketInfo = [
    { label: "24h High", value: token?.high24hStr || "$145.20" },
    { label: "24h Low", value: token?.low24hStr || "$138.50" },
    { label: "7d High", value: "$148.30" },
    { label: "7d Low", value: "$135.40" },
    { label: "30d High", value: "$152.80" },
    { label: "30d Low", value: "$125.40" },
  ];

  const tokenInfo = [
    { label: "Contract Address", value: "So11111...1111" },
    { label: "Decimals", value: "9" },
    { label: "Official Site", value: "solana.com", link: "https://solana.com" },
    { label: "Explorers", value: "Solscan, Solana FM", link: "https://solscan.io" },
  ];

  useEffect(() => {
    // Update price from WebSocket
    if (token && prices[token.symbol]) {
      const livePrice = prices[token.symbol];
      setToken((prev: any) => ({
        ...prev,
        price: `$${livePrice.price.toFixed(2)}`,
        change: `${livePrice.change24h > 0 ? '+' : ''}${livePrice.change24h.toFixed(2)}%`,
        positive: livePrice.change24h > 0,
      }));
    }
  }, [prices, token]);

  useEffect(() => {
    // Always try to enrich details when a symbol is present
    if (symbol) {
      loadTokenDetails();
    }
  }, [symbol, loadTokenDetails]);

  useEffect(() => {
    // Check if token is in watchlist
    const saved = localStorage.getItem('watchlist');
    if (saved && token) {
      const watchlist = JSON.parse(saved);
      setIsWatchlisted(watchlist.includes(token.symbol));
    }
  }, [token]);

  const toggleWatchlist = () => {
    const saved = localStorage.getItem('watchlist');
    const watchlist = saved ? JSON.parse(saved) : [];
    
    if (isWatchlisted) {
      const newWatchlist = watchlist.filter((s: string) => s !== token.symbol);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      setIsWatchlisted(false);
      toast({
        title: "Removed from Watchlist",
        description: `${token.symbol} removed from your watchlist`,
      });
    } else {
      watchlist.push(token.symbol);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsWatchlisted(true);
      toast({
        title: "Added to Watchlist",
        description: `${token.symbol} added to your watchlist`,
      });
    }
  };

  const handleTrade = () => {
    navigate('/trading', { state: { selectedToken: token } });
    toast({
      title: "Opening Trading",
      description: `Loading ${token.symbol} trading pair`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Token details link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header skeleton */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-8 w-32" />
                </Card>
              ))}
            </div>

            {/* Chart skeleton */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-12" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-80 w-full" />
            </Card>

            {/* Info skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-40 mb-4" />
                  {Array.from({ length: 5 }).map((__, j) => (
                    <div key={j} className="py-3 border-b border-border last:border-0">
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Token Not Found</h1>
            <Button onClick={() => navigate('/discover')}>Back to Discover</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentData = chartData[timeframe as keyof typeof chartData];
  const maxPrice = Math.max(...currentData);
  const minPrice = Math.min(...currentData);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/discover')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Button>

          {/* Token Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{token.symbol.substring(0, 2)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{token.name}</h1>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {token.symbol}
                    </Badge>
                    {token.trending && (
                      <Badge className="bg-orange-500 text-white">
                        🔥 Trending
                      </Badge>
                    )}
                    <Badge variant="secondary">{isConnected ? "🟢 Live" : "🔴 Offline"}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold">{token.price}</p>
                    <div className={`flex items-center gap-1 text-xl ${token.positive ? "text-green-500" : "text-red-500"}`}>
                      {token.positive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      <span className="font-semibold">{token.change}</span>
                    </div>
                    {error && (
                      <ErrorState title="Live data unavailable" description={error} />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={isWatchlisted ? "default" : "outline"}
                  onClick={toggleWatchlist}
                  className="gap-2"
                >
                  <Star className={`w-4 h-4 ${isWatchlisted ? "fill-current" : ""}`} />
                  {isWatchlisted ? "Watchlisted" : "Add to Watchlist"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 gap-2"
                  onClick={handleTrade}
                >
                  Trade {token.symbol}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <Card className="p-6 mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Price Chart</h2>
              <div className="flex gap-2">
                {["24h", "7d", "30d", "1y"].map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Simple Line Chart */}
            <div className="h-80 relative">
              <svg className="w-full h-full" viewBox="0 0 800 300">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 75}
                    x2="800"
                    y2={i * 75}
                    stroke="currentColor"
                    strokeOpacity="0.1"
                  />
                ))}
                
                {/* Price line */}
                <polyline
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  points={currentData.map((price, i) => {
                    const x = (i / (currentData.length - 1)) * 800;
                    const y = 300 - ((price - minPrice) / (maxPrice - minPrice)) * 280;
                    return `${x},${y}`;
                  }).join(' ')}
                />
                
                {/* Fill area */}
                <polygon
                  fill="hsl(var(--primary))"
                  fillOpacity="0.1"
                  points={[
                    ...currentData.map((price, i) => {
                      const x = (i / (currentData.length - 1)) * 800;
                      const y = 300 - ((price - minPrice) / (maxPrice - minPrice)) * 280;
                      return `${x},${y}`;
                    }),
                    '800,300',
                    '0,300'
                  ].join(' ')}
                />
                
                {/* Data points */}
                {currentData.map((price, i) => {
                  const x = (i / (currentData.length - 1)) * 800;
                  const y = 300 - ((price - minPrice) / (maxPrice - minPrice)) * 280;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="hsl(var(--primary))"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                  );
                })}
              </svg>
              
              {/* Price labels */}
              <div className="absolute top-0 left-0 text-xs text-muted-foreground">
                ${maxPrice.toFixed(2)}
              </div>
              <div className="absolute bottom-0 left-0 text-xs text-muted-foreground">
                ${minPrice.toFixed(2)}
              </div>
            </div>
          </Card>

          {/* Detailed Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Market Information */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Market Information
              </h3>
              <div className="space-y-3">
                {marketInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{info.label}</span>
                    <span className="font-semibold">{info.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Token Information */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Token Information
              </h3>
              <div className="space-y-3">
                {tokenInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{info.label}</span>
                    {info.link ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {info.value}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="font-semibold font-mono text-sm">{info.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* About Section */}
          <Card className="p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">About {token.name}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {token.description
                ? token.description
                : `${token.name} (${token.symbol}) is a cryptocurrency token on the Solana blockchain. It is part of the ${token.category || "DeFi"} category and offers unique features and utilities within the Solana ecosystem.`}
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TokenDetails;
