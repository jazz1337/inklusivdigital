/**
 * Google Analytics 4 — wird ausschließlich nach Analytics-Consent geladen
 * (siehe consent.ts). No-op solange VITE_GA4_ID leer ist.
 */

const GA4_ID: string = import.meta.env.VITE_GA4_ID ?? "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let scriptInjected = false;

export function loadGA4(): void {
  if (!GA4_ID) return;

  // Falls zuvor per unloadGA4() deaktiviert: wieder aktivieren
  window[`ga-disable-${GA4_ID}`] = false;

  if (scriptInjected) return;
  scriptInjected = true;

  window.dataLayer = window.dataLayer ?? [];
  function gtag(..._args: unknown[]) {
    // gtag.js erwartet das echte `arguments`-Objekt, kein Array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA4_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);
}

export function unloadGA4(): void {
  if (!GA4_ID) return;
  window[`ga-disable-${GA4_ID}`] = true;
  deleteGACookies();
}

function deleteGACookies(): void {
  const gaCookieNames = document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((name) => name === "_ga" || name === "_gid" || name.startsWith("_ga_"));

  // Alle Domain-Varianten abdecken (Host, .Host, übergeordnete Domains)
  const hostParts = window.location.hostname.split(".");
  const domains = new Set<string>([""]);
  for (let i = 0; i < hostParts.length - 1; i++) {
    const domain = hostParts.slice(i).join(".");
    domains.add(domain);
    domains.add(`.${domain}`);
  }

  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  for (const name of gaCookieNames) {
    for (const domain of domains) {
      document.cookie = `${name}=; ${expiry}; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
