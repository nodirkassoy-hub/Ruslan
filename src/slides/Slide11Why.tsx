import { motion } from 'framer-motion'
import { useDeck } from '../deck/DeckContext'
import { EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 11 — WHY BALANS AI
   Six principles, presented as pillars rather than feature bullets.
   ========================================================================== */

export default function Slide11() {
  const { c, motionOK } = useDeck()
  const s = c.s11

  return (
    <div className="slide__inner">
      <Reveal i={0}>
        <div className="slide__head">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2 className="h1">{s.title}</h2>
          <p className="lead" style={{ margin: 0 }}>
            {s.lead}
          </p>
        </div>
      </Reveal>

      <div className="grid g-3 pillars">
        {s.pillars.map((p, i) => (
          <Reveal key={p.n} i={i + 1}>
            <motion.div
              className="glass card card--hover pillar"
              initial={motionOK ? { opacity: 0, y: 16, scale: 0.99 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: EASE }}
            >
              <span className="pillar__n num">{p.n}</span>
              <span className="pillar__rule" aria-hidden="true" />
              <span className="card__title up" style={{ letterSpacing: '0.05em' }}>
                {p.title}
              </span>
              <span className="small">{p.desc}</span>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal i={8}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
