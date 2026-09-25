import { motion } from 'framer-motion'
import { Lock, ShieldCheck, UserRound } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 06 — ROLE-BASED CONTROL
   The hierarchy, and what happens when someone asks for data outside their role.
   ========================================================================== */

export default function Slide06() {
  const { c, motionOK } = useDeck()
  const s = c.s06
  const [owner, ...rest] = s.roles

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
        <div className="glass glass--pad tree">
          <div className="tree__root">
            <span className="card__icon">
              <ShieldCheck size={17} />
            </span>
            <span className="stack-sm" style={{ gap: 2 }}>
              <strong className="card__title">{owner.title}</strong>
              <span className="tiny">{owner.sub}</span>
            </span>
            <span className="row row--wrap tree__root-items">
              {owner.items.map((it) => (
                <Chip key={it} tone="accent">
                  {it}
                </Chip>
              ))}
            </span>
          </div>

          <div className="tree__wire" aria-hidden="true">
            <span className="tree__wire-line" />
            <span className="tree__wire-row" />
          </div>

          <div className="grid g-5 tree__row">
            {rest.map((r, i) => (
              <motion.div
                key={r.key}
                className="card role"
                initial={motionOK ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.15 + i * 0.08, ease: EASE }}
              >
                <span className="row" style={{ gap: 7 }}>
                  <UserRound size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <strong className="role__title">{r.title}</strong>
                </span>
                <span className="tiny">{r.sub}</span>
                <span className="row row--wrap" style={{ gap: 4 }}>
                  {r.items.map((it) => (
                    <Chip key={it} className="chip--plain">
                      {it}
                    </Chip>
                  ))}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid g-2-1">
        <Reveal i={2}>
          <div className="glass glass--pad stack-sm chat--dark">
            <div className="bubble bubble--user">
              <span className="tiny">{s.chatQBy}</span>
              <p className="bubble__text">{s.chatQ}</p>
            </div>
            <motion.div
              className="bubble bubble--ai"
              initial={motionOK ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5, ease: EASE }}
            >
              <span className="row" style={{ gap: 6 }}>
                <Lock size={13} style={{ color: 'var(--warn)' }} aria-hidden="true" />
                <span className="tiny up" style={{ color: 'var(--warn)' }}>
                  Access · restricted
                </span>
              </span>
              <p className="bubble__text">{s.chatA}</p>
            </motion.div>
          </div>
        </Reveal>

        <Reveal i={3}>
          <div className="band band--accent band--tall">
            <span className="band__title">{s.statement}</span>
            <span className="band__sub">{s.statementSub}</span>
            <Note>{s.note}</Note>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
