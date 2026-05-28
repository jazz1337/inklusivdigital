import{j as e,r as m}from"./index-CSnGJI9g.js";import{P as x}from"./PageHero-B0kVq8lr.js";import{S as n,a as i,C as h}from"./CTAButton-B7iY51oZ.js";import{C as u}from"./circle-check-Ce6HmMWe.js";import{C as b}from"./circle-x-Dr6ByEjP.js";import{K as g}from"./keyboard-DCmDlM9Y.js";function w(){return e.jsxs(e.Fragment,{children:[e.jsx(x,{eyebrow:"Guides & Praxis",title:"Tastatur-Navigation",intro:"Über 7 % der Internetnutzer verwenden keine Maus. Vollständige Tastaturnavigation ist Pflicht nach WCAG 2.1 (Kriterium 2.1.1). Jede Funktion muss per Tastatur erreichbar und bedienbar sein."}),e.jsxs(n,{children:[e.jsx(i,{eyebrow:"Interaktive Demo",title:"Mit und ohne sichtbaren Fokus",intro:"Drücke Tab, um durch die Elemente zu navigieren. Der Unterschied zwischen gutem und schlechtem Fokus-Management ist sofort spürbar."}),e.jsxs("div",{className:"mt-10 grid gap-6 md:grid-cols-2",children:[e.jsx(c,{variant:"bad"}),e.jsx(c,{variant:"good"})]})]}),e.jsxs(n,{tone:"surface",children:[e.jsx(i,{eyebrow:"Die Regeln",title:"Was Tastaturnavigation erfordert"}),e.jsx("div",{className:"mt-10 space-y-4",children:p.map(s=>e.jsx(f,{...s},s.criterion))})]}),e.jsxs(n,{children:[e.jsx(i,{eyebrow:"Code",title:"Fokus-Stile implementieren",align:"center"}),e.jsxs("div",{className:"mt-10 grid gap-6 md:grid-cols-2",children:[e.jsx(a,{label:"Schlechtes Beispiel – Fokus versteckt",variant:"bad",code:`/* Häufigster Fehler in der Praxis */
* {
  outline: none; /* NIEMALS so! */
}

button:focus {
  outline: 0; /* Ebenfalls verboten */
}`}),e.jsx(a,{label:"Gutes Beispiel – sichtbarer Fokus",variant:"good",code:`/* Fokus-Ring mit ausreichend Kontrast */
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Für Screenreader: Fokus nur bei Tastatur */
:focus:not(:focus-visible) {
  outline: none;
}`})]}),e.jsxs("div",{className:"mt-6 grid gap-6 md:grid-cols-2",children:[e.jsx(a,{label:"Skip-Link implementieren",variant:"good",code:`<!-- Erster Link auf der Seite -->
<a
  href="#main-content"
  class="skip-link"
>
  Zum Hauptinhalt springen
</a>

<style>
.skip-link {
  position: absolute;
  transform: translateY(-100%);
}
.skip-link:focus {
  transform: translateY(0);
}
</style>`}),e.jsx(a,{label:"Fokus-Falle vermeiden (Modal)",variant:"good",code:`// Fokus im Modal halten
const focusable = modal.querySelectorAll(
  'button, [href], input, select, textarea,
   [tabindex]:not([tabindex="-1"])'
);
const first = focusable[0];
const last = focusable[focusable.length - 1];

last.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && !e.shiftKey) {
    e.preventDefault();
    first.focus();
  }
});`})]})]}),e.jsxs(n,{tone:"surface",children:[e.jsx(i,{eyebrow:"Checkliste",title:"Vor dem Veröffentlichen prüfen",align:"center"}),e.jsx("ul",{className:"mx-auto mt-8 max-w-xl space-y-3",children:k.map(s=>e.jsxs("li",{className:"flex items-start gap-3 text-sm text-muted-foreground",children:[e.jsx(u,{className:"mt-0.5 h-4 w-4 shrink-0 text-success","aria-hidden":!0}),s]},s))}),e.jsx("div",{className:"mt-10 text-center",children:e.jsx(h,{to:"/kontakt",variant:"secondary",children:"Tastatur-Audit anfragen"})})]})]})}function c({variant:s}){const[t,r]=m.useState(null),o=["Navigation","Hauptinhalt","Suche","Kontakt"];return e.jsxs("div",{className:`rounded-2xl border p-5 ${s==="good"?"border-success/30 bg-success/5":"border-destructive/30 bg-destructive/5"}`,children:[e.jsxs("div",{className:"mb-4 flex items-center gap-2",children:[s==="good"?e.jsx(u,{className:"h-4 w-4 text-success","aria-hidden":!0}):e.jsx(b,{className:"h-4 w-4 text-destructive","aria-hidden":!0}),e.jsx("span",{className:`text-sm font-semibold ${s==="good"?"text-success":"text-destructive"}`,children:s==="good"?"Sichtbarer Fokus-Ring":"Kein Fokus-Ring (outline: none)"})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:o.map((l,d)=>e.jsx("button",{onFocus:()=>r(d),onBlur:()=>r(null),className:`rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition ${s==="good"?"focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2":"focus:outline-none"} ${t===d&&s==="bad"?"bg-muted":""}`,children:l},l))}),e.jsxs("p",{className:"mt-3 flex items-center gap-1.5 text-xs text-muted-foreground",children:[e.jsx(g,{className:"h-3.5 w-3.5","aria-hidden":!0}),"Drücke Tab zum Testen"]})]})}function f({criterion:s,title:t,description:r,level:o}){return e.jsxs("div",{className:"flex items-start gap-4 rounded-2xl border border-border bg-card p-5",children:[e.jsx("div",{className:"shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary",children:s}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("h3",{className:"font-display text-base font-bold text-foreground",children:t}),e.jsx("span",{className:"rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground",children:o})]}),e.jsx("p",{className:"mt-1 text-sm text-muted-foreground",children:r})]})]})}function a({label:s,variant:t,code:r}){return e.jsxs("div",{className:`rounded-2xl border p-5 ${t==="good"?"border-success/30":"border-destructive/30"}`,children:[e.jsx("span",{className:`mb-3 block text-xs font-semibold uppercase tracking-wider ${t==="good"?"text-success":"text-destructive"}`,children:s}),e.jsx("pre",{className:"overflow-x-auto rounded-lg bg-muted/50 p-4 text-xs leading-relaxed text-foreground",children:e.jsx("code",{children:r})})]})}const p=[{criterion:"2.1.1",title:"Tastatur",level:"Level A",description:"Alle Funktionalitäten müssen per Tastatur bedienbar sein. Keine Ausnahmen für zeitbasierte Pfadkurven."},{criterion:"2.1.2",title:"Keine Tastaturfalle",level:"Level A",description:"Nutzer dürfen nicht in einem Element gefangen werden. Modals müssen mit Escape schließbar sein."},{criterion:"2.4.3",title:"Fokus-Reihenfolge",level:"Level A",description:"Die Tab-Reihenfolge muss der visuellen und logischen Reihenfolge entsprechen."},{criterion:"2.4.7",title:"Sichtbarer Fokus",level:"Level AA",description:"Jedes per Tastatur fokussierbare Element muss einen sichtbaren Fokus-Indikator haben."}],k=["Alle Links, Buttons und Formularfelder sind per Tab erreichbar.","Der Fokus-Ring ist deutlich sichtbar (mind. 3:1 Kontrast zum Hintergrund).","outline: none wird nirgends global gesetzt.",'Ein Skip-Link "Zum Hauptinhalt" ist der erste Link der Seite.',"Modals und Dialoge halten den Fokus innerhalb und schließen mit Escape.","Die Tab-Reihenfolge entspricht der visuellen Lesereihenfolge.","Dropdown-Menüs sind mit Pfeil-Tasten steuerbar."];export{w as component};
