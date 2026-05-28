import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung – InklusivDigital" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              1. Datenschutz auf einen Blick
            </h2>
            <div className="mt-3 space-y-3 text-muted-foreground">
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              2. Verantwortlicher
            </h2>
            <div className="mt-3 space-y-1 text-muted-foreground">
              <p>[Firmenname]</p>
              <p>[Adresse]</p>
              <p>E-Mail: [E-Mail-Adresse]</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              3. Datenerfassung auf dieser Website
            </h2>
            <div className="mt-3 space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">Kontaktformular</h3>
                <p className="mt-1">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                  werden Ihre Angaben aus dem Anfrageformular inklusive der von
                  Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                  Anfrage und für den Fall von Anschlussfragen bei uns
                  gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
                  weiter. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Server-Log-Dateien</h3>
                <p className="mt-1">
                  Der Provider der Seiten erhebt und speichert automatisch
                  Informationen in so genannten Server-Log-Dateien, die Ihr
                  Browser automatisch an uns übermittelt. Dies sind: Browsertyp
                  und Browserversion, verwendetes Betriebssystem, Referrer URL,
                  Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage,
                  IP-Adresse.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              4. Ihre Rechte
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
              Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
              Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu
              weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit
              unter der im Impressum angegebenen Adresse an uns wenden.
            </p>
          </div>

          <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 text-xs text-muted-foreground">
            <strong className="text-foreground">Hinweis:</strong> Diese
            Datenschutzerklärung ist ein Platzhalter und muss durch eine
            rechtlich geprüfte, vollständige Fassung ersetzt werden.
          </div>
        </div>
      </div>
    </section>
  );
}
