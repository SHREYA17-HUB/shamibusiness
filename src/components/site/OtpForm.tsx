import { Input } from "@/components/ui/input";
import { formatCountdown, useEmailOtp } from "@/lib/otp";

/**
 * Step 2 of the login flows: email OTP entry.
 */
export function OtpVerifyStep({
  email,
  otp,
  submitLabel,
  onSubmit,
}: {
  email: string;
  otp: ReturnType<typeof useEmailOtp>;
  submitLabel: string;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="rounded-md border border-dashed border-gold/50 bg-ivory p-3 text-xs text-slate">
        We emailed a 6-digit verification code to <span className="font-semibold text-navy">{email}</span>.
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-charcoal">Verification code (OTP)</span>
        <Input
          value={otp.code}
          onChange={(e) => otp.setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="••••••"
          className="h-12 text-center text-lg font-bold tracking-[0.5em] text-navy"
        />
      </label>
      <p className="text-xs text-slate">
        {otp.expiresIn > 0 ? `Code expires in ${formatCountdown(otp.expiresIn)}` : "Code expired — request a new one."}
      </p>
      <button
        disabled={otp.verifying}
        className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-midnight disabled:opacity-60"
      >
        {otp.verifying ? "Verifying…" : submitLabel}
      </button>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <button type="button" onClick={otp.reset} className="font-semibold text-navy hover:text-gold">
          Change email
        </button>
        <button
          type="button"
          disabled={!otp.canResend || otp.sending}
          onClick={() => void otp.send(email)}
          className="font-semibold text-gold hover:underline disabled:text-slate disabled:no-underline"
        >
          {otp.canResend ? "Resend code" : `Resend in ${otp.resendIn}s`}
        </button>
      </div>
    </form>
  );
}
