import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground mb-12">Last updated: January 2025</p>

          <Card className="bg-card border-border p-8">
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                <p>
                  At Axiom, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, and protect your information when you use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Wallet addresses and transaction data</li>
                  <li>Email addresses (if provided)</li>
                  <li>Usage data and analytics</li>
                  <li>Device and browser information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>To provide and improve our services</li>
                  <li>To process your transactions</li>
                  <li>To communicate with you about updates and features</li>
                  <li>To ensure platform security</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your data. Our non-custodial 
                  wallet infrastructure means we never have access to your private keys or funds.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
                <p>
                  We integrate with third-party services like Turnkey for wallet infrastructure and 
                  various DeFi protocols. These services have their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Access your personal data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at 
                  privacy@axiom.trade
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

export default Privacy;
