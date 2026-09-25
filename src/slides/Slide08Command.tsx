import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, CalendarClock, Eye } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { DemoTag, EASE, Metric, Note, Reveal } from '../components/Primitives'
import { AreaChart, ColumnChart } from '../components/charts/Charts'

/* ============================================================================
   SLIDE 08 — COMMAND CENTER
   One window: what is happening, what needs attention, what to do next.
   ========================================================================== */

const MONTHS = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn']

export default function Slide08() {
  const { c, motionOK } = useDeck()
  const s = c.s08

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

      <Reveal i={1}>
        <div className="metrics metrics--8">
          {s.kpis.map((k) => (
            <div key={k.label} className="glass metric-tile">
              <Metric label={k.label} value={k.value} delta={k.delta} tone={k.tone} />
            </div>
          ))}
        </div>
      </Reveal>

      <div className="grid g-2">
        <Reveal i={2}>
          <div className="glass glass--pad stack-sm">
            <span className="eyebrow eyebrow--mute">{s.chartTitle}</span>
            <AreaChart
              height={118}
              labels={MONTHS}
              series={[
                { name: s.series.revenue, color: '#5ad8ff', values: [820, 910, 880, 1040, 1180, 1240], fill: true },
                { name: s.series.expense, color: '#fb7185', values: [610, 660, 700, 790, 880, 1028], fill: true },
              ]}
            />
          </div>
        </Reveal>

        <Reveal i={3}>
          <div className="glass glass--pad stack-sm">
            <span className="eyebrow eyebrow--mute">{s.cashTitle}</span>
            <ColumnChart
              height={118}
              groups={MONTHS}
              series={[
                { name: s.series.inflow, color: '#35d6a0', values: [700, 820, 760, 900, 1010, 1050] },
                { name: s.series.outflow, color: '#67b6ff', values: [640, 700, 690, 850, 980, 1110] },
              ]}
            />
          </div>
        </Reveal>
      </div>

      <div className="grid g-3">
        {s.columns.map((col, ci) => (
          <Reveal key={col.title} i={4 + ci}>
            <div className="glass glass--pad stack-sm" style={{ height: '100%' }}>
              <span className="row" style={{ gap: 6 }}>
                {ci === 0 && <Eye size={13} style={{ color: 'var(--info)' }} aria-hidden="true" />}
                {ci === 1 && <AlertTriangle size={13} style={{ color: 'var(--warn)' }} aria-hidden="true" />}
                {ci === 2 && <ArrowRight size={13} style={{ color: 'var(--ok)' }} aria-hidden="true" />}
                <span className="eyebrow eyebrow--mute" style={{ letterSpacing: '0.13em' }}>
                  {col.title}
                </span>
              </span>
              <ul className="qlist qlist--tight">
                {col.items.map((it, ii) => (
                  <motion.li
                    key={it.t}
                    className={`qlist__item qlist__item--${it.tone ?? 'info'}`}
                    initial={motionOK ? { opacity: 0, x: -6 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + ci * 0.1 + ii * 0.06, ease: EASE }}
                  >
                    <span className="stack-sm" style={{ gap: 1 }}>
                      <strong className="qlist__t">{it.t}</strong>
                      <span className="tiny">{it.d}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal i={7}>
        <div className="row row--wrap" style={{ gap: 8, alignItems: 'center' }}>
          <CalendarClock size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
          <Note>{s.note}</Note>
        </div>
      </Reveal>
    </div>
  )
}
