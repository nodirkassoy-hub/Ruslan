/* ============================================================================
   BALANS AI — CONTENT MODEL
   Every visible string in the deck lives here so UZ / RU / EN stay in parity.
   TypeScript fails the build if a translation is missing a key.
   ========================================================================== */

export type Lang = 'uz' | 'ru' | 'en'

export interface ModuleCard {
  key: string
  title: string
  note: string
  items: string[]
}

export interface FlowStep {
  label: string
  hint?: string
}

/** Comparison states — deliberately conservative. */
export type CellState =
  /** Publicly documented capability of the product category. */
  | 'yes'
  /** Capability commonly present but usually via an add-on, module or configuration. */
  | 'partly'
  /** Not evaluated — we do not claim absence without evidence. */
  | 'unknown'
  /** Implemented inside Balans AI today. */
  | 'live'
  /** On the published roadmap, not shipped yet. */
  | 'planned'

export interface Content {
  code: Lang
  ui: {
    brand: string
    brandSub: string
    slide: string
    prev: string
    next: string
    menu: string
    close: string
    fullscreen: string
    fullscreenExit: string
    calmOn: string
    calmOff: string
    exit: string
    overview: string
    overviewHint: string
    backToDeck: string
    keyboard: string
    wheel: string
    swipe: string
    language: string
    demoData: string
    demoPreview: string
    planned: string
    live: string
    unknown: string
    yes: string
    partly: string
    disclaimer: string
  }
  cta: {
    open: string
    startTitle: string
    startSub: string
    steps: { t: string; d: string }[]
    contactTitle: string
    contactMissing: string
    copy: string
    copied: string
    restart: string
    close: string
    disclaimer: string
  }
  s01: {
    eyebrow: string
    titleA: string
    titleB: string
    sub: string
    coreLabel: string
    coreSub: string
    nodes: { label: string; hint: string }[]
    cta: string
    cta2: string
    meta: string[]
  }
  s02: {
    eyebrow: string
    title: string
    lead: string
    stackTitle: string
    tools: string[]
    question: string
    questionBy: string
    answer: string
    pains: string[]
    conclusion: string
    conclusionSub: string
  }
  s03: {
    eyebrow: string
    title: string
    lead: string
    hub: string
    hubSub: string
    layer: string
    layerSub: string
    modules: ModuleCard[]
    message: string[]
    note: string
  }
  s04: {
    eyebrow: string
    title: string
    lead: string
    flows: { key: string; title: string; caption: string; steps: FlowStep[] }[]
    note: string
  }
  s05: {
    eyebrow: string
    title: string
    lead: string
    modules: ModuleCard[]
    note: string
  }
  s06: {
    eyebrow: string
    title: string
    lead: string
    roles: { key: string; title: string; sub: string; items: string[] }[]
    chatQ: string
    chatQBy: string
    chatA: string
    statement: string
    statementSub: string
    note: string
  }
  s07: {
    eyebrow: string
    title: string
    sub: string
    questions: string[]
    chatTitle: string
    chatUser: string
    factLabel: string
    factText: string
    estimateLabel: string
    estimateText: string
    recLabel: string
    recText: string
    factsTitle: string
    facts: string[]
    note: string
  }
  s08: {
    eyebrow: string
    title: string
    lead: string
    kpis: { label: string; value: string; delta: string; tone: 'up' | 'down' | 'flat' }[]
    columns: { title: string; items: { t: string; d: string; tone?: 'ok' | 'warn' | 'risk' }[] }[]
    chartTitle: string
    cashTitle: string
    series: { revenue: string; expense: string; inflow: string; outflow: string }
    note: string
  }
  s09: {
    eyebrow: string
    title: string
    lead: string
    flow: FlowStep[]
    costTitle: string
    cost: { label: string; value: string }[]
    costTotal: string
    costTotalValue: string
    compareTitle: string
    compareCols: { standard: string; actual: string; delta: string }
    compare: { label: string; standard: string; actual: string; delta: string; tone: 'ok' | 'warn' | 'risk' }[]
    note: string
  }
  s10: {
    eyebrow: string
    title: string
    lead: string
    legend: string
    columns: { key: string; title: string; note: string }[]
    rows: { label: string; cells: CellState[] }[]
    closingTitle: string
    closing: string[]
    note: string
  }
  s11: {
    eyebrow: string
    title: string
    lead: string
    pillars: { n: string; title: string; desc: string }[]
    note: string
  }
  s12: {
    eyebrow: string
    title: string
    lead: string
    stack: string[]
    stackTitle: string
    items: { title: string; desc: string }[]
    quote: string
    quoteSub: string
    note: string
  }
  s13: {
    eyebrow: string
    title: string
    lead: string
    trialBadge: string
    trialValue: string
    trialNote: string
    plans: { key: string; name: string; price: string; period: string; tag?: string; items: string[]; cta: string }[]
    flow: string[]
    flowTitle: string
    paymentTitle: string
    payments: { name: string; status: string; tone: 'live' | 'planned' | 'manual' }[]
    note: string
  }
  s14: {
    eyebrow: string
    title: string
    lead: string
    phases: { n: string; title: string; when: string; items: string[] }[]
    note: string
  }
  s15: {
    eyebrow: string
    title: string
    lead: string
    outcomes: { title: string; desc: string }[]
    goalTitle: string
    goal: string
    note: string
  }
  s16: {
    eyebrow: string
    title: string
    lead: string
    industries: string[]
    pathTitle: string
    path: string[]
    note: string
  }
  s17: {
    eyebrow: string
    title: string
    lead: string
    tabs: { key: string; label: string }[]
    labels: {
      revenue: string
      profit: string
      cash: string
      stock: string
      topCustomers: string
      lowStock: string
      pnl: string
      prodCost: string
      overview: string
      askTitle: string
      typeHint: string
      facts: string
    }
    ai: { q: string; fact: string; estimate: string; rec: string }
    cols: {
      order: string
      customer: string
      amount: string
      status: string
      item: string
      qty: string
      stock: string
      value: string
      report: string
      period: string
    }
    pnlRows: { revenue: string; cogs: string; gross: string; opex: string; net: string }
    status: { paid: string; partial: string; overdue: string; open: string }
    notes: string
  }
  s18: {
    eyebrow: string
    title: string
    lead: string
    time: string
    steps: { t: string; d: string; tone: 'risk' | 'warn' | 'info' }[]
    aiTitle: string
    aiText: string
    actions: { t: string; d: string }[]
    closing: string
    note: string
  }
  s19: {
    eyebrow: string
    title: string
    lead: string
    tenants: string
    tenantsMore: string
    ownTitle: string
    own: string[]
    centralTitle: string
    central: string[]
    metrics: { label: string; value: string }[]
    note: string
  }
  s20: {
    brand: string
    title: string
    sub: string
    offer: string
    primary: string
    secondary: string
    small: string
    recap: string[]
    footer: string
  }
}
