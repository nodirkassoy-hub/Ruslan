import type { Content, Lang } from './types'
import uz from './uz'
import ru from './ru'
import en from './en'

export type { Content, Lang }
export * from './types'

export const DICT: Record<Lang, Content> = { uz, ru, en }
export const LANGS: Lang[] = ['uz', 'ru', 'en']
export const LANG_LABEL: Record<Lang, string> = { uz: 'UZ', ru: 'RU', en: 'EN' }
export const LANG_TITLE: Record<Lang, string> = {
  uz: 'O‘zbekcha',
  ru: 'Русский',
  en: 'English',
}

const STORAGE_KEY = 'balans-ai:lang'

export function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'uz' || v === 'ru' || v === 'en') return v
  } catch {
    /* storage unavailable — fall through */
  }
  return 'uz'
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* ignore */
  }
}

export const HTML_LANG: Record<Lang, string> = { uz: 'uz', ru: 'ru', en: 'en' }
