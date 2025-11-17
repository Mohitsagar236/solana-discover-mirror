import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Send, Twitter, HelpCircle, CheckCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I create an account?",
    answer: "Click 'Connect Wallet' in the top right and connect your Solana wallet using Phantom, Solflare, or any Solana-compatible wallet."
  },
  {
    question: "What fees does Axiom charge?",
    answer: "Trading fees start at 0.1% and decrease with higher volumes. Wallet operations only pay network fees."
  },
  {
    question: "Is my wallet custodial?",
    answer: "No! Axiom uses non-custodial infrastructure powered by Turnkey. You always maintain control of your private keys."
  },
  {
    question: "How do I earn rewards?",
    answer: "Complete daily quests, refer friends, and trade to earn points and SOL rewards. Check the Rewards page for details."
  },
  {
    question: "What tokens can I trade?",
    answer: "We support all major Solana tokens including SOL, USDC, BONK, JUP, and more. New tokens are added regularly."
  },
];

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Email Us</h3>
              <p className="text-muted-foreground mb-4">
                Send us an email anytime
              </p>
              <a
                href="mailto:support@axiom.trade"
                className="text-primary hover:text-primary/80 font-semibold"
              >
                support@axiom.trade
              </a>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Discord</h3>
              <p className="text-muted-foreground mb-4">
                Join our community
              </p>
              <Button variant="outline" className="hover:border-primary">
                Join Discord
              </Button>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:border-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Twitter className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Twitter</h3>
              <p className="text-muted-foreground mb-4">
                Follow us for updates
              </p>
              <Button variant="outline" className="hover:border-primary">
                @AxiomTrade
              </Button>
            </Card>
          </div>

          <Card className="bg-card border-border p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
            {formSubmitted && (
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-green-600 dark:text-green-400">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-muted/20 border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-muted/20 border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  className="bg-muted/20 border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full h-10 rounded-md bg-muted/20 border border-border px-3"
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Trading Issue</option>
                  <option>Account Help</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={6}
                  className="bg-muted/20 border-border"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={formSubmitted}
              >
                <Send className="w-4 h-4 mr-2" />
                {formSubmitted ? "Sent!" : "Send Message"}
              </Button>
            </form>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="pb-6 border-b border-border last:border-0 last:pb-0">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Badge variant="secondary">{index + 1}</Badge>
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground pl-10">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button variant="outline" className="hover:border-primary">
                View Full Documentation
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
