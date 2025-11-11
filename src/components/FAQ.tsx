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
      "Axiom is a trading platform designed to be the only application you need to trade onchain. We offer a suite of integrations that allow you to trade the hottest assets, all in one place.",
  },
  {
    question: "How secure is Axiom?",
    answer:
      "Axiom uses industry-leading security measures including non-custodial infrastructure, secure key management, and encryption to ensure your security.",
  },
  {
    question: "Can I buy crypto on Axiom?",
    answer:
      "Yes, through our partnership with Coinbase, Axiom users have the ability to buy up to $500 worth of crypto per week, no-KYC.",
  },
  {
    question: "How does Axiom offer yield?",
    answer:
      "Axiom offers a seamless way to earn passive income. We offer up to 15% APY on your assets, with instant withdrawals.",
  },
  {
    question: "Is Axiom decentralized?",
    answer:
      "Yes, Axiom is decentralized. We integrate directly with decentralized protocols and applications. Your funds and transactions are fully onchain and your funds are always in your control.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          FAQ
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
