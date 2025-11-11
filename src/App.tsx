import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Trading from "./pages/Trading";
import Perpetuals from "./pages/Perpetuals";
import Yield from "./pages/Yield";
import RewardsPage from "./pages/RewardsPage";
import Contact from "./pages/Contact";
import Discover from "./pages/Discover";
import Portfolio from "./pages/Portfolio";
import Wallet from "./pages/Wallet";
import Leaderboard from "./pages/Leaderboard";
import Referrals from "./pages/Referrals";
import Docs from "./pages/Docs";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/perpetuals" element={<Perpetuals />} />
          <Route path="/yield" element={<Yield />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
