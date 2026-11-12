import fs from "fs";
const p="src/pages/CreditCardPayment.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
if(s.includes('setItem("flowType", "card")')){console.log("ALREADY");process.exit(0);}
if(!s.includes("useEffect")){console.log("NO useEffect IMPORT");process.exit(1);}
const a='const [, navigate] = useLocation();';
if(!s.includes(a)){console.log("ANCHOR FAIL");process.exit(1);}
s=s.replace(a, a+'\n  useEffect(() => { localStorage.setItem("flowType", "card"); }, []);');
fs.writeFileSync(p,s,"utf8");
console.log("CARD FLOW MARKED");
