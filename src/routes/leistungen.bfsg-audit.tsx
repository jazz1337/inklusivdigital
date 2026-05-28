import { createFileRoute } from "@tanstack/react-router";
import {
  ScanSearch,
  UserCheck,
  Volume2,
  Keyboard,
  Eye,
  FormInput,
  CheckCircle2,
  ListChecks,
  FileText,
  GitCompare,
  Award,
  Bot,
  HandMetal,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { PageSpeedScanner } from "@/components/site/PageSpeedScanner";

export const Route = createFileRoute("/leistungen/bfsg-audit")({
  head: () => ({
    meta: [
      { title: "BFSG-Audit & Analyse – InklusivDigital" },
      {
        name: "description",
        content:
          "Vollständiges BFSG-Audit deiner Website: automatisierte und manuelle Prüfung, priorisierter Maßnahmenplan, WCAG 2.1 Konformitätsbewertung.",
      },
      { property: "og:title", content: "BFSG-Audit & Analyse – InklusivDigital" },
      { property: "og:description", content: "Klarheit über deine Barrieren – mit konkretem Maßnahmenplan." },
    ],
  }),
  component: BfsgAuditPage,
});

const PRUEFBEREICHE = [
  { icon: Bot, title: "Automatisierte Prüfung mit Profi-Tools", text: "Wir lassen spezialisierte Software über deine gesamte Domain laufen. So finden wir schnell und effizient technische Fehler im Code, die über alle Unterseiten hinweg auftreten." },
  { icon: HandMetal, title: "Manuelle Prüfung durch Experten", text: "Tools sind gut, aber sie finden nur etwa 30 % aller Barrieren. Unsere Experten gehen manuell durch deine Seite. Wir prüfen Dinge, die Software nicht verstehen kann – wie die logische Reihenfolge von Inhalten oder die Sinnhaftigkeit von Texten." },
  { icon: Volume2, title: "Screenreader-Test", text: "Wie hört sich deine Website an? Wir testen deine Seite mit gängigen Screenreadern (wie NVDA oder JAWS). Nur so stellen wir sicher, dass Menschen mit Sehbehinderung wirklich alle Informationen erhalten und navigieren können." },
  { icon: Keyboard, title: "Tastaturbedienbarkeit", text: "Nicht jeder kann eine Maus bedienen. Wir stellen sicher, dass alle interaktiven Elemente wie Menüs, Buttons und Links allein mit der Tastatur erreichbar und bedienbar sind." },
  { icon: Eye, title: "Kontraste & visuelle Zugänglichkeit", text: "Wir messen nach, ob deine Texte für Menschen mit Sehschwäche oder bei schwierigen Lichtverhältnissen lesbar sind. Wir prüfen Kontrastverhältnisse und die Skalierbarkeit deiner Inhalte." },
  { icon: FormInput, title: "Formulare & interaktive Elemente", text: "Das Herzstück deiner Conversion. Wir checken, ob Fehlermeldungen verständlich sind, ob Eingabefelder korrekt beschriftet sind und ob Nutzer den Prozess ohne fremde Hilfe abschließen können." },
];

const ERGEBNISSE = [
  { icon: ListChecks, title: "Eine priorisierte Mängelliste", text: "Wir sortieren die Fehler nach Dringlichkeit. Du weißt sofort, was sofort gelöst werden muss und was Zeit hat." },
  { icon: FileText, title: "Konkrete Handlungsempfehlungen", text: "Kein Fachchinesisch. Wir sagen dir (oder deinen Entwicklern) genau, was zu tun ist." },
  { icon: GitCompare, title: "Gap-Analyse", text: "Wir zeigen dir schwarz auf weiß, wo du stehst (Ist) und was für die BFSG-Konformität noch fehlt (Soll)." },
  { icon: Award, title: "WCAG 2.1 Konformitätsbewertung", text: "Eine professionelle Einschätzung nach den international gültigen Standards." },
];

const ZIELGRUPPEN = [
  { title: "Unternehmer, die Klarheit wollen", text: "Du willst wissen, wie groß die Baustelle wirklich ist." },
  { title: "Qualitätsbewusste", text: "Du brauchst ein unabhängiges Gutachten für deine Unterlagen." },
  { title: "Akut Betroffene", text: "Du hast bereits eine Abmahnung oder einen Hinweis von Behörden erhalten." },
  { title: "Planer", text: "Du bereitest gerade einen Relaunch vor und willst von Anfang an alles richtig machen." },
];

function BfsgAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistung · Audit"
        title="Endlich Klarheit: Dein Fahrplan zur barrierefreien Website"
        intro="Du weißt, dass du etwas tun musst, aber nicht, wo du anfangen sollst? Ein BFSG-Audit ist der einzige Weg, um Licht ins Dunkel zu bringen. Wir prüfen deine Seite auf Herz und Nieren und zeigen dir exakt, welche Barrieren deine Kunden behindern und dich rechtlich angreifbar machen."
      >
        <CTAButton to="/kontakt">Jetzt BFSG-Audit anfragen</CTAButton>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            eyebrow="Warum ein Audit?"
            title="Der richtige erste Schritt."
          />
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Die meisten Barrieren auf Websites sind für Menschen ohne Einschränkungen unsichtbar.
              Ein fehlender Alternativtext oder eine falsche Überschriftenstruktur fallen dir vielleicht
              nicht auf – für einen blinden Nutzer machen sie deine Seite jedoch unbedienbar.
            </p>
            <p>
              Ohne eine fundierte Analyse ist jede Optimierung reiner Blindflug. Du verschwendest Zeit
              und Ressourcen an Stellen, die vielleicht gar nicht kritisch sind, während die echten
              Probleme bestehen bleiben.
            </p>
            <p>
              Unser Audit gibt dir die Sicherheit, die du für die Umsetzung brauchst – völlig unabhängig
              davon, ob du die Fehler danach mit uns, deinem eigenen Team oder einer anderen Agentur behebst.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Was wir prüfen"
          title="Sechs Kernbereiche, ein vollständiges Bild."
          intro="Barrierefreiheit ist komplex, aber wir machen sie für dich greifbar."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRUEFBEREICHE.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        {/* Auto vs. Manuell Vergleich */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Bot className="h-4 w-4" aria-hidden /> Automatisiert
            </div>
            <h3 className="font-display text-2xl font-bold">Schnell & flächendeckend</h3>
            <p className="mt-3 text-muted-foreground">
              Spezialisierte Tools scannen die gesamte Domain und finden technische Fehler im Code.
              Findet ca. <strong className="text-foreground">30 %</strong> aller Barrieren.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-primary/5 p-7">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <HandMetal className="h-4 w-4" aria-hidden /> Manuell
            </div>
            <h3 className="font-display text-2xl font-bold">Tief & sinnvoll</h3>
            <p className="mt-3 text-muted-foreground">
              Experten prüfen logische Reihenfolge, Sinnhaftigkeit von Texten, Screenreader-Verhalten.
              Erst hier findest du die <strong className="text-foreground">restlichen 70 %</strong>.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Das Ergebnis"
          title="Dein konkreter Maßnahmenplan."
          intro="Nach dem Audit lassen wir dich nicht mit einem 100-seitigen PDF allein. Du erhältst von uns:"
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {ERGEBNISSE.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/10 text-success">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Dein Bericht ist so aufbereitet, dass er sofort als Briefing für die Umsetzung dienen kann.
        </p>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Für wen?" title="Für wen ist dieses Audit?" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ZIELGRUPPEN.map(({ title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent-foreground">
                <UserCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-hero)] p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <ScanSearch className="mx-auto h-10 w-10 text-primary" aria-hidden />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Bereit für Klarheit?</h2>
            <p className="mt-4 text-muted-foreground">
              Du willst erst mal nur einen schnellen Überblick? Nutze unseren kostenlosen Schnelltest –
              oder fordere direkt das vollständige Audit an.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <CTAButton to="/kontakt">Jetzt BFSG-Audit anfragen</CTAButton>
              <CTAButton to="/bfsg-check" variant="ghost">
                Schnelltest starten
              </CTAButton>
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

// silence unused import warning (kept for design clarity)
void CheckCircle2;
