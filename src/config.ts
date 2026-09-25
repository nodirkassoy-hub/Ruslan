/* ============================================================================
   PRESENTATION CONFIG
   Fill in the contact channels below to make the closing call-to-action live.
   While a channel is empty the UI states openly that it is not configured —
   the deck never renders a dead link.
   ========================================================================== */

export interface ContactConfig {
  /** e.g. 'sales@balans.ai' */
  email: string
  /** e.g. '+998 90 000 00 00' */
  phone: string
  /** Telegram handle without '@', e.g. 'balans_ai' */
  telegram: string
  /** Product website, e.g. 'https://balans.ai' */
  site: string
}

export const CONTACT: ContactConfig = {
  email: '',
  phone: '',
  telegram: '',
  site: '',
}

export function contactChannels(c: ContactConfig) {
  const out: { key: keyof ContactConfig; label: string; href: string; value: string }[] = []
  if (c.email) out.push({ key: 'email', label: 'Email', href: `mailto:${c.email}`, value: c.email })
  if (c.phone) out.push({ key: 'phone', label: 'Telefon', href: `tel:${c.phone.replace(/\s+/g, '')}`, value: c.phone })
  if (c.telegram)
    out.push({ key: 'telegram', label: 'Telegram', href: `https://t.me/${c.telegram.replace(/^@/, '')}`, value: `@${c.telegram.replace(/^@/, '')}` })
  if (c.site) out.push({ key: 'site', label: 'Website', href: c.site, value: c.site.replace(/^https?:\/\//, '') })
  return out
}

export const HAS_CONTACT = contactChannels(CONTACT).length > 0
