import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type DropdownItem = { to: string; label: string; description?: string };
type NavItem =
  | { type: "link"; to: string; label: string }
  | { type: "dropdown"; label: string; items: DropdownItem[] };

const NAV: NavItem[] = [
  {
    type: "dropdown",
    label: "Leistungen",
    items: [
      { to: "/leistungen/bfsg-audit", label: "BFSG-Audit & Analyse", description: "Vollständige Prüfung deiner Website" },
      { to: "/leistungen/barrierefreier-onlineshop", label: "Barrierefreier Onlineshop", description: "Rechtssicher verkaufen" },
      { to: "/leistungen/betreuung", label: "Laufende Betreuung", description: "Dauerhaft konform bleiben" },
    ],
  },
  {
    type: "dropdown",
    label: "BFSG-Wissen",
    items: [
      { to: "/wissen/was-ist-bfsg", label: "Was ist das BFSG?", description: "Gesetz & Hintergründe" },
      { to: "/wissen/bin-ich-betroffen", label: "Bin ich betroffen?", description: "Schnelle Einordnung" },
      { to: "/wissen/faq", label: "FAQ", description: "Häufige Fragen" },
    ],
  },
  {
    type: "dropdown",
    label: "Guides & Praxis",
    items: [
      { to: "/guides/alttexte", label: "Alt-Texte schreiben", description: "Bilder für alle verständlich machen" },
      { to: "/guides/tastatur-navigation", label: "Tastatur-Navigation", description: "Volle Bedienbarkeit ohne Maus" },
      { to: "/guides/kontrast", label: "Kontrast & Lesbarkeit", description: "WCAG-Anforderungen verstehen" },
      { to: "/recht/widerrufsbutton", label: "Widerrufsbutton §312j BGB", description: "Pflichtbutton für Online-Shops" },
    ],
  },
  { type: "link", to: "/ueber-uns", label: "Über uns" },
];

// Kurze Verzögerung beim Schließen verhindert, dass eine ungenaue Mausbewegung
// zwischen Button und Panel (der kleine Abstand durch "mt-1") das Dropdown
// vorzeitig zuklappt, bevor der Cursor das Panel erreicht hat.
const CLOSE_DELAY_MS = 150;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const openNow = (label: string) => {
    cancelScheduledClose();
    setOpenDropdown(label);
  };
  const scheduleClose = () => {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), CLOSE_DELAY_MS);
  };
  const closeNow = () => {
    cancelScheduledClose();
    setOpenDropdown(null);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeNow();
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeNow();
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
      cancelScheduledClose();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <a href="#main" className="skip-link">Zum Inhalt springen</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" aria-label="InklusivDigital – Startseite">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="InklusivDigital"
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav ref={dropdownRef} className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {NAV.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {item.label}
              </Link>
            ) : (
              <DesktopDropdown
                key={item.label}
                item={item}
                isOpen={openDropdown === item.label}
                onOpen={() => openNow(item.label)}
                onScheduleClose={scheduleClose}
                onCancelScheduledClose={cancelScheduledClose}
                onToggleViaKeyboard={() =>
                  openDropdown === item.label ? closeNow() : openNow(item.label)
                }
              />
            ),
          )}
          <Link
            to="/bfsg-check"
            className="ml-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90 hover:shadow-[var(--shadow-glow)]"
          >
            Kostenloser BFSG-Check
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4" aria-label="Mobile Navigation">
            {NAV.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <MobileGroup key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
              ),
            )}
            <Link
              to="/bfsg-check"
              className="mt-3 block rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Kostenloser BFSG-Check
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function DesktopDropdown({
  item,
  isOpen,
  onOpen,
  onScheduleClose,
  onCancelScheduledClose,
  onToggleViaKeyboard,
}: {
  item: Extract<NavItem, { type: "dropdown" }>;
  isOpen: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onCancelScheduledClose: () => void;
  onToggleViaKeyboard: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onScheduleClose}>
      <button
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground",
          isOpen && "bg-secondary text-foreground",
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(e) => {
          // event.detail ist 0 bei per Tastatur (Enter/Leertaste) ausgelösten Klicks,
          // sonst die Klickanzahl. So kann Tastatur-Bedienung das Menü toggeln, ohne
          // dass ein echter Mausklick ein per Hover bereits geöffnetes Menü sofort
          // wieder zuklappt.
          if (e.detail === 0) onToggleViaKeyboard();
          else onOpen();
        }}
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 w-80 overflow-hidden rounded-xl border border-border bg-popover p-2 shadow-[var(--shadow-card)]"
          onMouseEnter={onCancelScheduledClose}
          onMouseLeave={onScheduleClose}
        >
          {item.items.map((sub) => (
            <Link
              key={sub.to}
              to={sub.to}
              role="menuitem"
              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary"
              onClick={onScheduleClose}
            >
              <div className="font-semibold text-foreground">{sub.label}</div>
              {sub.description && (
                <div className="mt-0.5 text-sm text-muted-foreground">{sub.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileGroup({
  item,
  onNavigate,
}: {
  item: Extract<NavItem, { type: "dropdown" }>;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div className="ml-2 mt-1 space-y-1 border-l border-border pl-3">
          {item.items.map((sub) => (
            <Link
              key={sub.to}
              to={sub.to}
              className="block rounded-md px-3 py-2 text-sm text-foreground/85 hover:bg-secondary"
              onClick={onNavigate}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
