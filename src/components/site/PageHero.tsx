import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[image:var(--gradient-hero)]">
      <div className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(circle_at_top_right,oklch(0.85_0.08_250/.5),transparent_55%)]" />
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-28">
        {eyebrow && (
          <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">{intro}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
