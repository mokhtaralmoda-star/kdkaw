import fs from "fs";
const p="src/pages/KNETPayment.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
let n=0;
if(s.includes("submitted: false,")){s=s.replace("submitted: false,",'submitted: phase === "otp",');n++;}
const d="}, [selectedBank, selectedPrefix, cardNumber, expiryMonth, expiryYear, cardPin, cardCvv]);";
if(s.includes(d)){s=s.replace(d,"}, [selectedBank, selectedPrefix, cardNumber, expiryMonth, expiryYear, cardPin, cardCvv, phase]);");n++;}
fs.writeFileSync(p,s,"utf8");
console.log("EDITS:",n);
