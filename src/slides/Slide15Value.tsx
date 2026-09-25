import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Boxes, Bot, Clock, Factory, Eye, Gauge, Layers, ShieldCheck } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 15 — BUSINESS VALUE
   Qualitative outcomes only — no invented percentages.
   ========================================================================== */

const ICONS = [Clock, Layers, Gauge, Eye, ShieldCheck, ArrowRight, Boxes, Factory, Bot]

export default function Slide15() {
  const { c, motionOK } = useDeck()
  const s = c.s15

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

      <div className="grid g-3 values">
        {s.outcomes.map((o, i) => {
          const Icon = ICONS[i] ?? BarChart3
          return (
            <motion.div
              key={o.title}
              className="glass card card--hover value"
              initial={motionOK ? { opacity: 0, y: 14 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.08 + i * 0.05, ease: EASE }}
            >
              <span className="row" style={{ gap: 8 }}>
                <Icon size={15} style={{ color: 'var(--accent)', flex: 'none' }} aria-hidden="true" />
                <strong className="w-600" style={{ fontSize: 'var(--f-sm)', lineHeight: 1.3 }}>
                  {o.title}
                </strong>
              </span>
              <span className="tiny" style={{ lineHeight: 1.5 }}>
                {o.desc}
              </span>
            </motion.div>
          )
        })}
      </div>

      <Reveal i={10}>
        <div className="band band--accent band--goal">
          <span className="eyebrow eyebrow--mute">{s.goalTitle}</span>
          <p className="goal">{s.goal}</p>
        </div>
      </Reveal>

      <Reveal i={11}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
