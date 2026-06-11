import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ShoppingBag,
  RefreshCcw,
  Eye,
  KeyRound,
  Gauge,
  Sparkles,
} from "lucide-react";
import { PageSpeedScanner } from "@/components/site/PageSpeedScanner";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InklusivDigital – Barrierefreie Websites, ohne Floskeln" },
      {
        name: "description",
        content:
          "Audit, Umsetzung und laufende Betreuung für BFSG-konforme Websites und Onlineshops. Jetzt kostenlos prüfen.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO – dunkel mit Glows */}
      <section className="relative overflow-hidden bg-foreground">
        <div
          className="absolute inset-0 [background-image:radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_250/.4),transparent_55%),radial-gradient(ellipse_at_bottom_left,oklch(0.62_0.16_155/.25),transparent_50%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-success" aria-hidden /> BFSG seit 28. Juni 2025 in Kraft
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              Barrierefrei.<br />
              <span className="bg-gradient-to-r from-[oklch(0.72_0.14_250)] to-[oklch(0.7_0.15_155)] bg-clip-text text-transparent">
                Rechtssicher.
              </span><br />
              Ohne Floskeln.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70 md:text-xl">
              Wir machen deine Website und deinen Onlineshop BFSG-konform – mit klarem
              Audit, sauberer Umsetzung und laufender Betreuung.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CTAButton to="/bfsg-check">Kostenloser BFSG-Check</CTAButton>
              <CTAButton to="/leistungen/bfsg-audit" variant="light" withArrow={false}>
                Leistungen ansehen
              </CTAButton>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              {["WCAG 2.1 AA", "DIN EN 301 549", "Klartext statt Floskeln"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-8">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-2 backdrop-blur-sm">
              <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)] md:p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Gauge className="h-5 w-5 text-primary" aria-hidden /> BFSG-Schnelltest
                </div>
                <PageSpeedScanner compact />
              </div>
            </div>
          </div>
        </div>
        <div
          className="h-1 w-full bg-gradient-to-r from-primary via-success to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* LEISTUNGEN */}
      <Section>
        <SectionHeading
          eyebrow="Was wir tun"
          title="Drei klare Leistungen, ein Ziel: Rechtssicherheit."
          intro="Vom ersten Audit bis zur dauerhaften Betreuung – wir begleiten dich durch den gesamten BFSG-Prozess."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ServiceCard
            to="/leistungen/bfsg-audit"
            icon={<ClipboardCheck className="h-6 w-6" aria-hidden />}
            title="BFSG-Audit & Analyse"
            text="Wir prüfen deine Website auf Herz und Nieren und liefern einen priorisierten Maßnahmenplan."
          />
          <ServiceCard
            to="/leistungen/barrierefreier-onlineshop"
            icon={<ShoppingBag className="h-6 w-6" aria-hidden />}
            title="Barrierefreier Onlineshop"
            text="Shop-Audits & Umsetzungen für Shopify, WooCommerce, Magento und Custom-Lösungen."
          />
          <ServiceCard
            to="/leistungen/betreuung"
            icon={<RefreshCcw className="h-6 w-6" aria-hidden />}
            title="Laufende Betreuung"
            text="Konformität ist kein Einmal-Projekt. Wir halten deine Seite dauerhaft konform."
          />
        </div>
      </Section>

      {/* WARUM JETZT */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Warum jetzt?"
              title="Das BFSG ist Pflicht – und eine Chance."
              intro="Über 20 % der Internetnutzer profitieren direkt von Barrierefreiheit. Bessere UX, besseres SEO, mehr Conversion."
            />
            <div className="mt-6">
              <CTAButton to="/wissen/was-ist-bfsg" variant="secondary">
                Mehr zum BFSG erfahren
              </CTAButton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Stat value="100.000 €" label="maximales Bußgeld bei Verstößen" />
            <Stat value="28. Juni 2025" label="seitdem ist das BFSG in Kraft" />
            <Stat value="20 %+" label="der Nutzer profitieren direkt" />
            <Stat value="30 %" label="finden automatisierte Tools nur" />
          </div>
        </div>
      </Section>

      {/* USPs */}
      <Section>
        <SectionHeading
          eyebrow="Unsere Prinzipien"
          title="Klartext statt Fachchinesisch."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Principle icon={<Eye />} title="Transparent" text="Du erfährst, was wir tun, warum wir es tun – und was du selbst übernehmen kannst." />
          <Principle icon={<KeyRound />} title="Pragmatisch" text="Keine 100-seitigen PDFs ohne Wirkung. Sondern Maßnahmen, die heute umsetzbar sind." />
          <Principle icon={<CheckCircle2 />} title="Rechtssicher" text="WCAG 2.1 AA, DIN EN 301 549. Wir kennen die Standards und liefern verlässlich." />
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center md:px-6">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Bereit für deine BFSG-Konformität?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-background/70 md:text-lg">
            Starte mit dem kostenlosen Schnelltest – oder vereinbare ein unverbindliches Beratungsgespräch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/bfsg-check"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Kostenloser BFSG-Check <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/ueber-uns"
              className="inline-flex items-center gap-2 rounded-lg border border-background/20 px-6 py-3 text-sm font-semibold text-background transition hover:bg-background/10"
            >
              Über uns
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  to,
  icon,
  title,
  text,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      to={to as never}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
    >
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-3 flex-1 text-muted-foreground">{text}</p>
      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Mehr erfahren <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </div>
    </Link>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="font-display text-2xl font-bold text-primary md:text-3xl lg:text-4xl">{value}</div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function Principle({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent-foreground [&_svg]:h-6 [&_svg]:w-6">
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
