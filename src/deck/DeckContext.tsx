import { createContext, useContext } from 'react'
import type { Content, Lang } from '../i18n'

export interface DeckApi {
  /** Localised content for the active language. */
  c: Content
  lang: Lang
  setLang: (l: Lang) => void
  /** 0-based index of the active slide. */
  index: number
  total: number
  go: (i: number) => void
  next: () => void
  prev: () => void
  /** True when the viewer asked for reduced motion. */
  calm: boolean
  toggleCalm: () => void
  openMenu: () => void
  openOverview: () => void
  openCta: () => void
  closeOverlays: () => void
  /** True when a slide is rendered as a small preview (overview grid). */
  preview: boolean
  /** Animations allowed: motion not reduced by user or system. */
  motionOK: boolean
}

export const DeckContext = createContext<DeckApi | null>(null)

export function useDeck(): DeckApi {
  const ctx = useContext(DeckContext)
  if (!ctx) throw new Error('useDeck() must be used inside <DeckContext.Provider>')
  return ctx
}
