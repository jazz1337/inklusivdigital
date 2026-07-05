import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ShieldAlert,
  ClipboardList,
  Lock,
  Globe,
  AlertTriangle,
  Eye,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { FocusRingDecor } from "@/components/site/FocusRingDecor";
import { prefersReducedMotion } from "@/lib/use-reduced-motion";

export type AuditFinding = {
  id: string;
  title: string;
  description?: string;
};

export type AuditData = {
  url: string;
  score: number | null;
  failedCount: number;
  passedCount: number;
  manualCount: number;
  /** Nur auf der per E-Mail freigeschalteten Voll-Seite vorhanden. */
  failedItems?: AuditFinding[];
};

function scoreTone(score: number | null) {
  const v = score ?? 0;
  if (v >= 90) return { text: "text-success", stroke: "stroke-success", label: "Gut" };
  if (v >= 70) return { text: "text-warning", stroke: "stroke-warning", label: "Befriedigend" };
  if (v >= 50) return { text: "text-warning", stroke: "stroke-warning", label: "Verbesserungsbedarf" };
  return { text: "text-destructive", stroke: "stroke-destructive", label: "Kritisch" };
}

function bfsgVerdict(score: number | null): string {
  const v = score ?? 0;
  if (v >= 90) return "Die Website erfüllt weitgehend die Anforderungen des BFSG. Kleinere Verbesserungen werden empfohlen.";
  if (v >= 70) return "Die Website weist Barrieren auf, die gemäß BFSG behoben werden sollten, um rechtssicher zu sein.";
  return "Erhebliche Mängel: Es besteht dringender Handlungsbedarf, um die BFSG-Anforderungen zu erfüllen.";
}

function ScoreRing({ score, tone }: { score: number | null; tone: ReturnType<typeof scoreTone> }) {
  const pct = Math.max(0, Math.min(100, score ?? 0));
  const r = 52;
  const c = 2 * Math.PI * r;
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const target = c - (pct / 100) * c;
    if (prefersReducedMotion()) {
      setOffset(target);
      return;
    }
    const id = requestAnimationFrame(() => setOffset(target));
    return () => cancelAnimationFrame(id);
  }, [pct, c]);

  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-white/10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={`${tone.stroke} transition-[stroke-dashoffset] duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-display text-5xl font-bold leading-none ${tone.text}`}>{score ?? "—"}</span>
        <span className="mt-1 text-xs text-white/50">von 100</span>
      </div>
    </div>
  );
}

