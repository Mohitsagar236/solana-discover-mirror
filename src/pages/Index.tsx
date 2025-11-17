import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FeatureDetail } from "@/components/FeatureDetail";
import { IntegrationShowcase } from "@/components/IntegrationShowcase";
import { Rewards } from "@/components/Rewards";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Users, DollarSign, Zap, Star, Quote, 
  Shield, Lock, BarChart3, Wallet, Globe, Layers,
  ArrowRight, CheckCircle, TrendingDown, Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Volume Traded", value: "$2.5B+", icon: DollarSign, change: "+45% this month", trend: "up" },
  { label: "Active Traders", value: "125K+", icon: Users, change: "+12K this week", trend: "up" },
  { label: "Average Fill Speed", value: "< 0.5s", icon: Zap, change: "Industry leading", trend: "neutral" },
  { label: "User Satisfaction", value: "4.9/5", icon: Star, change: "From 10K+ reviews", trend: "up" },
];

const platformFeatures = [
  {
    title: "Spot Trading",
    description: "Trade 10+ pairs with zero slippage and lightning-fast execution",
    icon: Activity,
    link: "/trading",
    color: "text-blue-500",
  },
  {
    title: "Perpetual Futures",
    description: "Up to 20x leverage with deep liquidity on major assets",
    icon: TrendingUp,
    link: "/perpetuals",
    color: "text-green-500",
  },
  {
    title: "Yield Farming",
    description: "Earn up to 120% APR on your crypto assets",
    icon: BarChart3,
    link: "/yield",
    color: "text-purple-500",
  },
  {
    title: "Staking Rewards",
    description: "Lock tokens and earn consistent passive income",
    icon: Lock,
    link: "/staking",
    color: "text-yellow-500",
  },
  {
    title: "Governance",
    description: "Vote on proposals and shape the platform's future",
    icon: Users,
    link: "/governance",
    color: "text-pink-500",
  },
  {
    title: "Analytics",
    description: "Professional-grade charts and market insights",
    icon: Layers,
    link: "/analytics",
    color: "text-orange-500",
  },
];

const securityFeatures = [
  {
    title: "MEV Protection",
    description: "Advanced algorithms protect against front-running and sandwich attacks",
    icon: Shield,
  },
  {
    title: "Non-Custodial",
    description: "You control your keys and assets at all times",
    icon: Wallet,
  },
  {
    title: "Audited Smart Contracts",
    description: "Multiple security audits by leading firms",
    icon: CheckCircle,
  },
  {
    title: "Real-time Monitoring",
    description: "24/7 security monitoring and instant alerts",
    icon: Globe,
  },
];

const testimonials = [
  {
    name: "Alex Chen",
    role: "Professional Trader",
    avatar: "AC",
    content: "Axiom's execution speed is unmatched. I've tried every platform, and nothing comes close to their sub-second fills.",
    rating: 5,
  },
  {
    name: "Sarah Martinez",
    role: "DeFi Investor",
    avatar: "SM",
    content: "The yield opportunities are incredible. I'm earning 15% APY on stablecoins with instant withdrawals. Game changer.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Crypto Enthusiast",
    avatar: "DK",
    content: "Finally, a platform that actually protects against MEV. My limit orders execute exactly when they should, no front-running.",
    rating: 5,
  },
];

