import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fsx from "node:fs";
import { componentTagger } from "lovable-tagger";

function copyAdmin() {
  return {
    name: "copy-admin",
    closeBundle() {
      try { fsx.copyFileSync("kdd-public/admin.html", "dist/admin.html"); } catch (e) { console.warn("admin copy skipped", e.message); }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: "client/kdd-public",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), copyAdmin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
