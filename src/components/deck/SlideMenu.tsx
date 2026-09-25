import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, LogOut, X } from 'lucide-react'
import { useDeck } from '../../deck/DeckContext'
import { SLIDES, pad2 } from '../../deck/slides'
import { LANG_LABEL, LANGS } from '../../i18n'
import { EASE } from '../Primitives'

/* ============================================================================
   SLIDE MENU — full deck index. Also reachable on mobile, where the chrome
   collapses to a single button.
   ========================================================================== */

export default function SlideMenu({ onExitPresentation, onToggleFullscreen, isFullscreen }: { onExitPresentation: () => void; onToggleFullscreen: () => void; isFullscreen: boolean }) {
  const { c, index, go, closeOverlays, lang, setLang, calm, toggleCalm, openOverview } = useDeck()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-label={c.ui.menu}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlays()
      }}
    >
      <motion.div
        className="overlay__panel glass glass--solid"
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.995 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <div className="row row--between">
          <div className="stack-sm">
            <span className="eyebrow">{c.ui.menu}</span>
            <h2 className="h2">{c.s01.coreLabel}</h2>
          </div>
          <button ref={closeRef} className="iconbtn" onClick={closeOverlays} aria-label={c.ui.close}>
            <X size={16} />
          </button>
        </div>

        <div className="menu-grid">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`menu-item${i === index ? ' menu-item--active' : ''}`}
              onClick={() => {
                go(i)
                closeOverlays()
              }}
            >
              <span className="menu-item__n">{pad2(i + 1)}</span>
              <span className="stack-sm" style={{ gap: 2, alignItems: 'flex-start' }}>
                <span className="menu-item__t">{s.nav(c)}</span>
                <span className="tiny" style={{ textAlign: 'left' }}>
                  {s.desc(c)}
                </span>
              </span>
              <ChevronRight className="menu-item__i" size={14} />
            </button>
          ))}
        </div>

        <div className="hairline" />

        <div className="row row--wrap" style={{ gap: 10 }}>
          <div className="seg" role="group" aria-label={c.ui.language}>
            {LANGS.map((l) => (
              <button key={l} className="seg__btn" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {LANG_LABEL[l]}
              </button>
            ))}
          </div>
          <button className="btn" onClick={toggleCalm} aria-pressed={calm}>
            {calm ? c.ui.calmOff : c.ui.calmOn}
          </button>
          <button
            className="btn"
            onClick={() => {
              openOverview()
            }}
          >
            {c.ui.overview}
          </button>
          <button className="btn" onClick={onToggleFullscreen}>
            {isFullscreen ? c.ui.fullscreenExit : c.ui.fullscreen}
          </button>
          <button className="btn btn--ghost" onClick={onExitPresentation}>
            <LogOut size={14} />
            {c.ui.exit}
          </button>
        </div>

        <p className="tiny" style={{ margin: 0 }}>
          {c.ui.keyboard} · {c.ui.wheel} · {c.ui.swipe}
        </p>
      </motion.div>
    </motion.div>
  )
}
