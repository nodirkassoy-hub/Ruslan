import { motion } from 'framer-motion'
import { useDeck } from '../deck/DeckContext'
import { Chip, EASE, Note, Reveal } from '../components/Primitives'
import LogoMark from '../components/LogoMark'
import ModuleGlyph from '../components/ModuleGlyph'

/* ============================================================================
   SLIDE 03 — SOLUTION
   One shared data layer that every module reads from and writes to.
   ========================================================================== */

export default function Slide03() {
  const { c, motionOK } = useDeck()
  const s = c.s03

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

      <Reveal i={1}>
        <div className="glass glass--pad hub">
          <div className="hub__core">
            <LogoMark size={34} />
            <span className="stack-sm" style={{ gap: 1 }}>
              <strong className="hub__title">{s.hub}</strong>
              <span className="tiny">{s.hubSub}</span>
            </span>
          </div>

          <div className="hub__grid">
            {s.modules.map((m, i) => (
              <motion.div
                key={m.key}
                className="hub__mod"
                initial={motionOK ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.12 + i * 0.05, ease: EASE }}
              >
                <span className="hub__mod-head">
                  <ModuleGlyph k={m.key} size={14} />
                  <span className="hub__mod-title">{m.title}</span>
                </span>
                <span className="tiny hub__mod-note">{m.note}</span>
                <span className="hub__link" aria-hidden="true" />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="hub__layer"
            initial={motionOK ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          >
            <span className="hub__layer-title">{s.layer}</span>
            <span className="hub__layer-sub">{s.layerSub}</span>
          </motion.div>
        </div>
      </Reveal>

      <div className="grid g-2">
        <Reveal i={2}>
          <div className="stack-sm">
            {s.message.map((m) => (
              <p key={m} className="lead" style={{ margin: 0 }}>
                {m}
              </p>
            ))}
            <Note>{s.note}</Note>
          </div>
        </Reveal>
        <Reveal i={3}>
          <div className="row row--wrap" style={{ gap: 6, justifyContent: 'flex-end' }}>
            {s.modules.slice(0, 6).map((m) => (
              <Chip key={m.key}>
                <ModuleGlyph k={m.key} size={12} />
                {m.title}
              </Chip>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
