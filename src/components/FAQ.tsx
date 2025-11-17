import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Axiom?",
    answer:
      "Axiom is a comprehensive DeFi trading platform built on Solana, designed to be your all-in-one solution for crypto trading. We offer spot trading, perpetual futures with up to 20x leverage, yield farming with up to 120% APR, staking rewards, governance participation, and advanced analytics. Our platform integrates with leading protocols like Hyperliquid and MarginFi to provide deep liquidity and competitive rates.",
  },
  {
    question: "How secure is Axiom?",
    answer:
      "Security is our top priority. Axiom uses industry-leading security measures including: non-custodial wallet infrastructure (you always control your keys), MEV-resistant execution paths to protect against front-running, multiple smart contract audits by leading firms, real-time monitoring systems, and encrypted data transmission. Your funds are always in your control and all transactions are executed on-chain.",
  },
  {
    question: "Can I buy crypto on Axiom?",
    answer:
      "Yes! Through our partnership with Coinbase, Axiom users can purchase up to $500 worth of crypto per week with no KYC requirements. We support major cryptocurrencies including SOL, BTC, ETH, and stablecoins. Simply connect your wallet and use our integrated fiat on-ramp for instant purchases.",
  },
  {
    question: "How does Axiom offer yield?",
    answer:
      "Axiom partners with MarginFi to offer optimized yield farming strategies across 16+ pools. Users can earn up to 120% APR on various assets including stablecoins (15%+ APY), SOL, and other major cryptocurrencies. Our yield vaults feature auto-compounding, instant withdrawals, and transparent APY calculations. All yields are generated through legitimate DeFi protocols with battle-tested smart contracts.",
  },
  {
    question: "Is Axiom decentralized?",
    answer:
      "Yes, Axiom is built on decentralized infrastructure. We integrate directly with decentralized protocols and DEXs on Solana. All trading, staking, and yield farming activities are executed through smart contracts on-chain. Your funds never leave your wallet custody - we use non-custodial architecture where you maintain full control of your private keys at all times.",
  },
  {
    question: "What are the trading fees?",
    answer:
      "Axiom offers competitive trading fees: 0.1% for spot trading, 0.02-0.05% for perpetual futures (maker/taker), and no fees for deposits or withdrawals. Plus, you can earn cashback up to 0.03% on all trades through our rewards program. Higher tier users (Silver, Gold, Platinum, Diamond) enjoy reduced fees and increased cashback rates.",
  },
  {
    question: "How does the rewards program work?",
    answer:
      "Earn rewards through multiple channels: trading cashback (up to 0.03%), referral commissions (20% of referred users' fees forever), Axiom Points from trading/staking/quests, and tier progression bonuses. Points can be redeemed for fee discounts, exclusive NFTs, and governance voting power. There are 5 tiers (Bronze to Diamond) with increasing benefits at each level.",
  },
  {
    question: "What wallets are supported?",
    answer:
      "Axiom supports all major Solana wallets including Phantom, Solflare, Backpack, Ledger hardware wallets, and any wallet compatible with the Solana Wallet Adapter standard. Connect in seconds and start trading immediately - no account registration or email required.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Axiom
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
