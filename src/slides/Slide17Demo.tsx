import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  Bot,
  Calculator,
  Factory,
  LayoutDashboard,
  Package,
  RefreshCw,
  ShoppingCart,
  Sigma,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, DemoTag, EASE, Note, Reveal } from '../components/Primitives'
import { AreaChart, ShareBar, Sparkline } from '../components/charts/Charts'

/* ============================================================================
   SLIDE 17 — INTERACTIVE PRODUCT PREVIEW
   A simulated workspace. Clearly labelled as a preview with demo data.
   ========================================================================== */

type TabKey = 'dashboard' | 'ai' | 'sales' | 'warehouse' | 'accounting' | 'manufacturing' | 'reports'

const TAB_ICONS = {
  dashboard: LayoutDashboard,
  ai: Bot,
  sales: ShoppingCart,
  warehouse: Package,
  accounting: Calculator,
  manufacturing: Factory,
  reports: BarChart3,
} as const

type St = 'paid' | 'partial' | 'overdue' | 'open'

const SALES: { id: string; customer: string; amount: string; st: St }[] = [
  { id: 'SO-1042', customer: 'MCHJ «Alfa Savdo»', amount: '48 200 000', st: 'paid' },
  { id: 'SO-1043', customer: 'OOO «Baraka Trade»', amount: '31 400 000', st: 'overdue' },
  { id: 'SO-1044', customer: 'XK «Oltin Zanjir»', amount: '22 850 000', st: 'partial' },
  { id: 'SO-1045', customer: 'FE «Mega Retail»', amount: '17 600 000', st: 'open' },
  { id: 'SO-1046', customer: '«Nur Distribution»', amount: '12 300 000', st: 'paid' },
]

const STOCK: { item: string; qty: string; level: number; low?: boolean }[] = [
  { item: 'Profil 40×40', qty: '1 240 m', level: 0.72 },
  { item: 'List 2 mm', qty: '380 m²', level: 0.24, low: true },
  { item: 'Armatura 12', qty: '2 100 kg', level: 0.86 },
  { item: 'Kraska oq', qty: '96 l', level: 0.18, low: true },
  { item: 'Upakovka 60×40', qty: '640 dona', level: 0.55 },
]

const PRODUCTION: { id: string; item: string; plan: string; done: number; cost: string }[] = [
  { id: 'PO-208', item: 'Profil 40×40', plan: '1 200 m', done: 92, cost: '186 mln' },
  { id: 'PO-209', item: 'Panel T-12', plan: '480 m²', done: 74, cost: '94 mln' },
  { id: 'PO-210', item: 'Upakovka', plan: '5 000 dona', done: 88, cost: '41 mln' },
]

const PNL_VALUES = ['1 240 mln', '−812 mln', '428 mln', '−216 mln', '212 mln']

