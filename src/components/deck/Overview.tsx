import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { DeckContext, useDeck, type DeckApi } from '../../deck/DeckContext'
import { SLIDES, pad2 } from '../../deck/slides'
import { SLIDE_COMPONENTS } from '../../slides'
import { EASE } from '../Primitives'

/* ============================================================================
   OVERVIEW — the whole deck on one screen, each cell a live, scaled slide.
   Reached from the chrome (grid icon) or by pressing Esc twice.
   ========================================================================== */

function PreviewThumb({ children, index }: { children: ReactNode; index: number }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const measure = () => setScale(el.clientWidth / 1440)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // `inert` keeps the miniature out of the tab order and stops stray interaction.
  useEffect(() => {
    ref.current?.setAttribute('inert', '')
  })

  return (
    <div className="ov__host" ref={hostRef} style={{ height: 810 * scale }}>
      <div className="ov__scaler" ref={ref} style={{ width: 1440, height: 810, transform: `scale(${scale})` }}>
        {children}
      </div>
      <div className="ov__badge num">{pad2(index + 1)}</div>
    </div>
  )
}

export default function Overview() {
  const deck = useDeck()
  const { c, index, go, closeOverlays } = deck

  const previewApi: DeckApi = { ...deck, preview: true, motionOK: false, index: -1, total: deck.total }

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-label={c.ui.overview}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlays()
      }}
    >
      <div className="overlay__panel ov">
        <div className="row row--between" style={{ alignItems: 'flex-start' }}>
          <div className="stack-sm">
            <span className="eyebrow">{c.ui.overview}</span>
            <h2 className="h2">{c.s20.title}</h2>
            <p className="small" style={{ margin: 0 }}>
              {c.ui.overviewHint}
            </p>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn" onClick={closeOverlays}>
              <ArrowLeft size={15} />
              {c.ui.backToDeck}
            </button>
            <button className="iconbtn" onClick={closeOverlays} aria-label={c.ui.close}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="ov__grid">
          {SLIDES.map((s, i) => {
            const Slide = SLIDE_COMPONENTS[i]
            const open = () => {
              go(i)
              closeOverlays()
            }
            return (
              <div
                key={s.id}
                className={`ov__card glass card--hover${i === index ? ' ov__card--active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={open}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    open()
                  }
                }}
                aria-label={`${pad2(i + 1)} ${s.nav(c)}`}
              >
                <span aria-hidden="true">
                  <PreviewThumb index={i}>
                    <DeckContext.Provider value={previewApi}>
                      <div className="slide" style={{ position: 'absolute', inset: 0 }}>
                        <div className="slide__scroll">
                          <Slide />
                        </div>
                      </div>
                    </DeckContext.Provider>
                  </PreviewThumb>
                </span>
                <span className="ov__meta">
                  <span className="ov__n num">{pad2(i + 1)}</span>
                  <span className="ov__t">{s.nav(c)}</span>
                </span>
                <span className="ov__d">{s.desc(c)}</span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
