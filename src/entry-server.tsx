import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "stream";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Eagerly-lazy: import all pages. renderToReadableStream + allReady resolves
// every React.lazy boundary before the promise settles, so bots get full HTML.
const Index            = lazy(() => import("./pages/Index"));
const ProductDetail    = lazy(() => import("./pages/ProductDetail"));
const BodyLift         = lazy(() => import("./pages/BodyLift"));
const Journal          = lazy(() => import("./pages/Journal"));
const JournalArticle   = lazy(() => import("./pages/JournalArticle"));
const JournalScience   = lazy(() => import("./pages/JournalScience"));
const JournalRitual    = lazy(() => import("./pages/JournalRitual"));
const JournalRedLight  = lazy(() => import("./pages/JournalRedLight"));
const JournalLymphatic = lazy(() => import("./pages/JournalLymphatic"));
const JournalEMS       = lazy(() => import("./pages/JournalEMS"));
const JournalRitualLasts = lazy(() => import("./pages/JournalRitualLasts"));
const Support          = lazy(() => import("./pages/Support"));
const Shipping         = lazy(() => import("./pages/Shipping"));
const Returns          = lazy(() => import("./pages/Returns"));
const FAQ              = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy    = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService   = lazy(() => import("./pages/TermsOfService"));
const TechRedLight     = lazy(() => import("./pages/TechRedLight"));
const TechMicrocurrent = lazy(() => import("./pages/TechMicrocurrent"));
const TechEMS          = lazy(() => import("./pages/TechEMS"));
const TechThermal      = lazy(() => import("./pages/TechThermal"));
const Science          = lazy(() => import("./pages/Science"));
const RitualGuide      = lazy(() => import("./pages/RitualGuide"));
const FramePulseActivatorGuide  = lazy(() => import("./pages/ritual-guides/FramePulseActivatorGuide"));
const FrequencyWandProGuide     = lazy(() => import("./pages/ritual-guides/FrequencyWandProGuide"));
const SculptWandGuide           = lazy(() => import("./pages/ritual-guides/SculptWandGuide"));
const GuaShaFrequencyGuide      = lazy(() => import("./pages/ritual-guides/GuaShaFrequencyGuide"));
const EyeActivatorGuide         = lazy(() => import("./pages/ritual-guides/EyeActivatorGuide"));
const SkinPulseGuide            = lazy(() => import("./pages/ritual-guides/SkinPulseGuide"));
const FrequencyWandGuide        = lazy(() => import("./pages/ritual-guides/FrequencyWandGuide"));
const CompareNuFACE    = lazy(() => import("./pages/CompareNuFACE"));
const ThankYou         = lazy(() => import("./pages/ThankYou"));
const NotFound         = lazy(() => import("./pages/NotFound"));

function ServerApp() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/"                                         element={<Index />} />
        <Route path="/product/:handle"                          element={<ProductDetail />} />
        <Route path="/body-lift"                                element={<BodyLift />} />
        <Route path="/journal"                                  element={<Journal />} />
        <Route path="/journal/frequency-shift"                  element={<JournalArticle />} />
        <Route path="/journal/microcurrent-collagen"            element={<JournalScience />} />
        <Route path="/journal/evening-protocol"                 element={<JournalRitual />} />
        <Route path="/journal/red-light-clinical"               element={<JournalRedLight />} />
        <Route path="/journal/lymphatic-drainage"               element={<JournalLymphatic />} />
        <Route path="/journal/ems-vs-microcurrent"              element={<JournalEMS />} />
        <Route path="/journal/ritual-that-lasts"                element={<JournalRitualLasts />} />
        <Route path="/support"                                  element={<Support />} />
        <Route path="/shipping"                                 element={<Shipping />} />
        <Route path="/returns"                                  element={<Returns />} />
        <Route path="/faq"                                      element={<FAQ />} />
        <Route path="/privacy"                                  element={<PrivacyPolicy />} />
        <Route path="/terms"                                    element={<TermsOfService />} />
        <Route path="/technology/red-light"                     element={<TechRedLight />} />
        <Route path="/technology/microcurrent"                  element={<TechMicrocurrent />} />
        <Route path="/technology/ems"                           element={<TechEMS />} />
        <Route path="/technology/thermal"                       element={<TechThermal />} />
        <Route path="/science"                                  element={<Science />} />
        <Route path="/ritual-guide"                             element={<RitualGuide />} />
        <Route path="/ritual-guide/frame-pulse-activator"       element={<FramePulseActivatorGuide />} />
        <Route path="/ritual-guide/frequency-wand-pro"          element={<FrequencyWandProGuide />} />
        <Route path="/ritual-guide/sculpt-wand"                 element={<SculptWandGuide />} />
        <Route path="/ritual-guide/gua-sha-frequency"           element={<GuaShaFrequencyGuide />} />
        <Route path="/ritual-guide/eye-activator"               element={<EyeActivatorGuide />} />
        <Route path="/ritual-guide/skin-pulse"                  element={<SkinPulseGuide />} />
        <Route path="/ritual-guide/frequency-wand"              element={<FrequencyWandGuide />} />
        <Route path="/compare/nuface-vs-zential-pure"           element={<CompareNuFACE />} />
        <Route path="/thank-you"                                element={<ThankYou />} />
        <Route path="*"                                         element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export async function render(url: string): Promise<{ html: string; helmet: any }> {
  const helmetContext: Record<string, any> = {};
  const queryClient = new QueryClient();

  const element = (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <ServerApp />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const html = await new Promise<string>((resolve, reject) => {
    let body = "";
    const writable = new Writable({
      write(chunk: Buffer, _enc: string, cb: () => void) {
        body += chunk.toString();
        cb();
      },
      final(cb: () => void) {
        resolve(body);
        cb();
      },
    });

    const { pipe } = renderToPipeableStream(element, {
      // onAllReady fires once ALL content (including lazy boundaries) is ready,
      // giving bots the full rendered HTML instead of loading placeholders.
      onAllReady() {
        pipe(writable);
      },
      onError(err: unknown) {
        console.error(`[SSR] ${url}:`, err instanceof Error ? err.message : err);
        reject(err);
      },
    });
  });

  const helmet = helmetContext.helmet ?? null;
  return { html, helmet };
}
