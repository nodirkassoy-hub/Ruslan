import { motion } from 'framer-motion'
import { useDeck } from '../deck/DeckContext'
import { EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 04 — HOW IT WORKS
   One action travels through several departments. Animated data flow.
   ========================================================================== */

function FlowRow({
  title,
  caption,
  steps,
  delay,
  tone,
}: {
  title: string
  caption: string
  steps: { label: string }[]
  delay: number
  tone: string
}) {
  const { motionOK } = useDeck()

  return (
    <div className="glass glass--pad flow">
      <div className="flow__head">
        <span className="flow__title">
          <i className="flow__pip" style={{ background: tone }} aria-hidden="true" />
          {title}
        </span>
        <span className="tiny">{caption}</span>
      </div>

      <div className="flow__track">
        {steps.map((st, i) => (
          <span key={`${title}-${st.label}`} className="flow__unit">
            <motion.span
              className="flow__step"
              initial={motionOK ? { opacity: 0, y: 8, scale: 0.97 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: delay + i * 0.075, ease: EASE }}
            >
              {st.label}
            </motion.span>
            {i < steps.length - 1 && (
              <motion.span
                className="flow__arrow"
                initial={motionOK ? { opacity: 0, scaleX: 0 } : false}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.35, delay: delay + i * 0.075 + 0.06, ease: EASE }}
                aria-hidden="true"
              >
                <span className="flow__pulse" style={{ background: tone }} />
              </motion.span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Slide04() {
  const { c } = useDeck()
  const s = c.s04
  const tones = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']

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

      <div className="stack">
        {s.flows.map((f, i) => (
          <Reveal key={f.key} i={i + 1}>
            <FlowRow title={f.title} caption={f.caption} steps={f.steps} delay={0.1 + i * 0.15} tone={tones[i % tones.length]} />
          </Reveal>
        ))}
      </div>

      <Reveal i={4}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
