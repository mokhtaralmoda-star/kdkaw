import fs from "node:fs";
const f = "vite.config.ts";
let t = fs.readFileSync(f, "utf8");
if (t.includes("publicDir")) { console.log("already set"); }
else {
  t = t.replace("export default defineConfig(({ mode }) => ({", 'export default defineConfig(({ mode }) => ({\n  publicDir: "kdd-public",');
  fs.writeFileSync(f, t);
  console.log("publicDir added");
}
