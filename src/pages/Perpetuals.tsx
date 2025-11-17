import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Clock } from "lucide-react";
import { useState } from "react";

const markets = [
  { symbol: "BTC-PERP", price: "$64,250", change: "+2.45%", positive: true, volume: "$850M", oi: "$1.2B", funding: "0.01%" },
  { symbol: "ETH-PERP", price: "$3,425", change: "+1.82%", positive: true, volume: "$620M", oi: "$890M", funding: "0.008%" },
  { symbol: "SOL-PERP", price: "$142", change: "+5.23%", positive: true, volume: "$320M", oi: "$450M", funding: "0.012%" },
  { symbol: "ARB-PERP", price: "$1.85", change: "-0.95%", positive: false, volume: "$85M", oi: "$120M", funding: "-0.003%" },
  { symbol: "OP-PERP", price: "$2.34", change: "+3.12%", positive: true, volume: "$95M", oi: "$145M", funding: "0.005%" },
  { symbol: "AVAX-PERP", price: "$38.50", change: "+1.45%", positive: true, volume: "$105M", oi: "$165M", funding: "0.007%" },
];

const orderBookData = {
  asks: [
    { price: "64,280", size: "1.25", total: "80,350" },
    { price: "64,270", size: "2.50", total: "160,675" },
    { price: "64,260", size: "3.75", total: "240,975" },
    { price: "64,250", size: "1.80", total: "115,650" },
  ],
  bids: [
    { price: "64,240", size: "2.20", total: "141,328" },
    { price: "64,230", size: "3.10", total: "199,113" },
    { price: "64,220", size: "1.95", total: "125,229" },
    { price: "64,210", size: "4.25", total: "272,893" },
  ],
};

const recentTrades = [
  { price: "64,245", size: "0.25", time: "12:45:23", isBuy: true },
  { price: "64,242", size: "0.50", time: "12:45:20", isBuy: false },
  { price: "64,248", size: "1.20", time: "12:45:18", isBuy: true },
  { price: "64,240", size: "0.75", time: "12:45:15", isBuy: true },
  { price: "64,235", size: "2.10", time: "12:45:12", isBuy: false },
  { price: "64,250", size: "0.85", time: "12:45:10", isBuy: true },
];

const openPositions = [
  { market: "BTC-PERP", side: "Long", size: "2.5", entryPrice: "$63,200", markPrice: "$64,250", pnl: "+$2,625", pnlPercent: "+4.15%", positive: true, leverage: "10x" },
  { market: "ETH-PERP", side: "Short", size: "15", entryPrice: "$3,480", markPrice: "$3,425", pnl: "+$825", pnlPercent: "+2.38%", positive: true, leverage: "5x" },
  { market: "SOL-PERP", side: "Long", size: "100", entryPrice: "$138", markPrice: "$142", pnl: "+$400", pnlPercent: "+2.90%", positive: true, leverage: "15x" },
];

