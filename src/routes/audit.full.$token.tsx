import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { AuditDashboard, type AuditData, type AuditFinding } from "@/components/site/AuditDashboard";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/audit/full/$token")({
  head: () => ({
    meta: [
      { title: "Dein vollständiger BFSG-Bericht – InklusivDigital" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FullReportPage,
});

type Phase = "loading" | "done" | "notfound" | "error";

type FullResponse = {
  status?: string;
  url?: string;
  score?: number | null;
  failedCount?: number;
  passedCount?: number;
  manualCount?: number;
  lhFailed?: AuditFinding[];
};

function FullReportPage() {
  const { token } = Route.useParams();
  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<AuditData | null>(null);

  useEffect(() => {
    const fullUrl = import.meta.env.VITE_SCAN_FULL_URL as string | undefined;
    if (!fullUrl) {
      setPhase("error");
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(fullUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const json: FullResponse = await res.json();
        if (cancelled) return;

        if (json.status !== "done") {
          setPhase("notfound");
          return;
        }
        setData({
          url: json.url ?? "",
          score: typeof json.score === "number" ? json.score : null,
          failedCount: json.failedCount ?? 0,
          passedCount: json.passedCount ?? 0,
          manualCount: json.manualCount ?? 0,
          failedItems: json.lhFailed ?? [],
        });
        setPhase("done");
      } catch {
        if (!cancelled) setPhase("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        {phase === "loading" && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
            <p className="mt-4 text-muted-foreground">Bericht wird geladen…</p>
          </div>
        )}

        {(phase === "notfound" || phase === "error") && (
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-destructive/10">
              <AlertCircle className="h-7 w-7 text-destructive" aria-hidden />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Bericht nicht verfügbar</h1>
            <p className="mt-3 text-muted-foreground">
              Dieser Bericht existiert nicht oder ist abgelaufen. Berichte sind nach dem Abruf 7 Tage verfügbar.
            </p>
            <div className="mt-8">
              <CTAButton to="/bfsg-check">Neuen Schnelltest starten</CTAButton>
            </div>
          </div>
        )}

        {phase === "done" && data && (
          <>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Vollständiger BFSG-Bericht</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Dein Ergebnis im Detail</h1>
            </div>
            <AuditDashboard
              data={data}
              revealed
              footer={
                <div className="rounded-3xl border border-border bg-[image:var(--gradient-hero)] p-8 text-center">
                  <h2 className="font-display text-2xl font-bold text-foreground">Fehler professionell beheben lassen?</h2>
                  <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                    Wir setzen die nötigen Maßnahmen für dich um – rechtssicher, nachweisbar und ohne
                    Betriebsunterbrechung. Ein automatischer Scan findet nur ca. 30 % der Barrieren; das vollständige
                    Audit deckt den Rest auf.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <CTAButton to="/kontakt">Professionelles Audit anfragen</CTAButton>
                    <CTAButton to="/leistungen/bfsg-audit" variant="ghost">
                      Mehr zum Audit
                    </CTAButton>
                  </div>
                </div>
              }
            />
          </>
        )}
      </div>
    </section>
  );
}
