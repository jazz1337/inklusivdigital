import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – InklusivDigital" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Impressum
        </h1>
        <div className="mt-10">
          <iframe
            src="https://itrk.legal/1yTq.0.183d-de-iframe.html"
            title="Impressum"
            width="100%"
            style={{ border: "none", minHeight: "600px" }}
            onLoad={(e) => {
              const iframe = e.currentTarget;
              try {
                const height = iframe.contentWindow?.document.body.scrollHeight;
                if (height) iframe.style.height = `${height}px`;
              } catch {
                // cross-origin – fixed minHeight is used
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
