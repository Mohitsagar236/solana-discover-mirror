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
import { Lock, TrendingUp, Clock, Gift, Zap, Shield, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";

const stakingPools = [
  { token: "AXIOM", apr: "45%", lockPeriod: "Flexible", minStake: "100 AXIOM", totalStaked: "$45M", stakers: "8,500", rewards: "AXIOM", bonus: "2x Voting Power" },
  { token: "AXIOM", apr: "65%", lockPeriod: "30 Days", minStake: "100 AXIOM", totalStaked: "$28M", stakers: "4,200", rewards: "AXIOM", bonus: "5x Voting Power" },
  { token: "AXIOM", apr: "85%", lockPeriod: "90 Days", minStake: "100 AXIOM", totalStaked: "$18M", stakers: "2,100", rewards: "AXIOM + NFT", bonus: "10x Voting Power" },
  { token: "AXIOM", apr: "120%", lockPeriod: "180 Days", minStake: "500 AXIOM", totalStaked: "$12M", stakers: "890", rewards: "AXIOM + NFT", bonus: "20x Voting Power" },
  { token: "SOL", apr: "8.5%", lockPeriod: "Flexible", minStake: "1 SOL", totalStaked: "$35M", stakers: "12,400", rewards: "SOL", bonus: "Liquid Staking" },
  { token: "ETH", apr: "5.2%", lockPeriod: "Flexible", minStake: "0.1 ETH", totalStaked: "$28M", stakers: "9,200", rewards: "ETH", bonus: "Auto-Compound" },
];

const userStakes = [
  { pool: "AXIOM - 30 Days", amount: "5,000 AXIOM", value: "$2,500", apr: "65%", earned: "285 AXIOM", daysLeft: 12, unlockDate: "Nov 23, 2025" },
  { pool: "SOL - Flexible", amount: "50 SOL", value: "$7,100", apr: "8.5%", earned: "1.2 SOL", daysLeft: 0, unlockDate: "Unlocked" },
  { pool: "AXIOM - 90 Days", amount: "10,000 AXIOM", value: "$5,000", apr: "85%", earned: "892 AXIOM", daysLeft: 45, unlockDate: "Dec 26, 2025" },
];

const stats = [
  { label: "Total Value Staked", value: "$166M", icon: Lock },
  { label: "Total Stakers", value: "37.3K", icon: TrendingUp },
  { label: "Rewards Distributed", value: "$12.5M", icon: Gift },
  { label: "Avg APR", value: "56.2%", icon: Zap },
];

const recentRewards = [
  { date: "Nov 11", amount: "45 AXIOM", value: "$22.50", pool: "AXIOM - 30 Days" },
  { date: "Nov 10", amount: "0.15 SOL", value: "$21.35", pool: "SOL - Flexible" },
  { date: "Nov 10", amount: "62 AXIOM", value: "$31.00", pool: "AXIOM - 90 Days" },
  { date: "Nov 9", amount: "45 AXIOM", value: "$22.50", pool: "AXIOM - 30 Days" },
  { date: "Nov 9", amount: "0.15 SOL", value: "$21.35", pool: "SOL - Flexible" },
];

const Staking = () => {
  const { toast } = useToast();
  const [selectedPool, setSelectedPool] = useState<typeof stakingPools[0] | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [myStakes, setMyStakes] = useState(userStakes);
  const [pools, setPools] = useState(stakingPools);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalRewards, setTotalRewards] = useState(0);

  const calculateRewards = () => {
    if (!selectedPool || !stakeAmount) return "0";
    const amount = parseFloat(stakeAmount);
    const apr = parseFloat(selectedPool.apr) / 100;
    const lockDays = selectedPool.lockPeriod === "Flexible" ? 365 : parseInt(selectedPool.lockPeriod);
    const rewards = (amount * apr * lockDays) / 365;
    return rewards.toFixed(2);
  };

  const handleStake = () => {
    if (!selectedPool || !stakeAmount) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a pool and enter stake amount",
      });
      return;
    }

    const amount = parseFloat(stakeAmount);
    const minStake = parseFloat(selectedPool.minStake.split(" ")[0]);
    
    if (isNaN(amount) || amount < minStake) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: `Minimum stake is ${selectedPool.minStake}`,
      });
      return;
    }

    toast({
      title: "Staking Successful",
      description: `Staked ${amount} ${selectedPool.token} for ${selectedPool.lockPeriod}`,
    });

    // Calculate unlock date
    const lockDays = selectedPool.lockPeriod === "Flexible" ? 0 : parseInt(selectedPool.lockPeriod);
    const unlockDate = lockDays === 0 ? "Unlocked" : new Date(Date.now() + lockDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setMyStakes(prev => [{
      pool: `${selectedPool.token} - ${selectedPool.lockPeriod}`,
      amount: `${amount} ${selectedPool.token}`,
      value: `$${(amount * 0.5).toFixed(2)}`,
      apr: selectedPool.apr,
      earned: "0",
      daysLeft: lockDays,
      unlockDate
    }, ...prev]);

    setStakeAmount("");
    setSelectedPool(null);
  };

  const handleUnstake = (index: number) => {
    const stake = myStakes[index];
    if (stake.daysLeft > 0) {
      toast({
        variant: "destructive",
        title: "Cannot Unstake",
        description: `This stake is locked for ${stake.daysLeft} more days`,
      });
      return;
    }

    toast({
      title: "Unstaked Successfully",
      description: `Unstaked ${stake.amount} and claimed ${stake.earned} rewards`,
    });

    setMyStakes(prev => prev.filter((_, i) => i !== index));
  };

  const claimRewards = (index: number) => {
    const stake = myStakes[index];
    const earned = parseFloat(stake.earned.split(" ")[0]);
    
    if (earned === 0) {
      toast({
        variant: "destructive",
        title: "No Rewards",
        description: "You have no rewards to claim yet",
      });
      return;
    }

    toast({
      title: "Rewards Claimed",
      description: `Claimed ${stake.earned} from ${stake.pool}`,
    });

    setTotalRewards(prev => prev + earned);
    setMyStakes(prev => prev.map((s, i) => i === index ? { ...s, earned: "0" } : s));
  };

  // Load staking pools and user stakes from API (best effort)
  useEffect(() => {
    const run = async () => {
  setLoading(true);
  setError(null);
      try {
        const apiPools = await apiService.getStakingPools();
        if (Array.isArray(apiPools)) {
          const mapped = apiPools.map((p: any) => ({
            token: p.token,
            apr: `${p.apr.toFixed(0)}%`,
            lockPeriod: String(p.lockPeriod),
            minStake: `${p.minStake} ${p.token}`,
            totalStaked: p.totalStaked >= 1_000_000 ? `$${(p.totalStaked / 1_000_000).toFixed(0)}M` : `$${p.totalStaked.toLocaleString()}`,
            stakers: p.stakers.toLocaleString(),
            rewards: pools.find(x => x.token === p.token)?.rewards || p.token,
            bonus: pools.find(x => x.token === p.token)?.bonus || 'Voting Power',
          }));
          setPools(mapped as any);
        }

        const stakes = await apiService.getUserStakes('guest');
        if (Array.isArray(stakes) && stakes.length) {
          const mappedStakes = stakes.map((s: any) => ({
            pool: s.pool,
            amount: `${s.amount} ${s.pool.split(' ')[0]}`,
            value: `$${(s.amount * 0.5).toFixed(2)}`,
            apr: `${s.apr.toFixed(0)}%`,
            earned: `${s.earned} ${s.pool.split(' ')[0]}`,
            daysLeft: s.daysLeft,
            unlockDate: s.daysLeft > 0 ? new Date(Date.now() + s.daysLeft * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unlocked'
          }));
          setMyStakes(mappedStakes as any);
        }
      } catch (e) {
        console.warn('Staking API not available, using defaults');
        setError('Live staking data unavailable; showing defaults.');
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
              <span className="text-primary">Staking</span> Rewards
            </h1>
            <p className="text-lg text-muted-foreground">
              Stake tokens to earn rewards and governance rights
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-5 w-10 mb-4" />
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </Card>
                ))
              : stats.map((stat, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
          </div>
          {error && <ErrorState description={error} className="mb-8" />}

          <Tabs defaultValue="pools" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pools" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Staking Pools ({stakingPools.length})
              </TabsTrigger>
              <TabsTrigger value="mystakes" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                My Stakes ({userStakes.length})
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Rewards History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pools">
              <div className="grid grid-cols-1 gap-4 mb-6">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Card key={i} className="p-6">
                        <div className="flex items-center gap-4">
                          <Skeleton className="w-14 h-14 rounded-full" />
                          <div className="flex-1">
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                        <div className="flex items-center gap-6 mt-4">
                          <Skeleton className="h-8 w-24" />
                          <Skeleton className="h-9 w-28" />
                        </div>
                      </Card>
                    ))
                  : stakingPools.map((pool, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <Lock className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{pool.token} Staking</h3>
                            <Badge variant="secondary" className="rounded-full">
                              {pool.lockPeriod}
                            </Badge>
                            {pool.apr === "120%" && (
                              <Badge className="rounded-full bg-gradient-to-r from-primary to-accent">
                                Best APR
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {pool.stakers} stakers
                            </span>
                            <span>•</span>
                            <span>TVL: {pool.totalStaked}</span>
                            <span>•</span>
                            <span>Min: {pool.minStake}</span>
                          </div>
                          <div className="mt-1 text-sm">
                            <span className="text-muted-foreground">Rewards: </span>
                            <span className="font-semibold">{pool.rewards}</span>
                            <span className="text-muted-foreground"> • </span>
                            <span className="text-primary font-semibold">{pool.bonus}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="text-left">
                          <p className="text-sm text-muted-foreground mb-1">APR</p>
                          <p className="text-3xl font-bold text-green-500">{pool.apr}</p>
                        </div>
                        <Button 
                          className="bg-primary hover:bg-primary/90 rounded-full"
                          onClick={() => setSelectedPool(pool)}
                        >
                          Stake Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {selectedPool && (
                <Card className="p-6 border-primary">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Stake {selectedPool.token}</h3>
                    <Button variant="outline" size="sm" onClick={() => setSelectedPool(null)}>
                      Close
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Amount to Stake</Label>
                        <Input 
                          type="number" 
                          placeholder="0.00"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="text-lg"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Minimum: {selectedPool.minStake}
                        </p>
                      </div>

                      <div className="bg-muted/20 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">APR:</span>
                          <span className="font-semibold text-green-500">{selectedPool.apr}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lock Period:</span>
                          <span className="font-semibold">{selectedPool.lockPeriod}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Daily Rewards:</span>
                          <span className="font-semibold">
                            {stakeAmount ? (parseFloat(stakeAmount) * parseFloat(selectedPool.apr) / 100 / 365).toFixed(4) : '0.00'} {selectedPool.token}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Rewards:</span>
                          <span className="font-semibold">
                            {stakeAmount ? (parseFloat(stakeAmount) * parseFloat(selectedPool.apr) / 100 / 12).toFixed(2) : '0.00'} {selectedPool.token}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Voting Power:</span>
                          <span className="font-semibold text-primary">{selectedPool.bonus}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                        Confirm Stake
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Staking Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lock Period:</span>
                            <span className="font-semibold">{selectedPool.lockPeriod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Staked:</span>
                            <span className="font-semibold">{selectedPool.totalStaked}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Stakers:</span>
                            <span className="font-semibold">{selectedPool.stakers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reward Token:</span>
                            <span className="font-semibold">{selectedPool.rewards}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Early Unstake:</span>
                            <span className="font-semibold text-orange-500">10% Fee</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg text-sm">
                        <p className="text-muted-foreground">
                          <strong>Note:</strong> {selectedPool.lockPeriod === "Flexible" 
                            ? "Flexible staking allows you to unstake anytime without fees." 
                            : `Locked staking requires ${selectedPool.lockPeriod} commitment. Early unstaking incurs a 10% penalty fee.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="mystakes">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Active Stakes</h3>
                <div className="space-y-4">
                  {userStakes.map((stake, index) => (
                    <div key={index} className="p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{stake.pool}</h4>
                          <p className="text-sm text-muted-foreground">Staked: {stake.amount} ({stake.value})</p>
                          {stake.daysLeft > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-orange-500 font-semibold">
                                {stake.daysLeft} days until unlock
                              </span>
                            </div>
                          )}
                          {stake.daysLeft === 0 && (
                            <Badge className="mt-2 rounded-full bg-green-600">
                              Ready to Unstake
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-left">
                            <p className="text-xs text-muted-foreground mb-1">APR</p>
                            <p className="text-lg font-bold text-green-500">{stake.apr}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-muted-foreground mb-1">Earned</p>
                            <p className="text-lg font-bold text-primary">{stake.earned}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-full">
                              Claim
                            </Button>
                            <Button 
                              variant={stake.daysLeft === 0 ? "default" : "outline"} 
                              size="sm" 
                              className="rounded-full"
                              disabled={stake.daysLeft > 0}
                            >
                              Unstake
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Unlock Date:</span>
                          <span className="ml-2 font-semibold">{stake.unlockDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current Value:</span>
                          <span className="ml-2 font-semibold">{stake.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Staked</p>
                      <p className="text-2xl font-bold">$14,600</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                      <p className="text-2xl font-bold text-green-500">$589.50</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg APR</p>
                      <p className="text-2xl font-bold text-primary">52.8%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Voting Power</p>
                      <p className="text-2xl font-bold">125,000</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="rewards">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Recent Rewards</h3>
                <div className="space-y-3">
                  {recentRewards.map((reward, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-semibold">{reward.amount}</p>
                        <p className="text-sm text-muted-foreground">{reward.pool}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-500">{reward.value}</p>
                        <p className="text-xs text-muted-foreground">{reward.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="rounded-full">
                    Load More
                  </Button>
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

export default Staking;
