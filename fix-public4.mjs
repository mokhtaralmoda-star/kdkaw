import fs from "node:fs";
const f = "vite.config.ts";
let t = fs.readFileSync(f, "utf8");
const eol = t.includes("\r\n") ? "\r\n" : "\n";
const oldBlock = [
  "function copyAdmin() {",
  "  return {",
  '    name: "copy-admin",',
  "    closeBundle() {",
  '      try { fsx.copyFileSync("kdd-public/admin.html", "dist/admin.html"); } catch (e) {',
  '        console.warn("admin copy skipped", e.message); }',
  "    },",
  "  };",
  "}"
].join(eol);
const newBlock = [
  "function copyAdmin() {",
  "  const files = [",
  '    ["kdd-public/admin.html", "dist/admin.html"],',
  '    ["client/kdd-public/_redirects", "dist/_redirects"]',
  "  ];",
  "  return {",
  '    name: "copy-extra",',
  "    closeBundle() {",
  "      for (const [from, to] of files) {",
  '        try { fsx.copyFileSync(from, to); } catch (e) { console.warn("skip " + from); }',
  "      }",
  "    },",
  "  };",
  "}"
].join(eol);
if (!t.includes(oldBlock)) { console.log("NO MATCH"); process.exit(1); }
t = t.replace(oldBlock, newBlock);
fs.writeFileSync(f, t);
console.log("patched");
