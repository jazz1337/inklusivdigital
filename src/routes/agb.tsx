import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "AGB – InklusivDigital" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AgbPage,
});

type Clause = { num?: string; text: string; bullets?: string[] };
type Sec = { n: number; title: string; clauses: Clause[] };

const AGB: Sec[] = [
  {
    n: 1,
    title: "Geltungsbereich, Begriffsbestimmungen",
    clauses: [
      { num: "1.1", text: `Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") der Priller & Paulikat GbR (nachfolgend "Agentur"), gelten für alle Verträge, die ein Unternehmer (nachfolgend "Kunde") mit der Agentur über die von der Agentur auf ihrer Website oder in anderen Medien beschriebenen Dienstleistungen abschließt. Hiermit wird der Einbeziehung von eigenen Bedingungen des Kunden widersprochen, es sei denn, es ist etwas anderes vereinbart.` },
      { num: "1.2", text: `Unternehmer im Sinne dieser AGB ist eine natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.` },
    ],
  },
  {
    n: 2,
    title: "Leistungen der Agentur",
    clauses: [
      { num: "2.1", text: `Ziel der Zusammenarbeit zwischen dem Kunden und der Agentur ist die Optimierung und gegebenenfalls auch der Ausbau des Auftritts des Unternehmens des Kunden und / oder seiner Produkte.` },
      { num: "2.2", text: `Die Agentur erbringt im Rahmen der konkret im Vertrag vereinbarten Leistungen für den Kunden umfassende Dienstleistungen im Bereich Kommunikation und Marketing, einschließlich gegebenenfalls Beratungs-, Planungs-, Konzeptions- und Umsetzungsleistungen.` },
      {
        num: "2.3",
        text: `Je nach konkreter Vereinbarung zwischen den Parteien erbringt die Agentur gegenüber dem Kunden Leistungen im Vertrag gegebenenfalls insbesondere aus den folgenden Bereichen:`,
        bullets: [
          `Beratung hinsichtlich digitaler Sichtbarkeit und Markenpositionierung`,
          `Entwicklung und Durchführung von Marketing-, Branding- und Kommunikationsstrategien`,
          `Konzeption, Planung und Umsetzung von Marketing- und Werbekampagnen`,
          `Monitoring, Reporting und Erfolgskontrolle der eingesetzten Marketinginstrumente`,
          `Betreuung und strategische Weiterentwicklung von Social Media-Kanälen`,
          `Leistungen als Content Creator (z. B. Erstellung von Texten, Bildern, Videos, Posts, Reels, Stories, etc.)`,
          `Suchmaschinenoptimierung (SEO) und KI-Optimierung (AIO)`,
          `Schaltung von Werbeanzeigen (z. B. Bannern)`,
        ],
      },
      { num: "2.4", text: `Die genauen Inhalte, Ziele und Zeitpläne werden in einem gesonderten Projektplan oder sonstigen Dokument von den Parteien konkretisiert.` },
    ],
  },
  {
    n: 3,
    title: "Vertragsschluss",
    clauses: [
      { text: `Der Kunde kann per Telefon, Fax, E-Mail, Brief oder über das auf der Website der Agentur vorgehaltene Online-Kontaktformular eine unverbindliche Anfrage auf Abgabe eines Angebots an die Agentur richten.` },
      { text: `Die Agentur lässt dem Kunden auf dessen Anfrage hin per E-Mail, Fax oder Brief, ein verbindliches Angebot zur Erbringung der vom Kunden zuvor ausgewählten Dienstleistung zukommen.` },
      { text: `Dieses Angebot kann der Kunde durch eine gegenüber der Agentur abzugebende Annahmeerklärung per Fax, E-Mail oder Brief oder durch Zahlung der von der Agentur angebotenen Vergütung innerhalb von sieben (7) Tagen ab Zugang des Angebots annehmen, wobei für die Berechnung der Frist der Tag des Angebotszugangs nicht mitgerechnet wird. Für die Annahme durch Zahlung ist der Tag des Zahlungseingangs bei der Agentur maßgeblich. Fällt der letzte Tag der Frist zur Annahme des Angebots auf einen Samstag, Sonntag, oder einen am Sitz des Kunden staatlich anerkannten allgemeinen Feiertag, so tritt an die Stelle eines solchen Tages der nächste Werktag. Nimmt der Kunde das Angebot der Agentur innerhalb der vorgenannten Frist nicht an, so ist die Agentur nicht mehr an ihr Angebot gebunden. Hierauf wird die Agentur den Kunden in seinem Angebot nochmals besonders hinweisen.` },
    ],
  },
  {
    n: 4,
    title: "Leistungserbringung und Zusammenarbeit",
    clauses: [
      { num: "4.1", text: `Die Agentur bietet ihre Leistungen gemäß der vertraglichen Vereinbarung online und / oder beim Kunden vor Ort an. Der Inhalt der konkreten Leistung ergibt sich aus dem Angebot der Agentur.` },
      { num: "4.2", text: `Die Agentur kann den Vertragsschluss mit dem Kunden und die Erbringung von Leistungen für den Kunden ablehnen, soweit die Durchführung des Vertrags oder die Erbringung der Leistungen gegen gesetzliche oder behördliche Vorgaben verstoßen würde oder dies der Agentur aus sonstigen Gründen nicht zumutbar ist, beispielsweise wegen Verstoßes gegen das Gebot der weltanschaulichen, politischen oder religiösen Neutralität oder wegen auch nur vorübergehender Zahlungsunfähigkeit des Kunden.` },
      { num: "4.3", text: `Die Agentur erbringt ihre vertraglichen Leistungen gemäß den vereinbarten Anforderungen oder – soweit nichts anderes vereinbart ist – nach den Grundsätzen einer ordnungsgemäßen Berufsausübung. Soweit sich aus dem Angebot der Agentur nichts anderes ergibt, schuldet die Agentur keinen bestimmten Erfolg. Insbesondere übernimmt die Agentur keine Gewähr dafür, dass sich beim Kunden ein bestimmter Erfolg einstellt oder dass der Kunde ein bestimmtes Ziel erreicht. Dies ist nicht zuletzt auch vom persönlichen Einsatz und Willen des Kunden abhängig, auf den die Agentur keinen Einfluss hat.` },
      { num: "4.4", text: `Die Agentur und der Kunde stimmen sich in angemessenen Abständen über die Durchführung der beauftragten Leistungen ab. Bei Abweichungen von den vereinbarten Leistungen oder Vorgehen teilen die Parteien dies unverzüglich der jeweils anderen Partei mit.` },
      { num: "4.5", text: `Soweit keine kontinuierliche Leistungserbringung vereinbart ist, erfolgt der Abruf einzelner Leistungen durch Beauftragung in Textform (z. B. per E-Mail) durch den Kunden. Die Agentur verpflichtet sich, eine Auftragsbestätigung mit Leistungsumfang, zeitlicher Umsetzung und etwaigen Zusatzkosten innerhalb von drei (3) Werktagen nach Abruf zu übermitteln. Leistungen gelten erst mit Freigabe des Kunden in zumindest Textform als verbindlich beauftragt.` },
      { num: "4.6", text: `Termine sind nur bei ausdrücklicher Bezeichnung als solche verbindlich. Soweit es sich nicht um solche ausdrücklichen Leistungstermine handelt, sind Termine Zieltermine, die im Rahmen der Zusammenarbeit stetig angepasst werden können. Der Kunde ist berechtigt, nach Ablauf einer angemessenen Zeit nach einem Zieltermin von der Agentur die Erbringung noch ausstehender Leistungen unter angemessener Fristsetzung zumindest in Textform zu fordern. Mit Fristablauf ist der Anspruch des Kunden fällig.` },
      { num: "4.7", text: `Der Kunde ist allein dafür verantwortlich, dass die Inhalte oder sonstigen Informationen auf seinen Online-Präsenzen und die von ihm gelieferten oder freigegebenen Inhalte oder sonstigen Informationen rechtlich zulässig sind. Die Agentur ist nicht verpflichtet, ihre Leistungsergebnisse rechtlich zu prüfen oder prüfen zu lassen, insbesondere auch nicht im Hinblick auf das Wettbewerbs-, Marken-, Persönlichkeits- und Urheberrecht, und führt eine solche rechtliche Prüfung auch nicht durch. Dies gilt ausdrücklich auch für die Durchführung von markenrechtlichen Recherchen und Prüfungen, etwa im Hinblick auf potentielle Markenrechtsverstöße.` },
      { num: "4.8", text: `Die Agentur postet, verbreitet und veröffentlicht Inhalte und sonstige Informationen auf Online-Präsenzen (z. B. Social Media-Kanäle, Websites, etc.) des Kunden sowie etwaiger Dritter im Rahmen der vertraglichen Leistungen nur, soweit der Kunde dies jeweils freigegeben hat, es sei denn, es ist etwas anderes vereinbart. Der Kunde muss Inhalte und sonstige Informationen nach entsprechender Aufforderung binnen drei (3) Werktagen, durch Erklärung zumindest in Textform freigeben, soweit nichts anderes vereinbart ist. Nach Ablauf dieser Frist gilt die Leistung als freigegeben, es sei denn, der Kunde verweigert die Freigabe innerhalb dieser Frist.` },
      { num: "4.9", text: `Die Agentur setzt zur Erbringung der beauftragten Leistungen hierfür qualifiziertes Personal ein. Die Agentur wählt nach eigenem pflichtgemäßem Ermessen aus, welches Personal zur Durchführung der einzelnen vertraglich vereinbarten Leistungen eingesetzt wird. Insbesondere behält sich die Agentur vor, eingesetztes Personal aus wichtigem oder in sonstiger Weise berechtigtem Grund durch anderes Personal entsprechend geeigneter Qualifikation zu ersetzen. Die Agentur kann sich auch der Leistungen Dritter (Subunternehmer) bedienen, die in ihrem Auftrag tätig werden, bleibt in diesem Fall jedoch gegenüber dem Kunden alleiniger Vertragspartner und verantwortlich für die ordnungsgemäße Leistungserbringung. Die Agentur stellt sicher, dass etwaige Subunternehmer zur Vertraulichkeit verpflichtet und – soweit erforderlich – datenschutzrechtlich gebunden werden. Soweit sich aus dem Angebot der Agentur nichts anderes ergibt, hat der Kunde keinen Anspruch auf Auswahl einer bestimmten Person zur Durchführung der gewünschten Leistungen.` },
      { num: "4.10", text: `Mitarbeitende oder sonstiges Personal der Agentur werden nicht in den Betrieb des Kunden eingegliedert und treten in kein Arbeitsverhältnis zum Kunden.` },
    ],
  },
  {
    n: 5,
    title: "Leistungsänderungen (Change Requests)",
    clauses: [
      { num: "5.1", text: `Beide Parteien können jederzeit Änderungen der vereinbarten Leistungen vorschlagen. Die Agentur prüft Änderungswünsche des Kunden innerhalb angemessener Frist und unterbreitet dem Kunden ein Angebot zur Umsetzung der Änderungen, das insbesondere Inhalt, Zeit, Kosten und Auswirkungen auf den Zeitplan beinhaltet.` },
      { num: "5.2", text: `Änderungen von Leistungen gelten erst dann als vereinbart, wenn sie von beiden Parteien zumindest in Textform (z. B. E-Mail) bestätigt worden sind. Der ursprüngliche Vertrag oder Auftrag bleibt bis zur Annahme der Änderungen unverändert in Kraft.` },
      { num: "5.3", text: `Führt ein Änderungswunsch des Kunden zu einem erheblichen Mehraufwand, kann die Agentur eine Anpassung der vereinbarten Vergütung und des Zeitplans verlangen.` },
    ],
  },
  {
    n: 6,
    title: "Mitwirkungspflichten des Kunden",
    clauses: [
      { num: "6.1", text: `Der Kunde hat der Agentur die für die Erbringung der vertraglichen Leistung benötigten Informationen, Unterlagen, Freigaben, Zugangsdaten und Entscheidungsträger unentgeltlich, vollständig, wahrheitsgemäß und rechtzeitig zur Verfügung zu stellen, soweit die jeweilige Beschaffung nach dem Inhalt des Vertrages nicht in den Pflichtenkreis der Agentur fällt.` },
      { num: "6.2", text: `Insbesondere stellt der Kunde der Agentur auf Anforderung alle erforderlichen Zugänge zu seinen Social Media-Konten, Webseiten, Analysetools und sonstigen Dienste und elektronischen Plattformen in geeigneter Weise zur Verfügung, soweit dies für die Erfüllung der vertraglichen Leistungen erforderlich ist. Dies umfasst gegebenenfalls auch die Erteilung von Administratorrechten oder die Einrichtung von Nutzerkonten mit hinreichenden Berechtigungen.` },
      { num: "6.3", text: `Der Kunde gewährleistet, dass von ihm zur Erbringung der vertraglichen Leistung bereitgestellte Dokumente (z. B. Vorlagen, Muster und Unterlagen), Inhalte und sonstige Informationen frei von Rechten Dritter sind, die der rechtmäßigen Erbringung der vertraglichen Leistungen entgegenstehen. Der Kunde stellt die Agentur von sämtlichen Ansprüchen Dritter sowie von Kosten einer damit verbundenen angemessenen Rechtsverfolgung bzw. Rechtsverteidigung frei, insbesondere aus dem Wettbewerbs-, Urheber- und Markenrecht.` },
      { num: "6.4", text: `Der Kunde ist allein dafür verantwortlich, dass Nutzerdaten auf seinen Online-Präsenzen im Einklang mit den geltenden Vorgaben, insbesondere des Datenschutzes gemäß der EU-Datenschutz-Grundverordnung (DSGVO), erhoben, gespeichert und verarbeitet werden, insbesondere im Hinblick auf die etwaige Einholung entsprechender Einwilligungen der Nutzer seiner Online-Präsenzen und deren datenschutzkonforme Information im Rahmen der Datenschutzerklärung. Der Kunde stellt die Agentur von sämtlichen diesbezüglichen Ansprüchen Dritter sowie von Kosten einer damit verbundenen angemessenen Rechtsverfolgung bzw. Rechtsverteidigung frei.` },
      { num: "6.5", text: `Soweit nach dem konkreten Vertragsinhalt eine Begutachtung beim Kunden vereinbart ist, gewährt der Kunde der Agentur Zugang zu den von diesem zu begutachtenden physischen oder digitalen Einrichtungen und stellt ihr gegebenenfalls geeignetes, vom Kunden ausgewähltes Fachpersonal zur Verfügung, soweit dies für die Erbringung der vertraglichen Leistungen erforderlich ist.` },
      { num: "6.6", text: `Wenn der Kunde ein Re-Design oder eine Überarbeitung der Struktur seiner Online-Präsenzen (z. B. Social Media-Kanäle, Websites, etc.) plant, wird er dies der Agentur im Vorfeld mitteilen und deren Durchführung mit der Agentur abstimmen.` },
      { num: "6.7", text: `Soweit im Einzelfall die Abnahme einer Leistung der Agentur zu erfolgen hat, muss der Kunde die Leistung nach entsprechender Aufforderung binnen acht (8) Werktagen durch Erklärung zumindest in Textform oder der sonstigen hierfür erforderlichen Mitwirkungsleistungen abnehmen. Nach Ablauf dieser Frist gilt die Leistung als abgenommen, es sei denn, der Kunde hat innerhalb der Frist Mängel der Leistung zumindest in Textform gerügt. Bei unwesentlichen Mängeln darf der Kunde die Abnahme nicht verweigern. Soweit der Kunde die Leistung im Wesentlichen ohne vorherige Abnahme verwendet, gilt die Abnahme mit der Verwendung der Leistung als erfolgt.` },
      { num: "6.8", text: `Wenn der Kunde seinen Mitwirkungspflichten nicht nachkommt, so kann sich dies auf Termine, Leistungen und Qualität auswirken. In diesem Fall ist die Agentur nicht für daraus resultierende Verzögerungen oder Qualitätsmängel verantwortlich. Soweit der Agentur in einem solchen Fall zusätzlicher Aufwand entsteht, werden die damit verbundenen Kosten dem Kunden auf Grundlage der vereinbarten Konditionen für die Vergütung (z. B. Stundensatz) in Rechnung gestellt.` },
    ],
  },
  {
    n: 7,
    title: "Vergütung und Zahlungen",
    clauses: [
      { num: "7.1", text: `Soweit sich aus dem Angebot der Agentur nichts anderes ergibt, handelt es sich bei den angegebenen Preisen um Gesamtpreise, die die gesetzliche Umsatzsteuer enthalten.` },
      { num: "7.2", text: `Der Kunde ist verpflichtet, der Agentur die vereinbarte Vergütung fristgemäß zu zahlen. Je nach Vereinbarung der Parteien erfolgt die Vergütung im Rahmen einer monatlichen Pauschalvergütung in der vereinbarten Höhe, nach tatsächlichem Zeitaufwand auf Grundlage eines Stundensatzes oder in sonstiger Weise gemäß der Absprache der Parteien.` },
      { num: "7.3", text: `Sonder- oder Zusatzleistungen der Agentur, die nicht Bestandteil der ursprünglich vereinbarten Leistungen sind, bedürfen der vorherigen Beauftragung durch den Kunden zumindest in Textform und werden gesondert abgerechnet.` },
      { num: "7.4", text: `Der Kunde ist verpflichtet, Auslagen und sonstige Nebenkosten zu erstatten, die der Agentur nach vorheriger Absprache zwischen ihm und dem Kunden im Zusammenhang mit der Erfüllung dieses Vertrags notwendigerweise entstehen.` },
      { num: "7.5", text: `Etwaig anfallende Reisekosten für Anreise, Übernachtung, Verpflegung bei vor Ort erbrachten Leistungen und sonstige Spesen und Nebenkosten sind in der Vergütung für die Leistungen der Agentur nicht enthalten und sind nach Aufwand und gegen Nachweis vom Kunden zu tragen, soweit sich aus dem Angebot der Agentur nichts anderes ergibt und diese vom Kunden im Vorfeld freigegeben worden sind.` },
      { num: "7.6", text: `Die Agentur hat das Recht, nach vorheriger Absprache mit dem Kunden die zur Erfüllung dieses Vertrags erforderlichen Drittleistungen im Namen und für Rechnung des Kunden zu erwerben. Dies gilt insbesondere, aber nicht ausschließlich, für den Erwerb von Lizenzen bzw. Nutzungsrechten an Bildern, Grafiken, Texten, Software oder sonstigen geschützten Gegenständen. Der Kunde verpflichtet sich, der Agentur hierfür Vollmacht zu erteilen und erteilt diese hiermit sogleich. Im Falle des Erwerbs von solchen Drittleistungen verpflichtet sich der Kunde, die Agentur im Innenverhältnis von sämtlichen Vergütungsansprüchen freizustellen, die aus den Vertragsschlüssen mit den jeweiligen Drittanbietern folgen. Die Agentur ist berechtigt, diese Kosten in Rechnung zu stellen, sobald sie ihrerseits von dem Dritten in Rechnung gestellt werden.` },
      { num: "7.7", text: `Die Zahlungsmöglichkeiten werden dem Kunden im Angebot der Agentur mitgeteilt.` },
      { num: "7.8", text: `Ist Abrechnung via Rechnungsstellung vereinbart, sind Zahlungen 14 Tage nach Erhalt der Rechnung ohne Abzug fällig, soweit nichts anderes vereinbart ist.` },
      { num: "7.9", text: `Ist Vorauskasse per Banküberweisung vereinbart, ist die Zahlung sofort nach Vertragsabschluss fällig, soweit die Parteien keinen späteren Fälligkeitstermin vereinbart haben.` },
      { num: "7.10", text: `Bei Zahlungsverzug gelten die gesetzlichen Regelungen.` },
    ],
  },
  {
    n: 8,
    title: "Vertragslaufzeit und Kündigung bei Dauerschuldverhältnissen",
    clauses: [
      { num: "8.1", text: `Der Vertrag wird unbefristet geschlossen und kann vom Kunden zum Ende eines jeden Monats gekündigt werden.` },
      { num: "8.2", text: `Das Recht der Agentur und des Kunden, den Vertrag aus wichtigem Grund zu kündigen, bleibt unberührt. Ein wichtiger Grund liegt vor, wenn dem kündigenden Teil unter Berücksichtigung aller Umstände des Einzelfalls und unter Abwägung der beiderseitigen Interessen die Fortsetzung des Vertragsverhältnisses bis zur vereinbarten Beendigung oder bis zum Ablauf einer Kündigungsfrist nicht zugemutet werden kann.` },
      { num: "8.3", text: `Kündigungen können schriftlich oder in Textform (z. B. per E-Mail) erfolgen.` },
    ],
  },
  {
    n: 9,
    title: "Nutzungsrechte an Leistungsergebnissen",
    clauses: [
      { num: "9.1", text: `Die Agentur ist Inhaberin sämtlicher Nutzungs- und Verwertungsrechte an den von ihr im Rahmen des Vertrags mit dem Kunden geschaffenen Leistungs- und Arbeitsergebnissen sowie an den verwendeten und bereitgestellten Inhalten und Informationen, einschließlich Konzepten, (Vor-)Entwürfen, Gestaltungen, Designs, Texten, Grafiken, Videos oder sonstigem Material (nachfolgend "Content"), die - gleich in welcher Form - gegebenenfalls im Zusammenhang mit der Erbringung der Leistungen der Agentur dem Kunden bereitgestellt oder für diesen verwendet werden, soweit nichts anderes vereinbart ist und sich aus den Umständen nichts anderes ergibt.` },
      { num: "9.2", text: `Soweit nichts anderes vereinbart ist, räumt die Agentur dem Kunden an dem Content ein einfaches, nicht übertragbares Nutzungs- und Verwertungsrecht ein, den Content zum vereinbarten Zweck und im vereinbarten Umfang zu nutzen und zu verwerten. Die Rechte gelten als räumlich und zeitlich unbeschränkt für die vereinbarte Nutzung und Verwertung und den vereinbarten Nutzungs- und Verwertungszweck eingeräumt.` },
      { num: "9.3", text: `Der Kunde darf ihm von der Agentur gegebenenfalls im Zusammenhang mit deren Leistungen überlassenen Content lediglich in dem Umfang nutzen und verwerten, der vereinbart oder nach dem Vertragszweck erforderlich ist. Ohne gesonderte Zustimmung der Agentur ist der Kunde darüber hinaus insbesondere nicht berechtigt, ihm überlassenen Content ganz oder teilweise zu bearbeiten, umzugestalten, nachzunahmen, zu vervielfältigen, zu verbreiten oder öffentlich zugänglich zu machen und Nutzungs- und Verwertungsrechte an dem Content ganz oder teilweise zu übertragen oder Dritten einzuräumen.` },
      { num: "9.4", text: `Die Agentur darf den Content zur Eigenwerbung und als Referenz verwenden, soweit dies nicht ausdrücklich ausgeschlossen ist.` },
    ],
  },
  {
    n: 10,
    title: "Vertraulichkeit und Datenschutz",
    clauses: [
      { num: "10.1", text: `Die Agentur wird die im Rahmen ihrer Leistungen über den Kunden erlangten Informationen, insbesondere solche Informationen, die private oder betriebliche Belange betreffen, vertraulich behandeln und nicht an Dritte weitergeben, soweit dies nicht zur Erfüllung ihrer eigenen vertraglichen Pflichten gegenüber dem Kunden erforderlich ist.` },
      { num: "10.2", text: `Soweit die Agentur im Rahmen der Vertragserfüllung personenbezogene Daten im Auftrag des Kunden verarbeitet, schließen die Parteien ergänzend eine gesonderte Auftragsverarbeitungsvereinbarung (AVV) gemäß Artikel 28 der EU-Datenschutz-Grundverordnung (DSGVO) und gegebenenfalls sonstige Datenschutzvereinbarungen, soweit dies aus datenschutzrechtlicher Sicht erforderlich ist.` },
    ],
  },
  {
    n: 11,
    title: "Exklusivität und Wettbewerbsverbot",
    clauses: [
      { num: "11.1", text: `Soweit zwischen den Parteien nichts anderes vereinbart ist, wird die Agentur während der Laufzeit des Vertrags zwischen den Parteien ohne vorherige ausdrückliche Zustimmung des Kunden keine Dienstleistungen für direkte Wettbewerber des Kunden erbringen, soweit die Wettbewerber im unmittelbaren Wettbewerb mit dem Kunden stehen.` },
      { num: "11.2", text: `Ein Wettbewerber in diesem Sinne ist ein Unternehmen, das vergleichbare Produkte oder Dienstleistungen wie der Kunde anbietet und sich an dieselbe Zielgruppe richtet.` },
      { num: "11.3", text: `Die Agentur wird dem Kunden auf Nachfrage offenlegen, für welche weiteren Kunden sie tätig ist, soweit dies zur Überprüfung eines potenziellen Wettbewerbsverhältnisses erforderlich ist.` },
      { num: "11.4", text: `Verstößt die Agentur schuldhaft gegen diese Regelung, ist der Kunde berechtigt, den Vertrag aus wichtigem Grund fristlos zu kündigen.` },
    ],
  },
  {
    n: 12,
    title: "Mängelhaftung (Gewährleistung)",
    clauses: [
      { num: "12.1", text: `Soweit die Agentur gestalterische Leistungen für den Kunden erbringt, steht ihr eine künstlerische Gestaltungsfreiheit zu.` },
      { num: "12.2", text: `Reklamationen, die die Gestaltungsfreiheit der Agentur betreffen, sind kein Sachmangel der Leistungen der Agentur, soweit sich die Leistungen im vereinbarten Rahmen bewegen und bei Leistungen dieser Art üblich ist.` },
      { num: "12.3", text: `Leistungen der Agentur gelten als genehmigt, soweit diese vom Kunden freigegeben worden sind oder als freigegeben gelten.` },
      { num: "12.4", text: `Mängel sind der Agentur unverzüglich unter Beschreibung des Mangels mitzuteilen.` },
      { num: "12.5", text: `Im Übrigen gelten die Vorschriften der gesetzlichen Mängelhaftung.` },
    ],
  },
  {
    n: 13,
    title: "Haftung",
    clauses: [
      { num: "13.1", text: `Die Agentur haftet nicht für Schäden, die durch die Störung ihres Betriebs infolge von höherer Gewalt, Aufruhr, Kriegs- und Naturereignissen oder infolge von sonstigen von der Agentur nicht zu vertretenden Vorkommnissen (z. B. Streik, Aussperrung, Verkehrsstörungen, Verfügungen von öffentlicher Hand des In- und Auslands) veranlasst oder auf nicht schuldhaft durch sie verursachte technische Probleme zurückzuführen sind. Dies gilt auch, soweit diese Störungen bei von der Agentur beauftragten Dritten eintreten.` },
      { num: "13.2", text: `Im Übrigen haftet die Agentur dem Kunden aus allen vertraglichen, vertragsähnlichen und gesetzlichen – einschließlich deliktischen – Ansprüchen auf Schadens- und Aufwendungsersatz wie folgt:` },
      {
        num: "13.3",
        text: `Die Agentur haftet aus jedem Rechtsgrund uneingeschränkt`,
        bullets: [
          `bei Vorsatz oder grober Fahrlässigkeit,`,
          `bei vorsätzlicher oder fahrlässiger Verletzung des Lebens, des Körpers oder der Gesundheit,`,
          `aufgrund eines Garantieversprechens, soweit diesbezüglich nichts anderes geregelt ist,`,
          `aufgrund zwingender Haftung wie etwa nach dem Produkthaftungsgesetz.`,
        ],
      },
      { num: "13.4", text: `Verletzt die Agentur fahrlässig eine wesentliche Vertragspflicht, ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt, soweit nicht gemäß vorstehender Ziffer unbeschränkt gehaftet wird. Wesentliche Vertragspflichten sind Pflichten, die der Vertrag der Agentur nach seinem Inhalt zur Erreichung des Vertragszwecks auferlegt, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.` },
      { num: "13.5", text: `Im Übrigen ist eine Haftung der Agentur ausgeschlossen.` },
      { num: "13.6", text: `Vorstehende Haftungsregelungen gelten auch im Hinblick auf die Haftung der Agentur für ihre Erfüllungsgehilfen und gesetzlichen Vertreter.` },
      { num: "13.7", text: `Für Leistungen Dritter, die keine Erfüllungsgehilfen der Agentur sind (z. B. Hosting-Anbieter, soziale Netzwerke, Plattformen), übernimmt die Agentur keine Haftung.` },
    ],
  },
  {
    n: 14,
    title: "Anwendbares Recht und Gerichtsstand",
    clauses: [
      { num: "14.1", text: `Für sämtliche Rechtsbeziehungen der Parteien gilt das Recht der Bundesrepublik Deutschland.` },
      { num: "14.2", text: `Handelt der Kunde als Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen mit Sitz im Hoheitsgebiet der Bundesrepublik Deutschland, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag der Geschäftssitz der Agentur. Hat der Kunde seinen Sitz außerhalb des Hoheitsgebiets der Bundesrepublik Deutschland, so ist der Geschäftssitz der Agentur ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag, wenn der Vertrag oder Ansprüche aus dem Vertrag der beruflichen oder gewerblichen Tätigkeit des Kunden zugerechnet werden können. Die Agentur ist in den vorstehenden Fällen jedoch in jedem Fall berechtigt, das Gericht am Sitz des Kunden anzurufen.` },
    ],
  },
  {
    n: 15,
    title: "Schlussbestimmungen",
    clauses: [
      { num: "15.1", text: `Änderungen und Ergänzungen des zwischen den Parteien geschlossenen Vertrags bedürfen zumindest der Textform. Dies gilt auch für die Aufhebung dieser Klausel.` },
      { num: "15.2", text: `Sollte eine Bestimmung des Vertrags zwischen den Parteien unwirksam oder undurchführbar sein, bleibt die Wirksamkeit des Vertrags im Übrigen unberührt.` },
    ],
  },
];

