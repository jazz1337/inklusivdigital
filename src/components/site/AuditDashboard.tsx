import { CheckCircle2, ShieldAlert, ClipboardList, Lock, Globe } from "lucide-react";
import type { ReactNode } from "react";

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
  if (v >= 90) return { text: "text-success", ring: "border-success", label: "Gut" };
  if (v >= 70) return { text: "text-warning", ring: "border-warning", label: "Befriedigend" };
  if (v >= 50) return { text: "text-warning", ring: "border-warning", label: "Verbesserungsbedarf" };
  return { text: "text-destructive", ring: "border-destructive", label: "Kritisch" };
}

function bfsgVerdict(score: number | null): string {
  const v = score ?? 0;
  if (v >= 90) return "Die Website erfüllt weitgehend die Anforderungen des BFSG. Kleinere Verbesserungen werden empfohlen.";
  if (v >= 70) return "Die Website weist Barrieren auf, die gemäß BFSG behoben werden sollten, um rechtssicher zu sein.";
  return "Erhebliche Mängel: Es besteht dringender Handlungsbedarf, um die BFSG-Anforderungen zu erfüllen.";
}

function Tile({ value, label, tone }: { value: ReactNode; label: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-center">
      <div className={`font-display text-3xl font-bold ${tone}`}>{value}</div>
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
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Globe className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate">{data.url}</span>
      </div>

      {/* Score + BFSG-Einordnung */}
      <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-stretch">
        <div className={`flex flex-col items-center justify-center rounded-3xl border-2 ${tone.ring} bg-card px-8 py-6`}>
          <div className={`font-display text-6xl font-bold leading-none ${tone.text}`}>{data.score ?? "—"}</div>
          <div className="mt-2 text-xs text-muted-foreground">von 100 Punkten</div>
          <div className={`mt-1 text-sm font-semibold ${tone.text}`}>{tone.label}</div>
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
      <div className="mt-5 grid grid-cols-3 gap-4">
        <Tile value={data.failedCount} label="Kritische Fehler" tone="text-destructive" />
        <Tile value={data.passedCount} label="Bestanden" tone="text-success" />
        <Tile value={data.manualCount} label="Manuell prüfen" tone="text-warning" />
      </div>

      {/* Fehlerliste – enthüllt oder gesperrt */}
      <div className="mt-8">
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
                <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Lock className="h-5 w-5" aria-hidden />
                </div>
                {gate}
              </div>
            </div>
          </div>
        )}
      </div>

      {footer && <div className="mt-8">{footer}</div>}
    </div>
  );
}
