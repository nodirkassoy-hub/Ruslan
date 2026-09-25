import { motion } from 'framer-motion'
import { Bot, Quote, ShieldCheck, Sigma, Sparkles, Target } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, DemoTag, EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 07 — AI CFO
   The AI separates FACT, ESTIMATE and RECOMMENDATION — and never invents data.
   ========================================================================== */

export default function Slide07() {
  const { c, motionOK } = useDeck()
  const s = c.s07

  const blocks = [
    { label: s.factLabel, text: s.factText, icon: Sigma, tone: 'var(--ok)' },
    { label: s.estimateLabel, text: s.estimateText, icon: Sparkles, tone: 'var(--warn)' },
    { label: s.recLabel, text: s.recText, icon: Target, tone: 'var(--accent)' },
  ]

  return (
    <div className="slide__inner">
      <div className="grid g-2-1">
        <div className="stack">
          <Reveal i={0}>
            <div className="slide__head">
              <span className="eyebrow">{s.eyebrow}</span>
              <h2 className="h1 grad-accent" style={{ fontSize: 'clamp(2rem, 3vw, 2.9rem)' }}>
                {s.title}
              </h2>
              <p className="lead" style={{ margin: 0 }}>
                {s.sub}
              </p>
            </div>
          </Reveal>

          <Reveal i={1}>
            <div className="glass glass--pad stack-sm">
              <span className="eyebrow eyebrow--mute">{c.s17.labels.askTitle}</span>
              <ul className="qlist">
                {s.questions.map((q, i) => (
                  <motion.li
                    key={q}
                    className="qlist__item"
                    initial={motionOK ? { opacity: 0, x: -8 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.055, ease: EASE }}
                  >
                    <span className="qlist__q">{q}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- AI answer */}
        <Reveal i={2}>
          <div className="glass glass--hi glass--pad stack-sm chat-panel">
            <div className="row row--between">
              <span className="row" style={{ gap: 7 }}>
                <span className="card__icon" style={{ width: 28, height: 28 }}>
                  <Bot size={15} />
                </span>
                <strong>{s.chatTitle}</strong>
              </span>
              <DemoTag label={c.ui.demoData} />
            </div>

            <div className="bubble bubble--user">
              <p className="bubble__text">{s.chatUser}</p>
            </div>

            <div className="answer">
              {blocks.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div
                    key={b.label}
                    className="answer__block"
                    style={{ borderLeftColor: b.tone }}
                    initial={motionOK ? { opacity: 0, y: 12, filter: 'blur(6px)' } : false}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.22, ease: EASE }}
                  >
                    <span className="answer__label" style={{ color: b.tone }}>
                      <Icon size={12} aria-hidden="true" />
                      {b.label}
                    </span>
                    <p className="answer__text">{b.text}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="hairline" />

            <div className="row row--wrap" style={{ gap: 6, alignItems: 'center' }}>
              <span className="tiny up" style={{ letterSpacing: '0.16em' }}>
                {s.factsTitle}
              </span>
              {s.facts.map((f) => (
                <Chip key={f}>
                  <ShieldCheck size={12} aria-hidden="true" />
                  {f}
                </Chip>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal i={3}>
        <div className="row" style={{ gap: 8, alignItems: 'flex-start' }}>
          <Quote size={14} style={{ color: 'var(--accent)', flex: 'none', marginTop: 3 }} aria-hidden="true" />
          <Note>{s.note}</Note>
        </div>
      </Reveal>
    </div>
  )
}
