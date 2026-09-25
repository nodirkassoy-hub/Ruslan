import { useEffect, useRef } from 'react'
import { motion, animate, type MotionStyle } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { Info } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'

export const EASE = [0.22, 1, 0.36, 1] as const

/* --------------------------------------------------------------- Reveal */
interface RevealProps {
  children: ReactNode
  /** Stagger index — delay grows with it. */
  i?: number
  y?: number
  x?: number
  scale?: number
  className?: string
  style?: MotionStyle
  duration?: number
}

/** Fade / slide / blur reveal used across every slide. */
export function Reveal({ children, i = 0, y = 16, x = 0, scale = 1, className, style, duration = 0.5 }: RevealProps) {
  const { motionOK, preview } = useDeck()
  if (!motionOK || preview) {
    return (
      <div className={className} style={style as CSSProperties}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, scale, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration, delay: 0.05 + i * 0.055, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------- Num (count-up) */
function group(value: number, decimals: number, sep: string) {
  const fixed = value.toFixed(decimals)
  const [int, frac] = fixed.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, sep)
  return frac ? `${grouped}.${frac}` : grouped
}

/**
 * Renders a label like "1 240 mln" while animating the numeric part.
 * Text without digits is rendered as-is.
 */
export function Num({ text, duration = 0.9, className }: { text: string; duration?: number; className?: string }) {
  const { motionOK, preview } = useDeck()
  const match = text.match(/\d[\d\s.,]*/)
  const target = match ? parseFloat(match[0].replace(/\s/g, '').replace(',', '.')) : NaN
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = spanRef.current
    if (!el || !match || Number.isNaN(target)) return
    if (!motionOK || preview) {
      el.textContent = match[0]
      return
    }
    const sep = match[0].includes(',') ? ',' : ' '
    const decimals = (match[0].split(/[.,]/)[1] || '').length
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = group(v, decimals, sep)
      },
    })
    return () => controls.stop()
  }, [text, target, motionOK, preview, duration, match])

  if (!match) return <span className={className}>{text}</span>

  const [before, after] = [text.slice(0, match.index ?? 0), text.slice((match.index ?? 0) + match[0].length)]
  const decimals = (match[0].split(/[.,]/)[1] || '').length
  const sep = match[0].includes(',') ? ',' : ' '
  return (
    <span className={className} aria-label={text}>
      {before}
      <span ref={spanRef} aria-hidden="true">
        {Number.isNaN(target) ? match[0] : group(0, decimals, sep)}
      </span>
      {after}
    </span>
  )
}

/* ------------------------------------------------------------------ atoms */
export function Eyebrow({ children, mute }: { children: ReactNode; mute?: boolean }) {
  return <span className={mute ? 'eyebrow eyebrow--mute' : 'eyebrow'}>{children}</span>
}

export function Chip({
  children,
  tone,
  className,
}: {
  children: ReactNode
  tone?: 'accent' | 'ok' | 'warn' | 'risk' | 'plain'
  className?: string
}) {
  return <span className={`chip${tone ? ` chip--${tone}` : ''}${className ? ` ${className}` : ''}`}>{children}</span>
}

export function DemoTag({ label }: { label: string }) {
  return <span className="demo-tag">{label}</span>
}

export function Note({ children, icon = true }: { children: ReactNode; icon?: boolean }) {
  return (
    <p className="note" style={{ margin: 0 }}>
      {icon && <Info className="note__i" size={13} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  )
}

export function SlideHead({
  eyebrow,
  title,
  lead,
  center,
  children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  center?: boolean
  children?: ReactNode
}) {
  return (
    <div className={center ? 'slide__head slide__head--center' : 'slide__head'}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="h1">{title}</h2>
      {lead && <p className="lead" style={{ margin: 0 }}>{lead}</p>}
      {children}
    </div>
  )
}

/** Glass panel with an optional caption row. */
export function Panel({
  children,
  className,
  hi,
  pad,
  style,
}: {
  children: ReactNode
  className?: string
  hi?: boolean
  pad?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      className={`glass${hi ? ' glass--hi' : ''}${pad ? ' glass--pad' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}

/** KPI metric tile with animated value. */
export function Metric({
  label,
  value,
  delta,
  tone = 'flat',
  icon,
}: {
  label: string
  value: string
  delta?: string
  tone?: 'up' | 'down' | 'flat'
  icon?: ReactNode
}) {
  const color = tone === 'up' ? 'var(--ok)' : tone === 'down' ? 'var(--risk)' : 'var(--ink-mute)'
  const arrow = tone === 'up' ? '↑' : tone === 'down' ? '↓' : '·'
  return (
    <div className="metric">
      <div className="metric__top">
        <span className="metric__label">{label}</span>
        {icon}
      </div>
      <div className="metric__value num">
        <Num text={value} />
      </div>
      {delta && (
        <div className="metric__delta" style={{ color }}>
          <span aria-hidden="true">{arrow}</span>
          <span>{delta}</span>
        </div>
      )}
    </div>
  )
}
