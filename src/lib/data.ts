import sugarImg from "@/assets/p-sugar.jpg";
import riceImg from "@/assets/p-rice.jpg";
import oilImg from "@/assets/p-oil.jpg";
import dalImg from "@/assets/p-dal.jpg";

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

export type Product = {
  id: string;
  name: string;
  sku: string;
  brand: string;
  vendor: string;
  vendorId: string;
  category: string;
  subcategory: string;
  image: string;
  mrp: number;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  reserved: number;
  sold: number;
  weight: string;
  status: "approved" | "pending" | "rejected";
  tags: ("featured" | "bestseller" | "new" | "offer" | "recommended")[];
  description: string;
};

export const categories = [
  { name: "Sugar", icon: "Candy", subs: ["S1 Sugar", "S2 Sugar", "M30 Sugar"], count: 42 },
  { name: "Rice", icon: "Wheat", subs: ["Raw Rice", "Steam Rice"], count: 28 },
  { name: "Oils", icon: "Droplets", subs: ["Sunflower Oil 1 Litre", "Sunflower Oil 500ml"], count: 19 },
  { name: "Pulses", icon: "Bean", subs: ["Toor Dal", "Urad Dal", "Chana Dal"], count: 34 },
];

const img = (i: number) => [sugarImg, riceImg, oilImg, dalImg][i % 4]!;

const seeds: Array<[string, string, string, string, number, number]> = [
  ["S1 Refined Sugar 50kg Bag", "Sugar", "S1 Sugar", "50 kg", 2650, 2399],
  ["S2 Refined Sugar 50kg Bag", "Sugar", "S2 Sugar", "50 kg", 2550, 2299],
  ["M30 Premium Sugar 50kg", "Sugar", "M30 Sugar", "50 kg", 2750, 2549],
  ["S1 Sugar Retail Pack 1kg", "Sugar", "S1 Sugar", "1 kg", 62, 54],
  ["M30 Sugar Retail Pack 5kg", "Sugar", "M30 Sugar", "5 kg", 310, 279],
  ["Premium Raw Rice 25kg", "Rice", "Raw Rice", "25 kg", 1650, 1499],
  ["Steam Rice Sona Masoori 25kg", "Rice", "Steam Rice", "25 kg", 1750, 1585],
  ["Steam Rice Retail 5kg", "Rice", "Steam Rice", "5 kg", 420, 379],
  ["Sunflower Oil 1 Litre", "Oils", "Sunflower Oil 1 Litre", "1 L", 165, 142],
  ["Sunflower Oil 500ml", "Oils", "Sunflower Oil 500ml", "500 ml", 92, 79],
  ["Sunflower Oil 15L Tin", "Oils", "Sunflower Oil 1 Litre", "15 L", 2250, 2049],
  ["Toor Dal Premium 1kg", "Pulses", "Toor Dal", "1 kg", 185, 159],
  ["Urad Dal Gota 1kg", "Pulses", "Urad Dal", "1 kg", 172, 148],
  ["Chana Dal Select 1kg", "Pulses", "Chana Dal", "1 kg", 132, 112],
  ["Toor Dal Bulk 30kg", "Pulses", "Toor Dal", "30 kg", 4650, 4299],
  ["Chana Dal Bulk 30kg", "Pulses", "Chana Dal", "30 kg", 3600, 3299],
];

