import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Users, Star } from "lucide-react";

const rewards = [
  {
    icon: Trophy,
    title: "Rewards",
    description: "Get paid to trade.",
  },
  {
    icon: TrendingUp,
    title: "Progress through the Ranks",
    description: "Earn higher reward rates.",
  },
  {
    icon: Users,
    title: "Referrals",
    description: "Earn points and SOL from your friends.",
  },
  {
    icon: Star,
    title: "Axiom Points",
    description: "Earn points through trading, referrals, and quests.",
  },
];

export const Rewards = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Earn While You Trade
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover:border-primary transition-all duration-300 group"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <reward.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {reward.title}
              </h3>
              <p className="text-muted-foreground">{reward.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
