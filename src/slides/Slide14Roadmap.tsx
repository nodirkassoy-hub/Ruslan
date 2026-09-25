import { motion } from 'framer-motion'
import { useDeck } from '../deck/DeckContext'
import { Chip, EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 14 — ROADMAP
   Four phases on one rail. Clearly a plan, not a claim.
   ========================================================================== */

export default function Slide14() {
  const { c, motionOK } = useDeck()
  const s = c.s14

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

      <div className="roadmap">
        <div className="roadmap__rail" aria-hidden="true">
          <motion.span
            className="roadmap__rail-fill"
            initial={motionOK ? { scaleX: 0 } : false}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>

        <div className="grid g-4 roadmap__phases">
          {s.phases.map((p, i) => (
            <Reveal key={p.n} i={i + 1} className="roadmap__col">
              <div className="roadmap__node" aria-hidden="true">
                <span className="roadmap__dot" />
              </div>
              <div className={`glass card${i === 0 ? ' card--accent' : ' card--hover'} phase`}>
                <span className="row row--between">
                  <span className="phase__n num">{p.n}</span>
                  <Chip tone={i === 0 ? 'ok' : 'plain'}>{p.when}</Chip>
                </span>
                <span className="card__title">{p.title}</span>
                <span className="hairline" aria-hidden="true" />
                <ul className="phase__items">
                  {p.items.map((it) => (
                    <li key={it}>
                      <span className="phase__bullet" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal i={6}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
