import type { Content } from '../i18n'

/* ============================================================================
   SLIDE REGISTRY
   Single source of truth for order, ids and the labels used by the menu,
   the overview grid and the progress ticks.
   ========================================================================== */

export interface SlideDef {
  id: string
  /** Short label for the menu / ticks. */
  nav: (c: Content) => string
  /** One-line description for the menu / overview. */
  desc: (c: Content) => string
}

export const SLIDES: SlideDef[] = [
  { id: 'hero', nav: (c) => c.s01.coreLabel, desc: (c) => c.s01.eyebrow },
  { id: 'problem', nav: (c) => c.s02.eyebrow, desc: (c) => c.s02.title },
  { id: 'solution', nav: (c) => c.s03.eyebrow, desc: (c) => c.s03.title },
  { id: 'how', nav: (c) => c.s04.eyebrow, desc: (c) => c.s04.title },
  { id: 'ecosystem', nav: (c) => c.s05.eyebrow, desc: (c) => c.s05.title },
  { id: 'roles', nav: (c) => c.s06.eyebrow, desc: (c) => c.s06.title },
  { id: 'ai', nav: (c) => c.s07.title, desc: (c) => c.s07.sub },
  { id: 'command', nav: (c) => c.s08.eyebrow, desc: (c) => c.s08.title },
  { id: 'factory', nav: (c) => c.s09.eyebrow, desc: (c) => c.s09.title },
  { id: 'market', nav: (c) => c.s10.eyebrow, desc: (c) => c.s10.title },
  { id: 'why', nav: (c) => c.s11.eyebrow, desc: (c) => c.s11.title },
  { id: 'trust', nav: (c) => c.s12.eyebrow, desc: (c) => c.s12.title },
  { id: 'pricing', nav: (c) => c.s13.eyebrow, desc: (c) => c.s13.title },
  { id: 'roadmap', nav: (c) => c.s14.eyebrow, desc: (c) => c.s14.title },
  { id: 'value', nav: (c) => c.s15.eyebrow, desc: (c) => c.s15.title },
  { id: 'industries', nav: (c) => c.s16.eyebrow, desc: (c) => c.s16.title },
  { id: 'demo', nav: (c) => c.s17.eyebrow, desc: (c) => c.s17.title },
  { id: 'scenario', nav: (c) => c.s18.eyebrow, desc: (c) => c.s18.title },
  { id: 'investors', nav: (c) => c.s19.eyebrow, desc: (c) => c.s19.title },
  { id: 'final', nav: (c) => c.s20.offer, desc: (c) => c.s20.title },
]

export const TOTAL = SLIDES.length

export const pad2 = (n: number) => String(n).padStart(2, '0')
