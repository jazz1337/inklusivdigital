import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary:
    "bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)]",
  secondary: "bg-foreground text-background hover:bg-foreground/85",
  ghost: "bg-transparent text-foreground border border-border hover:bg-secondary hover:border-primary/20",
  light: "bg-transparent text-white border border-white/25 hover:bg-white/10",
};

export function CTAButton({
  to,
  children,
  variant = "primary",
  withArrow = true,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
}) {
  return (
    <Link
      to={to as never}
      className={`group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
      {withArrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </Link>
  );
}