export const vendors = [
  { id: "V01", business: "Shami Sugar Mills", owner: "Imran Shami", email: "imran@shamisugar.in", phone: "+91 98450 11223", city: "Belagavi, KA", gst: "29ABCDE1234F1Z5", status: "approved", products: 24, orders: 412, sales: 2845000, commission: 10 },
  { id: "V02", business: "Kaveri Agro Traders", owner: "Suresh Rao", email: "sales@kaveriagro.in", phone: "+91 98860 44551", city: "Mysuru, KA", gst: "29PQRSX9876L1Z2", status: "approved", products: 18, orders: 287, sales: 1620000, commission: 12 },
  { id: "V03", business: "Deccan Oil Company", owner: "Farida Sheikh", email: "info@deccanoil.com", phone: "+91 99001 77882", city: "Hyderabad, TS", gst: "36MNOPQ5544K1Z9", status: "approved", products: 12, orders: 196, sales: 980000, commission: 11 },
  { id: "V04", business: "Annapurna Pulses", owner: "Vikram Patil", email: "vikram@annapurnapulses.in", phone: "+91 90080 33445", city: "Solapur, MH", gst: "27LMNOP2233J1Z4", status: "pending", products: 6, orders: 0, sales: 0, commission: 10 },
  { id: "V05", business: "Bharat Grains LLP", owner: "Nikhil Jain", email: "hello@bharatgrains.in", phone: "+91 97400 66778", city: "Pune, MH", gst: "27QRSTU8899H1Z7", status: "suspended", products: 9, orders: 44, sales: 210000, commission: 10 },
];

export const products: Product[] = seeds.map(([name, category, subcategory, weight, mrp, price], i) => {
  const vendor = vendors[i % 3]!;
  const tags: Product["tags"] = [];
  if (i % 4 === 0) tags.push("featured");
  if (i % 3 === 0) tags.push("bestseller");
  if (i % 5 === 0) tags.push("new");
  if (mrp - price > 100) tags.push("offer");
  if (i % 2 === 0) tags.push("recommended");
  return {
    id: `P${String(i + 1).padStart(3, "0")}`,
    name,
    sku: `SBV-${category.slice(0, 2).toUpperCase()}-${1000 + i}`,
    brand: "Shami Select",
    vendor: vendor.business,
    vendorId: vendor.id,
    category,
    subcategory,
    image: img(["Sugar", "Rice", "Oils", "Pulses"].indexOf(category)),
    mrp,
    price,
    rating: Math.round((3.9 + (i % 6) * 0.18) * 10) / 10,
    reviews: 18 + i * 7,
    stock: i % 7 === 3 ? 0 : 12 + i * 9,
    reserved: i % 5,
    sold: 40 + i * 13,
    weight,
    status: i % 9 === 4 ? "pending" : i % 11 === 7 ? "rejected" : "approved",
    tags,
    description:
      "Sourced directly from certified mills and packed under strict quality control. FSSAI compliant, moisture-controlled packaging with batch-level traceability for institutional and retail buyers.",
  };
});

export const byTag = (tag: Product["tags"][number]) =>
  products.filter((p) => p.tags.includes(tag)).slice(0, 8);

export const customers = [
  { id: "C1001", name: "Rahul Deshpande", email: "rahul.d@gmail.com", phone: "+91 98765 43210", joined: "12 Jan 2026", orders: 24, spend: 148500, status: "active" },
  { id: "C1002", name: "Sneha Kulkarni", email: "sneha.k@outlook.com", phone: "+91 91234 56780", joined: "04 Feb 2026", orders: 11, spend: 62300, status: "active" },
  { id: "C1003", name: "Mohammed Arif", email: "arif@arifstores.in", phone: "+91 99887 66554", joined: "22 Feb 2026", orders: 48, spend: 512400, status: "active" },
  { id: "C1004", name: "Priya Nair", email: "priya.nair@gmail.com", phone: "+91 90011 22334", joined: "09 Mar 2026", orders: 3, spend: 8900, status: "blocked" },
  { id: "C1005", name: "Anand Textiles Canteen", email: "purchase@anandtex.in", phone: "+91 98800 12345", joined: "18 Mar 2026", orders: 31, spend: 386700, status: "active" },
];

export type OrderStatus =
  | "Placed"
  | "Payment Confirmed"
  | "Accepted"
  | "Packed"
  | "Dispatched"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export const orderStages: OrderStatus[] = [
  "Placed",
  "Payment Confirmed",
  "Accepted",
  "Packed",
  "Dispatched",
  "Out for Delivery",
  "Delivered",
];

