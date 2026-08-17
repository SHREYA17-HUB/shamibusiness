import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Package, ShoppingCart, Wallet } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PanelLayout } from "@/components/panel/PanelLayout";
import { DataTable, Filters, Panel, StatCard, StatusBadge } from "@/components/panel/widgets";
import { vendorNav } from "@/lib/panel-nav";
import { inr, products, salesSeries, vendorSubOrders } from "@/lib/data";

export const Route = createFileRoute("/vendor/dashboard")({
  head: () => ({
    meta: [
      { title: "Vendor Dashboard | Shami Business Ventures" },
      { name: "description", content: "Vendor sales, orders, stock and payout overview." },
      { property: "og:title", content: "Vendor Dashboard | Shami" },
      { property: "og:description", content: "Operational overview for Shami marketplace vendors." },
    ],
  }),
  component: VendorDashboard,
});

function VendorDashboard() {
  const mine = products.filter((p) => p.vendorId === "V01");
  const myOrders = vendorSubOrders.filter((o) => o.vendorId === "V01");

  return (
    <PanelLayout items={vendorNav} tone="vendor" title="Vendor Dashboard" subtitle="Shami Sugar Mills · Verified vendor">
      <Filters options={["Today", "This Week", "This Month", "This Year", "Custom Date"]} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Products" value={String(mine.length)} icon={Package} />
        <StatCard label="Pending Approval" value={String(mine.filter((p) => p.status === "pending").length)} icon={Boxes} />
        <StatCard label="Total Orders" value={String(myOrders.length * 34)} delta="+9%" icon={ShoppingCart} />
        <StatCard label="Net Earnings" value={inr(2560500)} delta="+14%" icon={Wallet} highlight />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Sales Overview">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesSeries}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--slate)" fontSize={12} />
                <YAxis stroke="var(--slate)" fontSize={12} tickFormatter={(v: number) => `${v / 100000}L`} />
                <Tooltip formatter={(v: number) => inr(v)} />
                <Line type="monotone" dataKey="revenue" stroke="var(--gold)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Orders Overview">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesSeries}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--slate)" fontSize={12} />
                <YAxis stroke="var(--slate)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="orders" fill="var(--navy)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <Panel title="Recent Orders">
          <DataTable
            columns={["Sub-order", "Master", "Customer", "Amount", "Payment", "Status"]}
            rows={myOrders.slice(0, 6).map((o) => [
              <span className="font-semibold text-navy">{o.id}</span>,
              o.master,
              o.customer,
              inr(o.amount),
              <StatusBadge status={o.payment} />,
              <StatusBadge status={o.status} />,
            ])}
          />
        </Panel>
        <Panel title="Top Products">
          <div className="space-y-4">
            {mine.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt={p.name} loading="lazy" width={800} height={800} className="h-11 w-11 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">{p.name}</p>
                  <p className="text-xs text-slate">{p.sold} units sold</p>
                </div>
                <p className="text-sm font-bold text-gold">{inr(p.price * p.sold)}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </PanelLayout>
  );
}