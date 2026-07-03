import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Gauge, Loader2, Search } from "lucide-react";

type Status = "idle" | "submitting" | "error";

type ScanResponse = {
  success: boolean;
  error?: string;
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

export function PageSpeedScanner({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

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

    setStatus("submitting");

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });
      const data: ScanResponse = await res.json();

      if (!res.ok || !data.success || !data.reportId) {
        throw new Error(data.error || `Der Scan konnte nicht gestartet werden (Status ${res.status}).`);
      }

      // Sofortiger Wechsel zur Report-Seite, die den Fortschritt pollt
      navigate({ to: "/audit/$reportId", params: { reportId: data.reportId } });
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
            disabled={status === "submitting"}
            className="h-14 w-full rounded-xl border border-input bg-background pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90 hover:shadow-[var(--shadow-glow)] disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Starte…
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
    </div>
  );
}
