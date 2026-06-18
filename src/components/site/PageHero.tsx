import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { ReactNode } from "react";

function useAnimPaused() {
  return useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
}

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
  const [paused, setPaused] = useAnimPaused();
  const playState = paused ? "paused" : "running";

  return (
    <section className="relative overflow-hidden bg-foreground">
      {/* Glows */}
      <div
        className="absolute inset-0 [background-image:radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_250/.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,oklch(0.62_0.16_155/.22),transparent_50%)]"
        aria-hidden="true"
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      {/* Focus-ring decorations */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[12%] right-[8%] h-20 w-32 animate-[var(--animate-focus-ring-1)] rounded border-2 border-[oklch(0.7_0.14_250/0.5)] shadow-[0_0_12px_oklch(0.7_0.14_250/0.3)]"
          style={{ animationPlayState: playState }}
        />
        <div
          className="absolute bottom-[20%] left-[5%] h-14 w-24 animate-[var(--animate-focus-ring-2)] rounded border-2 border-[oklch(0.7_0.15_155/0.45)] shadow-[0_0_10px_oklch(0.7_0.15_155/0.25)]"
          style={{ animationPlayState: playState }}
        />
        <div
          className="absolute top-[55%] right-[22%] h-10 w-16 animate-[var(--animate-focus-ring-3)] rounded border border-[oklch(0.7_0.14_250/0.35)]"
          style={{ animationPlayState: playState }}
        />
        <div
          className="absolute top-[30%] left-[18%] h-8 w-20 animate-[var(--animate-focus-ring-4)] rounded border border-[oklch(0.65_0.15_155/0.3)]"
          style={{ animationPlayState: playState }}
        />
      </div>

      {/* Pause-Button – klein, oben links, voll BFSG-konform */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Hintergrundanimationen fortsetzen" : "Hintergrundanimationen pausieren"}
        aria-pressed={paused}
        className="absolute left-3 top-3 z-20 rounded p-1.5 text-white/30 transition hover:text-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
      >
        {paused ? (
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>

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

      <div
        className="h-1 w-full bg-gradient-to-r from-primary via-success to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
