import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, XCircle, AlertTriangle, Scale } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/recht/widerrufsbutton")({
  head: () => ({
    meta: [
      { title: "Der Widerrufsbutton – §312j BGB erklärt – InklusivDigital" },
      {
        name: "description",
        content:
          "Seit 2022 Pflicht: Der Widerrufsbutton nach §312j BGB. Wer ist betroffen, was muss der Button leisten, und was droht bei Verstoß?",
      },
    ],
  }),
  component: WiderrufsButtonPage,
});

function WiderrufsButtonPage() {
  return (
    <>
      <PageHero
        eyebrow="Recht & Pflichten"
        title='Der Widerrufsbutton nach §312j BGB'
        intro='Seit dem 1. Juli 2022 müssen Online-Händler in der EU einen standardisierten Bestellbutton einsetzen, der klar und deutlich auf die Zahlungspflicht hinweist. Ein häufig übersehenes Detail mit hohem Abmahn-Risiko.'
      />

      <Section>
        <SectionHeading
          eyebrow="Die Pflicht"
          title="Was der Gesetzgeber verlangt"
        />
        <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-start gap-4">
            <Scale className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden />
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">§ 312j Abs. 3 BGB</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                „Der Unternehmer hat sicherzustellen, dass der Verbraucher mit seiner Bestellung ausdrücklich bestätigt, dass er sich zu einer Zahlung verpflichtet. Erfolgt die Bestellung über eine Schaltfläche, ist diese Pflicht nur erfüllt, wenn diese Schaltfläche gut lesbar mit nichts anderem als den Wörtern{" "}
                <strong className="text-foreground">‚zahlungspflichtig bestellen'</strong>{" "}
                oder einer entsprechenden eindeutigen Formulierung beschriftet ist."
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Beispiele" title="Erlaubt vs. nicht erlaubt" />
        <div className="mt-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-destructive">
                <XCircle className="h-5 w-5" aria-hidden /> Nicht erlaubt
              </h3>
              {INVALID_BUTTONS.map((btn) => (
                <InvalidButton key={btn.label} {...btn} />
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-success">
                <CheckCircle2 className="h-5 w-5" aria-hidden /> Erlaubt
              </h3>
              {VALID_BUTTONS.map((btn) => (
                <ValidButton key={btn.label} {...btn} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Wer ist betroffen?" title="Anwendungsbereich" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SCOPE.map((item) => (
            <ScopeCard key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Risiken" title="Was passiert bei Verstoß?" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {RISKS.map((r) => (
            <RiskCard key={r.title} {...r} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Verwandte Gesetze" title="Das BFSG und der Widerrufsbutton" intro="Das Barrierefreiheitsstärkungsgesetz (BFSG) greift seit dem 28. Juni 2025. Es ergänzt §312j BGB: Ein barrierefreier Bestellprozess muss beides erfüllen." align="center" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-base font-bold text-foreground">§312j BGB – Widerrufsbutton</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> Klare Beschriftung mit Zahlungshinweis</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> Gut lesbar und prominent platziert</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> Gilt für alle B2C Online-Shops in der EU</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-base font-bold text-foreground">BFSG – Barrierefreiheit</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> Tastatur-Bedienbarkeit des Buttons</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> Ausreichender Farbkontrast (min. 4,5:1)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> Screenreader-kompatible Beschriftung</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center">
          <CTAButton to="/leistungen/bfsg-audit" variant="primary">
            Shop-Audit anfragen
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

function InvalidButton({ label, reason }: { label: string; reason: string }) {
  return (
    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
      <button
        disabled
        className="w-full cursor-not-allowed rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 opacity-75"
        aria-label={`Beispiel: unzulässige Beschriftung "${label}"`}
      >
        {label}
      </button>
      <p className="mt-2 flex items-start gap-2 text-xs text-destructive">
        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {reason}
      </p>
    </div>
  );
}

function ValidButton({ label, note }: { label: string; note: string }) {
  return (
    <div className="rounded-xl border border-success/20 bg-success/5 p-4">
      <button
        disabled
        className="w-full cursor-not-allowed rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground opacity-75"
        aria-label={`Beispiel: zulässige Beschriftung "${label}"`}
      >
        {label}
      </button>
      <p className="mt-2 flex items-start gap-2 text-xs text-success">
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {note}
      </p>
    </div>
  );
}

function ScopeCard({
  title,
  description,
  applies,
}: {
  title: string;
  description: string;
  applies: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        applies ? "border-success/20 bg-success/5" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-2">
        {applies ? (
          <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />
        ) : (
          <XCircle className="h-5 w-5 text-muted-foreground" aria-hidden />
        )}
        <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function RiskCard({
  title,
  description,
  severity,
}: {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}) {
  const colors = {
    high: "border-destructive/30 bg-destructive/5",
    medium: "border-warning/30 bg-warning/5",
    low: "border-border bg-card",
  };
  return (
    <div className={`rounded-2xl border p-5 ${colors[severity]}`}>
      <AlertTriangle
        className={`mb-3 h-5 w-5 ${
          severity === "high" ? "text-destructive" : severity === "medium" ? "text-warning-foreground" : "text-muted-foreground"
        }`}
        aria-hidden
      />
      <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

const INVALID_BUTTONS = [
  { label: "Weiter", reason: "Kein Hinweis auf Zahlungspflicht" },
  { label: "Bestellen", reason: "Zu allgemein – keine klare Kostenpflicht erkennbar" },
  { label: "Kaufen", reason: "Nach EuGH-Rechtsprechung nicht ausreichend eindeutig" },
  { label: "Jetzt anmelden", reason: "Suggeriert kostenfreie Aktion" },
];

const VALID_BUTTONS = [
  { label: "Zahlungspflichtig bestellen", note: "Gesetzliche Formulierung – immer zulässig" },
  { label: "Kostenpflichtig bestellen", note: "Anerkannte gleichwertige Formulierung" },
  { label: "Jetzt kaufen – zahlungspflichtig", note: "Kombination mit klarem Zahlungshinweis" },
  { label: "Für 29,99 € bestellen", note: "Preisangabe macht Zahlungspflicht eindeutig" },
];

const SCOPE = [
  {
    title: "Online-Shops (B2C)",
    description: "Alle Shops, die Waren oder Dienstleistungen an Verbraucher verkaufen. Unabhängig von Größe oder Umsatz.",
    applies: true,
  },
  {
    title: "Abonnement-Dienste",
    description: "SaaS, Streaming, Mitgliedschaften – sobald eine Zahlungsverpflichtung entsteht.",
    applies: true,
  },
  {
    title: "Kostenlose Angebote",
    description: "Rein kostenfreie Downloads, Anmeldungen ohne Zahlungspflicht – §312j greift hier nicht.",
    applies: false,
  },
  {
    title: "B2B-Shops",
    description: "Reines B2B ohne Verbrauchergeschäft ist ausgenommen. Mischbetrieb (B2B+B2C) unterliegt der Pflicht.",
    applies: false,
  },
];

const RISKS = [
  {
    title: "Abmahnungen",
    description: "Wettbewerber und Verbraucherschutzverbände können abmahnen. Kosten: 1.000–3.000 € pro Abmahnung.",
    severity: "high" as const,
  },
  {
    title: "Vertragsunwirksamkeit",
    description: "Ein Vertrag ohne korrekten Bestellbutton kommt rechtlich gar nicht zustande – der Käufer schuldet nichts.",
    severity: "high" as const,
  },
  {
    title: "Imageschaden",
    description: "Öffentliche Abmahnverfahren können das Vertrauen von Kunden in den Shop beschädigen.",
    severity: "medium" as const,
  },
];
