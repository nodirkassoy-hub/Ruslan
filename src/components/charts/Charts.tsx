import { motion } from 'framer-motion'
import { useId } from 'react'
import { useDeck } from '../../deck/DeckContext'
import { EASE } from '../Primitives'

/* ============================================================================
   ENTERPRISE CHART PRIMITIVES (SVG, dependency free)
   All figures rendered here are demo data for the presentation.
   ========================================================================== */

export interface Series {
  name: string
  color: string
  values: number[]
  /** area fill under the line */
  fill?: boolean
  /** dashed reference line */
  dashed?: boolean
}

const VB_W = 320
const VB_H = 132
const PAD = { t: 10, r: 6, b: 18, l: 6 }

function buildPath(values: number[], min: number, max: number, close: boolean) {
  const innerW = VB_W - PAD.l - PAD.r
  const innerH = VB_H - PAD.t - PAD.b
  const span = max - min || 1
  const stepX = values.length > 1 ? innerW / (values.length - 1) : innerW
  const pts = values.map((v, i) => [PAD.l + i * stepX, PAD.t + innerH - ((v - min) / span) * innerH])
  let d = ''
  pts.forEach((p, i) => {
    if (i === 0) d += `M ${p[0].toFixed(2)} ${p[1].toFixed(2)}`
    else {
      const prev = pts[i - 1]
      const cx = (prev[0] + p[0]) / 2
      d += ` C ${cx.toFixed(2)} ${prev[1].toFixed(2)}, ${cx.toFixed(2)} ${p[1].toFixed(2)}, ${p[0].toFixed(2)} ${p[1].toFixed(2)}`
    }
  })
  if (close) {
    d += ` L ${(PAD.l + innerW).toFixed(2)} ${(VB_H - PAD.b).toFixed(2)} L ${PAD.l} ${(VB_H - PAD.b).toFixed(2)} Z`
  }
  return d
}

function domain(series: Series[]) {
  const all = series.flatMap((s) => s.values)
  const max = Math.max(...all)
  const min = Math.min(...all, 0)
  const padTop = (max - min) * 0.16 || 1
  const padBottom = (max - min) * 0.12 || 1
  return { min: min - padBottom, max: max + padTop }
}

/** Smooth area / line chart with animated draw-in. */
export function AreaChart({
  series,
  labels,
  height = 150,
  className,
}: {
  series: Series[]
  labels?: string[]
  height?: number
  className?: string
}) {
  const { motionOK, preview } = useDeck()
  const uid = useId().replace(/[:]/g, '')
  const { min, max } = domain(series)
  const animateDraw = motionOK && !preview

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }} role="img">
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.name} id={`${uid}-g${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.42" />
              <stop offset="60%" stopColor={s.color} stopOpacity="0.1" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {[0, 1, 2, 3].map((i) => {
          const y = PAD.t + ((VB_H - PAD.t - PAD.b) / 3) * i
          return (
            <line
              key={i}
              x1={PAD.l}
              x2={VB_W - PAD.r}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
        {series.map((s, i) =>
          s.fill ? (
            <motion.path
              key={`${s.name}-fill`}
              d={buildPath(s.values, min, max, true)}
              fill={`url(#${uid}-g${i})`}
              initial={animateDraw ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            />
          ) : null,
        )}
        {series.map((s) => (
          <motion.path
            key={s.name}
            d={buildPath(s.values, min, max, false)}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={s.dashed ? '4 4' : undefined}
            vectorEffect="non-scaling-stroke"
            initial={animateDraw ? { pathLength: 0, opacity: 0.4 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        ))}
      </svg>
      {labels && (
        <div className="chart-labels">
          {labels.map((l) => (
            <span key={l} className="tiny">
              {l}
            </span>
          ))}
        </div>
      )}
      <div className="chart-legend">
        {series.map((s) => (
          <span key={s.name} className="chart-legend__item">
            <i style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Grouped column chart. */
export function ColumnChart({
  groups,
  series,
  height = 150,
}: {
  groups: string[]
  series: Series[]
  height?: number
}) {
  const { motionOK, preview } = useDeck()
  const animateIn = motionOK && !preview
  const { min, max } = domain(series)
  const innerH = VB_H - PAD.t - PAD.b
  const span = max - min || 1
  const groupW = (VB_W - PAD.l - PAD.r) / groups.length
  const barW = Math.min(9, (groupW - 6) / series.length)

  return (
    <div>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }} role="img">
        {[0, 1, 2, 3].map((i) => {
          const y = PAD.t + (innerH / 3) * i
          return (
            <line key={i} x1={PAD.l} x2={VB_W - PAD.r} y1={y} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          )
        })}
        {groups.map((g, gi) =>
          series.map((s, si) => {
            const v = s.values[gi] ?? 0
            const h = Math.max(1.5, ((v - min) / span) * innerH)
            const x = PAD.l + gi * groupW + (groupW - barW * series.length) / 2 + si * barW
            const y = PAD.t + innerH - h
            return (
              <motion.rect
                key={`${g}-${s.name}`}
                x={x}
                width={barW - 1.6}
                rx="1.6"
                fill={s.color}
                initial={animateIn ? { height: 0, y: PAD.t + innerH } : false}
                animate={{ height: h, y }}
                transition={{ duration: 0.75, delay: 0.06 * gi, ease: EASE }}
              />
            )
          }),
        )}
      </svg>
      <div className="chart-labels">
        {groups.map((g) => (
          <span key={g} className="tiny">
            {g}
          </span>
        ))}
      </div>
      <div className="chart-legend">
        {series.map((s) => (
          <span key={s.name} className="chart-legend__item">
            <i style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Compact sparkline for tiles. */
export function Sparkline({ values, color, height = 38 }: { values: number[]; color: string; height?: number }) {
  const { motionOK, preview } = useDeck()
  const uid = useId().replace(/[:]/g, '')
  const { min, max } = domain([{ name: 's', color, values }])
  const animateDraw = motionOK && !preview
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-sp`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={buildPath(values, min, max, true)} fill={`url(#${uid}-sp)`} />
      <motion.path
        d={buildPath(values, min, max, false)}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        initial={animateDraw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.75, ease: EASE }}
      />
    </svg>
  )
}

/** Horizontal share bar used for cost composition. */
export function ShareBar({
  items,
  delay = 0,
}: {
  items: { label: string; value: number; color: string }[]
  delay?: number
}) {
  const { motionOK, preview } = useDeck()
  const total = items.reduce((a, b) => a + b.value, 0) || 1
  const animateIn = motionOK && !preview
  return (
    <div className="sharebar">
      {items.map((it, i) => (
        <motion.span
          key={it.label}
          title={`${it.label} — ${Math.round((it.value / total) * 100)}%`}
          style={{ background: it.color }}
          initial={animateIn ? { scaleX: 0 } : false}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: delay + i * 0.07, ease: EASE }}
        />
      ))}
    </div>
  )
}
