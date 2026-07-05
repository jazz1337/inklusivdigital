/* Regenerate with: node n8n/build.js
 * (writes to the absolute path at the bottom of this file, so it works from any cwd)
 *
 * Builds n8n/bfsg-scan-v2.json — a single workflow with four webhook entrypoints:
 *   POST /webhook/bfsg-scan     -> validate, respond {reportId} immediately, scan in background
 *   POST /webhook/bfsg-status   -> {reportId} -> teaser projection (NO detail list) or pending/error
 *   POST /webhook/bfsg-unlock   -> {reportId,email} -> validate email (format+MX+disposable),
 *                                   copy full report under a secret token, email the link, capture lead
 *   POST /webhook/bfsg-full     -> {token} -> full report (detail list revealed)
 *
 * Security notes baked in:
 *   - Every value interpolated into an SSH command is either self-generated (reportId/token as
 *     hex-uuid, base64) or whitelisted to ^[0-9a-f-]{36}$ first. No raw user string reaches a shell.
 *   - The teaser status endpoint strips the findings list server-side, so the browser session that
 *     enters the email can never read it — the gate is enforced at the data layer, not visually.
 */

import fs from 'fs';

const SSH_CRED = { sshPrivateKey: { id: 'DAjiQBL7pUMlOqHe', name: 'SSH Private Key account' } };
// Bewusst im Home des SSH-Users, NICHT unter /var/www — die Report-JSONs duerfen
// niemals direkt vom Webserver ausgeliefert werden (das Gate liegt auf Datenebene).
// $HOME wird von der Remote-Shell expandiert und ist garantiert schreibbar.
const REPORTS_DIR = '$HOME/bfsg-reports';
const SITE_BASE = 'https://jazz1337.github.io/inklusivdigital'; // TODO: auf https://inklusivdigital.de umstellen beim Domain-Umzug

// CSPRNG-UUID mit Fallback: bevorzugt crypto (kryptografisch sicher), faellt aber
// nicht aus, falls die n8n-Sandbox `crypto` nicht als Global bereitstellt (wie
// zuvor bei URL beobachtet). Ergebnis matcht immer ^[0-9a-f-]{36}$.
const SECURE_ID_FN = `function secureId() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const b = new Uint8Array(16); crypto.getRandomValues(b);
      b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
      const h = []; for (let i = 0; i < 16; i++) h.push(b[i].toString(16).padStart(2, '0'));
      return h[0]+h[1]+h[2]+h[3]+'-'+h[4]+h[5]+'-'+h[6]+h[7]+'-'+h[8]+h[9]+'-'+h[10]+h[11]+h[12]+h[13]+h[14]+h[15];
    }
  } catch (e) {}
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; const v = c === 'x' ? r : (r & 0x3) | 0x8; return v.toString(16); });
}`;

// ---------- Code-Node sources ----------

const VALIDATE_SCAN = `// Validate & Normalize URL (regex-only, keine URL-Klasse -- s. bisheriger Fix)
const raw = ($json.body && $json.body.url ? String($json.body.url) : '').trim();
function fail(reason) { return [{ json: { valid: false, reason } }]; }
if (!raw) return fail('Keine URL angegeben.');
if (raw.length > 512) return fail('URL ist zu lang.');
let s = /^https?:\\/\\//i.test(raw) ? raw : 'https://' + raw;
s = s.split('#')[0].split('?')[0];
const m = s.match(/^(https?):\\/\\/([a-z0-9.-]+)(?::(\\d{1,5}))?(\\/[A-Za-z0-9\\-._~/]*)?$/i);
if (!m) return fail('Das ist keine gueltige URL oder enthaelt nicht unterstuetzte Zeichen.');
const hostname = m[2].toLowerCase();
const port = m[3];
const pathname = m[4] || '';
const isLocalName = hostname === 'localhost' || hostname.endsWith('.local') || hostname.endsWith('.internal') || hostname.endsWith('.test') || hostname.endsWith('.localhost');
const ipv4 = hostname.match(/^(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})$/);
let priv = false;
if (ipv4) {
  const a = parseInt(ipv4[1], 10), b = parseInt(ipv4[2], 10);
  priv = a === 127 || a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 169 && b === 254) || (a === 100 && b >= 64 && b <= 127) || a === 0 || a >= 224;
}
if (isLocalName || priv) return fail('Bitte gib eine oeffentlich erreichbare Website-URL an.');
const safeUrl = 'https://' + hostname + (port ? ':' + port : '') + (pathname !== '/' ? pathname : '');
const shellQuoted = "'" + safeUrl.replace(/'/g, "'\\\\''") + "'";
${SECURE_ID_FN}
return [{ json: { valid: true, url: safeUrl, urlShellQuoted: shellQuoted, reportId: secureId(), requestedAt: new Date().toISOString() } }];`;

