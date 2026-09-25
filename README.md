# BALANS AI — Interactive Executive Presentation

**BUTUN BIZNESINGIZ — BITTA PLATFORMADA.**
*Buxgalteriya, savdo, ombor, ishlab chiqarish va AI — yagona aqlli tizimda.*

A 20-slide, keyboard-driven executive pitch deck built as a web application:
dark liquid-glass interface, animated data flows, an interactive product
preview, and full UZ / RU / EN content parity.

It is not a scrolling marketing page — it behaves like a keynote: one slide at
a time, with a slide counter, progress rail, menu and overview.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173  (binds 0.0.0.0)
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Requirements: Node 18+.

---

## Presentation controls

| Control | How |
| --- | --- |
| Next / previous slide | `→` `←`, `Space`, `PageUp/PageDown`, `Home/End`, mouse wheel, trackpad, swipe (touch), or the bar at the bottom |
| Jump to a slide | Click a tick on the progress rail, or open the menu (`M`) |
| Menu | `M` or the menu button — full slide index, language, motion, fullscreen, exit |
| Overview | `O` (or `Esc`) — the whole deck on one screen with live slide miniatures |
| Fullscreen | `F` or the fullscreen button |
| Motion on/off | The pause button in the top bar (also honours the OS "reduce motion" setting) |
| Language | `UZ` / `RU` / `EN` segment in the top bar |
| Exit presentation | Menu → *Taqdimotdan chiqish* (leaves fullscreen and returns to the overview) |

No audio is used anywhere in the deck, so nothing autoplays sound.
Deep links work: `#s7` opens slide 7.

---

## Deck structure

| # | Slide | Business question it answers |
| --- | --- | --- |
| 01 | Hero — one platform | What is Balans AI? |
| 02 | Fragmented data | What problem exists, and why does it matter? |
| 03 | The solution — one data layer | What is the answer? |
| 04 | How the business works (sale / purchase / production) | How does it work? |
| 05 | Product ecosystem (8 module cards) | What exactly can it manage? |
| 06 | Role-based control | Who sees what? |
| 07 | AI CFO (fact / estimate / recommendation) | How does AI help? |
| 08 | Command center | How does a leader see the whole business? |
| 09 | Manufacturing & costing | What about factories? |
| 10 | Market positioning matrix | Why is it different? |
| 11 | Six principles | Why Balans AI? |
| 12 | Security & trust | How is company information protected? |
| 13 | Business model & pricing | How does the subscription work? |
| 14 | Roadmap (4 phases) | What comes next? |
| 15 | Business value | What result does the business get? |
| 16 | Ideal customer & growth path | Who is it for? |
| 17 | Interactive product preview | What does the product actually look like? |
| 18 | CEO scenario, 08:30 | What does a normal day look like? |
| 19 | Investor / partner view | Can it scale? |
| 20 | Closing & call to action | What should we do next? |

---

## Honesty rules built into the content (please keep them)

This deck is written to be defensible in front of owners, CFOs and investors.

* Every number on every slide is **demo data**, labelled `DEMO MA'LUMOT` /
  `DEMO DATA`, and never presented as a real company's results.
* The competitor matrix describes **publicly documented capabilities** of each
  product category. `—` means *we hold no verified information*, never
  "they cannot do this". No product is disparaged.
* Balans AI's own column is split into **live / planned** — the roadmap is a
  plan, not a claim of shipped functionality.
* Payment providers (Payme, Click, Uzum) are shown as **integration planned**;
  bank transfer as **manual**. Nothing implies a live payment integration.
* Security wording avoids "100% secure" and mentions no certifications.
  It describes architectural approaches only.
* No guaranteed percentages ("10×", "50% savings") appear anywhere. Slide 15
  uses qualitative outcomes and says so.

If the underlying product status changes, update the relevant strings in
`src/i18n/*.ts` — the three languages are typed against the same model, so
TypeScript will fail the build if a translation goes missing.

---

## Contact / call to action

`START FREE` and `REQUEST DEMO` open a dialog that lists the configured contact
channels. Fill them in `src/config.ts`:

```ts
export const CONTACT = {
  email: 'sales@example.com',
  phone: '+998 ...',
  telegram: 'handle',
  site: 'https://...',
}
```

While a channel is empty the UI states plainly that contacts are not configured
yet — the deck never renders a dead link or a fake form.

---

## Project structure

```
src/
  main.tsx                 entry, self-hosted fonts, styles
  App.tsx
  config.ts                contact channels for the CTA
  i18n/
    types.ts               the whole content model (single source of truth)
    uz.ts / ru.ts / en.ts  full translations
    index.ts               dictionary, language storage
  deck/
    DeckContext.tsx        what every slide can read (content, nav, motion…)
    slides.ts              slide registry: id, menu label, description
    useFullscreen.ts
    usePrefersReducedMotion.ts
  components/
    Backdrop.tsx           ambient gradient + particle field (canvas)
    Primitives.tsx         Reveal, Num (count-up), Chip, Metric, Panel…
    LogoMark.tsx
    ModuleGlyph.tsx        module → icon mapping
    charts/Charts.tsx      AreaChart, ColumnChart, Sparkline, ShareBar (SVG)
    deck/                  Deck controller, Chrome, SlideMenu, Overview,
                           CtaDialog, Preloader
  styles/
    tokens.css             design tokens
    app.css                base, layout, glass UI, deck chrome
    slides.css             slide-level visual language
  slides/                  Slide01…Slide20 + index.ts registry
```

Adding or reordering a slide means touching two files: `src/deck/slides.ts`
(order, menu labels) and `src/slides/index.ts` (component order). Both are
asserted in sync by the deck.

---

## Visual system

* Dark presentation mode only; no light theme to break.
* Palette: deep navy backgrounds, blue/cyan accent, one violet secondary.
* Liquid-glass panels (`backdrop-filter`), 1px hairline borders, soft shadows.
* Fluid type scale via `clamp()` — no fixed pixel sizes for text.
* Responsive: desktop 16:9 keynote, tablet adaptive grids, single column on
  phones with no horizontal overflow and tap targets kept large.
* Motion: 200–600 ms fades, slides, blur-in reveals, number counting, chart
  draw-in. Everything stops when motion is reduced.

---

## Verification

* `npx tsc -b` — clean (strict mode, `noUnusedLocals`, full i18n parity).
* `npm run build` — production build succeeds.
* DOM smoke test (jsdom, run outside the repo): mounts the real bundle, walks
  all 20 slides forwards and backwards, and exercises menu, overview, wheel,
  progress ticks, both CTA entry points, all 7 product tabs, the scenario
  actions, language switching and the motion/fullscreen controls — 0 errors.
