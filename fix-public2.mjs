import fs from "node:fs";
const f = "vite.config.ts";
let t = fs.readFileSync(f, "utf8");
t = t.replace('import path from "path";', 'import path from "path";\nimport fsx from "node:fs";');
t = t.replace('publicDir: "kdd-public",', 'publicDir: "client/kdd-public",');
if (!t.includes("copyAdmin")) {
  t = t.replace("// https://vitejs.dev/config/", `function copyAdmin() {
  return {
    name: "copy-admin",
    closeBundle() {
      try { fsx.copyFileSync("kdd-public/admin.html", "dist/admin.html"); } catch (e) { console.warn("admin copy skipped", e.message); }
    },
  };
}

// https://vitejs.dev/config/`);
  t = t.replace("plugins: [react(), mode === \"development\" && componentTagger()].filter(Boolean),", "plugins: [react(), mode === \"development\" && componentTagger(), copyAdmin()].filter(Boolean),");
}
fs.writeFileSync(f, t);
console.log("patched");