const BUILD_PENDING = `// Pending-Marker (base64, shell-sicher) -- damit sofortiges Polling die Datei findet
const v = $json;
const doc = { status: 'pending', reportId: v.reportId, url: v.url, requestedAt: v.requestedAt };
const b64 = Buffer.from(JSON.stringify(doc), 'utf-8').toString('base64');
return [{ json: { ...v, pendingBase64: b64 } }];`;

const PARSE_LH = `// Parse Lighthouse Results
const meta = $('Validate & Normalize URL').first().json;
const MAX_FAILED = 50, MAX_TITLES = 100;
let score = null, lhFailed = [], lhPassed = [], lhManual = [], parseError = null;
try {
  const lh = JSON.parse($json.stdout || '');
  score = Math.round(lh.categories.accessibility.score * 100);
  for (const [key, audit] of Object.entries(lh.audits)) {
    if (audit.scoreDisplayMode === 'manual') lhManual.push(audit.title);
    else if (audit.score === 0) lhFailed.push({ id: key, title: audit.title, description: (audit.description || '').replace(/\\[.*?\\]\\(.*?\\)/g, '').trim() });
    else if (audit.score === 1) lhPassed.push(audit.title);
  }
  lhFailed = lhFailed.slice(0, MAX_FAILED); lhPassed = lhPassed.slice(0, MAX_TITLES); lhManual = lhManual.slice(0, MAX_TITLES);
} catch (e) { parseError = 'Der Scan konnte nicht ausgewertet werden.'; }
return [{ json: { reportId: meta.reportId, url: meta.url, requestedAt: meta.requestedAt, completedAt: new Date().toISOString(), status: parseError ? 'error' : 'done', error: parseError, score, failedCount: lhFailed.length, passedCount: lhPassed.length, manualCount: lhManual.length, lhFailed, lhPassed, lhManual } }];`;

const BUILD_FINAL = `// Finales Report-File (base64, shell-sicher) -- ueberschreibt den Pending-Marker
const r = $json;
const b64 = Buffer.from(JSON.stringify(r), 'utf-8').toString('base64');
return [{ json: { ...r, finalBase64: b64 } }];`;

const VALIDATE_ID = `// reportId strikt whitelisten, bevor sie in einen cat-Befehl geht (Command-Injection-Schutz)
const id = ($json.body && $json.body.reportId ? String($json.body.reportId) : '').trim();
if (!/^[0-9a-f-]{36}$/.test(id)) return [{ json: { ok: false, reason: 'Ungueltige Report-ID.' } }];
return [{ json: { ok: true, reportId: id } }];`;

const PROJECT_STATUS = `// Teaser-Projektion: NIEMALS die Fehlerliste ausliefern (Gate auf Datenebene)
let doc;
try { doc = JSON.parse($json.stdout || '{}'); } catch (e) { doc = { status: 'notfound' }; }
if (doc.status === 'pending') return [{ json: { status: 'pending' } }];
if (doc.status === 'error' || !doc.status) return [{ json: { status: 'error', error: doc.error || 'Scan fehlgeschlagen.' } }];
if (doc.status === 'notfound') return [{ json: { status: 'notfound' } }];
// status === 'done' -> nur Score + Zaehler, KEINE lhFailed/lhPassed/lhManual-Inhalte
return [{ json: { status: 'done', url: doc.url, score: doc.score, failedCount: doc.failedCount, passedCount: doc.passedCount, manualCount: doc.manualCount } }];`;

