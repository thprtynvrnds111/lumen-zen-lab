import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { useHashScroll } from "@/hooks/useHashScroll";
import { captureFbclid } from "@/lib/meta-tracking";
import { lazy, Suspense, useEffect } from "react";
import Storefront from "./pages/Storefront";

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
const Science = lazy(() => import("./pages/Science"));
const CompareNuFACE = lazy(() => import("./pages/CompareNuFACE"));
const CompareForeo = lazy(() => import("./pages/CompareForeo"));
const TechElectroporation = lazy(() => import("./pages/TechElectroporation"));
const ClinicVsHome = lazy(() => import("./pages/ClinicVsHome"));
const FacialMuscleTraining = lazy(() => import("./pages/FacialMuscleTraining"));
const TechIontophoresis = lazy(() => import("./pages/TechIontophoresis"));
const Collection = lazy(() => import("./pages/Collection"));
const Quiz = lazy(() => import("./pages/Quiz"));
const QuizResult = lazy(() => import("./pages/QuizResult"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Protocols        = lazy(() => import("./pages/Protocols"));
const ProtocolDetail   = lazy(() => import("./pages/ProtocolDetail"));
const ProtocolFaceIntroducer = lazy(() => import("./pages/ProtocolFaceIntroducer"));
const FoundingTerms = lazy(() => import("./pages/FoundingTerms"));
const Instruments = lazy(() => import("./pages/Instruments"));
const InstrumentLanding = lazy(() => import("./pages/InstrumentLanding"));
const TruthMovement = lazy(() => import("./pages/TruthMovement"));
const Reveal = lazy(() => import("./pages/reveal/Reveal"));
const FunnelBridge = lazy(() => import("./pages/funnel/FunnelBridge"));
const RevealTakeover = lazy(() => import("./pages/reveal/RevealTakeover"));
const HomeLeadPrimer = lazy(() => import("./components/zential/HomeLeadPrimer"));
const TheRitual = lazy(() => import("./pages/editorial/TheRitual"));
const TheScience = lazy(() => import("./pages/editorial/TheScience"));
const TheDiagnosis = lazy(() => import("./pages/editorial/TheDiagnosis"));

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  useHashScroll();
  useEffect(() => {
    captureFbclid();
  }, []);
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <RevealTakeover />
      <HomeLeadPrimer />
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/movement" element={<TruthMovement />} />
        <Route path="/protocols" element={<Protocols />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/instruments/:slug" element={<InstrumentLanding />} />
        <Route path="/protocols/:slug" element={<ProtocolDetail />} />
        <Route path="/protocol/face-introducer" element={<ProtocolFaceIntroducer />} />
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
        <Route path="/editorial/the-ritual" element={<TheRitual />} />
        <Route path="/editorial/the-science" element={<TheScience />} />
        <Route path="/editorial/the-diagnosis" element={<TheDiagnosis />} />
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
        <Route path="/science" element={<Science />} />
        <Route path="/compare/nuface-vs-zential-pure" element={<CompareNuFACE />} />
        <Route path="/compare/foreo-bear-vs-zential-pure" element={<CompareForeo />} />
        <Route path="/technology/electroporation" element={<TechElectroporation />} />
        <Route path="/clinic-vs-home-facial-device" element={<ClinicVsHome />} />
        <Route path="/facial-muscle-training" element={<FacialMuscleTraining />} />
        <Route path="/technology/iontophoresis" element={<TechIontophoresis />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/founding-terms" element={<FoundingTerms />} />

        <Route path="/reveal" element={<Reveal />} />

        {/* Paid-traffic bridge funnel — isolated campaign routes, noindex */}
        <Route path="/f/:slug" element={<FunnelBridge />} />

        <Route path="/dashboard" element={<Dashboard />} />
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
