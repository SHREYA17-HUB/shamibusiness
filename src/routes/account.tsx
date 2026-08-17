import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  FileText,
  Heart,
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
  Star,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { PanelLayout } from "@/components/panel/PanelLayout";
import { DataTable, Panel, StatCard, StatusBadge } from "@/components/panel/widgets";
import { addresses, inr, orders, orderStages, reviews } from "@/lib/data";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | Shami Business Ventures" },
      { name: "description", content: "Track orders, manage addresses, reviews and invoices in your Shami account." },
      { property: "og:title", content: "My Account | Shami" },
      { property: "og:description", content: "Orders, tracking, wishlist, addresses and invoices." },
    ],
  }),
  component: Account,
});

const nav = [
  { label: "Dashboard", to: "/account", icon: LayoutDashboard },
  { label: "My Profile", to: "/account", icon: User },
  { label: "My Orders", to: "/account", icon: Package },
  { label: "Track Orders", to: "/account", icon: Truck },
  { label: "Wishlist", to: "/wishlist", icon: Heart },
  { label: "Saved Addresses", to: "/account", icon: MapPin },
  { label: "Reviews & Ratings", to: "/account", icon: Star },
  { label: "Notifications", to: "/account", icon: Bell },
  { label: "Invoices", to: "/account", icon: FileText },
  { label: "Account Settings", to: "/account", icon: Settings },
];

function Account() {
  const active = orders[0]!;
  const stageIndex = orderStages.indexOf(active.status as (typeof orderStages)[number]);

  return (
    <PanelLayout items={nav} tone="customer" title="My Dashboard" subtitle="Welcome back, Rahul Deshpande">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Orders" value="24" delta="+12%" icon={Package} />
        <StatCard label="Total Spend" value={inr(148500)} delta="+8%" icon={Wallet} highlight />
        <StatCard label="Active Deliveries" value="3" icon={Truck} />
        <StatCard label="Wishlist Items" value="2" icon={Heart} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Panel title="Recent Orders">
          <DataTable
            columns={["Order", "Date", "Vendor", "Amount", "Payment", "Status", "Actions"]}
            rows={orders.slice(0, 6).map((o) => [
              <span className="font-semibold text-navy">{o.id}</span>,
              o.date,
              o.items[0]!.vendor,
              inr(o.amount),
              <StatusBadge status={o.payment} />,
              <StatusBadge status={o.status} />,
              <span className="flex gap-2 text-xs font-semibold">
                <button className="text-navy hover:text-gold">View</button>
                <button className="text-navy hover:text-gold">Invoice</button>
              </span>,
            ])}
          />
        </Panel>

        <Panel title={`Tracking ${active.id}`}>
          <ol className="space-y-4">
            {orderStages.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span
                  className={
                    i <= stageIndex
                      ? "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gold"
                      : "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-border"
                  }
                />
                <div className="min-w-0">
                  <p className={i <= stageIndex ? "text-sm font-semibold text-navy" : "text-sm text-slate"}>{s}</p>
                  <p className="text-xs text-slate">{i <= stageIndex ? "16 Aug 2026 · 10:24 AM" : "Pending"}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Saved Addresses">
          <div className="space-y-3">
            {addresses.map((a) => (
              <div key={a.id} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold tracking-wider text-gold uppercase">{a.label}</p>
                  {a.default && <StatusBadge status="Active" />}
                </div>
                <p className="mt-1 font-semibold text-navy">
                  {a.name} · {a.phone}
                </p>
                <p className="text-sm text-slate">
                  {a.line}, {a.city}, {a.state} {a.pin}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="My Reviews">
          <div className="space-y-4">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-gold">
                    <Star className="h-3 w-3 fill-gold" /> {r.rating}
                  </span>
                  <p className="truncate font-semibold text-navy">{r.product}</p>
                </div>
                <p className="mt-1 text-sm text-charcoal">{r.body}</p>
                <p className="mt-1 text-xs text-slate">{r.date}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </PanelLayout>
  );
}