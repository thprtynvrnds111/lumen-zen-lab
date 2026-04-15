import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { useHashScroll } from "@/hooks/useHashScroll";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy-load non-homepage routes
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalArticle = lazy(() => import("./pages/JournalArticle"));
const JournalScience = lazy(() => import("./pages/JournalScience"));
const JournalRitual = lazy(() => import("./pages/JournalRitual"));
const JournalRedLight = lazy(() => import("./pages/JournalRedLight"));
const JournalLymphatic = lazy(() => import("./pages/JournalLymphatic"));
const JournalEMS = lazy(() => import("./pages/JournalEMS"));
const JournalRitualLasts = lazy(() => import("./pages/JournalRitualLasts"));
const Support = lazy(() => import("./pages/Support"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Returns = lazy(() => import("./pages/Returns"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const BodyLift = lazy(() => import("./pages/BodyLift"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const TechRedLight = lazy(() => import("./pages/TechRedLight"));
const TechMicrocurrent = lazy(() => import("./pages/TechMicrocurrent"));
const TechEMS = lazy(() => import("./pages/TechEMS"));
const TechThermal = lazy(() => import("./pages/TechThermal"));
const RitualGuide = lazy(() => import("./pages/RitualGuide"));
const FramePulseActivatorGuide = lazy(() => import("./pages/ritual-guides/FramePulseActivatorGuide"));
const FrequencyWandProGuide = lazy(() => import("./pages/ritual-guides/FrequencyWandProGuide"));
const SculptWandGuide = lazy(() => import("./pages/ritual-guides/SculptWandGuide"));
const GuaShaFrequencyGuide = lazy(() => import("./pages/ritual-guides/GuaShaFrequencyGuide"));
const EyeActivatorGuide = lazy(() => import("./pages/ritual-guides/EyeActivatorGuide"));
const SkinPulseGuide = lazy(() => import("./pages/ritual-guides/SkinPulseGuide"));
const FrequencyWandGuide = lazy(() => import("./pages/ritual-guides/FrequencyWandGuide"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  useHashScroll();
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
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
        <Route path="/ritual-guide" element={<RitualGuide />} />
        <Route path="/ritual-guide/frame-pulse-activator" element={<FramePulseActivatorGuide />} />
        <Route path="/ritual-guide/frequency-wand-pro" element={<FrequencyWandProGuide />} />
        <Route path="/ritual-guide/sculpt-wand" element={<SculptWandGuide />} />
        <Route path="/ritual-guide/gua-sha-frequency" element={<GuaShaFrequencyGuide />} />
        <Route path="/ritual-guide/eye-activator" element={<EyeActivatorGuide />} />
        <Route path="/ritual-guide/skin-pulse" element={<SkinPulseGuide />} />
        <Route path="/ritual-guide/frequency-wand" element={<FrequencyWandGuide />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