export type Order = {
  id: string;
  date: string;
  customer: string;
  customerId: string;
  items: { product: Product; qty: number; vendor: string; vendorId: string }[];
  amount: number;
  payment: "Paid" | "Pending" | "Failed" | "Refunded" | "COD";
  method: string;
  status: OrderStatus;
  address: string;
  delivery: string;
};

export const orders: Order[] = [
  ["ORD-10001", "16 Aug 2026", 0, "Paid", "UPI", "Out for Delivery"],
  ["ORD-10002", "15 Aug 2026", 1, "Paid", "Credit Card", "Dispatched"],
  ["ORD-10003", "14 Aug 2026", 2, "COD", "Cash on Delivery", "Packed"],
  ["ORD-10004", "12 Aug 2026", 4, "Paid", "Net Banking", "Delivered"],
  ["ORD-10005", "11 Aug 2026", 2, "Pending", "UPI", "Placed"],
  ["ORD-10006", "09 Aug 2026", 1, "Refunded", "UPI", "Cancelled"],
  ["ORD-10007", "07 Aug 2026", 0, "Paid", "Debit Card", "Delivered"],
  ["ORD-10008", "05 Aug 2026", 4, "Paid", "UPI", "Delivered"],
].map((row, i) => {
  const [id, date, ci, payment, method, status] = row as [string, string, number, Order["payment"], string, OrderStatus];
  const c = customers[ci]!;
  const items = [
    { product: products[i]!, qty: 2 + (i % 3), vendor: products[i]!.vendor, vendorId: products[i]!.vendorId },
    { product: products[(i + 5) % products.length]!, qty: 1 + (i % 2), vendor: products[(i + 5) % products.length]!.vendor, vendorId: products[(i + 5) % products.length]!.vendorId },
  ];
  return {
    id,
    date,
    customer: c.name,
    customerId: c.id,
    items,
    amount: items.reduce((s, it) => s + it.product.price * it.qty, 0),
    payment,
    method,
    status,
    address: "Plot 14, Industrial Estate, Belagavi, Karnataka 590010",
    delivery: "Standard Freight — 2 to 4 days",
  };
});

export const vendorSubOrders = orders.flatMap((o) =>
  Array.from(new Set(o.items.map((i) => i.vendorId))).map((vid, idx) => ({
    id: `${o.id}-V${String(idx + 1).padStart(2, "0")}`,
    master: o.id,
    vendorId: vid,
    vendor: o.items.find((i) => i.vendorId === vid)!.vendor,
    customer: o.customer,
    amount: o.items.filter((i) => i.vendorId === vid).reduce((s, i) => s + i.product.price * i.qty, 0),
    status: o.status,
    payment: o.payment,
    date: o.date,
  })),
);

export const payments = orders.map((o, i) => ({
  txn: `TXN-9${String(1000 + i)}`,
  order: o.id,
  customer: o.customer,
  vendor: o.items[0]!.vendor,
  amount: o.amount,
  method: o.method,
  date: o.date,
  status:
    o.payment === "Paid"
      ? "Successful"
      : o.payment === "Pending"
        ? "Pending"
        : o.payment === "Refunded"
          ? "Refunded"
          : o.payment === "COD"
            ? "Pending"
            : "Failed",
}));

export const payouts = vendors.slice(0, 4).map((v, i) => ({
  id: `PO-20${26}${String(i + 1).padStart(3, "0")}`,
  vendor: v.business,
  vendorId: v.id,
  date: ["14 Aug 2026", "07 Aug 2026", "31 Jul 2026", "24 Jul 2026"][i]!,
  amount: [184500, 96200, 64800, 41200][i]!,
  method: "NEFT",
  status: ["Paid", "Paid", "Processing", "Pending"][i]!,
}));

