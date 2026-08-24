import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/site/AuthCard";
import { OtpVerifyStep } from "@/components/site/OtpForm";
import { Input } from "@/components/ui/input";
import { useEmailOtp } from "@/lib/otp";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Shami Business Ventures" },
      { name: "description", content: "Administrator sign-in with email OTP for the Shami marketplace control centre." },
      { property: "og:title", content: "Admin Login | Shami" },
      { property: "og:description", content: "Platform control centre access with OTP verification." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@shamiventures.in");
  const otp = useEmailOtp();

  const finish = async () => {
    const ok = await otp.verify();
    if (!ok) return;
    login({ name: "Platform Admin", email: email.trim().toLowerCase(), role: "admin" });
    toast.success("Admin email verified");
    navigate({ to: "/admin/dashboard" });
  };

  return (
    <AuthCard title="Admin Login" subtitle="Verify your administrator email with a one-time code">
      {otp.stage === "request" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void otp.send(email.trim());
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-charcoal">Admin email</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
          </label>
          <button
            disabled={otp.sending}
            className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-midnight disabled:opacity-60"
          >
            {otp.sending ? "Sending code…" : "Send OTP"}
          </button>
          <p className="text-xs text-slate">A 6-digit verification code will be emailed to this address.</p>
        </form>
      ) : (
        <OtpVerifyStep
          email={email.trim()}
          otp={otp}
          submitLabel="Verify & Enter Admin Panel"
          onSubmit={() => void finish()}
        />
      )}
    </AuthCard>
  );
}
