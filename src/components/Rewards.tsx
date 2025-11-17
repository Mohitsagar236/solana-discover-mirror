import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const rewards = [
  {
    icon: Trophy,
    title: "Trading Rewards",
    description: "Earn SOL rewards on every trade you make. The more you trade, the more you earn with our tiered reward system.",
    detail: "Up to 0.03% cashback on all trades",
    link: "/rewards",
  },
  {
    icon: TrendingUp,
    title: "Progress through the Ranks",
    description: "Level up from Bronze to Diamond tier. Higher tiers unlock better reward rates, reduced fees, and exclusive features.",
    detail: "5 tiers with increasing benefits",
    link: "/rewards",
  },
  {
    icon: Users,
    title: "Referral Program",
    description: "Earn 20% of your referrals' trading fees forever. Plus bonus SOL and points for every friend who joins and trades.",
    detail: "Unlimited passive income potential",
    link: "/referrals",
  },
  {
    icon: Star,
    title: "Axiom Points",
    description: "Accumulate points through trading, staking, referrals, and daily quests. Redeem for exclusive NFTs, fee discounts, and governance power.",
    detail: "Points never expire",
    link: "/rewards",
  },
];

export const Rewards = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get <span className="text-primary">Rewarded</span> for Trading
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Earn while you trade with our comprehensive rewards program
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, index) => (
            <Link to={reward.link} key={index}>
              <Card
                className="bg-card border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <reward.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {reward.title}
                </h3>
                <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{reward.description}</p>
                <p className="text-sm text-primary font-semibold">{reward.detail}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
