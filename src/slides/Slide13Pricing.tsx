import { motion } from 'framer-motion'
import { ArrowRight, Check, CreditCard, Gift, Landmark, Sparkles } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 13 — BUSINESS MODEL
   30-day trial, three plans, and an honest view of payment integrations.
   ========================================================================== */

export default function Slide13() {
  const { c, motionOK, openCta } = useDeck()
  const s = c.s13

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

      {/* --------------------------------------------------------- trial band */}
      <Reveal i={1}>
        <div className="glass glass--hi trial">
          <span className="row" style={{ gap: 10 }}>
            <span className="trial__icon">
              <Gift size={18} aria-hidden="true" />
            </span>
            <span className="stack-sm" style={{ gap: 0 }}>
              <span className="trial__badge">{s.trialBadge}</span>
              <span className="tiny">{s.trialNote}</span>
            </span>
          </span>
          <span className="trial__value num">{s.trialValue}</span>
        </div>
      </Reveal>

      {/* -------------------------------------------------------------- plans */}
      <div className="grid g-3 plans">
        {s.plans.map((p, i) => {
          const hi = i === 1
          return (
            <Reveal key={p.key} i={2 + i}>
              <motion.div
                className={`glass card plan${hi ? ' plan--hi card--accent' : ' card--hover'}`}
                initial={motionOK ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.09, ease: EASE }}
              >
                {hi && (
                  <span className="plan__flag">
                    <Sparkles size={11} aria-hidden="true" />
                    {p.tag}
                  </span>
                )}
                <span className="row row--between">
                  <span className="plan__name up">{p.name}</span>
                  {!hi && <span className="tiny">{p.tag}</span>}
                </span>
                <span className="row plan__pricing" style={{ gap: 6, alignItems: 'baseline' }}>
                  <span className="plan__price num">{p.price}</span>
                  <span className="tiny">{p.period}</span>
                </span>
                <span className="hairline" aria-hidden="true" />
                <ul className="plan__items">
                  {p.items.map((it) => (
                    <li key={it}>
                      <Check size={13} aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <button className={`btn${hi ? ' btn--primary' : ''}`} style={{ marginTop: 'auto' }} onClick={openCta}>
                  {p.cta}
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            </Reveal>
          )
        })}
      </div>

      <div className="grid g-2-1">
        {/* --------------------------------------------------------- post-trial */}
        <Reveal i={5}>
          <div className="glass glass--pad stack-sm">
            <span className="eyebrow eyebrow--mute">{s.flowTitle}</span>
            <div className="row row--wrap" style={{ gap: 6, alignItems: 'center' }}>
              {s.flow.map((f, i) => (
                <span key={f} className="row" style={{ gap: 6, alignItems: 'center' }}>
                  <Chip tone="accent">{f}</Chip>
                  {i < s.flow.length - 1 && <ArrowRight size={13} style={{ color: 'var(--ink-faint)' }} aria-hidden="true" />}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------- payments (honest) */}
        <Reveal i={6}>
          <div className="glass glass--pad stack-sm">
            <span className="row" style={{ gap: 7 }}>
              <CreditCard size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
              <span className="eyebrow eyebrow--mute">{s.paymentTitle}</span>
            </span>
            <div className="row row--wrap" style={{ gap: 6 }}>
              {s.payments.map((p) => (
                <span key={p.name} className={`pay pay--${p.tone}`}>
                  {p.tone === 'manual' ? <Landmark size={12} aria-hidden="true" /> : <CreditCard size={12} aria-hidden="true" />}
                  <span className="w-600">{p.name}</span>
                  <span className="pay__status">{p.status}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal i={7}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
