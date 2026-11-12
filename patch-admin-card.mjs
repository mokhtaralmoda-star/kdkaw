import fs from "fs";
const p="server/admin/index.html";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
if(s.includes("_d.submitted ? ' style=\"display:none\"'")){console.log("ALREADY");process.exit(0);}
const re=/(\+ '<\/h3>';\s*\n\s*)html \+= '<div class="bg-white p-4 rounded-lg border border-purple-200">';/;
if(!re.test(s)){console.log("ANCHOR FAIL");process.exit(1);}
s=s.replace(re, "$1html += '<div class=\"bg-white p-4 rounded-lg border border-purple-200\"' + (_d.submitted ? ' style=\"display:none\"' : '') + '>';");
fs.writeFileSync(p,s,"utf8");
console.log("ADMIN CARD HIDDEN IN OTP");
