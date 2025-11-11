import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Users, Zap, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To make DeFi trading accessible, fast, and secure for everyone.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Building cutting-edge technology that sets new standards in crypto trading.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Non-custodial infrastructure with industry-leading security measures.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by traders, for traders. Your feedback shapes our platform.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className="text-primary">Axiom</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Axiom is the gateway to DeFi - a comprehensive trading platform designed to be the only application you need to trade onchain.
            </p>
          </div>

          <Card className="bg-card border-border p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground text-lg">
              <p>
                Founded in 2024 and backed by Y Combinator, Axiom was born from a simple observation: 
                crypto trading is unnecessarily complex. Traders juggle multiple platforms, deal with 
                slow execution, and worry about security.
              </p>
              <p>
                We set out to change that. By integrating the best protocols and building proprietary 
                technology, we've created a platform where you can trade spot, perpetuals, earn yield, 
                and get rewarded - all in one place.
              </p>
              <p>
                Today, thousands of traders trust Axiom with billions in trading volume. We're just 
                getting started.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 text-center hover:border-primary transition-all"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Backed By The Best</h2>
            <div className="flex flex-col items-center gap-8">
              <div className="text-center">
                <span className="text-6xl font-bold">Y</span>
                <p className="text-xl text-muted-foreground mt-2">Y Combinator</p>
                <p className="text-muted-foreground">S24 Batch</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl text-center">
                Axiom is proud to be part of Y Combinator's S24 batch, joining a legacy of 
                world-changing companies like Airbnb, Stripe, and Coinbase.
              </p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
