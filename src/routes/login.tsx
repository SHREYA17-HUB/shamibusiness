import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/site/AuthCard";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Customer Login | Shami Business Ventures" },
      { name: "description", content: "Sign in to track orders, manage addresses and download GST invoices." },
      { property: "og:title", content: "Customer Login | Shami" },
      { property: "og:description", content: "Access your Shami marketplace account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("rahul.d@gmail.com");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      toast.error("Enter a valid email and a password of at least 6 characters");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login({ name: "Rahul Deshpande", email, role: "customer" });
      toast.success("Welcome back");
      navigate({ to: "/account" });
    }, 700);
  };

  return (
    <AuthCard
      title="Customer Login"
      subtitle="Sign in to your Shami marketplace account"
      footer={
        <>
          New to Shami?{" "}
          <Link to="/register" className="font-semibold text-gold hover:underline">
            Create an account
          </Link>
          <div className="mt-2 text-xs">
            Vendor?{" "}
            <Link to="/vendor/login" className="font-semibold text-navy hover:text-gold">
              Vendor login
            </Link>{" "}
            · Admin?{" "}
            <Link to="/admin/login" className="font-semibold text-navy hover:text-gold">
              Admin login
            </Link>
          </div>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-charcoal">Email</span>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-charcoal">Password</span>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button
          disabled={loading}
          className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-midnight disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}