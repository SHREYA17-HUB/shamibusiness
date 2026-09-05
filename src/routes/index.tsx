import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Headset,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SiteLayout, SectionHeading } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { byTag, isStorefrontProduct, products } from "@/lib/data";
import { CategoryCards } from "@/components/site/CategoryCards";
import heroImg from "@/assets/hero-sugar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shami Business Ventures — Rice, Sugar & Oil Marketplace" },
      {
        name: "description",
        content:
          "Buy premium rice, S1 refined sugar and edible oils from verified mills. Bulk bags, retail packs, GST invoicing and pan-India delivery by Shami Business Ventures Pvt. Ltd.",
      },
      { property: "og:title", content: "Rice, Sugar & Oil Marketplace | Shami Business Ventures" },
      {
        property: "og:description",
        content: "Quality rice, sugar and oil delivered to your door from trusted mills.",
      },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gold/8 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
              Shami Business Ventures Pvt. Ltd.
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-6xl">
              Premium S1 Sugar <br />
              Delivered to <span className="text-gold-gradient">Your Door</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              Shop S1 refined sugar directly from certified mills. Batch traceability, moisture-controlled packaging
              and GST-compliant invoicing for retail and institutional buyers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-sm font-bold text-midnight transition-colors hover:bg-gold-light"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
              >
                Explore Products
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                ["120+", "Verified vendors"],
                ["18,400+", "Orders fulfilled"],
                ["4.8/5", "Buyer rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-xl font-bold text-gold sm:text-2xl">{v}</dt>
                  <dd className="mt-1 text-xs text-white/60">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="animate-float relative rounded-2xl border border-gold/25 bg-white/5 p-3 shadow-elevated backdrop-blur-sm">
              <img
                src={heroImg}
                alt="Premium refined sugar in a burlap sack with a gold scoop"
                width={1408}
                height={1008}
                className="w-full rounded-xl object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-xl border border-border bg-card p-4 shadow-elevated sm:block">
              <p className="text-[11px] font-semibold tracking-wider text-slate uppercase">Starting from</p>
              <p className="text-xl font-bold text-navy">
                ₹2,299 <span className="text-xs font-medium text-slate">/ 50kg bag</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [ShieldCheck, "Verified Vendors", "KYC & GST validated mills"],
            [Truck, "Pan-India Freight", "Tracked delivery in 2–4 days"],
            [BadgeCheck, "FSSAI Compliant", "Batch-level quality reports"],
            [Headset, "Dedicated Support", "Account manager for bulk buyers"],
          ].map(([Icon, title, sub]) => {
            const I = Icon as React.ComponentType<{ className?: string }>;
            return (
              <div key={title as string} className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy/5 text-gold">
                  <I className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-navy">{title as string}</p>
                  <p className="text-xs text-slate">{sub as string}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading
          eyebrow="Browse the catalogue"
          title="Shop by Category"
          action={
            <Link to="/categories" className="hidden text-sm font-semibold text-navy hover:text-gold sm:block">
              View all
            </Link>
          }
        />
        <CategoryCards />
      </section>

      <ProductRow eyebrow="Handpicked" title="Featured Products" items={byTag("featured")} />
      <section className="bg-ivory">
        <ProductRow eyebrow="Most ordered" title="Best Sellers" items={byTag("bestseller")} />
      </section>
      <ProductRow eyebrow="Fresh in store" title="New Arrivals" items={byTag("new")} />

      {/* Offer banner */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-hero-gradient px-8 py-14 text-center">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,var(--gold),transparent_40%)]" />
          <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">Bulk buyer offer</p>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Save up to <span className="text-gold">₹750</span> on orders above ₹25,000
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Use code SUGARBULK at checkout. Applicable on S1, S2 and M30 sugar bags from verified mills.
          </p>
          <Link
            to="/offers"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-sm font-bold text-midnight transition-colors hover:bg-gold-light"
          >
            View All Offers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <ProductRow eyebrow="Picked for you" title="Recommended Products" items={byTag("recommended")} />
      <section className="bg-ivory">
        <ProductRow eyebrow="Continue where you left" title="Recently Viewed" items={products.filter((p) => isStorefrontProduct(p)).slice(0, 4)} />
      </section>
    </SiteLayout>
  );
}

function ProductRow({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: ReturnType<typeof byTag>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        action={
          <Link to="/shop" className="hidden text-sm font-semibold text-navy hover:text-gold sm:block">
            View all
          </Link>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
