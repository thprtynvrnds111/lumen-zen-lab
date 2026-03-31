import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { useHashScroll } from "@/hooks/useHashScroll";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Journal from "./pages/Journal";
import JournalArticle from "./pages/JournalArticle";
import JournalScience from "./pages/JournalScience";
import JournalRitual from "./pages/JournalRitual";
import JournalRedLight from "./pages/JournalRedLight";
import JournalLymphatic from "./pages/JournalLymphatic";
import JournalEMS from "./pages/JournalEMS";
import JournalRitualLasts from "./pages/JournalRitualLasts";
import Support from "./pages/Support";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BodyLift from "./pages/BodyLift";
import ThankYou from "./pages/ThankYou";
import TechRedLight from "./pages/TechRedLight";
import TechMicrocurrent from "./pages/TechMicrocurrent";
import TechEMS from "./pages/TechEMS";
import TechThermal from "./pages/TechThermal";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  useHashScroll();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/body-lift" element={<BodyLift />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/journal/frequency-shift" element={<JournalArticle />} />
      <Route path="/journal/microcurrent-collagen" element={<JournalScience />} />
      <Route path="/journal/evening-protocol" element={<JournalRitual />} />
      <Route path="/journal/red-light-clinical" element={<JournalRedLight />} />
      <Route path="/journal/lymphatic-drainage" element={<JournalLymphatic />} />
      <Route path="/journal/ems-vs-microcurrent" element={<JournalEMS />} />
      <Route path="/journal/ritual-that-lasts" element={<JournalRitualLasts />} />
      <Route path="/support" element={<Support />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/technology/red-light" element={<TechRedLight />} />
      <Route path="/technology/microcurrent" element={<TechMicrocurrent />} />
      <Route path="/technology/ems" element={<TechEMS />} />
      <Route path="/technology/thermal" element={<TechThermal />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
