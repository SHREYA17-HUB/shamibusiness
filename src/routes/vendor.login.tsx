import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/site/AuthCard";
import { OtpVerifyStep } from "@/components/site/OtpForm";
import { Input } from "@/components/ui/input";
import { useEmailOtp } from "@/lib/otp";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/vendor/login")({
  head: () => ({
    meta: [
      { title: "Vendor Login | Shami Business Ventures" },
      { name: "description", content: "Vendor sign-in with email OTP for product, order, inventory and payout management." },
      { property: "og:title", content: "Vendor Login | Shami" },
      { property: "og:description", content: "Manage listings, orders, stock and earnings with OTP verification." },
    ],
  }),
  component: VendorLogin,
});

function VendorLogin() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("imran@shamisugar.in");
  const otp = useEmailOtp();

  const finish = async () => {
    const ok = await otp.verify();
    if (!ok) return;
    login({ name: "Imran Shami", email: email.trim().toLowerCase(), role: "vendor" });
    toast.success("Business email verified");
    navigate({ to: "/vendor/dashboard" });
  };

  return (
    <AuthCard
      title="Vendor Login"
      subtitle="Verify your business email with a one-time code"
      footer={
        <>
          New vendor?{" "}
          <Link to="/vendor/register" className="font-semibold text-gold hover:underline">
            Register your business
          </Link>
        </>
      }
    >
      {otp.stage === "request" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void otp.send(email.trim());
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-charcoal">Business email</span>
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
          submitLabel="Verify & Enter Vendor Panel"
          onSubmit={() => void finish()}
        />
      )}
    </AuthCard>
  );
}
