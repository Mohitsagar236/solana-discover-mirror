import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const rewards = [
  {
    icon: Trophy,
    title: "Rewards",
    description: "Earn SOL from trading.",
    detail: "Get paid to trade",
    link: "/rewards",
  },
  {
    icon: TrendingUp,
    title: "Progress through the Ranks",
    description: "Earn higher reward rates.",
    detail: "Level up your earnings",
    link: "/rewards",
  },
  {
    icon: Users,
    title: "Referrals",
    description: "Earn points and SOL from your friends.",
    detail: "Build your network",
    link: "/referrals",
  },
  {
    icon: Star,
    title: "Axiom Points",
    description: "Earn points through trading, referrals, and quests.",
    detail: "Unlock exclusive benefits",
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
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {reward.title}
                </h3>
                <p className="text-muted-foreground mb-2">{reward.description}</p>
                <p className="text-sm text-primary/70">{reward.detail}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
