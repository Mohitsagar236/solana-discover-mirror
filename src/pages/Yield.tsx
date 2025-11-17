import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Coins, Lock, TrendingUp, Calculator, History, Zap, Shield, Percent } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";

const yieldPools = [
  { token: "USDC", apy: "12.5%", tvl: "$125M", risk: "Low", category: "Stablecoin", rewards: "USDC", auto: true, minDeposit: "$10" },
  { token: "USDT", apy: "11.3%", tvl: "$110M", risk: "Low", category: "Stablecoin", rewards: "USDT", auto: true, minDeposit: "$10" },
  { token: "DAI", apy: "10.8%", tvl: "$92M", risk: "Low", category: "Stablecoin", rewards: "DAI", auto: true, minDeposit: "$10" },
  { token: "SOL", apy: "15.2%", tvl: "$85M", risk: "Medium", category: "Native", rewards: "SOL + MRGN", auto: true, minDeposit: "0.1 SOL" },
  { token: "mSOL", apy: "16.8%", tvl: "$68M", risk: "Medium", category: "Liquid Staking", rewards: "SOL", auto: true, minDeposit: "0.1 mSOL" },
  { token: "stSOL", apy: "17.2%", tvl: "$55M", risk: "Medium", category: "Liquid Staking", rewards: "SOL", auto: true, minDeposit: "0.1 stSOL" },
  { token: "ETH", apy: "10.8%", tvl: "$95M", risk: "Low", category: "Crypto", rewards: "ETH", auto: true, minDeposit: "0.01 ETH" },
  { token: "BTC", apy: "9.5%", tvl: "$78M", risk: "Low", category: "Crypto", rewards: "BTC", auto: false, minDeposit: "0.001 BTC" },
  { token: "JUP", apy: "22.5%", tvl: "$42M", risk: "High", category: "DeFi", rewards: "JUP", auto: true, minDeposit: "10 JUP" },
  { token: "JTO", apy: "28.3%", tvl: "$35M", risk: "High", category: "DeFi", rewards: "JTO + SOL", auto: true, minDeposit: "5 JTO" },
  { token: "RAY", apy: "24.7%", tvl: "$28M", risk: "High", category: "DeFi", rewards: "RAY", auto: true, minDeposit: "10 RAY" },
  { token: "ORCA", apy: "21.2%", tvl: "$22M", risk: "High", category: "DeFi", rewards: "ORCA", auto: false, minDeposit: "5 ORCA" },
  { token: "MNDE", apy: "19.8%", tvl: "$18M", risk: "Medium", category: "DeFi", rewards: "MNDE + SOL", auto: true, minDeposit: "100 MNDE" },
  { token: "BONK", apy: "35.5%", tvl: "$15M", risk: "Very High", category: "Meme", rewards: "BONK", auto: false, minDeposit: "1M BONK" },
  { token: "PYTH", apy: "18.4%", tvl: "$32M", risk: "Medium", category: "Oracle", rewards: "PYTH", auto: true, minDeposit: "100 PYTH" },
  { token: "DRIFT", apy: "26.9%", tvl: "$12M", risk: "High", category: "DeFi", rewards: "DRIFT", auto: true, minDeposit: "50 DRIFT" },
];

const userDeposits = [
  { token: "USDC", amount: "$5,000", earned: "$156.25", apy: "12.5%", days: 45 },
  { token: "SOL", amount: "35 SOL", earned: "1.85 SOL", apy: "15.2%", days: 38 },
  { token: "JTO", amount: "125 JTO", earned: "8.42 JTO", apy: "28.3%", days: 22 },
];

const stats = [
  { label: "Total Value Locked", value: "$1.2B", icon: Lock },
  { label: "Total Earned", value: "$42M", icon: Coins },
  { label: "Active Users", value: "28.5K", icon: Sparkles },
  { label: "Avg APY", value: "18.2%", icon: Percent },
];

const categories = ["All", "Stablecoin", "Native", "DeFi", "Liquid Staking", "Crypto", "Meme", "Oracle"];

