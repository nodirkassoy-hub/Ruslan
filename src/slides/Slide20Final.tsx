import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, Play } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, EASE, Reveal } from '../components/Primitives'
import LogoMark from '../components/LogoMark'

/* ============================================================================
   SLIDE 20 — CLOSING
   Recap the story, then the single next step.
   ========================================================================== */

export default function Slide20Final() {
  const { c, motionOK, openCta, go } = useDeck()
  const s = c.s20

  return (
    <div className="slide__inner final">
      <Reveal i={0} className="final__mark">
        <motion.div
          initial={motionOK ? { opacity: 0, scale: 0.94 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <LogoMark size={56} />
        </motion.div>
      </Reveal>

      <Reveal i={1}>
        <span className="eyebrow">{s.brand}</span>
      </Reveal>

      <Reveal i={2}>
        <h2 className="mega final__title grad-text">{s.title}</h2>
      </Reveal>

      <Reveal i={3}>
        <p className="lead final__sub">{s.sub}</p>
      </Reveal>

      <Reveal i={4}>
        <div className="row row--wrap" style={{ gap: 8, justifyContent: 'center' }}>
          {s.recap.map((r) => (
            <Chip key={r}>{r}</Chip>
          ))}
        </div>
      </Reveal>

      <Reveal i={5}>
        <div className="glass glass--hi final__cta">
          <span className="tiny up" style={{ letterSpacing: '0.22em', color: 'var(--accent)' }}>
            {s.offer}
          </span>
          <div className="row row--wrap" style={{ gap: 10, justifyContent: 'center' }}>
            <button className="btn btn--primary btn--lg" onClick={openCta}>
              <Play size={15} />
              {s.primary}
            </button>
            <button className="btn btn--lg" onClick={openCta}>
              <CalendarCheck size={15} />
              {s.secondary}
              <ArrowRight size={15} />
            </button>
          </div>
          <p className="small" style={{ margin: 0 }}>
            {s.small}
          </p>
        </div>
      </Reveal>

      <Reveal i={6}>
        <div className="final__foot">
          <button className="btn btn--ghost" onClick={() => go(0)}>
            <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />
            {c.cta.restart}
          </button>
          <span className="tiny">{s.footer}</span>
          <span className="tiny">{c.ui.disclaimer}</span>
        </div>
      </Reveal>
    </div>
  )
}
