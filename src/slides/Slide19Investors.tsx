import { motion } from 'framer-motion'
import { Building2, Server, ShieldCheck } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 19 — INVESTOR / PARTNER VIEW
   Multi-tenant SaaS: many companies, one operationally shared platform.
   ========================================================================== */

export default function Slide19() {
  const { c, motionOK } = useDeck()
  const s = c.s19

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
        {/* ---------------------------------------------------------- tenants */}
        <Reveal i={1}>
          <div className="glass glass--pad stack-sm" style={{ height: '100%' }}>
            <span className="row row--between">
              <span className="eyebrow eyebrow--mute">{s.ownTitle}</span>
              <span className="chip chip--accent">{s.tenantsMore}</span>
            </span>

            <div className="tenants">
              {[1, 2, 3].map((n) => (
                <motion.div
                  key={n}
                  className="tenant"
                  initial={motionOK ? { opacity: 0, x: -10 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.42, delay: 0.12 + n * 0.09, ease: EASE }}
                >
                  <span className="row" style={{ gap: 7 }}>
                    <Building2 size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    <span className="mono tiny">
                      {s.tenants} {n}
                    </span>
                  </span>
                  <span className="row row--wrap" style={{ gap: 4 }}>
                    {s.own.map((o) => (
                      <Chip key={o} className="chip--plain">
                        {o}
                      </Chip>
                    ))}
                  </span>
                </motion.div>
              ))}
              <motion.div
                className="tenant tenant--more"
                initial={motionOK ? { opacity: 0, x: -10 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, delay: 0.45, ease: EASE }}
              >
                <span className="mono tiny">{s.tenantsMore}</span>
                <span className="tiny">+ …</span>
              </motion.div>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------- central platform */}
        <Reveal i={2}>
          <div className="glass glass--hi glass--pad stack-sm platform">
            <span className="row" style={{ gap: 8 }}>
              <span className="card__icon" style={{ width: 30, height: 30 }}>
                <Server size={15} />
              </span>
              <strong className="card__title">{s.centralTitle}</strong>
            </span>
            <ul className="platform__list">
              {s.central.map((it, i) => (
                <motion.li
                  key={it}
                  initial={motionOK ? { opacity: 0, x: 8 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease: EASE }}
                >
                  <ShieldCheck size={13} aria-hidden="true" />
                  {it}
                </motion.li>
              ))}
            </ul>
            <div className="hairline" aria-hidden="true" />
            <div className="grid g-2">
              {s.metrics.map((m) => (
                <span key={m.label} className="stack-sm" style={{ gap: 1 }}>
                  <span className="tiny">{m.label}</span>
                  <span className="small w-600">{m.value}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal i={3}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