const partners = [
  { name: "Hyperliquid", logo: "HL", type: "Perpetuals Partner", description: "Deep liquidity provider" },
  { name: "MarginFi", logo: "MF", type: "Yield Partner", description: "DeFi infrastructure" },
  { name: "Solana", logo: "SOL", type: "Blockchain", description: "Lightning-fast network" },
  { name: "Jupiter", logo: "JUP", type: "DEX Aggregator", description: "Best price routing" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <Hero />
        
        {/* Statistics Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">Live Statistics</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Trusted by <span className="text-primary">Thousands</span> of Traders
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join the fastest-growing trading platform on Solana
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-primary/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-3 rounded-xl">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    {stat.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                  </div>
                  <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">{stat.label}</p>
                  <p className="text-xs text-green-600 font-semibold">{stat.change}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Platform Features Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">All-in-One Platform</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Everything You Need in <span className="text-primary">One Place</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From trading to earning, we've got you covered with professional-grade tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformFeatures.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  <Card className="p-6 h-full hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-primary group cursor-pointer">
                    <div className="bg-gradient-to-br from-muted/50 to-muted/20 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="flex items-center text-primary text-sm font-semibold group-hover:translate-x-2 transition-transform">
                      Explore <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Security Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">Security First</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Your Assets, <span className="text-primary">Fully Protected</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Industry-leading security measures to keep your funds safe
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-all hover:scale-105">
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <Features />
        
        <FeatureDetail
          title="Land in ≤ 1 Block"
          subtitle="Our limit order execution engine is the fastest in the market."
          description="With our proprietary order execution engine and colocated nodes, our limit orders land in ≤ 1 block. Experience sub-second execution with zero slippage on your trades."
          demoType="execution"
        />
        
        <FeatureDetail
          title="Migration Sniper"
          subtitle="Buy and sell any migrating token, landing in ≤ 1 block."
          description="With our migration sniper, you're never too late to the party. Be the first to get in or secure profits. Our automated detection system alerts you instantly when tokens migrate to new contracts."
          reverse
          demoType="migration"
        />
        
        <FeatureDetail
          title="No MEV Triggers"
          subtitle="Never get your limit orders triggered by MEV again."
          description="Axiom utilizes MEV-resistant execution paths with frontrunning and sandwiching protection, meaning your limit orders are safe with us. Save an average of $50 per trade by avoiding MEV extractors."
          demoType="mev"
        />
        
        <FeatureDetail
          title="Auto-Strategies"
          subtitle="Set your entire trading strategy in motion with a single click."
          description="Advanced trading strategies lets you buy and place your limit orders in one click. We'll handle the rest. Configure take-profit and stop-loss levels automatically with 87% success rate."
          reverse
          demoType="strategy"
        />

        <IntegrationShowcase
          title="Deep Liquidity • Instant Fills"
          subtitle="Hyperliquid Perpetuals"
          description="Trade perpetual futures with deep liquidity and lightning-fast execution. Access up to 20x leverage on BTC, ETH, SOL and more with zero gas fees. $724M daily volume with $1.2B open interest ensures your orders fill instantly at the best prices."
          imagePath="/images/landing-page/perps-image.webp"
          logoPath="/images/hyperliquid-logo.svg"
          logoAlt="Hyperliquid"
          ctaText="Try Perpetuals"
          ctaLink="/perpetuals"
          demoType="perpetuals"
        />

        <IntegrationShowcase
          title="Up to 15% APY • Instant Withdrawals"
          subtitle="Yield Platform"
          description="Earn passive income on your idle assets with industry-leading APY rates up to 15.2% on stablecoins. Powered by MarginFi's battle-tested DeFi infrastructure with 3x security audits. Features auto-compounding and instant withdrawals with no lock-up periods."
          imagePath="/images/landing-page/yield-page.webp"
          logoPath="/images/marginfi-logo.svg"
          logoAlt="MarginFi"
          ctaText="Start Earning"
          ctaLink="/yield"
          reverse
          demoType="yield"
        />
        
        {/* Why Choose Axiom Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">Competitive Advantage</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Why Choose <span className="text-primary">Axiom</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See how we stack up against the competition
              </p>
            </div>
            
            <Card className="overflow-hidden max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold">
                        <div className="flex flex-col items-center">
                          <Badge className="bg-gradient-to-r from-primary to-accent mb-2">Axiom</Badge>
                          <span className="text-xs text-muted-foreground">Best Choice</span>
                        </div>
                      </th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Execution Speed", axiom: "≤ 0.5s", others: "2-5s" },
                      { feature: "Gas Fees", axiom: "$0", others: "$5-20" },
                      { feature: "MEV Protection", axiom: "✓ Advanced", others: "✗ None" },
                      { feature: "Max Leverage", axiom: "20x", others: "10x" },
                      { feature: "Yield APY", axiom: "Up to 120%", others: "5-15%" },
                      { feature: "Withdrawal Time", axiom: "Instant", others: "1-3 days" },
                      { feature: "Trading Pairs", axiom: "10+", others: "3-5" },
                      { feature: "Customer Support", axiom: "24/7", others: "Business hours" },
                    ].map((row, index) => (
                      <tr key={index} className="border-t border-border hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-green-600 font-bold">{row.axiom}</Badge>
                        </td>
                        <td className="p-4 text-center text-muted-foreground">{row.others}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">Simple Process</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Get Started in <span className="text-primary">3 Easy Steps</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Start trading in less than 2 minutes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Connect Wallet",
                  description: "Connect your Phantom, Solflare, or any Solana wallet. No registration or KYC required.",
                  icon: Wallet,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  step: "02",
                  title: "Deposit Funds",
                  description: "Add funds via our Coinbase integration or transfer from your existing wallet. Start with as little as $10.",
                  icon: DollarSign,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  step: "03",
                  title: "Start Trading",
                  description: "Choose from spot trading, perpetuals, or yield farming. Your first trade executes in under 1 second.",
                  icon: Zap,
                  color: "from-green-500 to-emerald-500",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 text-[120px] font-bold text-primary/5 leading-none">
                    {item.step}
                  </div>
                  <div className="relative">
                    <div className={`bg-gradient-to-br ${item.color} p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="mb-4">
                      <Badge variant="outline" className="text-lg px-3 py-1 mb-2">Step {item.step}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/discover">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-10 py-6 text-lg rounded-full shadow-xl">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Live Activity Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live Now
                </span>
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Real-Time <span className="text-primary">Trading Activity</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join thousands of active traders right now
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Recent Trades</h3>
                  <Badge variant="outline" className="text-xs">Last 60 seconds</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { user: "0x7a3...9f2", action: "Bought", token: "SOL", amount: "145.2", value: "$20,850", time: "2s ago", positive: true },
                    { user: "0x4d8...1c5", action: "Sold", token: "BTC", amount: "0.5", value: "$21,622", time: "5s ago", positive: false },
                    { user: "0x9b2...6e4", action: "Bought", token: "ETH", amount: "8.3", value: "$18,957", time: "12s ago", positive: true },
                    { user: "0x2f1...8a7", action: "Bought", token: "USDC", amount: "5,000", value: "$5,000", time: "18s ago", positive: true },
                    { user: "0x6c9...3d2", action: "Sold", token: "SOL", amount: "98.4", value: "$14,118", time: "24s ago", positive: false },
                  ].map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors animate-in fade-in slide-in-from-bottom" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                          {trade.user.substring(2, 4).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            <span className={trade.positive ? "text-green-500" : "text-red-500"}>{trade.action}</span> {trade.amount} {trade.token}
                          </p>
                          <p className="text-xs text-muted-foreground">{trade.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{trade.value}</p>
                        <p className="text-xs text-muted-foreground">{trade.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Top Performers Today</h3>
                  <Badge className="bg-green-600 text-xs">+24h</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { rank: 1, token: "ARB", price: "$1.45", change: "+15.8%", volume: "$8.2M" },
                    { rank: 2, token: "SOL", price: "$143.50", change: "+8.3%", volume: "$45.1M" },
                    { rank: 3, token: "MATIC", price: "$0.89", change: "+6.7%", volume: "$12.3M" },
                    { rank: 4, token: "AVAX", price: "$38.20", change: "+5.2%", volume: "$6.8M" },
                    { rank: 5, token: "LINK", price: "$14.85", change: "+4.9%", volume: "$9.4M" },
                  ].map((token, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                          #{token.rank}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{token.token}</p>
                          <p className="text-xs text-muted-foreground">Vol: {token.volume}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{token.price}</p>
                        <p className="text-xs font-semibold text-green-500">{token.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                <Activity className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-500 mb-1">1,247</p>
                <p className="text-xs text-muted-foreground">Trades/Hour</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-500 mb-1">3,582</p>
                <p className="text-xs text-muted-foreground">Online Now</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
                <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-500 mb-1">$12.4M</p>
                <p className="text-xs text-muted-foreground">Volume/Hour</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-500 mb-1">0.4s</p>
                <p className="text-xs text-muted-foreground">Avg Fill Time</p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">Testimonials</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Loved by <span className="text-primary">Traders</span> Worldwide
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See what our community has to say about Axiom
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all hover:scale-105 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-3">
                        <span className="text-white font-bold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">Powered By</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Built on <span className="text-primary">Industry-Leading</span> Infrastructure
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Partnered with the best in the ecosystem
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 hover:border-primary group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-primary font-bold text-2xl">{partner.logo}</span>
                  </div>
                  <h3 className="font-bold mb-1 text-lg">{partner.name}</h3>
                  <p className="text-xs text-primary font-semibold mb-2">{partner.type}</p>
                  <p className="text-xs text-muted-foreground">{partner.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <Rewards />
        <FAQ />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