function Tile({
  value,
  label,
  icon: Icon,
  badgeClass,
  cardClass,
  valueClass,
}: {
  value: ReactNode;
  label: string;
  icon: LucideIcon;
  badgeClass: string;
  cardClass: string;
  valueClass: string;
}) {
  return (
    <div className={`rounded-2xl border-2 p-5 text-center ${cardClass}`}>
      <div className={`mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full ${badgeClass}`}>
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className={`font-display text-3xl font-bold ${valueClass}`}>{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

export function AuditDashboard({
  data,
  revealed,
  gate,
  footer,
}: {
  data: AuditData;
  /** true = Fehlerliste anzeigen (Voll-Seite), false = gesperrt (Teaser). */
  revealed: boolean;
  /** Wird im gesperrten Zustand statt der Liste gerendert (z. B. E-Mail-Formular). */
  gate?: ReactNode;
  footer?: ReactNode;
}) {
  const tone = scoreTone(data.score);

  return (
    <div>
      {/* Kopf: geprüfte URL */}
      <div
        className="mb-6 flex animate-[var(--animate-float-in)] items-center gap-2 text-sm text-muted-foreground"
        style={{ animationDelay: "0ms" }}
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate">{data.url}</span>
      </div>

      {/* Score + BFSG-Einordnung */}
      <div
        className="grid animate-[var(--animate-float-in)] gap-5 md:grid-cols-[auto_1fr] md:items-stretch"
        style={{ animationDelay: "80ms" }}
      >
        <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground p-8 shadow-[var(--shadow-glow)]">
          <div
            className="absolute inset-0 [background-image:radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_250/.35),transparent_60%)]"
            aria-hidden="true"
          />
          <FocusRingDecor variant="compact" />
          <div className="relative flex flex-col items-center justify-center">
            <ScoreRing score={data.score} tone={tone} />
            <div className={`mt-3 text-sm font-semibold ${tone.text}`}>{tone.label}</div>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <ShieldAlert className="h-5 w-5 text-primary" aria-hidden /> BFSG-Einordnung
          </div>
          <p className="text-muted-foreground">{bfsgVerdict(data.score)}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Das BFSG verpflichtet Unternehmen seit dem <strong className="text-foreground">28. Juni 2025</strong> zur
            Barrierefreiheit nach WCAG 2.1 AA. Ein automatischer Scan erkennt ca. 30 % der Barrieren — ein manuelles
            Audit deckt den Rest auf.
          </p>
        </div>
      </div>

      {/* Kennzahlen */}
      <div
        className="mt-5 grid animate-[var(--animate-float-in)] grid-cols-3 gap-4"
        style={{ animationDelay: "160ms" }}
      >
        <Tile
          value={data.failedCount}
          label="Kritische Fehler"
          icon={AlertTriangle}
          cardClass="border-destructive/20 bg-destructive/5"
          badgeClass="bg-destructive text-destructive-foreground"
          valueClass="text-destructive"
        />
        <Tile
          value={data.passedCount}
          label="Bestanden"
          icon={CheckCircle2}
          cardClass="border-success/20 bg-success/5"
          badgeClass="bg-success text-success-foreground"
          valueClass="text-success"
        />
        <Tile
          value={data.manualCount}
          label="Manuell prüfen"
          icon={Eye}
          cardClass="border-warning/20 bg-warning/5"
          badgeClass="bg-warning text-warning-foreground"
          valueClass="text-warning"
        />
      </div>

      {/* Fehlerliste – enthüllt oder gesperrt */}
      <div className="mt-8 animate-[var(--animate-float-in)]" style={{ animationDelay: "240ms" }}>
        <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <ClipboardList className="h-5 w-5 text-primary" aria-hidden /> Gefundene Barrieren
        </h2>

        {revealed && data.failedItems ? (
          data.failedItems.length > 0 ? (
            <ul className="space-y-3">
              {data.failedItems.map((f) => (
                <li key={f.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="font-semibold text-foreground">{f.title}</div>
                  {f.description && <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-5 text-sm">
              <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />
              <span>Keine automatisch erkennbaren Barrieren gefunden – ein manuelles Audit deckt tiefere Schichten auf.</span>
            </div>
          )
        ) : (
          <div className="grid overflow-hidden rounded-2xl border border-border">
            {/* Beide Layer liegen in derselben Grid-Zelle übereinander (statt absolute
                Positionierung auf feste Höhe) – so richtet sich die Höhe des Containers
                immer nach dem GRÖSSEREN der beiden Layer. Wächst das Formular (z. B. durch
                eine Fehlermeldung), wächst der Container mit, statt das Formular auf die
                feste Platzhalter-Höhe zu zwingen und dabei Inhalte abzuschneiden. */}
            <div aria-hidden className="col-start-1 row-start-1 space-y-3 p-5 blur-sm select-none">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                  <div className="h-4 w-2/3 rounded bg-muted" />
                  <div className="mt-2 h-3 w-full rounded bg-muted/60" />
                </div>
              ))}
            </div>
            <div className="col-start-1 row-start-1 flex items-center justify-center bg-card/70 p-6 backdrop-blur-[2px]">
              <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-white shadow-[var(--shadow-glow)]">
                  <Lock className="h-5 w-5" aria-hidden />
                </div>
                {gate}
              </div>
            </div>
          </div>
        )}
      </div>

      {footer && (
        <div className="mt-8 animate-[var(--animate-float-in)]" style={{ animationDelay: "320ms" }}>
          {footer}
        </div>
      )}
    </div>
  );
}
