import { createFileRoute } from "@tanstack/react-router";
import {
  ScanSearch,
  UserCheck,
  Volume2,
  Keyboard,
  Eye,
  FormInput,
  ListChecks,
  FileText,
  GitCompare,
  Award,
  Bot,
  HandMetal,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { PageSpeedScanner } from "@/components/site/PageSpeedScanner";

export const Route = createFileRoute("/leistungen/bfsg-audit")({
  head: () => ({
    meta: [
      { title: "BFSG-Audit & Analyse – InklusivDigital" },
      {
        name: "description",
        content:
          "Vollständiges BFSG-Audit deiner Website: automatisierte und manuelle Prüfung, priorisierter Maßnahmenplan, WCAG 2.1 Konformitätsbewertung.",
      },
      { property: "og:title", content: "BFSG-Audit & Analyse – InklusivDigital" },
      { property: "og:description", content: "Klarheit über deine Barrieren – mit konkretem Maßnahmenplan." },
    ],
  }),
  component: BfsgAuditPage,
});

const ERGEBNISSE = [
  {
    icon: ListChecks,
    title: "Priorisierte Mängelliste",
    text: "Wir sortieren Fehler nach Dringlichkeit. Du weißt sofort, was sofort gelöst werden muss – und was Zeit hat.",
  },
  {
    icon: FileText,
    title: "Konkrete Handlungsempfehlungen",
    text: "Kein Fachchinesisch. Wir sagen dir (oder deinen Entwicklern) genau, was zu tun ist.",
  },
  {
    icon: GitCompare,
    title: "Gap-Analyse",
    text: "Wir zeigen dir schwarz auf weiß, wo du stehst (Ist) und was für die BFSG-Konformität noch fehlt (Soll).",
  },
  {
    icon: Award,
    title: "WCAG 2.1 Konformitätsbewertung",
    text: "Eine professionelle Einschätzung nach international gültigen Standards – als Dokument für deine Unterlagen.",
  },
];

const PRUEFBEREICHE = [
  {
    icon: Bot,
    title: "Automatisierte Prüfung",
    text: "Spezialisierte Software scannt deine gesamte Domain und findet technische Fehler im Code – schnell und flächendeckend.",
  },
  {
    icon: HandMetal,
    title: "Manuelle Expertenprüfung",
    text: "Tools finden nur ca. 30 % aller Barrieren. Unsere Experten prüfen den Rest – logische Reihenfolge, Sinnhaftigkeit, Screenreader-Verhalten.",
  },
  {
    icon: Volume2,
    title: "Screenreader-Test",
    text: "Wir testen mit NVDA und JAWS, damit Menschen mit Sehbehinderung wirklich alle Informationen erhalten und navigieren können.",
  },
  {
    icon: Keyboard,
    title: "Tastaturbedienbarkeit",
    text: "Alle Menüs, Buttons und Links müssen allein mit der Tastatur erreichbar sein – ohne Maus.",
  },
  {
    icon: Eye,
    title: "Kontraste & visuelle Zugänglichkeit",
    text: "Wir messen Kontrastverhältnisse und prüfen Skalierbarkeit für Menschen mit Sehschwäche oder unter schwierigen Lichtverhältnissen.",
  },
  {
    icon: FormInput,
    title: "Formulare & interaktive Elemente",
    text: "Fehlermeldungen, Beschriftungen, Eingabefelder – wir stellen sicher, dass Nutzer Prozesse ohne fremde Hilfe abschließen können.",
  },
];

const ZIELGRUPPEN = [
  { title: "Du willst Klarheit", text: "Du weißt, dass du etwas tun musst, aber nicht, wie groß die Baustelle ist." },
  { title: "Du brauchst ein Gutachten", text: "Du benötigst ein unabhängiges Dokument für deine Unterlagen oder Behörden." },
  { title: "Du bist akut betroffen", text: "Du hast bereits eine Abmahnung oder einen Hinweis von Behörden erhalten." },
  { title: "Du planst einen Relaunch", text: "Du willst von Anfang an alles richtig machen und keine Nacharbeit." },
];

function BfsgAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistung · Audit"
        title="Endlich Klarheit: Dein Fahrplan zur barrierefreien Website"
        intro="Du weißt, dass du etwas tun musst, aber nicht, wo du anfangen sollst? Wir prüfen deine Website systematisch und liefern dir einen konkreten, sofort umsetzbaren Maßnahmenplan."
      >
        <CTAButton to="/kontakt">Jetzt BFSG-Audit anfragen</CTAButton>
      </PageHero>

      {/* 1. Was du bekommst – sofort sichtbar */}
      <Section>
        <SectionHeading
          eyebrow="Das Ergebnis"
          title="Was du von uns bekommst."
          intro="Nach dem Audit lassen wir dich nicht mit einem 100-seitigen PDF allein. Du erhältst konkrete, sofort umsetzbare Unterlagen:"
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {ERGEBNISSE.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/30"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/10 text-success">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm text-muted-foreground">
          Dein Bericht ist so aufbereitet, dass er sofort als Briefing dienen kann – egal ob du die Maßnahmen
          mit uns, deinem Team oder einer anderen Agentur umsetzt.
        </p>
      </Section>

      {/* 2. Wie wir prüfen */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Wie wir prüfen"
          title="Sechs Kernbereiche, ein vollständiges Bild."
          intro="Wir kombinieren automatisierte Tools mit manueller Expertenprüfung. Nur so findet man wirklich alle Barrieren."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRUEFBEREICHE.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Bot className="h-4 w-4" aria-hidden /> Automatisiert
            </div>
            <h3 className="font-display text-2xl font-bold">Schnell & flächendeckend</h3>
            <p className="mt-3 text-muted-foreground">
              Findet ca. <strong className="text-foreground">30 %</strong> aller Barrieren – technische Fehler im Code über die gesamte Domain.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-primary/5 p-7">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <HandMetal className="h-4 w-4" aria-hidden /> Manuell
            </div>
            <h3 className="font-display text-2xl font-bold">Tief & sinnvoll</h3>
            <p className="mt-3 text-muted-foreground">
              Erst hier findest du die <strong className="text-foreground">restlichen 70 %</strong> – Logik, Verständlichkeit, echtes Nutzerverhalten.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Für wen */}
      <Section>
        <SectionHeading eyebrow="Für wen?" title="Ist dieses Audit das Richtige für dich?" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ZIELGRUPPEN.map(({ title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent-foreground">
                <UserCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. CTA */}
      <Section tone="surface">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-hero)] p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <ScanSearch className="mx-auto h-10 w-10 text-primary" aria-hidden />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Bereit für Klarheit?</h2>
            <p className="mt-4 text-muted-foreground">
              Du willst erst mal nur einen schnellen Überblick? Nutze unseren kostenlosen Schnelltest –
              oder fordere direkt das vollständige Audit an.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <CTAButton to="/kontakt">Jetzt BFSG-Audit anfragen</CTAButton>
              <CTAButton to="/bfsg-check" variant="ghost">
                Schnelltest starten
              </CTAButton>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <PageSpeedScanner />
          </div>
        </div>
      </Section>
    </>
  );
}
