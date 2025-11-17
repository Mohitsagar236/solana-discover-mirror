import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vote, CheckCircle, Clock, TrendingUp, Users, FileText, Shield, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";

const defaultProposals = [
  {
    id: "AXM-12",
    title: "Increase Staking Rewards by 15%",
    description: "Proposal to increase base staking rewards from 45% to 60% APR to incentivize long-term holders",
    status: "Active",
    category: "Economics",
    author: "0x7a9f...3b2c",
    created: "Nov 8, 2025",
    endsIn: "2 days",
    votesFor: 2450000,
    votesAgainst: 450000,
    totalVotes: 2900000,
    quorum: 3000000,
    votingPower: 125000,
  },
  {
    id: "AXM-11",
    title: "Launch NFT Rewards Program",
    description: "Implement exclusive NFT rewards for users who stake over 10,000 AXIOM for 180+ days",
    status: "Active",
    category: "Product",
    author: "0x4e8d...7f1a",
    created: "Nov 6, 2025",
    endsIn: "4 days",
    votesFor: 1850000,
    votesAgainst: 320000,
    totalVotes: 2170000,
    quorum: 3000000,
    votingPower: 125000,
  },
  {
    id: "AXM-10",
    title: "Reduce Trading Fees to 0.15%",
    description: "Lower trading fees from 0.25% to 0.15% to increase competitiveness and trading volume",
    status: "Passed",
    category: "Economics",
    author: "0x9c3b...4d6e",
    created: "Nov 1, 2025",
    endsIn: "Ended",
    votesFor: 3450000,
    votesAgainst: 890000,
    totalVotes: 4340000,
    quorum: 3000000,
    votingPower: 0,
  },
  {
    id: "AXM-09",
    title: "Add Multi-Chain Support",
    description: "Enable cross-chain trading and yield farming on Ethereum and Arbitrum networks",
    status: "Passed",
    category: "Development",
    author: "0x1f5a...8c2b",
    created: "Oct 28, 2025",
    endsIn: "Ended",
    votesFor: 4120000,
    votesAgainst: 560000,
    totalVotes: 4680000,
    quorum: 3000000,
    votingPower: 0,
  },
  {
    id: "AXM-08",
    title: "Treasury Diversification Strategy",
    description: "Allocate 30% of treasury to stablecoins and 20% to blue-chip cryptocurrencies",
    status: "Failed",
    category: "Treasury",
    author: "0x6d2e...9a4f",
    created: "Oct 25, 2025",
    endsIn: "Ended",
    votesFor: 1250000,
    votesAgainst: 2890000,
    totalVotes: 4140000,
    quorum: 3000000,
    votingPower: 0,
  },
];

const stats = [
  { label: "Active Proposals", value: "2", icon: Vote },
  { label: "Total Voters", value: "8.5K", icon: Users },
  { label: "Voting Power", value: "125K", icon: TrendingUp },
  { label: "Proposals Passed", value: "18", icon: CheckCircle },
];

const daoMetrics = [
  { metric: "Total Proposals", value: "32", period: "All Time" },
  { metric: "Passed Proposals", value: "18", period: "56.3%" },
  { metric: "Failed Proposals", value: "8", period: "25.0%" },
  { metric: "Active Proposals", value: "2", period: "6.3%" },
  { metric: "Average Voter Turnout", value: "82.5%", period: "Last 10 Proposals" },
  { metric: "Total Voting Power", value: "12.5M", period: "AXIOM Tokens" },
];

const recentVotes = [
  { proposal: "AXM-12", vote: "For", power: "45,000", date: "Nov 11, 2025" },
  { proposal: "AXM-11", vote: "For", power: "45,000", date: "Nov 10, 2025" },
  { proposal: "AXM-10", vote: "For", power: "35,000", date: "Nov 5, 2025" },
];

