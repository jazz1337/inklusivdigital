import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Gauge, Loader2, Search, ShieldAlert } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

type FailedItem = {
  id: string;
  title: string;
  description?: string;
};

type ScanResponse = {
  success: boolean;
  error?: string;
  reportId?: string;
  url?: string;
  score?: number | null;
  failedCount?: number;
  passedCount?: number;
  manualCount?: number;
  failedItems?: FailedItem[];
};

type Result = {
  url: string;
  score: number | null;
  failedCount: number;
  failedItems: FailedItem[];
  reportId?: string;
};

function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const u = new URL(candidate);
    return u.toString();
  } catch {
    return null;
  }
}

function ScoreRing({ value }: { value: number | null }) {
  const v = value ?? 0;
  const tone = v >= 90 ? "text-success" : v >= 50 ? "text-warning" : "text-destructive";
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4 sm:gap-2 sm:p-6">
      <div className={`text-3xl font-bold sm:text-4xl ${tone}`} aria-hidden>
        {value ?? "—"}
      </div>
      <div className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Barrierefreiheits-Score
      </div>
    </div>
  );
}

export function PageSpeedScanner({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setResult(null);

    const webhookUrl = import.meta.env.VITE_SCAN_WEBHOOK_URL as string | undefined;
    if (!webhookUrl || webhookUrl.trim() === "") {
      setStatus("error");
      setErrorMsg("Der Schnelltest ist aktuell nicht konfiguriert. Bitte versuche es später erneut.");
      return;
    }

    const normalized = normalizeUrl(url);
    if (!normalized) {
      setStatus("error");
      setErrorMsg("Bitte gib eine gültige URL ein (z. B. https://deine-domain.de).");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });

      const data: ScanResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || `Der Scan ist fehlgeschlagen (Status ${res.status}).`);
      }

      setResult({
        url: data.url ?? normalized,
        score: typeof data.score === "number" ? data.score : null,
        failedCount: data.failedCount ?? 0,
        failedItems: data.failedItems ?? [],
        reportId: data.reportId,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unbekannter Fehler beim Scan.");
    }
  }

  return (
    <div className={compact ? "" : "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" aria-label="Website auf Barrierefreiheit prüfen">
        <label htmlFor="scan-url" className="sr-only">Website-URL</label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            id="scan-url"
            type="text"
            inputMode="url"
            placeholder="https://deine-website.de"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={status === "loading"}
            className="h-14 w-full rounded-xl border border-input bg-background pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90 hover:shadow-[var(--shadow-glow)] disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Prüfe…
            </>
          ) : (
            <>
              <Gauge className="h-5 w-5" aria-hidden /> Jetzt prüfen
            </>
          )}
        </button>
      </form>

      <p className="mt-3 text-xs text-muted-foreground">
        Automatisierter Accessibility-Scan · Dauer: ca. 15–40 Sekunden
      </p>

      {status === "error" && errorMsg && (
        <div role="alert" className="mt-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>{errorMsg}</p>
        </div>
      )}

      {status === "success" && result && (
        <div className="mt-6">
          <div className={compact ? "" : "mx-auto max-w-xs"}>
            <ScoreRing value={result.score} />
          </div>

          {result.failedItems.length > 0 ? (
            <div className="mt-6 rounded-xl border border-warning/30 bg-warning/5 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldAlert className="h-5 w-5 text-warning-foreground" aria-hidden />
                Auffällige Barrierefreiheits-Punkte
                {result.failedCount > result.failedItems.length && (
                  <span className="font-normal text-muted-foreground">
                    (Top {result.failedItems.length} von {result.failedCount})
                  </span>
                )}
              </div>
              <ul className="space-y-3">
                {result.failedItems.map((a) => (
                  <li key={a.id} className="text-sm">
                    <div className="font-medium text-foreground">{a.title}</div>
                    {a.description && <div className="mt-1 text-muted-foreground">{a.description}</div>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 p-4 text-sm">
              <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />
              <span>Keine offensichtlichen Barrierefreiheits-Probleme gefunden – ein vollständiges Audit deckt jedoch noch tiefere Schichten auf.</span>
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Hinweis: Automatisierte Tests erkennen ca. 30 % aller Barrieren. Für rechtliche Sicherheit ist ein manuelles Audit erforderlich.
          </p>
        </div>
      )}
    </div>
  );
}
