import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Users, Gift, TrendingUp, Award, Target, CheckCircle, Crown, Zap } from "lucide-react";

const ranks = [
  { name: "Bronze", points: "0-1,000", reward: "0.01%", color: "text-orange-600" },
  { name: "Silver", points: "1,000-5,000", reward: "0.02%", color: "text-gray-400" },
  { name: "Gold", points: "5,000-15,000", reward: "0.03%", color: "text-yellow-500" },
  { name: "Platinum", points: "15,000-50,000", reward: "0.05%", color: "text-cyan-400" },
  { name: "Diamond", points: "50,000+", reward: "0.10%", color: "text-purple-500" },
];

const dailyQuests = [
  { title: "Complete 5 trades", reward: "+100 pts", progress: 60, completed: false },
  { title: "Trade $1,000 volume", reward: "+250 pts", progress: 75, completed: false },
  { title: "Refer a friend", reward: "+500 pts", progress: 0, completed: false },
  { title: "Hold position for 24h", reward: "+150 pts", progress: 100, completed: true },
  { title: "Use 3 different tokens", reward: "+200 pts", progress: 66, completed: false },
];

const achievements = [
  { title: "First Trade", description: "Complete your first trade", points: 50, unlocked: true },
  { title: "Volume Master", description: "Trade $10,000 total volume", points: 1000, unlocked: true },
  { title: "Diamond Hands", description: "Hold a position for 30 days", points: 500, unlocked: false },
  { title: "Social Butterfly", description: "Refer 10 friends", points: 2000, unlocked: false },
  { title: "Whale Trader", description: "Single trade over $50,000", points: 1500, unlocked: false },
  { title: "Consistent Trader", description: "Trade 30 days in a row", points: 3000, unlocked: true },
];

const topEarners = [
  { rank: 1, address: "7xKX...4Y9Z", points: "125,450", rewards: "12.5 SOL" },
  { rank: 2, address: "9pQR...8X3W", points: "98,230", rewards: "9.8 SOL" },
  { rank: 3, address: "5mNP...2V7K", points: "87,650", rewards: "8.7 SOL" },
  { rank: 4, address: "3kLM...6T8N", points: "76,890", rewards: "7.6 SOL" },
  { rank: 5, address: "8fGH...1R5P", points: "65,420", rewards: "6.5 SOL" },
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
                <Target className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold">Daily Quests</h2>
              </div>
              <div className="space-y-4">
                {dailyQuests.map((quest, index) => (
                  <div key={index} className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        {quest.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        <span className={`font-semibold ${quest.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {quest.title}
                        </span>
                      </div>
                      <Badge variant={quest.completed ? "secondary" : "default"}>{quest.reward}</Badge>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 rounded-full transition-all ${quest.completed ? 'bg-green-500' : 'bg-primary'}`}
                        style={{ width: `${quest.progress}%` }}
                      />
                    </div>
                    {quest.completed && (
                      <p className="text-xs text-green-500 mt-1">✓ Completed</p>
                    )}
                  </div>
                ))}
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
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Points to Platinum</span>
                    <span className="text-lg font-semibold">2,550 pts</span>
                  </div>
                  <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-cyan-400 h-3 rounded-full" style={{ width: "83%" }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-4 mb-6">
                <Award className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold">Achievements</h2>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg flex items-start gap-4 ${
                      achievement.unlocked ? 'bg-primary/10 border border-primary/20' : 'bg-muted/20'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      {achievement.unlocked ? (
                        <Star className="w-5 h-5 text-primary" />
                      ) : (
                        <Star className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${achievement.unlocked ? '' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </h3>
                        {achievement.unlocked && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <Badge variant={achievement.unlocked ? "default" : "secondary"} className="mt-2 text-xs">
                        +{achievement.points} pts
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-4 mb-6">
                <Crown className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold">Top Earners</h2>
              </div>
              <div className="space-y-3">
                {topEarners.map((earner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        earner.rank === 1 ? 'bg-yellow-500 text-black' :
                        earner.rank === 2 ? 'bg-gray-400 text-black' :
                        earner.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-muted text-foreground'
                      }`}>
                        {earner.rank}
                      </div>
                      <code className="text-sm font-mono">{earner.address}</code>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{earner.points}</p>
                      <p className="text-sm text-green-500">{earner.rewards}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Leaderboard
              </Button>
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