const Perpetuals = () => {
  const [selectedMarket, setSelectedMarket] = useState("BTC-PERP");
  const [orderType, setOrderType] = useState("limit");
  const [leverage, setLeverage] = useState("10");
  const [orderSide, setOrderSide] = useState<"long" | "short">("long");

  const currentMarket = markets.find(m => m.symbol === selectedMarket) || markets[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Perpetual <span className="text-primary">Futures</span>
                </h1>
                <Badge variant="secondary" className="rounded-full">
                  Powered by Hyperliquid
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
                  <p className="text-lg font-bold text-primary">$2.1B</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">Open Interest</p>
                  <p className="text-lg font-bold text-primary">$3.2B</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">Active Traders</p>
                  <p className="text-lg font-bold text-primary">45K+</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">Markets</p>
                  <p className="text-lg font-bold text-primary">{markets.length}</p>
                </Card>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Markets List */}
            <Card className="lg:col-span-1 p-4 max-h-[600px] overflow-y-auto">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Markets
              </h3>
              <div className="space-y-2">
                {markets.map((market, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedMarket(market.symbol)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMarket === market.symbol
                        ? "bg-primary/10 border border-primary"
                        : "bg-muted/20 hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">{market.symbol}</span>
                      <span className={`text-xs font-semibold ${market.positive ? "text-green-500" : "text-red-500"}`}>
                        {market.change}
                      </span>
                    </div>
                    <p className="text-sm font-bold mb-1">{market.price}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Vol: {market.volume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chart + Order Book/Trades */}
            <Card className="lg:col-span-2 p-4">
              {/* Chart Placeholder */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-2xl font-bold">{currentMarket.symbol}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">{currentMarket.price}</span>
                      <span className={`text-sm font-semibold ${currentMarket.positive ? "text-green-500" : "text-red-500"}`}>
                        {currentMarket.change}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Funding Rate</p>
                    <p className="font-semibold text-green-600">{currentMarket.funding}</p>
                  </div>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-16 h-16 text-primary mx-auto mb-2 opacity-50" />
                    <p className="text-muted-foreground">Price Chart</p>
                    <p className="text-xs text-muted-foreground">Real-time TradingView integration</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="orderbook" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="orderbook">Order Book</TabsTrigger>
                  <TabsTrigger value="trades">Recent Trades</TabsTrigger>
                </TabsList>

                <TabsContent value="orderbook" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2 px-2">
                        <span>Price (USD)</span>
                        <span className="text-right">Size</span>
                        <span className="text-right">Total</span>
                      </div>
                      {orderBookData.asks.reverse().map((ask, index) => (
                        <div key={index} className="grid grid-cols-3 text-sm py-1 px-2 hover:bg-red-500/10 rounded">
                          <span className="text-red-500 font-semibold">{ask.price}</span>
                          <span className="text-right">{ask.size}</span>
                          <span className="text-right text-muted-foreground">{ask.total}</span>
                        </div>
                      ))}
                    </div>
                    <div className="py-2 text-center font-bold text-lg border-y border-border">
                      {currentMarket.price}
                    </div>
                    <div>
                      {orderBookData.bids.map((bid, index) => (
                        <div key={index} className="grid grid-cols-3 text-sm py-1 px-2 hover:bg-green-500/10 rounded">
                          <span className="text-green-500 font-semibold">{bid.price}</span>
                          <span className="text-right">{bid.size}</span>
                          <span className="text-right text-muted-foreground">{bid.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trades" className="mt-4">
                  <div className="space-y-1">
                    <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2 px-2">
                      <span>Price (USD)</span>
                      <span className="text-right">Size</span>
                      <span className="text-right">Time</span>
                    </div>
                    {recentTrades.map((trade, index) => (
                      <div key={index} className="grid grid-cols-3 text-sm py-1 px-2 hover:bg-muted/10 rounded">
                        <span className={trade.isBuy ? "text-green-500" : "text-red-500"}>{trade.price}</span>
                        <span className="text-right">{trade.size}</span>
                        <span className="text-right text-muted-foreground text-xs">{trade.time}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Trading Panel */}
            <Card className="lg:col-span-1 p-4">
              <Tabs value={orderSide} onValueChange={(v) => setOrderSide(v as "long" | "short")} className="w-full mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="long" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Long
                  </TabsTrigger>
                  <TabsTrigger value="short" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                    Short
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop Limit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Leverage</Label>
                  <Select value={leverage} onValueChange={setLeverage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="5">5x</SelectItem>
                      <SelectItem value="10">10x</SelectItem>
                      <SelectItem value="20">20x</SelectItem>
                      <SelectItem value="50">50x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {orderType === "limit" && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Price (USD)</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                )}

                <div>
                  <Label className="text-xs text-muted-foreground">Size</Label>
                  <Input type="number" placeholder="0.00" />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Total (USD)</Label>
                  <Input type="number" placeholder="0.00" disabled />
                </div>

                <Button 
                  className={`w-full ${orderSide === "long" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                >
                  {orderSide === "long" ? "Open Long" : "Open Short"} {selectedMarket}
                </Button>

                <div className="pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Balance:</span>
                    <span className="font-semibold">$10,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Position:</span>
                    <span className="font-semibold">${parseInt(leverage) * 10000}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Open Positions */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Open Positions ({openPositions.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/20">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold">Market</th>
                    <th className="text-left p-3 text-sm font-semibold">Side</th>
                    <th className="text-right p-3 text-sm font-semibold">Size</th>
                    <th className="text-right p-3 text-sm font-semibold">Entry Price</th>
                    <th className="text-right p-3 text-sm font-semibold">Mark Price</th>
                    <th className="text-right p-3 text-sm font-semibold">PnL</th>
                    <th className="text-center p-3 text-sm font-semibold">Leverage</th>
                    <th className="text-center p-3 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {openPositions.map((position, index) => (
                    <tr key={index} className="border-t border-border hover:bg-muted/10">
                      <td className="p-3 font-semibold">{position.market}</td>
                      <td className="p-3">
                        <Badge variant={position.side === "Long" ? "default" : "secondary"} 
                          className={position.side === "Long" ? "bg-green-600" : "bg-red-600"}>
                          {position.side}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">{position.size}</td>
                      <td className="p-3 text-right text-muted-foreground">{position.entryPrice}</td>
                      <td className="p-3 text-right">{position.markPrice}</td>
                      <td className="p-3 text-right">
                        <div className={position.positive ? "text-green-500" : "text-red-500"}>
                          <div className="font-semibold">{position.pnl}</div>
                          <div className="text-xs">{position.pnlPercent}</div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant="outline">{position.leverage}</Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Button size="sm" variant="outline">Close</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Perpetuals;