const DISPOSABLE = [
  'mailinator.com','guerrillamail.com','guerrillamail.info','guerrillamail.net','grr.la','sharklasers.com',
  '10minutemail.com','tempmail.com','temp-mail.org','throwaway.email','yopmail.com','trashmail.com',
  'getnada.com','dispostable.com','maildrop.cc','mailnesia.com','mytemp.email','fakeinbox.com',
  'tempinbox.com','mohmal.com','emailondeck.com','spam4.me','mailcatch.com','discard.email','tmpmail.org',
];

const VALIDATE_UNLOCK = `// Unlock-Input pruefen: reportId-Whitelist + E-Mail-Format + Wegwerf-Blockliste
const DISPOSABLE = ${JSON.stringify(DISPOSABLE)};
const id = ($json.body && $json.body.reportId ? String($json.body.reportId) : '').trim();
const email = ($json.body && $json.body.email ? String($json.body.email) : '').trim().toLowerCase();
if (!/^[0-9a-f-]{36}$/.test(id)) return [{ json: { ok: false, reason: 'Ungueltige Report-ID.' } }];
if (email.length > 254 || !/^[^\\s@]+@([^\\s@.]+\\.)+[^\\s@.]{2,}$/.test(email)) return [{ json: { ok: false, reason: 'Bitte gib eine gueltige E-Mail-Adresse ein.' } }];
const domain = email.split('@')[1];
// Domain-Zeichen strikt whitelisten -- verhindert, dass Sonderzeichen (&, ?, #, %)
// aus der Adresse in die DNS-over-HTTPS-Query (MX Lookup) geschleust werden.
if (!/^[a-z0-9.-]+$/.test(domain)) return [{ json: { ok: false, reason: 'Bitte gib eine gueltige E-Mail-Adresse ein.' } }];
if (DISPOSABLE.includes(domain)) return [{ json: { ok: false, reason: 'Wegwerf-E-Mail-Adressen sind nicht erlaubt. Bitte nutze deine geschaeftliche Adresse.' } }];
return [{ json: { ok: true, reportId: id, email, emailDomain: domain } }];`;

const CHECK_MX = `// MX-Records aus der DNS-over-HTTPS-Antwort (dns.google) auswerten
const prev = $('Validate Unlock Input').first().json;
let hasMx = false;
try { const ans = ($json.Answer || []); hasMx = ans.some((a) => a.type === 15); } catch (e) {}
return [{ json: { ...prev, hasMx } }];`;

const BUILD_UNLOCK = `// Vollreport unter geheimem Token kopieren + Mail-Inhalt + Lead-Zeile vorbereiten
const meta = $('Validate Unlock Input').first().json;
let full;
try { full = JSON.parse($json.stdout || '{}'); } catch (e) { full = {}; }
if (full.status !== 'done') return [{ json: { expired: true, email: meta.email } }];
${SECURE_ID_FN}
const token = secureId();
const fullB64 = Buffer.from(JSON.stringify(full), 'utf-8').toString('base64');
const link = '${SITE_BASE}/audit/full/' + token;
// Lead-Zeile: CSV-sicher (Kommas/Zeilenumbrueche aus den Feldern entfernt)
const clean = (s) => String(s || '').replace(/[",\\r\\n]/g, ' ');
const leadLine = [new Date().toISOString(), clean(meta.email), clean(full.url), full.score, token].join(',');
const leadB64 = Buffer.from(leadLine + '\\n', 'utf-8').toString('base64');
return [{ json: { token, fullB64, leadB64, link, email: meta.email, url: full.url, score: full.score, failedCount: full.failedCount } }];`;

const VALIDATE_TOKEN = `// Token strikt whitelisten vor dem cat-Befehl
const t = ($json.body && $json.body.token ? String($json.body.token) : '').trim();
if (!/^[0-9a-f-]{36}$/.test(t)) return [{ json: { ok: false, reason: 'Ungueltiger Token.' } }];
return [{ json: { ok: true, token: t } }];`;

const PROJECT_FULL = `// Vollreport ausliefern (Liste enthuellt) -- nur ueber gueltigen Token erreichbar
let doc;
try { doc = JSON.parse($json.stdout || '{}'); } catch (e) { doc = { status: 'notfound' }; }
if (doc.status !== 'done') return [{ json: { status: 'notfound' } }];
return [{ json: doc }];`;

