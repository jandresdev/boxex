import type { LucideIcon } from "lucide-react"
import { Home, Package, MapPin, Compass, Building2, HelpCircle } from "lucide-react"

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/servicios", label: "Servicios", icon: Package },
  { href: "/destinos", label: "Destinos", icon: MapPin },
  { href: "/como-funciona", label: "Cómo funciona", icon: Compass },
  { href: "/oficinas", label: "Oficinas", icon: Building2 },
  { href: "/ayuda", label: "Ayuda", icon: HelpCircle },
]

export const quoteCta = {
  href: "/cotizar",
  label: "Cotizar envío",
}
