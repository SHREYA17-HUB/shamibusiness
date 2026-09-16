import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Search, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inr, isStorefrontProduct, storeCategorySeed, type Product } from "@/lib/data";
import { useApp } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import heroImg from "@/assets/hero-sugar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shami Business Ventures | Rice, Sugar & Oil" },
      {
        name: "description",
        content: "Find and buy quality rice, sugar and oil products with ease at Shami Business Ventures.",
      },
      { property: "og:title", content: "Shami Business Ventures | Rice, Sugar & Oil" },
      {
        property: "og:description",
        content: "Buy quality grocery products from verified vendors, all in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { products } = useApp();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const popularProducts = products.filter(isStorefrontProduct).slice(0, 8);

  const searchProducts = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({ to: "/shop", search: { q: query.trim() } });
  };

  return (
    <SiteLayout>
      <section className="relative isolate min-h-[430px] overflow-hidden bg-midnight sm:min-h-[500px]">
        <img
          src={heroImg}
          alt="Premium sugar and grocery products"
          width={1408}
          height={1008}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/25" />
        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-4 py-12 sm:min-h-[500px] sm:px-6 sm:py-16">
          <div className="animate-rise w-full max-w-2xl">
            <p className="text-sm font-bold text-gold" data-no-translate>Shami Business Ventures</p>
            <h1 className="mt-3 max-w-2xl text-3xl leading-tight font-extrabold text-white sm:text-5xl">
              Quality products you need, all in one place
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Find and buy rice, sugar and oil products with ease.
            </p>
            <form onSubmit={searchProducts} className="mt-7 flex max-w-xl gap-2 rounded-lg bg-card p-2 shadow-elevated">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("Find the product you need")}
                  aria-label={t("Search products")}
                  className="h-12 border-0 bg-transparent pl-10 shadow-none focus-visible:ring-0"
                />
              </div>
              <Button type="submit" className="h-12 shrink-0 px-5 font-bold">
                <Search className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild size="lg" className="h-11 bg-gold font-bold text-midnight hover:bg-gold-light">
                <Link to="/shop">Shop now <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 border-white/40 bg-midnight/20 text-white hover:bg-card hover:text-navy">
                <Link to="/cart"><ShoppingCart /> Cart</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ivory">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-4 py-5 sm:gap-6 sm:px-6">
          {[
            [ShieldCheck, "Verified sellers"],
            [BadgeCheck, "Quality assured"],
            [Truck, "Delivery across India"],
          ].map(([Icon, label]) => {
            const TrustIcon = Icon as typeof ShieldCheck;
            return (
              <div key={label as string} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-navy/5 text-gold sm:h-10 sm:w-10">
                  <TrustIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="text-[11px] font-semibold leading-4 text-navy sm:text-sm">{label as string}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-gold">Choose with ease</p>
            <h2 className="mt-1 text-2xl font-bold text-navy sm:text-3xl">Shop by Category</h2>
          </div>
          <Link to="/categories" className="shrink-0 text-sm font-semibold text-navy transition-colors hover:text-gold">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {storeCategorySeed.map((category) => {
            const slug = category.name.toLowerCase();
            return (
              <Link
                key={category.id}
                to="/categories/$slug"
                params={{ slug }}
                className="group flex min-w-0 flex-col items-center rounded-lg border border-border bg-card px-2 py-4 text-center shadow-card transition-all hover:-translate-y-1 hover:border-gold hover:shadow-elevated sm:px-5 sm:py-7"
              >
                <span className="block aspect-square w-full max-w-28 overflow-hidden rounded-full bg-ivory ring-4 ring-ivory sm:max-w-40">
                  <img
                    src={category.image}
                    alt={t(category.name)}
                    width={640}
                    height={640}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="mt-3 text-base font-bold text-navy sm:text-xl">{category.name}</span>
                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-gold sm:text-sm">
                  View <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-gold">Picked for you</p>
              <h2 className="mt-1 text-2xl font-bold text-navy sm:text-3xl">Popular Products</h2>
            </div>
            <Link to="/shop" className="shrink-0 text-sm font-semibold text-navy transition-colors hover:text-gold">
              View all
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {popularProducts.map((product) => <HomeProductCard key={product.id} product={product} />)}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="h-11 px-7 font-bold">
              <Link to="/shop">All Products <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function HomeProductCard({ product }: { product: Product }) {
  const { addToCart } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const add = () => {
    addToCart(product.id);
    toast.success(t("Added to cart"), { description: t(product.name) });
  };

  const buy = () => {
    addToCart(product.id);
    navigate({ to: "/checkout" });
  };

  return (
    <article className="grid min-h-32 grid-cols-[104px_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-card shadow-card sm:flex sm:min-h-0 sm:flex-col">
      <Link to="/product/$id" params={{ id: product.id }} className="relative block overflow-hidden bg-background sm:aspect-square">
        <img src={product.image} alt={product.name} width={600} height={600} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-gold px-2 py-1 text-[10px] font-bold text-midnight" data-no-translate>{discount}% OFF</span>
        )}
      </Link>
      <div className="flex min-w-0 flex-col p-3 sm:p-4">
        <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 text-sm font-semibold leading-5 text-navy hover:text-gold sm:text-base">
          {product.name}
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="font-bold text-navy" data-no-translate>{inr(product.price)}</span>
          {discount > 0 && <span className="text-xs text-slate line-through" data-no-translate>{inr(product.mrp)}</span>}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
          <Button type="button" variant="outline" size="sm" onClick={add} disabled={product.stock === 0} className="h-9 px-2 font-bold">
            <ShoppingCart /> Add
          </Button>
          <Button type="button" size="sm" onClick={buy} disabled={product.stock === 0} className="h-9 px-2 font-bold">
            Buy Now
          </Button>
        </div>
      </div>
    </article>
  );
}
