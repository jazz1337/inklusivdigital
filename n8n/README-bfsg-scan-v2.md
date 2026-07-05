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

## E-Mail-Format

Der Node „Send Report Email" verschickt seit dem Redesign eine **HTML-E-Mail** (`emailType: 'html'`) statt reinem Text — Tabellen-Layout mit Logo, Score-Anzeige und farbigen Kennzahl-Kacheln, passend zum Dashboard-Design. Der komplette HTML-Aufbau lebt im `BUILD_UNLOCK`-Code-Node (`n8n/build.js`), **nicht** direkt in der generierten `bfsg-scan-v2.json` editieren — Änderungen immer über `node n8n/build.js` neu generieren.

Abhängigkeit: `public/logo-email.png` (verkleinerte, ~163KB-Variante von `logo.png`, via `SITE_LOGO_URL` in `build.js` referenziert) muss auf GitHub Pages live sein, damit das Logo in der E-Mail lädt. Beim Domain-Umzug auf `inklusivdigital.de` wird das automatisch mit `SITE_BASE` mitgezogen (keine separate Anpassung nötig).

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

## SSRF-Absicherung (bereits im Workflow enthalten, kein Server-Setup nötig)

Die URL-Validierung prüft nur den Hostname-String, nicht die tatsächlich aufgelöste IP — eine öffentlich aussehende Domain mit internem DNS-Eintrag käme sonst durch (SSRF via DNS-Rebinding).

**Lösung:** Der `Lighthouse Scan`-Node startet den Scan mit
`systemd-run --scope --quiet -p "IPAddressDeny=10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 169.254.0.0/16 100.64.0.0/10" lighthouse …`.
`systemd-run` (in Ubuntu eingebaut, kein Setup) kapselt den Chrome-Prozess in einen transienten Scope mit **kernelseitiger Egress-Sperre**: Verbindungen zu internen Netzen (`10.x`, `172.16.x`, `192.168.x`), Link-Local inkl. dem Cloud-Metadaten-Endpunkt `169.254.169.254` und CGNAT werden blockiert — egal, worauf ein Domainname tatsächlich auflöst. Loopback (`127.x`) bleibt frei, weil Lighthouse mit Chrome intern darüber kommuniziert.

Verifikation auf dem Server (als root):
```bash
# Öffentlicher Scan muss JSON liefern:
systemd-run --scope --quiet -p "IPAddressDeny=10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 169.254.0.0/16 100.64.0.0/10" \
  lighthouse https://example.com --only-categories=accessibility --output=json \
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" --quiet 2>/dev/null | head -c 60

# Metadaten-Endpunkt muss geblockt sein (Timeout/Fehler = gut):
systemd-run --scope --quiet -p "IPAddressDeny=169.254.0.0/16" \
  curl -m 4 -s -o /dev/null -w "%{http_code}\n" http://169.254.169.254/
```

> Hinweis: `server/harden-scan-egress.sh` (separater `lhscan`-Benutzer + iptables) wird **nicht** benötigt — auf Ubuntu 24.04 scheitert Snap-Chromium unter einem unprivilegierten Benutzer an `apparmor_restrict_unprivileged_userns`. Der `systemd-run`-Ansatz löst SSRF sauberer und ohne diese Komplikation. Falls das Skript bereits gelaufen ist: die Reste sind harmlos und können entfernt werden (`userdel -r lhscan` + die `lhscan`-iptables-Regeln).