export default function Slide17Demo() {
  const { c, motionOK } = useDeck()
  const s = c.s17
  const [tab, setTab] = useState<TabKey>('dashboard')
  const [qIndex, setQIndex] = useState(0)
  const [nonce, setNonce] = useState(0)

  const stLabel: Record<St, { t: string; tone: 'ok' | 'warn' | 'risk' | 'plain' }> = {
    paid: { t: s.status.paid, tone: 'ok' },
    partial: { t: s.status.partial, tone: 'warn' },
    overdue: { t: s.status.overdue, tone: 'risk' },
    open: { t: s.status.open, tone: 'plain' },
  }

  const reports = c.s05.modules.find((m) => m.key === 'reports')?.items ?? []

  const panels: Record<TabKey, ReactNode> = {
    dashboard: (
      <div className="stack-sm">
        <div className="mini-metrics">
          {c.s08.kpis.slice(0, 4).map((k) => (
            <div key={k.label} className="mini-metric">
              <span className="tiny">{k.label}</span>
              <span className="mini-metric__v num">{k.value}</span>
              <span className="mini-metric__d" style={{ color: k.tone === 'down' ? 'var(--risk)' : k.tone === 'up' ? 'var(--ok)' : 'var(--ink-mute)' }}>
                {k.delta}
              </span>
            </div>
          ))}
        </div>
        <div className="app__chart">
          <span className="tiny up" style={{ letterSpacing: '0.14em' }}>
            {c.s08.chartTitle}
          </span>
          <AreaChart
            height={104}
            series={[
              { name: c.s08.series.revenue, color: '#5ad8ff', values: [820, 910, 880, 1040, 1180, 1240], fill: true },
              { name: c.s08.series.expense, color: '#fb7185', values: [610, 660, 700, 790, 880, 1028], fill: true },
            ]}
            labels={['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn']}
          />
        </div>
      </div>
    ),
    ai: (
      <div className="stack-sm">
        <div className="bubble bubble--user bubble--sm">
          <p className="bubble__text">{s.ai.q}</p>
        </div>
        <div key={nonce} className="answer">
          {[
            { l: c.s07.factLabel, t: s.ai.fact, i: Sigma, tone: 'var(--ok)' },
            { l: c.s07.estimateLabel, t: s.ai.estimate, i: Sparkles, tone: 'var(--warn)' },
            { l: c.s07.recLabel, t: s.ai.rec, i: Target, tone: 'var(--accent)' },
          ].map((b, i) => {
            const Icon = b.i
            return (
              <motion.div
                key={b.l}
                className="answer__block answer__block--sm"
                style={{ borderLeftColor: b.tone }}
                initial={motionOK ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.2, ease: EASE }}
              >
                <span className="answer__label" style={{ color: b.tone }}>
                  <Icon size={11} aria-hidden="true" />
                  {b.l}
                </span>
                <p className="answer__text">{b.t}</p>
              </motion.div>
            )
          })}
        </div>
        <div className="row row--wrap" style={{ gap: 5 }}>
          <span className="tiny">{s.labels.typeHint}:</span>
          {c.s07.questions.slice(0, 4).map((q, i) => (
            <button
              key={q}
              className={`chip${i === qIndex ? ' chip--accent' : ''}`}
              onClick={() => {
                setQIndex(i)
                setNonce((n) => n + 1)
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    ),
    sales: (
      <div className="stack-sm">
        <table className="table">
          <thead>
            <tr>
              <th>{s.cols.order}</th>
              <th>{s.cols.customer}</th>
              <th className="ta-r">{s.cols.amount}</th>
              <th className="ta-r">{s.cols.status}</th>
            </tr>
          </thead>
          <tbody>
            {SALES.map((r) => (
              <tr key={r.id}>
                <td className="mono tiny">{r.id}</td>
                <td>{r.customer}</td>
                <td className="ta-r num">{r.amount}</td>
                <td className="ta-r">
                  <Chip tone={stLabel[r.st].tone}>{stLabel[r.st].t}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    warehouse: (
      <div className="stack-sm">
        <table className="table">
          <thead>
            <tr>
              <th>{s.cols.item}</th>
              <th className="ta-r">{s.cols.stock}</th>
              <th style={{ width: '34%' }}>{s.labels.lowStock}</th>
            </tr>
          </thead>
          <tbody>
            {STOCK.map((r) => (
              <tr key={r.item}>
                <td>{r.item}</td>
                <td className="ta-r num">{r.qty}</td>
                <td>
                  <span className="level">
                    <span className="level__bar">
                      <span
                        className="level__fill"
                        style={{ width: `${r.level * 100}%`, background: r.low ? 'var(--warn)' : 'var(--accent)' }}
                      />
                    </span>
                    {r.low && <Chip tone="warn">{Math.round(r.level * 100)}%</Chip>}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    accounting: (
      <div className="stack-sm">
        <table className="table table--pnl">
          <tbody>
            <tr>
              <td>{s.pnlRows.revenue}</td>
              <td className="ta-r num">{PNL_VALUES[0]}</td>
            </tr>
            <tr>
              <td>{s.pnlRows.cogs}</td>
              <td className="ta-r num">{PNL_VALUES[1]}</td>
            </tr>
            <tr className="table__sub">
              <td>{s.pnlRows.gross}</td>
              <td className="ta-r num">{PNL_VALUES[2]}</td>
            </tr>
            <tr>
              <td>{s.pnlRows.opex}</td>
              <td className="ta-r num">{PNL_VALUES[3]}</td>
            </tr>
            <tr className="table__total">
              <td>{s.pnlRows.net}</td>
              <td className="ta-r num">{PNL_VALUES[4]}</td>
            </tr>
          </tbody>
        </table>
        <ShareBar
          items={[
            { label: s.pnlRows.cogs, value: 812, color: '#fb7185' },
            { label: s.pnlRows.opex, value: 216, color: '#f7b955' },
            { label: s.pnlRows.net, value: 212, color: '#35d6a0' },
          ]}
        />
      </div>
    ),
    manufacturing: (
      <div className="stack-sm">
        {PRODUCTION.map((p) => (
          <div key={p.id} className="prod">
            <span className="row row--between">
              <span className="row" style={{ gap: 7 }}>
                <span className="mono tiny">{p.id}</span>
                <strong style={{ fontSize: 'var(--f-sm)' }}>{p.item}</strong>
              </span>
              <span className="row" style={{ gap: 8 }}>
                <span className="tiny">{p.plan}</span>
                <span className="num small w-600">{p.done}%</span>
              </span>
            </span>
            <span className="level__bar">
              <motion.span
                className="level__fill"
                style={{ background: p.done > 85 ? 'var(--ok)' : 'var(--warn)' }}
                initial={motionOK ? { width: 0 } : false}
                animate={{ width: `${p.done}%` }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </span>
            <span className="row row--between">
              <span className="tiny">{s.labels.prodCost}</span>
              <span className="num tiny">{p.cost}</span>
            </span>
          </div>
        ))}
        <div className="hairline" />
        <span className="row row--between">
          <span className="tiny">{c.s09.costTotal}</span>
          <span className="num small w-600">{c.s09.costTotalValue}</span>
        </span>
      </div>
    ),
    reports: (
      <div className="grid g-3 reps">
        {reports.map((r, i) => (
          <div key={r} className="rep">
            <span className="tiny">{r}</span>
            <Sparkline values={[[120, 148, 132, 176, 190, 212], [70, 62, 78, 74, 88, 96], [40, 52, 47, 61, 58, 72]][i % 3]} color={['#5ad8ff', '#35d6a0', '#8b5cf6'][i % 3]} />
            <span className="row row--between">
              <span className="tiny">{s.cols.period}</span>
              <span className="mono tiny">06 / 2026</span>
            </span>
          </div>
        ))}
      </div>
    ),
  }

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
          <div className="row" style={{ gap: 8 }}>
            <DemoTag label={c.ui.demoPreview} />
            <DemoTag label={c.ui.demoData} />
          </div>
        </div>
      </Reveal>

      <Reveal i={1}>
        <div className="glass glass--hi app">
          <div className="app__bar">
            <span className="app__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="app__title">
              <span className="row" style={{ gap: 7 }}>
                <TrendingUp size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                {c.s01.coreLabel} · {c.s01.coreSub}
              </span>
            </span>
            <span className="chip chip--plain app__bar-chip">
              <RefreshCw size={11} aria-hidden="true" />
              {s.cols.period}: 06 / 2026
            </span>
          </div>

          <div className="app__body">
            <div className="app__side" role="tablist" aria-label={s.title} aria-orientation="vertical">
              {s.tabs.map((t) => {
                const Icon = TAB_ICONS[t.key as TabKey]
                const active = tab === t.key
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    className={`app__nav${active ? ' app__nav--on' : ''}`}
                    onClick={() => setTab(t.key as TabKey)}
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span>{t.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="app__main" role="tabpanel" aria-live="polite">
              <div className="app__head">
                <span className="small w-600">{s.tabs.find((t) => t.key === tab)?.label}</span>
                <span className="tiny">{s.labels.overview}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={motionOK ? { opacity: 0, y: 10, filter: 'blur(6px)' } : { opacity: 0 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={motionOK ? { opacity: 0, y: -8, filter: 'blur(6px)' } : { opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="app__panel"
                >
                  {panels[tab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal i={2}>
        <Note>{s.notes}</Note>
      </Reveal>
    </div>
  )
}
