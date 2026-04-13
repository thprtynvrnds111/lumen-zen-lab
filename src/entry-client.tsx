import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Always use createRoot (not hydrateRoot) so prerendered HTML is used only
// by bots; React renders fresh client-side without hydration mismatch concerns.
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
