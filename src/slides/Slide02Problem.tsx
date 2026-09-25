import {
  AlertTriangle,
  Calculator,
  Factory,
  FileSpreadsheet,
  FileText,
  Landmark,
  MessageSquare,
  MinusCircle,
  Package,
  Scissors,
  UserCog,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { EASE, Reveal } from '../components/Primitives'
import { motion } from 'framer-motion'

/* ============================================================================
   SLIDE 02 — PROBLEM
   Disconnected systems, slow answers, scattered information.
   ========================================================================== */

/* One recognisable glyph per disconnected system, in the order of s.tools. */
const TOOL_ICONS: LucideIcon[] = [
  Calculator,
  FileSpreadsheet,
  MessageSquare,
  Package,
  Landmark,
  Users,
  Factory,
  UserCog,
  FileText,
]

export default function Slide02() {
  const { c } = useDeck()
  const s = c.s02

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

      <div className="grid g-2-1">
        {/* ------------------------------------------------ fragmented systems */}
        <Reveal i={1}>
          <div className="glass glass--pad stack" style={{ height: '100%' }}>
            <div className="row row--between">
              <span className="eyebrow eyebrow--mute">{s.stackTitle}</span>
              <Scissors size={14} style={{ color: 'var(--risk)' }} aria-hidden="true" />
            </div>

            <div className="scatter">
              {s.tools.map((t, i) => {
                const Icon = TOOL_ICONS[i] ?? FileSpreadsheet
                return (
                  <motion.span
                    key={t}
                    className="scatter__cell"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE }}
                    style={{ transform: `rotate(${i % 3 === 0 ? -0.7 : i % 3 === 1 ? 0.5 : -0.3}deg)` }}
                  >
                    <Icon size={13} aria-hidden="true" />
                    <span>{t}</span>
                    <MinusCircle size={11} className="scatter__mark" aria-hidden="true" />
                  </motion.span>
                )
              })}
            </div>

            <div className="hairline" />

            <div className="ask">
              <span className="ask__who">{s.questionBy}</span>
              <p className="ask__q">“{s.question}”</p>
              <p className="ask__a">{s.answer}</p>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------------------ pains */}
        <Reveal i={2}>
          <div className="glass glass--pad stack" style={{ height: '100%' }}>
            <ul className="pains">
              {s.pains.map((p, i) => (
                <motion.li
                  key={p}
                  className="pains__item"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.42, delay: 0.15 + i * 0.07, ease: EASE }}
                >
                  <AlertTriangle size={14} className="pains__i" aria-hidden="true" />
                  <span>{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal i={3}>
        <div className="band band--accent">
          <span className="band__title">{s.conclusion}</span>
          <span className="band__sub">{s.conclusionSub}</span>
        </div>
      </Reveal>
    </div>
  )
}