// ---------- Node factory helpers ----------
let idc = 0;
const nid = () => 'n' + String(++idc).padStart(3, '0') + '-0000-4000-8000-000000000000';

function webhook(name, path, x, y) {
  return { parameters: { httpMethod: 'POST', path, responseMode: 'responseNode', options: { allowedOrigins: '*' } }, id: nid(), name, type: 'n8n-nodes-base.webhook', typeVersion: 2, position: [x, y], webhookId: path };
}
function code(name, js, x, y) {
  return { parameters: { jsCode: js }, id: nid(), name, type: 'n8n-nodes-base.code', typeVersion: 2, position: [x, y] };
}
function ssh(name, command, x, y) {
  return { parameters: { authentication: 'privateKey', command }, id: nid(), name, type: 'n8n-nodes-base.ssh', typeVersion: 1, position: [x, y], credentials: SSH_CRED };
}
function ifBool(name, expr, x, y) {
  return { parameters: { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 1 }, conditions: [{ id: 'c1', leftValue: expr, rightValue: true, operator: { type: 'boolean', operation: 'true', singleValue: true } }], combinator: 'and' }, options: {} }, id: nid(), name, type: 'n8n-nodes-base.if', typeVersion: 2.2, position: [x, y] };
}
function respond(name, code, body, x, y) {
  const p = { respondWith: 'json', responseBody: body, options: {} };
  if (code) p.responseCode = code;
  return { parameters: p, id: nid(), name, type: 'n8n-nodes-base.respondToWebhook', typeVersion: 1.1, position: [x, y] };
}
function httpGet(name, url, x, y) {
  return { parameters: { url, options: {} }, id: nid(), name, type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: [x, y] };
}
function gmail(name, to, subject, message, x, y) {
  return { parameters: { sendTo: to, subject, message, options: {} }, id: nid(), name, type: 'n8n-nodes-base.gmail', typeVersion: 2, position: [x, y], webhookId: 'gmail-' + nid(), credentials: { gmailOAuth2: { id: 'REPLACE_WITH_YOUR_GMAIL_CREDENTIAL', name: 'Gmail account' } } };
}

const nodes = [];
const connections = {};
function connect(from, to, outIndex = 0) {
  connections[from] = connections[from] || { main: [] };
  while (connections[from].main.length <= outIndex) connections[from].main.push([]);
  connections[from].main[outIndex].push({ node: to, type: 'main', index: 0 });
}

// ===== FLOW 1: SCAN (immediate reportId response + background scan) =====
nodes.push(webhook('Scan Webhook', 'bfsg-scan', 0, 0));
nodes.push(code('Validate & Normalize URL', VALIDATE_SCAN, 220, 0));
nodes.push(ifBool('URL gueltig?', '={{ $json.valid }}', 440, 0));
nodes.push(respond('Fehler (ungueltige URL)', 400, '={{ { success: false, error: $json.reason } }}', 660, 160));
nodes.push(code('Build Pending', BUILD_PENDING, 660, -80));
nodes.push(ssh('Write Pending Marker', "={{ 'mkdir -p " + REPORTS_DIR + " && echo ' + $json.pendingBase64 + ' | base64 -d > " + REPORTS_DIR + "/' + $json.reportId + '.json' }}", 880, -80));
// WICHTIG: $json ist hier die Ausgabe des SSH-Nodes "Write Pending Marker"
// (nur {stdout, stderr, exitCode}) -- reportId/url muessen explizit vom
// Node davor ("Build Pending") geholt werden, sonst liefert die Sofort-
// antwort nur {success:true} ohne reportId und das Frontend bricht ab.
nodes.push(respond('Antwort reportId', 0, "={{ { success: true, reportId: $('Build Pending').first().json.reportId, url: $('Build Pending').first().json.url } }}", 1100, -80));
// SSRF-Schutz ohne Server-Setup: systemd-run kapselt den Lighthouse-/Chrome-Prozess
// in einen transienten Scope mit kernelseitiger Egress-Sperre (IPAddressDeny). Damit
// kann die gescannte Seite den Server nicht als Sprungbrett ins interne Netz oder auf
// den Cloud-Metadaten-Endpunkt (169.254.169.254) missbrauchen. Loopback bleibt frei,
// weil Lighthouse mit Chrome intern über 127.0.0.1 kommuniziert.
nodes.push(ssh('Lighthouse Scan', "={{ 'systemd-run --scope --quiet -p \"IPAddressDeny=10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 169.254.0.0/16 100.64.0.0/10\" lighthouse ' + $('Build Pending').first().json.urlShellQuoted + ' --only-categories=accessibility --output=json --chrome-flags=\"--headless --no-sandbox --disable-dev-shm-usage\" --quiet --max-wait-for-load=45000 2>/dev/null' }}", 1320, -80));
nodes.push(code('Parse Lighthouse Results', PARSE_LH, 1540, -80));
nodes.push(code('Build Final', BUILD_FINAL, 1760, -80));
nodes.push(ssh('Write Final Report', "={{ 'echo ' + $json.finalBase64 + ' | base64 -d > " + REPORTS_DIR + "/' + $json.reportId + '.json' }}", 1980, -80));
connect('Scan Webhook', 'Validate & Normalize URL');
connect('Validate & Normalize URL', 'URL gueltig?');
connect('URL gueltig?', 'Build Pending', 0);
connect('URL gueltig?', 'Fehler (ungueltige URL)', 1);
connect('Build Pending', 'Write Pending Marker');
connect('Write Pending Marker', 'Antwort reportId');
connect('Antwort reportId', 'Lighthouse Scan');
connect('Lighthouse Scan', 'Parse Lighthouse Results');
connect('Parse Lighthouse Results', 'Build Final');
connect('Build Final', 'Write Final Report');

