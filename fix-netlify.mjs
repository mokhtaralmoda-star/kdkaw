import fs from "node:fs";
let t = fs.readFileSync("netlify.toml", "utf8");
const n = t.split("https://sejel-server-zygy.onrender.com").length - 1;
t = t.split("https://sejel-server-zygy.onrender.com").join("https://makanifoods-anf8.onrender.com");
fs.writeFileSync("netlify.toml", t);
console.log("replaced " + n);
