import fs from "node:fs";
let t = fs.readFileSync("vite.config.ts", "utf8");
t = t.replace('publicDir: "client/kdd-public",', 'publicDir: "public",');
t = t.replace(/function copyAdmin\(\) \{[\s\S]*?\n\}\n/, `function copyAdmin() {
  const files = [["kdd-public/admin.html", "dist/admin.html"], ["client/kdd-public/_redirects", "dist/_redirects"]];
  return {
    name: "copy-extra",
    closeBundle() {
      for (const [from, to] of files) {
        try { fsx.copyFileSync(from, to); } catch (e) { console.warn("skip " + from); }
      }
    },
  };
}
`);
fs.writeFileSync("vite.config.ts", t);
if (!fs.existsSync("public/media/kdcow-ad.jpg")) {
  fs.copyFileSync("src/kdd/assets/checkout-hero.jpg", "public/media/kdcow-ad.jpg");
  console.log("ad image seeded");
}
console.log("patched");
