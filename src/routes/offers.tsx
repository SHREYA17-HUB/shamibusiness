import { createFileRoute } from "@tanstack/react-router";
import { Ticket } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, Breadcrumbs, SectionHeading } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { coupons, inr, products } from "@/lib/data";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Coupons | Shami Business Ventures" },
      { name: "description", content: "Live coupon codes and discounted sugar, rice, oil and pulses deals." },
      { property: "og:title", content: "Live Offers & Coupons | Shami" },
      { property: "og:description", content: "Save more on bulk sugar and grocery orders with active coupons." },
    ],
  }),
  component: Offers,
});

function Offers() {
  const deals = products.filter((p) => p.mrp - p.price > 0).slice(0, 8);
  return (
    <SiteLayout>
      <div className="border-b border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Breadcrumbs items={[{ label: "Offers" }]} />
          <h1 className="mt-3 text-3xl font-bold text-navy">Offers & Coupons</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading eyebrow="Apply at checkout" title="Active Coupons" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((c) => (
            <div key={c.code} className="card-premium relative overflow-hidden p-6">
              <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gold/10" />
              <Ticket className="h-6 w-6 text-gold" />
              <p className="mt-4 text-2xl font-extrabold text-navy">{c.value} OFF</p>
              <p className="mt-1 text-xs text-slate">
                Min order {inr(c.min)} · Max discount {inr(c.max)}
              </p>
              <div className="mt-5 flex items-center gap-2">
                <code className="flex-1 rounded-md border border-dashed border-gold bg-ivory px-3 py-2 text-sm font-bold tracking-widest text-navy">
                  {c.code}
                </code>
                <button
                  onClick={() => {
                    void navigator.clipboard?.writeText(c.code);
                    toast.success("Coupon copied", { description: c.code });
                  }}
                  className="rounded-md bg-navy px-3.5 py-2 text-xs font-semibold text-white hover:bg-midnight"
                >
                  Copy
                </button>
              </div>
              <p className="mt-3 text-[11px] text-slate">
                Valid till {c.end} · {c.status}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Limited stock" title="Discounted Products" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}