// ===== FLOW 2: STATUS (teaser projection) =====
nodes.push(webhook('Status Webhook', 'bfsg-status', 0, 500));
nodes.push(code('Validate reportId', VALIDATE_ID, 220, 500));
nodes.push(ifBool('reportId ok?', '={{ $json.ok }}', 440, 500));
nodes.push(respond('Fehler (Status-ID)', 400, '={{ { status: "error", error: $json.reason } }}', 660, 640));
nodes.push(ssh('Read Report', "={{ 'cat " + REPORTS_DIR + "/' + $json.reportId + '.json 2>/dev/null || echo \\'{\\\"status\\\":\\\"notfound\\\"}\\'' }}", 660, 460));
nodes.push(code('Project Status', PROJECT_STATUS, 880, 460));
nodes.push(respond('Antwort Status', 0, '={{ $json }}', 1100, 460));
connect('Status Webhook', 'Validate reportId');
connect('Validate reportId', 'reportId ok?');
connect('reportId ok?', 'Read Report', 0);
connect('reportId ok?', 'Fehler (Status-ID)', 1);
connect('Read Report', 'Project Status');
connect('Project Status', 'Antwort Status');

// ===== FLOW 3: UNLOCK (email gate) =====
nodes.push(webhook('Unlock Webhook', 'bfsg-unlock', 0, 1000));
nodes.push(code('Validate Unlock Input', VALIDATE_UNLOCK, 220, 1000));
nodes.push(ifBool('Unlock-Input ok?', '={{ $json.ok }}', 440, 1000));
nodes.push(respond('Fehler (Unlock-Input)', 400, '={{ { success: false, error: $json.reason } }}', 660, 1160));
nodes.push(httpGet('MX Lookup (DoH)', "=https://dns.google/resolve?name={{ $json.emailDomain }}&type=MX", 660, 1000));
nodes.push(code('Check MX', CHECK_MX, 880, 1000));
nodes.push(ifBool('MX vorhanden?', '={{ $json.hasMx }}', 1100, 1000));
nodes.push(respond('Fehler (kein MX)', 400, '={{ { success: false, error: "Fuer diese E-Mail-Domain existiert kein Mailserver. Bitte pruefe die Adresse." } }}', 1320, 1160));
nodes.push(ssh('Read Full For Unlock', "={{ 'cat " + REPORTS_DIR + "/' + $('Validate Unlock Input').first().json.reportId + '.json 2>/dev/null || echo \\'{}\\'' }}", 1320, 1000));
nodes.push(code('Build Unlock', BUILD_UNLOCK, 1540, 1000));
nodes.push(ifBool('Report noch da?', '={{ !$json.expired }}', 1760, 1000));
nodes.push(respond('Fehler (Report abgelaufen)', 410, '={{ { success: false, error: "Dieser Schnelltest ist abgelaufen. Bitte starte einen neuen Scan." } }}', 1980, 1160));
nodes.push(ssh('Write Full Copy', "={{ 'mkdir -p " + REPORTS_DIR + "/full && echo ' + $json.fullB64 + ' | base64 -d > " + REPORTS_DIR + "/full/' + $json.token + '.json && echo ' + $json.leadB64 + ' | base64 -d >> " + REPORTS_DIR + "/leads.csv' }}", 1980, 1000));
nodes.push(gmail('Send Report Email', "={{ $('Build Unlock').first().json.email }}", "={{ 'Dein BFSG-Barrierefreiheits-Bericht fuer ' + $('Build Unlock').first().json.url }}", "={{ 'Hallo,\\n\\ndein vollstaendiger BFSG-Schnelltest-Bericht ist fertig.\\n\\nErgebnis: ' + $('Build Unlock').first().json.score + '/100 (' + $('Build Unlock').first().json.failedCount + ' kritische Punkte)\\nGeprueft: ' + $('Build Unlock').first().json.url + '\\n\\nHier siehst du den vollstaendigen Bericht inklusive aller gefundenen Barrieren (Link 7 Tage gueltig):\\n' + $('Build Unlock').first().json.link + '\\n\\nDu willst die Fehler professionell beheben lassen? Antworte einfach auf diese Mail.\\n\\nBeste Gruesse\\nDein InklusivDigital-Team' }}", 2200, 1000));
nodes.push(respond('Antwort Unlock', 0, '={{ { success: true } }}', 2420, 1000));
connect('Unlock Webhook', 'Validate Unlock Input');
connect('Validate Unlock Input', 'Unlock-Input ok?');
connect('Unlock-Input ok?', 'MX Lookup (DoH)', 0);
connect('Unlock-Input ok?', 'Fehler (Unlock-Input)', 1);
connect('MX Lookup (DoH)', 'Check MX');
connect('Check MX', 'MX vorhanden?');
connect('MX vorhanden?', 'Read Full For Unlock', 0);
connect('MX vorhanden?', 'Fehler (kein MX)', 1);
connect('Read Full For Unlock', 'Build Unlock');
connect('Build Unlock', 'Report noch da?');
connect('Report noch da?', 'Write Full Copy', 0);
connect('Report noch da?', 'Fehler (Report abgelaufen)', 1);
connect('Write Full Copy', 'Send Report Email');
connect('Send Report Email', 'Antwort Unlock');

