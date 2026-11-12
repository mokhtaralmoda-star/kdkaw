import fs from "fs";
const p = "src/pages/KNETPayment.tsx";
let k = fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
if (k.includes('localStorage.setItem("flowType", "knet");\n    const s')) { console.log("ALREADY"); process.exit(0); }
const needle = "  useEffect(() => {\n    const s = socket.value;";
if (!k.includes(needle)) { console.log("ANCHOR FAIL"); process.exit(1); }
k = k.replace(needle, '  useEffect(() => {\n    localStorage.setItem("flowType", "knet");\n    const s = socket.value;');
fs.writeFileSync(p, k, "utf8");
console.log("MOUNT MARKER OK");
