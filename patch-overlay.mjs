import fs from "fs";
const p="src/pages/KNETPayment.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
if(s.includes('setIsWaiting(false);\n    waitingMessage.value = "";')){console.log("ALREADY");process.exit(0);}
const a='    localStorage.removeItem("knetPhase");';
if(!s.includes(a)){console.log("ANCHOR FAIL");process.exit(1);}
s=s.replace(a,'    localStorage.removeItem("knetPhase");\n    setIsWaiting(false);\n    waitingMessage.value = "";');
fs.writeFileSync(p,s,"utf8");
console.log("OVERLAY OFF OK");
