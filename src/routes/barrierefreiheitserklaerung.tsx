import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/barrierefreiheitserklaerung")({
  head: () => ({
    meta: [
      { title: "Barrierefreiheitserklärung – InklusivDigital" },
    ],
  }),
  component: BarrierefreiheitserklaerungPage,
});

function BarrierefreiheitserklaerungPage() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Barrierefreiheitserklärung
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Stand der Vereinbarkeit mit den Anforderungen
            </h2>
            <p className="mt-3 text-muted-foreground">
              Diese Website ist mit den Anforderungen der
              Barrierefreiheitsrichtlinie (WCAG 2.1 AA sowie DIN EN 301 549)
              weitgehend vereinbar. Bekannte Ausnahmen sind nachfolgend
              aufgeführt.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Nicht barrierefreie Inhalte
            </h2>
            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">Navigation und Struktur</p>
                  <p className="mt-1 text-muted-foreground">Tastaturnavigation vollständig implementiert.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">Kontrastverhältnisse</p>
                  <p className="mt-1 text-muted-foreground">Alle Texte erfüllen WCAG 2.1 AA (Kontrastverhältnis ≥ 4,5:1).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">Externe Inhalte</p>
                  <p className="mt-1 text-muted-foreground">
                    Der PageSpeed-Scanner nutzt die Google PageSpeed API.
                    Barrierefreiheit externer Dienste liegt außerhalb unseres
                    Einflussbereichs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Erstellung dieser Erklärung
            </h2>
            <p className="mt-3 text-muted-foreground">
              Diese Erklärung wurde am [Datum] erstellt und zuletzt am [Datum]
              überprüft.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Feedback und Kontakt
            </h2>
            <p className="mt-3 text-muted-foreground">
              Wenn Sie Barrieren auf dieser Website bemerken oder Feedback zur
              Barrierefreiheit geben möchten, kontaktieren Sie uns bitte:
            </p>
            <div className="mt-4">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Zum Kontaktformular
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Durchsetzungsverfahren
            </h2>
            <p className="mt-3 text-muted-foreground">
              Wenn Sie nach Ihrer Kontaktaufnahme mit uns keine zufriedenstellende
              Antwort erhalten haben, können Sie die zuständige Schlichtungs- oder
              Aufsichtsbehörde einschalten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
