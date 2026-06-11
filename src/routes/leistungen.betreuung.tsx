import { createFileRoute } from "@tanstack/react-router";
import { Check, ShieldCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/leistungen/betreuung")({
  head: () => ({
    meta: [
      { title: "Laufende Betreuung – InklusivDigital" },
      {
        name: "description",
        content:
          "Barrierefreiheit ist ein Prozess, kein Projekt. Wir kümmern uns um regelmäßige Checks, Re-Audits, Beratung und Monitoring.",
      },
      { property: "og:title", content: "Laufende Betreuung – InklusivDigital" },
      { property: "og:description", content: "Sorgenfrei barrierefrei – dauerhaft konform bleiben." },
    ],
  }),
  component: BetreuungPage,
});

const PAKET = [
  {
    title: "Regelmäßige automatisierte Checks",
    text: "Wir scannen deine Seite kontinuierlich auf neue Barrieren, die sich durch Content-Updates oder neue Funktionen einschleichen.",
  },
  {
    title: "Jährlicher Re-Audit",
    text: "Einmal im Jahr schauen unsere Experten manuell und tief ins System, um auch versteckte Hürden aufzuspüren.",
  },
  {
    title: "Support & Beratung",
    text: "Dein Team plant ein neues Feature? Wir beraten euch vorab, damit es von Anfang an barrierefrei wird.",
  },
  {
    title: "Aktualisierung der Barrierefreiheitserklärung",
    text: "Wir halten deine gesetzlich geforderte Erklärung laufend auf dem neuesten Stand.",
  },
  {
    title: "Monitoring & Gesetzesänderungen",
    text: "Wir informieren dich über relevante Gesetzesänderungen und neue WCAG-Versionen, bevor sie dich betreffen.",
  },
];

function BetreuungPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistung · Betreuung"
        title="Barrierefreiheit ist kein Ziel, sondern ein Prozess"
        intro="Deine Website ist heute konform. Aber ein neues Plugin, ein Blogartikel ohne Alt-Texte oder eine neue Landingpage können die Konformität sofort wieder zerstören. Wir sorgen dafür, dass das nicht passiert."
      >
        <CTAButton to="/kontakt">Betreuung anfragen</CTAButton>
      </PageHero>

      {/* 1. Was im Paket steckt – sofort sichtbar */}
      <Section>
        <SectionHeading
          eyebrow="Das Paket"
          title="Was du von uns bekommst."
          intro="Wir kümmern uns darum, dass deine Seite konform bleibt, während du dich auf dein Kerngeschäft konzentrierst:"
        />
        <ul className="mt-10 space-y-3">
          {PAKET.map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/30"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 2. Warum laufende Betreuung sinnvoll ist */}
      <Section tone="surface">
        <SectionHeading eyebrow="Warum das sinnvoll ist" title="Wie der TÜV beim Auto." />
        <div className="mt-8 rounded-3xl border-2 border-primary/30 bg-primary/5 p-8 md:p-12">
          <div className="flex items-start gap-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Einmal kaufen reicht nicht.
              </h3>
              <p className="mt-3 text-lg text-muted-foreground">
                Du würdest dein Auto auch nicht einmal kaufen und dann jahrelang nicht mehr warten lassen.
                Damit deine Website rechtssicher und für deine Kunden bedienbar bleibt, braucht sie
                regelmäßige Pflege. Unsere Betreuung ist die Hauptuntersuchung für deine digitale Präsenz.
              </p>
              <p className="mt-4 text-muted-foreground">
                Das BFSG verlangt eine <strong className="text-foreground">fortlaufende</strong> Einhaltung
                der Standards. Einmaliges Optimieren schützt dich nicht dauerhaft vor Abmahnungen und
                Bußgeldern.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. CTA */}
      <Section size="compact">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <Wrench className="mx-auto h-9 w-9 text-primary" aria-hidden />
          <h2 className="mt-3 font-display text-2xl font-bold">Bereit für sorgenfreie Konformität?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Lass uns über dein Setup sprechen. Wir schnüren ein Paket, das zu deinem System und Team passt.
          </p>
          <div className="mt-6 flex justify-center">
            <CTAButton to="/kontakt">Beratungsgespräch vereinbaren</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
