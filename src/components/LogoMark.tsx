import { useId } from 'react'

/** BALANS AI mark — a hexagonal balance node with three orbiting satellites. */
export default function LogoMark({ className, size = 30 }: { className?: string; size?: number }) {
  const uid = useId().replace(/[:]/g, '')
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ce9ff" />
          <stop offset="52%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id={`${uid}-c`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#d8f6ff" />
          <stop offset="100%" stopColor="#4aa8ff" />
        </radialGradient>
      </defs>
      <path
        d="M32 9 L52.5 20.5 L52.5 43.5 L32 55 L11.5 43.5 L11.5 20.5 Z"
        fill="rgba(90,216,255,0.06)"
        stroke={`url(#${uid}-g)`}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path d="M32 20.5 L43 27 L43 40 L32 46.5 L21 40 L21 27 Z" fill="none" stroke="rgba(160,220,255,0.35)" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="32" cy="33" r="5.4" fill={`url(#${uid}-c)`} />
      <circle cx="32" cy="9" r="2.7" fill="#7ce9ff" />
      <circle cx="52.5" cy="43.5" r="2.7" fill="#3b82f6" />
      <circle cx="11.5" cy="43.5" r="2.7" fill="#8b5cf6" />
    </svg>
  )
}
