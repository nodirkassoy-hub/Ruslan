import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Building2,
  Database,
  FileLock2,
  Fingerprint,
  ScrollText,
  ServerCog,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 12 — SECURITY & TRUST
   The request path, the architectural controls, and no over-claiming.
   ========================================================================== */

const ICONS = [Building2, Users, UserCheck, BadgeCheck, ScrollText, ServerCog, Fingerprint, Database]
const STACK_ICONS = [Users, Fingerprint, BadgeCheck, ShieldCheck, Building2, FileLock2]

export default function Slide12() {
  const { c, motionOK } = useDeck()
  const s = c.s12

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

      <div className="grid g-1-2">
        {/* ------------------------------------------------------ request path */}
        <Reveal i={1}>
          <div className="glass glass--pad stack-sm" style={{ height: '100%' }}>
            <span className="eyebrow eyebrow--mute">{s.stackTitle}</span>
            <ol className="reqpath">
              {s.stack.map((step, i) => {
                const Icon = STACK_ICONS[i] ?? ShieldCheck
                const last = i === s.stack.length - 1
                return (
                  <motion.li
                    key={step}
                    className={last ? 'reqpath__row reqpath__row--hi' : 'reqpath__row'}
                    initial={motionOK ? { opacity: 0, x: -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.09, ease: EASE }}
                  >
                    <span className="reqpath__icon">
                      <Icon size={13} aria-hidden="true" />
                    </span>
                    <span className="reqpath__label">{step}</span>
                    {i < s.stack.length - 1 && <span className="reqpath__drop" aria-hidden="true" />}
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </Reveal>

        {/* ----------------------------------------------------------- controls */}
        <Reveal i={2}>
          <div className="grid g-2 controls">
            {s.items.map((it, i) => {
              const Icon = ICONS[i] ?? ShieldCheck
              return (
                <motion.div
                  key={it.title}
                  className="card card--hover glass"
                  initial={motionOK ? { opacity: 0, y: 12 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <span className="row" style={{ gap: 7 }}>
                    <Icon size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    <strong className="w-600" style={{ fontSize: 'var(--f-sm)' }}>
                      {it.title}
                    </strong>
                  </span>
                  <span className="tiny" style={{ lineHeight: 1.5 }}>
                    {it.desc}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </Reveal>
      </div>

      <Reveal i={3}>
        <div className="band band--accent">
          <span className="band__title">{s.quote}</span>
          <span className="band__sub">{s.quoteSub}</span>
        </div>
      </Reveal>

      <Reveal i={4}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
