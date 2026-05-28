import { Outlet, Link, createRootRoute, HeadContent } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">404</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">Seite nicht gefunden</h1>
          <p className="mt-3 text-muted-foreground">
            Die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BFSG.Agentur – Barrierefreie Websites & Onlineshops" },
      {
        name: "description",
        content:
          "Wir machen deine Website BFSG-konform: Audit, Umsetzung und laufende Betreuung. Pragmatisch, rechtssicher, ohne Floskeln.",
      },
      { name: "author", content: "BFSG.Agentur" },
      { property: "og:title", content: "BFSG.Agentur – Barrierefreie Websites & Onlineshops" },
      { property: "og:description", content: "Audit, Umsetzung und laufende Betreuung für BFSG-Konformität." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </>
  );
}
