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

          <Card className="bg-card border-border p-8 md:p-12">
            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  At Axiom ("we," "us," or "our"), we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our decentralized trading platform and related services.
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                <h3 className="text-lg font-semibold text-foreground mb-3">2.1 Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Wallet addresses when you connect to our platform</li>
                  <li>Email addresses (optional, for notifications and updates)</li>
                  <li>Communication data when you contact our support team</li>
                  <li>Referral information if you participate in our referral program</li>
                </ul>
                <h3 className="text-lg font-semibold text-foreground mb-3">2.2 Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Transaction data and blockchain interactions</li>
                  <li>Usage data and analytics (pages visited, time spent, features used)</li>
                  <li>Device information (browser type, IP address, operating system)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-3">We use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>To provide, operate, and maintain our trading platform</li>
                  <li>To process and facilitate your transactions on the blockchain</li>
                  <li>To improve user experience and develop new features</li>
                  <li>To communicate with you about updates, security alerts, and support</li>
                  <li>To detect, prevent, and address technical issues and fraud</li>
                  <li>To comply with legal obligations and enforce our Terms of Service</li>
                  <li>To analyze platform usage and generate aggregated statistics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                <p className="text-muted-foreground mb-3">
                  We implement industry-leading security measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Non-custodial infrastructure:</strong> We never have access to your private keys or funds</li>
                  <li><strong>Encryption:</strong> All data transmissions are encrypted using SSL/TLS protocols</li>
                  <li><strong>Secure storage:</strong> Personal data is stored on secure servers with restricted access</li>
                  <li><strong>Regular audits:</strong> We conduct regular security audits and penetration testing</li>
                  <li><strong>Access controls:</strong> Strict internal policies limit employee access to user data</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  However, no method of transmission over the internet is 100% secure. While we strive to protect your data, 
                  we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services</h2>
                <p className="text-muted-foreground mb-3">
                  We integrate with the following third-party services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Turnkey:</strong> Non-custodial wallet infrastructure and key management</li>
                  <li><strong>Hyperliquid:</strong> Perpetual futures trading protocol</li>
                  <li><strong>MarginFi:</strong> Lending and yield farming protocol</li>
                  <li><strong>Solana Blockchain:</strong> Public blockchain for transaction processing</li>
                  <li><strong>Analytics providers:</strong> For usage statistics and platform improvements</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  These services have their own privacy policies. We encourage you to review them. Note that blockchain 
                  transactions are public and permanently recorded on the Solana blockchain.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to enhance your experience. You can control cookie 
                  preferences through your browser settings. Disabling cookies may limit certain platform features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
                  Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Blockchain 
                  transaction data is permanent and cannot be deleted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Your Rights</h2>
                <p className="text-muted-foreground mb-3">Depending on your location, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data (subject to legal requirements)</li>
                  <li>Object to or restrict certain data processing activities</li>
                  <li>Data portability</li>
                  <li>Withdraw consent (where processing is based on consent)</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  To exercise these rights, please contact us at privacy@axiom.trade.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. International Data Transfers</h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate 
                  safeguards are in place to protect your data in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our platform is not intended for users under 18 years of age. We do not knowingly collect personal information 
                  from children. If you become aware that a child has provided us with personal data, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy 
                  Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/20 rounded-lg text-muted-foreground">
                  <p><strong>Email:</strong> privacy@axiom.trade</p>
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

export default Privacy;
