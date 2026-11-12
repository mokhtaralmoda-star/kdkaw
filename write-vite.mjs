import fs from "node:fs";
const eol = "\n";
const src = [
'import { defineConfig } from "vite";',
'import react from "@vitejs/plugin-react-swc";',
'import path from "path";',
'import fsx from "node:fs";',
'import { componentTagger } from "lovable-tagger";',
'',
'function copyExtra() {',
'  const files = [',
'    ["kdd-public/admin.html", "dist/admin.html"],',
'    ["client/kdd-public/_redirects", "dist/_redirects"]',
'  ];',
'  return {',
'    name: "copy-extra",',
'    closeBundle() {',
'      for (const [from, to] of files) {',
'        try { fsx.copyFileSync(from, to); } catch (e) { console.warn("skip " + from); }',
'      }',
'    }',
'  };',
'}',
'',
'// https://vitejs.dev/config/',
'export default defineConfig(({ mode }) => ({',
'  publicDir: "public",',
'  server: { host: "::", port: 8080, hmr: { overlay: false } },',
'  plugins: [react(), mode === "development" && componentTagger(), copyExtra()].filter(Boolean),',
'  resolve: {',
'    alias: { "@": path.resolve(__dirname, "./src") },',
'    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],',
'  },',
'}));',
''
].join(eol);
fs.writeFileSync("vite.config.ts", src, "utf8");
console.log("written");
