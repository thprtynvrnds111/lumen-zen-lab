import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // Bundle these into the SSR output so Vite handles CJS→ESM transformation.
    // react-dom/server is CJS; without noExternal Node.js cannot do named imports.
    // react-helmet-async must share one instance across all components during render.
    noExternal: ["react-dom", "react-helmet-async"],
  },
}));