const Yield = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All");
  const [calculatorAmount, setCalculatorAmount] = useState("1000");
  const [calculatorDays, setCalculatorDays] = useState("365");
  const [selectedPool, setSelectedPool] = useState<typeof yieldPools[0] | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [myDeposits, setMyDeposits] = useState(userDeposits);
  const [pools, setPools] = useState(yieldPools);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredPools = pools.filter(pool => 
    activeCategory === "All" || pool.category === activeCategory
  );

  const calculateEarnings = () => {
    const amount = parseFloat(calculatorAmount) || 0;
    const days = parseFloat(calculatorDays) || 0;
    const apy = selectedPool ? parseFloat(selectedPool.apy) : 15.2;
    const earnings = (amount * (apy / 100) * days) / 365;
    return earnings.toFixed(2);
  };

  const handleDeposit = () => {
    if (!selectedPool || !depositAmount) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a pool and enter deposit amount",
      });
      return;
    }

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
      });
      return;
    }

    toast({
      title: "Deposit Successful",
      description: `Deposited ${amount} ${selectedPool.token} into yield pool`,
    });

    // Add to deposits
    setMyDeposits(prev => [{
      token: selectedPool.token,
      amount: `${amount} ${selectedPool.token}`,
      earned: "0",
      apy: selectedPool.apy,
      days: 0
    }, ...prev]);

    setDepositAmount("");
    setSelectedPool(null);
  };

  // Load pools and user deposits from API (best effort)
  useEffect(() => {
    const run = async () => {
  setLoading(true);
  setError(null);
      try {
        const apiPools = await apiService.getYieldPools();
        if (Array.isArray(apiPools)) {
          const mapped = apiPools.map((p: any) => ({
            token: p.token,
            apy: `${(p.apy).toFixed(1)}%`,
            tvl: p.tvl >= 1_000_000 ? `$${(p.tvl / 1_000_000).toFixed(0)}M` : `$${p.tvl.toFixed(0)}`,
            risk: p.apy >= 25 ? 'High' : p.apy >= 15 ? 'Medium' : 'Low',
            category: pools.find(x => x.token === p.token)?.category || 'DeFi',
            rewards: p.rewards || p.token,
            auto: !!p.autoCompound,
            minDeposit: pools.find(x => x.token === p.token)?.minDeposit || '$10',
          }));
          setPools(mapped);
        }

        // Placeholder address; in production, use connected wallet address
        const deposits = await apiService.getUserDeposits('guest');
        if (Array.isArray(deposits) && deposits.length) {
          const mappedDep = deposits.map((d: any) => ({
            token: d.pool,
            amount: `${d.amount} ${d.pool}`,
            earned: `${d.earned}`,
            apy: `${d.apy.toFixed(1)}%`,
            days: d.days,
          }));
          setMyDeposits(mappedDep as any);
        }
      } catch (e) {
        console.warn('Yield API not available, using defaults');
        setError('Live yield data unavailable; showing defaults.');
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="text-primary">Yield</span> Farming
                </h1>
                <p className="text-lg text-muted-foreground">
                  Earn passive income on 15+ tokens with auto-compounding
                </p>
                <Badge variant="secondary" className="mt-2 rounded-full">
                  Powered by MarginFi
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="p-4">
                      <Skeleton className="h-4 w-24 mb-3" />
                      <Skeleton className="h-8 w-28 mb-2" />
                      <Skeleton className="h-3 w-20" />
                    </Card>
                  ))
                : stats.map((stat, index) => (
                    <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <stat.icon className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold mb-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </Card>
                  ))}
            </div>
            {error && <ErrorState description={error} className="mb-6" />}
          </div>

          <Tabs defaultValue="pools" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pools" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                All Pools ({filteredPools.length})
              </TabsTrigger>
              <TabsTrigger value="mydeposits" className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                My Deposits ({userDeposits.length})
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                APY Calculator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pools">
              {/* Category Filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className="rounded-full whitespace-nowrap"
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <div>
                              <Skeleton className="h-6 w-24 mb-2" />
                              <Skeleton className="h-4 w-48" />
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <Skeleton className="h-7 w-16" />
                            <Skeleton className="h-7 w-16" />
                            <Skeleton className="h-9 w-24" />
                          </div>
                        </div>
                      </Card>
                    ))
                  : filteredPools.map((pool, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-primary">{pool.token.substring(0, 2)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold">{pool.token}</h3>
                            <Badge variant="secondary" className="rounded-full text-xs">
                              {pool.category}
                            </Badge>
                            {pool.auto && (
                              <Badge variant="outline" className="rounded-full text-xs gap-1">
                                <Zap className="w-3 h-3" />
                                Auto
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span>TVL: {pool.tvl}</span>
                            <span>•</span>
                            <span>Min: {pool.minDeposit}</span>
                            <span>•</span>
                            <span>Rewards: {pool.rewards}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="text-left">
                          <p className="text-sm text-muted-foreground mb-1">APY</p>
                          <p className="text-2xl font-bold text-green-500">{pool.apy}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-muted-foreground mb-1">Risk</p>
                          <Badge 
                            variant={pool.risk === 'Low' ? 'default' : pool.risk === 'Medium' ? 'secondary' : 'outline'}
                            className={`rounded-full ${
                              pool.risk === 'Very High' ? 'border-red-500 text-red-500' : 
                              pool.risk === 'High' ? 'border-orange-500 text-orange-500' : ''
                            }`}
                          >
                            {pool.risk}
                          </Badge>
                        </div>
                        <Button 
                          className="bg-primary hover:bg-primary/90 rounded-full"
                          onClick={() => setSelectedPool(pool)}
                        >
                          Deposit
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {selectedPool && (
                <Card className="mt-6 p-6 border-primary">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Deposit {selectedPool.token}</h3>
                    <Button variant="outline" size="sm" onClick={() => setSelectedPool(null)}>
                      Close
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Amount</Label>
                        <Input 
                          type="number" 
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="text-lg"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Minimum: {selectedPool.minDeposit}
                        </p>
                      </div>

                      <div className="bg-muted/20 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">APY:</span>
                          <span className="font-semibold text-green-500">{selectedPool.apy}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Daily Earnings:</span>
                          <span className="font-semibold">
                            {depositAmount ? (parseFloat(depositAmount) * parseFloat(selectedPool.apy) / 100 / 365).toFixed(4) : '0.00'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Earnings:</span>
                          <span className="font-semibold">
                            {depositAmount ? (parseFloat(depositAmount) * parseFloat(selectedPool.apy) / 100 / 12).toFixed(4) : '0.00'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Auto-Compound:</span>
                          <span className="font-semibold">{selectedPool.auto ? 'Yes' : 'No'}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                        Confirm Deposit
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Pool Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Value Locked:</span>
                            <span className="font-semibold">{selectedPool.tvl}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Risk Level:</span>
                            <Badge variant="outline" className="rounded-full">
                              {selectedPool.risk}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reward Token:</span>
                            <span className="font-semibold">{selectedPool.rewards}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Withdrawal:</span>
                            <span className="font-semibold text-green-600">Instant</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg text-sm">
                        <p className="text-muted-foreground">
                          <strong>Note:</strong> Yields are variable and may change based on market conditions. 
                          Your deposits are secured by MarginFi's battle-tested smart contracts.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="mydeposits">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Active Deposits
                </h3>
                <div className="space-y-4">
                  {userDeposits.map((deposit, index) => (
                    <div key={index} className="p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">{deposit.token.substring(0, 2)}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{deposit.token}</h4>
                              <p className="text-sm text-muted-foreground">Deposited: {deposit.amount}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-left">
                            <p className="text-xs text-muted-foreground mb-1">APY</p>
                            <p className="text-lg font-bold text-green-500">{deposit.apy}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-muted-foreground mb-1">Earned</p>
                            <p className="text-lg font-bold text-primary">{deposit.earned}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-muted-foreground mb-1">Duration</p>
                            <p className="text-lg font-semibold">{deposit.days} days</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-full">
                              Add
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full">
                              Withdraw
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-primary/10 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Deposited</p>
                      <p className="text-2xl font-bold">$8,250</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                      <p className="text-2xl font-bold text-green-500">$166.52</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg APY</p>
                      <p className="text-2xl font-bold text-primary">17.8%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Days</p>
                      <p className="text-2xl font-bold">35</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="calculator">
              <Card className="p-6 max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Yield Calculator
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      Deposit Amount (USD)
                    </Label>
                    <Input 
                      type="number" 
                      value={calculatorAmount}
                      onChange={(e) => setCalculatorAmount(e.target.value)}
                      className="text-lg"
                      placeholder="1000"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      Duration (Days)
                    </Label>
                    <Input 
                      type="number" 
                      value={calculatorDays}
                      onChange={(e) => setCalculatorDays(e.target.value)}
                      className="text-lg"
                      placeholder="365"
                    />
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => setCalculatorDays("30")}>30D</Button>
                      <Button variant="outline" size="sm" onClick={() => setCalculatorDays("90")}>90D</Button>
                      <Button variant="outline" size="sm" onClick={() => setCalculatorDays("180")}>180D</Button>
                      <Button variant="outline" size="sm" onClick={() => setCalculatorDays("365")}>1Y</Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Earnings</p>
                    <p className="text-5xl font-bold text-primary mb-2">${calculateEarnings()}</p>
                    <p className="text-sm text-muted-foreground">
                      Based on 15.2% average APY across all pools
                    </p>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-3">Breakdown</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Principal:</span>
                      <span className="font-semibold">${calculatorAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Interest Earned:</span>
                      <span className="font-semibold text-green-500">${calculateEarnings()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{calculatorDays} days</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-border">
                      <span className="font-semibold">Total Value:</span>
                      <span className="font-bold text-lg">
                        ${(parseFloat(calculatorAmount) + parseFloat(calculateEarnings())).toFixed(2)}
                      </span>
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

export default Yield;
