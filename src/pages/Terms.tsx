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

          <Card className="bg-card border-border p-8 md:p-12">
            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Axiom ("the Platform"), you ("User") accept and agree to be bound by these Terms of Service ("Terms"). 
                  If you do not agree to these Terms, please do not use our Platform. We reserve the right to modify these Terms at any time, 
                  and your continued use of the Platform constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Eligibility</h2>
                <p className="text-muted-foreground mb-3">To use the Platform, you must meet the following requirements:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>You must be at least 18 years old (or the age of majority in your jurisdiction)</li>
                  <li>You must comply with all applicable laws and regulations in your jurisdiction</li>
                  <li>You must not be located in a restricted or sanctioned jurisdiction</li>
                  <li>You must not be a politically exposed person (PEP) unless explicitly authorized</li>
                  <li>You must have the legal capacity to enter into binding agreements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Account Responsibilities</h2>
                <p className="text-muted-foreground mb-3">You are solely responsible for:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Maintaining the security and confidentiality of your wallet and private keys</li>
                  <li>All activities that occur under your wallet address</li>
                  <li>Ensuring your wallet connection is secure and not compromised</li>
                  <li>Monitoring your account for unauthorized access or suspicious activity</li>
                  <li>Immediately notifying us of any security breaches or unauthorized access</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Axiom is a non-custodial platform. We do not have access to your private keys and cannot recover your 
                  funds if you lose access to your wallet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Trading Risks and Disclaimers</h2>
                <p className="text-muted-foreground mb-3">
                  <strong>WARNING:</strong> Cryptocurrency trading involves substantial risk of loss and may not be suitable for all users.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Cryptocurrency markets are highly volatile and prices can fluctuate dramatically</li>
                  <li>You may lose some or all of your invested capital</li>
                  <li>Past performance is not indicative of future results</li>
                  <li>Leverage trading amplifies both gains and losses</li>
                  <li>Smart contract risks exist with DeFi protocols we integrate with</li>
                  <li>Blockchain transactions are irreversible</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  You acknowledge that you understand these risks and trade at your own risk. Axiom provides tools and 
                  infrastructure but does not provide investment advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Prohibited Activities</h2>
                <p className="text-muted-foreground mb-3">You agree not to engage in any of the following:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Market manipulation, wash trading, or spoofing</li>
                  <li>Money laundering or financing of terrorism</li>
                  <li>Using the Platform for any illegal or fraudulent activities</li>
                  <li>Attempting to circumvent security measures or exploit vulnerabilities</li>
                  <li>Using bots or automated systems without explicit authorization</li>
                  <li>Impersonating others or providing false information</li>
                  <li>Interfering with the proper functioning of the Platform</li>
                  <li>Reverse engineering or decompiling our software</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Fees and Charges</h2>
                <p className="text-muted-foreground mb-3">
                  The Platform charges fees for certain services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Trading fees:</strong> Variable fees based on trading volume (starting at 0.1%)</li>
                  <li><strong>Network fees:</strong> Blockchain transaction fees paid to validators (not controlled by Axiom)</li>
                  <li><strong>Protocol fees:</strong> Fees charged by integrated DeFi protocols (Hyperliquid, MarginFi)</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Fees are subject to change. We will notify users of fee changes through the Platform or email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content, trademarks, logos, and intellectual property on the Platform are owned by Axiom or our licensors. 
                  You may not use, reproduce, or distribute any content without our explicit written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Third-Party Services</h2>
                <p className="text-muted-foreground">
                  The Platform integrates with third-party services and protocols. We are not responsible for the actions, 
                  performance, or security of these third parties. Your use of third-party services is subject to their 
                  respective terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-3">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Axiom is provided "AS IS" without warranties of any kind</li>
                  <li>We are not liable for any trading losses, missed opportunities, or price fluctuations</li>
                  <li>We are not liable for blockchain network failures or delays</li>
                  <li>Our maximum liability is limited to the fees you paid in the 12 months prior to the claim</li>
                  <li>We are not liable for indirect, consequential, or punitive damages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to indemnify and hold harmless Axiom, its affiliates, officers, directors, employees, and agents 
                  from any claims, damages, losses, or expenses arising from your use of the Platform, violation of these Terms, 
                  or violation of any rights of third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to suspend or terminate your access to the Platform at any time, with or without cause 
                  or notice, for violations of these Terms or for any other reason. You may stop using the Platform at any time. 
                  Upon termination, your right to use the Platform ceases immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Governing Law and Dispute Resolution</h2>
                <p className="text-muted-foreground">
                  These Terms are governed by the laws of the United States. Any disputes arising from these Terms or your use 
                  of the Platform shall be resolved through binding arbitration, except where prohibited by law. You waive your 
                  right to participate in class action lawsuits.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">13. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may modify these Terms at any time. Material changes will be notified through the Platform or via email. 
                  Your continued use of the Platform after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">14. Severability</h2>
                <p className="text-muted-foreground">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall 
                  continue in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">15. Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/20 rounded-lg text-muted-foreground">
                  <p><strong>Email:</strong> legal@axiom.trade</p>
                  <p><strong>Support:</strong> support@axiom.trade</p>
                  <p><strong>Website:</strong> https://axiom.trade</p>
                </div>
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
