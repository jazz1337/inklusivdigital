import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/guides/kontrast")({
  head: () => ({
    meta: [
      { title: "Kontrastverhältnisse & Lesbarkeit – InklusivDigital" },
      {
        name: "description",
        content:
          "WCAG-Kontrastverhältnisse erklärt: Was bedeutet 4,5:1? Interaktive Demo, Praxisbeispiele und Werkzeuge zur Kontrastprüfung.",
      },
    ],
  }),
  component: KontrastPage,
});

function KontrastPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides & Praxis"
        title="Kontrastverhältnisse & Lesbarkeit"
        intro="8 % der Männer und 0,5 % der Frauen haben eine Farbsehschwäche. Hinzu kommen Nutzer in hellem Sonnenlicht oder mit gealtertem Display. Ausreichender Kontrast hilft allen."
      />

      <Section>
        <SectionHeading
          eyebrow="Interaktive Demo"
          title="Kontrast live erleben"
          intro="Schalte zwischen den Szenarien um, um den Unterschied zu sehen."
        />
        <div className="mt-10">
          <ContrastDemo />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Die Standards" title="Was WCAG verlangt" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STANDARDS.map((s) => (
            <StandardCard key={s.ratio} {...s} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Praxisbeispiele" title="Häufige Fehler und Lösungen" align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {EXAMPLES.map((ex) => (
            <ExampleCard key={ex.title} {...ex} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Werkzeuge" title="Kontrast prüfen" align="center" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TOOLS.map((t) => (
            <ToolCard key={t.name} {...t} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTAButton to="/kontakt" variant="secondary">
            Kontrast-Audit anfragen
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

function ContrastDemo() {
  const scenarios = [
    {
      id: "fail",
      label: "Unzureichend (1,5:1)",
      fg: "#aaaaaa",
      bg: "#ffffff",
      passes: false,
      ratio: "1,5:1",
    },
    {
      id: "aa-large",
      label: "AA Großschrift (3:1)",
      fg: "#767676",
      bg: "#ffffff",
      passes: true,
      ratio: "3,0:1",
    },
    {
      id: "aa",
      label: "AA Standard (4,5:1)",
      fg: "#595959",
      bg: "#ffffff",
      passes: true,
      ratio: "4,5:1",
    },
    {
      id: "aaa",
      label: "AAA (7:1)",
      fg: "#1a1a1a",
      bg: "#ffffff",
      passes: true,
      ratio: "7,0:1",
    },
  ];

  const [active, setActive] = useState(scenarios[0].id);
  const current = scenarios.find((s) => s.id === active)!;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex flex-wrap gap-2">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              active === s.id
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-foreground hover:bg-secondary"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div
        className="rounded-xl p-8 transition-colors"
        style={{ backgroundColor: current.bg }}
      >
        <p
          className="text-2xl font-bold transition-colors"
          style={{ color: current.fg }}
        >
          Die schnelle braune Fuchs springt über den faulen Hund.
        </p>
        <p className="mt-3 text-sm transition-colors" style={{ color: current.fg }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Kontrasttext für kleinere Schriftgrößen.
        </p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        {current.passes ? (
          <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />
        ) : (
          <XCircle className="h-5 w-5 text-destructive" aria-hidden />
        )}
        <span className="text-sm font-semibold">
          Kontrastverhältnis: {current.ratio} –{" "}
          <span className={current.passes ? "text-success" : "text-destructive"}>
            {current.passes ? "Bestanden" : "Nicht bestanden"}
          </span>
        </span>
      </div>
    </div>
  );
}