const Governance = () => {
  const { toast } = useToast();
  const [myProposals, setMyProposals] = useState(defaultProposals);
  const [votedProposals, setVotedProposals] = useState<string[]>([]);
  const [userVotingPower] = useState(125000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCount = useMemo(() => myProposals.filter(p => p.status === 'Active').length, [myProposals]);

  const refreshProposals = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiProps = await apiService.getProposals();
      if (Array.isArray(apiProps)) {
        const mapped = apiProps.map((p: any) => {
          const totalVotes = (p.votesFor ?? 0) + (p.votesAgainst ?? 0);
          const endsIn = p.endsAt ? formatEndsIn(p.endsAt) : '—';
          return {
            id: p.id,
            title: p.title,
            description: p.description,
            status: p.status,
            category: p.category || 'General',
            author: 'unknown',
            created: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
            endsIn,
            votesFor: p.votesFor ?? 0,
            votesAgainst: p.votesAgainst ?? 0,
            totalVotes,
            quorum: 3_000_000,
            votingPower: userVotingPower,
          };
        });
        setMyProposals(mapped as any);
      }
    } catch (e) {
      setError('Unable to load proposals. Showing cached data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVote = (proposalId: string, voteFor: boolean) => {
    if (votedProposals.includes(proposalId)) {
      toast({
        variant: "destructive",
        title: "Already Voted",
        description: "You have already voted on this proposal",
      });
      return;
    }

    const proposal = myProposals.find(p => p.id === proposalId);
    if (!proposal || proposal.status !== "Active") {
      toast({
        variant: "destructive",
        title: "Voting Closed",
        description: "This proposal is no longer accepting votes",
      });
      return;
    }

    setMyProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          votesFor: voteFor ? p.votesFor + userVotingPower : p.votesFor,
          votesAgainst: !voteFor ? p.votesAgainst + userVotingPower : p.votesAgainst,
          totalVotes: p.totalVotes + userVotingPower,
        };
      }
      return p;
    }));

    setVotedProposals(prev => [...prev, proposalId]);

    toast({
      title: "Vote Cast Successfully",
      description: `You voted ${voteFor ? "FOR" : "AGAINST"} proposal ${proposalId}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-600";
      case "Passed": return "bg-blue-600";
      case "Failed": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Economics": return "border-green-500 text-green-500";
      case "Product": return "border-blue-500 text-blue-500";
      case "Development": return "border-purple-500 text-purple-500";
      case "Treasury": return "border-orange-500 text-orange-500";
      default: return "border-gray-500 text-gray-500";
    }
  };

  function formatEndsIn(endsAtIso: string) {
    const now = Date.now();
    const end = new Date(endsAtIso).getTime();
    const diffMs = Math.max(0, end - now);
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    const diffHours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    if (diffDays > 0) return `${diffDays} day${diffDays === 1 ? '' : 's'}`;
    if (diffHours > 0) return `${diffHours} hour${diffHours === 1 ? '' : 's'}`;
    return 'Less than 1 hour';
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Governance</span> Portal
            </h1>
            <p className="text-lg text-muted-foreground">
              Shape the future of Axiom through decentralized governance
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
                    <h3 className="text-3xl font-bold mb-1">{stat.label === 'Active Proposals' ? String(activeCount) : stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
          </div>

          <Tabs defaultValue="proposals" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="myvotes">My Votes</TabsTrigger>
              <TabsTrigger value="stats">DAO Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="proposals">
              {error && (
                <ErrorState description={error} onRetry={refreshProposals} className="mb-6" />
              )}
              <div className="space-y-6">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="p-6">
                        <div className="flex justify-between mb-4">
                          <Skeleton className="h-6 w-48" />
                          <div className="flex gap-2">
                            <Skeleton className="h-9 w-24" />
                            <Skeleton className="h-9 w-28" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-3 w-full" />
                      </Card>
                    ))
                  : myProposals.map((proposal, index) => {
                  const percentFor = (proposal.votesFor / proposal.totalVotes) * 100;
                  const percentAgainst = (proposal.votesAgainst / proposal.totalVotes) * 100;
                  const quorumReached = proposal.totalVotes >= proposal.quorum;

                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className={`${getStatusColor(proposal.status)} rounded-full`}>
                              {proposal.status}
                            </Badge>
                            <Badge variant="outline" className={`rounded-full ${getCategoryColor(proposal.category)}`}>
                              {proposal.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">#{proposal.id}</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-2">{proposal.title}</h3>
                          <p className="text-muted-foreground mb-4">{proposal.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {proposal.author}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Created {proposal.created}
                            </span>
                            {proposal.status === "Active" && (
                              <>
                                <span>•</span>
                                <span className="text-orange-500 font-semibold">
                                  Ends in {proposal.endsIn}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {proposal.status === "Active" && (
                          <div className="flex md:flex-col gap-2">
                            <Button className="bg-green-600 hover:bg-green-700 rounded-full flex-1 md:flex-none" onClick={() => handleVote(proposal.id, true)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Vote For
                            </Button>
                            <Button variant="outline" className="rounded-full flex-1 md:flex-none" onClick={() => handleVote(proposal.id, false)}>
                              Vote Against
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-green-500 font-semibold">
                              For: {proposal.votesFor.toLocaleString()} ({percentFor.toFixed(1)}%)
                            </span>
                            <span className="text-red-500 font-semibold">
                              Against: {proposal.votesAgainst.toLocaleString()} ({percentAgainst.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="relative h-3 bg-muted/20 rounded-full overflow-hidden">
                            <div 
                              className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
                              style={{ width: `${percentFor}%` }}
                            />
                            <div 
                              className="absolute right-0 top-0 h-full bg-red-500 rounded-full"
                              style={{ width: `${percentAgainst}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-border">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Quorum: </span>
                            <span className="font-semibold">
                              {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
                            </span>
                            {quorumReached && (
                              <Badge variant="secondary" className="ml-2 rounded-full">
                                Quorum Reached
                              </Badge>
                            )}
                          </div>
                          {proposal.votingPower > 0 && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Your Voting Power: </span>
                              <span className="font-semibold text-primary">
                                {proposal.votingPower.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Want to Submit a Proposal?</h3>
                <p className="text-muted-foreground mb-4">
                  You need at least 100,000 AXIOM tokens to submit a governance proposal
                </p>
                <Button className="bg-primary hover:bg-primary/90 rounded-full">
                  Create Proposal
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="myvotes">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Your Voting History</h3>
                <div className="space-y-4">
                  {recentVotes.map((vote, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-semibold mb-1">Proposal #{vote.proposal}</p>
                        <p className="text-sm text-muted-foreground">{vote.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={vote.vote === "For" ? "bg-green-600" : "bg-red-600"}>
                          {vote.vote}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Power: {vote.power}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Votes Cast</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Voting Power</p>
                      <p className="text-2xl font-bold text-primary">125,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Participation Rate</p>
                      <p className="text-2xl font-bold text-green-500">85%</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    DAO Metrics
                  </h3>
                  <div className="space-y-4">
                    {daoMetrics.map((metric, index) => (
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
                  <h3 className="text-xl font-semibold mb-6">Proposal Categories</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Economics</span>
                        <span className="text-muted-foreground">12 proposals</span>
                      </div>
                      <Progress value={37.5} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Product</span>
                        <span className="text-muted-foreground">8 proposals</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Development</span>
                        <span className="text-muted-foreground">7 proposals</span>
                      </div>
                      <Progress value={21.9} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Treasury</span>
                        <span className="text-muted-foreground">5 proposals</span>
                      </div>
                      <Progress value={15.6} className="h-2" />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Total Proposals</p>
                    <p className="text-4xl font-bold text-primary">32</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Governance;
