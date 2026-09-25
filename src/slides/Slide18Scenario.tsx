import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Building2, Factory, Wallet } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { DemoTag, EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 18 — CEO SCENARIO
   A morning, four signals, one platform, three decisions.
   ========================================================================== */

const TONES = { risk: 'var(--risk)', warn: 'var(--warn)', info: 'var(--accent)' } as const
const ACTION_ICONS = [Wallet, Building2, Factory]

export default function Slide18() {
  const { c, motionOK } = useDeck()
  const s = c.s18
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="slide__inner">
      <Reveal i={0}>
        <div className="row row--between row--wrap" style={{ alignItems: 'flex-end', gap: 12 }}>
          <div className="slide__head" style={{ maxWidth: '62ch' }}>
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="h1">{s.title}</h2>
            <p className="lead" style={{ margin: 0 }}>
              {s.lead}
            </p>
          </div>
          <DemoTag label={c.ui.demoData} />
        </div>
      </Reveal>

      <div className="grid g-1-2">
        {/* -------------------------------------------------------- morning rail */}
        <Reveal i={1}>
          <div className="glass glass--pad stack-sm" style={{ height: '100%' }}>
            <span className="morning__time num">{s.time}</span>
            <ol className="rail">
              {s.steps.map((st, i) => (
                <motion.li
                  key={st.t}
                  className="rail__row"
                  initial={motionOK ? { opacity: 0, x: -12 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.16, ease: EASE }}
                >
                  <span className="rail__dot" style={{ background: TONES[st.tone] }} aria-hidden="true" />
                  <span className="stack-sm" style={{ gap: 1 }}>
                    <strong className="w-600" style={{ fontSize: 'var(--f-sm)' }}>
                      {st.t}
                    </strong>
                    <span className="tiny">{st.d}</span>
                  </span>
                  {i < s.steps.length - 1 && <span className="rail__line" aria-hidden="true" />}
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* -------------------------------------------------------------- AI + CTA */}
        <div className="stack">
          <Reveal i={2}>
            <div className="glass glass--hi glass--pad stack-sm">
              <span className="row" style={{ gap: 8 }}>
                <span className="card__icon" style={{ width: 28, height: 28 }}>
                  <Bot size={15} />
                </span>
                <strong>{s.aiTitle}</strong>
              </span>
              <motion.p
                className="ai-say"
                initial={motionOK ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
              >
                {s.aiText}
              </motion.p>
            </div>
          </Reveal>

          <Reveal i={3}>
            <div className="grid g-3 actions">
              {s.actions.map((a, i) => {
                const Icon = ACTION_ICONS[i] ?? Wallet
                return (
                  <motion.button
                    key={a.t}
                    className={`glass card card--hover action${active === i ? ' action--on' : ''}`}
                    onClick={() => setActive(active === i ? null : i)}
                    aria-pressed={active === i}
                    initial={motionOK ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: 1 + i * 0.09, ease: EASE }}
                  >
                    <span className="row row--between">
                      <span className="card__icon" style={{ width: 28, height: 28 }}>
                        <Icon size={14} aria-hidden="true" />
                      </span>
                      <span className="num tiny">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="w-600" style={{ fontSize: 'var(--f-sm)' }}>
                      {a.t}
                    </span>
                    <span className="tiny">{a.d}</span>
                    <span className="action__arrow" aria-hidden="true">
                      <ArrowRight size={13} />
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal i={4}>
        <div className="band band--accent">
          <span className="band__title">{s.closing}</span>
        </div>
      </Reveal>

      <Reveal i={5}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
