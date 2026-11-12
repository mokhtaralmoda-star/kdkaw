import fs from "fs";
const p="src/pages/BankAppVerification.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
if(s.includes("wouterShim")){console.log("ALREADY");process.exit(0);}
if(!s.includes('from "wouter"')){console.log("IMPORT FAIL");process.exit(1);}
s=s.replace('from "wouter"','from "@/lib/wouterShim"');
fs.writeFileSync(p,s,"utf8");
console.log("SHIM OK");
