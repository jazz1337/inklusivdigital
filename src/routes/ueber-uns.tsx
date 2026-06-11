import { createFileRoute } from "@tanstack/react-router";
import {
  ShoppingBag,
  Scale,
  Bot,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns – InklusivDigital" },
      {
        name: "description",
        content:
          "Zwei E-Commerce-Profis, die Barrierefreiheit aus der Praxis kennen. Kein Agentur-Bullshit – nur Lösungen, die im echten Shop-Alltag funktionieren.",
      },
      { property: "og:title", content: "Über uns – InklusivDigital" },
      { property: "og:description", content: "Zwei E-Commerce-Profis. Ein klares Ziel: Rechtssicherheit ohne Umwege." },
    ],
  }),
  component: UeberUnsPage,
});

function UeberUnsPage() {
  return (
    <>
      {/* HERO – dunkel, direkt */}
      <div className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/70">
            Über uns
          </p>
          <h1 className="font-display max-w-4xl text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
            Barrierefreiheit<br />
            <span className="text-primary">aus der Praxis.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
            Wir sind keine klassische Agentur. Wir kommen aus dem E-Commerce – und kennen den Druck,
            unter dem Online-Shops täglich stehen. Das BFSG ist kein Bürokratieproblem.
            Es ist eine Chance. Wir helfen euch, sie zu nutzen.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Gespräch vereinbaren <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/leistungen/bfsg-audit"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </div>

      {/* ORIGIN STORY */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Unsere Geschichte"
              title="Warum wir InklusivDigital gegründet haben."
            />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Als E-Commerce-Kaufleute haben wir jahrelang Online-Shops aufgebaut, optimiert
                und skaliert. Dabei sind wir immer wieder auf dasselbe Problem gestoßen:
                Barrierefreiheit wurde als lästige Pflicht behandelt – oder komplett ignoriert.
              </p>
              <p>
                Mit dem BFSG ändert sich das. Shops, die nicht konform sind, riskieren
                Abmahnungen und Bußgelder. Aber wer das als reine Bedrohung sieht,
                verpasst das Große Bild: Barrierefreie Shops konvertieren besser,
                ranken höher und erreichen mehr Kunden.
              </p>
              <p className="font-medium text-foreground">
                InklusivDigital ist unsere Antwort – pragmatisch, technisch fundiert,
                ohne den Overhead einer klassischen Agentur.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard value="BFSG" label="seit 28. Juni 2025 in Kraft" highlight />
            <StatCard value="100 K€" label="Bußgeld bei Verstoß möglich" />
            <StatCard value="20 %+" label="der Nutzer profitieren direkt" />
            <StatCard value="30 %" label="findet Automatik allein" />
          </div>
        </div>
      </Section>

      {/* EXPERTISE */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Unsere Expertise"
          title="Was wir wirklich können."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTISE.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TEAM */}
      <Section>
        <SectionHeading
          eyebrow="Das Team"
          title="Zwei Kaufleute. Ein Ziel."
          intro="Kein aufgeblähtes Agentur-Team. Ihr habt immer direkt einen von uns am Apparat."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          <TeamCard
            initials="JA"
            name="[Vorname] [Nachname]"
            role="Gründer – E-Commerce & BFSG-Strategie"
            focus={["Online-Shop-Optimierung", "BFSG-Compliance", "Shopify / WooCommerce"]}
          />
          <TeamCard
            initials="MK"
            name="[Vorname] [Nachname]"
            role="Gründer – Automatisierung & KI"
            focus={["Workflow-Automatisierung", "KI-Integration", "Technische Umsetzung"]}
          />
        </div>
      </Section>

      {/* PROZESS */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Wie wir arbeiten"
          title="Kein Projekt-Wirrwarr. Klare Schritte."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROZESS.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-display text-4xl font-bold text-primary/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WERTE */}
      <Section>
        <SectionHeading
          eyebrow="Unsere Prinzipien"
          title="So ticken wir."
          align="center"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WERTE.map(({ title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <CheckCircle2 className="mb-3 h-5 w-5 text-primary" aria-hidden />
              <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-border bg-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Bereit loszulegen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Kein langes Hin und Her. Schreib uns kurz was du brauchst –
            wir melden uns innerhalb von 24 Stunden.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Jetzt Kontakt aufnehmen <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/bfsg-check"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kostenloser BFSG-Check
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card"
      }`}
    >
      <div className={`font-display text-2xl font-bold md:text-3xl ${highlight ? "text-primary" : "text-foreground"}`}>
        {value}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function TeamCard({
  initials,
  name,
  role,
  focus,
}: {
  initials: string;
  name: string;
  role: string;
  focus: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <span className="font-display text-xl font-bold text-primary">{initials}</span>
      </div>
      <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
      <p className="mt-1 text-sm font-medium text-primary">{role}</p>
      <ul className="mt-4 space-y-1.5">
        {focus.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

const EXPERTISE = [
  {
    icon: ShoppingBag,
    title: "E-Commerce",
    text: "Shopify, WooCommerce, Magento – wir kennen die Plattformen und ihre Tücken aus eigener Erfahrung.",
  },
  {
    icon: Scale,
    title: "BFSG & Recht",
    text: "WCAG 2.1 AA, DIN EN 301 549, §312j BGB – wir übersetzen Gesetzestexte in umsetzbare Maßnahmen.",
  },
  {
    icon: Zap,
    title: "Automatisierung",
    text: "Workflows, Monitoring und Reporting automatisiert – damit Konformität kein Dauerprojekt bleibt.",
  },
  {
    icon: Bot,
    title: "KI-Integration",
    text: "Wir nutzen KI gezielt: für schnellere Audits, bessere Alt-Texte und effizientere Prozesse.",
  },
];

const PROZESS = [
  {
    title: "Erstgespräch",
    text: "Kurzes, unverbindliches Gespräch. Wir verstehen euren Shop und euren aktuellen Stand.",
  },
  {
    title: "Audit & Analyse",
    text: "Systematische Prüfung auf WCAG 2.1 AA. Kein generierter Report – jede Zeile handgeprüft.",
  },
  {
    title: "Umsetzung",
    text: "Priorisierter Maßnahmenplan. Wir setzen um oder begleiten euer Team direkt.",
  },
  {
    title: "Monitoring",
    text: "Dauerhaft konform bleiben. Automatisiertes Monitoring meldet neue Probleme sofort.",
  },
];

const WERTE = [
  {
    title: "Kein Agentur-Overhead",
    text: "Ihr arbeitet direkt mit uns – nicht mit Junior-Consultants die eure Mails beantworten.",
  },
  {
    title: "Pragmatisch",
    text: "Wir kennen den Shop-Alltag. Unsere Lösungen sind machbar, nicht nur auf dem Papier korrekt.",
  },
  {
    title: "Transparent",
    text: "Was wir tun, warum wir es tun, was es kostet – keine Überraschungen.",
  },
  {
    title: "Rechtssicher",
    text: "Wir liefern nachweisbare Konformität – mit Dokumentation, die im Streitfall standhält.",
  },
];
