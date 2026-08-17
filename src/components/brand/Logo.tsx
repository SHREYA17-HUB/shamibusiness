import { Link } from "@tanstack/react-router";
import logo from "@/assets/shami-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({
  to = "/",
  className,
  variant = "light",
}: {
  to?: string;
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <Link
      to={to}
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Shami Business Ventures Pvt. Ltd. home"
    >
      <img
        src={logo.url}
        alt="Shami Business Ventures Pvt. Ltd."
        width={1493}
        height={1080}
        className={cn(
          "h-11 w-auto object-contain sm:h-12",
          variant === "light" && "brightness-0 invert-[0.97] contrast-125",
        )}
      />
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Shami Business Ventures"
      width={1493}
      height={1080}
      className={cn("h-10 w-auto object-contain", className)}
    />
  );
}