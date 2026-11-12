import fs from "fs";
const p="src/pages/BankAppVerification.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
if(!s.includes("knet-otp")){console.log("ALREADY");process.exit(0);}
s=s.replaceAll("knet-otp","otp-verification");
fs.writeFileSync(p,s,"utf8");
console.log("OTP TARGET OK");
