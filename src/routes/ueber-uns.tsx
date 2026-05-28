import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Compass, Handshake, Zap } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns – InklusivDigital" },
      {
        name: "description",
        content:
          "Wir machen das Netz für alle zugänglich. Pragmatisch, technisch fundiert und ohne Floskeln. Lerne unsere Werte und Arbeitsweise kennen.",
      },
      { property: "og:title", content: "Über uns – InklusivDigital" },
      { property: "og:description", content: "Wer wir sind und wie wir arbeiten." },
    ],
  }),
  component: UeberUnsPage,
});

const WERTE = [
  { icon: MessageSquare, title: "Klartext", text: "Wir reden nicht in Buzzwords, sondern in konkreten Maßnahmen." },
  { icon: Compass, title: "Pragmatisch", text: "Wir wählen Lösungen, die im Business-Alltag wirklich funktionieren." },
  { icon: Handshake, title: "Auf Augenhöhe", text: "Wir arbeiten mit deinem Team, nicht über dessen Köpfe hinweg." },
  { icon: Zap, title: "Schnell & direkt", text: "Kurze Wege, klare Ansprechpartner, schnelle Antworten." },
];

function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Wir machen das Netz für alle zugänglich"
        intro="Barrierefreiheit wurde viel zu lange als Nischenthema für Behörden abgestempelt. Doch das Internet ist für alle da. Wir sind angetreten, um zu zeigen, dass BFSG-Konformität kein Klotz am Bein sein muss, sondern eine Chance für bessere Websites ist."
      />

      <Section>
        <SectionHeading eyebrow="Unser Ansatz" title="Klartext statt Floskeln." />
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Wir kombinieren technisches Expertenwissen mit einem pragmatischen Blick auf das, was im Business-Alltag
          wirklich machbar ist. Bei uns zählt das Ergebnis: Eine Website, die jeder Mensch bedienen kann und die vor
          rechtlichen Konsequenzen sicher ist.
        </p>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Werte" title="Wofür wir stehen." align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WERTE.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Das Team" title="Menschen hinter InklusivDigital." align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TeamCard
            name="Jan Hoffmann"
            role="Gründer & Lead Accessibility Engineer"
            bio="Über 10 Jahre Webentwicklung, seit 2018 auf WCAG und digitale Barrierefreiheit spezialisiert."
          />
          <TeamCard
            name="Sara Krüger"
            role="UX & Accessibility Designerin"
            bio="Nutzerzentriertes Design trifft auf gesetzliche Anforderungen – sie verbindet beides ohne Kompromisse."
          />
          <TeamCard
            name="Tobias Meier"
            role="Legal & Compliance"
            bio="Juristischer Hintergrund mit Fokus auf BFSG, WCAG und E-Commerce-Recht. Klare Antworten, kein Fachjargon."
          />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Wie wir arbeiten" title="Dein verlängerter Arm in Sachen Barrierefreiheit." />
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Wir sind schnell, direkt erreichbar und konzentrieren uns auf das Wesentliche. Bei uns zählt das Ergebnis:
          Eine Website, die jeder Mensch bedienen kann und die vor rechtlichen Konsequenzen sicher ist.
        </p>
        <div className="mt-8">
          <CTAButton to="/kontakt">Gespräch vereinbaren</CTAButton>
        </div>
      </Section>
    </>
  );
}

function TeamCard({
  name,
  role,
  bio,
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 h-16 w-16 rounded-2xl bg-primary/10" aria-hidden />
      <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
      <p className="mt-1 text-sm font-medium text-primary">{role}</p>
      <p className="mt-3 text-sm text-muted-foreground">{bio}</p>
    </div>
  );
}
