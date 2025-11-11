import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Copy, Gift, TrendingUp } from "lucide-react";

const referralStats = [
  { label: "Total Referrals", value: "24", icon: Users },
  { label: "Active Traders", value: "18", icon: TrendingUp },
  { label: "Points Earned", value: "12,450", icon: Gift },
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
            <div className="flex gap-3">
              <Input
                value="https://axiom.trade/ref/YOURCODE"
                readOnly
                className="bg-muted/20 border-border"
              />
              <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold mb-6">Referral Earnings</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                <span className="text-muted-foreground">Total SOL Earned</span>
                <span className="text-2xl font-bold text-green-500">2.45 SOL</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                <span className="text-muted-foreground">Bonus Points</span>
                <span className="text-2xl font-bold text-primary">5,200 pts</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                Claim Rewards
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Referrals;
