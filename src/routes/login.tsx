import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/site/AuthCard";
import { OtpVerifyStep } from "@/components/site/OtpForm";
import { Input } from "@/components/ui/input";
import { useEmailOtp } from "@/lib/otp";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Customer Login | Shami Business Ventures" },
      { name: "description", content: "Sign in with an email OTP to track orders, manage addresses and download GST invoices." },
      { property: "og:title", content: "Customer Login | Shami" },
      { property: "og:description", content: "Access your Shami marketplace account with email OTP verification." },
    ],
  }),
  component: LoginPage,
});

const KNOWN_NAMES: Record<string, string> = {
  "rahul.d@gmail.com": "Rahul Deshpande",
  "customer@example.com": "Customer Demo",
};

function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("rahul.d@gmail.com");
  const otp = useEmailOtp();

  const finish = async () => {
    const ok = await otp.verify();
    if (!ok) return;
    const clean = email.trim().toLowerCase();
    const name = KNOWN_NAMES[clean] ?? clean.split("@")[0]!.replace(/[._]/g, " ");
    login({ name, email: clean, role: "customer" });
    toast.success("Email verified", { description: `Signed in as ${name}` });
    navigate({ to: "/account" });
  };

  return (
    <AuthCard
      title="Customer Login"
      subtitle="Verify your email with a one-time code to sign in"
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
      {otp.stage === "request" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void otp.send(email.trim());
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-charcoal">Email</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
          </label>
          <button
            disabled={otp.sending}
            className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-midnight disabled:opacity-60"
          >
            {otp.sending ? "Sending code…" : "Send OTP"}
          </button>
          <p className="text-xs text-slate">
            We'll email a 6-digit code to verify it's you. No password required.
          </p>
        </form>
      ) : (
        <OtpVerifyStep email={email.trim()} otp={otp} submitLabel="Verify & Sign In" onSubmit={() => void finish()} />
      )}
    </AuthCard>
  );
}
