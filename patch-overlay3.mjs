import fs from "fs";
const p="src/pages/KNETPayment.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
const a='{isWaiting && phase === "card" && (';
if(!s.includes(a)){console.log("ALREADY");process.exit(0);}
s=s.replace(a,"{isWaiting && (");
fs.writeFileSync(p,s,"utf8");
console.log("OVERLAY RESTORED");
