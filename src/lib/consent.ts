/**
 * Cookie-Consent (vanilla-cookieconsent v3) — DSGVO-konform, barrierefrei.
 *
 * - Cloudflare Web Analytics läuft cookielos und consent-frei (index.html)
 * - GA4 wird ausschließlich nach expliziter Einwilligung geladen
 * - Jede Consent-Entscheidung wird (ohne IP/User-Agent) an n8n geloggt
 */

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { loadGA4, unloadGA4 } from "./ga4";

const CONSENT_WEBHOOK_URL: string = import.meta.env.VITE_CONSENT_WEBHOOK_URL ?? "";
const CONSENT_REVISION = 1;

/** Basepath-sichere URLs für die Modal-Footer-Links (GitHub Pages: /inklusivdigital/) */
const DATENSCHUTZ_URL = `${import.meta.env.BASE_URL}datenschutz`;
const IMPRESSUM_URL = `${import.meta.env.BASE_URL}impressum`;

function logConsent(action: "first_consent" | "change"): void {
  if (!CONSENT_WEBHOOK_URL) return;
  try {
    const cookie = CookieConsent.getCookie();
    const payload = {
      consentId: cookie.consentId,
      action,
      acceptedCategories: CookieConsent.getUserPreferences().acceptedCategories,
      revision: cookie.revision,
    };
    // keepalive: Request überlebt Navigation; Fehler niemals an die UI durchreichen
    fetch(CONSENT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Logging darf die Seite nie beeinträchtigen
  }
}

function syncAnalytics(): void {
  if (CookieConsent.acceptedCategory("analytics")) {
    loadGA4();
  } else {
    unloadGA4();
  }
}

export function showCookiePreferences(): void {
  CookieConsent.showPreferences();
}

export function initConsent(): void {
  void CookieConsent.run({
    revision: CONSENT_REVISION,

    guiOptions: {
      consentModal: {
        layout: "box",
        position: "bottom right",
        // Rechtlich relevant: "Ablehnen" gleichwertig zu "Akzeptieren" gestalten
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: { readOnly: true },
      analytics: {},
    },

    onFirstConsent: () => {
      logConsent("first_consent");
    },
    onConsent: () => {
      syncAnalytics();
    },
    onChange: () => {
      syncAnalytics();
      logConsent("change");
    },

    language: {
      default: "de",
      translations: {
        de: {
          consentModal: {
            title: "Wir respektieren deine Privatsphäre",
            description:
              "Wir nutzen ein cookieloses Analyse-Tool (keine Einwilligung nötig). Zusätzlich möchten wir Google Analytics einsetzen, um die Seite zu verbessern — dafür brauchen wir deine Zustimmung.",
            acceptAllBtn: "Alle akzeptieren",
            acceptNecessaryBtn: "Nur notwendige",
            showPreferencesBtn: "Einstellungen",
            footer: `<a href="${DATENSCHUTZ_URL}">Datenschutz</a> <a href="${IMPRESSUM_URL}">Impressum</a>`,
          },
          preferencesModal: {
            title: "Cookie-Einstellungen",
            acceptAllBtn: "Alle akzeptieren",
            acceptNecessaryBtn: "Nur notwendige",
            savePreferencesBtn: "Auswahl speichern",
            closeIconLabel: "Dialog schließen",
            sections: [
              {
                title: "Notwendige Cookies",
                description:
                  "Diese Cookies sind für den Betrieb der Website erforderlich (z. B. das Speichern deiner Cookie-Auswahl). Sie benötigen keine Einwilligung.",
                linkedCategory: "necessary",
              },
              {
                title: "Analyse (Google Analytics)",
                description:
                  "Google Analytics setzt Cookies, um die Nutzung der Website auszuwerten. Wird nur mit deiner Einwilligung geladen.",
                linkedCategory: "analytics",
              },
              {
                title: "Mehr Informationen",
                description: `Details findest du in unserer <a href="${DATENSCHUTZ_URL}">Datenschutzerklärung</a>.`,
              },
            ],
          },
        },
      },
    },
  });
}
