import { ArrowUpRight } from 'lucide-react'
import { useDeck } from '../deck/DeckContext'
import { Chip, Note, Reveal } from '../components/Primitives'
import ModuleGlyph from '../components/ModuleGlyph'

/* ============================================================================
   SLIDE 05 — PRODUCT ECOSYSTEM
   Eight module cards; hovering (or focusing) reveals the working parts.
   ========================================================================== */

export default function Slide05() {
  const { c } = useDeck()
  const s = c.s05

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

      <div className="grid g-4 mods">
        {s.modules.map((m, i) => (
          <Reveal key={m.key} i={i + 1} className="mod-wrap">
            <div className="glass card card--hover mod" tabIndex={0}>
              <div className="row row--between">
                <span className="card__icon">
                  <ModuleGlyph k={m.key} />
                </span>
                <ArrowUpRight size={14} className="mod__arrow" aria-hidden="true" />
              </div>
              <div className="stack-sm" style={{ gap: 2 }}>
                <span className="card__title">{m.title}</span>
                <span className="tiny">{m.note}</span>
              </div>
              <ul className="card__list mod__items">
                {m.items.map((it) => (
                  <li key={it}>
                    <Chip>{it}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal i={9}>
        <Note>{s.note}</Note>
      </Reveal>
    </div>
  )
}
