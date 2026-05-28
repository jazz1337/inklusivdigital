import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertCircle, ListOrdered } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { PageSpeedScanner } from "@/components/site/PageSpeedScanner";

export const Route = createFileRoute("/bfsg-check")({
  head: () => ({
    meta: [
      { title: "Kostenloser BFSG-Check – BFSG.Agentur" },
      {
        name: "description",
        content:
          "Prüfe deine Website kostenlos auf offensichtliche Barrieren. Sofortige erste Einschätzung, keine Anmeldung nötig.",
      },
      { property: "og:title", content: "Kostenloser BFSG-Check" },
      { property: "og:description", content: "Sofortige Einschätzung deiner Website – kostenlos & unverbindlich." },
    ],
  }),
  component: BfsgCheckPage,
});

function BfsgCheckPage() {
  return (
    <>
      {/* HERO mit großem Scanner */}
      <section className="relative overflow-hidden border-b border-border bg-[image:var(--gradient-hero)]">
        <div className="absolute inset-0 -z-10 opacity-70 [background-image:radial-gradient(circle_at_top_right,oklch(0.85_0.08_250/.55),transparent_55%)]" />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <p className="mb-5 inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Kostenlos · keine Anmeldung
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Der kostenlose BFSG-<span className="text-primary">Schnelltest</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Ist deine Website bereit für das Barrierefreiheitsstärkungsgesetz? Mit unserem Schnelltest erhältst du
            innerhalb weniger Sekunden eine erste Einschätzung zu den offensichtlichsten Barrieren auf deiner Seite.
            Kostenlos, unverbindlich und direkt online.
          </p>

          <div className="mx-auto mt-10 max-w-2xl text-left">
            <PageSpeedScanner />
          </div>
        </div>
      </section>

      {/* Was leistet der Check vs. was nicht */}
      <Section>
        <SectionHeading
          eyebrow="Was bekommst du?"
          title="Was dieser Check leistet – und was nicht."
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-success/30 bg-success/5 p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-success text-success-foreground">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">Was der Check leistet</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li>· Schneller technischer Scan deiner Startseite</li>
              <li>· Erste Einschätzung zu Performance, Barrierefreiheit & SEO</li>
              <li>· Auflistung der häufigsten technisch erkennbaren Barrieren</li>
              <li>· Sofortiges Ergebnis, ohne Anmeldung</li>
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-warning/40 bg-warning/5 p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-warning text-warning-foreground">
                <AlertCircle className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">Was er nicht leisten kann</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li>· Keine vollständige BFSG-Konformitätsbewertung</li>
              <li>· Keine manuelle Prüfung mit Screenreader oder Tastatur</li>
              <li>· Keine Bewertung der Sinnhaftigkeit von Texten oder Alt-Tags</li>
              <li>· Kein Ersatz für ein vollständiges Audit</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-surface p-6 text-center text-muted-foreground">
          Ein automatischer Check kann etwa <strong className="text-foreground">30 %</strong> der Barrieren finden. Er
          erkennt zwar, ob ein Bild einen Alternativtext hat, aber nicht, ob dieser Text auch sinnvoll ist. Für eine
          vollständige BFSG-Konformität und echte Rechtssicherheit ist eine manuelle Prüfung durch Experten
          unverzichtbar. Unser Check ist der Startschuss – das Audit ist die Zielgerade.
        </div>
      </Section>

      {/* Nächste Schritte */}
      <Section tone="surface">
        <SectionHeading eyebrow="Und dann?" title="Deine nächsten Schritte." />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Schau dir das Ergebnis des Schnelltests genau an.",
            "Wenn Fehler gefunden wurden: Keine Panik, aber handle zeitnah.",
            "Buche ein Audit oder ein Beratungsgespräch, um die Fehler professionell zu beheben.",
          ].map((step, i) => (
            <li key={i} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                {i + 1}
              </div>
              <p className="text-foreground">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <CTAButton to="/kontakt">Jetzt vollständiges Audit anfragen</CTAButton>
          <CTAButton to="/leistungen/bfsg-audit" variant="ghost">
            Mehr zum Audit erfahren
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

void ListOrdered;
