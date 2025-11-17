import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Copy, Gift, TrendingUp, DollarSign, Share2, Twitter, MessageCircle, Award, ArrowUpRight } from "lucide-react";

const referralStats = [
  { label: "Total Referrals", value: "24", icon: Users },
  { label: "Active Traders", value: "18", icon: TrendingUp },
  { label: "Points Earned", value: "12,450", icon: Gift },
  { label: "SOL Earned", value: "2.45", icon: DollarSign },
];

const referralActivity = [
  { name: "CryptoJoe", status: "Active", trades: 145, earned: "0.45 SOL", joinDate: "2 days ago" },
  { name: "DeFiSam", status: "Active", trades: 98, earned: "0.32 SOL", joinDate: "5 days ago" },
  { name: "BlockchainAmy", status: "Active", trades: 76, earned: "0.28 SOL", joinDate: "1 week ago" },
  { name: "TokenTom", status: "Inactive", trades: 12, earned: "0.08 SOL", joinDate: "2 weeks ago" },
  { name: "SolMike", status: "Active", trades: 234, earned: "0.89 SOL", joinDate: "3 weeks ago" },
  { name: "NFTLisa", status: "Active", trades: 56, earned: "0.18 SOL", joinDate: "1 month ago" },
];

const commissionTiers = [
  { tier: "Bronze", referrals: "1-5", commission: "10%", bonus: "100 pts", active: false },
  { tier: "Silver", referrals: "6-15", commission: "12%", bonus: "300 pts", active: false },
  { tier: "Gold", referrals: "16-30", commission: "15%", bonus: "600 pts", active: true },
  { tier: "Platinum", referrals: "31-50", commission: "18%", bonus: "1000 pts", active: false },
  { tier: "Diamond", referrals: "51+", commission: "20%", bonus: "2500 pts", active: false },
];

const Referrals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-primary">Refer</span> & Earn
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Invite friends and earn rewards together. Get 10% of your referrals' trading fees as SOL.
            </p>
          </div>

          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Referral Link</h2>
            <div className="flex gap-3 mb-6">
              <Input
                value="https://axiom.trade/ref/YOURCODE"
                readOnly
                className="bg-muted/20 border-border font-mono"
              />
              <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Share on:</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Discord
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {referralStats.map((stat, index) => (
              <Card key={index} className="bg-card border-border p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Share Your Link</h3>
                  <p className="text-muted-foreground">
                    Share your unique referral link with friends via social media, email, or messaging apps.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Friends Sign Up</h3>
                  <p className="text-muted-foreground">
                    When your friends sign up using your link, they get bonus points to start trading.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Earn Rewards</h3>
                  <p className="text-muted-foreground">
                    Earn 10% of their trading fees as SOL, plus bonus points for every active referral.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Commission Tiers</h2>
              </div>
              <div className="space-y-3">
                {commissionTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tier.active
                        ? 'bg-primary/10 border-primary'
                        : 'bg-muted/20 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold ${tier.active ? 'text-primary' : ''}`}>
                          {tier.tier}
                        </h3>
                        {tier.active && <Badge variant="default">Current</Badge>}
                      </div>
                      <span className="font-bold text-lg text-green-500">{tier.commission}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{tier.referrals} referrals</span>
                      <span className="text-primary font-semibold">{tier.bonus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Referral Activity</h2>
              </div>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {referralActivity.map((referral, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-bold text-primary">{referral.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{referral.name}</p>
                          <p className="text-xs text-muted-foreground">{referral.joinDate}</p>
                        </div>
                      </div>
                      <Badge variant={referral.status === "Active" ? "default" : "secondary"}>
                        {referral.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">{referral.trades} trades</span>
                      <span className="font-semibold text-green-500">{referral.earned}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Earnings Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                  <span className="text-muted-foreground">Trading Commissions</span>
                  <span className="text-xl font-bold text-green-500">1.85 SOL</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                  <span className="text-muted-foreground">Tier Bonuses</span>
                  <span className="text-xl font-bold text-green-500">0.35 SOL</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                  <span className="text-muted-foreground">Milestone Rewards</span>
                  <span className="text-xl font-bold text-green-500">0.25 SOL</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                    <p className="text-3xl font-bold text-green-500">2.45 SOL</p>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-green-500" />
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                  <span className="text-muted-foreground">Bonus Points</span>
                  <span className="text-xl font-bold text-primary">5,200 pts</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Claim All Rewards
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 p-8">
            <div className="text-center">
              <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Start Earning Today</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Share your link and start earning passive income from your referrals' trading activity
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Now
                </Button>
                <Button size="lg" variant="outline">
                  View Leaderboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Referrals;
