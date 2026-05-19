import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import i18n from "./i18n";
import { useLanguageStore } from "@/stores/languageStore";

// Sync i18next with persisted language on startup
i18n.changeLanguage(useLanguageStore.getState().lang);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
