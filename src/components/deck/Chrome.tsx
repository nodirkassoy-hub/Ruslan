import { LayoutGrid, Maximize2, Minimize2, Menu as MenuIcon, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDeck } from '../../deck/DeckContext'
import { LANG_LABEL, LANGS } from '../../i18n'
import { SLIDES, pad2 } from '../../deck/slides'
import LogoMark from '../LogoMark'

/* ============================================================================
   DECK CHROME — brand bar, language + view controls, navigation bar, progress
   ========================================================================== */

export default function Chrome({ onToggleFullscreen, isFullscreen }: { onToggleFullscreen: () => void; isFullscreen: boolean }) {
  const { c, lang, setLang, index, total, go, next, prev, calm, toggleCalm, openMenu, openOverview } = useDeck()

  return (
    <div className="chrome">
      <header className="chrome__top">
        <button className="brand" onClick={() => go(0)} title={c.ui.brand}>
          <LogoMark className="brand__mark" />
          <span>{c.ui.brand}</span>
          <span className="brand__sub">{c.ui.brandSub}</span>
        </button>

        <div className="tools">
          <div className="seg" role="group" aria-label={c.ui.language}>
            {LANGS.map((l) => (
              <button key={l} className="seg__btn" aria-pressed={lang === l} onClick={() => setLang(l)} title={LANG_LABEL[l]}>
                {LANG_LABEL[l]}
              </button>
            ))}
          </div>
          <button
            className={calm ? 'iconbtn iconbtn--on' : 'iconbtn'}
            onClick={toggleCalm}
            aria-pressed={calm}
            title={calm ? c.ui.calmOff : c.ui.calmOn}
            aria-label={calm ? c.ui.calmOff : c.ui.calmOn}
          >
            {calm ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button className="iconbtn chrome__hide-sm" onClick={openOverview} title={c.ui.overview} aria-label={c.ui.overview}>
            <LayoutGrid size={15} />
          </button>
          <button
            className="iconbtn chrome__hide-sm"
            onClick={onToggleFullscreen}
            title={isFullscreen ? c.ui.fullscreenExit : c.ui.fullscreen}
            aria-label={isFullscreen ? c.ui.fullscreenExit : c.ui.fullscreen}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
          <button className="iconbtn" onClick={openMenu} title={c.ui.menu} aria-label={c.ui.menu}>
            <MenuIcon size={15} />
          </button>
        </div>
      </header>

      <div className="chrome__bottom">
        <div className="deckbar">
          <div className="progress" role="group" aria-label={`${c.ui.slide} ${index + 1} / ${total}`}>
            <span className="progress__fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
            <span className="progress__ticks">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  className={`progress__tick${i <= index ? ' progress__tick--done' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`${pad2(i + 1)} · ${s.nav(c)}`}
                  title={`${pad2(i + 1)} · ${s.nav(c)}`}
                />
              ))}
            </span>
          </div>

          <div className="chrome__bar">
            <div className="row" style={{ gap: 6 }}>
              <button className="btn" onClick={prev} aria-label={c.ui.prev} aria-disabled={index === 0}>
                <ChevronLeft size={15} />
                <span className="chrome__hide-sm">{c.ui.prev}</span>
              </button>
              <button className="btn btn--primary" onClick={next} aria-label={c.ui.next}>
                <span>{c.ui.next}</span>
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="row" style={{ gap: 10 }}>
              <span className="chip chip--plain chrome__hide-sm">{SLIDES[index].nav(c)}</span>
              <span className="counter" aria-live="polite">
                <span className="counter__now num">{pad2(index + 1)}</span>
                <span className="counter__sep">/</span>
                <span className="counter__all num">{pad2(total)}</span>
              </span>
              <span className="navhint">
                <kbd>←</kbd> <kbd>→</kbd> <kbd>space</kbd>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
