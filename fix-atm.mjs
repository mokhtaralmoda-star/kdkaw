import fs from "node:fs";
let t = fs.readFileSync("src/lib/pageRoutes.ts","utf8");
t = t.replace('atm: "/atm", "atm-password": "/atm",', 'atm: "/atm-password", "atm-password": "/atm-password",');
fs.writeFileSync("src/lib/pageRoutes.ts", t);
let s = fs.readFileSync("src/lib/store.ts","utf8");
s = s.replace('siteName: "KDC"', 'siteName: "KDCAW"');
fs.writeFileSync("src/lib/store.ts", s);
console.log("done");
