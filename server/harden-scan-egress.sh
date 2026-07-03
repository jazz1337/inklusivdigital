#!/usr/bin/env bash
#
# Härtet den BFSG-Scan-Server (Hetzner / Ubuntu) gegen SSRF ab.
#
# Idee: Lighthouse/Chrome läuft künftig als eigener, unprivilegierter Benutzer
# `lhscan` (nicht mehr als root). Für DIESEN Benutzer wird der Weg zu allen
# internen/privaten Adressbereichen gesperrt — root und n8n bleiben unberührt.
# Damit kann ein Angreifer den Scanner nicht mehr als Sprungbrett ins interne
# Netz oder auf den Cloud-Metadaten-Dienst (169.254.169.254) missbrauchen,
# selbst wenn er eine harmlos aussehende Domain auf eine interne IP zeigen lässt.
#
# AUSFÜHREN ALS ROOT:  sudo bash harden-scan-egress.sh
# Das Skript ist idempotent — mehrfaches Ausführen ist unschädlich.
#
set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "Bitte als root ausführen (sudo bash $0)."; exit 1
fi

echo "==> 1/5  Dedizierten Scan-Benutzer 'lhscan' anlegen"
if id lhscan &>/dev/null; then
  echo "    'lhscan' existiert bereits."
else
  # nologin-Shell: der Benutzer kann sich nirgends einloggen, nur Prozesse laufen darunter
  useradd --create-home --shell /usr/sbin/nologin lhscan
  echo "    angelegt."
fi

echo "==> 2/5  Prüfen, dass lighthouse als lhscan ausführbar ist"
if ! sudo -u lhscan -H lighthouse --version >/dev/null 2>&1; then
  echo "    FEHLER: 'lhscan' kann 'lighthouse' nicht ausführen."
  echo "    Ist Lighthouse global installiert? (npm install -g lighthouse)"
  echo "    Falls es an einem ungewöhnlichen Pfad liegt, im Workflow den vollen Pfad verwenden."
  exit 1
fi
echo "    ok ($(sudo -u lhscan -H lighthouse --version 2>/dev/null))"

echo "==> 3/5  Egress-Regeln nur für lhscan setzen"
# Regel nur hinzufügen, wenn sie noch nicht existiert (idempotent)
add() { iptables -C OUTPUT "$@" 2>/dev/null || iptables -A OUTPUT "$@"; }

# DNS zum lokalen systemd-resolved-Resolver MUSS erlaubt bleiben,
# sonst kann Chrome überhaupt keine Domain mehr auflösen.
add -m owner --uid-owner lhscan -p udp -d 127.0.0.53 --dport 53 -j ACCEPT
add -m owner --uid-owner lhscan -p tcp -d 127.0.0.53 --dport 53 -j ACCEPT

# Alle internen / reservierten Bereiche für lhscan sperren (REJECT = schnelles Scheitern)
for net in 127.0.0.0/8 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 169.254.0.0/16 100.64.0.0/10; do
  add -m owner --uid-owner lhscan -d "$net" -j REJECT
done
echo "    Regeln gesetzt."

echo "==> 4/5  Regeln über Reboots hinweg speichern"
export DEBIAN_FRONTEND=noninteractive
apt-get install -y iptables-persistent >/dev/null 2>&1 || apt-get install -y iptables-persistent
netfilter-persistent save
echo "    persistiert."

echo "==> 5/5  Funktionstest"
echo -n "    Öffentlicher Scan (example.com) sollte JSON liefern ... "
if sudo -u lhscan -H lighthouse https://example.com --only-categories=accessibility \
     --output=json --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
     --quiet --max-wait-for-load=45000 2>/dev/null | head -c 20 | grep -q '{'; then
  echo "OK"
else
  echo "FEHLGESCHLAGEN — DNS/Chrome für lhscan prüfen (evtl. nutzt der Server einen anderen DNS-Resolver)."
fi

echo -n "    Interner Zugriff (169.254.169.254) sollte BLOCKIERT sein ... "
if sudo -u lhscan -H curl -m 4 -s http://169.254.169.254/ >/dev/null 2>&1; then
  echo "WARNUNG: Zugriff war möglich — Regeln prüfen!"
else
  echo "OK (blockiert)"
fi

echo
echo "Fertig. Nächster Schritt: im n8n-Workflow den 'Lighthouse Scan'-Node so ändern,"
echo "dass der Befehl mit  sudo -u lhscan -H lighthouse ...  startet (siehe bfsg-scan-v2.json)."