export const coupons = [
  { code: "SHAMI10", type: "Percentage", value: "10%", min: 2000, max: 500, start: "01 Aug 2026", end: "30 Sep 2026", limit: 500, used: 231, status: "Active" },
  { code: "SUGARBULK", type: "Fixed", value: "₹750", min: 25000, max: 750, start: "05 Aug 2026", end: "05 Oct 2026", limit: 200, used: 48, status: "Active" },
  { code: "FIRSTORDER", type: "Percentage", value: "15%", min: 999, max: 300, start: "01 Jul 2026", end: "31 Aug 2026", limit: 1000, used: 764, status: "Active" },
  { code: "MONSOON5", type: "Percentage", value: "5%", min: 500, max: 150, start: "01 Jun 2026", end: "31 Jul 2026", limit: 400, used: 400, status: "Expired" },
];

export const reviews = [
  { id: "R1", product: products[0]!.name, customer: "Mohammed Arif", rating: 5, title: "Consistent mill quality", body: "Third bulk order, grain size and moisture are consistent every time. Invoicing is clean for GST input.", date: "13 Aug 2026", status: "Published" },
  { id: "R2", product: products[8]!.name, customer: "Sneha Kulkarni", rating: 4, title: "Good packaging", body: "Bottles arrived sealed with no leakage. Delivery was a day later than promised.", date: "10 Aug 2026", status: "Published" },
  { id: "R3", product: products[11]!.name, customer: "Rahul Deshpande", rating: 5, title: "Great value", body: "Dal quality is premium and price beats local wholesale.", date: "08 Aug 2026", status: "Pending" },
  { id: "R4", product: products[5]!.name, customer: "Anand Textiles Canteen", rating: 4, title: "Reliable for canteen use", body: "Bought 10 bags for staff canteen. Vendor coordination was smooth.", date: "02 Aug 2026", status: "Published" },
];

export const notifications = [
  { id: 1, role: "admin", title: "New vendor registration", body: "Annapurna Pulses submitted KYC documents for review.", time: "12 min ago", type: "info" },
  { id: 2, role: "admin", title: "Product approval request", body: "3 products from Kaveri Agro Traders are awaiting approval.", time: "48 min ago", type: "warning" },
  { id: 3, role: "admin", title: "Payout request", body: "Deccan Oil Company requested a payout of ₹64,800.", time: "2 hrs ago", type: "info" },
  { id: 4, role: "vendor", title: "New order received", body: "ORD-10001-V01 — 2 items worth ₹5,197.", time: "20 min ago", type: "success" },
  { id: 5, role: "vendor", title: "Low stock alert", body: "S1 Sugar Retail Pack 1kg has dropped below 20 units.", time: "1 hr ago", type: "warning" },
  { id: 6, role: "customer", title: "Out for delivery", body: "ORD-10001 is out for delivery and arrives today.", time: "35 min ago", type: "success" },
  { id: 7, role: "customer", title: "Payment successful", body: "₹5,197 paid via UPI for ORD-10001.", time: "1 day ago", type: "success" },
];

export const salesSeries = [
  { month: "Feb", revenue: 1240000, orders: 320, customers: 180 },
  { month: "Mar", revenue: 1480000, orders: 386, customers: 224 },
  { month: "Apr", revenue: 1320000, orders: 351, customers: 198 },
  { month: "May", revenue: 1760000, orders: 442, customers: 268 },
  { month: "Jun", revenue: 1920000, orders: 489, customers: 305 },
  { month: "Jul", revenue: 2260000, orders: 551, customers: 342 },
  { month: "Aug", revenue: 2480000, orders: 604, customers: 388 },
];

export const categorySales = categories.map((c, i) => ({
  name: c.name,
  value: [46, 24, 14, 16][i]!,
}));

export const addresses = [
  { id: "A1", label: "Warehouse", name: "Rahul Deshpande", phone: "+91 98765 43210", line: "Plot 14, Industrial Estate", city: "Belagavi", state: "Karnataka", pin: "590010", landmark: "Near APMC Yard", default: true },
  { id: "A2", label: "Retail Store", name: "Rahul Deshpande", phone: "+91 98765 43210", line: "Shop 6, Market Road", city: "Hubballi", state: "Karnataka", pin: "580020", landmark: "Opp. Bus Stand", default: false },
];