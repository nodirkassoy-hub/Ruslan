import { motion } from 'framer-motion'
import { Factory, Sigma } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, DemoTag, EASE, Note, Reveal } from '../components/Primitives'
import { ShareBar } from '../components/charts/Charts'

/* ============================================================================
   SLIDE 09 — MANUFACTURING
   Material flow, cost build-up and standard-vs-actual variance.
   ========================================================================== */

const COST_COLORS = ['#5ad8ff', '#67b6ff', '#8b5cf6', '#35d6a0', '#f7b955', '#fb7185']

export default function Slide09() {
  const { c, motionOK } = useDeck()
  const s = c.s09
  const costNumbers = s.cost.map((x) => parseFloat(x.value.replace(/[^\d.]/g, '')))
  const total = costNumbers.reduce((a, b) => a + b, 0)
  const maxActual = Math.max(...s.compare.map((r) => parseFloat(r.actual)))

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

      {/* ------------------------------------------------------------- flow */}
      <Reveal i={1}>
        <div className="glass glass--pad chain">
          <div className="row" style={{ gap: 8, alignItems: 'center' }}>
            <Factory size={15} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <span className="tiny up" style={{ letterSpacing: '0.16em' }}>
              {s.costTitle}
            </span>
          </div>
          <div className="chain__track">
            {s.flow.map((st, i) => (
              <span key={st.label} className="chain__unit">
                <motion.span
                  className="chain__step"
                  initial={motionOK ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.34, delay: 0.08 + i * 0.05, ease: EASE }}
                >
                  {st.label}
                </motion.span>
                {i < s.flow.length - 1 && <span className="chain__arrow" aria-hidden="true" />}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid g-2-1">
        {/* ----------------------------------------------------- cost build-up */}
        <Reveal i={2}>
          <div className="glass glass--pad stack-sm" style={{ height: '100%' }}>
            <span className="eyebrow eyebrow--mute">{s.costTitle}</span>
            <ShareBar
              items={s.cost.map((x, i) => ({ label: x.label, value: costNumbers[i], color: COST_COLORS[i % COST_COLORS.length] }))}
            />
            <ul className="costlist">
              {s.cost.map((x, i) => (
                <li key={x.label} className="costlist__row">
                  <span className="costlist__dot" style={{ background: COST_COLORS[i % COST_COLORS.length] }} aria-hidden="true" />
                  <span className="grow">{x.label}</span>
                  <span className="num w-600">{x.value}</span>
                </li>
              ))}
            </ul>
            <div className="band band--accent band--tight">
              <span className="band__title" style={{ fontSize: 'var(--f-h3)' }}>
                {s.costTotal}
              </span>
              <span className="row" style={{ gap: 8, alignItems: 'center' }}>
                <Sigma size={15} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <span className="num" style={{ fontSize: 'var(--f-h2)', fontWeight: 700 }}>
                  + {s.costTotalValue}
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* -------------------------------------------------- standard vs actual */}
        <Reveal i={3}>
          <div className="glass glass--pad stack-sm" style={{ height: '100%' }}>
            <span className="eyebrow eyebrow--mute">{s.compareTitle}</span>
            <div className="compare">
              <div className="compare__head">
                <span />
                <span>{s.compareCols.standard}</span>
                <span>{s.compareCols.actual}</span>
                <span>{s.compareCols.delta}</span>
              </div>
              {s.compare.map((r, i) => {
                const std = parseFloat(r.standard)
                const act = parseFloat(r.actual)
                const tone = r.tone === 'risk' ? 'var(--risk)' : r.tone === 'warn' ? 'var(--warn)' : 'var(--ok)'
                return (
                  <motion.div
                    key={r.label}
                    className="compare__row"
                    initial={motionOK ? { opacity: 0, x: 8 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: EASE }}
                  >
                    <span className="compare__label">{r.label}</span>
                    <span className="num compare__val">{r.standard}</span>
                    <span className="num compare__val w-600">{r.actual}</span>
                    <span>
                      <Chip tone={r.tone === 'risk' ? 'risk' : r.tone === 'warn' ? 'warn' : 'ok'}>{r.delta}</Chip>
                    </span>
                    <span className="compare__bars" aria-hidden="true">
                      <span className="compare__bar compare__bar--std" style={{ width: `${(std / maxActual) * 100}%` }} />
                      <span className="compare__bar" style={{ width: `${(act / maxActual) * 100}%`, background: tone }} />
                    </span>
                  </motion.div>
                )
              })}
            </div>
            <div className="row row--between" style={{ marginTop: 'auto' }}>
              <DemoTag label={c.ui.demoData} />
              <span className="tiny">
                Σ {total} mln
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal i={4}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
