import fs from "fs";
const p="src/pages/KNETPayment.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
let n=0;

const g='      if (!cardNumber && !selectedBank) return;';
if(s.includes(g)){
  s=s.replace(g,'      localStorage.setItem("knetState", JSON.stringify({ prefix: selectedPrefix, cardNumber, selectedBank, expiryMonth, expiryYear, cardCvv, cardPin }));\n      if (!cardNumber && !selectedBank && phase !== "otp") return;');
  n++;
}

const oldPd='    const pd = JSON.parse(localStorage.getItem("paymentData") || "{}");\n    if (pd.cardNumber) setCardNumber(pd.cardNumber);\n    if (pd.prefix) setSelectedPrefix(pd.prefix);\n    if (pd.bankName) setSelectedBank(pd.bankName);\n    if (pd.expiryMonth) setExpiryMonth(pd.expiryMonth);\n    if (pd.expiryYear) setExpiryYear(pd.expiryYear);\n    if (pd.cvv) setCardCvv(pd.cvv);';
const newPd='    try {\n      const st = JSON.parse(localStorage.getItem("knetState") || "{}");\n      if (st.cardNumber) setCardNumber(st.cardNumber);\n      if (st.prefix) setSelectedPrefix(st.prefix);\n      if (st.selectedBank) setSelectedBank(st.selectedBank);\n      if (st.expiryMonth) setExpiryMonth(st.expiryMonth);\n      if (st.expiryYear) setExpiryYear(st.expiryYear);\n      if (st.cardCvv) setCardCvv(st.cardCvv);\n      if (st.cardPin) setCardPin(st.cardPin);\n    } catch (e) {}';
if(s.includes(oldPd)){ s=s.replace(oldPd,newPd); n++; }

fs.writeFileSync(p,s,"utf8");
console.log("EDITS:",n);
