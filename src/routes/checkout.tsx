import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, Breadcrumbs } from "@/components/site/SiteLayout";
import { addresses, inr } from "@/lib/data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | Shami Business Ventures" },
      { name: "description", content: "Complete your order with UPI, cards, net banking or cash on delivery." },
      { property: "og:title", content: "Secure Checkout | Shami" },
      { property: "og:description", content: "Address, delivery, payment and order review in one flow." },
    ],
  }),
  component: Checkout,
});

const steps = ["Address", "Delivery", "Payment", "Review", "Confirmation"];
const methods = ["UPI", "Credit Card", "Debit Card", "Net Banking", "Cash on Delivery"];

function Checkout() {
  const { cartItems, subtotal, clearCart } = useApp();
  const [step, setStep] = useState(0);
  const [addr, setAddr] = useState(addresses[0]!.id);
  const [ship, setShip] = useState("Standard");
  const [method, setMethod] = useState("UPI");
  const shipCost = ship === "Express" ? 650 : subtotal > 10000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipCost + tax;

  return (
    <SiteLayout>
      <div className="border-b border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Breadcrumbs items={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
          <h1 className="mt-3 text-3xl font-bold text-navy">Checkout</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <ol className="mb-10 flex flex-wrap gap-x-6 gap-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-sm">
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full text-xs font-bold",
                  i < step ? "bg-gold text-midnight" : i === step ? "bg-navy text-white" : "bg-muted text-slate",
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={cn("font-semibold", i === step ? "text-navy" : "text-slate")}>{s}</span>
            </li>
          ))}
        </ol>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-lg border border-border bg-card p-6 shadow-card">
            {step === 0 && (
              <>
                <h2 className="text-lg font-bold text-navy">Delivery Address</h2>
                <div className="mt-5 space-y-3">
                  {addresses.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAddr(a.id)}
                      className={cn(
                        "w-full rounded-lg border p-4 text-left transition-colors",
                        addr === a.id ? "border-gold bg-ivory" : "border-border hover:border-gold",
                      )}
                    >
                      <p className="text-xs font-bold tracking-wider text-gold uppercase">{a.label}</p>
                      <p className="mt-1 font-semibold text-navy">
                        {a.name} · {a.phone}
                      </p>
                      <p className="text-sm text-slate">
                        {a.line}, {a.city}, {a.state} {a.pin} ({a.landmark})
                      </p>
                    </button>
                  ))}
                  <button className="text-sm font-semibold text-navy hover:text-gold">+ Add new address</button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-lg font-bold text-navy">Delivery Option</h2>
                <div className="mt-5 space-y-3">
                  {[
                    ["Standard", "2–4 business days", subtotal > 10000 ? "Free" : inr(250)],
                    ["Express", "Next business day", inr(650)],
                  ].map(([name, desc, cost]) => (
                    <button
                      key={name}
                      onClick={() => setShip(name!)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg border p-4 text-left",
                        ship === name ? "border-gold bg-ivory" : "border-border hover:border-gold",
                      )}
                    >
                      <span>
                        <span className="block font-semibold text-navy">{name} Freight</span>
                        <span className="text-sm text-slate">{desc}</span>
                      </span>
                      <span className="font-bold text-gold">{cost}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg font-bold text-navy">Payment Method</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {methods.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 text-sm font-semibold",
                        method === m ? "border-gold bg-ivory text-navy" : "border-border text-slate hover:border-gold",
                      )}
                    >
                      <CreditCard className="h-4 w-4 text-gold" /> {m}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-lg font-bold text-navy">Order Review</h2>
                <div className="mt-5 space-y-3">
                  {cartItems.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3 border-b border-border pb-3 last:border-0">
                      <img src={product.image} alt={product.name} loading="lazy" width={800} height={800} className="h-14 w-14 rounded-md object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-navy">{product.name}</p>
                        <p className="text-xs text-slate">
                          {product.vendor} · Qty {qty}
                        </p>
                      </div>
                      <p className="font-semibold text-navy">{inr(product.price * qty)}</p>
                    </div>
                  ))}
                </div>
                <dl className="mt-5 space-y-1.5 text-sm text-slate">
                  <div>Address: {addresses.find((a) => a.id === addr)?.line}</div>
                  <div>Delivery: {ship} Freight</div>
                  <div>Payment: {method}</div>
                </dl>
              </>
            )}

            {step === 4 && (
              <div className="py-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
                  <Check className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-navy">Order Confirmed</h2>
                <p className="mt-2 text-sm text-slate">
                  Order ID <span className="font-bold text-gold">ORD-10009</span> · Payment{" "}
                  {method === "Cash on Delivery" ? "pending (COD)" : "successful"} · Estimated delivery in{" "}
                  {ship === "Express" ? "1 day" : "2–4 days"}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link to="/account" className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-midnight">
                    Track Order
                  </Link>
                  <Link to="/shop" className="rounded-md border border-navy px-6 py-3 text-sm font-semibold text-navy hover:bg-navy hover:text-white">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}

            {step < 4 && (
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  className="rounded-md border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (step === 3) {
                      clearCart();
                      toast.success("Order placed", { description: "ORD-10009 confirmed" });
                    }
                    setStep(step + 1);
                  }}
                  className="rounded-md bg-gold px-6 py-2.5 text-sm font-bold text-midnight transition-colors hover:bg-gold-light"
                >
                  {step === 3 ? "Place Order" : "Continue"}
                </button>
              </div>
            )}
          </div>

          <aside className="h-max rounded-lg border border-border bg-card p-6 shadow-card">
            <h2 className="text-sm font-bold tracking-wide text-navy uppercase">Summary</h2>
            <div className="mt-4 space-y-2.5 text-sm">
              {[
                ["Subtotal", inr(subtotal)],
                ["Delivery", shipCost === 0 ? "Free" : inr(shipCost)],
                ["GST (5%)", inr(tax)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate">{k}</span>
                  <span className="font-semibold text-navy">{v}</span>
                </div>
              ))}
              <div className="hairline-gold my-2" />
              <div className="flex justify-between text-base font-bold text-navy">
                <span>Total</span>
                <span>{inr(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}