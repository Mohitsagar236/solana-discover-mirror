import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet as WalletIcon, Send, Download, ArrowLeftRight, Copy, Shield } from "lucide-react";

const Wallet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your <span className="text-primary">Wallet</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your funds securely
            </p>
          </div>

          <Card className="bg-card border-border p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
                <p className="text-5xl font-bold">$2,690.63</p>
              </div>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <WalletIcon className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Non-custodial wallet secured by Turnkey</span>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 flex items-center gap-2 h-16"
            >
              <Send className="w-5 h-5" />
              Send
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 h-16"
            >
              <Download className="w-5 h-5" />
              Receive
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 h-16"
            >
              <ArrowLeftRight className="w-5 h-5" />
              Swap
            </Button>
          </div>

          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Wallet Address</h2>
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-sm">7xKX...4Y9Z</code>
                <Button size="sm" variant="ghost">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Send Funds</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="Enter wallet address"
                  className="bg-muted/20 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  className="bg-muted/20 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token">Token</Label>
                <select
                  id="token"
                  className="w-full h-10 rounded-md bg-muted/20 border border-border px-3"
                >
                  <option>SOL</option>
                  <option>USDC</option>
                  <option>BONK</option>
                  <option>JUP</option>
                </select>
              </div>
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                Send Transaction
              </Button>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Security Features</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                Non-custodial infrastructure
              </li>
              <li className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                Air-gapped architecture
              </li>
              <li className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                Seamless recovery options
              </li>
              <li className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                Multi-chain support
              </li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wallet;
