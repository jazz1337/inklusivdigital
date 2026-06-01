import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/guides/alttexte")({
  head: () => ({
    meta: [
      { title: "Alt-Texte richtig schreiben – InklusivDigital" },
      {
        name: "description",
        content:
          "Wie schreibt man gute Alt-Texte für Bilder? Praxisguide mit interaktiven Beispielen, Checkliste und Code-Snippets.",
      },
    ],
  }),
  component: AlttextePage,
});

function AlttextePage() {
  return (
    <>
      {/* Banner – 16:9 Vollbreite mit Overlay */}
      <div className="relative overflow-hidden border-b border-border">
        <img
          src={`${import.meta.env.BASE_URL}Banner_Alttexte_16-9.jpg`}
          alt="Frau mit Kopfhörern arbeitet am Laptop – auf dem Bildschirm sind Alt-Text-Tooltips über Produktbildern sichtbar, die der Screenreader vorliest"
          className="aspect-[16/9] w-full object-cover md:aspect-[21/7]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
            <p className="mb-3 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              Guides & Praxis
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Alt-Texte richtig schreiben
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/80 md:text-base md:text-lg">
              Alt-Texte sind die Beschreibung eines Bildes für Nutzer, die es nicht sehen können – Screenreader-Nutzer, aber auch Suchmaschinen.
            </p>
          </div>
        </div>
      </div>

      <Section>
        <SectionHeading
          eyebrow="Interaktive Demo"
          title="Mit und ohne Alt-Text"
          intro="Hover über die Bilder oder aktiviere die Screenreader-Simulation, um den Unterschied zu erleben."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <AltTextDemo
            label="Schlechtes Beispiel"
            altText="bild_schuhe_01.jpg"
            variant="bad"
            description="Dateiname als Alt-Text – gibt Nutzern keine Information."
          />
          <AltTextDemo
            label="Gutes Beispiel"
            altText="Blaue Laufschuhe mit weißer Sohle, Seitenansicht auf weißem Hintergrund"
            variant="good"
            description="Beschreibt den relevanten Inhalt und Kontext des Bildes präzise."
          />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Die Regeln" title="Was macht einen guten Alt-Text aus?" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {RULES.map((r) => (
            <RuleCard key={r.title} {...r} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Code" title="Implementierung" align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <CodeBlock
            label="Schlechtes Beispiel"
            variant="bad"
            code={`<img src="produkt.jpg" alt="Bild" />
<!-- oder komplett ohne alt-Attribut -->
<img src="produkt.jpg" />`}
          />
          <CodeBlock
            label="Gutes Beispiel"
            variant="good"
            code={`<!-- Informatives Bild -->
<img
  src="produkt.jpg"
  alt="Blaue Laufschuhe, Modell AirRun Pro,
       Ansicht von der Seite"
/>

<!-- Dekoratives Bild -->
<img src="trennlinie.svg" alt="" role="presentation" />`}
          />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Checkliste" title="Vor dem Veröffentlichen prüfen" align="center" />
        <ul className="mx-auto mt-8 max-w-xl space-y-3">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <CTAButton to="/kontakt" variant="secondary">
            Unsere Experten fragen
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

function AltTextDemo({
  label,
  altText,
  variant,
  description,
}: {
  label: string;
  altText: string;
  variant: "good" | "bad";
  description: string;
}) {
  const [showAlt, setShowAlt] = useState(false);

  return (
    <div
      className={`rounded-2xl border p-5 ${
        variant === "good" ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`flex items-center gap-2 text-sm font-semibold ${
            variant === "good" ? "text-success" : "text-destructive"
          }`}
        >
          {variant === "good" ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden />
          ) : (
            <XCircle className="h-4 w-4" aria-hidden />
          )}
          {label}
        </span>
        <button
          onClick={() => setShowAlt((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-secondary"
          aria-pressed={showAlt}
        >
          {showAlt ? <EyeOff className="h-3.5 w-3.5" aria-hidden /> : <Eye className="h-3.5 w-3.5" aria-hidden />}
          {showAlt ? "Bild" : "Alt-Text"}
        </button>
      </div>
      <div className="min-h-32 rounded-xl border border-border bg-card">
        {showAlt ? (
          <div className="flex min-h-40 items-center justify-center p-6 text-sm text-muted-foreground">
            <p className="italic text-center">„{altText}"</p>
          </div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}Beispielfoto_Sneaker_Blau.jpg`}
            alt={variant === "good" ? "Blaue Laufschuhe mit weißer Sohle, Seitenansicht auf weißem Hintergrund" : ""}
            className="h-40 w-full rounded-xl object-cover"
          />
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function RuleCard({
  title,
  good,
  bad,
}: {
  title: string;
  good: string;
  bad: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
      <div className="mt-3 space-y-2 text-sm">
        <p className="flex items-start gap-2 text-destructive">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {bad}
        </p>
        <p className="flex items-start gap-2 text-success">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {good}
        </p>
      </div>
    </div>
  );
}

function CodeBlock({
  label,
  variant,
  code,
}: {
  label: string;
  variant: "good" | "bad";
  code: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        variant === "good" ? "border-success/30" : "border-destructive/30"
      }`}
    >
      <span
        className={`mb-3 block text-xs font-semibold uppercase tracking-wider ${
          variant === "good" ? "text-success" : "text-destructive"
        }`}
      >
        {label}
      </span>
      <pre className="overflow-x-auto rounded-lg bg-muted/50 p-4 text-xs leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const RULES = [
  {
    title: "Inhalt statt Aussehen beschreiben",
    bad: '„Blaues Banner mit weißem Text" – beschreibt Aussehen, nicht Inhalt',
    good: '„Sonderangebot: 20 % Rabatt auf alle Winterartikel bis 31. Januar"',
  },
  {
    title: "Keine Redundanz",
    bad: '„Bild von einem Hund" – das Wort Bild ist überflüssig',
    good: '„Golden Retriever läuft durch einen Herbstwald"',
  },
  {
    title: "Dekorative Bilder leer lassen",
    bad: "`alt=\"Trennlinie\"` für ein reines Designelement",
    good: "`alt=\"\"` und `role=\"presentation\"` für dekorative Grafiken",
  },
  {
    title: "Kontext einbeziehen",
    bad: '„Logo" – ohne Kontext unklar',
    good: '„InklusivDigital Logo – zur Startseite"',
  },
];

const CHECKLIST = [
  "Jedes informative Bild hat ein alt-Attribut mit inhaltlicher Beschreibung.",
  "Dekorative Bilder haben alt=\"\" und werden von Screenreadern übersprungen.",
  "Der Alt-Text ist unter 125 Zeichen (Screenreader-Empfehlung).",
  "Diagramme und Infografiken haben eine ausführlichere Textalternative.",
  "Buttons mit nur Icon-Inhalt haben ein aria-label.",
  "Logos verlinken auf die Startseite und nennen den Firmennamen im Alt-Text.",
];
