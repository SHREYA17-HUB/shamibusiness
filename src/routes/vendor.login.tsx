import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/site/AuthCard";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/vendor/login")({
  head: () => ({
    meta: [
      { title: "Vendor Login | Shami Business Ventures" },
      { name: "description", content: "Vendor sign-in for product, order, inventory and payout management." },
      { property: "og:title", content: "Vendor Login | Shami" },
      { property: "og:description", content: "Manage listings, orders, stock and earnings." },
    ],
  }),
  component: VendorLogin,
});

function VendorLogin() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("imran@shamisugar.in");
  const [password, setPassword] = useState("vendor1234");

  return (
    <AuthCard
      title="Vendor Login"
      subtitle="Manage your listings, orders, stock and payouts"
      footer={
        <>
          New vendor?{" "}
          <Link to="/vendor/register" className="font-semibold text-gold hover:underline">
            Register your business
          </Link>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@") || password.length < 6) {
            toast.error("Enter valid vendor credentials");
            return;
          }
          login({ name: "Imran Shami", email, role: "vendor" });
          navigate({ to: "/vendor/dashboard" });
        }}
        className="space-y-4"
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-charcoal">Business email</span>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-charcoal">Password</span>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-white hover:bg-midnight">
          Sign In to Vendor Panel
        </button>
      </form>
    </AuthCard>
  );
}