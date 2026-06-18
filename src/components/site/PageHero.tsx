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
    <section className="relative overflow-hidden bg-foreground">
      {/* Blue glow top-right */}
      <div
        className="absolute inset-0 [background-image:radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_250/.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,oklch(0.62_0.16_155/.22),transparent_50%)]"
        aria-hidden="true"
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      {/* Focus-ring decorations — thematisch: BFSG fordert sichtbare Tastatur-Fokusringe */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[12%] right-[8%] h-20 w-32 animate-[var(--animate-focus-ring-1)] rounded border-2 border-[oklch(0.7_0.14_250/0.5)] shadow-[0_0_12px_oklch(0.7_0.14_250/0.3)]" />
        <div className="absolute bottom-[20%] left-[5%] h-14 w-24 animate-[var(--animate-focus-ring-2)] rounded border-2 border-[oklch(0.7_0.15_155/0.45)] shadow-[0_0_10px_oklch(0.7_0.15_155/0.25)]" />
        <div className="absolute top-[55%] right-[22%] h-10 w-16 animate-[var(--animate-focus-ring-3)] rounded border border-[oklch(0.7_0.14_250/0.35)]" />
        <div className="absolute top-[30%] left-[18%] h-8 w-20 animate-[var(--animate-focus-ring-4)] rounded border border-[oklch(0.65_0.15_155/0.3)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        {eyebrow && (
          <p
            className="mb-5 inline-flex animate-[var(--animate-float-in)] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm"
            style={{ animationDelay: "0ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1
          className="font-display max-w-4xl animate-[var(--animate-float-in)] text-3xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl"
          style={{ animationDelay: eyebrow ? "80ms" : "0ms" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="mt-6 max-w-2xl animate-[var(--animate-float-in)] text-lg text-white/70 md:text-xl"
            style={{ animationDelay: eyebrow ? "160ms" : "80ms" }}
          >
            {intro}
          </p>
        )}
        {children && (
          <div
            className="mt-8 animate-[var(--animate-float-in)]"
            style={{ animationDelay: eyebrow ? "240ms" : "160ms" }}
          >
            {children}
          </div>
        )}
      </div>

      {/* Signature gradient bar */}
      <div
        className="h-1 w-full bg-gradient-to-r from-primary via-success to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
