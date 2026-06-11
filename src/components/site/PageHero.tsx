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
      {/* Blue glow top-right */}
      <div className="absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_250/.16),transparent_55%)]" />
      {/* Green glow bottom-left */}
      <div className="absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_bottom_left,oklch(0.62_0.16_155/.12),transparent_50%)]" />
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-28 lg:py-32">
        {eyebrow && (
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{intro}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
