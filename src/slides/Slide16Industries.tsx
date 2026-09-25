import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Factory,
  HardHat,
  Layers,
  Package,
  ShoppingBag,
  Store,
  Truck,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { EASE, Note, Reveal } from '../components/Primitives'

/* ============================================================================
   SLIDE 16 — IDEAL CUSTOMER
   Industries and the growth path from small business to enterprise.
   ========================================================================== */

const ICONS = [ShoppingBag, Factory, Package, Store, Wrench, HardHat, Truck, UtensilsCrossed, Layers, Building2]

export default function Slide16() {
  const { c, motionOK } = useDeck()
  const s = c.s16

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

      <div className="grid g-5 industries">
        {s.industries.map((ind, i) => {
          const Icon = ICONS[i] ?? ShoppingBag
          return (
            <motion.div
              key={ind}
              className="glass card card--hover industry"
              initial={motionOK ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 + i * 0.05, ease: EASE }}
            >
              <span className="card__icon" style={{ width: 30, height: 30 }}>
                <Icon size={14} aria-hidden="true" />
              </span>
              <span className="industry__name">{ind}</span>
            </motion.div>
          )
        })}
      </div>

      <Reveal i={11}>
        <div className="glass glass--pad path">
          <span className="eyebrow eyebrow--mute">{s.pathTitle}</span>
          <div className="path__track">
            {s.path.map((p, i) => (
              <span key={p} className="path__unit">
                <motion.span
                  className={`path__step${i === s.path.length - 1 ? ' path__step--hi' : ''}`}
                  initial={motionOK ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.09, ease: EASE }}
                >
                  {p}
                </motion.span>
                {i < s.path.length - 1 && <ArrowRight className="path__arrow" size={14} aria-hidden="true" />}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal i={12}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
