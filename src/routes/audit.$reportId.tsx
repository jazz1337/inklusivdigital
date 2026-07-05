import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { AuditScanAnimation } from "@/components/site/AuditScanAnimation";
import { AuditDashboard, type AuditData } from "@/components/site/AuditDashboard";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/audit/$reportId")({
  head: () => ({
    meta: [
      { title: "Dein BFSG-Schnelltest – InklusivDigital" },
      // Reports sollen nicht indexiert werden
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuditReportPage,
});

type Phase = "pending" | "done" | "error" | "notfound";
type StatusResponse = {
  status: Phase;
  url?: string;
  score?: number | null;
  failedCount?: number;
  passedCount?: number;
  manualCount?: number;
  error?: string;
};

const POLL_INTERVAL_MS = 2500;
const POLL_TIMEOUT_MS = 150_000;

function AuditReportPage() {
  const { reportId } = Route.useParams();
  const [phase, setPhase] = useState<Phase>("pending");
  const [data, setData] = useState<AuditData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    const statusUrl = import.meta.env.VITE_SCAN_STATUS_URL as string | undefined;
    if (!statusUrl) {
      setPhase("error");
      setErrorMsg("Der Schnelltest ist aktuell nicht konfiguriert.");
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    async function poll() {
      if (cancelled) return;
      if (startedAt.current === null) startedAt.current = performance.now();

      try {
        const res = await fetch(statusUrl as string, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId }),
        });
        const json: StatusResponse = await res.json();
        if (cancelled) return;

        if (json.status === "done") {
          setData({
            url: json.url ?? "",
            score: typeof json.score === "number" ? json.score : null,
            failedCount: json.failedCount ?? 0,
            passedCount: json.passedCount ?? 0,
            manualCount: json.manualCount ?? 0,
          });
          setPhase("done");
          return;
        }
        if (json.status === "error") {
          setErrorMsg(json.error ?? "Der Scan ist fehlgeschlagen.");
          setPhase("error");
          return;
        }
        if (json.status === "notfound") {
          setPhase("notfound");
          return;
        }
      } catch {
        // Netzwerk-Hänger einfach beim nächsten Poll erneut versuchen
      }

      if (performance.now() - (startedAt.current ?? 0) > POLL_TIMEOUT_MS) {
        setErrorMsg("Der Scan dauert länger als erwartet. Bitte versuche es später erneut.");
        setPhase("error");
        return;
      }
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reportId]);

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        {phase === "pending" && (
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Wir prüfen deine Website…</h1>
            <p className="mt-3 text-muted-foreground">
              Unser Scanner analysiert gerade die Barrierefreiheit. Das dauert nur einen Moment – bitte nicht schließen.
            </p>
            <div className="mt-8">
              <AuditScanAnimation />
            </div>
          </div>
        )}

        {(phase === "error" || phase === "notfound") && (
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-destructive/10">
              <AlertCircle className="h-7 w-7 text-destructive" aria-hidden />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {phase === "notfound" ? "Report nicht gefunden" : "Etwas ist schiefgelaufen"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {phase === "notfound"
                ? "Dieser Schnelltest existiert nicht mehr. Schnelltests sind nur für kurze Zeit verfügbar."
                : (errorMsg ?? "Bitte versuche es erneut.")}
            </p>
            <div className="mt-8">
              <CTAButton to="/bfsg-check">Neuen Schnelltest starten</CTAButton>
            </div>
          </div>
        )}

        {phase === "done" && data && (
          <>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">BFSG-Schnelltest</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Dein Ergebnis</h1>
            </div>
            <AuditDashboard data={data} revealed={false} gate={<UnlockGate reportId={reportId} />} />
          </>
        )}
      </div>
    </section>
  );
}

function UnlockGate({ reportId }: { reportId: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (status === "sent") {
    return (
      <div>
        <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-5 w-5" aria-hidden />
        </div>
        <h3 className="font-display text-lg font-bold text-foreground">Bericht ist unterwegs!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Wir haben dir den vollständigen Bericht mit allen gefundenen Barrieren per E-Mail geschickt. Bitte prüfe dein
          Postfach (auch den Spam-Ordner).
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    const unlockUrl = import.meta.env.VITE_SCAN_UNLOCK_URL as string | undefined;
    if (!unlockUrl) {
      setStatus("error");
      setErrorMsg("Dieser Dienst ist aktuell nicht verfügbar.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(unlockUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, email }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Bitte prüfe deine E-Mail-Adresse.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unbekannter Fehler.");
    }
  }

  return (
    <div>
      <h3 className="font-display text-lg font-bold text-foreground">Vollständigen Bericht erhalten</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Trage deine geschäftliche E-Mail ein – wir senden dir den kompletten Bericht mit allen gefundenen Barrieren und
        Handlungsempfehlungen zu.
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="unlock-email" className="sr-only">E-Mail-Adresse</label>
        <input
          id="unlock-email"
          type="email"
          required
          placeholder="name@unternehmen.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className="h-12 flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sende…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden /> Bericht anfordern
            </>
          )}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p role="alert" className="mt-2 text-sm text-destructive">{errorMsg}</p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Wir nutzen deine Adresse ausschließlich für den Bericht und eine mögliche Nachfrage. Kein Spam.
      </p>
    </div>
  );
}
