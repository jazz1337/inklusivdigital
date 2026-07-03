# BFSG-Schnelltest v2 — Setup

Der Workflow `bfsg-scan-v2.json` ersetzt `bfsg-scan-webhook.json`. Er bündelt **vier** Webhook-Eingänge in einem Workflow und ermöglicht den Sofort-Redirect + eine per E-Mail freigeschaltete Voll-Report-Seite.

## Ablauf

1. **`POST /webhook/bfsg-scan`** `{ url }` → validiert die URL, schreibt einen *Pending*-Marker, **antwortet sofort** mit `{ reportId }` und scannt danach im Hintergrund mit Lighthouse. Ergebnis wird als `$HOME/bfsg-reports/<reportId>.json` abgelegt.
2. **`POST /webhook/bfsg-status`** `{ reportId }` → Polling-Endpoint. Liefert `pending`, `error` oder `done`. **Im `done`-Fall nur Score + Zähler — niemals die Fehlerliste** (Gate auf Datenebene).
3. **`POST /webhook/bfsg-unlock`** `{ reportId, email }` → prüft E-Mail (Format + MX-Record via DNS-over-HTTPS + Wegwerf-Blockliste). Bei Erfolg: kopiert den Vollreport unter einen geheimen Token, verschickt den Link per Mail, hängt eine Lead-Zeile an `$HOME/bfsg-reports/leads.csv`.
4. **`POST /webhook/bfsg-full`** `{ token }` → liefert den **vollständigen** Report (Liste enthüllt). Nur über den per Mail zugestellten Token erreichbar.

## Was du in n8n konfigurieren musst

- **SSH-Credential** „SSH Private Key account" (ID `DAjiQBL7pUMlOqHe`) — ist bereits aus dem alten Workflow vorhanden.
- **Gmail-Credential**: Der Node **„Send Report Email"** referenziert `REPLACE_WITH_YOUR_GMAIL_CREDENTIAL`. Nach dem Import einmal den Node öffnen und deine Gmail-OAuth-Verbindung (Scope „E-Mail senden") auswählen. Alternativ den Gmail-Node durch einen SMTP-/„Send Email"-Node ersetzen, falls der Versand über eure eigene Domain laufen soll (empfohlen für Zustellbarkeit).
- Workflow **aktivieren** (Toggle oben rechts), sonst antworten die `/webhook/`-URLs nicht.

## Server-Setup (einmalig)

Die Reports liegen unter `$HOME/bfsg-reports` des SSH-Users — **bewusst außerhalb jedes Web-Docroots** (`/var/www`, `/srv/www` o. ä.). Das ist die eigentliche Vertrauensgrenze: Läge das Verzeichnis in einem Docroot, könnte man den Voll-Report per direktem GET (`…/reports/<reportId>.json`) am E-Mail-Gate vorbei laden. Die `mkdir -p`-Befehle im Workflow legen das Verzeichnis selbst an; da es im Home liegt, sind keine Sonderrechte nötig. Alle Lesezugriffe laufen ausschließlich über die Webhooks, die die Daten projizieren — keine nginx-Konfiguration erforderlich.

**Aufräum-Cron für die Lebensdauer der Reports** (in die Crontab des SSH-Users, `crontab -e` — cron setzt `$HOME` automatisch auf das Home des Users):

```cron
# Teaser-Reports nach 1 Stunde loeschen (nur oberste Ebene, nicht die Voll-Kopien, nicht leads.csv)
*/15 * * * * find $HOME/bfsg-reports -maxdepth 1 -name '*.json' -mmin +60 -delete

# Freigeschaltete Voll-Reports nach 7 Tagen (10080 Minuten) loeschen
0 * * * * find $HOME/bfsg-reports/full -maxdepth 1 -name '*.json' -mmin +10080 -delete
```

## Wichtig: `SITE_BASE` im E-Mail-Link

Im Node **„Build Unlock"** steht der Basis-Link aktuell auf
`https://jazz1337.github.io/inklusivdigital`.
Beim Umzug auf `https://inklusivdigital.de` diese eine Stelle im JS-Code anpassen (die Konstante `link`).

## Frontend-Env

Die Website erwartet diese Variablen (`.env`):

```
VITE_SCAN_WEBHOOK_URL=https://n8n.jazzsleeps.org/webhook/bfsg-scan
VITE_SCAN_STATUS_URL=https://n8n.jazzsleeps.org/webhook/bfsg-status
VITE_SCAN_UNLOCK_URL=https://n8n.jazzsleeps.org/webhook/bfsg-unlock
VITE_SCAN_FULL_URL=https://n8n.jazzsleeps.org/webhook/bfsg-full
```

## SSRF-Absicherung (vor voll-öffentlichem Betrieb)

Die URL-Validierung prüft nur den Hostname-String, nicht die tatsächlich aufgelöste IP — eine öffentlich aussehende Domain mit internem DNS-Eintrag käme sonst durch. Zusätzlich lief Lighthouse bislang als `root`, was für einen Browser, der fremde Seiten öffnet, ohnehin riskant ist.

**Lösung (einmalig auf dem Hetzner-/Ubuntu-Server als root ausführen):**

```bash
sudo bash server/harden-scan-egress.sh
```

Das Skript legt einen abgeschotteten Benutzer `lhscan` an, prüft dass Lighthouse als dieser läuft, sperrt per iptables **nur für lhscan** den Weg zu allen internen/privaten Adressbereichen (RFC1918, Loopback, Link-Local inkl. `169.254.169.254`, CGNAT — DNS bleibt erlaubt) und persistiert die Regeln über Reboots. Root und n8n bleiben unberührt; ein Aussperren ist praktisch ausgeschlossen.

Der `Lighthouse Scan`-Node in `bfsg-scan-v2.json` startet den Scan bereits mit `sudo -u lhscan -H lighthouse …` — nach dem Skript-Lauf greift der Schutz also automatisch. (Voraussetzung: `root` darf ohne Passwort zu `lhscan` wechseln, was standardmäßig der Fall ist.)
