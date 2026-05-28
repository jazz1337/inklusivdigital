import { createFileRoute } from "@tanstack/react-router";
import { Check, X, ArrowDown } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { PageSpeedScanner } from "@/components/site/PageSpeedScanner";

export const Route = createFileRoute("/wissen/bin-ich-betroffen")({
  head: () => ({
    meta: [
      { title: "Bin ich vom BFSG betroffen? – InklusivDigital" },
      {
        name: "description",
        content:
          "Schnelle Einordnung: Bist du vom Barrierefreiheitsstärkungsgesetz betroffen? Faustregel, Beispiele und Schnelltest.",
      },
      { property: "og:title", content: "Bin ich vom BFSG betroffen? – InklusivDigital" },
      { property: "og:description", content: "B2C, B2B, Kontaktformular: Wer muss handeln?" },
    ],
  }),
  component: BinIchBetroffenPage,
});

const BETROFFEN = [
  { label: "Onlineshop (B2C)", text: "Klar betroffen – egal ob Mode, Software oder Lebensmittel." },
  { label: "SaaS-Anbieter (B2C)", text: "Software für Privatkunden muss zugänglich sein." },
  { label: "Buchungsplattformen", text: "Reise, Tickets, Termine – alles betroffen." },
  { label: "Bank- & Finanzdienste", text: "Online-Banking, Kreditanträge, Versicherungen." },
];

const NICHT_BETROFFEN = [
  { label: "Reine B2B-Plattform", text: "Wenn klar nur Geschäftskunden adressiert werden." },
  { label: "Kleinstunternehmen", text: "Unter 10 Mitarbeiter UND unter 2 Mio. € Umsatz – bei reinen Dienstleistungen." },
  { label: "Interne Tools", text: "Software, die nur Mitarbeiter verwenden." },
];

function BinIchBetroffenPage() {
  return (
    <>
      <PageHero
        eyebrow="Wissen · Check"
        title="Bin ich vom BFSG betroffen? Der Check für dein Unternehmen"
        intro={
          <>
            Viele Unternehmer denken: „Ich habe doch keine staatliche Website, das betrifft mich nicht." Das ist ein
            gefährlicher Irrtum. Das Barrierefreiheitsstärkungsgesetz richtet sich explizit an die Privatwirtschaft.
            Hier erfährst du, ob du handeln musst.
          </>
        }
      />

      <Section>
        <SectionHeading eyebrow="Faustregel" title="Die Faustregel." />
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Du bist mit hoher Wahrscheinlichkeit betroffen, wenn du:
        </p>

        {/* Decision tree */}
        <div className="mt-10 mx-auto max-w-2xl space-y-3">
          <DecisionStep
            number="1"
            text="Ein Unternehmen, das Produkte oder Dienstleistungen für Endverbraucher (B2C) anbietet."
          />
          <Arrow />
          <DecisionStep
            number="2"
            text="Mehr als 10 Mitarbeiter oder mehr als 2 Mio. € Jahresumsatz."
          />
          <Arrow />
          <DecisionStep
            number="3"
            text="Du bietest digitale Dienstleistungen an (Shop, Buchung, Konto, Kontaktformular)."
          />
          <Arrow />
          <div className="rounded-2xl border-2 border-primary bg-primary/10 p-6 text-center">
            <p className="font-display text-2xl font-bold text-primary">Du bist betroffen.</p>
            <p className="mt-2 text-muted-foreground">Handle jetzt – damit du auf der sicheren Seite bist.</p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Beispiele"
          title="Betroffen vs. Nicht betroffen."
          intro="Damit du dich besser einordnen kannst, hier einige typische Fälle aus der Praxis:"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <ExampleBox
            tone="warning"
            title="Klar betroffen"
            icon={<Check className="h-5 w-5" aria-hidden />}
            items={BETROFFEN}
          />
          <ExampleBox
            tone="muted"
            title="Eher nicht betroffen"
            icon={<X className="h-5 w-5" aria-hidden />}
            items={NICHT_BETROFFEN}
          />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Achtung"
          title='Die Falle: Das „stille" Kontaktformular.'
        />
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Viele Firmen glauben, sie seien sicher, weil sie keinen Shop betreiben. Doch Vorsicht: Schon ein einfaches
          Kontaktformular, eine Newsletter-Anmeldung oder ein Download-Bereich für Kunden können ausreichen, um unter
          das BFSG zu fallen. Wenn ein Nutzer eine Dienstleistung über deine Seite anbahnen oder nutzen kann, ist
          Barrierefreiheit Pflicht.
        </p>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Unsicher?" title="Lass uns prüfen!" />
        <p className="mt-6 max-w-3xl text-muted-foreground">
          Die Grenzen können im Einzelfall schwimmend sein. Bevor du ein Risiko eingehst, nutze unseren BFSG-Check oder
          vereinbare ein kurzes Beratungsgespräch.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CTAButton to="/bfsg-check">Jetzt kostenlosen BFSG-Check machen</CTAButton>
          <CTAButton to="/kontakt" variant="ghost">Beratungsgespräch</CTAButton>
        </div>
        <div className="mt-10">
          <PageSpeedScanner />
        </div>
      </Section>
    </>
  );
}

function DecisionStep({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
        {number}
      </div>
      <p className="text-foreground">{text}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center text-muted-foreground" aria-hidden>
      <ArrowDown className="h-5 w-5" />
    </div>
  );
}

function ExampleBox({
  tone,
  title,
  icon,
  items,
}: {
  tone: "warning" | "muted";
  title: string;
  icon: React.ReactNode;
  items: { label: string; text: string }[];
}) {
  const headerCls =
    tone === "warning"
      ? "bg-warning/15 text-warning-foreground border-warning/30"
      : "bg-muted text-muted-foreground border-border";
  const iconCls = tone === "warning" ? "bg-warning/20 text-warning-foreground" : "bg-muted text-muted-foreground";
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className={`flex items-center gap-3 border-b px-6 py-4 ${headerCls}`}>
        <span className={`grid h-8 w-8 place-items-center rounded-full ${iconCls}`}>{icon}</span>
        <h3 className="font-display text-lg font-bold">{title}</h3>
      </div>
      <ul className="divide-y divide-border">
        {items.map((it) => (
          <li key={it.label} className="px-6 py-4">
            <p className="font-semibold text-foreground">{it.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
