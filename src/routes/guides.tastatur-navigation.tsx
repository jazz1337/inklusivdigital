import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, Keyboard } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/guides/tastatur-navigation")({
  head: () => ({
    meta: [
      { title: "Tastatur-Navigation – InklusivDigital" },
      {
        name: "description",
        content:
          "Wie implementiert man vollständige Tastaturnavigation? Praxisguide mit interaktiven Demos, Fokus-Management und Code-Beispielen.",
      },
    ],
  }),
  component: TastaturNavigationPage,
});

function TastaturNavigationPage() {
  return (
    <>
      {/* Banner – Split: Text links (dunkel), Bild rechts */}
      <div className="border-b border-border">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center bg-foreground px-4 py-12 md:px-10 md:py-16">
            <div>
              <p className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Guides & Praxis
              </p>
              <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Tastatur-Navigation
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/70 md:text-base">
                Über 7 % der Internetnutzer verwenden keine Maus. Vollständige Tastaturnavigation ist Pflicht nach WCAG 2.1 – jede Funktion muss per Tastatur erreichbar sein.
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}Banner_Tastatur_16-9.jpg`}
              alt="Blinder Mann mit Kopfhörern und schwarzer Sonnenbrille tippt auf einer Tastatur – der Finger liegt auf der Tab-Taste, im Hintergrund läuft ein Online-Shop auf dem Monitor"
              className="h-full w-full object-cover"
              style={{ minHeight: "280px" }}
            />
          </div>
        </div>
      </div>

      <Section>
        <SectionHeading
          eyebrow="Interaktive Demo"
          title="Mit und ohne sichtbaren Fokus"
          intro="Drücke Tab, um durch die Elemente zu navigieren. Der Unterschied zwischen gutem und schlechtem Fokus-Management ist sofort spürbar."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <FocusDemo variant="bad" />
          <FocusDemo variant="good" />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Die Regeln" title="Was Tastaturnavigation erfordert" />
        <div className="mt-10 space-y-4">
          {REQUIREMENTS.map((r) => (
            <RequirementCard key={r.criterion} {...r} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Code" title="Fokus-Stile implementieren" align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <CodeBlock
            label="Schlechtes Beispiel – Fokus versteckt"
            variant="bad"
            code={`/* Häufigster Fehler in der Praxis */
* {
  outline: none; /* NIEMALS so! */
}

button:focus {
  outline: 0; /* Ebenfalls verboten */
}`}
          />
          <CodeBlock
            label="Gutes Beispiel – sichtbarer Fokus"
            variant="good"
            code={`/* Fokus-Ring mit ausreichend Kontrast */
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Für Screenreader: Fokus nur bei Tastatur */
:focus:not(:focus-visible) {
  outline: none;
}`}
          />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CodeBlock
            label="Skip-Link implementieren"
            variant="good"
            code={`<!-- Erster Link auf der Seite -->
<a
  href="#main-content"
  class="skip-link"
>
  Zum Hauptinhalt springen
</a>

<style>
.skip-link {
  position: absolute;
  transform: translateY(-100%);
}
.skip-link:focus {
  transform: translateY(0);
}
</style>`}
          />
          <CodeBlock
            label="Fokus-Falle vermeiden (Modal)"
            variant="good"
            code={`// Fokus im Modal halten
const focusable = modal.querySelectorAll(
  'button, [href], input, select, textarea,
   [tabindex]:not([tabindex="-1"])'
);
const first = focusable[0];
const last = focusable[focusable.length - 1];

last.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && !e.shiftKey) {
    e.preventDefault();
    first.focus();
  }
});`}
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
            Tastatur-Audit anfragen
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

function FocusDemo({ variant }: { variant: "good" | "bad" }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = ["Navigation", "Hauptinhalt", "Suche", "Kontakt"];

  return (
    <div
      className={`rounded-2xl border p-5 ${
        variant === "good" ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
      }`}
    >
      <div className="mb-4 flex items-center gap-2">
        {variant === "good" ? (
          <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />
        ) : (
          <XCircle className="h-4 w-4 text-destructive" aria-hidden />
        )}
        <span
          className={`text-sm font-semibold ${
            variant === "good" ? "text-success" : "text-destructive"
          }`}
        >
          {variant === "good" ? "Sichtbarer Fokus-Ring" : "Kein Fokus-Ring (outline: none)"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <button
            key={item}
            onFocus={() => setActiveIndex(i)}
            onBlur={() => setActiveIndex(null)}
            className={`rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition ${
              variant === "good"
                ? "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                : "focus:outline-none"
            } ${activeIndex === i && variant === "bad" ? "bg-muted" : ""}`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Keyboard className="h-3.5 w-3.5" aria-hidden />
        Drücke Tab zum Testen
      </p>
    </div>
  );
}

function RequirementCard({
  criterion,
  title,
  description,
  level,
}: {
  criterion: string;
  title: string;
  description: string;
  level: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
        {criterion}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground">
            {level}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
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

const REQUIREMENTS = [
  {
    criterion: "2.1.1",
    title: "Tastatur",
    level: "Level A",
    description:
      "Alle Funktionalitäten müssen per Tastatur bedienbar sein. Keine Ausnahmen für zeitbasierte Pfadkurven.",
  },
  {
    criterion: "2.1.2",
    title: "Keine Tastaturfalle",
    level: "Level A",
    description:
      'Nutzer dürfen nicht in einem Element gefangen werden. Modals müssen mit Escape schließbar sein.',
  },
  {
    criterion: "2.4.3",
    title: "Fokus-Reihenfolge",
    level: "Level A",
    description:
      "Die Tab-Reihenfolge muss der visuellen und logischen Reihenfolge entsprechen.",
  },
  {
    criterion: "2.4.7",
    title: "Sichtbarer Fokus",
    level: "Level AA",
    description:
      "Jedes per Tastatur fokussierbare Element muss einen sichtbaren Fokus-Indikator haben.",
  },
];

const CHECKLIST = [
  "Alle Links, Buttons und Formularfelder sind per Tab erreichbar.",
  "Der Fokus-Ring ist deutlich sichtbar (mind. 3:1 Kontrast zum Hintergrund).",
  "outline: none wird nirgends global gesetzt.",
  'Ein Skip-Link "Zum Hauptinhalt" ist der erste Link der Seite.',
  "Modals und Dialoge halten den Fokus innerhalb und schließen mit Escape.",
  "Die Tab-Reihenfolge entspricht der visuellen Lesereihenfolge.",
  "Dropdown-Menüs sind mit Pfeil-Tasten steuerbar.",
];
