import { motion } from 'framer-motion'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, EASE, Reveal } from '../components/Primitives'
import LogoMark from '../components/LogoMark'

/* ============================================================================
   SLIDE 01 — HERO
   The seven core modules connect into one platform.
   ========================================================================== */

const RADIUS = 38

function nodePosition(i: number, count: number) {
  const angle = (-90 + (360 / count) * i) * (Math.PI / 180)
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) }
}

function Orbit({ labels, hints }: { labels: string[]; hints: string[] }) {
  const { motionOK } = useDeck()
  const count = labels.length
  const positions = labels.map((_, i) => nodePosition(i, count))
  const animate = motionOK

  return (
    <div className="orbit">
      <div className="orbit__glow" />
      <div className="orbit__ring orbit__ring--outer" />
      <div className="orbit__ring orbit__ring--inner" />

      <svg className="orbit__lines" viewBox="0 0 100 100" aria-hidden="true">
        {positions.map((p, i) => (
          <motion.path
            key={i}
            d={`M 50 50 L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`}
            stroke="rgba(120,200,255,0.34)"
            strokeWidth="0.4"
            fill="none"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
          />
        ))}
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.3" strokeDasharray="1.6 2.4" />
      </svg>

      <motion.div
        className="orbit__core"
        initial={animate ? { opacity: 0, scale: 0.9 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
      >
        <LogoMark size={40} />
        <span className="orbit__core-label">BALANS AI</span>
        <span className="orbit__core-sub">Data core</span>
      </motion.div>

      {positions.map((p, i) => (
        <motion.div
          key={labels[i]}
          className="orbit__node"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={animate ? { opacity: 0, scale: 0.86, filter: 'blur(6px)' } : false}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: EASE }}
          title={`${labels[i]} — ${hints[i]}`}
        >
          <span className="orbit__dot" />
          <span className="orbit__node-label">{labels[i]}</span>
          <span className="orbit__node-hint">{hints[i]}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default function Slide01() {
  const { c, next, go } = useDeck()
  const s = c.s01

  return (
    <div className="slide__inner">
      <div className="hero__grid">
        <div className="stack-lg">
          <Reveal i={0}>
            <span className="eyebrow">{s.eyebrow}</span>
          </Reveal>

          <Reveal i={1}>
            <h1 className="mega">
              <span className="hero__line">{s.titleA}</span>
              <span className="hero__line grad-accent">{s.titleB}</span>
            </h1>
          </Reveal>

          <Reveal i={2}>
            <p className="lead hero__sub">{s.sub}</p>
          </Reveal>

          <Reveal i={3}>
            <div className="row row--wrap" style={{ gap: 8 }}>
              {s.meta.map((m, i) => (
                <Chip key={m} tone={i === 0 ? 'accent' : undefined}>
                  {m}
                </Chip>
              ))}
            </div>
          </Reveal>

          <Reveal i={4}>
            <div className="row row--wrap" style={{ gap: 10 }}>
              <button className="btn btn--primary btn--lg" onClick={next}>
                {s.cta}
              </button>
              <button className="btn btn--lg" onClick={() => go(1)}>
                <HelpCircle size={16} />
                {s.cta2}
                <ArrowRight size={15} />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal i={2} className="hero__visual">
          <Orbit
            labels={s.nodes.map((n) => n.label)}
            hints={s.nodes.map((n) => n.hint)}
          />
        </Reveal>
      </div>
    </div>
  )
}
