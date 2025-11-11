import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FeatureDetail } from "@/components/FeatureDetail";
import { IntegrationShowcase } from "@/components/IntegrationShowcase";
import { Rewards } from "@/components/Rewards";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <Hero />
        <Features />
        
        <FeatureDetail
          title="Land in ≤ 1 Block"
          subtitle="Our limit order execution engine is the fastest in the market."
          description="With our proprietary order execution engine and colocated nodes, our limit orders land in ≤ 1 block."
        />
        
        <FeatureDetail
          title="Migration Sniper"
          subtitle="Buy and sell any migrating token, landing in ≤ 1 block."
          description="With our migration sniper, you're never too late to the party. Be the first to get in or secure profits."
          reverse
        />
        
        <FeatureDetail
          title="No MEV Triggers"
          subtitle="Never get your limit orders triggered by MEV again."
          description="Axiom utilizes MEV-resistant execution paths with frontrunning and sandwiching protection, meaning your limit orders are safe with us."
        />
        
        <FeatureDetail
          title="Auto-Strategies"
          subtitle="Set your entire trading strategy in motion with a single click."
          description="Advanced trading strategies lets you buy and place your limit orders in one click. We'll handle the rest."
          reverse
        />

        <IntegrationShowcase
          title="Deep Liquidity • Instant Fills"
          subtitle="Hyperliquid Perpetuals"
          description="Trade perpetual futures with deep liquidity and lightning-fast execution. Access leverage trading on the most popular assets with zero gas fees."
          imagePath="/images/landing-page/perps-image.webp"
          logoPath="/images/hyperliquid-logo.svg"
          logoAlt="Hyperliquid"
          ctaText="Try Perpetuals"
          ctaLink="/perpetuals"
        />

        <IntegrationShowcase
          title="Up to 15% APY • Instant Withdrawals"
          subtitle="Yield Platform"
          description="Earn passive income on your idle assets with industry-leading APY rates. Powered by MarginFi's battle-tested DeFi infrastructure."
          imagePath="/images/landing-page/yield-page.webp"
          logoPath="/images/marginfi-logo.svg"
          logoAlt="MarginFi"
          ctaText="Start Earning"
          ctaLink="/yield"
          reverse
        />
        
        <Rewards />
        <FAQ />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
