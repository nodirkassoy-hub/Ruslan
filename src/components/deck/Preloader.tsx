import { motion } from 'framer-motion'
import LogoMark from '../LogoMark'
import { useDeck } from '../../deck/DeckContext'
import { EASE } from '../Primitives'

/** Short brand title card. Skippable with any key / click. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const { c } = useDeck()

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(14px)' }}
      transition={{ duration: 0.6, ease: EASE }}
      onClick={onDone}
      role="button"
      tabIndex={0}
      aria-label={c.ui.next}
    >
      <motion.div
        className="preloader__inner"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <LogoMark size={64} className="preloader__mark" />
        <h1 className="preloader__brand">{c.s01.coreLabel}</h1>
        <p className="preloader__sub up">{c.s01.eyebrow}</p>
        <span className="preloader__bar" />
      </motion.div>
    </motion.div>
  )
}
