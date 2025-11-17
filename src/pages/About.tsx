import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Zap, Shield, Linkedin, Twitter, CheckCircle, TrendingUp } from "lucide-react";

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

const team = [
  {
    name: "Alex Chen",
    role: "Co-Founder & CEO",
    bio: "Former product lead at Coinbase. Built trading infrastructure for 10M+ users.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sarah Martinez",
    role: "Co-Founder & CTO",
    bio: "Ex-Google engineer. Specialized in distributed systems and blockchain protocols.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "David Kim",
    role: "Head of Engineering",
    bio: "Previously at Uniswap. 8+ years building DeFi infrastructure.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Emily Thompson",
    role: "Head of Product",
    bio: "Former PM at Robinhood. Expert in fintech UX and user growth.",
    linkedin: "#",
    twitter: "#",
  },
];

const milestones = [
  { year: "2024 Q1", title: "Founded", description: "Axiom founded, accepted into Y Combinator S24" },
  { year: "2024 Q2", title: "Beta Launch", description: "Private beta with 100 early traders" },
  { year: "2024 Q3", title: "Public Launch", description: "Opened to public, integrated Hyperliquid & MarginFi" },
  { year: "2024 Q4", title: "$10M Volume", description: "Hit $10M in trading volume milestone" },
  { year: "2025 Q1", title: "100K Users", description: "Crossed 100,000 registered users" },
  { year: "2025 Q2", title: "$1B+ Volume", description: "Achieved $1B+ in total trading volume" },
];

const investors = [
  { name: "Y Combinator", type: "Accelerator", logo: "Y" },
  { name: "Solana Ventures", type: "Strategic", logo: "◎" },
  { name: "Hyperliquid", type: "Partner", logo: "H" },
  { name: "MarginFi", type: "Partner", logo: "M" },
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

          <Card className="bg-card border-border p-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Meet The Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-5xl font-bold text-primary">{member.name[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a href={member.linkedin} className="text-primary hover:text-primary/80 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.twitter} className="text-primary hover:text-primary/80 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-card border-border p-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-12 bg-primary/20 mx-auto mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <Badge variant="secondary" className="mb-2">{milestone.year}</Badge>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Backed By The Best</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {investors.map((investor, index) => (
                <div key={index} className="text-center p-6 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{investor.logo}</span>
                  </div>
                  <h3 className="font-bold mb-1">{investor.name}</h3>
                  <Badge variant="secondary" className="text-xs">{investor.type}</Badge>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Axiom is proud to be backed by Y Combinator and leading Web3 investors who share our vision of making DeFi accessible to everyone.
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
