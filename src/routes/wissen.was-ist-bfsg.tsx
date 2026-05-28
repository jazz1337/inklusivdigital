import { createFileRoute } from "@tanstack/react-router";
import { Eye, MousePointer2, BookOpen, Cog, AlertTriangle, Calendar } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { PageSpeedScanner } from "@/components/site/PageSpeedScanner";

export const Route = createFileRoute("/wissen/was-ist-bfsg")({
  head: () => ({
    meta: [
      { title: "Was ist das BFSG? – InklusivDigital" },
      {
        name: "description",
        content:
          "Das Barrierefreiheitsstärkungsgesetz erklärt: Hintergründe, Geltungsbereich, WCAG-Prinzipien, Bußgelder und Ausnahmen.",
      },
      { property: "og:title", content: "Was ist das BFSG? – InklusivDigital" },
      { property: "og:description", content: "Alles Wichtige zum Barrierefreiheitsstärkungsgesetz." },
    ],
  }),
  component: WasIstBfsgPage,
});

const PRINZIPIEN = [
  { icon: Eye, title: "Wahrnehmbar", text: "Inhalte müssen so präsentiert werden, dass Nutzer sie wahrnehmen können – z. B. Alt-Texte für Bilder." },
  { icon: MousePointer2, title: "Bedienbar", text: "Bedienelemente müssen für alle nutzbar sein – auch ohne Maus, mit Tastatur oder Sprachsteuerung." },
  { icon: BookOpen, title: "Verständlich", text: "Inhalte und Bedienung müssen verständlich sein – einfache Sprache und klare Navigation." },
  { icon: Cog, title: "Robust", text: "Inhalte müssen mit aktuellen und zukünftigen Technologien (inkl. Hilfsmitteln) interpretierbar sein." },
];

const BEREICHE = [
  { title: "E-Commerce", text: "Alle Onlineshops und Buchungsplattformen im B2C-Bereich." },
  { title: "Websites & Apps", text: "Sofern sie Dienstleistungen anbieten (z. B. Reisebuchungen, Bankdienste)." },
  { title: "Hardware", text: "Geldautomaten, Ticketautomaten, Terminals." },
  { title: "Software", text: "Betriebssysteme und E-Book-Reader." },
  { title: "Personenverkehr", text: "Apps und Websites von Bus- und Bahnunternehmen." },
];

function WasIstBfsgPage() {
  return (
    <>
      <PageHero
        eyebrow="Wissen · Grundlagen"
        title="Was ist das BFSG?"
        intro="Das Barrierefreiheitsstärkungsgesetz ist die deutsche Umsetzung des European Accessibility Act. Hier erfährst du, was es regelt – und warum es deine Website betrifft."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading eyebrow="Herkunft" title="Herkunft und Ziel." />
          <p className="text-lg text-muted-foreground">
            Das BFSG ist die deutsche Umsetzung des European Accessibility Act (EAA). Damit gelten in der gesamten EU
            einheitliche Anforderungen an die Barrierefreiheit. Seit dem{" "}
            <strong className="text-foreground">28. Juni 2025</strong> ist das Gesetz in Kraft und verpflichtet private
            Unternehmen dazu, ihre digitalen Angebote zugänglich zu gestalten.
          </p>
        </div>

        {/* Big number statements */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <BigNumber
            icon={<Calendar className="h-6 w-6" aria-hidden />}
            value="28. Juni 2025"
            label="seitdem ist das BFSG in Kraft"
          />
          <BigNumber
            icon={<AlertTriangle className="h-6 w-6" aria-hidden />}
            value="100.000 €"
            label="maximales Bußgeld bei Verstößen"
            tone="warning"
          />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Geltungsbereich"
          title="Was genau wird geregelt?"
          intro="Das Gesetz betrifft eine Vielzahl von Produkten und Dienstleistungen:"
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BEREICHE.map((b) => (
            <li key={b.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Standards"
          title="WCAG und DIN: Die technischen Standards."
          intro="Um rechtlich auf der sicheren Seite zu sein, muss deine Website den Standard WCAG 2.1 (Level A und AA) sowie die DIN EN 301 549 erfüllen. Die WCAG basiert auf vier Grundprinzipien:"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PRINZIPIEN.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-7">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Ausnahmen" title="Gibt es Ausnahmen?" />
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Ja, aber sie sind eng gefasst. <strong className="text-foreground">Kleinstunternehmen</strong> (weniger als
          10 Mitarbeiter UND weniger als 2 Mio. € Jahresumsatz) sind bei reinen Dienstleistungen oft ausgenommen.
          Ebenfalls nicht betroffen sind reine <strong className="text-foreground">B2B-Angebote</strong> – hier muss
          aber absolut klar sein, dass sich das Angebot nicht an Endverbraucher richtet.
        </p>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-hero)] p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Willst du wissen, ob du handeln musst?</h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <CTAButton to="/wissen/bin-ich-betroffen">Bin ich betroffen?</CTAButton>
              <CTAButton to="/bfsg-check" variant="ghost">Schnelltest starten</CTAButton>
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

function BigNumber({
  icon,
  value,
  label,
  tone = "primary",
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  tone?: "primary" | "warning";
}) {
  const accent = tone === "warning" ? "bg-warning/15 text-warning-foreground" : "bg-primary/10 text-primary";
  return (
    <div className="rounded-3xl border border-border bg-card p-8">
      <div className={`mb-5 grid h-12 w-12 place-items-center rounded-xl ${accent}`}>{icon}</div>
      <div className="font-display text-4xl font-bold text-foreground md:text-5xl">{value}</div>
      <p className="mt-3 text-muted-foreground">{label}</p>
    </div>
  );
}
