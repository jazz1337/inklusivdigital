import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle2, Send, Loader2, AlertCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const WEBHOOK_URL =
  "https://n8n.jazzsleeps.org/webhook/4ead0250-670f-4039-982a-06a7dac14421";

const schema = z.object({
  firmenname: z.string().min(1, "Pflichtfeld"),
  websiteUrl: z
    .string()
    .url("Bitte eine gültige URL eingeben (z. B. https://ihre-seite.de)"),
  branche: z.string().min(1, "Pflichtfeld"),
  mitarbeiterzahl: z.enum(["1–9", "10–49", "50–249", "250+"], {
    errorMap: () => ({ message: "Bitte eine Option wählen" }),
  }),
  name: z.string().min(1, "Pflichtfeld"),
  email: z.string().email("Bitte eine gültige E-Mail-Adresse eingeben"),
  telefon: z.string().optional(),
  wunsch: z.enum(
    [
      "Erstanalyse",
      "Vollständiger Audit",
      "Barrierefreiheitserklärung",
      "Allgemeine Beratung",
    ],
    { errorMap: () => ({ message: "Bitte eine Option wählen" }) },
  ),
  kommentar: z.string().optional(),
  datenschutz: z
    .boolean()
    .refine((v) => v === true, {
      message: "Bitte akzeptieren Sie die Datenschutzerklärung",
    }),
});

type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – InklusivDigital" },
      {
        name: "description",
        content:
          "Kontaktieren Sie uns für ein kostenloses Erstgespräch über Ihre BFSG-Konformität.",
      },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firmenname: "",
      websiteUrl: "",
      branche: "",
      name: "",
      email: "",
      telefon: "",
      kommentar: "",
      datenschutz: false,
    },
  });

  async function onSubmit(data: FormData) {
    setStatus("submitting");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" aria-hidden />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Vielen Dank!
          </h1>
          <p className="mt-4 text-muted-foreground">
            Ihre Anfrage ist bei uns eingegangen. Wir melden uns in der Regel
            innerhalb von 24 Stunden bei Ihnen.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            Weitere Anfrage senden
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-[image:var(--gradient-hero)]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6 md:py-20">
          <p className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Kontakt
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Sprechen wir über Ihr Projekt
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Füllen Sie das Formular aus – wir melden uns innerhalb von 24 Stunden
            für ein unverbindliches Erstgespräch.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10"
              noValidate
            >
              {/* Unternehmen */}
              <fieldset className="space-y-5">
                <legend className="font-display text-xl font-bold text-foreground">
                  Über das Unternehmen
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firmenname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Firmenname <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Muster GmbH" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Website-URL <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://ihre-website.de"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="branche"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Branche / Art des Online-Shops <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="z. B. Mode, Elektronik, Beratung"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mitarbeiterzahl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Mitarbeiterzahl <RequiredMark />
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen…" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1–9">1–9</SelectItem>
                            <SelectItem value="10–49">10–49</SelectItem>
                            <SelectItem value="50–249">50–249</SelectItem>
                            <SelectItem value="250+">250+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </fieldset>

              <hr className="border-border" />

              {/* Kontaktperson */}
              <fieldset className="space-y-5">
                <legend className="font-display text-xl font-bold text-foreground">
                  Kontaktperson
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Max Mustermann" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          E-Mail <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="max@muster.de"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="telefon"
                  render={({ field }) => (
                    <FormItem className="sm:max-w-xs">
                      <FormLabel>
                        Telefon{" "}
                        <span className="font-normal text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+49 123 456789"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>

              <hr className="border-border" />

              {/* Projekt */}
              <fieldset className="space-y-5">
                <legend className="font-display text-xl font-bold text-foreground">
                  Zum Projekt
                </legend>
                <FormField
                  control={form.control}
                  name="wunsch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Was wird gewünscht? <RequiredMark />
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bitte wählen…" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Erstanalyse">Erstanalyse</SelectItem>
                          <SelectItem value="Vollständiger Audit">
                            Vollständiger Audit
                          </SelectItem>
                          <SelectItem value="Barrierefreiheitserklärung">
                            Barrierefreiheitserklärung
                          </SelectItem>
                          <SelectItem value="Allgemeine Beratung">
                            Allgemeine Beratung
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kommentar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kommentar{" "}
                        <span className="font-normal text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Beschreiben Sie Ihr Anliegen kurz…"
                          className="min-h-32 resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>

              <hr className="border-border" />

              {/* Datenschutz */}
              <FormField
                control={form.control}
                name="datenschutz"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-xl border border-border bg-surface p-4">
                    <FormControl>
                      <Checkbox
                        id="datenschutz"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div>
                      <FormLabel
                        htmlFor="datenschutz"
                        className="cursor-pointer font-normal leading-relaxed"
                      >
                        Ich habe die{" "}
                        <Link
                          to={"/datenschutz" as never}
                          className="text-primary underline underline-offset-2 hover:text-primary/80"
                        >
                          Datenschutzerklärung
                        </Link>{" "}
                        gelesen und akzeptiere sie.{" "}
                        <RequiredMark />
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                  <p>
                    Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie
                    es erneut oder schreiben Sie uns direkt per E-Mail.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={status === "submitting"}
                className="h-14 w-full text-base font-semibold"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
                    Wird gesendet…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" aria-hidden />
                    Anfrage absenden
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                <RequiredMark /> Pflichtfelder
              </p>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}

function RequiredMark() {
  return (
    <span aria-hidden className="text-destructive">
      *
    </span>
  );
}
