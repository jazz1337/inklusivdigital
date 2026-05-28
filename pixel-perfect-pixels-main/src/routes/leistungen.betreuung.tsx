import { createFileRoute } from "@tanstack/react-router";
import { Check, ShieldCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/leistungen/betreuung")({
  head: () => ({
    meta: [
      { title: "Laufende Betreuung – BFSG.Agentur" },
      {
        name: "description",
        content:
          "Barrierefreiheit ist ein Prozess, kein Projekt. Wir kümmern uns um regelmäßige Checks, Re-Audits, Beratung und Monitoring.",
      },
      { property: "og:title", content: "Laufende Betreuung – BFSG.Agentur" },
      { property: "og:description", content: "Sorgenfrei barrierefrei – dauerhaft konform bleiben." },
    ],
  }),
  component: BetreuungPage,
});

const PAKET = [
  { title: "Regelmäßige automatisierte Checks", text: "Wir scannen deine Seite kontinuierlich auf neue Barrieren." },
  { title: "Jährlicher Re-Audit", text: "Einmal im Jahr schauen unsere Experten tief in das System, um auch manuelle Hürden aufzuspüren." },
  { title: "Support & Beratung", text: "Dein Team plant ein neues Feature? Wir beraten euch vorab, damit es barrierefrei wird." },
  { title: "Aktualisierung der Erklärung", text: "Wir halten deine gesetzlich geforderte Barrierefreiheitserklärung auf dem neuesten Stand." },
  { title: "Monitoring", text: "Wir informieren dich über Gesetzesänderungen oder neue WCAG-Versionen." },
];

function BetreuungPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistung · Betreuung"
        title="Barrierefreiheit ist kein Ziel, sondern ein Prozess"
        intro={`Deine Website ist heute barrierefrei. Aber was ist morgen? Ein neues Plugin-Update, ein Blogartikel ohne Alt-Texte oder eine neue Landingpage können die Konformität deiner Seite sofort wieder zerstören. Barrierefreiheit ist kein „Einmal-Projekt", sondern braucht kontinuierliche Pflege.`}
      >
        <CTAButton to="/kontakt">Betreuung anfragen</CTAButton>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Das Problem"
          title={`Das Problem mit der „Einmal-Lösung".`}
        />
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Websites sind lebendige Systeme. Mit jedem neuen Inhalt und jeder technischen Änderung schleichen sich
          unbemerkt Fehler ein. Das BFSG verlangt jedoch eine fortlaufende Einhaltung der Standards. Einmaliges
          Optimieren reicht nicht aus, um dauerhaft vor Abmahnungen und Bußgeldern geschützt zu sein.
        </p>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Unser Paket"
          title="Sorgenfrei barrierefrei."
          intro="Wir kümmern uns darum, dass deine Seite konform bleibt, während du dich auf dein Kerngeschäft konzentrierst. Unser Paket enthält:"
        />
        <ul className="mt-10 space-y-3">
          {PAKET.map((item) => (
            <li key={item.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-muted-foreground">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Analogie" title="Warum das sinnvoll ist? Denk an den TÜV." />
        <div className="mt-8 rounded-3xl border-2 border-primary/30 bg-primary/5 p-8 md:p-12">
          <div className="flex items-start gap-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Wie der TÜV beim Auto.
              </h3>
              <p className="mt-3 text-lg text-muted-foreground">
                Du würdest dein Auto auch nicht einmal kaufen und dann jahrelang nicht mehr warten. Damit deine
                Website rechtssicher und für deine Kunden bedienbar bleibt, braucht sie regelmäßige Pflege.
                Unsere Betreuung ist die Inspektion für deine digitale Präsenz.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" size="compact">
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
