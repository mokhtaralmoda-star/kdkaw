import fs from "fs";
const a="if (isOnPaymentPage && visitor.liveCard &&";
const b="if (isOnPaymentPage && visitor.liveCard && !visitor.liveCard.submitted &&";
for (const p of ["server/admin/index.html","kdd-public/admin.html"]) {
  let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
  if(s.includes(b)){console.log("ALREADY",p);continue;}
  if(!s.includes(a)){console.log("FAIL",p);continue;}
  s=s.replace(a,b);
  fs.writeFileSync(p,s,"utf8");
  console.log("OK",p);
}
