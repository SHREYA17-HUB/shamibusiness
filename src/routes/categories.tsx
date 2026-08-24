import { createFileRoute, Link } from "@tanstack/react-router";
import { Bean, Candy, Coffee, Droplets, Droplet, Flame, Nut, Sparkles, Wheat } from "lucide-react";
import { SiteLayout, Breadcrumbs, SectionHeading } from "@/components/site/SiteLayout";
import { storefrontCategories, isStorefrontProduct, products } from "@/lib/data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "S1 Sugar Categories | Shami Business Ventures" },
      {
        name: "description",
        content: "Explore S1 refined sugar categories — bulk bags, retail packs and specialty grades from verified mills.",
      },
      { property: "og:title", content: "S1 Sugar Categories | Shami Business Ventures" },
      { property: "og:description", content: "S1 sugar catalogue with live product counts and variants." },
    ],
  }),
  component: Categories,
});

const icons = { Candy, Wheat, Droplets, Bean, Droplet, Flame, Nut, Coffee, Sparkles } as const;

function Categories() {
  return (
    <SiteLayout>
      <div className="border-b border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Breadcrumbs items={[{ label: "Categories" }]} />
          <h1 className="mt-3 text-3xl font-bold text-navy">S1 Sugar Categories</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-6 py-12">
        {storefrontCategories.map((c) => {
          const Icon = icons[c.icon as keyof typeof icons] ?? Candy;
          const items = products.filter((p) => p.category === c.name && isStorefrontProduct(p)).slice(0, 4);
          return (
            <section key={c.name}>
              <SectionHeading
                eyebrow={`${c.count} products`}
                title={
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-ivory text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    {c.name}
                  </span>
                }
                action={
                  <Link
                    to="/shop"
                    search={{ category: c.name }}
                    className="text-sm font-semibold text-navy hover:text-gold"
                  >
                    Shop {c.name}
                  </Link>
                }
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {c.subs.map((s) => (
                  <Link
                    key={s}
                    to="/shop"
                    search={{ category: s }}
                    className="card-premium flex items-center justify-between p-5"
                  >
                    <span className="font-semibold text-navy">{s}</span>
                    <span className="text-xs text-gold">Browse →</span>
                  </Link>
                ))}
                {items.slice(0, 4 - c.subs.length > 0 ? 4 - c.subs.length : 0).map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="card-premium flex items-center gap-3 p-3"
                  >
                    <img src={p.image} alt={p.name} loading="lazy" width={800} height={800} className="h-14 w-14 rounded-md object-cover" />
                    <span className="min-w-0 text-sm font-medium text-navy">{p.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </SiteLayout>
  );
}