function AgbPage() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h1 className="font-display break-words text-3xl font-bold text-foreground md:text-4xl">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Stand: 06.07.2026 · Priller &amp; Paulikat GbR</p>

        {/* Inhaltsverzeichnis */}
        <nav aria-label="Inhaltsverzeichnis" className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Inhalt</h2>
          <ol className="mt-4 space-y-1.5 text-sm">
            {AGB.map((s) => (
              <li key={s.n}>
                <a
                  href={`#abschnitt-${s.n}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="font-medium text-foreground">{s.n}.</span> {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Abschnitte */}
        <div className="mt-12 space-y-10">
          {AGB.map((s) => (
            <div key={s.n} id={`abschnitt-${s.n}`} className="scroll-mt-24">
              <h2 className="font-display text-lg font-bold text-foreground">
                {s.n}) {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                {s.clauses.map((c, i) => (
                  <div key={i}>
                    <p>
                      {c.num && <span className="font-semibold text-foreground">{c.num}&nbsp;</span>}
                      {c.text}
                    </p>
                    {c.bullets && (
                      <ul className="mt-2 space-y-1.5 pl-1">
                        {c.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/50" aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          Erstellt mit dem AGB-Konfigurator der IT-Recht Kanzlei. Stand: 06.07.2026.
        </p>
      </div>
    </section>
  );
}
