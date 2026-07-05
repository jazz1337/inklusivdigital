import { Pause, Play } from "lucide-react";
import { useAnimPaused } from "@/lib/use-reduced-motion";

const LOOP = "3.5s";

function ring(name: string, playState: string): React.CSSProperties {
  return {
    animationName: name,
    animationDuration: LOOP,
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationPlayState: playState,
  };
}

export function AuditScanAnimation() {
  const [paused, setPaused] = useAnimPaused();
  const ps = paused ? "paused" : "running";

  return (
    <div className="relative w-full select-none rounded-2xl bg-[#0f172a] p-5">
      {/* Pause-Button */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Animation fortsetzen" : "Animation pausieren"}
        aria-pressed={paused}
        className="absolute right-3 top-3 z-20 rounded p-1.5 text-white/30 transition hover:text-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
      >
        {paused ? (
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>

      {/* Browser-Fenster (dekorativ) */}
      <div aria-hidden="true" className="overflow-hidden rounded-xl border border-white/20">
        {/* Chrome-Leiste */}
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <div className="ml-3 h-3.5 w-32 rounded-full bg-white/10" />
        </div>

        {/* Seiteninhalt */}
        <div className="relative overflow-hidden px-6 py-5">
          {/* Scan-Strahl */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-10 -translate-y-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.65 0.18 248 / 0.6) 40%, oklch(0.68 0.16 155 / 0.5) 60%, transparent)",
              filter: "blur(3px)",
              ...ring("audit-scan", ps),
            }}
          />

          {/* Headline-Block */}
          <div className="mb-2.5 h-4 w-11/12 rounded" style={{ background: "rgba(255,255,255,0.20)", ...ring("audit-ring-1", ps) }} />
          {/* Subtitle-Block */}
          <div className="mb-5 h-4 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.13)", ...ring("audit-ring-2", ps) }} />
          {/* Button-Block */}
          <div className="h-9 w-1/3 rounded-lg" style={{ background: "rgba(255,255,255,0.18)", ...ring("audit-ring-3", ps) }} />
          {/* Kleine Fußblöcke */}
          <div className="mt-4 flex gap-2">
            <div className="h-2.5 w-10 rounded-sm" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="h-2.5 w-14 rounded-sm" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="h-2.5 w-8 rounded-sm" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>
        </div>
      </div>

      {/* Status-Zeile */}
      <div aria-hidden="true" className="mt-3 flex items-center gap-2 text-xs text-white/40">
        <span className="h-1.5 w-1.5 rounded-full bg-success opacity-70" />
        Automatisierter Scan läuft…
      </div>
    </div>
  );
}
