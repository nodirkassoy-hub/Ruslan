import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { DeckContext, type DeckApi } from '../../deck/DeckContext'
import { usePrefersReducedMotion } from '../../deck/usePrefersReducedMotion'
import { useFullscreen } from '../../deck/useFullscreen'
import { DICT, HTML_LANG, readStoredLang, storeLang, type Lang } from '../../i18n'
import { SLIDES, TOTAL } from '../../deck/slides'
import { SLIDE_COMPONENTS } from '../../slides'
import Backdrop from '../Backdrop'
import { EASE } from '../Primitives'
import Chrome from './Chrome'
import CtaDialog from './CtaDialog'
import Overview from './Overview'
import Preloader from './Preloader'
import SlideMenu from './SlideMenu'

/* ============================================================================
   DECK CONTROLLER
   One slide at a time. Keyboard, wheel, trackpad, swipe, progress ticks,
   menu, overview, fullscreen and language switching all live here.
   ========================================================================== */

type Overlay = 'none' | 'menu' | 'overview' | 'cta'

const WHEEL_COOLDOWN = 620

function indexFromHash(): number | null {
  const m = window.location.hash.match(/s(\d+)/)
  if (!m) return null
  const n = Number(m[1]) - 1
  return Number.isFinite(n) && n >= 0 && n < TOTAL ? n : null
}

export default function Deck() {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang())
  const [index, setIndex] = useState(() => indexFromHash() ?? 0)
  const [dir, setDir] = useState(1)
  const [userCalm, setUserCalm] = useState(false)
  const [overlay, setOverlay] = useState<Overlay>('none')
  const [intro, setIntro] = useState(true)

  const prefersReduced = usePrefersReducedMotion()
  const { isFullscreen, supported: fsSupported, toggle: toggleFullscreen, exit: exitFullscreen } = useFullscreen()

  const c = DICT[lang]
  const calm = userCalm || prefersReduced
  const motionOK = !calm

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const wheelStamp = useRef(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  /* ------------------------------------------------------------- language */
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    storeLang(l)
  }, [])

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
    document.title = `${c.s01.coreLabel} — ${c.s01.titleB.replace('.', '')}`
  }, [lang, c])

  /* ----------------------------------------------------------- navigation */
  const go = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(TOTAL - 1, i))
      setIndex((cur) => {
        if (next === cur) return cur
        setDir(next > cur ? 1 : -1)
        history.replaceState(null, '', `#s${next + 1}`)
        return next
      })
    },
    [],
  )

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  const closeOverlays = useCallback(() => setOverlay('none'), [])
  const openMenu = useCallback(() => setOverlay('menu'), [])
  const openOverview = useCallback(() => setOverlay('overview'), [])
  const openCta = useCallback(() => setOverlay('cta'), [])

  /* --------------------------------------------------------- scroll reset */
  const attachScroller = useCallback((el: HTMLDivElement | null) => {
    scrollRef.current = el
    if (el) el.scrollTop = 0
  }, [])

  /* ------------------------------------------------------------- keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (intro) {
        setIntro(false)
        return
      }
      if (overlay !== 'none') {
        if (e.key === 'Escape') setOverlay('none')
        if (overlay === 'menu' && (e.key === 'ArrowRight' || e.key === ' ')) setOverlay('none')
        return
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          go(0)
          break
        case 'End':
          e.preventDefault()
          go(TOTAL - 1)
          break
        case 'Escape':
          setOverlay('overview')
          break
        case 'm':
        case 'M':
          setOverlay('menu')
          break
        case 'o':
        case 'O':
          setOverlay('overview')
          break
        case 'f':
        case 'F':
          void toggleFullscreen()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [intro, overlay, next, prev, go, toggleFullscreen])

  /* ---------------------------------------------------------------- wheel */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (intro || overlay !== 'none') return
      const sc = scrollRef.current
      if (sc && sc.scrollHeight - sc.clientHeight > 4) {
        const atBottom = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 4
        const atTop = sc.scrollTop <= 4
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return
      }
      const now = performance.now()
      if (now - wheelStamp.current < WHEEL_COOLDOWN) return
      if (Math.abs(e.deltaY) < 10 && Math.abs(e.deltaX) < 10) return
      wheelStamp.current = now
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (delta > 0) next()
      else prev()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [intro, overlay, next, prev])

  /* --------------------------------------------------------------- swipe */
  const onTouchStart = (e: ReactTouchEvent) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: ReactTouchEvent) => {
    const start = touchStart.current
    if (!start) return
    touchStart.current = null
    if (intro || overlay !== 'none') return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.4) return
    const sc = scrollRef.current
    if (sc && Math.abs(dy) > 40 && Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) next()
    else prev()
  }

  /* ------------------------------------------------------- hash listening */
  useEffect(() => {
    const onHash = () => {
      const i = indexFromHash()
      if (i !== null) go(i)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [go])

  /* --------------------------------------------------------------- intro */
  useEffect(() => {
    const t = window.setTimeout(() => setIntro(false), 1750)
    return () => window.clearTimeout(t)
  }, [])

  /* ----------------------------------------------------------- exit deck */
  const exitPresentation = useCallback(() => {
    setOverlay('overview')
    if (isFullscreen) void exitFullscreen()
  }, [exitFullscreen, isFullscreen])

  const api: DeckApi = useMemo(
    () => ({
      c,
      lang,
      setLang,
      index,
      total: TOTAL,
      go,
      next,
      prev,
      calm,
      toggleCalm: () => setUserCalm((v) => !v),
      openMenu,
      openOverview,
      openCta,
      closeOverlays,
      preview: false,
      motionOK,
    }),
    [c, lang, setLang, index, go, next, prev, calm, openMenu, openOverview, openCta, closeOverlays, motionOK],
  )

  const Slide = SLIDE_COMPONENTS[index]
  const slideMeta = SLIDES[index]

  return (
    <DeckContext.Provider value={api}>
      <MotionConfig reducedMotion={motionOK ? 'never' : 'always'}>
        <Backdrop motionOK={motionOK} />

        <div className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <main className="stage" aria-label={c.ui.brand}>
            <AnimatePresence initial={false} custom={dir} mode="sync">
              <motion.section
                key={index}
                className="slide"
                custom={dir}
                initial={motionOK ? { opacity: 0, x: dir * 46, filter: 'blur(12px)' } : { opacity: 0 }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={motionOK ? { opacity: 0, x: dir * -32, filter: 'blur(12px)' } : { opacity: 0 }}
                transition={{ duration: motionOK ? 0.44 : 0.18, ease: EASE }}
                aria-label={`${c.ui.slide} ${index + 1} / ${TOTAL} — ${slideMeta.nav(c)}`}
              >
                <div className="slide__scroll" ref={attachScroller}>
                  <Slide />
                </div>
              </motion.section>
            </AnimatePresence>
          </main>

          <Chrome onToggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
        </div>

        <AnimatePresence>
          {overlay === 'menu' && (
            <SlideMenu
              key="menu"
              onExitPresentation={exitPresentation}
              onToggleFullscreen={toggleFullscreen}
              isFullscreen={isFullscreen && fsSupported}
            />
          )}
          {overlay === 'overview' && <Overview key="overview" />}
          {overlay === 'cta' && <CtaDialog key="cta" />}
        </AnimatePresence>

        <AnimatePresence>{intro && <Preloader key="intro" onDone={() => setIntro(false)} />}</AnimatePresence>
      </MotionConfig>
    </DeckContext.Provider>
  )
}
