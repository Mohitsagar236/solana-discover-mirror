import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Zap, Shield, Clock, Target } from "lucide-react";

interface FeatureDetailProps {
  title: string;
  subtitle: string;
  description: string;
  reverse?: boolean;
  children?: ReactNode;
  demoType?: "execution" | "migration" | "mev" | "strategy";
}

const ExecutionDemo = () => (
  <div className="w-full space-y-4">
    <div className="text-center mb-6">
      <Badge className="bg-green-600 mb-2">Live Execution Demo</Badge>
      <p className="text-sm text-muted-foreground">Real-time order processing</p>
    </div>
    
    <div className="space-y-3">
      {[
        { time: "0.3s", status: "Order Received", icon: Clock, color: "text-blue-500" },
        { time: "0.4s", status: "Order Validated", icon: CheckCircle, color: "text-purple-500" },
        { time: "0.5s", status: "Block Confirmed", icon: Zap, color: "text-yellow-500" },
        { time: "0.5s", status: "Executed ✓", icon: CheckCircle, color: "text-green-500" },
      ].map((step, index) => (
        <Card key={index} className="p-4 flex items-center gap-4 bg-muted/30 border-l-4 border-l-primary animate-in fade-in slide-in-from-left" style={{ animationDelay: `${index * 150}ms` }}>
          <step.icon className={`w-6 h-6 ${step.color}`} />
          <div className="flex-1">
            <p className="font-semibold">{step.status}</p>
            <p className="text-xs text-muted-foreground">Block time: {step.time}</p>
          </div>
          {index === 3 && <Badge className="bg-green-600">Complete</Badge>}
        </Card>
      ))}
    </div>
    
    <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4 mt-4">
      <p className="text-sm font-semibold text-green-600">Average Execution: 0.5s</p>
      <p className="text-xs text-muted-foreground">3x faster than competitors</p>
    </div>
  </div>
);

const MigrationDemo = () => (
  <div className="w-full space-y-4">
    <div className="text-center mb-6">
      <Badge className="bg-purple-600 mb-2">Migration Sniper</Badge>
      <p className="text-sm text-muted-foreground">Catch tokens at migration</p>
    </div>
    
    <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-bold text-lg">TOKEN → TOKEN_V2</p>
          <p className="text-xs text-muted-foreground">Migration detected</p>
        </div>
        <Target className="w-8 h-8 text-purple-500 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Old Contract</p>
          <p className="font-mono text-xs">0x7a8d...4f2e</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">New Contract</p>
          <p className="font-mono text-xs">0x9c3b...6a1f</p>
        </div>
      </div>
    </Card>
    
    <div className="space-y-2">
      <Card className="p-3 bg-muted/30 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <div className="flex-1">
          <p className="text-sm font-semibold">Auto-detect migration</p>
          <p className="text-xs text-muted-foreground">Instant notification</p>
        </div>
      </Card>
      <Card className="p-3 bg-muted/30 flex items-center gap-3">
        <Zap className="w-5 h-5 text-yellow-500" />
        <div className="flex-1">
          <p className="text-sm font-semibold">Execute in ≤1 block</p>
          <p className="text-xs text-muted-foreground">First to trade</p>
        </div>
      </Card>
      <Card className="p-3 bg-muted/30 flex items-center gap-3">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        <div className="flex-1">
          <p className="text-sm font-semibold">Maximize profit</p>
          <p className="text-xs text-muted-foreground">Best entry/exit</p>
        </div>
      </Card>
    </div>
  </div>
);

const MEVProtectionDemo = () => (
  <div className="w-full space-y-4">
    <div className="text-center mb-6">
      <Badge className="bg-green-600 mb-2">MEV Protection Active</Badge>
      <p className="text-sm text-muted-foreground">Your trades are protected</p>
    </div>
    
    <div className="grid grid-cols-2 gap-3 mb-4">
      <Card className="p-4 bg-red-500/10 border-red-500/30">
        <Shield className="w-8 h-8 text-red-500 mb-2" />
        <p className="text-xs text-muted-foreground mb-1">Without Protection</p>
        <p className="font-bold text-red-500">$450.00</p>
        <p className="text-xs text-red-400">-$50 MEV loss</p>
      </Card>
      <Card className="p-4 bg-green-500/10 border-green-500/30">
        <Shield className="w-8 h-8 text-green-500 mb-2" />
        <p className="text-xs text-muted-foreground mb-1">With Axiom</p>
        <p className="font-bold text-green-500">$500.00</p>
        <p className="text-xs text-green-400">+$50 saved</p>
      </Card>
    </div>
    
    <div className="space-y-2">
      <Card className="p-3 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold">Front-running blocked</span>
          </div>
          <Badge variant="outline" className="text-xs">Protected</Badge>
        </div>
      </Card>
      <Card className="p-3 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold">Sandwich attack prevented</span>
          </div>
          <Badge variant="outline" className="text-xs">Protected</Badge>
        </div>
      </Card>
      <Card className="p-3 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold">Private mempool route</span>
          </div>
          <Badge variant="outline" className="text-xs">Active</Badge>
        </div>
      </Card>
    </div>
  </div>
);

const StrategyDemo = () => (
  <div className="w-full space-y-4">
    <div className="text-center mb-6">
      <Badge className="bg-blue-600 mb-2">Auto-Strategy Builder</Badge>
      <p className="text-sm text-muted-foreground">One-click trading automation</p>
    </div>
    
    <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 mb-4">
      <p className="font-bold mb-3">Active Strategy: Buy & Limit Sell</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Entry:</span>
          <span className="font-semibold">Market Buy SOL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Take Profit:</span>
          <span className="font-semibold text-green-500">+15% @ $165</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Stop Loss:</span>
          <span className="font-semibold text-red-500">-5% @ $135</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <Badge className="bg-green-600">Monitoring</Badge>
        </div>
      </div>
    </Card>
    
    <div className="grid grid-cols-3 gap-2 text-center text-xs">
      <div className="bg-muted/30 p-3 rounded-lg">
        <p className="text-muted-foreground mb-1">Success Rate</p>
        <p className="font-bold text-green-500 text-lg">87%</p>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <p className="text-muted-foreground mb-1">Avg Profit</p>
        <p className="font-bold text-blue-500 text-lg">+12%</p>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <p className="text-muted-foreground mb-1">Executions</p>
        <p className="font-bold text-primary text-lg">243</p>
      </div>
    </div>
  </div>
);

export const FeatureDetail = ({
  title,
  subtitle,
  description,
  reverse = false,
  children,
  demoType,
}: FeatureDetailProps) => {
  const getDemoContent = () => {
    if (children) return children;
    
    switch (demoType) {
      case "execution":
        return <ExecutionDemo />;
      case "migration":
        return <MigrationDemo />;
      case "mev":
        return <MEVProtectionDemo />;
      case "strategy":
        return <StrategyDemo />;
      default:
        return (
          <div className="text-muted-foreground text-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full mb-4 mx-auto animate-pulse" />
            <p>Feature Demo</p>
          </div>
        );
    }
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } gap-12 items-center`}
        >
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
            <h3 className="text-2xl text-primary mb-6">{subtitle}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
          </div>
          
          <div className="flex-1">
            <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all shadow-lg">
              {getDemoContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