function StandardCard({
  ratio,
  level,
  scope,
  description,
  passes,
}: {
  ratio: string;
  level: string;
  scope: string;
  description: string;
  passes: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 text-3xl font-bold text-primary font-display">{ratio}</div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          {level}
        </span>
        <span className="text-xs text-muted-foreground">{scope}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function ExampleCard({
  title,
  bad,
  good,
  badRatio,
  goodRatio,
}: {
  title: string;
  bad: { fg: string; bg: string; text: string };
  good: { fg: string; bg: string; text: string };
  badRatio: string;
  goodRatio: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 font-display text-base font-bold text-foreground">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div
            className="flex min-h-16 items-center justify-center rounded-lg p-3 text-sm font-medium"
            style={{ color: bad.fg, backgroundColor: bad.bg }}
          >
            {bad.text}
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-destructive">
            <XCircle className="h-3.5 w-3.5" aria-hidden /> {badRatio}
          </p>
        </div>
        <div>
          <div
            className="flex min-h-16 items-center justify-center rounded-lg p-3 text-sm font-medium"
            style={{ color: good.fg, backgroundColor: good.bg }}
          >
            {good.text}
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-success">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> {goodRatio}
          </p>
        </div>
      </div>
    </div>
  );
}

function ToolCard({
  name,
  description,
  type,
}: {
  name: string;
  description: string;
  type: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {type}
      </span>
      <h3 className="font-display text-base font-bold text-foreground">{name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

const STANDARDS = [
  {
    ratio: "4,5:1",
    level: "AA",
    scope: "Normaler Text",
    description: "Für Text unter 18pt (bzw. 14pt fett). Das ist der Mindeststandard nach WCAG 2.1.",
    passes: true,
  },
  {
    ratio: "3:1",
    level: "AA",
    scope: "Großer Text",
    description: "Für Text ab 18pt (bzw. 14pt fett) und für UI-Komponenten wie Buttons und Eingabefelder.",
    passes: true,
  },
  {
    ratio: "7:1",
    level: "AAA",
    scope: "Alle Texte",
    description: "Höchste Stufe. Empfohlen für kritische Inhalte wie Warnungen oder medizinische Informationen.",
    passes: true,
  },
];

const EXAMPLES = [
  {
    title: "Hellgrauer Text auf weißem Hintergrund",
    bad: { fg: "#bbbbbb", bg: "#ffffff", text: "Kaufen" },
    good: { fg: "#595959", bg: "#ffffff", text: "Kaufen" },
    badRatio: "1,6:1 – nicht bestanden",
    goodRatio: "4,6:1 – bestanden",
  },
  {
    title: "Farbiger Button-Text",
    bad: { fg: "#ff9900", bg: "#ffffff", text: "Jetzt bestellen" },
    good: { fg: "#b85c00", bg: "#ffffff", text: "Jetzt bestellen" },
    badRatio: "2,3:1 – nicht bestanden",
    goodRatio: "4,8:1 – bestanden",
  },
  {
    title: "Weißer Text auf farbigem Hintergrund",
    bad: { fg: "#ffffff", bg: "#5b9bd5", text: "Mehr erfahren" },
    good: { fg: "#ffffff", bg: "#1a5fa8", text: "Mehr erfahren" },
    badRatio: "3,0:1 – nur für Großschrift",
    goodRatio: "5,9:1 – bestanden",
  },
  {
    title: "Placeholder-Text in Formularen",
    bad: { fg: "#d0d0d0", bg: "#ffffff", text: "E-Mail eingeben…" },
    good: { fg: "#767676", bg: "#ffffff", text: "E-Mail eingeben…" },
    badRatio: "1,2:1 – nicht bestanden",
    goodRatio: "4,5:1 – bestanden",
  },
];

const TOOLS = [
  {
    name: "WebAIM Contrast Checker",
    type: "Browser-Tool",
    description: "Einfache Web-App: Hex-Farben eingeben, sofort Ergebnis. Ideal für schnelle Checks.",
  },
  {
    name: "axe DevTools",
    type: "Browser-Extension",
    description: "Scannt die gesamte Seite auf Kontrast- und andere WCAG-Probleme direkt im Browser.",
  },
  {
    name: "Figma A11y Annotation Kit",
    type: "Design-Tool",
    description: "Kontrastprüfung direkt im Figma-Design, bevor eine Zeile Code geschrieben wird.",
  },
];
