import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet as WalletIcon, Send, Download, ArrowLeftRight, Copy, Shield, Check, Lock, History, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tokenBalances = [
  { symbol: "SOL", name: "Solana", balance: "12.5", value: "$1,779.38", change: "+5.23%", positive: true },
  { symbol: "USDC", name: "USD Coin", balance: "500.00", value: "$500.00", change: "0%", positive: true },
  { symbol: "BONK", name: "Bonk", balance: "1,250,000", value: "$28.75", change: "+12.34%", positive: true },
  { symbol: "JUP", name: "Jupiter", balance: "450", value: "$382.50", change: "+8.45%", positive: true },
];

const recentActivity = [
  { action: "Sent", token: "SOL", amount: "2.5", to: "7xKX...4Y9Z", time: "2 hours ago", status: "completed" },
  { action: "Received", token: "USDC", amount: "100", from: "9pQR...8X3W", time: "5 hours ago", status: "completed" },
  { action: "Swapped", token: "SOL → USDC", amount: "1", value: "$142.00", time: "1 day ago", status: "completed" },
  { action: "Sent", token: "BONK", amount: "500,000", to: "5mNP...2V7K", time: "2 days ago", status: "completed" },
];

const Wallet = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("7xKXy2vDQE8m9wN5pRtL3jH4Y9ZaBcDeFg1HiJkLmNp4");
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendToken, setSendToken] = useState("SOL");
  const [receiveAddress, setReceiveAddress] = useState("");
  const [copied, setCopied] = useState(false);

  const connectWallet = () => {
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Your Solana wallet has been connected successfully",
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    if (!sendAddress || !sendAmount) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter recipient address and amount",
      });
      return;
    }

    toast({
      title: "Transaction Submitted",
      description: `Sending ${sendAmount} ${sendToken} to ${sendAddress.substring(0, 8)}...`,
    });

    // Reset form
    setSendAddress("");
    setSendAmount("");
  };

  const handleReceive = () => {
    if (receiveAddress) {
      copyAddress();
    }
  };
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

          <Tabs defaultValue="balances" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
              <TabsTrigger value="balances">Balances</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="send">Send/Receive</TabsTrigger>
            </TabsList>

            <TabsContent value="balances" className="space-y-6">
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold mb-6">Token Balances</h2>
                <div className="space-y-4">
                  {tokenBalances.map((token, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-5 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <span className="text-xl font-bold text-primary">{token.symbol[0]}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-lg mb-1">{token.symbol}</p>
                          <p className="text-sm text-muted-foreground">{token.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg mb-1">{token.balance} {token.symbol}</p>
                        <div className="flex items-center gap-2 justify-end">
                          <p className="text-sm text-muted-foreground">{token.value}</p>
                          <Badge variant={token.positive ? "default" : "secondary"} className="text-xs">
                            {token.change}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <WalletIcon className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Wallet Address</h2>
                </div>
                <div className="bg-muted/20 p-5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono break-all">7xKXp9Qd2VnR8Hm5Tz4Y9ZcWb3Jk6Ln</code>
                    <Button size="sm" variant="ghost" className="ml-4">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-card border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <History className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Recent Activity</h2>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-5 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.action === "Received" ? 'bg-green-500/10' : 'bg-blue-500/10'
                        }`}>
                          {activity.action === "Sent" && <Send className="w-5 h-5 text-blue-500" />}
                          {activity.action === "Received" && <Download className="w-5 h-5 text-green-500" />}
                          {activity.action === "Swapped" && <ArrowLeftRight className="w-5 h-5 text-blue-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{activity.action}</p>
                            <Badge variant="secondary">{activity.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.amount} {activity.token}
                            {activity.to && ` to ${activity.to}`}
                            {activity.from && ` from ${activity.from}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="send" className="space-y-6">
              <Card className="bg-card border-border p-8">
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
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Network Fee</span>
                      <span className="font-semibold">~0.000005 SOL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Time</span>
                      <span className="font-semibold">~1 second</span>
                    </div>
                  </div>
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <Send className="w-5 h-5 mr-2" />
                    Send Transaction
                  </Button>
                </div>
              </Card>

              <Card className="bg-card border-border p-8">
                <h2 className="text-2xl font-bold mb-6">Receive Funds</h2>
                <div className="space-y-6">
                  <div className="bg-muted/20 p-6 rounded-lg text-center">
                    <div className="w-48 h-48 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">QR Code</p>
                    </div>
                    <code className="text-sm font-mono break-all block mb-4">
                      7xKXp9Qd2VnR8Hm5Tz4Y9ZcWb3Jk6Ln
                    </code>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Address
                    </Button>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      ⚠️ Only send Solana assets to this address. Sending other tokens may result in permanent loss.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-card border-border p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Security Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Non-custodial Infrastructure</p>
                  <p className="text-sm text-muted-foreground">You maintain full control of your private keys</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Air-gapped Architecture</p>
                  <p className="text-sm text-muted-foreground">Private keys never exposed to the internet</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Seamless Recovery</p>
                  <p className="text-sm text-muted-foreground">Multiple recovery options for account access</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Multi-chain Support</p>
                  <p className="text-sm text-muted-foreground">Supports Solana, Ethereum, and more chains</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wallet;
