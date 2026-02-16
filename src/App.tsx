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
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  useHashScroll();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/journal/frequency-shift" element={<JournalArticle />} />
      <Route path="/support" element={<Support />} />
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
