import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground mb-12">Last updated: January 2025</p>

          <Card className="bg-card border-border p-8">
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
                <p>
                  By accessing and using Axiom, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>You must be at least 18 years old</li>
                  <li>You must comply with all applicable laws in your jurisdiction</li>
                  <li>You must not be located in a restricted jurisdiction</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Account Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>You are responsible for maintaining the security of your wallet</li>
                  <li>You must keep your private keys secure</li>
                  <li>You must not share your account access with others</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Trading Risks</h2>
                <p>
                  Cryptocurrency trading involves substantial risk of loss. You should carefully consider 
                  whether trading is appropriate for you in light of your financial condition.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Prohibited Activities</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Market manipulation</li>
                  <li>Money laundering</li>
                  <li>Using the platform for illegal activities</li>
                  <li>Attempting to circumvent security measures</li>
                  <li>Creating multiple accounts for fraudulent purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Fees</h2>
                <p>
                  Axiom charges trading fees as disclosed on the platform. Fees are subject to change 
                  with reasonable notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p>
                  Axiom is not liable for any losses incurred through trading. We provide the platform 
                  "as is" without warranties of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Dispute Resolution</h2>
                <p>
                  Any disputes arising from these terms shall be resolved through binding arbitration 
                  in accordance with applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
                <p>
                  For questions about these Terms of Service, contact us at legal@axiom.trade
                </p>
              </section>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
