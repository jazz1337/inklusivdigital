import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Gauge, Loader2, Search, ShieldAlert } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

type AuditItem = {
  id: string;
  title: string;
  score: number | null;
  description?: string;
};

type Result = {
  url: string;
  scores: { performance: number | null; accessibility: number | null; seo: number | null };
  failingA11y: AuditItem[];
};

const PAGESPEED_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

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

function scoreToPercent(score: number | null | undefined): number | null {
  if (typeof score !== "number") return null;
  return Math.round(score * 100);
}

function ScoreRing({ label, value }: { label: string; value: number | null }) {
  const v = value ?? 0;
  const tone = v >= 90 ? "text-success" : v >= 50 ? "text-warning" : "text-destructive";
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
      <div className={`text-3xl font-bold ${tone}`} aria-hidden>
        {value ?? "—"}
      </div>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
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

    const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY as string | undefined;
    if (!apiKey || apiKey.trim() === "") {
      setStatus("error");
      setErrorMsg("API-Key nicht konfiguriert. Bitte Konfiguration prüfen.");
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
      const params = new URLSearchParams({
        url: normalized,
        key: apiKey,
        strategy: "mobile",
      });
      // Multiple categories
      ["performance", "accessibility", "seo"].forEach((c) => params.append("category", c));

      const res = await fetch(`${PAGESPEED_ENDPOINT}?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`PageSpeed API antwortete mit Status ${res.status}`);
      }
      const data = await res.json();

      const cats = data?.lighthouseResult?.categories ?? {};
      const audits = data?.lighthouseResult?.audits ?? {};
      const a11yRefs: { id: string; weight: number }[] =
        cats.accessibility?.auditRefs?.filter((a: { weight: number }) => a.weight > 0) ?? [];

      const failingA11y: AuditItem[] = a11yRefs
        .map((ref) => audits[ref.id])
        .filter((a) => a && typeof a.score === "number" && a.score < 1)
        .slice(0, 6)
        .map((a) => ({
          id: a.id,
          title: a.title,
          score: a.score,
          description: typeof a.description === "string" ? a.description.replace(/\[.*?\]\(.*?\)/g, "") : "",
        }));

      setResult({
        url: normalized,
        scores: {
          performance: scoreToPercent(cats.performance?.score),
          accessibility: scoreToPercent(cats.accessibility?.score),
          seo: scoreToPercent(cats.seo?.score),
        },
        failingA11y,
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
        Powered by Google PageSpeed Insights · Dauer: ca. 15–30 Sekunden
      </p>

      {status === "error" && errorMsg && (
        <div role="alert" className="mt-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>{errorMsg}</p>
        </div>
      )}

      {status === "success" && result && (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-3">
            <ScoreRing label="Performance" value={result.scores.performance} />
            <ScoreRing label="Barrierefreiheit" value={result.scores.accessibility} />
            <ScoreRing label="SEO" value={result.scores.seo} />
          </div>

          {result.failingA11y.length > 0 ? (
            <div className="mt-6 rounded-xl border border-warning/30 bg-warning/5 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldAlert className="h-5 w-5 text-warning-foreground" aria-hidden />
                Auffällige Barrierefreiheits-Punkte
              </div>
              <ul className="space-y-3">
                {result.failingA11y.map((a) => (
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
