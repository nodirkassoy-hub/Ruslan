import {
  BarChart3,
  Bot,
  Calculator,
  FileText,
  Factory,
  Layers,
  Package,
  ShoppingCart,
  Truck,
  UserCog,
  Users,
  type LucideIcon,
} from 'lucide-react'

const MAP: Record<string, LucideIcon> = {
  accounting: Calculator,
  sales: ShoppingCart,
  crm: Users,
  warehouse: Package,
  purchasing: Truck,
  manufacturing: Factory,
  hr: UserCog,
  documents: FileText,
  reports: BarChart3,
  ai: Bot,
}

export default function ModuleGlyph({ k, size = 16 }: { k: string; size?: number }) {
  const Icon = MAP[k] ?? Layers
  return <Icon size={size} aria-hidden="true" />
}
