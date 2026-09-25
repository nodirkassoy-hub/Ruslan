import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, Mail, Phone, RotateCcw, Send, X, Globe } from 'lucide-react'
import { useDeck } from '../../deck/DeckContext'
import { CONTACT, contactChannels } from '../../config'
import { EASE } from '../Primitives'

/* ============================================================================
   CTA DIALOG — the closing "next step". Only opens the channels that are
   actually configured; otherwise it says so plainly.
   ========================================================================== */

const ICONS = { email: Mail, phone: Phone, telegram: Send, site: Globe } as const

export default function CtaDialog() {
  const { c, closeOverlays, go } = useDeck()
  const channels = contactChannels(CONTACT)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeOverlays()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [closeOverlays])

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(null), 1600)
    } catch {
      setCopied(null)
    }
  }

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-label={c.cta.startTitle}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlays()
      }}
    >
      <motion.div
        className="overlay__panel glass glass--solid glass--pad"
        style={{ width: 'min(760px, 100%)' }}
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        <div className="row row--between" style={{ alignItems: 'flex-start' }}>
          <div className="stack-sm">
            <span className="chip chip--accent">{c.s13.trialBadge}</span>
            <h2 className="h2">{c.cta.startTitle}</h2>
            <p className="small" style={{ margin: 0 }}>
              {c.cta.startSub}
            </p>
          </div>
          <button ref={closeRef} className="iconbtn" onClick={closeOverlays} aria-label={c.cta.close}>
            <X size={16} />
          </button>
        </div>

        <div className="hairline" />

        <ol className="steps">
          {c.cta.steps.map((s, i) => (
            <li key={s.t} className="steps__item">
              <span className="steps__n num">{String(i + 1).padStart(2, '0')}</span>
              <span className="stack-sm" style={{ gap: 2 }}>
                <strong className="w-600">{s.t}</strong>
                <span className="small">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="hairline" />

        <div className="stack-sm">
          <span className="eyebrow">{c.cta.contactTitle}</span>
          {channels.length > 0 ? (
            <div className="row row--wrap" style={{ gap: 8 }}>
              {channels.map((ch) => {
                const Icon = ICONS[ch.key]
                return (
                  <span key={ch.key} className="row" style={{ gap: 8 }}>
                    <a className="btn" href={ch.href} target={ch.key === 'site' || ch.key === 'telegram' ? '_blank' : undefined} rel="noreferrer">
                      <Icon size={15} />
                      {ch.value}
                    </a>
                    <button className="iconbtn" onClick={() => copy(ch.value, ch.key)} title={c.cta.copy} aria-label={`${c.cta.copy}: ${ch.value}`}>
                      {copied === ch.key ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </span>
                )
              })}
            </div>
          ) : (
            <p className="small" style={{ margin: 0 }}>
              {c.cta.contactMissing}
            </p>
          )}
        </div>

        <div className="hairline" />

        <div className="row row--between row--wrap" style={{ gap: 10 }}>
          <button
            className="btn"
            onClick={() => {
              closeOverlays()
              go(0)
            }}
          >
            <RotateCcw size={14} />
            {c.cta.restart}
          </button>
          <span className="tiny">{c.cta.disclaimer}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
