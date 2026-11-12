import fs from "fs";
const p="src/pages/KNETPayment.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
if(s.includes('{isWaiting && phase === "card" && (')){console.log("ALREADY");process.exit(0);}
if(!s.includes("{isWaiting && (")){console.log("ANCHOR FAIL");process.exit(1);}
s=s.replace("{isWaiting && (",'{isWaiting && phase === "card" && (');
fs.writeFileSync(p,s,"utf8");
console.log("OVERLAY GATED");
