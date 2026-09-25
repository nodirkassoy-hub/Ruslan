import { Check, Minus, Sparkles, Target } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { EASE, Note, Reveal } from '../components/Primitives'
import { motion } from 'framer-motion'
import type { CellState } from '../i18n'

/* ============================================================================
   SLIDE 10 — MARKET POSITIONING
   Deliberately conservative: capabilities are described, not weaponised.
   ========================================================================== */

function StateCell({ state }: { state: CellState }) {
  const { c } = useDeck()
  const ui = c.ui

  if (state === 'yes')
    return (
      <span className="state state--yes" title={ui.yes}>
        <Check size={13} aria-hidden="true" />
        <span className="sr">{ui.yes}</span>
      </span>
    )
  if (state === 'partly')
    return (
      <span className="state state--partly" title={ui.partly}>
        <Minus size={13} aria-hidden="true" />
        <span className="sr">{ui.partly}</span>
      </span>
    )
  if (state === 'live')
    return (
      <span className="chip chip--ok" title={ui.live}>
        <Sparkles size={11} aria-hidden="true" />
        {ui.live}
      </span>
    )
  if (state === 'planned')
    return (
      <span className="chip chip--warn" title={ui.planned}>
        {ui.planned}
      </span>
    )
  return (
    <span className="state state--unknown" title={ui.unknown}>
      <span aria-hidden="true">—</span>
      <span className="sr">{ui.unknown}</span>
    </span>
  )
}

export default function Slide10() {
  const { c, motionOK } = useDeck()
  const s = c.s10

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
        <div className="glass matrix-wrap">
          <div className="matrix-scroll">
            <table className="matrix">
              <thead>
                <tr>
                  <th className="matrix__corner" />
                  {s.columns.map((col) => (
                    <th key={col.key} className={col.key === 'balans' ? 'matrix__th matrix__th--hi' : 'matrix__th'}>
                      <span className="matrix__th-title">{col.title}</span>
                      <span className="matrix__th-note">{col.note}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.rows.map((row, ri) => (
                  <motion.tr
                    key={row.label}
                    initial={motionOK ? { opacity: 0, y: 6 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + ri * 0.045, ease: EASE }}
                  >
                    <th scope="row" className="matrix__label">
                      {row.label}
                    </th>
                    {row.cells.map((cell, ci) => (
                      <td key={ci} className={ci === 4 ? 'matrix__td matrix__td--hi' : 'matrix__td'}>
                        <StateCell state={cell} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tiny matrix__legend">{s.legend}</p>
        </div>
      </Reveal>

      <div className="grid g-1-2">
        <Reveal i={2}>
          <div className="stack-sm">
            <span className="eyebrow">
              <Target size={12} style={{ marginRight: 4 }} aria-hidden="true" />
              {s.closingTitle}
            </span>
            <Note>{s.note}</Note>
          </div>
        </Reveal>
        <Reveal i={3}>
          <div className="row row--wrap" style={{ gap: 6, justifyContent: 'flex-end' }}>
            {s.closing.map((cl) => (
              <span key={cl} className="pillpill">
                {cl}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