// ===== FLOW 4: FULL (token-gated) =====
nodes.push(webhook('Full Webhook', 'bfsg-full', 0, 1600));
nodes.push(code('Validate Token', VALIDATE_TOKEN, 220, 1600));
nodes.push(ifBool('Token ok?', '={{ $json.ok }}', 440, 1600));
nodes.push(respond('Fehler (Token)', 400, '={{ { status: "notfound" } }}', 660, 1740));
nodes.push(ssh('Read Full', "={{ 'cat " + REPORTS_DIR + "/full/' + $json.token + '.json 2>/dev/null || echo \\'{\\\"status\\\":\\\"notfound\\\"}\\'' }}", 660, 1560));
nodes.push(code('Project Full', PROJECT_FULL, 880, 1560));
nodes.push(respond('Antwort Full', 0, '={{ $json }}', 1100, 1560));
connect('Full Webhook', 'Validate Token');
connect('Validate Token', 'Token ok?');
connect('Token ok?', 'Read Full', 0);
connect('Token ok?', 'Fehler (Token)', 1);
connect('Read Full', 'Project Full');
connect('Project Full', 'Antwort Full');

const wf = {
  name: 'BFSG-Schnelltest — Scan, Status, Unlock, Full',
  nodes,
  connections,
  settings: { executionOrder: 'v1' },
  pinData: {},
};

fs.writeFileSync('/home/user/inklusivdigital/n8n/bfsg-scan-v2.json', JSON.stringify(wf, null, 2) + '\n', 'utf8');
console.log('Wrote bfsg-scan-v2.json with', nodes.length, 'nodes');
