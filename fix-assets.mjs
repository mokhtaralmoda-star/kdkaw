import fs from "node:fs";
fs.mkdirSync("client/kdd-public/media", { recursive: true });
fs.copyFileSync("src/kdd/assets/checkout-hero.jpg", "client/kdd-public/media/kdcow-ad.jpg");
fs.copyFileSync("client/kdd-public/favicon.png", "client/kdd-public/pwa-icon-192.png");
const manifest = {
  name: "KDCow",
  short_name: "KDCow",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#0f766e",
  icons: [
    { src: "/pwa-icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/favicon.png", sizes: "512x512", type: "image/png" }
  ]
};
fs.writeFileSync("client/kdd-public/manifest.json", JSON.stringify(manifest, null, 2), "utf8");
console.log("done");
