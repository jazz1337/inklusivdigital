import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              BFSG<span className="text-primary">.</span>Agentur
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Wir machen das Netz für alle zugänglich – pragmatisch, rechtssicher, ohne Floskeln.
            </p>
          </div>

          <FooterCol
            title="Leistungen"
            links={[
              { to: "/leistungen/bfsg-audit", label: "BFSG-Audit" },
              { to: "/leistungen/barrierefreier-onlineshop", label: "Barrierefreier Shop" },
              { to: "/leistungen/betreuung", label: "Laufende Betreuung" },
            ]}
          />
          <FooterCol
            title="Wissen"
            links={[
              { to: "/wissen/was-ist-bfsg", label: "Was ist das BFSG?" },
              { to: "/wissen/bin-ich-betroffen", label: "Bin ich betroffen?" },
              { to: "/wissen/faq", label: "FAQ" },
              { to: "/bfsg-check", label: "Kostenloser Check" },
            ]}
          />
          <FooterCol
            title="Rechtliches"
            links={[
              { to: "/kontakt", label: "Kontakt" },
              { to: "/impressum", label: "Impressum" },
              { to: "/datenschutz", label: "Datenschutz" },
              { to: "/barrierefreiheitserklaerung", label: "Barrierefreiheitserklärung" },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} BFSG.Agentur. Alle Rechte vorbehalten.</p>
          <p>Made with care for an inclusive web.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to as never}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
