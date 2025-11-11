import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Users, Gift, TrendingUp, Award } from "lucide-react";

const ranks = [
  { name: "Bronze", points: "0-1,000", reward: "0.01%", color: "text-orange-600" },
  { name: "Silver", points: "1,000-5,000", reward: "0.02%", color: "text-gray-400" },
  { name: "Gold", points: "5,000-15,000", reward: "0.03%", color: "text-yellow-500" },
  { name: "Platinum", points: "15,000-50,000", reward: "0.05%", color: "text-cyan-400" },
  { name: "Diamond", points: "50,000+", reward: "0.10%", color: "text-purple-500" },
];

const RewardsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Get <span className="text-primary">Rewarded</span> for Trading
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Earn SOL and points with every trade. The more you trade, the more you earn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Trade to Earn</h3>
              <p className="text-muted-foreground">
                Earn SOL rewards with every trade you make on the platform
              </p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Collect Points</h3>
              <p className="text-muted-foreground">
                Accumulate points through trading, referrals, and completing quests
              </p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Refer Friends</h3>
              <p className="text-muted-foreground">
                Earn bonus points and SOL when your referrals start trading
              </p>
            </Card>
          </div>

          <Card className="bg-card border-border p-8 mb-16">
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold">Rank System</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Progress through ranks to unlock higher reward rates. Your rank is determined by your total points.
            </p>
            <div className="space-y-4">
              {ranks.map((rank, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <Trophy className={`w-8 h-8 ${rank.color}`} />
                    <div>
                      <h3 className={`text-xl font-bold ${rank.color}`}>{rank.name}</h3>
                      <p className="text-sm text-muted-foreground">{rank.points} points</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Reward Rate</p>
                    <p className="text-2xl font-bold text-green-500">{rank.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-4 mb-6">
                <Gift className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold">Daily Quests</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Complete 5 trades</span>
                    <span className="text-primary font-bold">+100 pts</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Refer a friend</span>
                    <span className="text-primary font-bold">+500 pts</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-4 mb-6">
                <TrendingUp className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold">Your Stats</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Total Points</span>
                    <span className="text-2xl font-bold text-primary">12,450</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">SOL Earned</span>
                    <span className="text-2xl font-bold text-green-500">2.45 SOL</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Current Rank</span>
                    <span className="text-2xl font-bold text-yellow-500">Gold</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-full shadow-glow"
            >
              Start Earning Rewards
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RewardsPage;
