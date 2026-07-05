import { Pause, Play } from "lucide-react";
import { useAnimPaused } from "@/lib/use-reduced-motion";

/**
 * Schwebende, gepulste Fokusring-Deko — visualisiert das BFSG-Kernthema
 * (sichtbare Tastatur-Fokus-Indikatoren) als Hintergrund-Element auf
 * dunklen Flächen. Immer mit Pause-Button (WCAG 2.2.2 — keine Endlos-
 * Animation ohne Stopp-Möglichkeit).
 *
 * "hero" = 4 große Ringe (PageHero, große Sections), "compact" = 2
 * kleinere Ringe für kleinere dunkle Karten (z. B. Score-Anzeige).
 */
export function FocusRingDecor({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const [paused, setPaused] = useAnimPaused();
  const playState = paused ? "paused" : "running";

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[12%] right-[8%] h-20 w-32 animate-[var(--animate-focus-ring-1)] rounded border-2 border-[oklch(0.7_0.14_250/0.5)] shadow-[0_0_12px_oklch(0.7_0.14_250/0.3)]"
          style={{ animationPlayState: playState }}
        />
        <div
          className="absolute bottom-[20%] left-[5%] h-14 w-24 animate-[var(--animate-focus-ring-2)] rounded border-2 border-[oklch(0.7_0.15_155/0.45)] shadow-[0_0_10px_oklch(0.7_0.15_155/0.25)]"
          style={{ animationPlayState: playState }}
        />
        {variant === "hero" && (
          <>
            <div
              className="absolute top-[55%] right-[22%] h-10 w-16 animate-[var(--animate-focus-ring-3)] rounded border border-[oklch(0.7_0.14_250/0.35)]"
              style={{ animationPlayState: playState }}
            />
            <div
              className="absolute top-[30%] left-[18%] h-8 w-20 animate-[var(--animate-focus-ring-4)] rounded border border-[oklch(0.65_0.15_155/0.3)]"
              style={{ animationPlayState: playState }}
            />
          </>
        )}
      </div>

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
    </>
  );
}
