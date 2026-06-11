import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  tone = "default",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "primary";
  size?: "default" | "compact";
}) {
  return (
    <section
      className={cn(
        tone === "surface" && "bg-surface",
        tone === "primary" && "bg-primary text-primary-foreground",
        size === "default" ? "py-16 md:py-24" : "py-10 md:py-14",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-0.5 w-5 rounded-full bg-primary" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
