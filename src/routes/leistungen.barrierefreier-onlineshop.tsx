import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  ShoppingCart,
  ImageIcon,
  Filter,
  MessageCircle,
  FileCheck,
  TrendingUp,
  Users,
  LineChart,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";

export const Route = createFileRoute("/leistungen/barrierefreier-onlineshop")({
  head: () => ({
    meta: [
      { title: "Barrierefreier Onlineshop – InklusivDigital" },
      {
        name: "description",
        content:
          "Onlineshops müssen seit 28.06.2025 barrierefrei sein. Wir machen Shopify, WooCommerce, Magento und Custom-Lösungen BFSG-konform.",
      },
      { property: "og:title", content: "Barrierefreier Onlineshop – InklusivDigital" },
      { property: "og:description", content: "Rechtssicher verkaufen, mehr Kunden erreichen." },
    ],
  }),
  component: ShopPage,
});

const SHOP_BEREICHE = [
  { icon: Search, title: "Navigation & Suche", text: "Kunden finden Produkte auch ohne Maus – nur mit der Tastatur." },
  { icon: ShoppingCart, title: "Checkout ohne Hürden", text: "Der Bezahlvorgang ist logisch aufgebaut und Fehlermeldungen sagen genau, was im Formular fehlt." },
  { icon: ImageIcon, title: "Produktbilder mit Sinn", text: "Alt-Texte beschreiben, was auf den Bildern zu sehen ist." },
  { icon: Filter, title: "Filter & Sortierung", text: "Die Auswahl von Größen oder Farben ist auch für Screenreader-Nutzer klar erkennbar." },
  { icon: MessageCircle, title: "Alternative Kontaktwege", text: "Hilfe ist nicht nur per Telefon, sondern auch barrierefrei digital erreichbar." },
  { icon: FileCheck, title: "Rechtstexte", text: "AGB und Widerrufsbelehrung sind als barrierefreies HTML verfügbar, nicht nur als PDF." },
];

const CMS = ["Shopify", "WooCommerce", "Magento / Adobe Commerce", "Custom Systems"];

function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistung · Onlineshop"
        title="Barrierefreie Onlineshops: Rechtssicher verkaufen, mehr Kunden erreichen"
        intro={
          <>
            Betreibst du einen Onlineshop im B2C-Bereich? Dann ist das Barrierefreiheitsstärkungsgesetz (BFSG) für
            dich kein „Nice-to-have", sondern Pflicht. Seit dem <strong className="text-foreground">28. Juni 2025</strong> müssen
            Shops barrierefrei sein. Wer jetzt nicht handelt, riskiert nicht nur Bußgelder, sondern schließt potenziell
            Millionen von Kunden vom Einkauf aus.
          </>
        }
      >
        <CTAButton to="/kontakt">Shop-Audit anfragen</CTAButton>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Warum gerade Shops?"
          title="Warum Onlineshops besonders im Fokus stehen"
        />
        <div className="mt-8 max-w-3xl space-y-4 text-lg text-muted-foreground">
          <p>
            Das Gesetz ist eindeutig: Onlineshops gelten als „Dienstleistungen im elektronischen Geschäftsverkehr".
            Damit fallen sie voll unter das BFSG – völlig egal, ob du Kleidung, Software oder Lebensmittel verkaufst.
          </p>
          <p>
            Es gibt keine Übergangsfristen mehr. Sobald dein Shop die Schwelle zum Kleinstunternehmen
            (über 10 Mitarbeiter oder über 2 Mio. € Umsatz) überschreitet, musst du liefern. Aber auch für kleinere
            Shops ist Barrierefreiheit ein massiver Wettbewerbsvorteil.
          </p>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Aus Kundensicht"
          title="Wie ein barrierefreier Shop funktioniert"
          intro={`Stell dir vor, du möchtest ein T-Shirt kaufen, aber du kannst den „In den Warenkorb"-Button nicht finden, weil er nur mit der Maus bedienbar ist. Barrierefreiheit bedeutet, dass jeder bei dir einkaufen kann:`}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SHOP_BEREICHE.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="CMS-unabhängige Expertise"
          title="Egal, auf welcher Technik dein Shop basiert."
          intro="Wir machen ihn fit für das BFSG. Wir arbeiten routiniert mit:"
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CMS.map((name) => (
            <div
              key={name}
              className="grid h-20 place-items-center rounded-xl border border-border bg-card p-2 text-center text-xs font-semibold text-muted-foreground grayscale transition hover:grayscale-0 hover:text-foreground sm:text-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Business-Case"
          title="Dein Business-Case für Barrierefreiheit"
          intro="Über 20 % der Internetnutzer profitieren direkt davon. Eine barrierefreie Website verbessert deine UX für alle Nutzer, sorgt für besseres SEO-Ranking und steigert deine Conversion-Rate."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <BigStatement icon={<Users />} kicker="UX" headline="Bessere UX für alle" text="Sehbehinderte, ältere Nutzer, Eltern mit nur einer freien Hand – alle profitieren." />
          <BigStatement icon={<TrendingUp />} kicker="SEO" headline="Mehr Reichweite" text="Saubere Semantik & Alt-Texte zahlen direkt auf dein Ranking ein." />
          <BigStatement icon={<LineChart />} kicker="Conversion" headline="Höhere Umsätze" text="Reibungsloser Checkout = weniger Abbrüche, mehr verkaufte Produkte." />
        </div>
        <div className="mt-12 text-center">
          <CTAButton to="/kontakt">Shop-Audit anfragen</CTAButton>
        </div>
      </Section>
    </>
  );
}

function BigStatement({
  icon,
  kicker,
  headline,
  text,
}: {
  icon: React.ReactNode;
  kicker: string;
  headline: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-foreground p-8 text-background">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-background/10 text-background [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-background/60">{kicker}</p>
      <h3 className="mt-1 font-display text-2xl font-bold">{headline}</h3>
      <p className="mt-3 text-sm text-background/70">{text}</p>
    </div>
  );
}
