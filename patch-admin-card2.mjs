import fs from "fs";
const p="server/admin/index.html";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
if(s.includes('_d.submitted ? \' style="display:none"\'')){console.log("ALREADY");process.exit(0);}
const i=s.indexOf("_d.submitted ? '' :");
if(i<0){console.log("MARK FAIL");process.exit(1);}
const needle='border border-purple-200">\';';
const j=s.indexOf(needle,i);
if(j<0){console.log("DIV FAIL");process.exit(1);}
const rep='border border-purple-200"\' + (_d.submitted ? \' style="display:none"\' : \'\') + \'>\';';
s=s.slice(0,j)+rep+s.slice(j+needle.length);
fs.writeFileSync(p,s,"utf8");
console.log("ADMIN CARD HIDDEN IN OTP");
