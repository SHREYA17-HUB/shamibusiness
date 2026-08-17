import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/site/AuthCard";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Shami Business Ventures" },
      { name: "description", content: "Administrator sign-in for the Shami marketplace control centre." },
      { property: "og:title", content: "Admin Login | Shami" },
      { property: "og:description", content: "Platform control centre access." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@shamiventures.in");
  const [password, setPassword] = useState("admin1234");

  return (
    <AuthCard title="Admin Login" subtitle="Shami marketplace control centre">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@") || password.length < 6) {
            toast.error("Invalid administrator credentials");
            return;
          }
          login({ name: "Platform Admin", email, role: "admin" });
          navigate({ to: "/admin/dashboard" });
        }}
        className="space-y-4"
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-charcoal">Admin email</span>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-charcoal">Password</span>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-white hover:bg-midnight">
          Sign In to Admin Panel
        </button>
      </form>
    </AuthCard>
  );
}