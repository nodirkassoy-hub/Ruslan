import { useEffect, useRef } from 'react'

/* ============================================================================
   AMBIENT BACKDROP
   Soft gradient glows + a quiet particle field with faint connecting lines.
   Deliberately low contrast: this frames the deck, it does not decorate it.
   ========================================================================== */

interface P {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export default function Backdrop({ motionOK }: { motionOK: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let particles: P[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const build = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const density = w < 760 ? 15000 : 22000
      const count = Math.max(18, Math.min(74, Math.round((w * h) / density)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.25 + 0.5,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 24000) {
            const alpha = 0.09 * (1 - d2 / 24000)
            ctx.strokeStyle = `rgba(120, 190, 255, ${alpha.toFixed(3)})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      // nodes
      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = 'rgba(160, 215, 255, 0.5)'
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    build()
    draw()
    if (motionOK) raf = requestAnimationFrame(step)

    const onResize = () => {
      build()
      draw()
    }
    window.addEventListener('resize', onResize)
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (motionOK && !document.hidden) raf = requestAnimationFrame(step)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [motionOK])

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__glow backdrop__glow--a" />
      <div className="backdrop__glow backdrop__glow--b" />
      <div className="backdrop__glow backdrop__glow--c" />
      <div className="backdrop__grid" />
      <canvas ref={canvasRef} />
      <div className="backdrop__noise" />
      <div className="backdrop__vig" />
    </div>
  )
}
