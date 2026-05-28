import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – InklusivDigital" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Impressum
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground">
          <div>
            <h2 className="font-display text-lg font-bold">Angaben gemäß § 5 TMG</h2>
            <div className="mt-3 space-y-1 text-muted-foreground">
              <p>[Firmenname]</p>
              <p>[Straße und Hausnummer]</p>
              <p>[PLZ] [Stadt]</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">Kontakt</h2>
            <div className="mt-3 space-y-1 text-muted-foreground">
              <p>Telefon: [Telefonnummer]</p>
              <p>E-Mail: [E-Mail-Adresse]</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">
              Umsatzsteuer-ID
            </h2>
            <p className="mt-3 text-muted-foreground">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="mt-3 space-y-1 text-muted-foreground">
              <p>[Name]</p>
              <p>[Anschrift]</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">Haftungsausschluss</h2>
            <div className="mt-3 space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">Haftung für Inhalte</h3>
                <p className="mt-1">
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Haftung für Links</h3>
                <p className="mt-1">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                  diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                  Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                  oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
